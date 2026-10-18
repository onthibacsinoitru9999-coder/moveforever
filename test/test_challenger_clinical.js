/**
 * ADVERSARIAL CLINICAL STRESS TEST & FUZZING HARNESS
 * MoveForever Mechanotherapy & Tendon Continuum System
 *
 * Agent: challenger_1 (teamwork_preview_challenger)
 * Role: Critic / Specialist (Empirical Challenger)
 * 
 * Verifies CALCULATOR_ENGINE robustness against:
 * 1. 10,000-case randomized fuzzing with malformed and hostile inputs
 * 2. 12,672-case exhaustive clinical permutation matrix
 * 3. Clinical safety invariants (Cook & Rio Tendon Continuum)
 * 4. Boundary and conflicting parameter permutations
 * 5. Natural-language and diacritic parsing edge cases
 * 6. Prototype pollution / property lookup isolation
 * 7. Cross-component Calculator -> Video Library linkage
 */

const assert = require('assert');
const app = require('../app.js');

const {
  CALCULATOR_ENGINE,
  calculateTendonLoad,
  EXERCISE_DATA,
  VIDEO_LIBRARY_CATALOG
} = app;

console.log('====================================================');
console.log('   MOVEFOREVER - ADVERSARIAL CLINICAL HARNESS      ');
console.log('====================================================\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const findings = [];

function recordTest(name, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`  [PASS] ${name}`);
  } catch (err) {
    failedTests++;
    console.log(`  [FAIL] ${name}`);
    console.log(`         Error: ${err.message}`);
    findings.push({ name, error: err.message });
  }
}

// ---------------------------------------------------------------------------
// SUITE 1: 10,000-CASE RANDOMIZED ADVERSARIAL FUZZING
// ---------------------------------------------------------------------------
console.log('▶ Suite 1: 10,000-Case Randomized Adversarial Fuzzing Engine');

recordTest('Fuzzing 1.1: 10,000 random malformed payloads do not throw uncaught exceptions', () => {
  const hostileStrings = [
    '', '   ', 'null', 'undefined', 'NaN', 'Infinity', '-Infinity',
    '<script>alert(1)</script>', 'DROP TABLE users;', '"; DROP TABLE;',
    'constructor', '__proto__', 'prototype', 'toString', 'valueOf', 'hasOwnProperty',
    '\\0', '\n\r\t', '🔥⚡️🦴', 'Đau gân gót chân rất nhiều', 'a'.repeat(5000)
  ];
  const hostileNumbers = [
    -999999, -100, -1, -0.0001, 0, 0.5, 3.14159, 10, 10.1, 100, 999999,
    NaN, Infinity, -Infinity
  ];
  const hostileTypes = [
    null, undefined, true, false, [], [1, 2], {}, { a: 1 }, () => {}, Symbol('test')
  ];

  const pool = [...hostileStrings, ...hostileNumbers, ...hostileTypes];
  let unhandledCrashes = 0;

  for (let i = 0; i < 10000; i++) {
    const rawPayload = {
      zone: pool[Math.floor(Math.random() * pool.length)],
      onset: pool[Math.floor(Math.random() * pool.length)],
      stiffness: pool[Math.floor(Math.random() * pool.length)],
      activity: pool[Math.floor(Math.random() * pool.length)],
      vas: pool[Math.floor(Math.random() * pool.length)],
      latency: pool[Math.floor(Math.random() * pool.length)]
    };

    try {
      const res = CALCULATOR_ENGINE.evaluate(rawPayload);
      assert(typeof res === 'object' && res !== null, 'Must return object');
      assert(typeof res.stage === 'string', 'Stage must be string');
      assert(typeof res.startingPhase === 'string', 'StartingPhase must be string');
    } catch (e) {
      unhandledCrashes++;
      if (unhandledCrashes <= 3) {
        console.error(`      Fuzz crash on iteration ${i}:`, e.message, rawPayload);
      }
    }
  }

  assert.strictEqual(unhandledCrashes, 0, `Expected 0 crashes during fuzzing, got ${unhandledCrashes}`);
});

recordTest('Fuzzing 1.2: Completely empty or corrupted payload shapes return valid fallback schema', () => {
  const corruptedShapes = [
    undefined,
    null,
    {},
    { zone: undefined },
    { vas: null },
    [],
    42,
    "plain string",
    { zone: { nested: true }, onset: [1, 2, 3] }
  ];

  for (const shape of corruptedShapes) {
    const res = CALCULATOR_ENGINE.evaluate(shape);
    assert(res.stage, 'res.stage must be defined');
    assert(res.startingPhase, 'res.startingPhase must be defined');
    assert(res.intensity, 'res.intensity must be defined');
    assert(res.dosage, 'res.dosage must be defined');
    assert(res.painRule, 'res.painRule must be defined');
    assert(res.gatekeeperTest, 'res.gatekeeperTest must be defined');
    assert(res.morningTest, 'res.morningTest must be defined');
  }
});

