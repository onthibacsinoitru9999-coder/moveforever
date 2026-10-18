/**
 * MOVEFOREVER - PWA & TABBED ARCHITECTURE VERIFICATION TEST
 */

const fs = require('fs');
const path = require('path');

console.log('====================================================');
console.log('  MOVE FOREVER - PWA & TABBED UI TEST SUITE        ');
console.log('====================================================\n');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✔ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ✖ FAIL: ${message}`);
    failed++;
  }
}

// 1. Verify Manifest JSON
console.log('▶ Suite 1: PWA Web App Manifest Verification');
try {
  const manifestPath = path.join(__dirname, '..', 'manifest.json');
  assert(fs.existsSync(manifestPath), 'manifest.json exists in site root');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  assert(manifest.name && manifest.name.includes('Move Forever'), 'Manifest contains full app name');
  assert(manifest.short_name === 'MoveForever', 'Manifest contains short_name');
  assert(manifest.display === 'standalone', 'Manifest display mode is set to standalone');
  assert(manifest.theme_color === '#0284c7', 'Manifest theme_color is clean medical sky blue');
  assert(Array.isArray(manifest.icons) && manifest.icons.length >= 2, 'Manifest includes icons array with >=2 sizes');
  assert(manifest.icons.some(i => i.sizes === '192x192'), 'Manifest has 192x192 icon');
  assert(manifest.icons.some(i => i.sizes === '512x512'), 'Manifest has 512x512 icon');
} catch (e) {
  assert(false, `Manifest validation failed: ${e.message}`);
}

// 2. Verify Service Worker
console.log('\n▶ Suite 2: PWA Service Worker (sw.js) Verification');
try {
  const swPath = path.join(__dirname, '..', 'sw.js');
  assert(fs.existsSync(swPath), 'sw.js exists in site root');
  const swCode = fs.readFileSync(swPath, 'utf8');
  assert(swCode.includes('addEventListener(\'install\''), 'Service worker handles install event');
  assert(swCode.includes('addEventListener(\'activate\''), 'Service worker handles activate event');
  assert(swCode.includes('addEventListener(\'fetch\''), 'Service worker handles fetch event for offline caching');
} catch (e) {
  assert(false, `sw.js validation failed: ${e.message}`);
}

// 3. Verify PWA Icons
console.log('\n▶ Suite 3: PWA Icons File Integrity');
const icons = ['favicon.png', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'];
icons.forEach(icon => {
  const iconPath = path.join(__dirname, '..', icon);
  assert(fs.existsSync(iconPath) && fs.statSync(iconPath).size > 500, `Icon file ${icon} exists and has valid payload`);
});

// 4. Verify Tabbed Single-Page Architecture in HTML & JS
console.log('\n▶ Suite 4: Tabbed Architecture & switchMainTab DOM Behavior');
try {
  const { switchMainTab } = require('../app.js');
  assert(typeof switchMainTab === 'function', 'switchMainTab is exported as a function');

  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  assert(html.includes('class="bm-section app-tab-pane active"'), 'body-map section starts with app-tab-pane active');
  assert(html.includes('id="calculator" class="calculator-section app-tab-pane"'), 'calculator section has app-tab-pane class');
  assert(html.includes('id="framework" class="framework-section app-tab-pane"'), 'framework section has app-tab-pane class');
  assert(html.includes('id="video-library" class="video-library-section app-tab-pane"'), 'video-library section has app-tab-pane class');
  assert(html.includes('id="science" class="science-section app-tab-pane"'), 'science section has app-tab-pane class');
  assert(html.includes('id="testimonials" class="testimonials-section app-tab-pane"'), 'testimonials section has app-tab-pane class');
  assert(html.includes('id="apply" class="apply-section app-tab-pane"'), 'apply section has app-tab-pane class');
  assert(html.includes('class="mobile-segmented-bar"'), 'mobile segmented bottom bar exists in HTML');
  assert(html.includes('class="pwa-install-banner"'), 'pwa install banner exists in HTML');
} catch (e) {
  assert(false, `Tabbed architecture validation failed: ${e.message}`);
}

// 5. Verify Clean Medical UI in CSS
console.log('\n▶ Suite 5: Clean Medical UI Design System Verification');
try {
  const css = fs.readFileSync(path.join(__dirname, '..', 'style.css'), 'utf8');
  assert(css.includes('--bg-main: #f8fafc;'), 'Clean light background #f8fafc configured');
  assert(css.includes('--text-main: #0f172a;'), 'High-contrast slate dark text #0f172a configured');
  assert(css.includes('--accent-cyan: #0284c7;'), 'Clean medical sky blue #0284c7 configured');
  assert(css.includes('.app-tab-pane'), 'CSS defines .app-tab-pane display rules');
  assert(css.includes('.mobile-segmented-bar'), 'CSS defines .mobile-segmented-bar fixed bottom rules');
  assert(css.includes('.pwa-install-banner'), 'CSS defines .pwa-install-banner styling');
} catch (e) {
  assert(false, `Clean UI CSS validation failed: ${e.message}`);
}

console.log('\n----------------------------------------------------');
console.log(`TOTAL TESTS: ${passed + failed}`);
console.log(`PASSED:      ${passed}`);
console.log(`FAILED:      ${failed}`);
console.log('----------------------------------------------------');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('ALL PWA & TABBED ARCHITECTURE TESTS PASSED CLEANLY!\n');
}
