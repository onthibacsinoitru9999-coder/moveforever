/**
 * MoveForever - Adversarial UI, Event Flow & Localization Stress Suite
 * Challenger 2: DOM event flows, mobile drawer transitions, search filtering with regex characters,
 * rapid language toggling, modal operations, and memory leak / unhandled exception detection.
 *
 * Targets adversarial edge cases, stress testing, and empirical bug reproduction.
 */

const {
  describe,
  test,
  expect,
  assert,
  loadEnvironment,
  runAllSuites,
  stats
} = require('./test_runner.js');

// =========================================================================
// SUITE 1: Video Library Search Filtering with Special Regex & Malformed Input
// =========================================================================
describe('Adversarial C1: Video Library Search Filtering & Regex Fuzzing', () => {
  test('C1.1 - Search with regex quantifiers and wildcards (.*, .+, ^.*$, [a-z]+, \\d+)', () => {
    const env = loadEnvironment();
    env.window.initVideoLibrary();
    const searchInput = env.doc.getElementById('video-search-input');
    const grid = env.doc.getElementById('video-grid');
    const emptyState = env.doc.getElementById('video-empty-state');

    const regexPatterns = ['.*', '.+', '^.*$', '[a-z]+', '\\d+', '(?=.*a)', '(a+)+$'];
    for (const pat of regexPatterns) {
      searchInput.value = pat;
      searchInput.dispatchEvent({
        type: 'input',
        target: { value: pat }
      });

      // Assert zero uncaught regex syntax errors and verified DOM state
      expect(Array.isArray(grid.children)).toBe(true, `Grid must remain an array for pattern ${pat}`);
      if (grid.children.length === 0) {
        expect(emptyState.style.display).toBe('block', `Empty state must show when no match for pattern ${pat}`);
      } else {
        expect(emptyState.style.display).toBe('none', `Empty state must be hidden when videos match pattern ${pat}`);
      }
    }
  });

  test('C1.2 - Search with unbalanced brackets and escape metacharacters ([, ], \\, \\\\, *, +, ?, {, }, |, $, ^)', () => {
    const env = loadEnvironment();
    env.window.initVideoLibrary();
    const searchInput = env.doc.getElementById('video-search-input');
    const grid = env.doc.getElementById('video-grid');
    const emptyState = env.doc.getElementById('video-empty-state');

    // Metacharacters not present in corpus must return 0 results safely without throwing
    const nonExistentChars = ['[', ']', '\\', '\\\\', '*', '?', '{', '}', '|', '$', '^', '[[[[', '.*.*.*'];
    for (const ch of nonExistentChars) {
      let threw = false;
      try {
        searchInput.value = ch;
        searchInput.dispatchEvent({
          type: 'input',
          target: { value: ch }
        });
      } catch (err) {
        threw = true;
      }
      expect(threw).toBe(false, `Search filter must not throw on malformed regex char: ${ch}`);
      expect(grid.children.length).toBe(0, `Pattern ${ch} should not match video corpus and safely yield 0 results`);
      expect(emptyState.style.display).toBe('block', `Empty state must display for unmatched pattern ${ch}`);
    }

    // Note: Parentheses '(' and plus '+' exist legitimately in titles/rationale (e.g., '(30° Scaption)', 'PAILs + RAILs')
    // Proving literal substring matching immunity against regex injection / ReDoS
    for (const literalChar of ['(', '+']) {
      searchInput.value = literalChar;
      searchInput.dispatchEvent({ type: 'input', target: { value: literalChar } });
      expect(grid.children.length > 0).toBe(true, `Literal char '${literalChar}' correctly performs literal substring matching`);
    }
  });

  test('C1.3 - Search with non-string and boundary inputs (null, undefined, empty, numbers)', () => {
    const env = loadEnvironment();
    env.window.initVideoLibrary();
    const searchInput = env.doc.getElementById('video-search-input');
    const grid = env.doc.getElementById('video-grid');

    // 1. Empty string & whitespace should restore full catalog
    searchInput.value = '';
    searchInput.dispatchEvent({ type: 'input', target: { value: '' } });
    expect(grid.children.length).toBe(105, 'Empty search must restore full 105 video catalog');

    searchInput.value = '   ';
    searchInput.dispatchEvent({ type: 'input', target: { value: '   ' } });
    expect(grid.children.length).toBe(105, 'Whitespace-only search must restore full 105 video catalog');

    // 2. Synthetic events with null or undefined target.value
    let caughtNullError = null;
    try {
      const listenerList = searchInput.eventListeners.get('input') || [];
      listenerList.forEach(fn => fn({ target: { value: null } }));
    } catch (err) {
      caughtNullError = err;
    }
    expect(Boolean(caughtNullError)).toBe(false, 'dispatched null target.value is handled safely without throwing');
  });

  test('C1.4 - Search with extreme length payloads (10,000 and 50,000 chars)', () => {
    const env = loadEnvironment();
    env.window.initVideoLibrary();
    const searchInput = env.doc.getElementById('video-search-input');
    const grid = env.doc.getElementById('video-grid');

    const hugeQuery = 'A'.repeat(50000);
    const start = Date.now();
    searchInput.value = hugeQuery;
    searchInput.dispatchEvent({ type: 'input', target: { value: hugeQuery } });
    const durationMs = Date.now() - start;

    expect(durationMs < 100).toBe(true, `50k char search must complete under 100ms (took ${durationMs}ms)`);
    expect(grid.children.length).toBe(0, '50k char payload must return 0 matches');
  });

  test('C1.5 - Search with Vietnamese diacritics, unicode, and emoji', () => {
    const env = loadEnvironment();
    env.window.initVideoLibrary();
    const searchInput = env.doc.getElementById('video-search-input');
    const grid = env.doc.getElementById('video-grid');

    // Search Vietnamese keyword "gân"
    searchInput.value = 'gân';
    searchInput.dispatchEvent({ type: 'input', target: { value: 'gân' } });
    expect(grid.children.length > 20).toBe(true, `Search for 'gân' should match multiple videos (found ${grid.children.length})`);

    // Search keyword "squat"
    searchInput.value = 'squat';
    searchInput.dispatchEvent({ type: 'input', target: { value: 'squat' } });
    expect(grid.children.length > 0).toBe(true, `Search for 'squat' should match videos (found ${grid.children.length})`);

    // Search emoji
    searchInput.value = '🔥💪🦵';
    searchInput.dispatchEvent({ type: 'input', target: { value: '🔥💪🦵' } });
    expect(grid.children.length).toBe(0, 'Emoji search should return 0 matches safely');
  });

  test('C1.6 - Search clear button and reset filter operations', () => {
    const env = loadEnvironment();
    env.window.initVideoLibrary();
    const searchInput = env.doc.getElementById('video-search-input');
    const clearBtn = env.doc.getElementById('video-search-clear');
    const grid = env.doc.getElementById('video-grid');

    // 1. Filter by search
    searchInput.value = 'squat';
    searchInput.dispatchEvent({ type: 'input', target: { value: 'squat' } });
    const countWithSearch = grid.children.length;
    expect(countWithSearch < 105).toBe(true, 'Filtered count should be less than total');

    // 2. Click clear button
    clearBtn.click();
    expect(searchInput.value).toBe('', 'Clear button must clear search input value');
    expect(grid.children.length).toBe(105, 'Clearing search must restore all 105 videos');

    // 3. Reset button
    const resetBtn = env.doc.getElementById('video-reset-filters-btn');
    resetBtn.click();
    expect(grid.children.length).toBe(105, 'Reset filters button must restore full 105 videos');
  });
});