// ---------------------------------------------------------------------------
// SUITE 2: 12,672 EXHAUSTIVE CLINICAL PERMUTATION MATRIX & SAFETY INVARIANTS
// ---------------------------------------------------------------------------
console.log('\n▶ Suite 2: Exhaustive Clinical Permutation Matrix (12,672 Scenarios)');

const zones = ['shoulder', 'core', 'elbow', 'lower_back', 'wrist', 'hip', 'knee', 'foot'];
const onsets = ['acute', 'subacute', 'chronic'];
const stiffnesses = ['none', 'mild', 'moderate', 'severe'];
const activities = ['sedentary', 'moderate', 'high_jumping', 'heavy_lifting'];
const vases = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const latencies = ['during', 'warmup_delayed', 'constant'];

let highVasFailures = 0;
let acutePlyometricFailures = 0;
let constantPlyometricFailures = 0;
let worseDuringPlyometricFailures = 0;
let severeStiffnessPlyometricFailures = 0;
let acuteHsRFailures = 0;
let subacuteWorseDuringHsRFailures = 0;

for (const zone of zones) {
  for (const onset of onsets) {
    for (const stiffness of stiffnesses) {
      for (const activity of activities) {
        for (const vas of vases) {
          for (const latency of latencies) {
            const res = CALCULATOR_ENGINE.evaluate({ zone, onset, stiffness, activity, vas, latency });

            // Invariant 1: Pain Safety Ceiling (VAS >= 6) must strictly stay in Phase 1
            if (vas >= 6 && res.startingPhase !== 'p1') {
              highVasFailures++;
            }

            // Invariant 2: Acute onset (< 6 weeks) must NEVER get Phase 3 (plyometrics)
            if (onset === 'acute' && res.startingPhase === 'p3') {
              acutePlyometricFailures++;
            }

            // Invariant 3: Constant unremitting pain must NEVER get Phase 3 (plyometrics)
            if (latency === 'constant' && res.startingPhase === 'p3') {
              constantPlyometricFailures++;
            }

            // Invariant 4: Worsening during load must NEVER get Phase 3 (plyometrics)
            if (latency === 'during' && res.startingPhase === 'p3') {
              worseDuringPlyometricFailures++;
            }

            // Invariant 5: Severe morning stiffness (>30m) must NEVER get Phase 3 (plyometrics)
            if (stiffness === 'severe' && res.startingPhase === 'p3') {
              severeStiffnessPlyometricFailures++;
            }

            // Invariant 6: Acute onset (< 6 weeks) must not receive Phase 2 HSR (70-85% 1RM)
            if (onset === 'acute' && res.startingPhase === 'p2') {
              acuteHsRFailures++;
            }

            // Invariant 7: Subacute onset with severe stiffness and pain worsening during load (VAS 4) must not receive Phase 2 HSR
            if (onset === 'subacute' && stiffness === 'severe' && latency === 'during' && vas >= 4 && res.startingPhase === 'p2') {
              subacuteWorseDuringHsRFailures++;
            }
          }
        }
      }
    }
  }
}

recordTest('Safety Invariant 2.1: Pain Safety Ceiling (VAS >= 6 strictly locked to Phase 1 isometrics)', () => {
  assert.strictEqual(highVasFailures, 0, `Expected 0 high VAS violations, got ${highVasFailures}`);
});

recordTest('Safety Invariant 2.2: Acute onset (<6w) strictly barred from Phase 3 plyometrics', () => {
  assert.strictEqual(acutePlyometricFailures, 0, `Expected 0 acute plyometric violations, got ${acutePlyometricFailures}`);
});

recordTest('Safety Invariant 2.3: Worsening during load (latency: during) strictly barred from Phase 3 plyometrics', () => {
  assert.strictEqual(worseDuringPlyometricFailures, 0, `Expected 0 worse-during plyometric violations, got ${worseDuringPlyometricFailures}`);
});

recordTest('Safety Invariant 2.4: Severe morning stiffness (>30m) strictly barred from Phase 3 plyometrics', () => {
  assert.strictEqual(severeStiffnessPlyometricFailures, 0, `Expected 0 severe stiffness plyometric violations, got ${severeStiffnessPlyometricFailures}`);
});

recordTest('Safety Invariant 2.5: Constant unremitting pain (latency: constant) MUST NOT receive Phase 3 plyometrics', () => {
  assert.strictEqual(
    constantPlyometricFailures,
    0,
    `Clinical Safety Violation: Found ${constantPlyometricFailures} occurrences where constant unremitting tendon pain received Phase 3 explosive plyometrics/elastic recoil!`
  );
});

