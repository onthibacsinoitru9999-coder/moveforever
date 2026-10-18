/**
 * MOVE FOREVER - INTERACTIVE MECHANOTHERAPY & REHABILITATION ENGINE
 * Based on Tendon Continuum Model (Prof. Jill Cook & Dr. Ebonie Rio)
 * and End-Range Strength / Functional Range Conditioning (ATG & FRC)
 */

// Current Language State ('vi' or 'en')
let currentLang = 'vi';
let activeModalSpot = null;
let activeModalPhase = 'p1'; // 'p1', 'p2', 'p3'

// Comprehensive Translations Dictionary
const TRANSLATIONS = {
  vi: {
    nav_map: "Sơ đồ cơ thể",
    nav_science: "Cơ chế khoa học",
    nav_reviews: "Kết quả học viên",
    nav_apply: "Đăng ký tư vấn",
    btn_consult: "Bắt Đầu Ngay",
    hero_badge: "BẢN ĐỒ VẬN ĐỘNG & CƠ HỌC TRỊ LIỆU TƯƠNG TÁC",
    hero_title: "Nhấn Vào Vùng Bạn Đang Gặp Vấn Đề",
    hero_sub: "Bạn muốn giải phóng tiềm năng tiềm ẩn của cơ thể? Chọn vùng tổn thương để khám phá phác đồ phục hồi 3 giai đoạn dựa trên khoa học cơ học trị liệu!",
    hero_hint: "Chạm vào điểm phát sáng trên cơ thể để xem phác đồ Isometric, HSR & Vận động góc tận",
    
    // Science Section
    sci_badge: "KHOA HỌC ĐIỀU TRỊ BẢO TỒN KHÔNG MỔ",
    sci_title: "Cơ Học Trị Liệu (Mechanotherapy) & Mô Hình Tendon Continuum",
    sci_sub: "Dựa trên công trình nền tảng của GS. Jill Cook & TS. Ebonie Rio kết hợp với nguyên lý sức mạnh góc tận ATG & FRC — Cơ chế tái tạo gân khớp bằng tải trọng cơ học chính xác thay vì phẫu thuật hay nghỉ ngơi thụ động.",
    cont_stage1_title: "Tendon Reactive (Viêm Phản Ứng Cấp)",
    cont_stage1_trigger: "Nguyên nhân: Tăng khối lượng hoặc cường độ tải trọng quá đột ngột.",
    cont_stage1_desc: "Tế bào gân phản ứng bảo vệ bằng cách tăng sinh proteoglycan ngậm nước, làm gân dày lên cục bộ và sưng đau, nhưng chưa có đứt gãy cấu trúc collagen.",
    cont_stage1_rx: "Chiến lược: Isometric Loading (Gồng Tĩnh)",
    cont_stage1_note: "Tuyệt đối tránh kéo giãn ma sát; gồng tĩnh 45s giúp giảm đau tức thì qua cơ chế ức chế vỏ não.",
    cont_stage1_title_d: "Tendon Dysrepair (Suy Thoái Cấu Trúc)",
    cont_stage2_trigger: "Nguyên nhân: Tiếp tục nạp tải quá mức khi gân chưa kịp hồi phục.",
    cont_stage2_desc: "Các tế bào gân bị biến đổi hình thái, chất nền ngoại bào phân tách các bó sợi collagen, bắt đầu xuất hiện tân mạch bệnh lý và thoái hóa nhẹ.",
    cont_stage2_rx: "Chiến lược: Heavy Slow Resistance (HSR)",
    cont_stage2_note: "Kháng lực nặng nhịp chậm (3s-1s-3s) kích hoạt mechanotransduction tổng hợp Collagen Type I.",
    cont_stage3_title: "Degenerative Tendon (Thoái Hóa Mãn Tính)",
    cont_stage3_trigger: "Nguyên nhân: Quá trình viêm và quá tải vi thể kéo dài nhiều tháng đến nhiều năm.",
    cont_stage3_desc: "Xuất hiện các vùng tế bào chết vô mạch xen lẫn mô xơ. Triệu chứng kinh điển là cứng khớp buổi sáng và đau dai dẳng sau vận động.",
    cont_stage3_rx: "Chiến lược: 'Treat the Donut, Not the Hole'",
    cont_stage3_note: "GS. Jill Cook: Tập trung làm khỏe vùng gân lành xung quanh để bù đắp hoàn toàn cho vùng tổn thương.",
    
    proto_main_title: "Lộ Trình Tải Trọng 4 Giai Đoạn Tái Sinh Gân Khớp",
    proto_p1_badge: "Cấp Độ 1: Giai Đoạn Cấp",
    proto_p1_title: "1. Isometric Loading (Gồng Tĩnh Giảm Đau)",
    proto_p1_desc: "Thực hiện gồng cơ giữ nguyên góc khớp (45-60 giây x 4-5 hiệp, tải 70% MVC). Kích hoạt cơ chế Cortical Inhibition Relief giúp ức chế tín hiệu đau lên não bộ trong 45-60 phút mà không gây kích ứng ma sát lên gân hay sụn.",
    proto_p2_badge: "Cấp Độ 2: Tái Tạo Cấu Trúc",
    proto_p2_title: "2. Isotonic Heavy Slow Resistance (Kháng Lực Nặng, Chậm)",
    proto_p2_desc: "Tập kháng lực với nhịp điệu (Tempo) nghiêm ngặt: 3 giây co - 1 giây dừng - 3 giây duỗi. Chuyển hóa lực cơ học (Mechanotransduction) gửi tín hiệu kích thích nguyên bào gân xếp lại sợi Collagen Type I song song và bền chắc.",
    proto_p3_badge: "Cấp Độ 3: Tích Trữ Đàn Hồi",
    proto_p3_title: "3. Energy Storage & Plyometrics (Tích Trữ & Giải Phóng Năng Lượng)",
    proto_p3_desc: "Huấn luyện gân hoạt động như một chiếc lò xo sinh học (biological spring). Tái tạo khả năng hấp thu xung lực khi chạy, nhảy, đổi hướng mà không làm bùng phát cơn đau tái phát.",
    proto_p4_badge: "Cấp Độ 4: Sức Mạnh Góc Tận",
    proto_p4_title: "4. End-Range Capacity & Re-Integration (ATG & FRC Mobility)",
    proto_p4_desc: "Kéo giãn có tải ở biên độ cực hạn (Loaded Stretching) theo trường phái ATG (Ben Patrick) và kiểm soát thần kinh cơ FRC (Dr. Andreo Spina). Khớp chịu lực vững chắc ở mọi góc độ, loại bỏ nỗi sợ chấn thương suốt đời.",

    comp_rest_title: "Sai Lầm: Nghỉ Ngơi Tuyệt Đối & Tiêm Corticoid",
    comp_r1: "Nghỉ hoàn toàn khiến gân bị teo cơ học (Tendon Stress Deprivation), giảm mật độ mao mạch và thoái hóa nhanh hơn.",
    comp_r2: "Tiêm Corticoid chỉ cắt đứt tín hiệu đau tạm thời nhưng làm ức chế tổng hợp collagen, tăng nguy cơ đứt gân tự phát gấp 4-6 lần.",
    comp_r3: "Cơ bắp suy giảm sức chịu tải khiến cơn đau tái phát nặng hơn ngay khi người bệnh hoạt động trở lại.",
    comp_load_title: "Giải Pháp Chuẩn Y Khoa: Tải Trọng Tối Ưu (Optimal Loading)",
    comp_l1: "Tải trọng cơ học có kiểm soát là kích thích DUY NHẤT giúp tế bào gân (Tenocytes) tái tạo Collagen Type I.",
    comp_l2: "Bài tập gồng tĩnh (Isometric) giúp giảm đau tức thì bằng ức chế thần kinh trung ương, an toàn tuyệt đối.",
    comp_l3: "Xây dựng 'áo giáp cơ bắp' bảo vệ sụn khớp dài hạn, giúp người bệnh hồi phục hoàn toàn không cần phẫu thuật.",

    // Testimonials
    reviews_title: "Bạn Đã Sẵn Sàng Khai Phá Tiềm Năng Cơ Thể?",
    reviews_sub: "Hàng trăm học viên đã chiến thắng cơn đau mãn tính, hồi phục chuyển động và lấy lại sự tự tin.",

    // Form
    form_heading: "Đăng Ký Huấn Luyện Cùng Huấn Luyện Viên",
    form_criteria_desc: "Trước khi tiếp tục, vui lòng xác nhận bạn đáp ứng các tiêu chí dưới đây để đảm bảo kết quả tốt nhất.",
    crit_1: "Bạn đang thực sự nghiêm túc cân nhắc việc được huấn luyện và đồng hành phục hồi.",
    crit_2: "Bạn sẵn sàng đầu tư tài chính xứng đáng cho sức khỏe và thể chất lâu dài của mình.",
    crit_3: "Bạn quyết tâm tạo ra sự thay đổi bền vững suốt đời thay vì giải pháp tạm thời nhất thời.",
    crit_confirm: "Vâng, tôi xác nhận đây chính xác là những gì tôi đang tìm kiếm.",
    lbl_name: "Họ và tên",
    lbl_email: "Địa chỉ Email",
    lbl_dob: "Ngày tháng năm sinh",
    lbl_source: "Bạn biết đến chương trình qua đâu?",
    opt_select: "Chọn nguồn giới thiệu...",
    opt_other: "Khác",
    lbl_tendon_phase: "Tính chất cơn đau của bạn phản ánh giai đoạn nào dưới đây?",
    opt_select_stage: "Chọn tính chất cơn đau của bạn...",
    opt_stage_reactive: "1. Đau nhói, buốt cấp sau khi tăng tải đột ngột (Giai đoạn Phản ứng - Reactive)",
    opt_stage_dysrepair: "2. Đau âm ỉ nhiều tuần, cứng gân/khớp vào buổi sáng khi ngủ dậy (Giai đoạn Suy thoái cấu trúc)",
    opt_stage_degenerative: "3. Đau dai dẳng nhiều năm, chụp MRI có hình ảnh thoái hóa/rách bán phần (Thoái hóa mãn tính)",
    opt_stage_spine: "4. Đau mỏi thắt lưng/cột sống, tê lan chân hoặc tay khi ngồi lâu/cúi người",
    lbl_goal: "Bạn mong muốn đạt được điều gì nhất? (Càng chi tiết càng tốt)",
    lbl_obstacle: "Điều gì đang CẢN TRỞ bạn đạt được mục tiêu đó?",
    lbl_history: "Tiền sử chấn thương chi tiết (ghi rõ bên Trái / Phải)",
    lbl_triggers: "Tình huống cụ thể nào khiến bạn bị đau hoặc cứng khớp?",
    lbl_treatment: "Hiện bạn có đang điều trị, vật lý trị liệu hay tập với ai khác không?",
    lbl_failed: "Nếu các phương pháp trước đây không hiệu quả, bạn nghĩ nguyên nhân là gì?",
    lbl_pain_scale: "Mức độ đau vào những ngày tệ nhất (1 = Rất nhẹ, 10 = Cực kỳ nghiêm trọng)",
    lbl_confidence_scale: "Độ tin tưởng vào khả năng phục hồi của cơ thể bạn (1-10)",
    lbl_activity: "Một tuần sinh hoạt và vận động tiêu biểu của bạn trông như thế nào?",
    lbl_vision: "Hãy tưởng tượng 6 tháng tới khi bạn đạt được tiến bộ mong muốn. Cuộc sống của bạn sẽ như thế nào?",
    lbl_impact: "Điều này mang lại tác động tích cực gì cho sức khỏe, tinh thần và các mối quan hệ của bạn?",
    lbl_challenge: "Kể về một lần bạn đã vượt qua nhiều thử thách để đạt được mục tiêu lớn trong đời:",
    lbl_location: "Nếu được huấn luyện, bạn muốn tập tại phòng Gym hay ở Nhà?",
    opt_gym: "Phòng tập Gym",
    opt_home: "Tại nhà (Home workout)",
    opt_both: "Kết hợp cả hai",
    lbl_notes: "Có điều gì khác bạn muốn Huấn Luyện Viên biết thêm không?",
    btn_submit: "Gửi Hồ Sơ Đăng Ký Tư Vấn",
    modal_success_title: "Đã Gửi Hồ Sơ Thành Công!",
    modal_success_desc: "Cảm ơn bạn đã tin tưởng. Chúng tôi đã nhận được thông tin chi tiết và sẽ liên hệ qua Email / Zalo trong vòng 24 giờ để xếp lịch trao đổi 1-1.",
    modal_close_btn: "Đóng",
    footer_tagline: "Loại bỏ nỗi thất vọng vì chấn thương bằng phương pháp huấn luyện vận động và phục hồi đã được kiểm chứng qua thực tiễn.",
    footer_quick_links: "Liên Kết Nhanh",
    footer_contact: "Liên Hệ",
    take_next_step: "Sẵn Sàng Bước Vào Phác Đồ 1-1?",
    get_coached: "Đăng Ký Tư Vấn Chuyên Sâu →",

    // Tabs
    tab_p1: "⚡ GĐ 1: Gồng Tĩnh (Isometric)",
    tab_p2: "🧱 GĐ 2: Kháng Lực Chậm (HSR)",
    tab_p3: "🚀 GĐ 3: Góc Tận & Đàn Hồi (ATG/FRC)"
  },
  en: {
    nav_map: "Body Map",
    nav_science: "Mechanotherapy Science",
    nav_reviews: "Client Results",
    nav_apply: "Apply Now",
    btn_consult: "Get Started",
    hero_badge: "INTERACTIVE BODY MAP & MECHANOTHERAPY",
    hero_title: "Click The Area That's Troubling You",
    hero_sub: "Want to unlock your body's hidden potential? Select any body region to explore the 3-phase evidence-based mechanotherapy rehabilitation protocol!",
    hero_hint: "Tap on any glowing pulse hotspot to view curated Isometric, HSR & End-Range protocols",
    
    // Science Section
    sci_badge: "EVIDENCE-BASED CONSERVATIVE REHABILITATION",
    sci_title: "Mechanotherapy & Tendon Continuum Framework",
    sci_sub: "Based on pioneering research by Prof. Jill Cook & Dr. Ebonie Rio combined with ATG & FRC principles — Regenerating tendons and joints through progressive mechanical loading instead of surgery or complete rest.",
    cont_stage1_title: "Reactive Tendinopathy (Acute Overload)",
    cont_stage1_trigger: "Trigger: Sudden spikes in training volume, intensity, or unaccustomed load.",
    cont_stage1_desc: "Tendon cells mount an acute non-inflammatory proliferative response, increasing bound proteoglycans to absorb compressive stress without structural disruption.",
    cont_stage1_rx: "Strategy: Isometric Loading (Analgesic Dose)",
    cont_stage1_note: "Strictly avoid compressive stretching. 45-second isometric holds induce immediate cortical inhibition relief.",
    cont_stage1_title_d: "Tendon Dysrepair (Matrix Breakdown)",
    cont_stage2_trigger: "Trigger: Persistent chronic overloading without adequate cellular recovery time.",
    cont_stage2_desc: "Tenocytes undergo chondroid metaplasia, matrix proteoglycans separate collagen fascicles, and pathological neovascularization initiates.",
    cont_stage2_rx: "Strategy: Heavy Slow Resistance (HSR)",
    cont_stage2_note: "Heavy loads performed with a 3s concentric / 1s pause / 3s eccentric tempo trigger mechanotransduction to stimulate Type I Collagen.",
    cont_stage3_title: "Degenerative Tendon (Chronic Remodeling)",
    cont_stage3_trigger: "Trigger: Months to years of micro-trauma leading to cell death and focal matrix exhaustion.",
    cont_stage3_desc: "Disorganized collagen fibers and areas of acellular necrosis. Hallmark symptoms include morning stiffness and warm-up phenomenon.",
    cont_stage3_rx: "Strategy: 'Treat the Donut, Not the Hole'",
    cont_stage3_note: "Prof. Jill Cook: Focus mechanical loading on the abundant surrounding healthy tendon tissue to build sufficient tensile capacity.",
    
    proto_main_title: "The 4-Stage Progressive Tendon Loading Continuum",
    proto_p1_badge: "Level 1: Acute / Pain Relief",
    proto_p1_title: "1. Isometric Loading (Cortical Inhibition Relief)",
    proto_p1_desc: "Holding muscle contractions at specific joint angles (45-60s holds x 4-5 sets at ~70% MVC). Directly modulates central nervous system pain thresholds for 45-60 minutes without provoking compressive strain.",
    proto_p2_badge: "Level 2: Structural Remodeling",
    proto_p2_title: "2. Isotonic Heavy Slow Resistance (Type I Collagen Synthesis)",
    proto_p2_desc: "Controlled cadence (Tempo 3s concentric - 1s pause - 3s eccentric). Mechanotransduction cascades signal tenocytes to synthesize parallel, robust Type I collagen fibers, significantly enhancing tensile stiffness.",
    proto_p3_badge: "Level 3: Elastic Capacity",
    proto_p3_title: "3. Energy Storage & Plyometrics (Biological Spring Recoil)",
    proto_p3_desc: "Progressive ballistic and jumping drills that train the stretch-shortening cycle (SSC). Restores the tendon's capacity to act as an energy-efficient biological spring.",
    proto_p4_badge: "Level 4: End-Range Resilience",
    proto_p4_title: "4. End-Range Capacity & Re-Integration (ATG & FRC Usable Mobility)",
    proto_p4_desc: "Loaded stretching at extreme articular end-ranges (ATG principles by Ben Patrick) combined with active neuro-motor control (Dr. Andreo Spina FRC). Joint bulletproofing across all vectors.",

    comp_rest_title: "The Mistake: Complete Rest & Corticosteroid Injections",
    comp_r1: "Complete rest triggers stress-deprivation atrophy, reducing vascular density and cellular load tolerance.",
    comp_r2: "Steroid shots mask pain temporarily while blunting collagen synthesis, increasing spontaneous tendon rupture rates by 4-6x.",
    comp_r3: "Muscle inhibition cascades, leading to worse flare-ups as soon as the athlete resumes sport.",
    comp_load_title: "The Evidence-Based Cure: Progressive Optimal Loading",
    comp_l1: "Controlled mechanical tension is the ONLY stimulus capable of driving tenocyte collagen remodeling.",
    comp_l2: "Isometric holds provide immediate analgesic relief through spinal and cortical pathways with zero joint wear.",
    comp_l3: "Forges muscular armor around articular cartilage for lifelong resilience without surgical intervention.",

    // Testimonials
    reviews_title: "Do you want to unlock your body's hidden potential?",
    reviews_sub: "Get coached by Mark! Join hundreds of athletes & clients who conquered pain and rebuilt resilience.",

    // Form
    form_heading: "Apply To Work With Mark",
    form_criteria_desc: "Before continuing, please confirm that the below criteria match your situation.",
    crit_1: "You are seriously considering coaching.",
    crit_2: "You are willing to financially invest in coaching.",
    crit_3: "You are determined to create long-lasting changes rather than a temporary quick fix.",
    crit_confirm: "Yes, I confirm that this is what I am looking for.",
    lbl_name: "Full name",
    lbl_email: "Email address",
    lbl_dob: "Date of birth",
    lbl_source: "Where did you hear about this coaching opportunity?",
    opt_select: "Choose one or more options...",
    opt_other: "Other",
    lbl_tendon_phase: "Which phase best characterizes your current pain presentation?",
    opt_select_stage: "Select your pain presentation...",
    opt_stage_reactive: "1. Acute sharp pain following a sudden load increase (Reactive Phase)",
    opt_stage_dysrepair: "2. Dull ache for weeks, persistent morning stiffness on first steps (Dysrepair Phase)",
    opt_stage_degenerative: "3. Chronic pain for years, confirmed MRI tendinosis / partial tearing (Degenerative)",
    opt_stage_spine: "4. Chronic lower back / neck stiffness with nerve radiation on prolonged sitting",
    lbl_goal: "Please describe what you would like to achieve below (the more detail the better!)",
    lbl_obstacle: "If you haven't mentioned it, please detail what is HOLDING YOU BACK from achieving it.",
    lbl_history: "Please outline your full injury history as best as you can. Include Left/Right side.",
    lbl_triggers: "If a physical injury is troubling you, please describe the specific situations where this happens.",
    lbl_treatment: "Are you currently receiving treatment / personal training / S&C elsewhere?",
    lbl_failed: "If you felt other forms of treatment were unsuccessful, why do you feel they didn't work for you?",
    lbl_pain_scale: "Label on a scale of 1-10 the intensity of pain/stiffness on WORST days (10 = the worst)",
    lbl_confidence_scale: "How confident are you in your body's ability to improve? (1-10)",
    lbl_activity: "Please describe what a typical week of activity looks like to you.",
    lbl_vision: "Imagine it's 6 months from now and you've made progress. What does life look like?",
    lbl_impact: "What positive effect would being able to do this create for you, your health, and relationships?",
    lbl_challenge: "Detail a time where you overcame multiple challenges to accomplish a desired outcome:",
    lbl_location: "If we agree coaching is a good idea, would you prefer gym, home, or both?",
    opt_gym: "Gym",
    opt_home: "At Home",
    opt_both: "Both Gym & Home",
    lbl_notes: "Is there anything else you'd like me to know?",
    btn_submit: "Proceed With Application",
    modal_success_title: "Application Submitted Successfully!",
    modal_success_desc: "Thank you for applying. We have received your detailed intake form and will reach out via Email within 24 hours.",
    modal_close_btn: "Close",
    footer_tagline: "Eliminate the frustrations of injury with battle-tested movement and strength approaches.",
    footer_quick_links: "Quick Links",
    footer_contact: "Contact",
    take_next_step: "Ready For Your 1-on-1 Personalized Plan?",
    get_coached: "Apply For Dedicated Coaching →",

    // Tabs
    tab_p1: "⚡ Phase 1: Isometric",
    tab_p2: "🧱 Phase 2: Heavy Slow",
    tab_p3: "🚀 Phase 3: End-Range / Elastic"
  }
};

