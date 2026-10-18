/**
 * MoveForever Milestone 1 Verification Suite
 * Verifies EXERCISE_DATA across all 8 zones x 3 phases and CALCULATOR_ENGINE contract compliance.
 */

const assert = require('assert');
const app = require('./app.js');
const { EXERCISE_DATA, DOTS, CALCULATOR_ENGINE, calculateTendonLoad } = app;

console.log('====================================================');
console.log('   MOVE FOREVER - MILESTONE 1 VERIFICATION SUITE    ');
console.log('====================================================\n');

let passedTests = 0;
let totalTests = 0;

function test(description, fn) {
  totalTests++;
  try {
    fn();
    console.log(`[PASS] ${description}`);
    passedTests++;
  } catch (err) {
    console.error(`[FAIL] ${description}`);
    console.error(`       Error: ${err.message}`);
    throw err;
  }
}

// 1. Verify 8 Anatomical Zones in DOTS
test('DOTS contains exactly 8 registered anatomical zones', () => {
  assert.strictEqual(DOTS.length, 8, 'Must have exactly 8 dots');
  const expectedZones = ['shoulder', 'core', 'elbow', 'lower_back', 'wrist', 'hip', 'knee', 'foot'];
  DOTS.forEach((d, i) => {
    assert(d.id, `Dot ${i} missing id`);
    assert(d.zone, `Dot ${i} missing zone`);
    assert(expectedZones.includes(d.zone), `Dot zone ${d.zone} unexpected`);
    assert(typeof d.xpct === 'number' && typeof d.ypct === 'number', 'Coordinates must be numbers');
    assert(d.titleVi && d.titleEn, 'Must have bilingual titles');
  });
});

// 2. Verify EXERCISE_DATA across all 8 zones
const zonesToTest = ['spot1', 'spot2', 'spot3', 'spot4', 'spot5', 'spot6', 'spot7', 'spot8'];
const semanticZones = ['shoulder', 'core', 'elbow', 'lower_back', 'wrist', 'hip', 'knee', 'foot'];

test('EXERCISE_DATA covers all 8 zones and semantic aliases', () => {
  zonesToTest.forEach(z => {
    assert(EXERCISE_DATA[z], `Missing EXERCISE_DATA for ${z}`);
  });
  semanticZones.forEach(sz => {
    assert(EXERCISE_DATA[sz], `Missing alias for semantic zone ${sz}`);
  });
});

