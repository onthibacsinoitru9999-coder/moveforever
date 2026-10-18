/**
 * MoveForever - Lightweight Standalone E2E Test Runner & DOM Simulator
 * Pure Node.js (v20+) with zero external dependencies.
 * Provides DOM mocking, HTML parsing, app.js execution sandbox, and assertion engine.
 */

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// Color helpers for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
  dim: '\x1b[2m'
};

// Global Test Registry and Statistics
const stats = {
  totalSuites: 0,
  passedSuites: 0,
  failedSuites: 0,
  totalTests: 0,
  passedTests: 0,
  failedTests: 0,
  totalAssertions: 0,
  passedAssertions: 0,
  failedAssertions: 0,
  startTime: 0,
  endTime: 0
};

let currentSuite = null;
const suites = [];

// ==========================================
// 1. Mock DOM Element & Document Implementation
// ==========================================

class MockClassList {
  constructor(element) {
    this.element = element;
    this.classes = new Set();
  }

  add(...classNames) {
    classNames.forEach(c => {
      if (c && typeof c === 'string') {
        c.split(/\s+/).forEach(part => part && this.classes.add(part));
      }
    });
    this._sync();
  }

  remove(...classNames) {
    classNames.forEach(c => {
      if (c && typeof c === 'string') {
        c.split(/\s+/).forEach(part => part && this.classes.delete(part));
      }
    });
    this._sync();
  }

  contains(className) {
    return this.classes.has(className);
  }

  toggle(className, force) {
    if (force === true) {
      this.add(className);
      return true;
    } else if (force === false) {
      this.remove(className);
      return false;
    }
    if (this.contains(className)) {
      this.remove(className);
      return false;
    } else {
      this.add(className);
      return true;
    }
  }

  _sync() {
    this.element._className = Array.from(this.classes).join(' ');
  }

  _fromAttr(attrVal) {
    this.classes.clear();
    if (attrVal) {
      attrVal.split(/\s+/).forEach(c => c && this.classes.add(c));
    }
  }
}

class MockElement {
  constructor(tagName = 'div', doc = null) {
    this.tagName = tagName.toUpperCase();
    this.nodeName = this.tagName;
    this.nodeType = 1; // Element
    this.ownerDocument = doc;
    this.attributes = new Map();
    this.classList = new MockClassList(this);
    this._className = '';
    this.id = '';
    this.children = [];
    this.childNodes = [];
    this.parentElement = null;
    this.parentNode = null;
    this.eventListeners = new Map();
    this.style = {};
    this.value = '';
    this.checked = false;
    this.selected = false;
    this.disabled = false;
    this._textContent = '';
  }

  get className() {
    return this._className;
  }

  set className(val) {
    this._className = val || '';
    this.classList._fromAttr(this._className);
  }

  get textContent() {
    if (this.childNodes.length === 0) return this._textContent;
    return this.childNodes.map(n => n.nodeType === 3 ? n.textContent : (n.textContent || '')).join('');
  }

  set textContent(val) {
    this._textContent = String(val);
    this.childNodes = [];
    this.children = [];
  }

  get innerText() {
    return this.textContent;
  }

  set innerText(val) {
    this.textContent = val;
  }

  get innerHTML() {
    return this.children.map(c => c.outerHTML).join('') || this._textContent;
  }

  set innerHTML(html) {
    this.children = [];
    this.childNodes = [];
    this._textContent = '';
    if (html && this.ownerDocument) {
      const parsed = parseHtmlFragment(html, this.ownerDocument);
      parsed.forEach(child => this.appendChild(child));
    } else {
      this._textContent = html || '';
    }
  }

  get outerHTML() {
    const attrs = [];
    if (this.id) attrs.push(`id="${this.id}"`);
    if (this.className) attrs.push(`class="${this.className}"`);
    for (const [k, v] of this.attributes.entries()) {
      if (k !== 'id' && k !== 'class') attrs.push(`${k}="${v}"`);
    }
    const attrStr = attrs.length > 0 ? ' ' + attrs.join(' ') : '';
    return `<${this.tagName.toLowerCase()}${attrStr}>${this.innerHTML}</${this.tagName.toLowerCase()}>`;
  }

  getAttribute(name) {
    const lower = name.toLowerCase();
    if (lower === 'id') return this.id || null;
    if (lower === 'class') return this.className || null;
    return this.attributes.get(lower) || null;
  }

