/**
 * MoveForever E2E Test Suite - Tier 1: Feature Tests
 * Covers all 8 anatomical zones, 3 biological periodization phases (Weeks 1-4, 5-8, 9-12),
 * interactive modal rendering, science continuum framework, slider carousel, intake form,
 * and 100% bilingual localization key parity.
 * Target: >= 40 test assertions.
 */

const { describe, test, it, expect, assert, loadEnvironment } = require('./test_runner.js');

describe('Tier 1: Anatomical Zones & Periodization Protocols (R2)', () => {
  const env = loadEnvironment();
  const { window, doc } = env;

  test('T1.1 - DOTS catalog contains exactly 8 anatomical zones', () => {
    expect(Array.isArray(window.DOTS)).toBe(true, 'DOTS must be an array');
    expect(window.DOTS.length).toBe(8, 'Must define exactly 8 anatomical hotspots');
  });

  test('T1.2 - Every hotspot has valid IDs, bilingual titles, and coordinates within bounds', () => {
    const validIds = ['spot1', 'spot2', 'spot3', 'spot4', 'spot5', 'spot6', 'spot7', 'spot8'];
    window.DOTS.forEach((spot, idx) => {
      expect(spot.id).toBe(validIds[idx], `Spot index ${idx} must have id ${validIds[idx]}`);
      expect(typeof spot.titleVi).toBe('string', `Spot ${spot.id} must have titleVi`);
      expect(spot.titleVi.length > 0).toBe(true, `Spot ${spot.id} titleVi must not be empty`);
      expect(typeof spot.titleEn).toBe('string', `Spot ${spot.id} must have titleEn`);
      expect(spot.titleEn.length > 0).toBe(true, `Spot ${spot.id} titleEn must not be empty`);
      expect(spot.xpct >= 0 && spot.xpct <= 100).toBe(true, `Spot ${spot.id} xpct must be within 0-100%`);
      expect(spot.ypct >= 0 && spot.ypct <= 100).toBe(true, `Spot ${spot.id} ypct must be within 0-100%`);
    });
  });

  test('T1.3 - EXERCISE_DATA defines all 8 zones with 3 biological phases (Weeks 1-4, 5-8, 9-12)', () => {
    const spots = ['spot1', 'spot2', 'spot3', 'spot4', 'spot5', 'spot6', 'spot7', 'spot8'];
    spots.forEach(spotId => {
      const data = window.EXERCISE_DATA[spotId];
      expect(Boolean(data)).toBe(true, `EXERCISE_DATA must contain ${spotId}`);
      expect(Array.isArray(data.p1)).toBe(true, `${spotId} must contain Phase 1 exercises`);
      expect(Array.isArray(data.p2)).toBe(true, `${spotId} must contain Phase 2 exercises`);
      expect(Array.isArray(data.p3)).toBe(true, `${spotId} must contain Phase 3 exercises`);
      expect(data.p1.length >= 2).toBe(true, `${spotId} Phase 1 must contain at least 2 exercises`);
      expect(data.p2.length >= 2).toBe(true, `${spotId} Phase 2 must contain at least 2 exercises`);
      expect(data.p3.length >= 2).toBe(true, `${spotId} Phase 3 must contain at least 2 exercises`);
    });
  });

  test('T1.4 - All exercises contain valid name, reps/dosage, and video stream URLs', () => {
    const spots = ['spot1', 'spot2', 'spot3', 'spot4', 'spot5', 'spot6', 'spot7', 'spot8'];
    spots.forEach(spotId => {
      const data = window.EXERCISE_DATA[spotId];
      ['p1', 'p2', 'p3'].forEach(phase => {
        data[phase].forEach((ex, idx) => {
          expect(typeof ex.name).toBe('string', `${spotId} ${phase}[${idx}] name must be string`);
          expect(ex.name.length > 0).toBe(true, `${spotId} ${phase}[${idx}] name cannot be empty`);
          expect(typeof ex.reps).toBe('string', `${spotId} ${phase}[${idx}] reps must be string`);
          expect(ex.reps.length > 0).toBe(true, `${spotId} ${phase}[${idx}] reps cannot be empty`);
          expect(typeof ex.videoUrl).toBe('string', `${spotId} ${phase}[${idx}] videoUrl must be string`);
          expect(ex.videoUrl.startsWith('http')).toBe(true, `${spotId} ${phase}[${idx}] videoUrl must be a valid URL`);
        });
      });
    });
  });

  test('T1.5 - Every anatomical zone includes clinical pearls in both Vietnamese and English', () => {
    const spots = ['spot1', 'spot2', 'spot3', 'spot4', 'spot5', 'spot6', 'spot7', 'spot8'];
    spots.forEach(spotId => {
      const data = window.EXERCISE_DATA[spotId];
      expect(typeof data.pearlVi).toBe('string', `${spotId} must contain pearlVi`);
      expect(data.pearlVi.length > 15).toBe(true, `${spotId} pearlVi must provide meaningful clinical guidance`);
      expect(typeof data.pearlEn).toBe('string', `${spotId} must contain pearlEn`);
      expect(data.pearlEn.length > 15).toBe(true, `${spotId} pearlEn must provide meaningful clinical guidance`);
    });
  });
});

