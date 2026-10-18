/**
 * MoveForever E2E Test Suite - Tier 2: Boundary Tests
 * Covers extreme inputs, threshold values, and edge cases across the
 * Tendon Continuum clinical evaluation engine and calculator logic:
 * - VAS Pain boundaries (0, 3, 4, 6, 10, out-of-range, NaN)
 * - Morning stiffness boundaries (0 min, <15 min, 15-30 min, >30 min, >60 min)
 * - Chronicity boundaries (<6 wks, 6-12 wks, >12 wks)
 * - Reactive-on-Degenerative flare-up detection
 * - Phase 3 progression criteria validation
 * - Missing, null, and empty inputs
 * Target: >= 35 boundary assertions.
 */

const { describe, test, it, expect, assert, loadEnvironment } = require('./test_runner.js');

describe('Tier 2: VAS Pain Scale Boundary Tests (R3)', () => {
  const env = loadEnvironment();
  const calculate = env.window.calculateTendonLoad;

  test('T2.1 - VAS = 0 (Completely pain-free baseline)', () => {
    const res = calculate({
      zone: 'knee',
      duration: '>12wks',
      morningStiffness: '0min',
      activityIntensity: 'high_impact_jumping',
      currentVAS: 0,
      loadLatency: 'improves_warmup_aches_next_day'
    });
    expect(res.startingPhase).toBe('p3', 'Pain-free chronic jumper with 0 stiffness should advance to Phase 3');
    expect(res.isFlareUp).toBe(false, 'VAS 0 cannot be an acute flare-up');
  });

  test('T2.2 - VAS = 3 (Cook & Purdam acceptable exercise pain threshold)', () => {
    const res = calculate({
      zone: 'knee',
      duration: '6-12wks',
      morningStiffness: '<15min',
      activityIntensity: 'moderate',
      currentVAS: 3,
      loadLatency: 'improves_warmup_aches_next_day'
    });
    expect(res.startingPhase).toBe('p2', 'VAS <= 3 in mild dysrepair allows Phase 2 HSR loading');
    expect(res.painRule).toContain('VAS <= 3/10', 'Pain rule must cite VAS <= 3/10 acceptable zone');
  });

  test('T2.3 - VAS = 4 (Boundary above acceptable threshold for dysrepair)', () => {
    const res = calculate({
      zone: 'knee',
      duration: '6-12wks',
      morningStiffness: '<15min',
      activityIntensity: 'moderate',
      currentVAS: 4,
      loadLatency: 'improves_warmup_aches_next_day'
    });
    expect(res.startingPhase).toBe('p1', 'VAS 4 in dysrepair should stay in Phase 1 isometric tendon calming');
  });

  test('T2.4 - VAS = 6 (Threshold trigger for Reactive-on-Degenerative flare-up)', () => {
    const res = calculate({
      zone: 'achilles',
      duration: '>12wks',
      morningStiffness: '15-30min',
      activityIntensity: 'moderate',
      currentVAS: 6,
      loadLatency: 'improves_warmup_aches_next_day'
    });
    expect(res.stage).toBe('reactive_on_degenerative', 'Chronic tendon with VAS >= 6 must be flagged as reactive_on_degenerative');
    expect(res.startingPhase).toBe('p1', 'Active flare must be calmed in Phase 1 before HSR');
    expect(res.isFlareUp).toBe(true, 'Flare-up flag must be true');
  });

  test('T2.5 - VAS = 10 (Maximum extreme pain score)', () => {
    const res = calculate({
      zone: 'shoulder',
      duration: '<6wks',
      morningStiffness: '0min',
      activityIntensity: 'heavy_lifting',
      currentVAS: 10,
      loadLatency: 'worse_during'
    });
    expect(res.stage).toBe('reactive', 'Acute VAS 10 must be classified as reactive');
    expect(res.startingPhase).toBe('p1', 'Extreme pain must start in Phase 1 isometrics');
    expect(res.intensity).toContain('Isometric', 'Intensity must be isometric');
  });

  test('T2.6 - Out-of-bounds VAS (< 0) clamped and handled gracefully', () => {
    const res = calculate({
      zone: 'elbow',
      duration: '<6wks',
      currentVAS: -5
    });
    expect(Boolean(res)).toBe(true, 'Should return valid result object');
    expect(['p1', 'p2', 'p3']).toContain(res.startingPhase, 'Starting phase must be valid');
  });

  test('T2.7 - Out-of-bounds VAS (> 10) handled safely without uncaught exception', () => {
    const res = calculate({
      zone: 'elbow',
      duration: '>12wks',
      currentVAS: 99
    });
    expect(res.startingPhase).toBe('p1', 'Excessive pain score must safely default to Phase 1');
  });

  test('T2.8 - Non-numeric VAS string parsed or defaulted cleanly', () => {
    const res = calculate({
      zone: 'wrist',
      currentVAS: 'moderate'
    });
    expect(Boolean(res.stage)).toBe(true, 'Must return valid stage');
    expect(Boolean(res.startingPhase)).toBe(true, 'Must return valid startingPhase');
  });
});