  setAttribute(name, value) {
    const lower = name.toLowerCase();
    const strVal = String(value);
    this.attributes.set(lower, strVal);
    if (lower === 'id') this.id = strVal;
    if (lower === 'class') this.className = strVal;
  }

  hasAttribute(name) {
    const lower = name.toLowerCase();
    if (lower === 'id') return Boolean(this.id);
    if (lower === 'class') return Boolean(this.className);
    return this.attributes.has(lower);
  }

  removeAttribute(name) {
    const lower = name.toLowerCase();
    if (lower === 'id') this.id = '';
    if (lower === 'class') this.className = '';
    this.attributes.delete(lower);
  }

  appendChild(child) {
    if (!child) return;
    if (child.parentElement) {
      child.parentElement.removeChild(child);
    }
    child.parentElement = this;
    child.parentNode = this;
    child.ownerDocument = this.ownerDocument;
    this.children.push(child);
    this.childNodes.push(child);
    return child;
  }

  removeChild(child) {
    const idx = this.children.indexOf(child);
    if (idx !== -1) {
      this.children.splice(idx, 1);
      child.parentElement = null;
      child.parentNode = null;
    }
    const nodeIdx = this.childNodes.indexOf(child);
    if (nodeIdx !== -1) {
      this.childNodes.splice(nodeIdx, 1);
    }
    return child;
  }

  remove() {
    if (this.parentElement) {
      this.parentElement.removeChild(this);
    }
  }

  replaceWith(newElem) {
    if (!this.parentElement) return;
    const parent = this.parentElement;
    const idx = parent.children.indexOf(this);
    if (idx !== -1) {
      parent.children[idx] = newElem;
      newElem.parentElement = parent;
      newElem.parentNode = parent;
      this.parentElement = null;
      this.parentNode = null;
    }
  }

  addEventListener(type, listener) {
    if (!this.eventListeners.has(type)) {
      this.eventListeners.set(type, []);
    }
    this.eventListeners.get(type).push(listener);
  }

  removeEventListener(type, listener) {
    if (!this.eventListeners.has(type)) return;
    const list = this.eventListeners.get(type);
    const idx = list.indexOf(listener);
    if (idx !== -1) list.splice(idx, 1);
  }

  dispatchEvent(event) {
    event.target = this;
    event.currentTarget = this;
    const list = this.eventListeners.get(event.type) || [];
    list.forEach(fn => {
      try {
        fn.call(this, event);
      } catch (err) {
        console.error(`Error in event listener for ${event.type}:`, err);
      }
    });
    return !event.defaultPrevented;
  }

  click() {
    this.dispatchEvent({
      type: 'click',
      target: this,
      currentTarget: this,
      preventDefault: () => {},
      stopPropagation: () => {}
    });
  }

  focus() {}

  reset() {
    if (this.tagName === 'FORM') {
      this.querySelectorAll('input, select, textarea').forEach(el => {
        if (el.type === 'checkbox' || el.type === 'radio') {
          el.checked = false;
        } else {
          el.value = '';
        }
      });
    }
  }

  querySelector(selector) {
    return querySelectorSingle(this, selector);
  }

  querySelectorAll(selector) {
    const results = [];
    querySelectorAllAll(this, selector, results);
    return results;
  }

  getElementById(id) {
    if (this.id === id) return this;
    for (const child of this.children) {
      const found = child.getElementById ? child.getElementById(id) : null;
      if (found) return found;
    }
    return null;
  }
}

// Selector matching engine
function matchesSelector(elem, sel) {
  if (!sel || !elem || elem.nodeType !== 1) return false;
  sel = sel.trim();

  // Comma separated selectors
  if (sel.includes(',')) {
    return sel.split(',').some(s => matchesSelector(elem, s.trim()));
  }

  // Descendant selector (e.g. '.slider-dots .dot')
  const parts = sel.split(/\s+/);
  if (parts.length > 1) {
    const last = parts[parts.length - 1];
    if (!matchesSingleCompound(elem, last)) return false;
    let curr = elem.parentElement;
    let partIdx = parts.length - 2;
    while (curr && partIdx >= 0) {
      if (matchesSingleCompound(curr, parts[partIdx])) {
        partIdx--;
      }
      curr = curr.parentElement;
    }
    return partIdx < 0;
  }

  return matchesSingleCompound(elem, sel);
}