// Hotspot coordinates on the anatomical stage
const DOTS = [
  { id: 'spot1', xpct: 62.62,  ypct: 9.481,  titleVi: 'Khớp Vai', titleEn: 'Shoulder' },
  { id: 'spot2', xpct: 49.963, ypct: 18.481, titleVi: 'Sức Mạnh Tổng Thể', titleEn: 'General Strength' },
  { id: 'spot3', xpct: 31.111, ypct: 24.681, titleVi: 'Khuỷu Tay', titleEn: 'Elbow' },
  { id: 'spot4', xpct: 49.963, ypct: 30.889, titleVi: 'Thắt Lưng & Cột Sống', titleEn: 'Lower Back' },
  { id: 'spot5', xpct: 25.37,  ypct: 40.667, titleVi: 'Cổ Tay & Cẳng Tay', titleEn: 'Wrist' },
  { id: 'spot6', xpct: 58.75,  ypct: 40.667, titleVi: 'Khớp Háng', titleEn: 'Hip' },
  { id: 'spot7', xpct: 42.361, ypct: 66.281, titleVi: 'Khớp Gối', titleEn: 'Knee' },
  { id: 'spot8', xpct: 58.731, ypct: 88.874, titleVi: 'Bàn Chân & Gân Gót', titleEn: 'Foot, Ankle & Achilles' }
];

