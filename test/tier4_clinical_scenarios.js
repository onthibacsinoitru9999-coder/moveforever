/**
 * MoveForever E2E Test Suite - Tier 4: Clinical Scenarios
 * Simulates complete, realistic end-to-end patient workflows across:
 * 1. Acute Patellar Flare-up in Volleyball Athlete (Jump overload, Reactive stage, Spanish squat isometrics)
 * 2. Chronic Achilles Degeneration in Marathon Runner (Warm-up phenomenon, Degenerative, HSR Alfredson heel drops)
 * 3. Chronic Desk Worker Lumbar & Core Sparing (Stuart McGill Big 3, spine stiffness vs hip mobility)
 * 4. Lateral Epicondylalgia with Cross-Language Toggle & Intake Form Submission (Elbow, VI <-> EN parity, LocalStorage)
 * Target: >= 4 comprehensive end-to-end clinical case simulations.
 */

const { describe, test, it, expect, assert, loadEnvironment } = require('./test_runner.js');

describe('Tier 4: Clinical Scenario 1 - Acute Patellar Flare-up in Volleyball Athlete', () => {
  test('CS1.1 - Clinical Intake & Continuum Engine Evaluation', () => {
    const env = loadEnvironment();
    const calculate = env.window.calculateTendonLoad;

    // 22yo collegiate volleyball player, sudden 300% increase in jump spike volume
    const athleteInput = {
      zone: 'knee',
      duration: '<6wks',
      morningStiffness: '>30min',
      activityIntensity: 'high_impact_jumping',
      currentVAS: 8,
      loadLatency: 'worse_during'
    };

    const evaluation = calculate(athleteInput);

    // Clinical Expectations per Cook & Purdam (2009, 2016)
    expect(evaluation.startingPhase).toBe('p1', 'Acute high VAS patellar flare must begin in Phase 1 isometrics');
    expect(evaluation.intensity).toContain('Isometric', 'Must prescribe isometric loading for analgesic effect');
    expect(evaluation.dosage).toContain('45s holds', 'Must prescribe 45s holds to induce cortical inhibition relief');
    expect(evaluation.frequency).toContain('Daily', 'Phase 1 requires daily frequency');
    expect(evaluation.painRule).toContain('VAS <= 3/10', 'Pain during exercise must remain <= 3/10');
    expect(evaluation.painRule).toContain('24 hours', 'Must return to baseline within 24 hours');
  });

  test('CS1.2 - End-to-End UI Journey: Hotspot Interaction to Phase 1 Spanish Squat Video', () => {
    const env = loadEnvironment();
    const { window, doc } = env;

    // 1. Render Body Map Hotspots
    window.renderHotspots();
    const kneeHotspot = doc.querySelectorAll('.bm-hotspot').find(b => b.getAttribute('title')?.includes('Gối'));
    expect(Boolean(kneeHotspot)).toBe(true, 'Knee hotspot button must exist on the anatomical stage');

    // 2. Open Knee Modal Dialog
    window.openModal('spot7');
    const overlay = doc.getElementById('bm-overlay');
    expect(overlay.classList.contains('bm-open')).toBe(true, 'Modal overlay must be open');

    const panel = doc.getElementById('bm-panel');
    const title = panel.querySelector('h3').textContent;
    expect(title).toContain('Gối', 'Panel title must identify Knee region');

    // 3. Verify Phase 1 Exercise List
    const exList = doc.getElementById('exercise-list');
    const firstRow = exList.querySelector('.bm-exercise-row');
    expect(firstRow.textContent).toContain('Spanish Squat', 'Phase 1 must feature Spanish Squat Hold');
    expect(firstRow.textContent).toContain('45 giây', 'Must specify 45-second duration');

    // 4. Click Thumbnail to Load Video Player
    const thumb = firstRow.querySelector('.bm-thumb');
    thumb.click();
    const iframe = doc.querySelector('.bm-video-embed iframe');
    expect(Boolean(iframe)).toBe(true, 'Video iframe must be embedded');
    expect(iframe.getAttribute('src')).toContain('youtube.com/embed/zAmvxveQcHw', 'Must load validated video link');

    // 5. Inspect Phase 2 Progression Option
    window.switchModalPhase('p2');
    const p2Rows = doc.querySelectorAll('.bm-exercise-row');
    expect(p2Rows[0].textContent).toContain('ATG Split Squat', 'Phase 2 progression must introduce ATG Split Squat HSR');

    // 6. Close Modal
    window.closeModal();
    expect(overlay.classList.contains('bm-open')).toBe(false, 'Modal must close cleanly');
  });
});