// =========================================================================
// SUITE 2: Rapid Bilingual Localization Toggling & Calculator Permutations
// =========================================================================
describe('Adversarial C2: Rapid Language Toggling & Calculator Permutations', () => {
  test('C2.1 - 100 rapid language toggles (VI <-> EN) while mutating calculator inputs', () => {
    const env = loadEnvironment();
    env.window.initCalculator();
    const { window, doc } = env;

    const zones = ['shoulder', 'core', 'elbow', 'lower_back', 'wrist', 'hip', 'knee', 'foot'];
    const stiffnessOpts = ['none', 'mild', 'moderate', 'severe'];
    const activityOpts = ['sedentary', 'moderate', 'heavy_lifting', 'high_jumping'];
    const latencyOpts = ['during', 'warmup_delayed', 'constant'];
    const chronOpts = ['acute', 'subacute', 'chronic'];

    const stageTitleEl = doc.getElementById('calc-out-stage-title');
    const phaseTitleEl = doc.getElementById('calc-out-phase-title');
    const vasSlider = doc.getElementById('calc-vas');

    for (let i = 0; i < 100; i++) {
      const targetLang = i % 2 === 0 ? 'vi' : 'en';
      const zone = zones[i % zones.length];
      const stiffness = stiffnessOpts[i % stiffnessOpts.length];
      const activity = activityOpts[i % activityOpts.length];
      const latency = latencyOpts[i % latencyOpts.length];
      const chronicity = chronOpts[i % chronOpts.length];
      const vas = i % 11;

      // Update form values
      doc.getElementById('calc-zone').value = zone;
      doc.getElementById('calc-stiffness').value = stiffness;
      doc.getElementById('calc-activity').value = activity;
      doc.getElementById('calc-latency').value = latency;
      doc.getElementById('calc-chronicity').value = chronicity;
      vasSlider.value = vas;

      // Run calculation and toggle language
      window.runCalculator();
      window.applyLanguage(targetLang);

      // Verify DOM display conforms to active language
      const stageText = stageTitleEl.textContent;
      const phaseText = phaseTitleEl.textContent;

      expect(typeof stageText).toBe('string');
      expect(stageText.length > 0).toBe(true, `Stage title must not be empty at step ${i}`);
      expect(typeof phaseText).toBe('string');
      expect(phaseText.length > 0).toBe(true, `Phase title must not be empty at step ${i}`);

      if (targetLang === 'en') {
        expect(doc.documentElement.getAttribute('lang') || doc.documentElement.lang).toBe('en');
        expect(phaseText.toLowerCase().includes('phase')).toBe(true, `Phase title in EN should contain 'Phase' at step ${i}`);
      } else {
        expect(doc.documentElement.getAttribute('lang') || doc.documentElement.lang).toBe('vi');
        expect(phaseText.toLowerCase().includes('giai đoạn') || phaseText.toLowerCase().includes('gđ')).toBe(true, `Phase title in VI should contain 'Giai Đoạn' at step ${i}`);
      }
    }
  });

  test('C2.2 - Rapid language toggling while Body Map Modal is open across all 8 zones', () => {
    const env = loadEnvironment();
    const { window, doc } = env;

    const spots = ['spot1', 'spot2', 'spot3', 'spot4', 'spot5', 'spot6', 'spot7', 'spot8'];
    for (const spotId of spots) {
      window.openModal(spotId);
      const panel = doc.getElementById('bm-panel');

      // 1. Toggle to English
      window.applyLanguage('en');
      const titleEn = panel.querySelector('h3').textContent;
      const pearlEn = panel.querySelector('.bm-clinical-tip').textContent;
      expect(titleEn.length > 0).toBe(true, `${spotId} EN title must not be empty`);
      expect(pearlEn.length > 0).toBe(true, `${spotId} EN pearl must not be empty`);

      // 2. Toggle to Vietnamese
      window.applyLanguage('vi');
      const titleVi = panel.querySelector('h3').textContent;
      const pearlVi = panel.querySelector('.bm-clinical-tip').textContent;
      expect(titleVi.length > 0).toBe(true, `${spotId} VI title must not be empty`);
      expect(pearlVi.length > 0).toBe(true, `${spotId} VI pearl must not be empty`);

      // Assert true language difference
      expect(titleEn !== titleVi).toBe(true, `${spotId} titles must differ between EN and VI`);

      window.closeModal();
    }
  });

  test('C2.3 - Rapid language toggling while Video Player Modal is open', () => {
    const env = loadEnvironment();
    env.window.initVideoLibrary();
    const { window, doc } = env;

    window.openVideoModal('ex_shoulder_p1_01');

    // 1. Vietnamese Check
    window.applyLanguage('vi');
    const titleVi = doc.getElementById('vmodal-title').textContent;
    const rationaleVi = doc.getElementById('vmodal-rationale').textContent;
    expect(titleVi).toContain('Gồng Tĩnh');
    expect(rationaleVi.length > 10).toBe(true);

    // 2. English Check
    window.applyLanguage('en');
    const titleEn = doc.getElementById('vmodal-title').textContent;
    const rationaleEn = doc.getElementById('vmodal-rationale').textContent;
    expect(titleEn).toContain('Isometric');
    expect(rationaleEn.length > 10).toBe(true);

    // Assert language differentiation
    expect(titleVi !== titleEn).toBe(true, 'Video modal title must translate between VI and EN');
    expect(rationaleVi !== rationaleEn).toBe(true, 'Video modal rationale must translate between VI and EN');

    window.closeVideoModal();
  });

  test('C2.4 - Invalid language code fallback (fr, de, empty, null)', () => {
    const env = loadEnvironment();
    const { window, doc } = env;

    const invalidLangs = ['fr', 'de', 'es', '', null, undefined, 123];
    for (const badLang of invalidLangs) {
      let threw = false;
      try {
        window.applyLanguage(badLang);
      } catch (err) {
        threw = true;
      }
      expect(threw).toBe(false, `applyLanguage must not throw on invalid language: ${badLang}`);
      // Default fallback should ensure hero title is still rendered
      const hero = doc.querySelector('[data-i18n="hero_title"]');
      expect(Boolean(hero.textContent)).toBe(true, `Hero title must retain text content on invalid language ${badLang}`);
    }
  });
});