// Deep Clinical Mechanotherapy Exercise Data with 3 Biological Phases per Region
const EXERCISE_DATA = {
  spot1: {
    titleVi: "Khớp Vai & Chóp Xoay (Rotator Cuff)",
    titleEn: "Shoulder & Rotator Cuff",
    pearlVi: "Gân cơ trên gai (Supraspinatus) dễ bị chèn ép dưới mỏm cùng vai. Bài tập gồng tĩnh xoay ngoài (Isometric) làm giảm đau ngay lập tức, trước khi tái cấu trúc sợi bằng HSR.",
    pearlEn: "Supraspinatus tendon is prone to subacromial impingement. Isometric external rotations deliver immediate analgesic relief by inhibiting cortical pain pathways.",
    p1: [
      { name: "Isometric Wall External Rotation", reps: "Giữ tĩnh 45 giây x 4 hiệp (Tải 70% lực)", videoUrl: "https://www.youtube.com/watch?v=RrKFIVbS4co" },
      { name: "Scapular Wall Slide Hold", reps: "Giữ 30 giây x 3 hiệp tại góc 90 độ", videoUrl: "https://www.youtube.com/watch?v=yvPaq5JyBPg" }
    ],
    p2: [
      { name: "Heavy Slow In To Out Rotation (Tempo 3-1-3)", reps: "3 hiệp x 8-10 lần (Kháng lực cáp/dây)", videoUrl: "https://www.youtube.com/watch?v=yvPaq5JyBPg" },
      { name: "Slow Tempo Incline Dumbbell Press", reps: "3 hiệp x 8 lần (Hạ 3 giây có kiểm soát)", videoUrl: "https://www.youtube.com/watch?v=PRFg1O8vtQI" }
    ],
    p3: [
      { name: "Band Pull Apart & Over-Head Dislocates", reps: "3 hiệp x 15 lần (Mở rộng góc tận)", videoUrl: "https://www.youtube.com/watch?v=n3mLZHh5qOw" },
      { name: "Shoulder CARs (Controlled Articular Rotations)", reps: "5 vòng xoay cực đại mỗi bên", videoUrl: "https://www.youtube.com/watch?v=RrKFIVbS4co" }
    ]
  },

  spot2: {
    titleVi: "Sức Mạnh Cốt Lõi & Toàn Thân (General Strength)",
    titleEn: "General Strength & Core Resilience",
    pearlVi: "Xây dựng áp lực trong ổ bụng (Intra-abdominal Pressure) và sức mạnh chuỗi cơ sau để phân tán đều áp lực lên mọi khớp nối.",
    pearlEn: "Building intra-abdominal pressure and posterior chain force transference protects all distal and proximal joints.",
    p1: [
      { name: "Isometric Goblet Squat Pause (Bottom Hold)", reps: "Giữ tĩnh 30 giây x 4 hiệp", videoUrl: "https://www.youtube.com/watch?v=zAmvxveQcHw" },
      { name: "Plank / Side-Plank Anti-Rotation Hold", reps: "Giữ 45 giây x 3 hiệp mỗi bên", videoUrl: "https://www.youtube.com/watch?v=b4Gd3VSdzyg" }
    ],
    p2: [
      { name: "Slow Tempo Incline Press (3-1-3)", reps: "3 hiệp x 8 lần", videoUrl: "https://www.youtube.com/watch?v=PRFg1O8vtQI" },
      { name: "Loaded Dumbbell Pullover (Tempo 3-1-3)", reps: "3 hiệp x 8 lần (Kích hoạt ngực & xô)", videoUrl: "https://www.youtube.com/watch?v=4-ee5oKxrnY" }
    ],
    p3: [
      { name: "VMO Squat (Squat Góc Sâu Tăng Sức Mạnh Gối)", reps: "3 hiệp x 6-8 lần", videoUrl: "https://www.youtube.com/watch?v=zAmvxveQcHw" },
      { name: "Farmer's Carry (Xách Tạ Tải Nặng Tăng Vững Trục)", reps: "3 hiệp x 40 bước chân", videoUrl: "https://www.youtube.com/watch?v=zAmvxveQcHw" }
    ]
  },

  spot3: {
    titleVi: "Khuỷu Tay (Tennis & Golfer's Elbow)",
    titleEn: "Elbow & Epicondylalgia",
    pearlVi: "Viêm lồi cầu ngoài (Tennis Elbow) hoặc trong (Golfer Elbow) là bệnh lý gân kinh điển. Gồng tĩnh cơ Brachialis và gân cơ duỗi cổ tay giúp giải phóng chèn ép rễ thần kinh.",
    pearlEn: "Lateral and medial epicondylalgia respond dramatically to brachialis and wrist extensor isometric holds prior to eccentric tendon remodelling.",
    p1: [
      { name: "Brachi Isometric Hold", reps: "Giữ tĩnh 30 giây x 3 hiệp mỗi bên (Góc 90 độ)", videoUrl: "https://www.youtube.com/watch?v=UPMii4RtfkI" },
      { name: "Isometric Wrist Extension Press", reps: "Giữ 45 giây x 4 hiệp (Tải 70% lực)", videoUrl: "https://www.youtube.com/watch?v=UEFX85jM784" }
    ],
    p2: [
      { name: "Heavy Slow Brachi Curls (Tempo 3-1-3)", reps: "3 hiệp x 6-8 lần mỗi bên", videoUrl: "https://www.youtube.com/watch?v=thZOqkrRAbo" },
      { name: "Triceps Kickback with Controlled Eccentric", reps: "3 hiệp x 8 lần mỗi bên", videoUrl: "https://www.youtube.com/watch?v=Wv68aNZQyB4" }
    ],
    p3: [
      { name: "Loaded Biceps End-Range Stretch", reps: "Giữ 45 giây có tải nhẹ x 2 hiệp", videoUrl: "https://www.youtube.com/watch?v=thZOqkrRAbo" },
      { name: "Wrist Rope Flow for Elbow Decompression", reps: "30 vòng xoay nhịp nhàng mỗi bên", videoUrl: "https://www.youtube.com/watch?v=5u840hSkzf8" }
    ]
  },

  spot4: {
    titleVi: "Cột Sống Thắt Lưng (Lower Back & Lumbar Spine)",
    titleEn: "Lower Back & Lumbar Spine",
    pearlVi: "Theo GS. Stuart McGill: Đĩa đệm không được uốn vặn quá mức khi đang đau cấp. Mục tiêu là tạo độ cứng vững trục thân (Core Stiffness) và tăng độ dẻo của khớp háng để giải phóng lưng.",
    pearlEn: "Prof. Stuart McGill protocol: The lumbar spine requires stiffness and stability, while the hips require mobility to spare the intervertebral discs.",
    p1: [
      { name: "McGill Bird-Dog Isometric Hold", reps: "Giữ tĩnh 10 giây x 6 lần mỗi bên", videoUrl: "https://www.youtube.com/watch?v=b4Gd3VSdzyg" },
      { name: "Glute Myofascial Release with Ball", reps: "60 giây giải mạc mỗi bên mông", videoUrl: "https://www.youtube.com/watch?v=NI5KwL5dkAA" }
    ],
    p2: [
      { name: "Seated Good Morning (Tempo 3-1-3)", reps: "3 hiệp x 8 lần (Lưng thẳng tuyệt đối)", videoUrl: "https://www.youtube.com/watch?v=b4Gd3VSdzyg" },
      { name: "Internal Rotations with Resistance", reps: "2 hiệp x 30 giây mỗi bên", videoUrl: "https://www.youtube.com/watch?v=KRfTFbeU5iM" }
    ],
    p3: [
      { name: "Loaded Jefferson Curl (Tiến triển cẩn trọng)", reps: "3 hiệp x 5 lần (Tải nhẹ, cuộn từng đốt sống)", videoUrl: "https://www.youtube.com/watch?v=b4Gd3VSdzyg" },
      { name: "Hip-Spine Disassociation Drills", reps: "2 hiệp x 10 lần mỗi bên", videoUrl: "https://www.youtube.com/watch?v=KRfTFbeU5iM" }
    ]
  },

  spot5: {
    titleVi: "Cổ Tay & Ngón Tay (Wrist & Carpal Tunnel)",
    titleEn: "Wrist, Hand & Carpal Tunnel",
    pearlVi: "Hội chứng ống cổ tay và đau gân de Quervain xuất phát từ ma sát kéo dài. Cần kết hợp giải phóng bao gân, kéo dài gân ngón tay và nạp tải 4 mặt phẳng vận động.",
    pearlEn: "Carpal tunnel and de Quervain tenosynovitis require progressive 4-plane loading and finger tendon glide maneuvers to restore retinaculum slide.",
    p1: [
      { name: "Isometric Wrist Flexion / Extension Hold", reps: "Giữ 30 giây x 4 hiệp mỗi hướng", videoUrl: "https://www.youtube.com/watch?v=UEFX85jM784" },
      { name: "Finger Lengthening (Tendon Gliding)", reps: "15 giây cho từng ngón tay x 2 lần", videoUrl: "https://www.youtube.com/watch?v=-_6gr8_fVss" }
    ],
    p2: [
      { name: "4-Plane Wrist Dumbbell Circuit (Slow Tempo)", reps: "12 lần trong mỗi mặt phẳng vận động", videoUrl: "https://www.youtube.com/watch?v=UEFX85jM784" },
      { name: "Radial & Ulnar Deviation Slow Load", reps: "2 hiệp x 10 lần mỗi bên", videoUrl: "https://www.youtube.com/watch?v=UEFX85jM784" }
    ],
    p3: [
      { name: "Wrist Rope Flow (Phối Hợp Nhịp Điệu Dây)", reps: "30 vòng xoay liên tục mỗi bên", videoUrl: "https://www.youtube.com/watch?v=5u840hSkzf8" },
      { name: "End-Range Palms-Down Floor Stretch", reps: "Giữ có tải 45 giây x 2 hiệp", videoUrl: "https://www.youtube.com/watch?v=-_6gr8_fVss" }
    ]
  },

  spot6: {
    titleVi: "Khớp Háng & Khung Chậu (Hip Joint & Labrum)",
    titleEn: "Hip Joint & Acetabular Labrum",
    pearlVi: "Khớp háng là khớp chỏm cầu chịu tải lớn nhất. Hẹp khe khớp hay viêm gân cơ thắt lưng chậu (Psoas) được giải quyết qua bài 90/90 FRC và Couch Stretch mở rộng góc gập háng.",
    pearlEn: "The hip requires rotational freedom. 90/90 FRC rotations and loaded couch stretches restore internal rotation and decompress the anterior capsule.",
    p1: [
      { name: "90/90 Isometric Floor Press", reps: "Gồng ép đầu gối xuống sàn 30 giây x 3 hiệp", videoUrl: "https://www.youtube.com/watch?v=VSi9x8dzSnU" },
      { name: "Isometric Glute Bridge Hold", reps: "Giữ tĩnh 45 giây x 3 hiệp", videoUrl: "https://www.youtube.com/watch?v=D9YimkCIQ6s" }
    ],
    p2: [
      { name: "Couch Stretch with Active Quad Contraction", reps: "2 hiệp x giữ 30 giây mỗi bên", videoUrl: "https://www.youtube.com/watch?v=D9YimkCIQ6s" },
      { name: "Seated Butterfly with Slow Resistance", reps: "3 hiệp x 12 lần (Tempo 3-1-3)", videoUrl: "https://www.youtube.com/watch?v=7JJTlYdrLl4" }
    ],
    p3: [
      { name: "90/90 Active Hip Rotations (FRC CARs)", reps: "2 hiệp x 10 vòng xoay mỗi bên", videoUrl: "https://www.youtube.com/watch?v=VSi9x8dzSnU" },
      { name: "Pigeon Pose with Active Lift-Offs", reps: "5 lần nhấc chân ở góc tận mỗi bên", videoUrl: "https://www.youtube.com/watch?v=7JJTlYdrLl4" }
    ]
  },

  spot7: {
    titleVi: "Khớp Gối & Gân Bánh Chè (Patellar & Meniscus)",
    titleEn: "Knee, Patellar Tendon & Meniscus",
    pearlVi: "Gân bánh chè (Jumper's Knee) là mô hình kinh điển của GS. Jill Cook. Bài Spanish Squat Isometric 45s làm tê liệt tín hiệu đau ngay lập tức, sau đó dùng ATG Split Squat để tái tạo sụn và cơ chày trước.",
    pearlEn: "Jill Cook gold standard: Patellar tendinopathy responds to 45s Spanish Squat / Wall Sit isometrics for cortical pain relief, followed by ATG split squats for structural collagen remodeling.",
    p1: [
      { name: "Spanish Squat / Wall Sit Isometric Hold", reps: "Giữ tĩnh 45 giây x 5 hiệp (Nghỉ 2 phút giữa hiệp)", videoUrl: "https://www.youtube.com/watch?v=zAmvxveQcHw" },
      { name: "Straight Leg Isometric Quad Squeeze", reps: "Gồng đùi tối đa 30 giây x 4 hiệp", videoUrl: "https://www.youtube.com/watch?v=m08gkeFXqvs" }
    ],
    p2: [
      { name: "ATG Split Squat (Tempo 3-1-3 có kiểm soát)", reps: "3 hiệp x 6-8 lần mỗi bên", videoUrl: "https://www.youtube.com/watch?v=N1GnUR7ezaU" },
      { name: "Tibialis Raise (Nâng Mũi Chân Bảo Vệ Gối)", reps: "3 hiệp x 20 lần nhịp chậm", videoUrl: "https://www.youtube.com/watch?v=m08gkeFXqvs" }
    ],
    p3: [
      { name: "Reversing (Đi Lùi Trên Dốc / Máy Chạy / Kéo Xe)", reps: "3 đến 5 phút liên tục (Bơm dịch nuôi sụn)", videoUrl: "https://www.youtube.com/watch?v=eHNjINgNJzY" },
      { name: "Poliquin Step-Up & Low-Impact Pogo Jumps", reps: "3 hiệp x 15 bước mỗi bên", videoUrl: "https://www.youtube.com/watch?v=N1GnUR7ezaU" }
    ]
  },

  spot8: {
    titleVi: "Cổ Chân, Gân Gót & Gan Bàn Chân (Achilles & Plantar Fascia)",
    titleEn: "Foot, Ankle, Achilles & Plantar Fascia",
    pearlVi: "Gân gót Achilles là gân chịu tải nặng nhất cơ thể (gấp 8-10 lần trọng lượng khi chạy). Cần nạp tải gồng tĩnh nhón gót (Isometric Calf Raise), tiếp nối bằng bài hạ gót chậm (Alfredson protocol).",
    pearlEn: "The Achilles tendon withstands up to 10x bodyweight. High-load isometric calf raises eliminate morning stiffness, while slow eccentric heel drops realign collagen fibers.",
    p1: [
      { name: "Isometric Single-Leg Calf Raise Hold", reps: "Giữ tĩnh đỉnh cao 45 giây x 5 hiệp mỗi bên", videoUrl: "https://www.youtube.com/watch?v=SCPoAEqd87I" },
      { name: "Plantar Fascia Foot Ball Roll (Giải Mạc Đáy Chân)", reps: "60 giây lăn đều mỗi bên", videoUrl: "https://www.youtube.com/watch?v=UAN7-CrZnDM" }
    ],
    p2: [
      { name: "Alfredson Heavy Slow Eccentric Heel Drop (3-1-3)", reps: "3 hiệp x 10 lần mỗi bên có tải", videoUrl: "https://www.youtube.com/watch?v=SCPoAEqd87I" },
      { name: "Ankle Pronations & Supinations with Band", reps: "2 hiệp x 12 lần mỗi bên", videoUrl: "https://www.youtube.com/watch?v=a974n8T5iTY" }
    ],
    p3: [
      { name: "Ankle CARs & End-Range Dorsiflexion Stretch", reps: "2 hiệp x 45 giây kéo giãn có tải", videoUrl: "https://www.youtube.com/watch?v=a974n8T5iTY" },
      { name: "Low-Amplitude Elastic Ankle Hops (Plyometrics)", reps: "3 hiệp x 20 lần nhún bật nhẹ nhàng", videoUrl: "https://www.youtube.com/watch?v=eHNjINgNJzY" }
    ]
  }
};