describe('Tier 4: Clinical Scenario 2 - Chronic Achilles Degeneration in Marathon Runner', () => {
  test('CS2.1 - Clinical Intake & Continuum Engine Evaluation', () => {
    const env = loadEnvironment();
    const calculate = env.window.calculateTendonLoad;

    // 38yo marathon runner, 6-month history of Achilles tendon thickening with warm-up phenomenon
    const runnerInput = {
      zone: 'achilles',
      duration: '>12wks',
      morningStiffness: '<15min',
      activityIntensity: 'moderate',
      currentVAS: 4,
      loadLatency: 'improves_warmup_aches_next_day'
    };

    const evaluation = calculate(runnerInput);

    // Clinical Expectations: Degenerative Tendinopathy -> Treat the Donut (HSR)
    expect(evaluation.stage).toBe('degenerative', 'Chronic tendon with warm-up effect is degenerative');
    expect(evaluation.startingPhase).toBe('p2', 'Stable degenerative tendon starts in Phase 2 Heavy Slow Resistance');
    expect(evaluation.intensity).toContain('Heavy Slow Resistance', 'Intensity must specify HSR');
    expect(evaluation.intensity).toContain('3-1-3', 'Must enforce 3-1-3 contraction tempo');
    expect(evaluation.frequency).toContain('48h rest', 'Must enforce 48 hours rest between sessions for collagen synthesis');
    expect(evaluation.gatekeeperTest).toContain('Limb Symmetry Index >= 85%', 'Progression requires LSI >= 85%');
  });

  test('CS2.2 - End-to-End UI Journey: Achilles Protocol Inspection & Phase Tabs', () => {
    const env = loadEnvironment();
    const { window, doc } = env;

    window.openModal('spot8'); // Foot & Achilles
    const panel = doc.getElementById('bm-panel');

    // Verify Clinical Pearl cites Achilles load capacity
    const pearl = panel.querySelector('.bm-clinical-tip').textContent;
    expect(pearl).toContain('Achilles', 'Pearl must discuss Achilles mechanics');
    expect(pearl).toContain('Alfredson', 'Pearl must cite Alfredson protocol');

    // Switch to Phase 2 (Recommended Starting Phase)
    window.switchModalPhase('p2');
    const exList = doc.getElementById('exercise-list');
    const rows = exList.querySelectorAll('.bm-exercise-row');
    expect(rows[0].textContent).toContain('Alfredson', 'Phase 2 must feature Alfredson Heavy Slow Heel Drop');
    expect(rows[0].textContent).toContain('3-1-3', 'Prescription must specify Tempo 3-1-3');

    // Verify Phase 3 Return-to-Sport Elastic Capacity
    window.switchModalPhase('p3');
    const p3Rows = doc.querySelectorAll('.bm-exercise-row');
    expect(p3Rows[0].textContent).toContain('Ankle CARs', 'Phase 3 must include Ankle CARs');
    expect(p3Rows[1].textContent).toContain('Elastic Ankle Hops', 'Phase 3 must include Elastic Ankle Hops for SSC recoil');

    window.closeModal();
  });
});

describe('Tier 4: Clinical Scenario 3 - Chronic Desk Worker Lumbar & Core Sparing', () => {
  test('CS3.1 - Clinical Intake & Stuart McGill Spine Sparing Assessment', () => {
    const env = loadEnvironment();
    const calculate = env.window.calculateTendonLoad;

    // 45yo software architect, 10 hours daily sitting, flexion intolerant lower back pain
    const deskWorkerInput = {
      zone: 'lower_back',
      duration: '>12wks',
      morningStiffness: '0min',
      activityIntensity: 'sedentary',
      currentVAS: 5,
      loadLatency: 'improves_warmup_aches_next_day'
    };

    const evaluation = calculate(deskWorkerInput);

    // Clinical Expectations: VAS 5 requires Phase 1 spine stabilization
    expect(evaluation.startingPhase).toBe('p1', 'VAS 5 in lumbar spine requires Phase 1 stabilization');
    expect(evaluation.intensity).toContain('Isometric', 'Must prescribe isometric core stiffness');
  });

  test('CS3.2 - End-to-End UI Journey: McGill Big 3 Verification & Progression', () => {
    const env = loadEnvironment();
    const { window, doc } = env;

    window.openModal('spot4'); // Lower Back
    const panel = doc.getElementById('bm-panel');

    // Verify Clinical Pearl cites Stuart McGill
    const pearl = panel.querySelector('.bm-clinical-tip').textContent;
    expect(pearl).toContain('Stuart McGill', 'Lumbar clinical pearl must cite Prof. Stuart McGill');
    expect(pearl).toContain('Core Stiffness', 'Must explain core stiffness vs hip mobility');

    // Verify Phase 1 contains McGill Bird-Dog Hold
    const rows = doc.querySelectorAll('.bm-exercise-row');
    expect(rows[0].textContent).toContain('McGill Bird-Dog', 'Phase 1 must feature McGill Bird-Dog Isometric Hold');

    // Switch to Phase 2: Seated Good Morning with flat back
    window.switchModalPhase('p2');
    const p2Rows = doc.querySelectorAll('.bm-exercise-row');
    expect(p2Rows[0].textContent).toContain('Seated Good Morning', 'Phase 2 must feature Seated Good Morning');

    // Switch to Phase 3: Loaded Jefferson Curl with clinical caution
    window.switchModalPhase('p3');
    const p3Rows = doc.querySelectorAll('.bm-exercise-row');
    expect(p3Rows[0].textContent).toContain('Jefferson Curl', 'Phase 3 must feature Loaded Jefferson Curl');

    window.closeModal();
  });
});