describe('Tier 2: Morning Stiffness Duration Boundary Tests (R1 & R3)', () => {
  const env = loadEnvironment();
  const calculate = env.window.calculateTendonLoad;

  test('T2.9 - Morning stiffness = 0 min (No matrix compromise)', () => {
    const res = calculate({
      zone: 'knee',
      duration: '<6wks',
      morningStiffness: '0min',
      currentVAS: 2
    });
    expect(res.stage).toBe('reactive', 'Acute onset with 0 stiffness is pure reactive');
    expect(res.startingPhase).toBe('p1', 'Reactive tendinopathy starts in Phase 1');
  });

  test('T2.10 - Morning stiffness < 15 min (Mild stiffness threshold)', () => {
    const res = calculate({
      zone: 'achilles',
      duration: '6-12wks',
      morningStiffness: '<15min',
      currentVAS: 2,
      loadLatency: 'improves_warmup_aches_next_day'
    });
    expect(res.stage).toBe('dysrepair', 'Subacute with mild stiffness is dysrepair');
    expect(res.startingPhase).toBe('p2', 'Low VAS and mild stiffness allows Phase 2 HSR progression');
  });

  test('T2.11 - Morning stiffness 15-30 min (Moderate matrix compromise)', () => {
    const res = calculate({
      zone: 'achilles',
      duration: '6-12wks',
      morningStiffness: '15-30min',
      currentVAS: 3,
      loadLatency: 'improves_warmup_aches_next_day'
    });
    expect(res.stage).toBe('dysrepair', '15-30m stiffness indicates structural dysrepair');
    expect(res.startingPhase).toBe('p2', 'VAS 3 with moderate stiffness permits Phase 2');
  });

  test('T2.12 - Morning stiffness > 30 min (Severe hallmark of degenerative tendinopathy)', () => {
    const res = calculate({
      zone: 'achilles',
      duration: '>12wks',
      morningStiffness: '>30min',
      currentVAS: 4,
      loadLatency: 'improves_warmup_aches_next_day'
    });
    expect(res.stage).toBe('degenerative', 'Stiffness > 30 min indicates chronic degenerative tendon');
    expect(res.startingPhase).toBe('p2', 'Degenerative tendon at VAS 4 starts in Phase 2 to treat the donut');
  });

  test('T2.13 - Extreme stiffness (>60 min) with moderate pain flags degenerative with cautious loading', () => {
    const res = calculate({
      zone: 'achilles',
      duration: '>12wks',
      morningStiffness: '>30min', // Represents >30m / severe
      currentVAS: 5,
      loadLatency: 'improves_warmup_aches_next_day'
    });
    expect(res.stage).toBe('degenerative', 'Severe morning stiffness indicates degenerative change');
    expect(res.startingPhase).toBe('p1', 'VAS 5 with prolonged morning stiffness requires Phase 1 calming first');
  });

  test('T2.14 - Unknown stiffness string fallback', () => {
    const res = calculate({
      zone: 'knee',
      morningStiffness: 'unspecified_duration'
    });
    expect(Boolean(res.stage)).toBe(true, 'Must produce valid stage on unknown stiffness');
    expect(Boolean(res.dosage)).toBe(true, 'Must produce valid dosage on unknown stiffness');
  });
});

describe('Tier 2: Symptom Chronicity & Duration Boundaries (R1 & R2)', () => {
  const env = loadEnvironment();
  const calculate = env.window.calculateTendonLoad;

  test('T2.15 - Acute onset (< 6 weeks) strictly maps to Reactive Tendinopathy', () => {
    const res = calculate({
      zone: 'knee',
      duration: '<6wks',
      morningStiffness: '0min',
      currentVAS: 5,
      loadLatency: 'worse_during'
    });
    expect(res.stage).toBe('reactive', 'Duration < 6 weeks must be classified as Reactive');
    expect(res.startingPhase).toBe('p1', 'Reactive tendinopathy must start in Phase 1 Isometric');
  });

  test('T2.16 - Subacute onset (6–12 weeks) maps to Tendon Dysrepair', () => {
    const res = calculate({
      zone: 'elbow',
      duration: '6-12wks',
      morningStiffness: '15-30min',
      currentVAS: 3,
      loadLatency: 'improves_warmup_aches_next_day'
    });
    expect(res.stage).toBe('dysrepair', 'Duration 6-12 weeks must be classified as Dysrepair');
  });

  test('T2.17 - Chronic onset (> 12 weeks) maps to Degenerative Tendinopathy when stable', () => {
    const res = calculate({
      zone: 'achilles',
      duration: '>12wks',
      morningStiffness: '15-30min',
      currentVAS: 3,
      loadLatency: 'improves_warmup_aches_next_day'
    });
    expect(res.stage).toBe('degenerative', 'Duration > 12 weeks with low VAS is Degenerative');
  });

  test('T2.18 - Chronic onset with acute worsening (worse_during) triggers flare-up safety rule', () => {
    const res = calculate({
      zone: 'patellar',
      duration: '>12wks',
      morningStiffness: '<15min',
      currentVAS: 4,
      loadLatency: 'worse_during' // Sharp worsening during activity
    });
    expect(res.stage).toBe('reactive_on_degenerative', 'Chronic tendon with sharp pain worsening is reactive-on-degenerative');
    expect(res.startingPhase).toBe('p1', 'Flare-up requires Phase 1 isometrics');
    expect(res.isFlareUp).toBe(true, 'isFlareUp must be true');
  });
});