describe('Tier 1: Interactive Body Map & Modal Dialog (R2 & R3)', () => {
  test('T1.6 - Hotspots render dynamically into the DOM on body map stage', () => {
    const env = loadEnvironment();
    env.window.renderHotspots();
    const stage = env.doc.getElementById('bm-stage');
    expect(Boolean(stage)).toBe(true, '#bm-stage element must exist in DOM');
    const hotspotElems = stage.querySelectorAll('.bm-hotspot');
    expect(hotspotElems.length).toBe(8, 'Exactly 8 hotspot buttons should be injected into the stage');
  });

  test('T1.7 - Clicking hotspot opens modal with active region and clinical pearl', () => {
    const env = loadEnvironment();
    const { window, doc } = env;
    window.renderHotspots();
    window.openModal('spot7'); // Knee

    const overlay = doc.getElementById('bm-overlay');
    expect(overlay.classList.contains('bm-open')).toBe(true, 'Modal overlay must have bm-open class');

    const panel = doc.getElementById('bm-panel');
    const titleElem = panel.querySelector('h3');
    expect(Boolean(titleElem)).toBe(true, 'Modal panel must render h3 title');
    expect(titleElem.textContent).toContain('Gối', 'Spot 7 title should contain Vietnamese knee label');

    const pearlElem = panel.querySelector('.bm-clinical-tip');
    expect(Boolean(pearlElem)).toBe(true, 'Modal panel must display clinical pearl box');
    expect(pearlElem.textContent).toContain('Jill Cook', 'Knee clinical pearl must cite Jill Cook');
  });

  test('T1.8 - Tab switching dynamically changes exercises between Phase 1, Phase 2, and Phase 3', () => {
    const env = loadEnvironment();
    const { window, doc } = env;
    window.openModal('spot7'); // Knee

    // Initial is Phase 1
    let list = doc.getElementById('exercise-list');
    let rows = list.querySelectorAll('.bm-exercise-row');
    expect(rows.length >= 2).toBe(true, 'Phase 1 must have at least 2 exercise rows');
    expect(rows[0].textContent).toContain('Spanish Squat', 'Phase 1 Knee must feature Spanish Squat Hold');

    // Switch to Phase 2 (HSR)
    window.switchModalPhase('p2');
    list = doc.getElementById('exercise-list');
    rows = list.querySelectorAll('.bm-exercise-row');
    expect(rows.length >= 2).toBe(true, 'Phase 2 must have at least 2 exercise rows');
    expect(rows[0].textContent).toContain('ATG Split Squat', 'Phase 2 Knee must feature ATG Split Squat HSR');

    // Switch to Phase 3 (End-Range / SSC)
    window.switchModalPhase('p3');
    list = doc.getElementById('exercise-list');
    rows = list.querySelectorAll('.bm-exercise-row');
    expect(rows.length >= 2).toBe(true, 'Phase 3 must have at least 2 exercise rows');
    expect(rows[0].textContent).toContain('Reversing', 'Phase 3 Knee must feature Reversing / Backward Sled');
  });

  test('T1.9 - Clicking exercise thumbnail attaches iframe video embed', () => {
    const env = loadEnvironment();
    const { window, doc } = env;
    window.openModal('spot7');
    const firstRow = doc.querySelector('.bm-exercise-row');
    const thumb = firstRow.querySelector('.bm-thumb');
    expect(Boolean(thumb)).toBe(true, 'Exercise row must have thumbnail button');

    thumb.click();
    const embed = doc.querySelector('.bm-video-embed iframe');
    expect(Boolean(embed)).toBe(true, 'Clicking thumbnail should inject iframe player');
    expect(embed.getAttribute('src')).toContain('youtube.com', 'Iframe src must point to YouTube embed');
  });

  test('T1.10 - Modal closes properly on closeModal call', () => {
    const env = loadEnvironment();
    const { window, doc } = env;
    window.openModal('spot1');
    const overlay = doc.getElementById('bm-overlay');
    expect(overlay.classList.contains('bm-open')).toBe(true);

    window.closeModal();
    expect(overlay.classList.contains('bm-open')).toBe(false, 'Modal overlay must remove bm-open on close');
  });
});