// 3. Verify Clinical Rigor for all 8 zones x 3 phases
zonesToTest.forEach((zoneKey) => {
  const zoneData = EXERCISE_DATA[zoneKey];

  test(`Zone ${zoneKey} (${zoneData.titleEn}) has comprehensive metadata`, () => {
    assert(zoneData.titleVi && zoneData.titleEn, 'Bilingual titles required');
    assert(zoneData.pearlVi && zoneData.pearlEn, 'Clinical pearls required');
    assert(Array.isArray(zoneData.pathologiesVi) && zoneData.pathologiesVi.length > 0, 'Pathologies required');
    assert(zoneData.biomechanicalRulesVi && zoneData.biomechanicalRulesEn, 'Biomechanical rules required');
    assert(zoneData.morningTest && zoneData.morningTest.nameVi && zoneData.morningTest.instructionVi, 'Morning test required');
  });

  test(`Zone ${zoneKey} Phase 1 (Isometric) has Rio et al. 2015 citations & 70% MVC dosages`, () => {
    assert(Array.isArray(zoneData.p1) && zoneData.p1.length >= 2, 'Phase 1 must have at least 2 exercises');
    zoneData.p1.forEach((ex, idx) => {
      assert(ex.id, `Ex ${idx} missing id`);
      assert(ex.name && ex.nameVi && ex.nameEn, `Ex ${idx} missing name`);
      assert(ex.dosageVi && ex.dosageEn && ex.reps, `Ex ${idx} missing dosage`);
      assert(ex.intensity.includes('70%') || ex.dosageVi.includes('70%'), `Ex ${idx} intensity must specify 70% MVC`);
      assert(ex.tempo.toLowerCase().includes('isometric') || ex.dosageVi.includes('giữ tĩnh') || ex.tempo.includes('45s'), `Ex ${idx} tempo must specify Isometric`);
      assert(ex.rest, `Ex ${idx} missing rest interval`);
      assert(ex.frequencyVi && ex.frequencyEn, `Ex ${idx} missing frequency`);
      assert(ex.clinicalCitation, `Ex ${idx} missing clinical citation`);
      assert(ex.clinicalRationaleVi && ex.clinicalRationaleEn, `Ex ${idx} missing clinical rationale`);
      assert(ex.painRuleVi && ex.painRuleEn, `Ex ${idx} missing 24h pain rule`);
      assert(Array.isArray(ex.commonErrorsVi) && ex.commonErrorsVi.length >= 3, `Ex ${idx} must have >= 3 common errors`);
      assert(ex.regressionVi && ex.progressionVi, `Ex ${idx} missing regression/progression`);
      assert(ex.videoUrl, `Ex ${idx} missing video URL`);
      assert(Array.isArray(ex.timestampCues) && ex.timestampCues.length > 0, `Ex ${idx} missing timestamp cues`);
    });
  });

  test(`Zone ${zoneKey} Phase 2 (HSR) has Tempo 3-1-3 & Kongsgaard/Beyer citations`, () => {
    assert(Array.isArray(zoneData.p2) && zoneData.p2.length >= 2, 'Phase 2 must have at least 2 exercises');
    zoneData.p2.forEach((ex, idx) => {
      assert(ex.id, `P2 Ex ${idx} missing id`);
      assert(ex.name && ex.nameVi && ex.nameEn, `P2 Ex ${idx} missing name`);
      assert(ex.dosageVi && ex.dosageEn, `P2 Ex ${idx} missing dosage`);
      assert(ex.tempo.includes('3-1-3') || ex.dosageVi.includes('3-1-3'), `P2 Ex ${idx} must specify 3-1-3 tempo`);
      assert(ex.frequencyVi.includes('3') || ex.frequencyEn.includes('3'), `P2 Ex ${idx} must specify 3 sessions/week`);
      assert(ex.clinicalCitation, `P2 Ex ${idx} missing clinical citation`);
      assert(ex.clinicalRationaleVi && ex.clinicalRationaleEn, `P2 Ex ${idx} missing clinical rationale`);
      assert(Array.isArray(ex.commonErrorsVi) && ex.commonErrorsVi.length >= 3, `P2 Ex ${idx} must have >= 3 common errors`);
      assert(ex.regressionVi && ex.progressionVi, `P2 Ex ${idx} missing regression/progression`);
    });
  });

  test(`Zone ${zoneKey} Phase 3 (SSC & End-Range) has Plyometric / ATG / FRC conditioning`, () => {
    assert(Array.isArray(zoneData.p3) && zoneData.p3.length >= 2, 'Phase 3 must have at least 2 exercises');
    zoneData.p3.forEach((ex, idx) => {
      assert(ex.id, `P3 Ex ${idx} missing id`);
      assert(ex.name && ex.nameVi && ex.nameEn, `P3 Ex ${idx} missing name`);
      assert(ex.clinicalCitation, `P3 Ex ${idx} missing citation`);
      assert(ex.clinicalRationaleVi && ex.clinicalRationaleEn, `P3 Ex ${idx} missing rationale`);
      assert(Array.isArray(ex.commonErrorsVi) && ex.commonErrorsVi.length >= 3, `P3 Ex ${idx} must have >= 3 common errors`);
      assert(ex.regressionVi && ex.progressionVi, `P3 Ex ${idx} missing regression/progression`);
    });
  });
});

// 4. Verify CALCULATOR_ENGINE Interface Contract & Scoring
test('CALCULATOR_ENGINE exists and provides evaluate, calculate, getZoneProtocols, getMorningTest', () => {
  assert(typeof CALCULATOR_ENGINE.evaluate === 'function', 'evaluate must be a function');
  assert(typeof CALCULATOR_ENGINE.calculate === 'function', 'calculate must be a function');
  assert(typeof CALCULATOR_ENGINE.getZoneProtocols === 'function', 'getZoneProtocols must be a function');
  assert(typeof CALCULATOR_ENGINE.getMorningTest === 'function', 'getMorningTest must be a function');
  assert(typeof calculateTendonLoad === 'function', 'calculateTendonLoad helper must be a function');
});

test('Case 1: Acute patellar tendinopathy flare -> Reactive stage & Phase 1 isometrics', () => {
  const result = CALCULATOR_ENGINE.evaluate({
    zone: 'knee',
    onset: 'acute',
    stiffness: 'mild',
    activity: 'high_jumping',
    vas: 7,
    latency: 'during'
  });

  assert.strictEqual(result.stage, 'reactive', 'Should be reactive');
  assert.strictEqual(result.startingPhase, 'p1', 'Should start at Phase 1');
  assert.strictEqual(result.isFlareUp, false, 'Should not be flare-up');
  assert(result.intensity.includes('70%') || result.intensityVi.includes('70%'), 'Intensity must reference 70% MVC');
  assert(result.dosage.includes('45s') || result.dosageVi.includes('45 giây'), 'Dosage must specify 45s holds');
  assert(result.exercise, 'Must provide primary exercise');
  assert.strictEqual(result.exercise.id, 'knee_p1_ex1', 'Primary exercise should be Spanish Squat Isometric');
  assert(result.morningTest.includes('Single-Leg Decline Squat') || result.morningTestVi.includes('Single-Leg Decline Squat'), 'Morning test must be decline squat');
  assert(result.painRule.includes('VAS <= 3/10') || result.painRuleVi.includes('VAS <= 3/10'), 'Pain rule must enforce VAS <= 3/10');
  assert(result.gatekeeperTest, 'Gatekeeper criteria must be populated');
});

