/**
 * Verification test suite for Post-Operative Trauma & Osteosynthesis Rehabilitation
 * Run: node test/test_postop_rehab.js
 */
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'app.js');
const indexPath = path.join(__dirname, '..', 'index.html');
const stylePath = path.join(__dirname, '..', 'style.css');

const app = require(appPath);
const indexHtml = fs.readFileSync(indexPath, 'utf8');
const styleCss = fs.readFileSync(stylePath, 'utf8');

console.log('Testing Post-Op Trauma & Osteosynthesis Rehabilitation Implementation...\n');

let passCount = 0;
let failCount = 0;

function runTest(desc, fn) {
  try {
    fn();
    console.log(`  ✓ ${desc}`);
    passCount++;
  } catch (err) {
    console.error(`  ✗ ${desc}`);
    console.error(`    ${err.message}`);
    failCount++;
  }
}

// 1. Translations
runTest('TRANSLATIONS has identical keys in VI and EN', () => {
  const viKeys = Object.keys(app.TRANSLATIONS.vi).sort();
  const enKeys = Object.keys(app.TRANSLATIONS.en).sort();
  assert.strictEqual(viKeys.length, enKeys.length, `Key counts differ: vi=${viKeys.length}, en=${enKeys.length}`);
  const missingInEn = viKeys.filter(k => !app.TRANSLATIONS.en[k]);
  const missingInVi = enKeys.filter(k => !app.TRANSLATIONS.vi[k]);
  assert.deepStrictEqual(missingInEn, [], `Keys missing in EN: ${missingInEn.join(', ')}`);
  assert.deepStrictEqual(missingInVi, [], `Keys missing in VI: ${missingInVi.join(', ')}`);
});

runTest('TRANSLATIONS contains all post-op keys', () => {
  const requiredKeys = [
    'nav_postop', 'nav_postop_short', 'vid_cat_postop', 'postop_badge', 'postop_title', 'postop_sub',
    'postop_ao_heading', 'postop_abs_title', 'postop_abs_desc', 'postop_rel_title', 'postop_rel_desc',
    'postop_timeline_heading', 'postop_p1_badge', 'postop_p1_title', 'postop_p1_weight', 'postop_p1_rx',
    'postop_p2_badge', 'postop_p2_title', 'postop_p2_weight', 'postop_p2_rx',
    'postop_p3_badge', 'postop_p3_title', 'postop_p3_weight', 'postop_p3_rx',
    'postop_p4_badge', 'postop_p4_title', 'postop_p4_weight', 'postop_p4_rx',
    'postop_pathways_heading', 'postop_surg1_title', 'postop_surg1_desc', 'postop_surg2_title', 'postop_surg2_desc',
    'postop_surg3_title', 'postop_surg3_desc', 'postop_surg4_title', 'postop_surg4_desc', 'postop_surg5_title', 'postop_surg5_desc',
    'postop_surg6_title', 'postop_surg6_desc', 'postop_redflags_heading', 'postop_rf1_title', 'postop_rf1_desc',
    'postop_rf2_title', 'postop_rf2_desc', 'postop_rf3_title', 'postop_rf3_desc', 'postop_rf4_title', 'postop_rf4_desc',
    'postop_cta_btn'
  ];
  for (const k of requiredKeys) {
    assert(app.TRANSLATIONS.vi[k], `Missing VI translation for ${k}`);
    assert(app.TRANSLATIONS.en[k], `Missing EN translation for ${k}`);
  }
});

// 2. Video Catalog
runTest('VIDEO_LIBRARY_CATALOG contains 8 post-op clinical videos', () => {
  const postOpVideos = app.VIDEO_LIBRARY_CATALOG.filter(v => v.category === 'post_op' || v.phase === 'post_op');
  assert.strictEqual(postOpVideos.length, 8, `Expected 8 post-op videos, found ${postOpVideos.length}`);
});

runTest('Post-op videos contain full clinical schema (bilingual titles, rationales, errors, regressions)', () => {
  const postOpVideos = app.VIDEO_LIBRARY_CATALOG.filter(v => v.category === 'post_op');
  for (const v of postOpVideos) {
    assert(v.id, 'Video must have an ID');
    assert(v.title_vi && v.title_en, `Video ${v.id} missing bilingual title`);
    assert(v.videoUrl, `Video ${v.id} missing videoUrl`);
    assert(v.dosage_vi && v.dosage_en, `Video ${v.id} missing dosage`);
    assert(v.rationale_vi && v.rationale_en, `Video ${v.id} missing biological rationale`);
    assert(Array.isArray(v.common_errors_vi) && v.common_errors_vi.length > 0, `Video ${v.id} missing common_errors_vi`);
    assert(Array.isArray(v.common_errors_en) && v.common_errors_en.length > 0, `Video ${v.id} missing common_errors_en`);
    assert(v.regression_vi && v.regression_en, `Video ${v.id} missing regression`);
    assert(v.progression_vi && v.progression_en, `Video ${v.id} missing progression`);
    assert(v.surgical_correlation_vi && v.surgical_correlation_en, `Video ${v.id} missing surgical_correlation`);
  }
});