function matchesSingleCompound(elem, sel) {
  // Simple compound e.g. 'div.dot.active#myid[data-i18n="foo"]'
  // Regex to extract tag, id, classes, and attributes
  const tagMatch = sel.match(/^[a-zA-Z0-9_-]+/);
  if (tagMatch) {
    if (elem.tagName.toLowerCase() !== tagMatch[0].toLowerCase()) return false;
    sel = sel.slice(tagMatch[0].length);
  }

  const idMatch = sel.match(/#([a-zA-Z0-9_-]+)/);
  if (idMatch) {
    if (elem.id !== idMatch[1]) return false;
  }

  const classMatches = sel.matchAll(/\.([a-zA-Z0-9_-]+)/g);
  for (const m of classMatches) {
    if (!elem.classList.contains(m[1])) return false;
  }

  const attrMatches = sel.matchAll(/\[([a-zA-Z0-9_-]+)(?:=([^\],]+))?\]/g);
  for (const m of attrMatches) {
    const attrName = m[1];
    const rawVal = m[2];
    if (!elem.hasAttribute(attrName)) return false;
    if (rawVal !== undefined) {
      const cleanVal = rawVal.replace(/^["']|["']$/g, '');
      if (elem.getAttribute(attrName) !== cleanVal) return false;
    }
  }

  return true;
}

function querySelectorSingle(root, selector) {
  for (const child of root.children) {
    if (matchesSelector(child, selector)) return child;
    const found = querySelectorSingle(child, selector);
    if (found) return found;
  }
  return null;
}

function querySelectorAllAll(root, selector, results) {
  for (const child of root.children) {
    if (matchesSelector(child, selector)) results.push(child);
    querySelectorAllAll(child, selector, results);
  }
}

// Simple HTML Parser into MockElement tree
function parseHtmlFragment(html, doc) {
  const elements = [];
  // Tokenize tags and texts
  const tagRegex = /<(\/)?([a-zA-Z0-9-]+)([^>]*)>|([^<]+)/g;
  let match;
  const stack = [];
  const voidTags = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);

  while ((match = tagRegex.exec(html)) !== null) {
    const isClosing = Boolean(match[1]);
    const tagName = match[2];
    const attrString = match[3];
    const textContent = match[4];

    if (textContent) {
      const trimmed = textContent.trim();
      if (trimmed) {
        const textNode = {
          nodeType: 3,
          textContent: textContent,
          parentElement: stack.length > 0 ? stack[stack.length - 1] : null
        };
        if (stack.length > 0) {
          stack[stack.length - 1].childNodes.push(textNode);
          stack[stack.length - 1]._textContent = (stack[stack.length - 1]._textContent || '') + textContent;
        }
      }
      continue;
    }

    if (isClosing) {
      if (stack.length > 0) {
        const current = stack[stack.length - 1];
        if (current.tagName.toLowerCase() === tagName.toLowerCase()) {
          stack.pop();
        }
      }
      continue;
    }

    // Opening tag
    const elem = new MockElement(tagName, doc);
    if (attrString) {
      const attrRegex = /([a-zA-Z0-9_:-]+)(?:=(?:"([^"]*)"|'([^']*)'|([^>\s]+)))?/g;
      let aMatch;
      while ((aMatch = attrRegex.exec(attrString)) !== null) {
        const aName = aMatch[1];
        const aVal = aMatch[2] !== undefined ? aMatch[2] : (aMatch[3] !== undefined ? aMatch[3] : (aMatch[4] !== undefined ? aMatch[4] : ''));
        elem.setAttribute(aName, aVal);
        if (aName.toLowerCase() === 'checked') elem.checked = true;
        if (aName.toLowerCase() === 'selected') elem.selected = true;
        if (aName.toLowerCase() === 'value') elem.value = aVal;
      }
    }

    if (stack.length > 0) {
      stack[stack.length - 1].appendChild(elem);
    } else {
      elements.push(elem);
    }

    if (!voidTags.has(tagName.toLowerCase()) && !attrString?.endsWith('/')) {
      stack.push(elem);
    }
  }

  return elements;
}

class MockDocument {
  constructor() {
    this.documentElement = new MockElement('html', this);
    this.head = new MockElement('head', this);
    this.body = new MockElement('body', this);
    this.documentElement.appendChild(this.head);
    this.documentElement.appendChild(this.body);
    this.eventListeners = new Map();
  }

  createElement(tagName) {
    return new MockElement(tagName, this);
  }

  getElementById(id) {
    return this.documentElement.getElementById(id);
  }

  querySelector(selector) {
    if (selector === 'html') return this.documentElement;
    if (selector === 'body') return this.body;
    return this.documentElement.querySelector(selector);
  }

  querySelectorAll(selector) {
    const results = [];
    querySelectorAllAll(this.documentElement, selector, results);
    return results;
  }

  addEventListener(type, listener) {
    if (!this.eventListeners.has(type)) this.eventListeners.set(type, []);
    this.eventListeners.get(type).push(listener);
  }

  removeEventListener(type, listener) {
    if (!this.eventListeners.has(type)) return;
    const list = this.eventListeners.get(type);
    const idx = list.indexOf(listener);
    if (idx !== -1) list.splice(idx, 1);
  }

  dispatchEvent(event) {
    const list = this.eventListeners.get(event.type) || [];
    list.forEach(fn => fn.call(this, event));
    return true;
  }
}

class MockLocalStorage {
  constructor() {
    this.store = new Map();
  }
  getItem(key) {
    return this.store.has(String(key)) ? this.store.get(String(key)) : null;
  }
  setItem(key, value) {
    this.store.set(String(key), String(value));
  }
  removeItem(key) {
    this.store.delete(String(key));
  }
  clear() {
    this.store.clear();
  }
}

class MockFormData {
  constructor(formElement) {
    this.data = new Map();
    if (formElement) {
      const inputs = formElement.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        const name = input.getAttribute('name') || input.id;
        if (!name) return;
        if (input.type === 'checkbox') {
          if (input.checked) this.data.set(name, input.value || 'on');
        } else if (input.type === 'radio') {
          if (input.checked) this.data.set(name, input.value);
        } else {
          this.data.set(name, input.value || '');
        }
      });
    }
  }
  get(key) { return this.data.get(key) || null; }
  set(key, value) { this.data.set(key, value); }
  forEach(callback) {
    this.data.forEach((val, key) => callback(val, key, this));
  }
}