// 22 Testimonial Image URLs from moveforever.info
const TESTIMONIAL_IMAGES = [
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/7RV9Hg6yzbZa9Xa7wzoN/media/6ac4c254c478ac5535fe680f.png",
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/7RV9Hg6yzbZa9Xa7wzoN/media/6ac4c2587d735ea2a158dbcb.png",
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/7RV9Hg6yzbZa9Xa7wzoN/media/6ac4c257bbad531ac8e682cd.png",
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/7RV9Hg6yzbZa9Xa7wzoN/media/6ac4c25822bc27f58f919fac.png",
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/7RV9Hg6yzbZa9Xa7wzoN/media/6ac4c2557d735ea2a158db49.png",
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/7RV9Hg6yzbZa9Xa7wzoN/media/6ac4c2557d735ea2a158db59.png",
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/7RV9Hg6yzbZa9Xa7wzoN/media/6ac4c2567d735ea2a158db95.png",
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/7RV9Hg6yzbZa9Xa7wzoN/media/6ac4c2567d735ea2a158db89.png",
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/7RV9Hg6yzbZa9Xa7wzoN/media/6ac4c24d195f9172eda5776a.png",
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/7RV9Hg6yzbZa9Xa7wzoN/media/6ac4c24d7d735ea2a158da4b.png",
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/7RV9Hg6yzbZa9Xa7wzoN/media/6ac4c252195f9172eda57821.png",
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/7RV9Hg6yzbZa9Xa7wzoN/media/6ac4c25222bc27f58f919edf.png",
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/7RV9Hg6yzbZa9Xa7wzoN/media/6ac4c251c478ac5535fe679b.png",
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/7RV9Hg6yzbZa9Xa7wzoN/media/6ac4c251195f9172eda57809.png",
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/7RV9Hg6yzbZa9Xa7wzoN/media/6ac4c24d195f9172eda5777b.png",
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/7RV9Hg6yzbZa9Xa7wzoN/media/6ac4c24dc478ac5535fe671b.png",
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/7RV9Hg6yzbZa9Xa7wzoN/media/6ac4c24d7d735ea2a158da4c.png",
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/7RV9Hg6yzbZa9Xa7wzoN/media/6ac4c24d195f9172eda57771.png",
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/7RV9Hg6yzbZa9Xa7wzoN/media/6ac4c255bbad531ac8e68261.png",
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/7RV9Hg6yzbZa9Xa7wzoN/media/6ac4c255195f9172eda578a1.png",
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/7RV9Hg6yzbZa9Xa7wzoN/media/6ac4c252195f9172eda5782d.png",
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/7RV9Hg6yzbZa9Xa7wzoN/media/6ac4c25222bc27f58f919eea.png"
];