// 3. HTML Markup
runTest('index.html contains #post-op section with all required components', () => {
  assert(indexHtml.includes('id="post-op"'), 'index.html must contain #post-op section');
  assert(indexHtml.includes('postop-ao-grid'), 'index.html must contain AO stability grid');
  assert(indexHtml.includes('postop-timeline-grid'), 'index.html must contain 4-phase timeline grid');
  assert(indexHtml.includes('postop-surg-grid'), 'index.html must contain 6 surgical pathways');
  assert(indexHtml.includes('postop-redflags-box'), 'index.html must contain red flags warning box');
});

runTest('index.html navigation includes post-op in header, drawer, mobile bar, and footer', () => {
  assert(indexHtml.includes('data-tab-target="post-op"'), 'Header nav must contain post-op button');
  assert(indexHtml.includes('href="#tab-post-op"'), 'Mobile drawer must contain post-op link');
  assert(indexHtml.includes('data-tab="post-op"'), 'Mobile segmented bar must contain post-op button');
  assert(indexHtml.includes('href="#post-op"'), 'Footer links must contain post-op link');
  assert(indexHtml.includes('data-cat="post_op"'), 'Video category pills must contain post_op button');
});

// 4. CSS Styling
runTest('style.css contains styles for postop elements', () => {
  assert(styleCss.includes('.postop-section'), 'style.css missing .postop-section');
  assert(styleCss.includes('.postop-ao-grid'), 'style.css missing .postop-ao-grid');
  assert(styleCss.includes('.postop-timeline-grid'), 'style.css missing .postop-timeline-grid');
  assert(styleCss.includes('.postop-surg-grid'), 'style.css missing .postop-surg-grid');
  assert(styleCss.includes('.postop-redflags-box'), 'style.css missing .postop-redflags-box');
  assert(styleCss.includes('.video-badge.postop'), 'style.css missing .video-badge.postop');
  assert(styleCss.includes('.postop-eval-tool-block'), 'style.css missing .postop-eval-tool-block');
  assert(styleCss.includes('.postop-safety-warning'), 'style.css missing .postop-safety-warning');
});

// 5. AO Post-Op Interactive Evaluator Engine
runTest('AO_POSTOP_ENGINE evaluates IM nail, LCP, tension band, ACL, and rotator cuff', () => {
  assert(app.AO_POSTOP_ENGINE, 'AO_POSTOP_ENGINE must exist');
  assert(typeof app.evaluateAOPostOp === 'function', 'evaluateAOPostOp must be a function');

  // Test IM Nail Phase 2
  const imRes = app.evaluateAOPostOp({ surgery: 'im_nail', time: 'p2', vas: 4 });
  assert.strictEqual(imRes.surgeryKey, 'im_nail');
  assert.strictEqual(imRes.phaseKey, 'p2');
  assert(imRes.wbVi.includes('PWB'));
  assert(imRes.romVi.includes('0-90°'));
  assert.strictEqual(imRes.isSafetyDowngraded, false);

  // Test LCP Plate Phase 1
  const lcpRes = app.evaluateAOPostOp({ surgery: 'lcp_plate', time: 'p1', vas: 3 });
  assert.strictEqual(lcpRes.surgeryKey, 'lcp_plate');
  assert.strictEqual(lcpRes.phaseKey, 'p1');
  assert(lcpRes.wbVi.includes('NWB') || lcpRes.wbVi.includes('KHÔNG tì đè'));

  // Test Tension Band Wiring Phase 1
  const tbwRes = app.evaluateAOPostOp({ surgery: 'tension_band', time: 'p1', vas: 4 });
  assert(tbwRes.wbVi.includes('Khóa nẹp gối thẳng 0°'));

  // Test Rotator cuff Phase 1
  const rcRes = app.evaluateAOPostOp({ surgery: 'rotator_cuff', time: 'p1', vas: 4 });
  assert(rcRes.wbVi.includes('Đeo đai túi'));
  assert(rcRes.romVi.includes('Codman'));

  // Test Safety Override: VAS >= 7 drops to P1
  const safeRes = app.evaluateAOPostOp({ surgery: 'im_nail', time: 'p3', vas: 8 });
  assert.strictEqual(safeRes.phaseKey, 'p1');
  assert.strictEqual(safeRes.isSafetyDowngraded, true);
  assert(safeRes.wbVi.includes('TDWB'));
});

runTest('index.html contains interactive post-op evaluator form and elements', () => {
  assert(indexHtml.includes('id="postop-surgery-select"'), 'index.html missing postop-surgery-select');
  assert(indexHtml.includes('id="postop-time-select"'), 'index.html missing postop-time-select');
  assert(indexHtml.includes('id="postop-vas-slider"'), 'index.html missing postop-vas-slider');
  assert(indexHtml.includes('id="postop-out-wb"'), 'index.html missing postop-out-wb');
  assert(indexHtml.includes('id="postop-safety-warning"'), 'index.html missing postop-safety-warning');
});

console.log(`\nPost-Op Test Summary: ${passCount} passed, ${failCount} failed.`);
if (failCount > 0) {
  process.exit(1);
} else {
  console.log('ALL POST-OP REHAB & AO EVALUATOR TESTS PASSED! 🚀\n');
}