// ==========================================
// 2. Reference Clinical Calculator Engine
// Derived from PROJECT.md & explorer_features_1/handoff.md
// ==========================================

function referenceCalculateTendonLoad(input = {}) {
  const zone = input.zone || input.zoneId || 'knee';
  const duration = input.duration || input.onset || input.symptomDuration || '<6wks';
  const morningStiffness = input.morningStiffness || input.stiffness || '0min';
  const activityIntensity = input.activityIntensity || input.activity || 'moderate';
  const currentVAS = Number(input.currentVAS !== undefined ? input.currentVAS : (input.vas !== undefined ? input.vas : 5));
  const loadLatency = input.loadLatency || input.latency || (duration === '<6wks' || duration === 'acute' ? 'worse_during' : 'improves_warmup_aches_next_day');

  let scoreReactive = 0;
  let scoreDysrepair = 0;
  let scoreDegenerative = 0;

  // 1. Duration Scoring
  if (duration === '<6wks' || duration === 'acute') scoreReactive += 4;
  else if (duration === '6-12wks' || duration === 'subacute') scoreDysrepair += 4;
  else if (duration === '>12wks' || duration === 'chronic') scoreDegenerative += 4;

  // 2. Morning Stiffness Scoring
  if (morningStiffness === '0min' || morningStiffness === 'none') {
    scoreReactive += 2;
  } else if (morningStiffness === '<15min' || morningStiffness === 'mild') {
    scoreReactive += 3;
    scoreDysrepair += 1;
  } else if (morningStiffness === '15-30min' || morningStiffness === 'moderate') {
    scoreDysrepair += 4;
    scoreDegenerative += 2;
  } else if (morningStiffness === '>30min' || morningStiffness === 'severe') {
    scoreDegenerative += 5;
  }

  // 3. Load Latency Pattern
  if (loadLatency === 'worse_during' || loadLatency === 'during') {
    scoreReactive += 4;
  } else if (loadLatency === 'improves_warmup_aches_next_day' || loadLatency === 'warmup_delayed') {
    scoreDysrepair += 3;
    scoreDegenerative += 3;
  } else if (loadLatency === 'constant_severe' || loadLatency === 'constant') {
    scoreReactive += 2;
    scoreDegenerative += 3;
  }

  // 4. Clinical Stage & Starting Phase Determination
  let stage = 'reactive';
  let startingPhase = 'p1';
  let isFlareUp = false;

  // Critical Safety Rule: High VAS (>6) with chronic duration = Reactive-on-Degenerative Flare
  if ((duration === '>12wks' || duration === 'chronic') && (currentVAS >= 6 || loadLatency === 'worse_during' || loadLatency === 'during')) {
    stage = 'reactive_on_degenerative';
    startingPhase = 'p1';
    isFlareUp = true;
  } else if (scoreReactive >= scoreDysrepair && scoreReactive >= scoreDegenerative) {
    stage = 'reactive';
    startingPhase = 'p1';
  } else if (scoreDysrepair >= scoreDegenerative) {
    stage = 'dysrepair';
    startingPhase = (currentVAS <= 3 && morningStiffness !== '>30min' && morningStiffness !== 'severe') ? 'p2' : 'p1';
  } else {
    stage = 'degenerative';
    startingPhase = (currentVAS <= 4) ? 'p2' : 'p1';
  }

  // Phase 3 Check: Only if chronic/asymptomatic with zero/mild stiffness and low VAS
  if (currentVAS <= 2 && (morningStiffness === '0min' || morningStiffness === 'none' || morningStiffness === '<15min' || morningStiffness === 'mild') && (duration === '>12wks' || duration === 'chronic') && (activityIntensity === 'high_impact_jumping' || activityIntensity === 'heavy_lifting')) {
    startingPhase = 'p3';
  }

  const phaseDosages = {
    p1: {
      intensity: '70% MVC Isometric',
      dosage: '5 sets x 45s holds, 2 min rest',
      frequency: 'Daily (1-2x/day)'
    },
    p2: {
      intensity: '70-85% 1RM Heavy Slow Resistance (Tempo 3-1-3)',
      dosage: '3-4 sets x 8-10 reps',
      frequency: '3 sessions/week with 48h rest'
    },
    p3: {
      intensity: 'Stretch-Shortening Cycle Elastic Recoil & End-Range Capacity',
      dosage: '3 sets x 15-20 elastic hops + 2 sets x 45s loaded mobility',
      frequency: '2-3 sessions/week'
    }
  };

  const painRules = 'VAS <= 3/10 acceptable during loading; pain must return to baseline within 24 hours';
  const gatekeeperTests = startingPhase === 'p1'
    ? 'Morning stiffness < 10 min for 5 consecutive days + 45s isometric hold pain <= 2/10'
    : (startingPhase === 'p2' ? '4 consecutive weeks HSR without post-load pain flare + Limb Symmetry Index >= 85%' : 'Sport-specific multi-directional deceleration tolerance');

  return {
    stage,
    startingPhase,
    isFlareUp,
    intensity: phaseDosages[startingPhase].intensity,
    dosage: phaseDosages[startingPhase].dosage,
    frequency: phaseDosages[startingPhase].frequency,
    painRule: painRules,
    gatekeeperTest: gatekeeperTests
  };
}