// =========================================================================
// SUITE 3: Mobile Drawer Navigation Lifecycle & Rapid Transition Events
// =========================================================================
describe('Adversarial C3: Mobile Drawer Navigation & Rapid Transitions', () => {
  test('C3.1 - 100 rapid alternate triggers of openDrawer() and closeDrawer()', () => {
    const env = loadEnvironment();
    env.window.initMobileDrawer();
    const { window, doc } = env;
    const drawer = doc.getElementById('mobile-drawer');
    const overlay = doc.getElementById('mobile-drawer-overlay');

    for (let i = 0; i < 100; i++) {
      if (i % 2 === 0) {
        window.openDrawer();
        expect(drawer.classList.contains('open')).toBe(true, `Drawer should be open at step ${i}`);
        expect(drawer.getAttribute('aria-hidden')).toBe('false', `Drawer aria-hidden should be false at step ${i}`);
        expect(overlay.classList.contains('open')).toBe(true, `Overlay should be open at step ${i}`);
        expect(doc.body.style.overflow).toBe('hidden', `Body overflow should be hidden at step ${i}`);
      } else {
        window.closeDrawer();
        expect(drawer.classList.contains('open')).toBe(false, `Drawer should be closed at step ${i}`);
        expect(drawer.getAttribute('aria-hidden')).toBe('true', `Drawer aria-hidden should be true at step ${i}`);
        expect(overlay.classList.contains('open')).toBe(false, `Overlay should be closed at step ${i}`);
        expect(doc.body.style.overflow).toBe('', `Body overflow should be reset at step ${i}`);
      }
    }
  });

  test('C3.2 - Idempotent consecutive drawer operations (10 opens, 10 closes)', () => {
    const env = loadEnvironment();
    env.window.initMobileDrawer();
    const { window, doc } = env;
    const drawer = doc.getElementById('mobile-drawer');

    // 10 consecutive opens
    for (let i = 0; i < 10; i++) window.openDrawer();
    expect(drawer.classList.contains('open')).toBe(true);
    expect(drawer.getAttribute('aria-hidden')).toBe('false');
    expect(doc.body.style.overflow).toBe('hidden');

    // 10 consecutive closes
    for (let i = 0; i < 10; i++) window.closeDrawer();
    expect(drawer.classList.contains('open')).toBe(false);
    expect(drawer.getAttribute('aria-hidden')).toBe('true');
    expect(doc.body.style.overflow).toBe('');
  });

  test('C3.3 - Interactive drawer event pathways (hamburger, close btn, overlay, links)', () => {
    const env = loadEnvironment();
    env.window.initMobileDrawer();
    const { doc } = env;

    const hamburger = doc.getElementById('nav-hamburger');
    const drawer = doc.getElementById('mobile-drawer');
    const overlay = doc.getElementById('mobile-drawer-overlay');
    const closeBtn = doc.getElementById('drawer-close-btn');
    const drawerLink = drawer.querySelector('.drawer-link');

    // Pathway 1: Click hamburger -> click closeBtn
    hamburger.click();
    expect(drawer.classList.contains('open')).toBe(true);
    closeBtn.click();
    expect(drawer.classList.contains('open')).toBe(false);

    // Pathway 2: Click hamburger -> click backdrop overlay
    hamburger.click();
    expect(drawer.classList.contains('open')).toBe(true);
    overlay.click();
    expect(drawer.classList.contains('open')).toBe(false);

    // Pathway 3: Click hamburger -> click drawer nav link
    hamburger.click();
    expect(drawer.classList.contains('open')).toBe(true);
    drawerLink.click();
    expect(drawer.classList.contains('open')).toBe(false);
  });

  test('C3.4 - Drawer language button synchronizes desktop and mobile indicators', () => {
    const env = loadEnvironment();
    env.window.initMobileDrawer();
    const { doc } = env;

    const drawerLangBtn = doc.getElementById('drawer-lang-btn');
    const drawerLangText = doc.getElementById('drawer-lang-text');
    const currentLangText = doc.getElementById('current-lang-text');

    // Initial state: VI -> indicators show 'EN' (meaning click to switch to EN)
    expect(currentLangText.innerText || currentLangText.textContent).toBe('EN');

    // Click drawer language switch
    drawerLangBtn.click();
    expect(doc.documentElement.getAttribute('lang') || doc.documentElement.lang).toBe('en');
    expect(drawerLangText.innerText || drawerLangText.textContent).toBe('VI');
    expect(currentLangText.innerText || currentLangText.textContent).toBe('VI');

    // Click again to switch back
    drawerLangBtn.click();
    expect(doc.documentElement.getAttribute('lang') || doc.documentElement.lang).toBe('vi');
    expect(drawerLangText.innerText || drawerLangText.textContent).toBe('EN');
    expect(currentLangText.innerText || currentLangText.textContent).toBe('EN');
  });

  test('C3.5 - Escape keydown drawer dismissal dependency vulnerability', () => {
    const env = loadEnvironment();
    env.window.initMobileDrawer();
    const { doc } = env;
    const drawer = doc.getElementById('mobile-drawer');

    // Open drawer
    env.window.openDrawer();
    expect(drawer.classList.contains('open')).toBe(true);

    // Press Escape BEFORE initVideoLibrary is called
    doc.dispatchEvent({ type: 'keydown', key: 'Escape' });

    // Decoupled Escape handler in initMobileDrawer cleanly closes the drawer
    const drawerClosedWithoutVideoLib = !drawer.classList.contains('open');
    expect(drawerClosedWithoutVideoLib).toBe(true, 'Mobile drawer dismisses on Escape even when video library is not initialized');

    // Now initialize video library and press Escape again
    env.window.initVideoLibrary();
    doc.dispatchEvent({ type: 'keydown', key: 'Escape' });
    expect(drawer.classList.contains('open')).toBe(false, 'Mobile drawer closes on Escape once initVideoLibrary listener is attached');
  });
});