recordTest('Safety Invariant 2.6: Acute overload presentation (<6w) MUST NOT be prescribed Phase 2 Heavy Slow Resistance', () => {
  assert.strictEqual(
    acuteHsRFailures,
    0,
    `Clinical Classification Violation: Found ${acuteHsRFailures} occurrences where acute onset (<6w) was classified as structural dysrepair/degenerative and prescribed Phase 2 HSR!`
  );
});

recordTest('Safety Invariant 2.7: Subacute flare with pain worsening during load (VAS 4) MUST NOT receive Phase 2 HSR', () => {
  assert.strictEqual(
    subacuteWorseDuringHsRFailures,
    0,
    `Clinical Safety Violation: Found ${subacuteWorseDuringHsRFailures} occurrences where subacute tendon worsening during load with VAS 4 received Phase 2 HSR!`
  );
});

// ---------------------------------------------------------------------------
// SUITE 3: CONFLICTING & CONTRADICTORY PARAMETER STRESS TESTS
// ---------------------------------------------------------------------------
console.log('\n▶ Suite 3: Conflicting & Contradictory Clinical Parameter Scenarios');

recordTest('Conflict 3.1: Chronic history (>12w), 0 morning stiffness, but extreme pain VAS 10 (asserts Phase 1 isometrics)', () => {
  const res = CALCULATOR_ENGINE.evaluate({
    zone: 'achilles',
    onset: 'chronic',
    stiffness: 'none',
    activity: 'moderate',
    vas: 10,
    latency: 'warmup_delayed'
  });
  assert.strictEqual(res.stage, 'reactive_on_degenerative', 'High pain VAS 10 in chronic tendon must trigger reactive-on-degenerative flare');
  assert.strictEqual(res.startingPhase, 'p1', 'Must calm flare with Phase 1 isometrics');
});

recordTest('Conflict 3.2: Acute onset (<6w), 0 stiffness, but worsening during load and VAS 1 (asserts Phase 1 isometrics)', () => {
  const res = CALCULATOR_ENGINE.evaluate({
    zone: 'knee',
    onset: 'acute',
    stiffness: 'none',
    activity: 'high_jumping',
    vas: 1,
    latency: 'during'
  });
  assert.strictEqual(res.stage, 'reactive', 'Acute onset worsening during load is reactive');
  assert.strictEqual(res.startingPhase, 'p1', 'Acute reactive tendon must begin in Phase 1 isometrics');
});

recordTest('Conflict 3.3: Sedentary desk worker with chronic duration and VAS 0 (must NOT advance to Phase 3 plyometrics)', () => {
  const res = CALCULATOR_ENGINE.evaluate({
    zone: 'achilles',
    onset: 'chronic',
    stiffness: 'none',
    activity: 'sedentary',
    vas: 0,
    latency: 'warmup_delayed'
  });
  assert.notStrictEqual(res.startingPhase, 'p3', 'Sedentary desk worker without ballistic demand must not jump to Phase 3 plyometrics');
  assert.strictEqual(res.startingPhase, 'p2', 'Stable degenerative tendon in desk worker starts in Phase 2 HSR to build matrix');
});

recordTest('Conflict 3.4: Acute onset (<6w) with severe morning stiffness (>30m) and constant pain (VAS 2)', () => {
  const res = CALCULATOR_ENGINE.evaluate({
    zone: 'knee',
    onset: 'acute',
    stiffness: 'severe',
    activity: 'moderate',
    vas: 2,
    latency: 'constant'
  });
  // Clinical check: An acute case should NOT be classified as degenerative or prescribed Phase 2 HSR
  assert.strictEqual(res.stage, 'reactive', `Expected reactive classification for acute onset, got ${res.stage}`);
  assert.strictEqual(res.startingPhase, 'p1', `Expected Phase 1 isometrics for acute presentation, got ${res.startingPhase}`);
});

recordTest('Conflict 3.5: Chronic tendon with constant unremitting pain and VAS 2 in high jumping athlete', () => {
  const res = CALCULATOR_ENGINE.evaluate({
    zone: 'knee',
    onset: 'chronic',
    stiffness: 'none',
    activity: 'high_jumping',
    vas: 2,
    latency: 'constant'
  });
  // Clinical check: Constant unremitting pain indicates tendon irritability; cannot do ballistic plyometrics (p3)
  assert.notStrictEqual(
    res.startingPhase,
    'p3',
    'Constant unremitting pain violates readiness gate for Phase 3 explosive plyometrics!'
  );
});

// ---------------------------------------------------------------------------
// SUITE 4: PARSING PRECISION & NATURAL LANGUAGE BOUNDARY TESTS
// ---------------------------------------------------------------------------
console.log('\n▶ Suite 4: Input Normalization & Parsing Precision');

