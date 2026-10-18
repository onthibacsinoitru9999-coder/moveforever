/**
 * MoveForever E2E Test Suite - Tier 3: Pairwise Combinatorial Tests
 * Combines 8 Anatomical Zones x 4 Tendon Continuum Stages x 2 Languages (VI/EN)
 * Validates cross-module interactions between Calculator engine,
 * Periodization protocols (EXERCISE_DATA), and Localization engine.
 * Target: >= 20 pairwise tests.
 */

const { describe, test, it, expect, assert, loadEnvironment } = require('./test_runner.js');

// Map semantic zones to EXERCISE_DATA hotspot IDs
const ZONE_TO_SPOT = {
  shoulder: 'spot1',
  core: 'spot2',
  elbow: 'spot3',
  lower_back: 'spot4',
  wrist: 'spot5',
  hip: 'spot6',
  knee: 'spot7',
  achilles: 'spot8'
};

// Parameter builders to deterministically trigger each clinical stage
function getInputsForStage(zone, targetStage) {
  switch (targetStage) {
    case 'reactive':
      return {
        zone,
        duration: '<6wks',
        morningStiffness: '0min',
        activityIntensity: 'moderate',
        currentVAS: 6,
        loadLatency: 'worse_during'
      };
    case 'dysrepair':
      return {
        zone,
        duration: '6-12wks',
        morningStiffness: '<15min',
        activityIntensity: 'moderate',
        currentVAS: 3,
        loadLatency: 'improves_warmup_aches_next_day'
      };
    case 'degenerative':
      return {
        zone,
        duration: '>12wks',
        morningStiffness: '15-30min',
        activityIntensity: 'moderate',
        currentVAS: 3,
        loadLatency: 'improves_warmup_aches_next_day'
      };
    case 'reactive_on_degenerative':
      return {
        zone,
        duration: '>12wks',
        morningStiffness: '>30min',
        activityIntensity: 'high_impact_jumping',
        currentVAS: 7, // High VAS triggers flare-up rule
        loadLatency: 'worse_during'
      };
    default:
      return { zone, duration: '<6wks', currentVAS: 5 };
  }
}

// 24 Pairwise combinations covering all 8 zones, 4 stages, and 2 languages
const PAIRWISE_MATRIX = [
  { id: 'T3.1',  zone: 'knee',       stage: 'reactive',                 lang: 'vi' },
  { id: 'T3.2',  zone: 'knee',       stage: 'degenerative',             lang: 'en' },
  { id: 'T3.3',  zone: 'achilles',   stage: 'dysrepair',                lang: 'vi' },
  { id: 'T3.4',  zone: 'achilles',   stage: 'reactive_on_degenerative', lang: 'en' },
  { id: 'T3.5',  zone: 'shoulder',   stage: 'reactive',                 lang: 'en' },
  { id: 'T3.6',  zone: 'shoulder',   stage: 'degenerative',             lang: 'vi' },
  { id: 'T3.7',  zone: 'elbow',      stage: 'dysrepair',                lang: 'en' },
  { id: 'T3.8',  zone: 'elbow',      stage: 'reactive',                 lang: 'vi' },
  { id: 'T3.9',  zone: 'lower_back', stage: 'degenerative',             lang: 'vi' },
  { id: 'T3.10', zone: 'lower_back', stage: 'reactive_on_degenerative', lang: 'en' },
  { id: 'T3.11', zone: 'wrist',      stage: 'dysrepair',                lang: 'vi' },
  { id: 'T3.12', zone: 'wrist',      stage: 'reactive',                 lang: 'en' },
  { id: 'T3.13', zone: 'hip',        stage: 'degenerative',             lang: 'en' },
  { id: 'T3.14', zone: 'hip',        stage: 'dysrepair',                lang: 'vi' },
  { id: 'T3.15', zone: 'core',       stage: 'reactive',                 lang: 'vi' },
  { id: 'T3.16', zone: 'core',       stage: 'degenerative',             lang: 'en' },
  { id: 'T3.17', zone: 'knee',       stage: 'dysrepair',                lang: 'en' },
  { id: 'T3.18', zone: 'achilles',   stage: 'reactive',                 lang: 'vi' },
  { id: 'T3.19', zone: 'shoulder',   stage: 'dysrepair',                lang: 'vi' },
  { id: 'T3.20', zone: 'elbow',      stage: 'degenerative',             lang: 'en' },
  { id: 'T3.21', zone: 'lower_back', stage: 'reactive',                 lang: 'vi' },
  { id: 'T3.22', zone: 'wrist',      stage: 'degenerative',             lang: 'en' },
  { id: 'T3.23', zone: 'hip',        stage: 'reactive',                 lang: 'vi' },
  { id: 'T3.24', zone: 'core',       stage: 'dysrepair',                lang: 'en' }
];