describe('Tier 2: Load Latency Pattern Boundaries (R1)', () => {
  const env = loadEnvironment();
  const calculate = env.window.calculateTendonLoad;

  test('T2.19 - worse_during latency strongly pushes toward Reactive classification', () => {
    const res = calculate({
      zone: 'shoulder',
      duration: '<6wks',
      morningStiffness: '0min',
      currentVAS: 5,
      loadLatency: 'worse_during'
    });
    expect(res.stage).toBe('reactive', 'Immediate pain on loading signifies reactive pathology');
    expect(res.startingPhase).toBe('p1');
  });

  test('T2.20 - improves_warmup_aches_next_day confirms classic 24-hour delayed latent response', () => {
    const res = calculate({
      zone: 'achilles',
      duration: '>12wks',
      morningStiffness: '15-30min',
      currentVAS: 4,
      loadLatency: 'improves_warmup_aches_next_day'
    });
    expect(res.stage).toBe('degenerative', 'Warm-up phenomenon with next-day ache indicates degenerative matrix');
    expect(res.startingPhase).toBe('p2', 'Stable degenerative tendon starts in Phase 2 HSR');
  });

  test('T2.21 - constant_severe latency safely enforces Phase 1 isometrics', () => {
    const res = calculate({
      zone: 'lower_back',
      duration: '6-12wks',
      morningStiffness: '>30min',
      currentVAS: 7,
      loadLatency: 'constant_severe'
    });
    expect(res.startingPhase).toBe('p1', 'Constant severe pain must begin in Phase 1 pain control');
  });
});

describe('Tier 2: Activity Intensity Boundaries & Phase 3 Gates (R2 & R3)', () => {
  const env = loadEnvironment();
  const calculate = env.window.calculateTendonLoad;

  test('T2.22 - High impact jumping with zero stiffness and low VAS qualifies for Phase 3 (Plyometrics)', () => {
    const res = calculate({
      zone: 'knee',
      duration: '>12wks',
      morningStiffness: '0min',
      activityIntensity: 'high_impact_jumping',
      currentVAS: 1,
      loadLatency: 'improves_warmup_aches_next_day'
    });
    expect(res.startingPhase).toBe('p3', 'Asymptomatic jumping athlete should enter Phase 3 elastic training');
    expect(res.intensity).toContain('Elastic', 'Phase 3 intensity must specify elastic/recoil capacity');
  });

  test('T2.23 - Heavy lifting with low VAS qualifies for Phase 3 end-range loaded mobility', () => {
    const res = calculate({
      zone: 'hip',
      duration: '>12wks',
      morningStiffness: '<15min',
      activityIntensity: 'heavy_lifting',
      currentVAS: 2,
      loadLatency: 'improves_warmup_aches_next_day'
    });
    expect(res.startingPhase).toBe('p3', 'Heavy lifter with low pain and mild stiffness qualifies for Phase 3');
  });

  test('T2.24 - Sedentary desk worker with identical duration does NOT qualify for Phase 3', () => {
    const res = calculate({
      zone: 'lower_back',
      duration: '>12wks',
      morningStiffness: '0min',
      activityIntensity: 'sedentary',
      currentVAS: 2,
      loadLatency: 'improves_warmup_aches_next_day'
    });
    expect(res.startingPhase).toBe('p2', 'Sedentary individual requires Phase 2 HSR matrix building before plyometrics');
  });
});