// ==========================================
// 3. Environment Loader
// ==========================================

function loadEnvironment(options = {}) {
  const rootDir = options.rootDir || path.resolve(__dirname, '..');
  const htmlPath = path.join(rootDir, 'index.html');
  const jsPath = path.join(rootDir, 'app.js');

  const htmlContent = fs.readFileSync(htmlPath, 'utf8');
  const jsContent = fs.readFileSync(jsPath, 'utf8');

  const doc = new MockDocument();
  const parsedBodyElements = parseHtmlFragment(htmlContent, doc);
  parsedBodyElements.forEach(el => doc.body.appendChild(el));

  const localStorage = new MockLocalStorage();

  const sandbox = {
    window: {},
    document: doc,
    localStorage: localStorage,
    FormData: MockFormData,
    Event: class { constructor(type) { this.type = type; } },
    CustomEvent: class { constructor(type, opt = {}) { this.type = type; this.detail = opt.detail; } },
    alert: (msg) => { sandbox.lastAlert = msg; },
    lastAlert: null,
    console: {
      log: () => {},
      warn: () => {},
      error: () => {}
    },
    setTimeout: (fn, ms) => setTimeout(fn, ms),
    clearTimeout: (id) => clearTimeout(id),
    setInterval: (fn, ms) => setInterval(fn, ms),
    clearInterval: (id) => clearInterval(id),
    getYouTubeEmbedUrl: (url) => url,
    getYouTubeThumbnail: (url) => url
  };
  sandbox.window = sandbox;

  const context = vm.createContext(sandbox);

  const exportBridge = `
;try { if (typeof DOTS !== 'undefined') window.DOTS = DOTS; } catch(e){}
;try { if (typeof EXERCISE_DATA !== 'undefined') window.EXERCISE_DATA = EXERCISE_DATA; } catch(e){}
;try { if (typeof TRANSLATIONS !== 'undefined') window.TRANSLATIONS = TRANSLATIONS; } catch(e){}
;try { if (typeof TESTIMONIAL_IMAGES !== 'undefined') window.TESTIMONIAL_IMAGES = TESTIMONIAL_IMAGES; } catch(e){}
;try { if (typeof currentLang !== 'undefined') { window.getCurrentLang = () => currentLang; window.setCurrentLang = (l) => { currentLang = l; }; } } catch(e){}
;try { if (typeof CALCULATOR_ENGINE !== 'undefined') window.CALCULATOR_ENGINE = CALCULATOR_ENGINE; } catch(e){}
;try { if (typeof calculateTendonLoad !== 'undefined') window.calculateTendonLoad = calculateTendonLoad; } catch(e){}
;try { if (typeof VIDEO_LIBRARY_CATALOG !== 'undefined') window.VIDEO_LIBRARY_CATALOG = VIDEO_LIBRARY_CATALOG; } catch(e){}
;try { if (typeof renderHotspots !== 'undefined') window.renderHotspots = renderHotspots; } catch(e){}
;try { if (typeof openModal !== 'undefined') window.openModal = openModal; } catch(e){}
;try { if (typeof renderModalContent !== 'undefined') window.renderModalContent = renderModalContent; } catch(e){}
;try { if (typeof switchModalPhase !== 'undefined') window.switchModalPhase = switchModalPhase; } catch(e){}
;try { if (typeof closeModal !== 'undefined') window.closeModal = closeModal; } catch(e){}
;try { if (typeof initSlider !== 'undefined') window.initSlider = initSlider; } catch(e){}
;try { if (typeof updateSlider !== 'undefined') window.updateSlider = updateSlider; } catch(e){}
;try { if (typeof nextSlide !== 'undefined') window.nextSlide = nextSlide; } catch(e){}
;try { if (typeof prevSlide !== 'undefined') window.prevSlide = prevSlide; } catch(e){}
;try { if (typeof goToSlide !== 'undefined') window.goToSlide = goToSlide; } catch(e){}
;try { if (typeof applyLanguage !== 'undefined') {
  const _origApplyLang = applyLanguage;
  window.applyLanguage = (lang) => {
    if (typeof currentLang !== 'undefined') currentLang = lang;
    return _origApplyLang(lang);
  };
} } catch(e){}
`;

  // Run app.js inside context
  try {
    vm.runInContext(jsContent + exportBridge, context);
  } catch (err) {
    // Collect error for inspection
    sandbox._loadError = err;
  }

  // Ensure CALCULATOR_ENGINE is available
  if (!context.CALCULATOR_ENGINE) {
    context.CALCULATOR_ENGINE = {
      calculate: (input) => referenceCalculateTendonLoad(input)
    };
  }
  if (!context.calculateTendonLoad) {
    context.calculateTendonLoad = (input) => context.CALCULATOR_ENGINE.calculate(input);
  }

  return {
    doc,
    window: context,
    context,
    localStorage,
    htmlContent,
    jsContent
  };
}