// =========================================================================
// SUITE 4: Modal Dialog Lifecycle, Escape Handling & Fuzzing
// =========================================================================
describe('Adversarial C4: Modal Dialog Lifecycle & Fuzzing', () => {
  test('C4.1 - Body map modal 50 rapid open/close cycles across all 8 hotspots', () => {
    const env = loadEnvironment();
    const { window, doc } = env;
    const overlay = doc.getElementById('bm-overlay');
    const panel = doc.getElementById('bm-panel');

    const spots = ['spot1', 'spot2', 'spot3', 'spot4', 'spot5', 'spot6', 'spot7', 'spot8'];
    for (let i = 0; i < 50; i++) {
      const spotId = spots[i % spots.length];
      window.openModal(spotId);
      expect(overlay.classList.contains('bm-open')).toBe(true);
      expect(panel.children.length > 0).toBe(true);

      window.closeModal();
      expect(overlay.classList.contains('bm-open')).toBe(false);
      expect(panel.children.length).toBe(0);
    }
  });

  test('C4.2 - Fuzzing body map modal with invalid spot IDs (spot9, invalid, null, undefined)', () => {
    const env = loadEnvironment();
    const { window, doc } = env;
    const overlay = doc.getElementById('bm-overlay');
    const panel = doc.getElementById('bm-panel');

    const invalidSpots = ['spot9', 'invalid_spot', 'null', 'undefined', 999, ''];
    for (const badSpot of invalidSpots) {
      let threw = false;
      try {
        window.openModal(badSpot);
      } catch (err) {
        threw = true;
      }
      expect(threw).toBe(false, `openModal must not throw on invalid spot ${badSpot}`);
      // Observation: overlay gets 'bm-open' class, but renderModalContent returns early
      window.closeModal();
      expect(overlay.classList.contains('bm-open')).toBe(false);
    }
  });

  test('C4.3 - Video modal 50 rapid open/close cycles', () => {
    const env = loadEnvironment();
    env.window.initVideoLibrary();
    const { window, doc } = env;
    const videoModal = doc.getElementById('video-modal');

    for (let i = 0; i < 50; i++) {
      window.openVideoModal('ex_shoulder_p1_01');
      expect(videoModal.classList.contains('open')).toBe(true);
      expect(videoModal.getAttribute('aria-hidden')).toBe('false');
      expect(doc.body.style.overflow).toBe('hidden');

      window.closeVideoModal();
      expect(videoModal.classList.contains('open')).toBe(false);
      expect(videoModal.getAttribute('aria-hidden')).toBe('true');
      expect(doc.body.style.overflow).toBe('');
    }
  });

  test('C4.4 - Fuzzing video modal with invalid video IDs', () => {
    const env = loadEnvironment();
    env.window.initVideoLibrary();
    const { window, doc } = env;
    const videoModal = doc.getElementById('video-modal');

    const invalidIds = ['nonexistent_video', 'bad_id_123', null, undefined, '', 0];
    for (const badId of invalidIds) {
      let threw = false;
      try {
        window.openVideoModal(badId);
      } catch (err) {
        threw = true;
      }
      expect(threw).toBe(false, `openVideoModal must not throw on invalid videoId ${badId}`);
      expect(videoModal.classList.contains('open')).toBe(false, `Modal must remain closed on invalid id ${badId}`);
    }
  });

  test('C4.5 - Timestamp jump cue fuzzing with adversarial timeSec values', () => {
    const env = loadEnvironment();
    env.window.initVideoLibrary();
    const { window } = env;

    // 1. YouTube video modal
    window.openVideoModal('ex_shoulder_p1_01');
    const fuzzedTimes = [undefined, null, NaN, -999, 999999, 'invalid_time', {}, []];
    for (const t of fuzzedTimes) {
      let threw = false;
      try {
        window.jumpVideoTimestamp(t);
      } catch (err) {
        threw = true;
      }
      expect(threw).toBe(false, `jumpVideoTimestamp on YouTube embed must not throw on bad time ${JSON.stringify(t)}`);
    }
    window.closeVideoModal();

    // 2. Surgical HTML5 video modal (local://)
    window.openVideoModal('surg_01_01');
    const videoEl = env.doc.getElementById('vmodal-html5');
    expect(Boolean(videoEl)).toBe(true, 'HTML5 video element must be mounted for surgical video');

    // Observation: HTML5 video element without .play() mock or in unmocked environment
    let playTypeErrorCaught = false;
    try {
      window.jumpVideoTimestamp(30);
    } catch (err) {
      if (err.message && err.message.includes('video.play is not a function')) {
        playTypeErrorCaught = true;
      }
    }
    expect(playTypeErrorCaught).toBe(false, 'jumpVideoTimestamp safely guards video.play() without throwing');
    window.closeVideoModal();
  });

  test('C4.6 - Calculator-to-Video jump CTA: Empirical check of exercise ID matching', () => {
    const env = loadEnvironment();
    env.window.initCalculator();
    env.window.initVideoLibrary();
    const { doc, window } = env;

    const jumpBtn = doc.getElementById('calc-jump-video-btn');
    const videoModal = doc.getElementById('video-modal');

    // Run calculator on default knee
    window.runCalculator();

    // User clicks "Xem Hướng Dẫn Chi Tiết (Video)"
    jumpBtn.click();

    // Video modal opens cleanly because ex.id resolves to ex_knee_p1_01 via catalogId and alias mapping
    const modalOpened = videoModal.classList.contains('open');
    expect(modalOpened).toBe(true, 'Calculator jump button opens modal cleanly with harmonized video ID');
  });

  test('C4.7 - Escape key closes both modals and drawer simultaneously', () => {
    const env = loadEnvironment();
    env.window.initMobileDrawer();
    env.window.initVideoLibrary();
    const { window, doc } = env;

    const videoModal = doc.getElementById('video-modal');
    const drawer = doc.getElementById('mobile-drawer');

    window.openVideoModal('ex_shoulder_p1_01');
    window.openDrawer();

    expect(videoModal.classList.contains('open')).toBe(true);
    expect(drawer.classList.contains('open')).toBe(true);

    // Press Escape
    doc.dispatchEvent({ type: 'keydown', key: 'Escape' });

    expect(videoModal.classList.contains('open')).toBe(false, 'Escape must close video modal');
    expect(drawer.classList.contains('open')).toBe(false, 'Escape must close mobile drawer');
    expect(doc.body.style.overflow).toBe('', 'Escape must restore body scroll');
  });
});