describe('Tier 2: Empty, Null & Malformed Input Handling', () => {
  const env = loadEnvironment();
  const calculate = env.window.calculateTendonLoad;

  test('T2.25 - Empty input object defaults safely without crash', () => {
    const res = calculate({});
    expect(Boolean(res)).toBe(true, 'Must return an object');
    expect(Boolean(res.stage)).toBe(true, 'Must have stage property');
    expect(Boolean(res.startingPhase)).toBe(true, 'Must have startingPhase property');
    expect(Boolean(res.dosage)).toBe(true, 'Must have dosage property');
    expect(Boolean(res.painRule)).toBe(true, 'Must have painRule property');
  });

  test('T2.26 - Undefined input argument defaults safely', () => {
    const res = calculate(undefined);
    expect(Boolean(res)).toBe(true, 'Must return object even when called with undefined');
    expect(['p1', 'p2', 'p3']).toContain(res.startingPhase);
  });

  test('T2.27 - Null field values do not trigger runtime TypeError', () => {
    const res = calculate({
      zone: null,
      duration: null,
      morningStiffness: null,
      currentVAS: null,
      loadLatency: null
    });
    expect(Boolean(res)).toBe(true);
    expect(Boolean(res.stage)).toBe(true);
  });

  test('T2.28 - Special characters and unicode in zone input do not crash', () => {
    const res = calculate({
      zone: '<script>alert(1)</script>',
      duration: '<6wks'
    });
    expect(Boolean(res)).toBe(true);
    expect(['reactive', 'dysrepair', 'degenerative', 'reactive_on_degenerative']).toContain(res.stage);
  });
});

describe('Tier 2: Clinical Dosage & Gatekeeper Interface Integrity (PROJECT.md Contract)', () => {
  const env = loadEnvironment();
  const calculate = env.window.calculateTendonLoad;

  test('T2.29 - Phase 1 dosage specifies 5 sets x 45s holds at 70% MVC and 2 min rest', () => {
    const res = calculate({ duration: '<6wks', currentVAS: 8 });
    expect(res.startingPhase).toBe('p1');
    expect(res.dosage).toContain('45s holds', 'Must prescribe 45s isometric holds');
    expect(res.dosage).toContain('5 sets', 'Must prescribe 5 sets');
    expect(res.intensity).toContain('70% MVC', 'Must prescribe 70% MVC intensity');
    expect(res.frequency).toContain('Daily', 'Phase 1 frequency must be daily');
  });

  test('T2.30 - Phase 2 dosage specifies HSR with 3-1-3 tempo and 48h rest intervals', () => {
    const res = calculate({ duration: '>12wks', currentVAS: 3 });
    expect(res.startingPhase).toBe('p2');
    expect(res.intensity).toContain('3-1-3', 'Must specify 3-1-3 tempo');
    expect(res.frequency).toContain('48h rest', 'Must specify 48h rest between sessions');
  });

  test('T2.31 - Phase 3 dosage specifies elastic recoil and loaded end-range mobility', () => {
    const res = calculate({ duration: '>12wks', currentVAS: 1, activityIntensity: 'high_impact_jumping' });
    expect(res.startingPhase).toBe('p3');
    expect(res.dosage).toContain('elastic hops', 'Must prescribe elastic hops');
    expect(res.dosage).toContain('loaded mobility', 'Must prescribe loaded end-range mobility');
  });

  test('T2.32 - Progression gate for Phase 1 to Phase 2 requires 5 consecutive days of morning stiffness < 10m', () => {
    const res = calculate({ duration: '<6wks', currentVAS: 7 });
    expect(res.gatekeeperTest).toContain('5 consecutive days', 'Gatekeeper must require 5 consecutive days');
    expect(res.gatekeeperTest).toContain('< 10 min', 'Gatekeeper must require morning stiffness < 10 min');
  });

  test('T2.33 - Progression gate for Phase 2 to Phase 3 requires 4 consecutive weeks of HSR + LSI >= 85%', () => {
    const res = calculate({ duration: '>12wks', currentVAS: 3 });
    expect(res.gatekeeperTest).toContain('4 consecutive weeks', 'Gatekeeper must require 4 consecutive weeks of HSR');
    expect(res.gatekeeperTest).toContain('85%', 'Gatekeeper must require Limb Symmetry Index >= 85%');
  });

  test('T2.34 - Pain monitoring rule explicitly enforces 24-hour latency return to baseline', () => {
    const res = calculate({ duration: '<6wks', currentVAS: 5 });
    expect(res.painRule).toContain('24 hours', 'Must require return to baseline within 24 hours');
  });

  test('T2.35 - All outputs conform strictly to PROJECT.md interface contract schema', () => {
    const res = calculate({
      zone: 'knee',
      duration: '<6wks',
      morningStiffness: '0min',
      currentVAS: 5,
      loadLatency: 'worse_during'
    });
    expect(typeof res.stage).toBe('string');
    expect(typeof res.startingPhase).toBe('string');
    expect(typeof res.intensity).toBe('string');
    expect(typeof res.dosage).toBe('string');
    expect(typeof res.frequency).toBe('string');
    expect(typeof res.painRule).toBe('string');
    expect(typeof res.gatekeeperTest).toBe('string');
  });
});