recordTest('Parsing 4.1: Numeric morning stiffness inputs (e.g. 45 min, 60 minutes) parse to severe (>30m)', () => {
  const cases = ['45 min', '60 minutes', '2 hours', '90m', '40 phút', '60m'];
  for (const c of cases) {
    const norm = CALCULATOR_ENGINE.normalizeInputs({ stiffness: c });
    assert.strictEqual(
      norm.stiffness,
      'severe',
      `Input "${c}" should normalize to "severe", but normalized to "${norm.stiffness}"`
    );
  }
});

recordTest('Parsing 4.2: Numeric symptom duration inputs (e.g. 16 weeks, 6 months) parse to chronic (>12w)', () => {
  const cases = ['16 weeks', '6 months', '24 weeks', '1 year', '10 months', '1.5 years'];
  for (const c of cases) {
    const norm = CALCULATOR_ENGINE.normalizeInputs({ duration: c });
    assert.strictEqual(
      norm.onset,
      'chronic',
      `Input "${c}" should normalize to "chronic", but normalized to "${norm.onset}"`
    );
  }
});

recordTest('Parsing 4.3: Vietnamese diacritic duration inputs (e.g. "6 tháng", "8 tuần") parse correctly', () => {
  const norm1 = CALCULATOR_ENGINE.normalizeInputs({ duration: '6 tháng' });
  assert.strictEqual(norm1.onset, 'chronic', `Expected "6 tháng" to normalize to "chronic", got "${norm1.onset}"`);

  const norm2 = CALCULATOR_ENGINE.normalizeInputs({ duration: '8 tuần' });
  assert.strictEqual(norm2.onset, 'subacute', `Expected "8 tuần" to normalize to "subacute", got "${norm2.onset}"`);
});

recordTest('Parsing 4.4: Prototype property inputs (constructor, __proto__) are isolated and return string zone keys', () => {
  const res1 = CALCULATOR_ENGINE.evaluate({ zone: 'constructor' });
  assert.strictEqual(typeof res1.zoneKey, 'string', `res1.zoneKey should be string, got ${typeof res1.zoneKey}`);
  assert.strictEqual(typeof res1.inputs.zone, 'string', `res1.inputs.zone should be string, got ${typeof res1.inputs.zone}`);

  const protocols = CALCULATOR_ENGINE.getZoneProtocols('constructor');
  assert(protocols !== null, 'getZoneProtocols("constructor") must safely fall back to default protocols instead of returning null');
});

// ---------------------------------------------------------------------------
// SUITE 5: CROSS-COMPONENT CALCULATOR -> VIDEO LIBRARY LINKAGE AUDIT
// ---------------------------------------------------------------------------
console.log('\n▶ Suite 5: Cross-Component Calculator -> Video Library Linkage Audit');

recordTest('Linkage 5.1: Calculator primary exercise ID matches a video in VIDEO_LIBRARY_CATALOG', () => {
  const allZones = ['shoulder', 'core', 'elbow', 'lower_back', 'wrist', 'hip', 'knee', 'foot'];
  let matchedExercises = 0;
  let totalEvaluated = 0;

  for (const z of allZones) {
    for (const phase of ['p1', 'p2', 'p3']) {
      totalEvaluated++;
      const exercises = (EXERCISE_DATA[z] && EXERCISE_DATA[z][phase]) || [];
      if (exercises.length > 0) {
        const primaryEx = exercises[0];
        const hasMatchingVideo = VIDEO_LIBRARY_CATALOG.some(v => v.id === primaryEx.id || v.id === primaryEx.catalogId || (v.aliases && v.aliases.includes(primaryEx.id)));
        if (hasMatchingVideo) matchedExercises++;
      }
    }
  }

  assert(
    matchedExercises > 0,
    `Total mismatch between EXERCISE_DATA IDs (e.g. 'knee_p1_ex1') and VIDEO_LIBRARY_CATALOG IDs (e.g. 'ex_knee_p1_01'). Matched: ${matchedExercises}/${totalEvaluated}. This breaks the "Xem Video Hướng Dẫn" button!`
  );
});

// ---------------------------------------------------------------------------
// HARNESS EXECUTION SUMMARY
// ---------------------------------------------------------------------------
console.log('\n====================================================');
console.log(`TOTAL TESTS RUN:    ${totalTests}`);
console.log(`PASSED:             ${passedTests}`);
console.log(`FAILED / ANOMALIES: ${failedTests}`);
console.log('====================================================\n');

if (failedTests > 0) {
  console.log('Summary of Adversarial Findings:');
  findings.forEach((f, idx) => {
    console.log(`  ${idx + 1}. [${f.name}]`);
    console.log(`     ${f.error}\n`);
  });
}