// =========================================================================
// SUITE 5: DOM Integrity, Mutation Stability & Memory Leak Stress Test
// =========================================================================
describe('Adversarial C5: DOM Memory Leak & Mutation Stability', () => {
  test('C5.1 - 200 cycles of hotspot re-rendering (renderHotspots()) preserves strictly 9 children', () => {
    const env = loadEnvironment();
    const stage = env.doc.getElementById('bm-stage');

    for (let i = 0; i < 200; i++) {
      env.window.renderHotspots();
    }

    // 1 base img + 8 hotspots = exactly 9 children
    expect(stage.children.length).toBe(9, 'Hotspot container must strictly maintain 9 children without memory leak');
  });

  test('C5.2 - 200 cycles of video grid re-rendering maintains exact catalog size', () => {
    const env = loadEnvironment();
    env.window.initVideoLibrary();
    const grid = env.doc.getElementById('video-grid');

    for (let i = 0; i < 200; i++) {
      env.window.renderVideoGrid();
    }

    expect(grid.children.length).toBe(105, 'Video grid must strictly maintain 105 child cards without accumulating leaks');
  });

  test('C5.3 - Testimonial slider navigation: Empirical check of NaN infection in goToSlide', () => {
    const env = loadEnvironment();
    env.window.initSlider();
    const track = env.doc.getElementById('slider-track');

    // Normal slide transitions work
    env.window.nextSlide();
    env.window.prevSlide();
    expect(typeof track.style.transform).toBe('string');

    // NaN input to goToSlide is guarded and does not corrupt track transform
    const beforeTransform = track.style.transform;
    env.window.goToSlide(NaN);
    expect(track.style.transform).toBe(beforeTransform, 'goToSlide(NaN) is safely ignored without corrupting transform');

    // Subsequent nextSlide() calls work normally without NaN corruption
    env.window.nextSlide();
    expect(track.style.transform !== 'translateX(-NaN%)').toBe(true, 'nextSlide continues working cleanly');
  });
});

// =========================================================================
// AUTO EXECUTION HOOK
// =========================================================================
if (require.main === module) {
  runAllSuites().then(res => {
    process.exit(res.exitCode);
  }).catch(err => {
    console.error('Fatal adversarial suite error:', err);
    process.exit(1);
  });
}