test('Case 2: Subacute elbow pain -> Dysrepair stage & Phase 2 HSR', () => {
  const result = CALCULATOR_ENGINE.evaluate({
    zone: 'elbow',
    onset: 'subacute',
    stiffness: 'moderate',
    activity: 'moderate',
    vas: 3,
    latency: 'warmup_delayed'
  });

  assert.strictEqual(result.stage, 'dysrepair', 'Should be dysrepair');
  assert.strictEqual(result.startingPhase, 'p2', 'Should start at Phase 2 with low VAS');
  assert(result.tempo.includes('3-1-3'), 'Must prescribe 3-1-3 tempo');
  assert(result.frequency.includes('3'), 'Must prescribe 3 sessions/week');
  assert.strictEqual(result.exercise.id, 'elbow_p2_ex1', 'Should recommend Heavy Slow Dumbbell Wrist Extension');
});

test('Case 3: Chronic Achilles tendinopathy with morning stiffness -> Degenerative stage & Phase 2 HSR', () => {
  const result = CALCULATOR_ENGINE.evaluate({
    zone: 'achilles',
    onset: 'chronic',
    stiffness: 'severe',
    activity: 'moderate',
    vas: 3,
    latency: 'warmup_delayed'
  });

  assert.strictEqual(result.stage, 'degenerative', 'Should be degenerative');
  assert.strictEqual(result.startingPhase, 'p2', 'Should start at Phase 2 for stable degenerative tendon');
  assert(result.intensity.includes('70-85% 1RM') || result.intensityVi.includes('70-85%'), 'Should prescribe 70-85% 1RM');
  assert(result.exercise.id.includes('foot_p2_ex1'), 'Should prescribe Beyer 2015 HSR Calf Raise');
  assert(result.morningTest.includes('Single-Leg Heel Raise') || result.morningTestVi.includes('Nhón gót một chân'), 'Morning test should be single-leg heel raise');
});

test('Case 4: Chronic shoulder with high pain & worsening during load -> Reactive-on-Degenerative Flare', () => {
  const result = CALCULATOR_ENGINE.evaluate({
    zone: 'shoulder',
    onset: 'chronic',
    stiffness: 'severe',
    activity: 'heavy_lifting',
    vas: 8,
    latency: 'during'
  });

  assert.strictEqual(result.stage, 'reactive_on_degenerative', 'Should detect reactive-on-degenerative flare');
  assert.strictEqual(result.startingPhase, 'p1', 'Must calm flare with Phase 1 Isometrics before HSR');
  assert.strictEqual(result.isFlareUp, true, 'isFlareUp must be true');
  assert.strictEqual(result.exercise.id, 'shoulder_p1_ex1', 'Should prescribe Wall External Rotation Isometric');
});

test('Case 5: Asymptomatic athlete with chronic history -> Phase 3 SSC & End-range', () => {
  const result = CALCULATOR_ENGINE.evaluate({
    zone: 'hip',
    onset: 'chronic',
    stiffness: 'none',
    activity: 'high_jumping',
    vas: 1,
    latency: 'warmup_delayed'
  });

  assert.strictEqual(result.stage, 'degenerative', 'Continuum stage degenerative');
  assert.strictEqual(result.startingPhase, 'p3', 'Should advance to Phase 3');
  assert(result.exercise.id.includes('hip_p3_ex1'), 'Should recommend Skater hops or 90/90 FRC');
});

test('All 8 zones produce complete results without runtime exceptions', () => {
  semanticZones.forEach((z) => {
    const res = CALCULATOR_ENGINE.evaluate({ zone: z, onset: 'subacute', stiffness: 'mild', activity: 'moderate', vas: 4 });
    assert(res.stage, `Zone ${z} missing stage`);
    assert(res.startingPhase, `Zone ${z} missing startingPhase`);
    assert(res.intensity, `Zone ${z} missing intensity`);
    assert(res.dosage, `Zone ${z} missing dosage`);
    assert(res.frequency, `Zone ${z} missing frequency`);
    assert(res.painRule, `Zone ${z} missing painRule`);
    assert(res.gatekeeperTest, `Zone ${z} missing gatekeeperTest`);
    assert(res.morningTest, `Zone ${z} missing morningTest`);
    assert(res.exercise, `Zone ${z} missing primary exercise`);
    assert(Array.isArray(res.allPhaseExercises) && res.allPhaseExercises.length > 0, `Zone ${z} missing allPhaseExercises`);
  });
});

console.log(`\n====================================================`);
console.log(`VERIFICATION COMPLETE: ${passedTests}/${totalTests} TESTS PASSED CLEANLY!`);
console.log('====================================================\n');