describe('Tier 4: Clinical Scenario 4 - Lateral Epicondylalgia with Bilingual Toggle & Intake Submission', () => {
  test('CS4.1 - Clinical Intake & Bilingual Presentation', () => {
    const env = loadEnvironment();
    const calculate = env.window.calculateTendonLoad;

    // 34yo tennis player & desk worker with lateral elbow pain
    const elbowInput = {
      zone: 'elbow',
      duration: '6-12wks',
      morningStiffness: '<15min',
      activityIntensity: 'moderate',
      currentVAS: 5,
      loadLatency: 'worse_during'
    };

    const evaluation = calculate(elbowInput);
    expect(evaluation.startingPhase).toBe('p1', 'VAS 5 with worse_during latency requires Phase 1 isometric holds');
  });

  test('CS4.2 - Bilingual UI Interaction & Synchronized Localization Toggle', () => {
    const env = loadEnvironment();
    const { window, doc } = env;

    // 1. Initial State in Vietnamese
    window.openModal('spot3'); // Elbow
    let panel = doc.getElementById('bm-panel');
    let title = panel.querySelector('h3').textContent;
    expect(title).toContain('Khuỷu Tay', 'Title in Vietnamese must be Khuỷu Tay');

    let pearl = panel.querySelector('.bm-clinical-tip').textContent;
    expect(pearl).toContain('Tennis Elbow', 'Pearl must discuss Tennis Elbow');

    // 2. Toggle to English via applyLanguage('en')
    window.applyLanguage('en');
    panel = doc.getElementById('bm-panel');
    title = panel.querySelector('h3').textContent;
    expect(title).toContain('Elbow', 'Title in English must be Elbow & Epicondylalgia');

    pearl = panel.querySelector('.bm-clinical-tip').textContent;
    expect(pearl).toContain('Lateral and medial epicondylalgia', 'Pearl must translate to Academic English');

    // 3. Switch back to Vietnamese
    window.applyLanguage('vi');
    panel = doc.getElementById('bm-panel');
    title = panel.querySelector('h3').textContent;
    expect(title).toContain('Khuỷu Tay', 'Title must revert to Vietnamese accurately');

    window.closeModal();
  });

  test('CS4.3 - Full Coaching Intake Application Flow with LocalStorage Persistence', () => {
    const env = loadEnvironment();
    const { window, doc, localStorage } = env;

    const form = doc.getElementById('coaching-application-form');
    const nameInput = doc.getElementById('fullName');
    const emailInput = doc.getElementById('email');
    const dobInput = doc.getElementById('dob');
    const sourceSelect = doc.getElementById('source');
    const stageSelect = doc.getElementById('tendonStage');
    const confirmBox = doc.getElementById('crit-confirm');

    // Fill out form
    nameInput.value = 'Dr. Le Van Minh';
    emailInput.value = 'minh.le@sportsmed.vn';
    dobInput.value = '1988-06-15';
    sourceSelect.value = 'Doctor';
    stageSelect.value = 'Reactive';
    confirmBox.checked = true;

    // Submit form
    form.dispatchEvent({
      type: 'submit',
      preventDefault: () => {}
    });

    // Verify record in localStorage
    const saved = JSON.parse(localStorage.getItem('moveforever_applications') || '[]');
    expect(saved.length > 0).toBe(true, 'Application must be saved in localStorage');

    const app = saved[saved.length - 1];
    expect(app.fullName).toBe('Dr. Le Van Minh');
    expect(app.email).toBe('minh.le@sportsmed.vn');
    expect(app.dob).toBe('1988-06-15');
    expect(app.source).toBe('Doctor');
    expect(app.tendonStage).toBe('Reactive');
    expect(Boolean(app.submittedAt)).toBe(true, 'Record must include ISO submittedAt timestamp');

    // Verify success modal overlay was opened
    const successOverlay = doc.getElementById('success-overlay');
    expect(successOverlay.classList.contains('open')).toBe(true, 'Success modal must display upon successful submission');
  });
});