describe('Tier 1: Mechanotherapy Science & Tendon Continuum Framework (R1 & R2)', () => {
  const env = loadEnvironment();
  const { doc } = env;

  test('T1.11 - Science section exists with Tendon Continuum cards for Reactive, Dysrepair, and Degenerative', () => {
    const scienceSec = doc.getElementById('science');
    expect(Boolean(scienceSec)).toBe(true, '#science section must exist in document');

    const reactiveCard = scienceSec.querySelector('.continuum-card.reactive');
    const dysrepairCard = scienceSec.querySelector('.continuum-card.dysrepair');
    const degenerativeCard = scienceSec.querySelector('.continuum-card.degenerative');

    expect(Boolean(reactiveCard)).toBe(true, 'Must render Reactive stage card');
    expect(Boolean(dysrepairCard)).toBe(true, 'Must render Dysrepair stage card');
    expect(Boolean(degenerativeCard)).toBe(true, 'Must render Degenerative stage card');
  });

  test('T1.12 - 4-Stage Progressive Loading Protocol renders with explicit badges and descriptions', () => {
    const protocolBox = doc.querySelector('.protocol-box');
    expect(Boolean(protocolBox)).toBe(true, '.protocol-box must exist');
    const steps = protocolBox.querySelectorAll('.proto-step');
    expect(steps.length).toBe(4, 'Must define exactly 4 progressive protocol steps (Levels 1 to 4)');
  });

  test('T1.13 - Clinical comparison grid exists contrasting Rest/Steroids vs Optimal Loading', () => {
    const badCard = doc.querySelector('.comparison-card.bad');
    const goodCard = doc.querySelector('.comparison-card.good');
    expect(Boolean(badCard)).toBe(true, 'Comparison card for complete rest & corticosteroids must exist');
    expect(Boolean(goodCard)).toBe(true, 'Comparison card for optimal mechanotherapy loading must exist');
  });
});