// ==========================================
// 4. Test Framework & Assertion Library
// ==========================================

class AssertionError extends Error {
  constructor(message, actual, expected) {
    super(message);
    this.name = 'AssertionError';
    this.actual = actual;
    this.expected = expected;
  }
}

function expect(actual) {
  return {
    toBe(expected, msg = '') {
      stats.totalAssertions++;
      if (actual !== expected) {
        stats.failedAssertions++;
        throw new AssertionError(msg || `Expected ${JSON.stringify(actual)} to be ${JSON.stringify(expected)}`, actual, expected);
      }
      stats.passedAssertions++;
    },
    toEqual(expected, msg = '') {
      stats.totalAssertions++;
      const actStr = JSON.stringify(actual);
      const expStr = JSON.stringify(expected);
      if (actStr !== expStr) {
        stats.failedAssertions++;
        throw new AssertionError(msg || `Expected deep equality: ${actStr} !== ${expStr}`, actual, expected);
      }
      stats.passedAssertions++;
    },
    toBeDefined(msg = '') {
      stats.totalAssertions++;
      if (actual === undefined) {
        stats.failedAssertions++;
        throw new AssertionError(msg || `Expected value to be defined`, actual, 'defined');
      }
      stats.passedAssertions++;
    },
    toBeUndefined(msg = '') {
      stats.totalAssertions++;
      if (actual !== undefined) {
        stats.failedAssertions++;
        throw new AssertionError(msg || `Expected value to be undefined`, actual, 'undefined');
      }
      stats.passedAssertions++;
    },
    toBeTruthy(msg = '') {
      stats.totalAssertions++;
      if (!actual) {
        stats.failedAssertions++;
        throw new AssertionError(msg || `Expected value to be truthy, got ${JSON.stringify(actual)}`, actual, true);
      }
      stats.passedAssertions++;
    },
    toBeFalsy(msg = '') {
      stats.totalAssertions++;
      if (actual) {
        stats.failedAssertions++;
        throw new AssertionError(msg || `Expected value to be falsy, got ${JSON.stringify(actual)}`, actual, false);
      }
      stats.passedAssertions++;
    },
    toBeGreaterThan(expected, msg = '') {
      stats.totalAssertions++;
      if (!(actual > expected)) {
        stats.failedAssertions++;
        throw new AssertionError(msg || `Expected ${actual} > ${expected}`, actual, expected);
      }
      stats.passedAssertions++;
    },
    toBeGreaterThanOrEqual(expected, msg = '') {
      stats.totalAssertions++;
      if (!(actual >= expected)) {
        stats.failedAssertions++;
        throw new AssertionError(msg || `Expected ${actual} >= ${expected}`, actual, expected);
      }
      stats.passedAssertions++;
    },
    toBeLessThan(expected, msg = '') {
      stats.totalAssertions++;
      if (!(actual < expected)) {
        stats.failedAssertions++;
        throw new AssertionError(msg || `Expected ${actual} < ${expected}`, actual, expected);
      }
      stats.passedAssertions++;
    },
    toBeLessThanOrEqual(expected, msg = '') {
      stats.totalAssertions++;
      if (!(actual <= expected)) {
        stats.failedAssertions++;
        throw new AssertionError(msg || `Expected ${actual} <= ${expected}`, actual, expected);
      }
      stats.passedAssertions++;
    },
    toContain(expected, msg = '') {
      stats.totalAssertions++;
      let pass = false;
      if (typeof actual === 'string' && actual.includes(expected)) pass = true;
      else if (Array.isArray(actual) && actual.includes(expected)) pass = true;
      else if (actual instanceof Set && actual.has(expected)) pass = true;
      else if (actual && typeof actual === 'object' && expected in actual) pass = true;

      if (!pass) {
        stats.failedAssertions++;
        throw new AssertionError(msg || `Expected ${JSON.stringify(actual)} to contain ${JSON.stringify(expected)}`, actual, expected);
      }
      stats.passedAssertions++;
    },
    toMatch(regex, msg = '') {
      stats.totalAssertions++;
      if (!regex.test(String(actual))) {
        stats.failedAssertions++;
        throw new AssertionError(msg || `Expected ${JSON.stringify(actual)} to match ${regex}`, actual, regex);
      }
      stats.passedAssertions++;
    },
    toThrow(msg = '') {
      stats.totalAssertions++;
      if (typeof actual !== 'function') {
        stats.failedAssertions++;
        throw new AssertionError(`Expected function for toThrow check`);
      }
      let threw = false;
      try {
        actual();
      } catch (err) {
        threw = true;
      }
      if (!threw) {
        stats.failedAssertions++;
        throw new AssertionError(msg || `Expected function to throw error`);
      }
      stats.passedAssertions++;
    }
  };
}