// Helper: Extract YouTube Embed & Thumbnail
function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{6,})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}

function getYouTubeThumbnail(url) {
  if (!url) return '';
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{6,})/);
  return match ? `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg` : '';
}

// DOM Elements
const stage = document.getElementById('bm-stage');
const overlay = document.getElementById('bm-overlay');
const panel = document.getElementById('bm-panel');

// 1. Render Interactive Hotspots
function renderHotspots() {
  const oldHotspots = stage.querySelectorAll('.bm-hotspot');
  oldHotspots.forEach(el => el.remove());

  DOTS.forEach(d => {
    const data = EXERCISE_DATA[d.id];
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'bm-hotspot bm-has-content';
    btn.style.left = d.xpct + '%';
    btn.style.top = d.ypct + '%';
    btn.style.width = '7%';
    btn.style.aspectRatio = '1 / 1';
    
    const title = currentLang === 'vi' ? d.titleVi : d.titleEn;
    btn.setAttribute('aria-label', title);
    btn.setAttribute('title', title);

    btn.innerHTML = '<div class="bm-hotspot-inner"></div>';
    btn.addEventListener('click', () => openModal(d.id));
    stage.appendChild(btn);
  });
}

// 2. Open Exercise Modal with 3-Phase Tabs
function openModal(spotId) {
  activeModalSpot = spotId;
  activeModalPhase = 'p1';
  renderModalContent();
  overlay.classList.add('bm-open');
}