describe('Tier 1: Client Testimonials Carousel', () => {
  test('T1.14 - Testimonials slider initializes with 22 client transformation slides', () => {
    const env = loadEnvironment();
    const { window, doc } = env;
    window.initSlider();

    const track = doc.getElementById('slider-track');
    expect(Boolean(track)).toBe(true, '#slider-track must exist');
    const slides = track.querySelectorAll('.slider-slide');
    expect(slides.length).toBe(22, 'Slider track must render all 22 transformation slides');

    const dots = doc.querySelectorAll('.slider-dots .dot');
    expect(dots.length).toBe(10, 'Slider should render exactly 10 navigation dots');
  });

  test('T1.15 - Next and Prev slide controls update slide position cleanly', () => {
    const env = loadEnvironment();
    const { window, doc } = env;
    window.initSlider();

    window.nextSlide();
    let track = doc.getElementById('slider-track');
    expect(track.style.transform).toContain('translateX(-100%)', 'Next slide should advance translate offset');

    window.prevSlide();
    track = doc.getElementById('slider-track');
    expect(track.style.transform).toContain('translateX(-0%)', 'Prev slide should decrement translate offset');
  });
});

describe('Tier 1: Pre-qualification Form & LocalStorage Persistence', () => {
  test('T1.16 - Form requires qualification criteria checkbox confirmation', () => {
    const env = loadEnvironment();
    const { window, doc } = env;
    const form = doc.getElementById('coaching-application-form');
    expect(Boolean(form)).toBe(true, '#coaching-application-form must exist');

    const confirmBox = doc.getElementById('crit-confirm');
    expect(Boolean(confirmBox)).toBe(true, '#crit-confirm checkbox must exist');
  });

  test('T1.17 - Form submission saves record to localStorage under moveforever_applications', () => {
    const env = loadEnvironment();
    const { window, doc, localStorage } = env;

    const form = doc.getElementById('coaching-application-form');
    const nameInput = doc.getElementById('fullName');
    const emailInput = doc.getElementById('email');
    const confirmBox = doc.getElementById('crit-confirm');

    nameInput.value = 'Nguyen Van Test';
    emailInput.value = 'test@example.com';
    confirmBox.checked = true;

    form.dispatchEvent({
      type: 'submit',
      preventDefault: () => {}
    });

    const stored = JSON.parse(localStorage.getItem('moveforever_applications') || '[]');
    expect(stored.length > 0).toBe(true, 'Submitted application must be saved to localStorage');
    expect(stored[0].fullName).toBe('Nguyen Van Test', 'Stored full name must match input');
    expect(stored[0].email).toBe('test@example.com', 'Stored email must match input');
  });
});

describe('Tier 1: Bilingual Localization Engine (R4)', () => {
  test('T1.18 - TRANSLATIONS dictionary has complete key symmetry between VI and EN', () => {
    const env = loadEnvironment();
    const { window } = env;
    const viKeys = Object.keys(window.TRANSLATIONS.vi).sort();
    const enKeys = Object.keys(window.TRANSLATIONS.en).sort();

    expect(viKeys.length > 50).toBe(true, 'VI dictionary must contain comprehensive entries (>50)');
    expect(enKeys.length > 50).toBe(true, 'EN dictionary must contain comprehensive entries (>50)');

    const missingInEn = viKeys.filter(k => !(k in window.TRANSLATIONS.en));
    const missingInVi = enKeys.filter(k => !(k in window.TRANSLATIONS.vi));

    expect(missingInEn.length).toBe(0, `Missing EN keys: ${missingInEn.join(', ')}`);
    expect(missingInVi.length).toBe(0, `Missing VI keys: ${missingInVi.join(', ')}`);
  });

  test('T1.19 - applyLanguage toggles text between Vietnamese and Academic English cleanly', () => {
    const env = loadEnvironment();
    const { window, doc } = env;

    // Switch to English
    window.applyLanguage('en');
    expect(doc.documentElement.getAttribute('lang') || doc.documentElement.lang).toBe('en');
    const heroTitle = doc.querySelector('[data-i18n="hero_title"]');
    expect(heroTitle.textContent).toContain('Troubling You', 'Hero title in EN should contain English phrase');

    // Switch back to Vietnamese
    window.applyLanguage('vi');
    expect(doc.documentElement.getAttribute('lang') || doc.documentElement.lang).toBe('vi');
    expect(heroTitle.textContent).toContain('Vấn Đề', 'Hero title in VI should contain Vietnamese phrase');
  });
});