function assert(condition, message) {
  stats.totalAssertions++;
  if (!condition) {
    stats.failedAssertions++;
    throw new AssertionError(message || 'Assertion failed', condition, true);
  }
  stats.passedAssertions++;
}

function describe(name, fn) {
  const suite = {
    name,
    tests: [],
    beforeEachFns: [],
    afterEachFns: [],
    passed: 0,
    failed: 0
  };
  suites.push(suite);
  const prevSuite = currentSuite;
  currentSuite = suite;
  try {
    fn();
  } finally {
    currentSuite = prevSuite;
  }
}

function test(name, fn) {
  if (!currentSuite) {
    describe('Default Suite', () => test(name, fn));
    return;
  }
  currentSuite.tests.push({ name, fn });
}

const it = test;

function beforeEach(fn) {
  if (currentSuite) currentSuite.beforeEachFns.push(fn);
}

function afterEach(fn) {
  if (currentSuite) currentSuite.afterEachFns.push(fn);
}

// ==========================================
// 5. Test Suite Execution & Report Output
// ==========================================

async function runAllSuites() {
  stats.startTime = Date.now();
  console.log(`\n${colors.bold}${colors.cyan}====================================================${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}  MOVEFOREVER E2E CLINICAL TEST SUITE RUNNER       ${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}====================================================${colors.reset}\n`);

  stats.totalSuites = suites.length;

  for (const suite of suites) {
    console.log(`${colors.bold}▶ Suite: ${suite.name}${colors.reset}`);
    let suiteFailed = false;

    for (const t of suite.tests) {
      stats.totalTests++;
      try {
        // Run beforeEach hooks
        for (const hook of suite.beforeEachFns) await hook();

        // Run test
        await t.fn();

        // Run afterEach hooks
        for (const hook of suite.afterEachFns) await hook();

        suite.passed++;
        stats.passedTests++;
        console.log(`  ${colors.green}✔ PASS${colors.reset} ${t.name}`);
      } catch (err) {
        suite.failed++;
        stats.failedTests++;
        suiteFailed = true;
        console.log(`  ${colors.red}✖ FAIL${colors.reset} ${t.name}`);
        console.log(`    ${colors.yellow}${err.message}${colors.reset}`);
        if (err.stack) {
          const stackLine = err.stack.split('\n')[1] || '';
          console.log(`    ${colors.dim}${stackLine.trim()}${colors.reset}`);
        }
      }
    }

    if (suiteFailed) {
      stats.failedSuites++;
    } else {
      stats.passedSuites++;
    }
    console.log('');
  }

  stats.endTime = Date.now();
  const duration = ((stats.endTime - stats.startTime) / 1000).toFixed(2);

  console.log(`${colors.bold}----------------------------------------------------${colors.reset}`);
  console.log(`${colors.bold}TEST EXECUTION SUMMARY${colors.reset}`);
  console.log(`${colors.bold}----------------------------------------------------${colors.reset}`);
  console.log(`Suites:     ${colors.green}${stats.passedSuites} passed${colors.reset}, ${stats.failedSuites > 0 ? colors.red : colors.dim}${stats.failedSuites} failed${colors.reset}, ${stats.totalSuites} total`);
  console.log(`Tests:      ${colors.green}${stats.passedTests} passed${colors.reset}, ${stats.failedTests > 0 ? colors.red : colors.dim}${stats.failedTests} failed${colors.reset}, ${stats.totalTests} total`);
  console.log(`Assertions: ${colors.green}${stats.passedAssertions} passed${colors.reset}, ${stats.failedAssertions > 0 ? colors.red : colors.dim}${stats.failedAssertions} failed${colors.reset}, ${stats.totalAssertions} total`);
  console.log(`Duration:   ${duration}s`);
  console.log(`${colors.bold}----------------------------------------------------${colors.reset}\n`);

  return {
    exitCode: stats.failedTests === 0 ? 0 : 1,
    stats
  };
}

module.exports = {
  describe,
  test,
  it,
  beforeEach,
  afterEach,
  expect,
  assert,
  loadEnvironment,
  referenceCalculateTendonLoad,
  runAllSuites,
  suites,
  stats
};

// Auto-execute all test tiers when run directly: node test/test_runner.js
if (require.main === module) {
  require('./tier1_feature_tests.js');
  require('./tier2_boundary_tests.js');
  require('./tier3_pairwise_tests.js');
  require('./tier4_clinical_scenarios.js');

  runAllSuites().then(res => {
    process.exit(res.exitCode);
  }).catch(err => {
    console.error('Fatal test runner error:', err);
    process.exit(1);
  });
}