function renderModalContent() {
  const data = EXERCISE_DATA[activeModalSpot];
  if (!data) return;

  const t = TRANSLATIONS[currentLang];
  const title = currentLang === 'vi' ? data.titleVi : data.titleEn;
  const pearl = currentLang === 'vi' ? data.pearlVi : data.pearlEn;

  panel.innerHTML = `
    <div class="bm-panel-head">
      <h3>${title}</h3>
      <button type="button" class="bm-close-btn" aria-label="Close" onclick="closeModal()">&times;</button>
    </div>

    <!-- Clinical Pearl Callout -->
    <div class="bm-clinical-tip">
      <i class="fa-solid fa-microscope"></i> <strong>${currentLang === 'vi' ? 'Cơ Chế Y Khoa' : 'Clinical Pearl'}:</strong> ${pearl}
    </div>

    <!-- 3-Phase Biological Tabs -->
    <div class="bm-phase-tabs">
      <button type="button" class="bm-phase-tab ${activeModalPhase === 'p1' ? 'active' : ''}" onclick="switchModalPhase('p1')">
        ${t.tab_p1}
      </button>
      <button type="button" class="bm-phase-tab ${activeModalPhase === 'p2' ? 'active' : ''}" onclick="switchModalPhase('p2')">
        ${t.tab_p2}
      </button>
      <button type="button" class="bm-phase-tab ${activeModalPhase === 'p3' ? 'active' : ''}" onclick="switchModalPhase('p3')">
        ${t.tab_p3}
      </button>
    </div>

    <!-- Exercise List for the selected phase -->
    <div class="bm-exercise-list" id="exercise-list"></div>

    <div class="bm-cta">
      <p>${t.take_next_step}</p>
      <a class="bm-cta-btn" href="#apply" onclick="closeModal()">${t.get_coached}</a>
    </div>
  `;

  // Render exercises for current phase
  const listContainer = panel.querySelector('#exercise-list');
  const exercises = data[activeModalPhase] || [];

  exercises.forEach((ex) => {
    const embedUrl = getYouTubeEmbedUrl(ex.videoUrl);
    const thumbUrl = getYouTubeThumbnail(ex.videoUrl);

    const row = document.createElement('div');
    row.className = 'bm-exercise-row';
    row.innerHTML = `
      <div class="bm-thumb" style="background-image: url('${thumbUrl}')">
        <div class="bm-play">
          <svg viewBox="0 0 24 24" fill="#06282a"><path d="M8 5v14l11-7z"/></svg>
        </div>
      </div>
      <div class="bm-ex-info">
        <p class="bm-name">${ex.name}</p>
        <p class="bm-reps"><i class="fa-solid fa-stopwatch"></i> ${ex.reps}</p>
      </div>
    `;

    // Click on thumbnail to play inline video
    row.querySelector('.bm-thumb').addEventListener('click', () => {
      const wrap = document.createElement('div');
      wrap.className = 'bm-video-embed';
      wrap.innerHTML = `<iframe src="${embedUrl}?autoplay=1" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
      row.replaceWith(wrap);
    });

    listContainer.appendChild(row);
  });
}

function switchModalPhase(phase) {
  activeModalPhase = phase;
  renderModalContent();
}

function closeModal() {
  overlay.classList.remove('bm-open');
  panel.innerHTML = '';
  activeModalSpot = null;
}

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    closeSuccessModal();
  }
});

// 3. Testimonials Carousel
let currentSlide = 0;
let sliderInterval = null;

function initSlider() {
  const track = document.getElementById('slider-track');
  const dotsContainer = document.getElementById('slider-dots');

  track.innerHTML = '';
  dotsContainer.innerHTML = '';

  TESTIMONIAL_IMAGES.forEach((src, idx) => {
    const slide = document.createElement('div');
    slide.className = 'slider-slide';
    slide.innerHTML = `<img src="${src}" alt="Client Result ${idx + 1}" loading="lazy">`;
    track.appendChild(slide);

    if (idx < 10) {
      const dot = document.createElement('div');
      dot.className = `dot ${idx === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    }
  });

  document.getElementById('slider-prev').addEventListener('click', prevSlide);
  document.getElementById('slider-next').addEventListener('click', nextSlide);

  startAutoSlide();

  const wrapper = document.querySelector('.slider-wrapper');
  wrapper.addEventListener('mouseenter', () => clearInterval(sliderInterval));
  wrapper.addEventListener('mouseleave', startAutoSlide);

  let startX = 0;
  wrapper.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  wrapper.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextSlide();
    else if (endX - startX > 50) prevSlide();
  }, { passive: true });
}