describe('Tier 3: Pairwise Combinatorial Matrix (Zone x Stage x Language)', () => {
  const env = loadEnvironment();
  const { window } = env;
  const calculate = window.calculateTendonLoad;

  PAIRWISE_MATRIX.forEach(combo => {
    test(`${combo.id} - ${combo.zone} x ${combo.stage} x ${combo.lang.toUpperCase()}`, () => {
      // 1. Calculate Tendon Load
      const inputs = getInputsForStage(combo.zone, combo.stage);
      const res = calculate(inputs);

      // Verify Stage Classification
      expect(res.stage).toBe(combo.stage, `Expected stage ${combo.stage} for inputs`);

      // Verify Clinical Phase Safety
      if (combo.stage === 'reactive' || combo.stage === 'reactive_on_degenerative') {
        expect(res.startingPhase).toBe('p1', 'Acute reactive or flare-up must prescribe Phase 1 isometric calming');
        expect(res.intensity).toContain('Isometric', 'Intensity must specify isometric loading');
      } else if (combo.stage === 'dysrepair' || combo.stage === 'degenerative') {
        expect(res.startingPhase).toBe('p2', 'Stable dysrepair or degenerative tendon must start in Phase 2 HSR');
        expect(res.intensity).toContain('Heavy Slow', 'Intensity must specify Heavy Slow Resistance');
      }

      // 2. Verify Exercise Database Mapping
      const spotId = ZONE_TO_SPOT[combo.zone];
      expect(Boolean(spotId)).toBe(true, `Zone ${combo.zone} must map to a hotspot spotId`);

      const exData = window.EXERCISE_DATA[spotId];
      expect(Boolean(exData)).toBe(true, `EXERCISE_DATA must contain data for ${spotId}`);

      // Verify Prescribed Phase Exercises
      const phaseExercises = exData[res.startingPhase];
      expect(Array.isArray(phaseExercises)).toBe(true, `${spotId} must have exercise array for ${res.startingPhase}`);
      expect(phaseExercises.length >= 2).toBe(true, `Phase ${res.startingPhase} must provide at least 2 exercise options`);

      // 3. Verify Exercise Content Quality
      phaseExercises.forEach((ex, idx) => {
        expect(typeof ex.name).toBe('string', `${spotId} ${res.startingPhase}[${idx}] must have name`);
        expect(ex.name.length > 0).toBe(true);
        expect(typeof ex.reps).toBe('string', `${spotId} ${res.startingPhase}[${idx}] must have reps`);
        expect(ex.reps.length > 0).toBe(true);
        expect(typeof ex.videoUrl).toBe('string', `${spotId} ${res.startingPhase}[${idx}] must have videoUrl`);
        expect(ex.videoUrl.startsWith('http')).toBe(true);
      });

      // 4. Verify Language Parity
      if (combo.lang === 'vi') {
        expect(typeof exData.titleVi).toBe('string', `${spotId} must have titleVi`);
        expect(exData.titleVi.length > 0).toBe(true);
        expect(typeof exData.pearlVi).toBe('string', `${spotId} must have pearlVi`);
        expect(exData.pearlVi.length > 10).toBe(true);
      } else {
        expect(typeof exData.titleEn).toBe('string', `${spotId} must have titleEn`);
        expect(exData.titleEn.length > 0).toBe(true);
        expect(typeof exData.pearlEn).toBe('string', `${spotId} must have pearlEn`);
        expect(exData.pearlEn.length > 10).toBe(true);
      }

      // 5. Verify Pain Rules and Gatekeepers
      expect(res.painRule).toContain('VAS <= 3/10', 'Pain rule must include VAS <= 3/10 threshold');
      expect(res.painRule).toContain('24 hours', 'Pain rule must require recovery within 24 hours');
      expect(typeof res.gatekeeperTest).toBe('string');
      expect(res.gatekeeperTest.length > 10).toBe(true);
    });
  });
});
