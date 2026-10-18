/**
 * MOVE FOREVER - INTERACTIVE APPLICATION ENGINE
 */

// Current Language State ('vi' or 'en')
let currentLang = 'vi';

// Translations Dictionary
const TRANSLATIONS = {
  vi: {
    nav_map: "Sơ đồ cơ thể",
    nav_reviews: "Kết quả học viên",
    nav_apply: "Đăng ký tư vấn",
    btn_consult: "Bắt Đầu Ngay",
    hero_badge: "BẢN ĐỒ VẬN ĐỘNG TƯƠNG TÁC",
    hero_title: "Nhấn Vào Vùng Bạn Đang Gặp Vấn Đề",
    hero_sub: "Bạn muốn giải phóng tiềm năng tiềm ẩn của cơ thể? Hãy bắt đầu với các bài tập phục hồi chuyên biệt dưới đây!",
    hero_hint: "Chạm vào điểm phát sáng trên cơ thể để xem bài tập và video hướng dẫn",
    reviews_title: "Bạn Đã Sẵn Sàng Khai Phá Tiềm Năng Cơ Thể?",
    reviews_sub: "Hàng trăm học viên đã chiến thắng cơn đau mãn tính, hồi phục chuyển động và lấy lại sự tự tin.",
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
    take_next_step: "Sẵn Sàng Tiến Xa Hơn?",
    get_coached: "Đăng Ký Huấn Luyện 1-1 →"
  },
  en: {
    nav_map: "Body Map",
    nav_reviews: "Client Results",
    nav_apply: "Apply Now",
    btn_consult: "Get Started",
    hero_badge: "INTERACTIVE BODY MAP",
    hero_title: "Click The Area That's Troubling You",
    hero_sub: "Do you want to unlock your body's hidden potential? Get coached by Mark!",
    hero_hint: "Tap on any glowing pulse hotspot to view curated exercises and video guides",
    reviews_title: "Do you want to unlock your body's hidden potential?",
    reviews_sub: "Get coached by Mark! Join hundreds of athletes & clients who conquered pain and rebuilt resilience.",
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
    take_next_step: "Ready For The Next Step?",
    get_coached: "Get Coached By Mark →"
  }
};

// Hotspot Data
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