function updateSlider() {
  const track = document.getElementById('slider-track');
  track.style.transform = `translateX(-${currentSlide * 100}%)`;

  const dots = document.querySelectorAll('.slider-dots .dot');
  dots.forEach((d, idx) => {
    d.classList.toggle('active', idx === (currentSlide % 10));
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % TESTIMONIAL_IMAGES.length;
  updateSlider();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + TESTIMONIAL_IMAGES.length) % TESTIMONIAL_IMAGES.length;
  updateSlider();
}

function goToSlide(idx) {
  currentSlide = idx;
  updateSlider();
}

function startAutoSlide() {
  clearInterval(sliderInterval);
  sliderInterval = setInterval(nextSlide, 4500);
}

// 4. Form Handling & Local Storage
const appForm = document.getElementById('coaching-application-form');
const successOverlay = document.getElementById('success-overlay');

appForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const confirmBox = document.getElementById('crit-confirm');
  if (!confirmBox.checked) {
    alert(currentLang === 'vi' 
      ? 'Vui lòng đánh dấu xác nhận tiêu chí trước khi nộp hồ sơ.' 
      : 'Please confirm the qualification criteria before submitting.');
    confirmBox.focus();
    return;
  }

  const formData = new FormData(appForm);
  const dataObj = {};
  formData.forEach((value, key) => {
    dataObj[key] = value;
  });
  dataObj.submittedAt = new Date().toISOString();

  // Store locally
  const submissions = JSON.parse(localStorage.getItem('moveforever_applications') || '[]');
  submissions.push(dataObj);
  localStorage.setItem('moveforever_applications', JSON.stringify(submissions));

  console.log('Form submission saved:', dataObj);

  // Show success modal
  successOverlay.classList.add('open');
  appForm.reset();
});

function closeSuccessModal() {
  successOverlay.classList.remove('open');
}

// 5. Language Switcher
const langBtn = document.getElementById('lang-toggle-btn');
const currentLangText = document.getElementById('current-lang-text');

langBtn.addEventListener('click', () => {
  currentLang = currentLang === 'vi' ? 'en' : 'vi';
  applyLanguage(currentLang);
});

function applyLanguage(lang) {
  currentLangText.innerText = lang === 'vi' ? 'EN' : 'VI';
  document.documentElement.lang = lang;

  // Replace text for all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
      el.textContent = TRANSLATIONS[lang][key];
    }
  });

  // Re-render Hotspots & Modal if open
  renderHotspots();
  if (activeModalSpot) {
    renderModalContent();
  }
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
  renderHotspots();
  initSlider();
});