// Exercise Data per hotspot
const EXERCISE_DATA = {
  spot1: {
    titleVi: "Khớp Vai (Shoulder)",
    titleEn: "Shoulder",
    subVi: "Bắt đầu với 3 bài tập phục hồi khớp vai cơ bản:",
    subEn: "Start With These 3 Key Shoulder Drills!",
    exercises: [
      { name: "External Rotation (Xoay Ngoài Khớp Vai)", reps: "3 hiệp x 8 lần mỗi bên", videoUrl: "https://www.youtube.com/watch?v=RrKFIVbS4co" },
      { name: "In To Out Rotation (Xoay Trong Ra Ngoài)", reps: "3 hiệp x 10 lần mỗi bên", videoUrl: "https://www.youtube.com/watch?v=yvPaq5JyBPg" },
      { name: "Band Pull Apart (Kéo Giãn Dây Kháng Lực)", reps: "3 hiệp x 15 lần", videoUrl: "https://www.youtube.com/watch?v=n3mLZHh5qOw" }
    ]
  },
  spot2: {
    titleVi: "Sức Mạnh Tổng Thể (General Strength)",
    titleEn: "General Strength",
    subVi: "Xây dựng nền tảng thể lực và sức mạnh cốt lõi:",
    subEn: "If you want easy tools for building strength, start here!",
    exercises: [
      { name: "VMO Squat (Squat Cô Lập Cơ Rộng Trong)", reps: "3 hiệp x 6 lần", videoUrl: "https://www.youtube.com/watch?v=zAmvxveQcHw" },
      { name: "Incline Press (Đẩy Ngực Nghiêng Tăng Cường Thân Trên)", reps: "3 hiệp x 8 lần", videoUrl: "https://www.youtube.com/watch?v=PRFg1O8vtQI" },
      { name: "Pullover (Kéo Tạ Mở Rộng Lồng Ngực & Khớp Vai)", reps: "3 hiệp x 8 lần", videoUrl: "https://www.youtube.com/watch?v=4-ee5oKxrnY" }
    ]
  },
  spot3: {
    titleVi: "Khuỷu Tay (Elbow)",
    titleEn: "Elbow",
    subVi: "Giảm đau gân cơ cánh tay và tăng độ ổn định khuỷu tay:",
    subEn: "Start With These 3 Elbow Health Drills!",
    exercises: [
      { name: "Brachi Curls (Cuốn Tay Brachialis)", reps: "3 hiệp x 6 lần mỗi bên", videoUrl: "https://www.youtube.com/watch?v=thZOqkrRAbo" },
      { name: "Brachi Isometric (Giữ Tĩnh Đẳng Trường)", reps: "2 hiệp x giữ 30 giây mỗi bên", videoUrl: "https://www.youtube.com/watch?v=UPMii4RtfkI" },
      { name: "Kickback (Đá Sau Tăng Cường Gân Cơ Tam Đầu)", reps: "3 hiệp x 8 lần mỗi bên", videoUrl: "https://www.youtube.com/watch?v=Wv68aNZQyB4" }
    ]
  },
  spot4: {
    titleVi: "Thắt Lưng (Lower Back)",
    titleEn: "Lower Back",
    subVi: "Giải phóng chèn ép cột sống thắt lưng và tăng cường cơ mông:",
    subEn: "Start With These 3 Lumbar Recovery Movements!",
    exercises: [
      { name: "Seated Good Morning (Cúi Người Lưng Thẳng Ngồi)", reps: "3 hiệp x 8 lần", videoUrl: "https://www.youtube.com/watch?v=b4Gd3VSdzyg" },
      { name: "Internal Rotations (Xoay Trong Khớp Háng Bảo Vệ Lưng)", reps: "2 hiệp x 30 giây mỗi bên", videoUrl: "https://www.youtube.com/watch?v=KRfTFbeU5iM" },
      { name: "Glute Myofascia Release (Lăn Giải Mạc Cơ Mông)", reps: "60 giây mỗi bên", videoUrl: "https://www.youtube.com/watch?v=NI5KwL5dkAA" }
    ]
  },
  spot5: {
    titleVi: "Cổ Tay & Cẳng Tay (Wrist)",
    titleEn: "Wrist",
    subVi: "Khắc phục hội chứng ống cổ tay, đau mỏi khi đánh máy hoặc tập tạ:",
    subEn: "Start With These 3 Wrist & Grip Drills!",
    exercises: [
      { name: "4 Plane Wrist Circuit (Chuỗi Vận Động Cổ Tay 4 Hướng)", reps: "12 lần mỗi hướng", videoUrl: "https://www.youtube.com/watch?v=UEFX85jM784" },
      { name: "Wrist Rope Flow (Múa Dây Cổ Tay Tăng Tính Linh Hoạt)", reps: "30 vòng xoay mỗi bên", videoUrl: "https://www.youtube.com/watch?v=5u840hSkzf8" },
      { name: "Finger Lengthening (Kéo Dài Giãn Gân Ngón Tay)", reps: "15 giây cho từng ngón", videoUrl: "https://www.youtube.com/watch?v=-_6gr8_fVss" }
    ]
  },
  spot6: {
    titleVi: "Khớp Háng & Khung Chậu (Hip)",
    titleEn: "Hip",
    subVi: "Mở rộng biên độ xoay háng, giảm áp lực thắt lưng và đầu gối:",
    subEn: "Start With These 3 Hip Mobility Exercises!",
    exercises: [
      { name: "90/90 Rotations (Xoay Hông Góc Vuông 90/90)", reps: "2 hiệp x 12 lần mỗi bên", videoUrl: "https://www.youtube.com/watch?v=VSi9x8dzSnU" },
      { name: "Couch Stretch (Giãn Cơ Gấp Hông & Đùi Trước)", reps: "2 hiệp x giữ 30 giây mỗi bên", videoUrl: "https://www.youtube.com/watch?v=D9YimkCIQ6s" },
      { name: "Seated Butterfly (Ngồi Cánh Bướm Mở Rộng Khớp Háng)", reps: "3 hiệp x 12 lần mỗi bên", videoUrl: "https://www.youtube.com/watch?v=7JJTlYdrLl4" }
    ]
  },
  spot7: {
    titleVi: "Khớp Gối (Knee)",
    titleEn: "Knee",
    subVi: "Bảo vệ gân bánh chè, sụn chêm và tái tạo sức mạnh cơ đùi:",
    subEn: "Start With These 3 Knee Bulletproofing Drills!",
    exercises: [
      { name: "Reversing (Đi Lùi Trên Dốc / Máy Chạy)", reps: "3 đến 5 phút", videoUrl: "https://www.youtube.com/watch?v=eHNjINgNJzY" },
      { name: "Tibialis Raise (Nâng Mũi Chân Tăng Cường Cơ Chày Trước)", reps: "3 hiệp x 20 lần", videoUrl: "https://www.youtube.com/watch?v=m08gkeFXqvs" },
      { name: "ATG Split Squat (Squat Một Chân Góc Sâu)", reps: "3 hiệp x 6 lần mỗi bên", videoUrl: "https://www.youtube.com/watch?v=N1GnUR7ezaU" }
    ]
  },
  spot8: {
    titleVi: "Bàn Chân, Cổ Chân & Gân Gót (Foot & Ankle)",
    titleEn: "Foot, Ankle, & Achilles",
    subVi: "Tăng độ vòm bàn chân, chống lật cổ chân và viêm gân gót Achilles:",
    subEn: "Start With These 3 Ankle & Achilles Drills!",
    exercises: [
      { name: "Foot Rolls (Lăn Bóng Gan Bàn Chân)", reps: "30 giây mỗi bên", videoUrl: "https://www.youtube.com/watch?v=UAN7-CrZnDM" },
      { name: "Pronations (Vận Động Sấp Ngửa Cổ Chân)", reps: "2 hiệp x 10 lần mỗi bên", videoUrl: "https://www.youtube.com/watch?v=a974n8T5iTY" },
      { name: "Calf Bridge (Cầu Nhón Bắp Chân Đẳng Trường)", reps: "2 hiệp x giữ 30 giây mỗi bên", videoUrl: "https://www.youtube.com/watch?v=SCPoAEqd87I" }
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

// Helper: Extract YouTube ID
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
  // Clear any existing hotspots
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

// 2. Open Exercise Modal
function openModal(spotId) {
  const data = EXERCISE_DATA[spotId];
  if (!data) return;

  const title = currentLang === 'vi' ? data.titleVi : data.titleEn;
  const sub = currentLang === 'vi' ? data.subVi : data.subEn;
  const t = TRANSLATIONS[currentLang];

  panel.innerHTML = `
    <div class="bm-panel-head">
      <h3>${title}</h3>
      <button type="button" class="bm-close-btn" aria-label="Close" onclick="closeModal()">&times;</button>
    </div>
    <p class="bm-panel-sub">${sub}</p>
    <div class="bm-exercise-list" id="exercise-list"></div>
    <div class="bm-cta">
      <p>${t.take_next_step}</p>
      <a class="bm-cta-btn" href="#apply" onclick="closeModal()">${t.get_coached}</a>
    </div>
  `;

  const listContainer = panel.querySelector('#exercise-list');

  data.exercises.forEach((ex, idx) => {
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
        <p class="bm-reps"><i class="fa-solid fa-arrows-rotate"></i> ${ex.reps}</p>
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

  overlay.classList.add('bm-open');
}

function closeModal() {
  overlay.classList.remove('bm-open');
  panel.innerHTML = '';
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

    // Only create dots for up to 10 indicators for clean UI
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

  // Pause on hover
  const wrapper = document.querySelector('.slider-wrapper');
  wrapper.addEventListener('mouseenter', () => clearInterval(sliderInterval));
  wrapper.addEventListener('mouseleave', startAutoSlide);

  // Touch Swipe
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

  // Re-render Hotspots
  renderHotspots();
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
  renderHotspots();
  initSlider();
});
