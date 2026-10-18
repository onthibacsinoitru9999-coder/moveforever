/**
 * MOVE FOREVER - INTERACTIVE MECHANOTHERAPY & REHABILITATION ENGINE
 * Based on Tendon Continuum Model (Prof. Jill Cook & Dr. Ebonie Rio),
 * Heavy Slow Resistance (HSR - Kongsgaard 2009, Beyer 2015),
 * Spine Sparing Biomechanics (Prof. Stuart McGill),
 * and End-Range Strength / Functional Range Conditioning (ATG & FRC - Spina & Patrick).
 */

// Current Language State ('vi' or 'en')
let currentLang = 'vi';
let activeModalSpot = null;
let activeModalPhase = 'p1'; // 'p1', 'p2', 'p3'

// Comprehensive Translations Dictionary
const TRANSLATIONS = {
  "vi": {
    "nav_map": "Sơ đồ cơ thể",
    "nav_science": "Cơ chế khoa học",
    "nav_reviews": "Kết quả học viên",
    "nav_apply": "Đăng ký tư vấn",
    "btn_consult": "Bắt Đầu Ngay",
    "nav_map_short": "Sơ đồ",
    "nav_calc_short": "Kê đơn",
    "nav_fw_short": "12 Tuần",
    "nav_vid_short": "Video",
    "nav_sci_short": "Cơ chế",
    "pwa_install_title": "Cài Đặt Ứng Dụng Move Forever",
    "pwa_install_desc": "Thêm vào màn hình chính để mở nhanh, tiện dụng như ứng dụng di động!",
    "pwa_btn_install": "Cài Đặt App",
    "btn_install_short": "Cài App",
    "nav_postop": "Sau mổ & Kết xương",
    "nav_postop_short": "Sau mổ",
    "vid_cat_postop": "Sau Mổ & Kết Xương",
    "postop_badge": "PHỤC HỒI SAU MỔ CHẤN THƯƠNG CHỈNH HÌNH & KẾT XƯƠNG",
    "postop_title": "Hệ Thống Phục Hồi Chức Năng Sau Mổ Kết Hợp Xương & Tái Tạo Khớp",
    "postop_sub": "Dựa trên chuẩn AO Foundation và Thuyết Biến Dạng Mô Perren — Lộ trình nạp tải tì đè an toàn, ngăn ngừa biến chứng gãy nẹp vít, cứng khớp và teo cơ sau phẫu thuật.",
    "postop_ao_heading": "Hai Cơ Chế Liền Xương Theo Nguyên Lý Vững Chắc AO (AO Stability Principles)",
    "postop_abs_title": "1. Vững Chắc Tuyệt Đối (Absolute Stability - Strain < 2%)",
    "postop_abs_desc": "Áp dụng trong nẹp ép nén, vít xốp nén (Lag Screw), néo ép số 8 (Tension Band). Liền xương trực tiếp sơ cấp (Primary bone healing) bằng nón bào mòn (cutting cones), không tạo can xơ sụn. Tập vận động sớm biên độ khớp (Early ROM) từ tuần 1 để ngừa dính bao khớp; kiểm soát lực tì đè ép uốn tránh nhổ vít hoặc gãy nẹp.",
    "postop_rel_title": "2. Vững Chắc Tương Đối (Relative Stability - Strain 2–10%)",
    "postop_rel_desc": "Áp dụng trong đinh nội tủy có chốt (IM Nail), nẹp bắc cầu (Bridge Plating), nẹp khóa (LCP) gãy nhiều mảnh. Liền xương gián tiếp thứ cấp (Secondary bone healing) tạo can sụn và can xương cứng ngoài màng xương. Đòi hỏi vi chuyển động cơ học dọc trục (Micromotion 0.2–1.0mm). Nạp tải tì đè dọc trục sớm theo định luật Wolff kích hoạt can xương nhanh và dày chắc.",
    "postop_timeline_heading": "Lộ Trình Tì Đè & Nạp Tải 4 Giai Đoạn Hậu Phẫu (Post-Op Weight-Bearing Timeline)",
    "postop_p1_badge": "Tuần 0 – 2 | Giai Đoạn 1",
    "postop_p1_title": "Bảo Vệ Vết Mổ & Phòng Ngừa Huyết Khối (DVT Prophylaxis)",
    "postop_p1_weight": "Tải trọng: NWB (Không tì đè) hoặc TDWB (Chạm ngón chân < 10% trọng lượng).",
    "postop_p1_rx": "Can thiệp: Bơm mắt cá chân (Ankle Pumps), gồng cơ tĩnh tứ đầu đùi (Quad setting) và mông, kê cao chi giảm phù nề, di động xương bánh chè chống dính.",
    "postop_p2_badge": "Tuần 2 – 6 | Giai Đoạn 2",
    "postop_p2_title": "Tạo Can Sụn Non & Tì Đè Một Phần (Partial Weight-Bearing)",
    "postop_p2_weight": "Tải trọng: PWB 25% – 50% trọng lượng cơ thể với 2 nạng (đi dáng 3 điểm).",
    "postop_p2_rx": "Can thiệp: Di động khớp chủ động có trợ giúp (AAROM), trượt gót (Heel slides), nâng chân thẳng (SLR không lag gối), tập các khớp lân cận không mổ.",
    "postop_p3_badge": "Tuần 6 – 12 | Giai Đoạn 3",
    "postop_p3_title": "Can Xương Cứng & Tì Đè Hoàn Toàn (Full Weight-Bearing)",
    "postop_p3_weight": "Tải trọng: FWB (Bỏ nạng, tì hoàn toàn khi X-quang có cầu can xương bắc qua ổ gãy).",
    "postop_p3_rx": "Can thiệp: Chuỗi động đóng (Mini squat, Leg press nhẹ, Step-ups), đạp xe kháng lực nhẹ, tập thăng bằng bản thể, chỉnh dáng đi đối xứng không tập tễnh.",
    "postop_p4_badge": "Tuần 12 – 24+ | Giai Đoạn 4",
    "postop_p4_title": "Tái Cấu Trúc Xương & Tái Hòa Nhập Vận Động (Wolff's Remodeling)",
    "postop_p4_weight": "Tải trọng: Nạp tải toàn diện theo Định luật Wolff (tăng mật độ khoáng bè xương).",
    "postop_p4_rx": "Can thiệp: Kháng lực nâng tạ tiến tiến, rèn sức mạnh góc tận, bài tập hấp thu xung lực giảm tốc (Deceleration), phục hồi sức mạnh chi mổ đạt LSI >= 90%.",
    "postop_pathways_heading": "Phác Đồ Cho 6 Phẫu Thuật Chấn Thương Chỉnh Hình Kinh Điển",
    "postop_surg1_title": "Mổ Đinh Nội Tủy (IM Nail) Gãy Xương Đùi & Cẳng Chân",
    "postop_surg1_desc": "Ưu điểm chia sẻ tải trọng (Load-sharing). Cho phép tì đè sớm 25-50% từ tuần 2-3 với nạng để kích hoạt can màng xương. Tránh xoay vặn mạnh trước tuần 6.",
    "postop_surg2_title": "Mổ Nẹp Khóa (LCP) Gãy Mâm Chày (Tibial Plateau)",
    "postop_surg2_desc": "Tổn thương sụn khớp nghiêm ngặt. Bắt buộc KHÔNG TÌ ĐÈ (NWB) 6-8 tuần đầu để bảo vệ mặt sụn không bị lún thứ phát. Tập ROM sớm không tải để ngừa cứng khớp.",
    "postop_surg3_title": "Mổ Nẹp Vít Gãy Mắt Cá Chân (Bimalleolar / Trimalleolar Ankle)",
    "postop_surg3_desc": "Bất động nẹp bốt ngắn (CAM boot) 4-6 tuần. Tập sớm gập lưng - gập lòng cổ chân không tải để chống co rút gân gót Achilles. Tì đè tăng dần sau tuần 6 khi X-quang đạt chuẩn.",
    "postop_surg4_title": "Mổ Néo Ép Số 8 Gãy Xương Bánh Chè (Patella Tension Band)",
    "postop_surg4_desc": "Khoá nẹp gối thẳng 0° tuyệt đối khi đi lại để bảo vệ hệ thống duỗi gối. Tập gập gối thụ động có trợ giúp tăng dần: Tuần 0-2 (0-30°), Tuần 2-4 (0-60°), Tuần 4-6 (0-90°).",
    "postop_surg5_title": "Mổ Tái Tạo Dây Chằng Chéo Trước (ACL) & Khâu Sụn Chêm",
    "postop_surg5_desc": "Lấy lại duỗi thẳng 0° ngay ngày 1 sau mổ (chống sẹo Cyclops). Nếu có khâu sụn chêm sừng sau: giới hạn gập gối <= 90° trong 4-6 tuần đầu để bảo vệ mối chỉ khâu.",
    "postop_surg6_title": "Mổ Khâu Chóp Xoay Khớp Vai (Rotator Cuff Repair)",
    "postop_surg6_desc": "Đeo đai túi có gối dạng vai 4-6 tuần. Chỉ tập bài tập con lắc Codman và vận động thụ động (PROM). Nghiêm cấm nâng tay chủ động sớm làm tuột đứt chỉ neo gân.",
    "postop_redflags_heading": "Dấu Hiệu Đèn Đỏ Cảnh Báo Nguy Hiểm Cần Tái Khám Khẩn Cấp",
    "postop_rf1_title": "Dấu Hiệu Nhiễm Trùng Vết Mổ & Viêm Xương (Surgical Site Infection / Osteomyelitis)",
    "postop_rf1_desc": "Sốt cao trên 38°C, vết mổ sưng nóng, tấy đỏ lan rộng, rỉ dịch mủ vàng hoặc bung toác mép chỉ khâu.",
    "postop_rf2_title": "Huyết Khối Tĩnh Mạch Sâu (Deep Vein Thrombosis - DVT)",
    "postop_rf2_desc": "Bắp chân căng tức dữ dội, đau tăng vọt khi bẻ gập mu chân (Homans sign), phù nề to lệch 1 bên chân, tĩnh mạch nông nổi rõ.",
    "postop_rf3_title": "Thất Bại Kết Hợp Xương & Gãy Nẹp Vít (Hardware Failure / Non-Union)",
    "postop_rf3_desc": "Đau chói đột ngột khi tì đè, nghe tiếng 'cục' hoặc lạo xạo ổ gãy, chi bị cong vẹo hoặc ngắn chi bất thường.",
    "postop_rf4_title": "Hội Chứng Đau Cục Bộ Phức Hợp (Complex Regional Pain Syndrome - CRPS / Sudeck)",
    "postop_rf4_desc": "Đau rát bỏng dữ dội vượt xa mức độ tổn thương, da bóng đỏ hoặc tím tái, rối loạn tiết mồ hôi và cứng khớp nhanh.",
    "postop_cta_btn": "Xem Video Hướng Dẫn Bài Tập Sau Mổ & Kết Xương",
    "hero_badge": "BẢN ĐỒ VẬN ĐỘNG & CƠ HỌC TRỊ LIỆU TƯƠNG TÁC",
    "hero_title": "Nhấn Vào Vùng Bạn Đang Gặp Vấn Đề",
    "hero_sub": "Bạn muốn giải phóng tiềm năng tiềm ẩn của cơ thể? Chọn vùng tổn thương để khám phá phác đồ phục hồi 3 giai đoạn dựa trên khoa học cơ học trị liệu!",
    "hero_hint": "Chạm vào điểm phát sáng trên cơ thể để xem phác đồ Isometric, HSR & Vận động góc tận",
    "sci_badge": "KHOA HỌC ĐIỀU TRỊ BẢO TỒN KHÔNG MỔ",
    "sci_title": "Cơ Học Trị Liệu (Mechanotherapy) & Mô Hình Tendon Continuum",
    "sci_sub": "Dựa trên công trình nền tảng của GS. Jill Cook & TS. Ebonie Rio kết hợp với nguyên lý sức mạnh góc tận ATG & FRC — Cơ chế tái tạo gân khớp bằng tải trọng cơ học chính xác thay vì phẫu thuật hay nghỉ ngơi thụ động.",
    "cont_stage1_title": "Tendon Reactive (Viêm Phản Ứng Cấp)",
    "cont_stage1_trigger": "Nguyên nhân: Tăng khối lượng hoặc cường độ tải trọng quá đột ngột.",
    "cont_stage1_desc": "Tế bào gân phản ứng bảo vệ bằng cách tăng sinh proteoglycan ngậm nước, làm gân dày lên cục bộ và sưng đau, nhưng chưa có đứt gãy cấu trúc collagen.",
    "cont_stage1_rx": "Chiến lược: Isometric Loading (Gồng Tĩnh)",
    "cont_stage1_note": "Tuyệt đối tránh kéo giãn ma sát; gồng tĩnh 45s giúp giảm đau tức thì qua cơ chế ức chế vỏ não.",
    "cont_stage1_title_d": "Tendon Dysrepair (Suy Thoái Cấu Trúc)",
    "cont_stage2_trigger": "Nguyên nhân: Tiếp tục nạp tải quá mức khi gân chưa kịp hồi phục.",
    "cont_stage2_desc": "Các tế bào gân bị biến đổi hình thái, chất nền ngoại bào phân tách các bó sợi collagen, bắt đầu xuất hiện tân mạch bệnh lý và thoái hóa nhẹ.",
    "cont_stage2_rx": "Chiến lược: Heavy Slow Resistance (HSR)",
    "cont_stage2_note": "Kháng lực nặng nhịp chậm (3s-1s-3s) kích hoạt mechanotransduction tổng hợp Collagen Type I.",
    "cont_stage3_title": "Degenerative Tendon (Thoái Hóa Mãn Tính)",
    "cont_stage3_trigger": "Nguyên nhân: Quá trình viêm và quá tải vi thể kéo dài nhiều tháng đến nhiều năm.",
    "cont_stage3_desc": "Xuất hiện các vùng tế bào chết vô mạch xen lẫn mô xơ. Triệu chứng kinh điển là cứng khớp buổi sáng và đau dai dẳng sau vận động.",
    "cont_stage3_rx": "Chiến lược: 'Treat the Donut, Not the Hole'",
    "cont_stage3_note": "GS. Jill Cook: Tập trung làm khỏe vùng gân lành xung quanh để bù đắp hoàn toàn cho vùng tổn thương.",
    "proto_main_title": "Lộ Trình Tải Trọng 4 Giai Đoạn Tái Sinh Gân Khớp",
    "proto_p1_badge": "Cấp Độ 1: Giai Đoạn Cấp",
    "proto_p1_title": "1. Isometric Loading (Gồng Tĩnh Giảm Đau)",
    "proto_p1_desc": "Thực hiện gồng cơ giữ nguyên góc khớp (45-60 giây x 4-5 hiệp, tải 70% MVC). Kích hoạt cơ chế Cortical Inhibition Relief giúp ức chế tín hiệu đau lên não bộ trong 45-60 phút mà không gây kích ứng ma sát lên gân hay sụn.",
    "proto_p2_badge": "Cấp Độ 2: Tái Tạo Cấu Trúc",
    "proto_p2_title": "2. Isotonic Heavy Slow Resistance (Kháng Lực Nặng, Chậm)",
    "proto_p2_desc": "Tập kháng lực với nhịp điệu (Tempo) nghiêm ngặt: 3 giây co - 1 giây dừng - 3 giây duỗi. Chuyển hóa lực cơ học (Mechanotransduction) gửi tín hiệu kích thích nguyên bào gân xếp lại sợi Collagen Type I song song và bền chắc.",
    "proto_p3_badge": "Cấp Độ 3: Tích Trữ Đàn Hồi",
    "proto_p3_title": "3. Energy Storage & Plyometrics (Tích Trữ & Giải Phóng Năng Lượng)",
    "proto_p3_desc": "Huấn luyện gân hoạt động như một chiếc lò xo sinh học (biological spring). Tái tạo khả năng hấp thu xung lực khi chạy, nhảy, đổi hướng mà không làm bùng phát cơn đau tái phát.",
    "proto_p4_badge": "Cấp Độ 4: Sức Mạnh Góc Tận",
    "proto_p4_title": "4. End-Range Capacity & Re-Integration (ATG & FRC Mobility)",
    "proto_p4_desc": "Kéo giãn có tải ở biên độ cực hạn (Loaded Stretching) theo trường phái ATG (Ben Patrick) và kiểm soát thần kinh cơ FRC (Dr. Andreo Spina). Khớp chịu lực vững chắc ở mọi góc độ, loại bỏ nỗi sợ chấn thương suốt đời.",
    "comp_rest_title": "Sai Lầm: Nghỉ Ngơi Tuyệt Đối & Tiêm Corticoid",
    "comp_r1": "Nghỉ hoàn toàn khiến gân bị teo cơ học (Tendon Stress Deprivation), giảm mật độ mao mạch và thoái hóa nhanh hơn.",
    "comp_r2": "Tiêm Corticoid chỉ cắt đứt tín hiệu đau tạm thời nhưng làm ức chế tổng hợp collagen, tăng nguy cơ đứt gân tự phát gấp 4-6 lần.",
    "comp_r3": "Cơ bắp suy giảm sức chịu tải khiến cơn đau tái phát nặng hơn ngay khi người bệnh hoạt động trở lại.",
    "comp_load_title": "Giải Pháp Chuẩn Y Khoa: Tải Trọng Tối Ưu (Optimal Loading)",
    "comp_l1": "Tải trọng cơ học có kiểm soát là kích thích DUY NHẤT giúp tế bào gân (Tenocytes) tái tạo Collagen Type I.",
    "comp_l2": "Bài tập gồng tĩnh (Isometric) giúp giảm đau tức thì bằng ức chế thần kinh trung ương, an toàn tuyệt đối.",
    "comp_l3": "Xây dựng 'áo giáp cơ bắp' bảo vệ sụn khớp dài hạn, giúp người bệnh hồi phục hoàn toàn không cần phẫu thuật.",
    "reviews_title": "Bạn Đã Sẵn Sàng Khai Phá Tiềm Năng Cơ Thể?",
    "reviews_sub": "Hàng trăm học viên đã chiến thắng cơn đau mãn tính, hồi phục chuyển động và lấy lại sự tự tin.",
    "form_heading": "Đăng Ký Huấn Luyện Cùng Huấn Luyện Viên",
    "form_criteria_desc": "Trước khi tiếp tục, vui lòng xác nhận bạn đáp ứng các tiêu chí dưới đây để đảm bảo kết quả tốt nhất.",
    "crit_1": "Bạn đang thực sự nghiêm túc cân nhắc việc được huấn luyện và đồng hành phục hồi.",
    "crit_2": "Bạn sẵn sàng đầu tư tài chính xứng đáng cho sức khỏe và thể chất lâu dài của mình.",
    "crit_3": "Bạn quyết tâm tạo ra sự thay đổi bền vững suốt đời thay vì giải pháp tạm thời nhất thời.",
    "crit_confirm": "Vâng, tôi xác nhận đây chính xác là những gì tôi đang tìm kiếm.",
    "lbl_name": "Họ và tên",
    "lbl_email": "Địa chỉ Email",
    "lbl_dob": "Ngày tháng năm sinh",
    "lbl_source": "Bạn biết đến chương trình qua đâu?",
    "opt_select": "Chọn nguồn giới thiệu...",
    "opt_other": "Khác",
    "lbl_tendon_phase": "Tính chất cơn đau của bạn phản ánh giai đoạn nào dưới đây?",
    "opt_select_stage": "Chọn tính chất cơn đau của bạn...",
    "opt_stage_reactive": "1. Đau nhói, buốt cấp sau khi tăng tải đột ngột (Giai đoạn Phản ứng - Reactive)",
    "opt_stage_dysrepair": "2. Đau âm ỉ nhiều tuần, cứng gân/khớp vào buổi sáng khi ngủ dậy (Giai đoạn Suy thoái cấu trúc)",
    "opt_stage_degenerative": "3. Đau dai dẳng nhiều năm, chụp MRI có hình ảnh thoái hóa/rách bán phần (Thoái hóa mãn tính)",
    "opt_stage_spine": "4. Đau mỏi thắt lưng/cột sống, tê lan chân hoặc tay khi ngồi lâu/cúi người",
    "lbl_goal": "Bạn mong muốn đạt được điều gì nhất? (Càng chi tiết càng tốt)",
    "lbl_obstacle": "Điều gì đang CẢN TRỞ bạn đạt được mục tiêu đó?",
    "lbl_history": "Tiền sử chấn thương chi tiết (ghi rõ bên Trái / Phải)",
    "lbl_triggers": "Tình huống cụ thể nào khiến bạn bị đau hoặc cứng khớp?",
    "lbl_treatment": "Hiện bạn có đang điều trị, vật lý trị liệu hay tập với ai khác không?",
    "lbl_failed": "Nếu các phương pháp trước đây không hiệu quả, bạn nghĩ nguyên nhân là gì?",
    "lbl_pain_scale": "Mức độ đau vào những ngày tệ nhất (1 = Rất nhẹ, 10 = Cực kỳ nghiêm trọng)",
    "lbl_confidence_scale": "Độ tin tưởng vào khả năng phục hồi của cơ thể bạn (1-10)",
    "lbl_activity": "Một tuần sinh hoạt và vận động tiêu biểu của bạn trông như thế nào?",
    "lbl_vision": "Hãy tưởng tượng 6 tháng tới khi bạn đạt được tiến bộ mong muốn. Cuộc sống của bạn sẽ như thế nào?",
    "lbl_impact": "Điều này mang lại tác động tích cực gì cho sức khỏe, tinh thần và các mối quan hệ của bạn?",
    "lbl_challenge": "Kể về một lần bạn đã vượt qua nhiều thử thách để đạt được mục tiêu lớn trong đời:",
    "lbl_location": "Nếu được huấn luyện, bạn muốn tập tại phòng Gym hay ở Nhà?",
    "opt_gym": "Phòng tập Gym",
    "opt_home": "Tại nhà (Home workout)",
    "opt_both": "Kết hợp cả hai",
    "lbl_notes": "Có điều gì khác bạn muốn Huấn Luyện Viên biết thêm không?",
    "btn_submit": "Gửi Hồ Sơ Đăng Ký Tư Vấn",
    "modal_success_title": "Đã Gửi Hồ Sơ Thành Công!",
    "modal_success_desc": "Cảm ơn bạn đã tin tưởng. Chúng tôi đã nhận được thông tin chi tiết và sẽ liên hệ qua Email / Zalo trong vòng 24 giờ để xếp lịch trao đổi 1-1.",
    "modal_close_btn": "Đóng",
    "footer_tagline": "Loại bỏ nỗi thất vọng vì chấn thương bằng phương pháp huấn luyện vận động và phục hồi đã được kiểm chứng qua thực tiễn.",
    "footer_quick_links": "Liên Kết Nhanh",
    "footer_contact": "Liên Hệ",
    "take_next_step": "Sẵn Sàng Bước Vào Phác Đồ 1-1?",
    "get_coached": "Đăng Ký Tư Vấn Chuyên Sâu →",
    "tab_p1": "⚡ GĐ 1: Gồng Tĩnh (Isometric)",
    "tab_p2": "🧱 GĐ 2: Kháng Lực Chậm (HSR)",
    "tab_p3": "🚀 GĐ 3: Góc Tận & Đàn Hồi (ATG/FRC)",
    "calc_badge": "CÔNG CỤ ĐÁNH GIÁ TẢI TRỌNG LÂM SÀNG",
    "calc_title": "Máy Tính Tải Trọng Gân & Kê Đơn Phục Hồi Cá Nhân Hóa",
    "calc_sub": "Dựa trên thuật toán phân loại mô hình Tendon Continuum của GS. Jill Cook & TS. Ebonie Rio. Nhập các thông số lâm sàng để xác định chính xác giai đoạn tổn thương gân và nhận phác đồ nạp tải khởi đầu an toàn.",
    "calc_zone_lbl": "1. Vị trí gân khớp tổn thương:",
    "calc_onset_lbl": "2. Thời gian khởi phát triệu chứng (Chronicity):",
    "calc_stiff_lbl": "3. Thời gian cứng khớp vào buổi sáng khi ngủ dậy:",
    "calc_act_lbl": "4. Hoạt động vận động thường nhật nặng nhất:",
    "calc_vas_lbl": "5. Mức độ đau cao nhất gần đây (Thang đo VAS 0 - 10):",
    "calc_latency_lbl": "6. Tính chất đáp ứng đau theo tải trọng (Load Latency):",
    "calc_btn_compute": "Tính Toán Phác Đồ Tải Trọng Ngay",
    "calc_res_stage": "Giai Đoạn Mô Hình Tendon Continuum",
    "calc_res_phase": "Giai Đoạn Khởi Đầu Khuyến Nghị",
    "calc_res_intensity": "Cường Độ Tải Trọng Khởi Đầu",
    "calc_res_dosage": "Liều Lượng & Số Lần Giữ",
    "calc_res_frequency": "Tần Suất Tập Luyện Hàng Tuần",
    "calc_res_pain_rule": "Quy Tắc Giám Sát Đau 24 Giờ (24h Pain Rule)",
    "calc_res_morning_test": "Nghiệm Pháp Tự Kiểm Tra Buổi Sáng",
    "calc_res_gate": "Tiêu Chí Đạt Chuẩn Để Tiến Triển Sang Giai Đoạn Sau",
    "nav_calculator": "Máy tính tải gân",
    "nav_library": "Thư viện video",
    "nav_framework": "Lộ trình 12 tuần",
    "drawer_menu_title": "Danh Mục Điều Hướng",
    "drawer_close_aria": "Đóng menu điều hướng",
    "drawer_open_aria": "Mở menu điều hướng",
    "lang_toggle_title": "Chuyển đổi ngôn ngữ / Switch Language",
    "lang_switch_hint": "Chuyển sang Tiếng Anh",
    "privacy_guarantee": "100% Bảo mật dữ liệu người dùng",
    "all_rights_reserved": "Bảo lưu mọi quyền.",
    "btn_close_modal": "Đóng cửa sổ",
    "modal_clinical_pearl_label": "Cơ Chế Y Khoa & Điểm Mấu Chốt Lâm Sàng",
    "mech_transduction_title": "Sự Chuyển Đổi Cơ Học Tế Bào (Mechanotransduction)",
    "mech_transduction_desc": "Quá trình sinh học mà qua đó tế bào gân (tenocytes) chuyển đổi tín hiệu lực kéo cơ học thành các tín hiệu sinh hóa nội bào, thúc đẩy biểu hiện gen và tổng hợp Collagen loại I bền chắc.",
    "cortical_inhibition_title": "Sự Ức Chế Vỏ Não Vận Động (Cortical Inhibition Relief)",
    "cortical_inhibition_desc": "Nghiên cứu TMS của TS. Ebonie Rio chứng minh rằng co cơ đẳng trường 70% MVC làm giảm ức chế vỏ não vận động và giảm đau trung ương kéo dài từ 45 đến 60 phút.",
    "donut_principle_title": "Nguyên Lý 'Huấn Luyện Phần Bánh, Không Ép Cái Lỗ' (Treat the Doughnut)",
    "donut_principle_desc": "Nghiên cứu UTC của GS. Jill Cook & Sean Docking chứng minh gân bệnh lý vẫn bảo tồn khối lượng lớn sợi collagen lành bao quanh. Tập trung nạp tải tăng sinh phần gân lành thay vì cố tác động vào vùng hoại tử vô mạch.",
    "hsr_tempo_title": "Kháng Lực Nặng Nhịp Chậm (HSR - Heavy Slow Resistance)",
    "hsr_tempo_desc": "Phác đồ kinh điển của Kongsgaard và Beyer: 3 giây hạ (eccentric) - 1 giây dừng - 3 giây nâng (concentric). Tổng thời gian chịu sức căng (TUT) 7 giây mỗi lần lặp tạo kích thích tối đa tái cấu trúc ma trận sợi.",
    "ssc_elastic_title": "Chu Kỳ Kéo Giãn - Co Ngắn & Lò Xo Sinh Học (Stretch-Shortening Cycle)",
    "ssc_elastic_desc": "Khả năng gân hấp thu xung lực đàn hồi như lò xo cơ học khi tiếp đất và giải phóng tức thì khi đẩy người. Khôi phục tốc độ phát triển lực (RFD) an toàn ở giai đoạn 3.",
    "mcgill_big3_title": "Bộ Ba Bài Tập Làm Vững Cột Sống McGill (The McGill Big 3)",
    "mcgill_big3_desc": "Gồm Modified Curl-Up, Side Bridge và Bird-Dog được GS. Stuart McGill thiết kế nhằm kích hoạt tối đa độ cứng vững cơ thân mình với áp lực cắt nén đĩa đệm thấp nhất.",
    "spine_stiffness_title": "Độ Cứng Vững Cột Sống vs Độ Linh Hoạt Khớp Háng",
    "spine_stiffness_desc": "Cột sống thắt lưng được thiết kế để truyền lực ổn định ('dây chằng neo 3D'), trong khi khớp háng cầu xoay cần linh hoạt tối đa. Tách rời chuyển động háng - lưng giúp bảo vệ đĩa đệm suốt đời.",
    "frc_cars_title": "Xoay Khớp Có Kiểm Soát (Controlled Articular Rotations - CARs)",
    "frc_cars_desc": "Hệ thống FRC của TS. Andreo Spina: Xoay tròn khớp chủ động ở biên độ cực hạn để kích hoạt thụ thể cơ học, nuôi dưỡng sụn và mở rộng không gian vận động khả dụng.",
    "frc_pails_rails_title": "Gồng Tĩnh Đẳng Cự Góc Tăng / Giảm Tiến (PAILs / RAILs)",
    "frc_pails_rails_desc": "Tạo lực co cơ đẳng trường cực đại tại góc tận cùng của khớp nhằm tái lập trình hệ thần kinh trung ương, biến độ dẻo thụ động thành sức mạnh chủ động bền vững.",
    "pain_latency_title": "Quy Tắc Độ Trễ Đau 24 Giờ & Ngưỡng VAS ≤ 3/10",
    "pain_latency_desc": "Mô gân phản ứng chậm với tải trọng: Cơn đau do quá tải thường xuất hiện sau 18–24 giờ. Đau trong lúc tập chấp nhận ≤ 3/10 nhưng bắt buộc phải trở về trạng thái bình thường sau 24 giờ.",
    "morning_stiffness_def": "Cứng Gân Sáng Sớm: Thời gian cảm thấy căng cứng hoặc khập khiễng khi bước những bước đầu tiên rời khỏi giường sau khi thức dậy.",
    "warmup_phenom_def": "Hiện Tượng Làm Nóng (Warm-up Phenomenon): Triệu chứng đau giảm rõ rệt khi cơ thể ấm dần lúc bắt đầu vận động, nhưng tái phát hoặc trở nên tồi tệ hơn sau 24 giờ.",
    "stress_deprivation_title": "Dị Hóa Do Thiếu Tải Trọng Cơ Học (Stress-Deprivation Catabolism)",
    "stress_deprivation_desc": "Khi gân bị bất động hoặc nghỉ ngơi hoàn toàn (độ căng biến dạng < 4%), enzyme metalloproteinase (MMP-1, MMP-13) tăng đột biến gây phân hủy chất nền và teo gân nghiêm trọng.",
    "collagen_synthesis_title": "Đỉnh Tổng Hợp Collagen Type I Sau 24–72 Giờ",
    "collagen_synthesis_desc": "Sau buổi nạp tải nặng, tổng hợp Collagen loại I đạt đỉnh sau 24-72 giờ. Cân bằng collagen ròng chuyển sang dương tính sau 36-48 giờ. Do đó phác đồ HSR bắt buộc phải tập cách ngày (3 buổi/tuần).",
    "fw_badge": "LỘ TRÌNH PHỤC HỒI 12 TUẦN CHUẨN Y HỌC THỂ THAO",
    "fw_title": "Hệ Thống Nạp Tải Chu Kỳ Hóa 12 Tuần Tái Tạo Gân Khớp",
    "fw_sub": "Phân chia 3 giai đoạn sinh học chặt chẽ: Tuần 1-4 (Gồng tĩnh giảm đau), Tuần 5-8 (Tái tạo collagen HSR), Tuần 9-12 (Năng lượng đàn hồi & Biên độ cực hạn).",
    "fw_card_p1_badge": "Tuần 1 – 4 | Giai Đoạn 1",
    "fw_card_p1_title": "Gồng Tĩnh Giảm Đau Cấp & Ức Chế Vỏ Não (Isometric Analgesia)",
    "fw_card_p1_desc": "Mục tiêu: Cắt đứt vòng xoắn ức chế vận động vỏ não, tái phân bố dịch phù nề trong bao gân, triệt tiêu đau nhói mà không gây kích ứng ma sát hay tải nén góc tận.",
    "fw_card_p1_dosage": "Liều lượng: 5 hiệp x 45 giây gồng tĩnh đẳng cự (Cường độ ~70% MVC).",
    "fw_card_p1_freq": "Tần suất: Hằng ngày (1–2 lần/ngày, cách nhau tối thiểu 6 giờ).",
    "fw_card_p1_rest": "Nghỉ giữa hiệp: 2 phút nghỉ thụ động (phục hồi phosphocreatine và thần kinh).",
    "fw_card_p1_gate": "Tiêu chí vượt cấp: Đau khi sinh hoạt thường ngày VAS ≤ 2/10 trong 5 ngày liên tục.",
    "fw_card_p2_badge": "Tuần 5 – 8 | Giai Đoạn 2",
    "fw_card_p2_title": "Kháng Lực Nặng Nhịp Chậm (HSR) & Tái Cấu Trúc Collagen Type I",
    "fw_card_p2_desc": "Mục tiêu: Đặt lực căng biến dạng 4-8% lên các bó sợi lành lặn, kích hoạt tế bào tenocyte tổng hợp collagen loại I song song và gia tăng độ dày tiết diện gân.",
    "fw_card_p2_dosage": "Liều lượng: 3–4 hiệp với nhịp 3-1-3 (3s hạ - 1s giữ - 3s nâng). Tuần 5 (15RM) -> Tuần 6 (12RM) -> Tuần 7 (10RM) -> Tuần 8 (8RM).",
    "fw_card_p2_freq": "Tần suất: 3 buổi/tuần cách ngày (Thứ 2 - 4 - 6 hoặc Thứ 3 - 5 - 7; nghỉ 48h giữa các buổi).",
    "fw_card_p2_rest": "Nghỉ giữa hiệp: 2 đến 3 phút giữa các hiệp nặng.",
    "fw_card_p2_gate": "Tiêu chí vượt cấp: Hoàn thành 4 hiệp x 8RM với nhịp chuẩn, kiểm tra tải sáng hôm sau VAS ≤ 3/10.",
    "fw_card_p3_badge": "Tuần 9 – 12 | Giai Đoạn 3",
    "fw_card_p3_title": "Năng Lượng Đàn Hồi (SSC) & Sức Mạnh Góc Tận (ATG/FRC)",
    "fw_card_p3_desc": "Mục tiêu: Huấn luyện gân hấp thu và giải phóng xung lực nhanh (SSC Plyometrics), đồng thời củng cố độ vững ở biên độ cực hạn theo trường phái ATG & FRC.",
    "fw_card_p3_dosage": "Liều lượng: 3–4 hiệp bài tập tăng lượng (Pogo hops, Drop landings) kết hợp Split Squat góc sâu và PAILs/RAILs.",
    "fw_card_p3_freq": "Tần suất: 2–3 buổi/tuần (nghỉ 48–72h giữa các buổi tập bật nhảy va đập cao).",
    "fw_card_p3_rest": "Nghỉ giữa hiệp: 2–3 phút giữa các chuỗi plyometric và bài nạp tải góc tận.",
    "fw_card_p3_gate": "Tiêu chuẩn tốt nghiệp: Trở lại thi đấu thể thao hoặc vận động cường độ cao hoàn toàn không đau.",
    "calc_lbl_zone": "1. Vị trí khớp / gân đang gặp vấn đề:",
    "calc_opt_zone_select": "Chọn vùng tổn thương...",
    "calc_opt_shoulder": "Khớp vai & Chóp xoay (Rotator Cuff)",
    "calc_opt_core": "Cột sống & Sức mạnh thân mình (Core & Spine)",
    "calc_opt_elbow": "Khuỷu tay (Tennis / Golfer's Elbow)",
    "calc_opt_lower_back": "Cột sống thắt lưng & Đĩa đệm (Lower Back)",
    "calc_opt_wrist": "Cổ tay & Ngón tay (de Quervain / Carpal)",
    "calc_opt_hip": "Khớp háng, Gân cơ mông & Gân kheo (Hip & Gluteal)",
    "calc_opt_knee": "Khớp gối & Gân bánh chè (Patellar / Jumper's Knee)",
    "calc_opt_foot": "Cổ chân, Gân gót Achilles & Gan bàn chân",
    "calc_lbl_chronicity": "2. Thời gian khởi phát triệu chứng (Độ kéo dài):",
    "calc_opt_chronicity_select": "Chọn khoảng thời gian khởi phát...",
    "calc_opt_acute": "Cấp tính (< 2-6 tuần): Bùng phát đột ngột sau tăng tải",
    "calc_opt_subacute": "Bán cấp (6-12 tuần): Đau âm ỉ tích tụ, chưa lành hẳn",
    "calc_opt_chronic": "Mạn tính (> 12 tuần / nhiều tháng): Tái phát dai dẳng",
    "calc_lbl_stiffness": "3. Mức độ cứng gân / khớp vào buổi sáng khi ngủ dậy:",
    "calc_opt_stiffness_select": "Chọn thời gian cứng khớp buổi sáng...",
    "calc_opt_stiff_none": "Không có hoặc thoáng qua (< 10-15 phút)",
    "calc_opt_stiff_mod": "Vừa phải (15-30 phút): Cần vận động nhẹ mới bớt đơ",
    "calc_opt_stiff_sev": "Nghiêm trọng (> 30-60 phút): Cứng đơ kéo dài, khó chịu sâu",
    "calc_lbl_activity": "4. Mức độ hoạt động / Tải trọng gây đau nhiều nhất:",
    "calc_opt_act_select": "Chọn tính chất tải trọng kích phát...",
    "calc_opt_act_sedentary": "Sinh hoạt thường ngày (Đi bộ, đứng lâu, lên xuống bậc thang)",
    "calc_opt_act_mod": "Thể thao phong trào (Chạy bộ nhẹ, thể dục nhịp điệu, yoga)",
    "calc_opt_act_jump": "Tải đàn hồi cao (Bật nhảy, tiếp đất, chạy tốc độ cao, đá bóng)",
    "calc_opt_act_lift": "Tải kháng lực nặng (Nâng tạ nặng, squat sâu, khiêng vác)",
    "calc_lbl_vas": "5. Điểm đau khi thực hiện động tác kích phát (Thang VAS 0 - 10):",
    "calc_vas_hint": "Kéo thanh trượt để chọn mức độ đau hiện tại của bạn",
    "calc_vas_mild": "VAS 1-3: Trong ngưỡng dung nạp an toàn",
    "calc_vas_mod": "VAS 4-6: Ngưỡng kích ứng quá tải cảnh báo",
    "calc_vas_sev": "VAS 7-10: Quá tải nghiêm trọng, đau buốt cấp",
    "calc_lbl_latency": "6. Đặc điểm phản ứng đau và hiện tượng làm nóng (Warm-Up):",
    "calc_opt_lat_select": "Chọn đáp ứng đau của bạn...",
    "calc_opt_lat_warmup": "Có hiện tượng làm nóng: Đau dịu khi tập nhẹ, nhưng bùng phát sau 24h",
    "calc_opt_lat_immediate": "Đau tăng dồn dập ngay trong buổi tập khi gắng sức",
    "calc_opt_lat_constant": "Đau nhức liên tục cả ngày lẫn đêm, không thay đổi theo vận động",
    "calc_btn_run": "Phân Tích & Kê Đơn Tải Trọng Y Khoa",
    "calc_btn_reset": "Đánh Giá Lại Từ Đầu",
    "calc_err_missing": "Vui lòng chọn đầy đủ các thông tin để tính toán phác đồ chính xác.",
    "calc_res_badge": "KẾT QUẢ KÊ ĐƠN TẢI TRỌNG CƠ HỌC",
    "calc_res_title": "Phác Đồ Phục Hồi Lâm Sàng Được Cá Nhân Hóa",
    "calc_res_stage_lbl": "Giai Đoạn Bệnh Lý Gân:",
    "calc_res_phase_lbl": "Giai Đoạn Khởi Đầu Khuyến Nghị:",
    "calc_res_intensity_lbl": "Cường Độ Tải Khởi Đầu:",
    "calc_res_dosage_lbl": "Liều Lượng & Số Hiệp (Volume):",
    "calc_res_tempo_lbl": "Nhịp Co Cơ (Tempo):",
    "calc_res_freq_lbl": "Tần Suất Tập Luyện:",
    "calc_res_rest_lbl": "Khoảng Nghỉ Giữa Hiệp:",
    "calc_res_pain_rule_lbl": "Quy Tắc Theo Dõi Đau 24 Giờ:",
    "calc_res_pain_rule_detail": "Đau trong lúc tập ≤ 3/10 được chấp nhận; triệu chứng BẮT BUỘC phải trở về mức nền sau 24 giờ. Nếu sáng hôm sau đau tăng vọt, lập tức hạ tải 30–50% và gồng tĩnh 48 giờ.",
    "calc_res_morning_test_lbl": "Nghiệm Pháp Nạp Tải Buổi Sáng (Gatekeeper Test):",
    "calc_res_progression_lbl": "Tiêu Chuẩn Chuyển Giai Đoạn:",
    "calc_res_contraindication_lbl": "Góc Khớp Kẹp Nén Chống Chỉ Định:",
    "calc_res_primary_ex_lbl": "Bài Tập Khởi Đầu Trọng Tâm:",
    "calc_res_regression_lbl": "Bài Tập Hạ Tải (Khi Đau Tăng):",
    "calc_res_progression_step_lbl": "Bài Tập Nâng Tải (Khi Dung Nạp Tốt):",
    "calc_res_cta_text": "Bạn cần video hướng dẫn kỹ thuật chi tiết từng bài tập trên?",
    "calc_res_cta_btn": "Xem Thư Viện Video Bài Tập →",
    "stage_reactive_name": "Bệnh Lý Gân Phản Ứng Cấp Tính (Reactive Tendinopathy)",
    "stage_reactive_mechanism": "Phản ứng tăng sinh ngậm nước cấp tính do tăng tải đột ngột. Cấu trúc bó sợi collagen vẫn toàn vẹn. Cần hạ tải khẩn cấp và áp dụng gồng tĩnh 70% MVC để giảm đau thần kinh.",
    "stage_dysrepair_name": "Gân Suy Thoái Cấu Trúc Vi Thể (Tendon Dysrepair)",
    "stage_dysrepair_mechanism": "Tổn thương vi cấu trúc ma trận do quá tải kéo dài. Tăng sinh tân mạch bệnh lý và phân tách bó sợi. Áp dụng HSR nhịp 3-1-3 để thúc đẩy tổng hợp collagen loại I.",
    "stage_degenerative_name": "Thoái Hóa Gân Mạn Tính Ổn Định (Degenerative Tendinopathy)",
    "stage_degenerative_mechanism": "Mạn tính nhiều tháng hoặc năm, có vùng tế bào chết vô mạch. Thực hiện nguyên lý 'Treat the Doughnut': Nạp tải HSR để làm dày phần gân lành xung quanh bù đắp hoàn toàn cho vùng tổn thương.",
    "stage_reactive_on_deg_name": "Đợt Cấp Bùng Phát Trên Nền Gân Thoái Hóa (Reactive-on-Degenerative Flare)",
    "stage_reactive_on_deg_mechanism": "Phần gân lành bao quanh vùng thoái hóa bị quá tải đột ngột và phát triển đợt viêm phản ứng cấp. Cần hạ tải về Giai đoạn 1 gồng tĩnh từ 7 đến 14 ngày trước khi quay lại HSR.",
    "morning_test_shoulder": "Gồng tĩnh xoay ngoài khớp vai tựa tường tại góc dạng 30 độ (giữ 30 giây)",
    "morning_test_core": "Bài tập McGill Curl-Up giữ 1 lần 8 giây chuẩn tư thế",
    "morning_test_elbow": "Gồng tĩnh duỗi cổ tay có tạ đơn 2kg (cẳng tay đặt trên bàn)",
    "morning_test_lower_back": "Cầu mông nằm ngửa gồng tĩnh 30 giây cột sống trung tính",
    "morning_test_wrist": "Gồng tĩnh nghiêng xương quay với thanh đòn nhẹ",
    "morning_test_hip": "Đứng một chân giữ thăng bằng 30 giây khung chậu cân bằng",
    "morning_test_knee": "Squat một chân trên ván nghiêng 25 độ xuống góc gập gối 60 độ",
    "morning_test_foot": "Nhón nâng gót chân một bên lên hết biên độ trên mặt sàn phẳng",
    "vid_badge": "THƯ VIỆN VIDEO PHỤC HỒI & PHẪU THUẬT NGOẠI KHOA",
    "vid_title": "Thư Viện Bài Tập Chuẩn Hóa & Giải Phẫu Ngoại Khoa",
    "vid_sub": "Mỗi chuyển động đều có phân tích cơ sở sinh học, khẩu lệnh chuyển động chuẩn, cảnh báo lỗi thường gặp và liên hệ giải phẫu bệnh học ngoại khoa.",
    "vid_search_ph": "Tìm bài tập (ví dụ: Spanish squat, calf raise, McGill, split squat)...",
    "vid_filter_zone_all": "Tất cả vùng cơ thể",
    "vid_filter_phase_all": "Tất cả giai đoạn",
    "vid_cat_all": "Tất Cả Video",
    "vid_cat_p1": "GĐ 1: Gồng Tĩnh (Isometric)",
    "vid_cat_p2": "GĐ 2: Kháng Lực Chậm (HSR)",
    "vid_cat_p3": "GĐ 3: Đàn Hồi & Góc Tận",
    "vid_cat_surgical": "Giải Phẫu Ngoại Khoa",
    "vid_lbl_rationale": "Cơ Chế Y Khoa & Sinh Học Mô:",
    "vid_lbl_cues": "Khẩu Lệnh Kỹ Thuật Chuẩn:",
    "vid_lbl_errors": "Lỗi Thường Gặp & Cách Sửa:",
    "vid_lbl_regression": "Bài Tập Hạ Tải (Thoái lui):",
    "vid_lbl_progression": "Bài Tập Nâng Tải (Tiến tiến):",
    "vid_lbl_surgical": "Đối Chiếu Ngoại Khoa & Giải Phẫu Bệnh:",
    "vid_lbl_tempo": "Nhịp Co Cơ (Tempo):",
    "vid_lbl_equipment": "Dụng Cụ Yêu Cầu:",
    "vid_lbl_hold_reps": "Liều Lượng Tập Luyện:",
    "vid_btn_watch": "Xem Video Hướng Dẫn",
    "vid_btn_close": "Đóng Trình Chiếu",
    "vid_empty_results": "Không tìm thấy bài tập phù hợp với bộ lọc đã chọn.",
    "zone_spot1_title": "Khớp Vai & Chóp Xoay (Rotator Cuff)",
    "zone_spot1_pearl": "Gân cơ trên gai (Supraspinatus) dễ bị kẹp nén dưới mỏm cùng vai. Bài tập gồng tĩnh xoay ngoài (Isometric) giúp ức chế vỏ não vận động và giảm đau tức thì trước khi nạp tải HSR.",
    "zone_spot1_contra": "Tuyệt đối tránh xoay trong kết hợp dạng cánh tay > 60° (vị trí kẹp nén Neer / Hawkins) trong giai đoạn cấp.",
    "zone_spot2_title": "Sức Mạnh Cốt Lõi & Toàn Thân (Core & Global Strength)",
    "zone_spot2_pearl": "Xây dựng áp lực trong ổ bụng (Intra-abdominal Pressure) và sức mạnh chuỗi cơ sau để phân tán đều áp lực lên mọi khớp nối theo nguyên lý 'xi lanh dây chằng neo' của McGill.",
    "zone_spot2_contra": "Tránh các động tác vặn xoắn cột sống tốc độ cao hoặc gập bụng có tải lặp lại gây cắt xé đĩa đệm.",
    "zone_spot3_title": "Khuỷu Tay (Tennis & Golfer's Elbow)",
    "zone_spot3_pearl": "Viêm lồi cầu ngoài (Tennis Elbow) và trong (Golfer's Elbow) là bệnh lý gân kinh điển. Gồng tĩnh cổ tay và cơ cánh tay quay (Brachioradialis) giúp giảm đau nhanh chóng.",
    "zone_spot3_contra": "Tránh kéo giãn thụ động gập cổ tay khi khuỷu tay duỗi thẳng hoàn toàn (gây kẹp nén gân cơ duỗi vào mỏm lồi cầu).",
    "zone_spot4_title": "Cột Sống Thắt Lưng & Chuỗi Cơ Sau (Lower Back)",
    "zone_spot4_pearl": "Theo GS. Stuart McGill: Cột sống thắt lưng cần sự vững chắc (stiffness), trong khi khớp háng cần độ linh hoạt. Sử dụng bộ ba McGill để bảo vệ đĩa đệm.",
    "zone_spot4_contra": "Tránh cúi gập thắt lưng trong 1 giờ đầu sau khi thức dậy khi đĩa đệm ngậm nước căng phồng và áp lực nội mô cao nhất.",
    "zone_spot5_title": "Cổ Tay, Bàn Tay & Ngón Tay (Wrist & Carpal)",
    "zone_spot5_pearl": "Hội chứng ống cổ tay và viêm bao gân de Quervain xuất phát từ ma sát kéo dài. Kết hợp gồng tĩnh, trượt gân ngón tay và nạp tải 4 mặt phẳng vận động.",
    "zone_spot5_contra": "Tránh cử động gập ngón cái kết hợp nghiêng trụ cưỡng bức (tư thế nghiệm pháp Finkelstein) trong giai đoạn viêm cấp.",
    "zone_spot6_title": "Khớp Háng & Khung Chậu (Hip Joint & Labrum)",
    "zone_spot6_pearl": "Khớp háng là khớp chỏm cầu chịu lực lớn nhất. Viêm gân cơ mông nhỡ và gân cơ thắt lưng chậu hồi phục tối ưu qua bài 90/90 FRC và Couch Stretch mở góc háng.",
    "zone_spot6_contra": "Tránh bắt chéo chân khép háng qua đường giữa làm dải chậu chày kẹp nén gân cơ mông vào mấu chuyển lớn.",
    "zone_spot7_title": "Khớp Gối & Gân Bánh Chè (Patellar & Meniscus)",
    "zone_spot7_pearl": "Gân bánh chè (Jumper's Knee) là mô hình kinh điển của GS. Jill Cook. Bài Spanish Squat Isometric 45s làm tê liệt tín hiệu đau ngay lập tức, sau đó dùng ATG Split Squat để tái tạo sụn và cơ chày trước.",
    "zone_spot7_contra": "Tránh gập gối sâu > 90° dưới tải trọng nén lớn trong giai đoạn phản ứng cấp tính.",
    "zone_spot8_title": "Cổ Chân, Gân Gót & Gan Bàn Chân (Achilles & Plantar Fascia)",
    "zone_spot8_pearl": "Gân gót Achilles chịu tải gấp 8-10 lần trọng lượng khi chạy. Gồng tĩnh nhón gót (Isometric Calf Raise) dập tắt cứng gân buổi sáng, tiếp nối bằng HSR theo Beyer và cơ chế guồng tời Rathleff.",
    "zone_spot8_contra": "Đối với viêm điểm bám gân gót (Insertional Achilles), TUYỆT ĐỐI KHÔNG hạ gót sâu quá mặt sàn (gây kẹp nén vào củ gót). Luôn nạp tải trên sàn phẳng.",
    "err_spanish_squat_title": "Lỗi Thường Gặp Khi Tập Spanish Squat",
    "err_spanish_squat_desc": "1. Hạ gối quá sâu (> 90°): Làm tăng áp lực tiếp xúc giữa xương bánh chè và rãnh lồi cầu đùi.\n2. Cẳng chân bị nghiêng ra trước: Mất lực kéo vuông góc của đai khóa khoeo, giảm hiệu quả giảm tải gân.\n3. Ngửa người ra sau quá mức làm mất cân bằng cơ thân mình.",
    "cue_spanish_squat": "Giữ cẳng chân thẳng đứng 90 độ so với sàn, ngồi ra sau như ngồi vào ghế, siết chặt cơ đùi giữ góc gối 60 độ, mắt nhìn thẳng.",
    "err_calf_raise_title": "Lỗi Thường Gặp Khi Nâng Gót Chân (Calf Raise)",
    "err_calf_raise_desc": "1. Nhún gót lò xo giật cục: Sử dụng độ nảy thụ động thay vì lực co cơ chủ động, không kích hoạt mechanotransduction.\n2. Lệch cổ chân ra ngoài: Trọng lượng dồn vào ngón út thay vì khớp ngón chân cái, làm mất cân bằng gân chày sau.\n3. Hạ gót sâu dưới mặt sàn khi bị viêm điểm bám gân gót.",
    "cue_calf_raise": "Ấn mạnh khớp gốc ngón chân cái xuống sàn, nâng thẳng đỉnh gót chân trong 3 giây, giữ đỉnh 1 giây, hạ xuống có kiểm soát trong 3 giây.",
    "err_split_squat_title": "Lỗi Thường Gặp Khi Tập ATG Split Squat",
    "err_split_squat_desc": "1. Võng thắt lưng quá mức để bù trừ cho khớp háng sau bị cứng.\n2. Nhấc gót chân trước khi chưa đủ điều kiện cơ học (cần kê cao mũi/gót chân nếu thiếu độ linh hoạt cổ chân).\n3. Không đưa gối trước vượt qua ngón chân để phủ kín bắp chuối.",
    "cue_split_squat": "Thân người dựng thẳng đứng như cây cột, hạ hông xuống sâu cho đến khi gân kheo chân trước chạm hoàn toàn vào bắp chân, chân sau duỗi thẳng siết cơ mông.",
    "err_wall_er_title": "Lỗi Thường Gặp Khi Gồng Tĩnh Xoay Ngoài Vai",
    "err_wall_er_desc": "1. Để cùi chỏ tách xa thân mình làm mất góc Scaption 30 độ chuẩn.\n2. Dùng cơ thang trên nhún vai lên thay vì cô lập cơ dưới gai (Infraspinatus).\n3. Gồng lực quá mức (> 80% MVC) gây rung giật cơ và tăng đau phản ứng.",
    "cue_wall_er": "Kẹp một chiếc khăn cuộn giữa cùi chỏ và mạn sườn, cánh tay gập 90 độ, ấn mu bàn tay vào tường với 70% sức tối đa, thở đều trong 45 giây.",
    "err_mcgill_curlup_title": "Lỗi Thường Gặp Khi Tập McGill Curl-Up",
    "err_mcgill_curlup_desc": "1. Gập cổ quá mức cằm chạm ngực gây co thắt cơ bậc thang cổ.\n2. Làm phẳng đường cong sinh lý thắt lưng (mất chỗ dựa tự nhiên của hai bàn tay đặt dưới thắt lưng).\n3. Nâng toàn bộ lưng lên khỏi sàn như bài gập bụng truyền thống.",
    "cue_mcgill_curlup": "Đặt hai bàn tay dưới hõm thắt lưng giữ nguyên độ ưỡn sinh lý, chỉ nhấc đầu và vai rời khỏi sàn 2–3 cm, khóa cứng cơ bụng như chuẩn bị đỡ một cú đấm.",
    "err_birddog_title": "Lỗi Thường Gặp Khi Tập Bird-Dog",
    "err_birddog_desc": "1. Xoay lắc khung chậu và võng lưng khi vươn tay chân.\n2. Đá chân sau lên quá cao thay vì vươn dài ra sau.\n3. Thả lỏng cơ bụng làm mất trục trung tính của cột sống.",
    "cue_birddog": "Tưởng tượng đặt một cốc nước đầy trên thắt lưng không để sánh ra ngoài, vươn tay và chân đối diện ra xa như muốn chạm vào hai bức tường đối diện.",
    "err_rdl_title": "Lỗi Thường Gặp Khi Tập Romanian Deadlift (RDL)",
    "err_rdl_desc": "1. Cong tròn lưng dưới khi hạ tạ gây áp lực cắt xé đĩa đệm.\n2. Đưa thanh tạ / tạ đơn ra xa cẳng chân làm tăng cánh tay đòn tải trọng lên cột sống.\n3. Khuỵu gối quá nhiều biến thành động tác Squat thay vì bản lề háng.",
    "cue_rdl": "Giữ tạ áp sát đùi và ống chân, đẩy xương ngồi ra phía sau tối đa, giữ ngực mở và cột sống thẳng tuyệt đối, dừng lại khi cảm thấy gân kheo căng hết biên độ.",
    "err_copenhagen_title": "Lỗi Thường Gặp Khi Tập Copenhagen Plank",
    "err_copenhagen_desc": "1. Gập háng hoặc xoay người úp xuống sàn do yếu cơ thân mình.\n2. Bắt đầu với đòn bẩy quá dài (đặt bàn chân trên ghế) khi cơ khép chưa đủ khỏe gây rách điểm bám mu.\n3. Nín thở khi thực hiện.",
    "cue_copenhagen": "Bắt đầu với gối đặt trên ghế (đòn bẩy ngắn), nâng hông tạo thành một đường thẳng tắp từ vai đến gối, thở đều và cảm nhận cơ khép háng hoạt động.",
    "err_pogo_title": "Lỗi Thường Gặp Khi Bật Nhảy Pogo Hops",
    "err_pogo_desc": "1. Khuỵu gối sâu hấp thu lực thay vì khóa cứng cổ chân lò xo.\n2. Thời gian tiếp đất quá lâu (> 250ms) làm mất tính chất lưu trữ năng lượng đàn hồi của gân Achilles.\n3. Tiếp đất bằng cả bàn chân hoặc gót chân.",
    "cue_pogo": "Khóa cổ chân như lò xo thép, chỉ nhún nảy từ khớp bàn chân trước, thời gian chạm đất nhanh nhất có thể, gối giữ thẳng gần như hoàn toàn.",
    "err_jefferson_title": "Lỗi Thường Gặp Khi Tập Jefferson Curl",
    "err_jefferson_desc": "1. Dùng mức tạ quá nặng ngay từ đầu khi dây chằng sau chưa thích nghi.\n2. Di chuyển nhanh, giật cục thay vì cuộn từng đốt sống.\n3. Không kiểm soát được góc gập háng.",
    "cue_jefferson": "Đứng trên bục cao, bắt đầu cuộn từ cằm vào ngực, cuộn từng đốt sống ngực rồi đến thắt lưng, hạ tạ chậm rãi trong 4 giây, chạm biên độ tối đa rồi cuộn ngược lại từng đốt.",
    "postop_eval_heading": "Bộ Đánh Giá Lâm Sàng & Phân Loại Phục Hồi Hậu Phẫu Theo Chuẩn AO",
    "postop_eval_sub": "Đánh giá mức độ vững chắc kết hợp xương, phân loại liền xương trực tiếp hay gián tiếp, và kê đơn tải trọng tì đè cá nhân hóa theo từng mốc thời gian hậu phẫu.",
    "postop_lbl_surgery": "1. Loại Phẫu Thuật Kết Xương Hoặc Tái Tạo Khớp:",
    "postop_opt_im_nail": "Đinh nội tủy có chốt (IM Nail) xương đùi / cẳng chân",
    "postop_opt_lcp_plate": "Nẹp khóa (LCP) / Nẹp nén (DCP) mâm chày, mắt cá, xương cẳng tay",
    "postop_opt_tension_band": "Néo ép số 8 chỉ thép (Tension Band) gãy xương bánh chè / mỏm khuỷu",
    "postop_opt_acl_meniscus": "Nội soi tái tạo ACL kèm khâu phục hồi sụn chêm",
    "postop_opt_rotator_cuff": "Nội soi khâu rách chóp xoay vai (Rotator Cuff Anchor)",
    "postop_lbl_postop_time": "2. Thời Gian Tính Từ Ngày Phẫu Thuật:",
    "postop_opt_time_p1": "Giai đoạn sớm (Tuần 0 - 2): Vết mổ đang lành, bọc máu tụ quanh ổ gãy",
    "postop_opt_time_p2": "Giai đoạn bán cấp (Tuần 2 - 6): Hình thành can sụn mềm, bắt đầu tập ROM",
    "postop_opt_time_p3": "Giai đoạn can xương cứng (Tuần 6 - 12): Cầu can xương bắc qua diện gãy trên X-quang",
    "postop_opt_time_p4": "Giai đoạn tái cấu trúc (Tuần 12 - 24+): Tái tạo cấu trúc bè xương theo định luật Wolff",
    "postop_lbl_pain_swelling": "3. Mức Độ Đau Nhức & Sưng Phù Vết Mổ (Thang Điểm VAS 0 - 10):",
    "postop_btn_evaluate": "Phân Tích & Kê Đơn Tải Trọng Hậu Phẫu Chuẩn AO",
    "postop_res_stability_lbl": "Nguyên Lý Vững Chắc Sinh Học AO:",
    "postop_res_healing_mode_lbl": "Cơ Chế Liền Xương Mục Tiêu:",
    "postop_res_target_load_lbl": "Chỉ Định Tải Trọng Tì Đè (Weight-Bearing Rx):",
    "postop_res_rom_target_lbl": "Mục Tiêu Tầm Vận Động (Target ROM):",
    "postop_res_clinical_actions_lbl": "Y Lệnh Lâm Sàng & Bài Tập Trọng Tâm:",
    "postop_res_contra_lbl": "Cấm Chỉ Định Nghiêm Ngặt Tránh Hỏng Nẹp Vít:"
  },
  "en": {
    "nav_map": "Body Map",
    "nav_science": "Mechanotherapy Science",
    "nav_reviews": "Client Results",
    "nav_apply": "Apply Now",
    "btn_consult": "Get Started",
    "nav_map_short": "Body",
    "nav_calc_short": "Rx Load",
    "nav_fw_short": "12 Weeks",
    "nav_vid_short": "Videos",
    "nav_sci_short": "Science",
    "pwa_install_title": "Install Move Forever App",
    "pwa_install_desc": "Add to home screen for instant access like a native app!",
    "pwa_btn_install": "Install App",
    "btn_install_short": "Install",
    "nav_postop": "Post-Op & Fixation",
    "nav_postop_short": "Post-Op",
    "vid_cat_postop": "Post-Op & Fixation",
    "postop_badge": "POST-OP ORTHOPEDIC TRAUMA & OSTEOSYNTHESIS REHAB",
    "postop_title": "Clinical Post-Surgical Rehabilitation & Bone Healing Continuum",
    "postop_sub": "Based on AO Foundation Principles and Perren's Tissue Strain Theory — Safe progressive weight-bearing timeline preventing implant failure, arthrofibrosis, and disuse atrophy.",
    "postop_ao_heading": "Two Bone Healing Mechanisms Under AO Stability Principles",
    "postop_abs_title": "1. Absolute Stability (Interfragmentary Strain < 2%)",
    "postop_abs_desc": "Applied in compression plates, lag screws, and tension band wiring. Heals via primary direct contact healing with cutting cones without periosteal callus. Early active-assisted ROM begins in Week 1 to prevent arthrofibrosis; bending/shear forces must be guarded to avoid hardware pull-out.",
    "postop_rel_title": "2. Relative Stability (Interfragmentary Strain 2–10%)",
    "postop_rel_desc": "Applied in interlocking intramedullary nails, bridge plates, and locking plates (LCP). Heals via secondary indirect bone healing forming periosteal bridging callus. Requires axial micromotion (0.2–1.0mm). Controlled early axial weight-bearing stimulates robust callus mineralization per Wolff's Law.",
    "postop_timeline_heading": "4-Phase Post-Op Weight-Bearing & Loading Timeline",
    "postop_p1_badge": "Weeks 0 – 2 | Phase 1",
    "postop_p1_title": "Wound Protection & Thromboembolism Prophylaxis",
    "postop_p1_weight": "Weight: NWB (Non-Weight Bearing) or TDWB (Touch-Down < 10% bodyweight).",
    "postop_p1_rx": "Intervention: Active ankle pumps, quadriceps setting isometrics, glute sets, limb elevation, gentle patellar mobilizations.",
    "postop_p2_badge": "Weeks 2 – 6 | Phase 2",
    "postop_p2_title": "Soft Callus Formation & Partial Weight-Bearing (PWB)",
    "postop_p2_weight": "Weight: PWB 25% – 50% bodyweight with bilateral crutches (3-point gait).",
    "postop_p2_rx": "Intervention: Active-assisted ROM, heel slides, Straight Leg Raise (SLR without extensor lag), adjacent joint conditioning.",
    "postop_p3_badge": "Weeks 6 – 12 | Phase 3",
    "postop_p3_title": "Hard Callus Consolidation & Full Weight-Bearing (FWB)",
    "postop_p3_weight": "Weight: FWB (Wean crutches, full weight-bearing upon radiographic bridging callus).",
    "postop_p3_rx": "Intervention: Closed kinetic chain (Mini squats, low-load leg press, step-ups), stationary cycling, proprioception, symmetrical gait re-education.",
    "postop_p4_badge": "Weeks 12 – 24+ | Phase 4",
    "postop_p4_title": "Cortical Remodeling & Functional Return to Activity",
    "postop_p4_weight": "Weight: Full multidirectional loading stimulating trabecular realignment per Wolff's Law.",
    "postop_p4_rx": "Intervention: Progressive resistance training, end-range loaded mobility, eccentric deceleration drills, limb symmetry index (LSI) >= 90%.",
    "postop_pathways_heading": "Evidence-Based Protocols for 6 Landmark Orthopedic Surgeries",
    "postop_surg1_title": "Intramedullary Nail (IMN) Femur & Tibia Shaft Fractures",
    "postop_surg1_desc": "Load-sharing implant mechanics. Permits early 25-50% PWB by weeks 2-3 to stimulate periosteal callus. Avoid excessive rotational torque prior to week 6.",
    "postop_surg2_title": "Tibial Plateau Fracture Locking Compression Plate (LCP)",
    "postop_surg2_desc": "Articular surface reconstruction. Strict Non-Weight Bearing (NWB) for 6-8 weeks to prevent joint depression. Early unloaded AAROM prevents knee arthrofibrosis.",
    "postop_surg3_title": "Bimalleolar / Trimalleolar Ankle Fracture ORIF",
    "postop_surg3_desc": "Immobilized in CAM boot 4-6 weeks. Early unloaded dorsiflexion/plantarflexion prevents Achilles contracture. Progressive PWB begins after week 6 verification.",
    "postop_surg4_title": "Patellar Fracture Tension Band Wiring (TBW)",
    "postop_surg4_desc": "Brace strictly locked at 0° extension during ambulation to shield extensor mechanism. Gradual assisted flexion: W0-2 (0-30°), W2-4 (0-60°), W4-6 (0-90°).",
    "postop_surg5_title": "ACL Reconstruction with Meniscal Repair",
    "postop_surg5_desc": "Achieve 0° extension on Day 1 (preventing Cyclops lesions). With posterior horn meniscal repair: cap flexion at <= 90° for 4-6 weeks to safeguard sutures.",
    "postop_surg6_title": "Arthroscopic Rotator Cuff Repair & Clavicle Plating",
    "postop_surg6_desc": "Abduction pillow sling worn 4-6 weeks. Only passive Codman pendulums and PROM allowed. Active arm elevation strictly forbidden to avoid suture pullout.",
    "postop_redflags_heading": "Red Flag Clinical Warnings Requiring Immediate Surgical Review",
    "postop_rf1_title": "Surgical Site Infection & Osteomyelitis Signs",
    "postop_rf1_desc": "Fever >38°C, progressive erythema spreading beyond wound borders, purulent exudate, or wound dehiscence.",
    "postop_rf2_title": "Deep Vein Thrombosis (DVT) Warning",
    "postop_rf2_desc": "Severe calf tightness, acute pain on passive ankle dorsiflexion (positive Homans sign), unilateral pitting edema.",
    "postop_rf3_title": "Hardware Failure, Implant Loosening or Fracture",
    "postop_rf3_desc": "Sudden sharp crack or click on weight-bearing, audible crepitus, sudden angular limb deformity or limb shortening.",
    "postop_rf4_title": "Complex Regional Pain Syndrome (CRPS / Sudeck Atrophy)",
    "postop_rf4_desc": "Disproportionate burning pain, hypersensitivity (allodynia), shiny erythematous/cyanotic skin, severe stiffness.",
    "postop_cta_btn": "Explore Post-Op & Fixation Rehabilitation Videos",
    "hero_badge": "INTERACTIVE BODY MAP & MECHANOTHERAPY",
    "hero_title": "Click The Area That's Troubling You",
    "hero_sub": "Want to unlock your body's hidden potential? Select any body region to explore the 3-phase evidence-based mechanotherapy rehabilitation protocol!",
    "hero_hint": "Tap on any glowing pulse hotspot to view curated Isometric, HSR & End-Range protocols",
    "sci_badge": "EVIDENCE-BASED CONSERVATIVE REHABILITATION",
    "sci_title": "Mechanotherapy & Tendon Continuum Framework",
    "sci_sub": "Based on pioneering research by Prof. Jill Cook & Dr. Ebonie Rio combined with ATG & FRC principles — Regenerating tendons and joints through progressive mechanical loading instead of surgery or complete rest.",
    "cont_stage1_title": "Reactive Tendinopathy (Acute Overload)",
    "cont_stage1_trigger": "Trigger: Sudden spikes in training volume, intensity, or unaccustomed load.",
    "cont_stage1_desc": "Tendon cells mount an acute non-inflammatory proliferative response, increasing bound proteoglycans to absorb compressive stress without structural disruption.",
    "cont_stage1_rx": "Strategy: Isometric Loading (Analgesic Dose)",
    "cont_stage1_note": "Strictly avoid compressive stretching. 45-second isometric holds induce immediate cortical inhibition relief.",
    "cont_stage1_title_d": "Tendon Dysrepair (Matrix Breakdown)",
    "cont_stage2_trigger": "Trigger: Persistent chronic overloading without adequate cellular recovery time.",
    "cont_stage2_desc": "Tenocytes undergo chondroid metaplasia, matrix proteoglycans separate collagen fascicles, and pathological neovascularization initiates.",
    "cont_stage2_rx": "Strategy: Heavy Slow Resistance (HSR)",
    "cont_stage2_note": "Heavy loads performed with a 3s concentric / 1s pause / 3s eccentric tempo trigger mechanotransduction to stimulate Type I Collagen.",
    "cont_stage3_title": "Degenerative Tendon (Chronic Remodeling)",
    "cont_stage3_trigger": "Trigger: Months to years of micro-trauma leading to cell death and focal matrix exhaustion.",
    "cont_stage3_desc": "Disorganized collagen fibers and areas of acellular necrosis. Hallmark symptoms include morning stiffness and warm-up phenomenon.",
    "cont_stage3_rx": "Strategy: 'Treat the Donut, Not the Hole'",
    "cont_stage3_note": "Prof. Jill Cook: Focus mechanical loading on the abundant surrounding healthy tendon tissue to build sufficient tensile capacity.",
    "proto_main_title": "The 4-Stage Progressive Tendon Loading Continuum",
    "proto_p1_badge": "Level 1: Acute / Pain Relief",
    "proto_p1_title": "1. Isometric Loading (Cortical Inhibition Relief)",
    "proto_p1_desc": "Holding muscle contractions at specific joint angles (45-60s holds x 4-5 sets at ~70% MVC). Directly modulates central nervous system pain thresholds for 45-60 minutes without provoking compressive strain.",
    "proto_p2_badge": "Level 2: Structural Remodeling",
    "proto_p2_title": "2. Isotonic Heavy Slow Resistance (Type I Collagen Synthesis)",
    "proto_p2_desc": "Controlled cadence (Tempo 3s concentric - 1s pause - 3s eccentric). Mechanotransduction cascades signal tenocytes to synthesize parallel, robust Type I collagen fibers, significantly enhancing tensile stiffness.",
    "proto_p3_badge": "Level 3: Elastic Capacity",
    "proto_p3_title": "3. Energy Storage & Plyometrics (Biological Spring Recoil)",
    "proto_p3_desc": "Progressive ballistic and jumping drills that train the stretch-shortening cycle (SSC). Restores the tendon's capacity to act as an energy-efficient biological spring.",
    "proto_p4_badge": "Level 4: End-Range Resilience",
    "proto_p4_title": "4. End-Range Capacity & Re-Integration (ATG & FRC Usable Mobility)",
    "proto_p4_desc": "Loaded stretching at extreme articular end-ranges (ATG principles by Ben Patrick) combined with active neuro-motor control (Dr. Andreo Spina FRC). Joint bulletproofing across all vectors.",
    "comp_rest_title": "The Mistake: Complete Rest & Corticosteroid Injections",
    "comp_r1": "Complete rest triggers stress-deprivation atrophy, reducing vascular density and cellular load tolerance.",
    "comp_r2": "Steroid shots mask pain temporarily while blunting collagen synthesis, increasing spontaneous tendon rupture rates by 4-6x.",
    "comp_r3": "Muscle inhibition cascades, leading to worse flare-ups as soon as the athlete resumes sport.",
    "comp_load_title": "The Evidence-Based Cure: Progressive Optimal Loading",
    "comp_l1": "Controlled mechanical tension is the ONLY stimulus capable of driving tenocyte collagen remodeling.",
    "comp_l2": "Isometric holds provide immediate analgesic relief through spinal and cortical pathways with zero joint wear.",
    "comp_l3": "Forges muscular armor around articular cartilage for lifelong resilience without surgical intervention.",
    "reviews_title": "Do you want to unlock your body's hidden potential?",
    "reviews_sub": "Get coached by Mark! Join hundreds of athletes & clients who conquered pain and rebuilt resilience.",
    "form_heading": "Apply To Work With Mark",
    "form_criteria_desc": "Before continuing, please confirm that the below criteria match your situation.",
    "crit_1": "You are seriously considering coaching.",
    "crit_2": "You are willing to financially invest in coaching.",
    "crit_3": "You are determined to create long-lasting changes rather than a temporary quick fix.",
    "crit_confirm": "Yes, I confirm that this is what I am looking for.",
    "lbl_name": "Full name",
    "lbl_email": "Email address",
    "lbl_dob": "Date of birth",
    "lbl_source": "Where did you hear about this coaching opportunity?",
    "opt_select": "Choose one or more options...",
    "opt_other": "Other",
    "lbl_tendon_phase": "Which phase best characterizes your current pain presentation?",
    "opt_select_stage": "Select your pain presentation...",
    "opt_stage_reactive": "1. Acute sharp pain following a sudden load increase (Reactive Phase)",
    "opt_stage_dysrepair": "2. Dull ache for weeks, persistent morning stiffness on first steps (Dysrepair Phase)",
    "opt_stage_degenerative": "3. Chronic pain for years, confirmed MRI tendinosis / partial tearing (Degenerative)",
    "opt_stage_spine": "4. Chronic lower back / neck stiffness with nerve radiation on prolonged sitting",
    "lbl_goal": "Please describe what you would like to achieve below (the more detail the better!)",
    "lbl_obstacle": "If you haven't mentioned it, please detail what is HOLDING YOU BACK from achieving it.",
    "lbl_history": "Please outline your full injury history as best as you can. Include Left/Right side.",
    "lbl_triggers": "If a physical injury is troubling you, please describe the specific situations where this happens.",
    "lbl_treatment": "Are you currently receiving treatment / personal training / S&C elsewhere?",
    "lbl_failed": "If you felt other forms of treatment were unsuccessful, why do you feel they didn't work for you?",
    "lbl_pain_scale": "Label on a scale of 1-10 the intensity of pain/stiffness on WORST days (10 = the worst)",
    "lbl_confidence_scale": "How confident are you in your body's ability to improve? (1-10)",
    "lbl_activity": "Please describe what a typical week of activity looks like to you.",
    "lbl_vision": "Imagine it's 6 months from now and you've made progress. What does life look like?",
    "lbl_impact": "What positive effect would being able to do this create for you, your health, and relationships?",
    "lbl_challenge": "Detail a time where you overcame multiple challenges to accomplish a desired outcome:",
    "lbl_location": "If we agree coaching is a good idea, would you prefer gym, home, or both?",
    "opt_gym": "Gym",
    "opt_home": "At Home",
    "opt_both": "Both Gym & Home",
    "lbl_notes": "Is there anything else you'd like me to know?",
    "btn_submit": "Proceed With Application",
    "modal_success_title": "Application Submitted Successfully!",
    "modal_success_desc": "Thank you for applying. We have received your detailed intake form and will reach out via Email within 24 hours.",
    "modal_close_btn": "Close",
    "footer_tagline": "Eliminate the frustrations of injury with battle-tested movement and strength approaches.",
    "footer_quick_links": "Quick Links",
    "footer_contact": "Contact",
    "take_next_step": "Ready For Your 1-on-1 Personalized Plan?",
    "get_coached": "Apply For Dedicated Coaching →",
    "tab_p1": "⚡ Phase 1: Isometric",
    "tab_p2": "🧱 Phase 2: Heavy Slow",
    "tab_p3": "🚀 Phase 3: End-Range / Elastic",
    "calc_badge": "CLINICAL TENDON LOAD CALCULATOR",
    "calc_title": "Interactive Tendon Load & Stage Calculator",
    "calc_sub": "Based on the clinical Tendon Continuum diagnostic algorithm by Prof. Jill Cook & Dr. Ebonie Rio. Enter your clinical parameters to diagnose your tendon stage and generate a precise starting prescription.",
    "calc_zone_lbl": "1. Involved Anatomical Region:",
    "calc_onset_lbl": "2. Symptom Duration (Chronicity):",
    "calc_stiff_lbl": "3. Morning Stiffness Duration Upon Waking:",
    "calc_act_lbl": "4. Most Demanding Regular Activity:",
    "calc_vas_lbl": "5. Peak Pain on Worst Days (VAS Scale 0 - 10):",
    "calc_latency_lbl": "6. Pain Pattern & Load Latency:",
    "calc_btn_compute": "Calculate Load Prescription Now",
    "calc_res_stage": "Tendon Continuum Classification",
    "calc_res_phase": "Recommended Starting Phase",
    "calc_res_intensity": "Target Starting Intensity",
    "calc_res_dosage": "Prescription Dosage & Hold Duration",
    "calc_res_frequency": "Weekly Training Frequency",
    "calc_res_pain_rule": "24-Hour Pain Monitoring Rule",
    "calc_res_morning_test": "Standardized Morning Self-Test",
    "calc_res_gate": "Progression Gatekeeper Criteria",
    "nav_calculator": "Tendon Calculator",
    "nav_library": "Video Library",
    "nav_framework": "12-Week Framework",
    "drawer_menu_title": "Navigation Menu",
    "drawer_close_aria": "Close navigation drawer",
    "drawer_open_aria": "Open navigation drawer",
    "lang_toggle_title": "Switch Language / Chuyển đổi ngôn ngữ",
    "lang_switch_hint": "Switch to Vietnamese",
    "privacy_guarantee": "100% User Data Confidentiality Guaranteed",
    "all_rights_reserved": "All rights reserved.",
    "btn_close_modal": "Close modal window",
    "modal_clinical_pearl_label": "Clinical Mechanism & Key Practice Pearl",
    "mech_transduction_title": "Cellular Mechanotransduction",
    "mech_transduction_desc": "The physiological process whereby tenocytes convert extracellular physical tensile strain into intracellular biochemical signals, driving gene expression and Type I collagen synthesis.",
    "cortical_inhibition_title": "Cortical & Corticospinal Inhibition Relief",
    "cortical_inhibition_desc": "Transcranial Magnetic Stimulation (TMS) research by Dr. Ebonie Rio demonstrating that 70% MVC isometric loading resets aberrant motor cortex inhibition and provides 45-60 minutes of profound analgesia.",
    "donut_principle_title": "'Treat the Doughnut, Not the Hole' Principle",
    "donut_principle_desc": "Ultrasound Tissue Characterization (UTC) research by Cook & Docking showing that pathological tendons retain abundant aligned fibrillar structure surrounding necrotic cores. Loading the healthy 'doughnut' restores full function.",
    "hsr_tempo_title": "Heavy Slow Resistance (HSR Protocol)",
    "hsr_tempo_desc": "The gold-standard protocol by Kongsgaard & Beyer: 3s eccentric - 1s pause - 3s concentric tempo (7s TUT per repetition), maximizing mechanotransductive signaling and tendon cross-sectional stiffness.",
    "ssc_elastic_title": "Stretch-Shortening Cycle & Biological Spring Recoil",
    "ssc_elastic_desc": "The ability of tendons to store elastic potential energy upon ground impact and rapidly release it during propulsion. Essential for restoring Rate of Force Development (RFD) in Phase 3.",
    "mcgill_big3_title": "The McGill Big 3 Spine-Sparing Protocol",
    "mcgill_big3_desc": "Modified Curl-Up, Side Bridge, and Bird-Dog exercises developed by Prof. Stuart McGill to build 3D torso endurance and spine stiffness with minimal intervertebral disc shear penalties.",
    "spine_stiffness_title": "Lumbar Spine Stiffness vs Hip Articular Mobility",
    "spine_stiffness_desc": "The lumbar spine requires 3D guy-wire stiffness for power transmission, whereas the acetabulofemoral hip joint requires full multi-planar mobility. Decoupling hips from spine spares discs.",
    "frc_cars_title": "Controlled Articular Rotations (FRC CARs)",
    "frc_cars_desc": "Dr. Andreo Spina's Functional Range Conditioning system: Active rotational movements at maximum articular end-ranges to stimulate mechanoreceptors, optimize synovial fluid, and expand usable active range.",
    "frc_pails_rails_title": "Progressive / Regressive Angular Isometric Loading (PAILs / RAILs)",
    "frc_pails_rails_desc": "High-intensity isometric contractions at extreme articular limits to reprogram the central nervous system, converting passive flexibility into active, injury-resistant usable strength.",
    "pain_latency_title": "The 24-Hour Load Latency Rule & VAS ≤ 3/10 Ceiling",
    "pain_latency_desc": "Tendon nociception is characterized by delayed neurochemical latency (18-24 hours). Pain up to VAS 3/10 during exercise is acceptable, but MUST return to baseline within 24 hours.",
    "morning_stiffness_def": "Morning Tendon Stiffness: The duration of severe stiffness or limp experienced upon taking the very first steps out of bed in the morning.",
    "warmup_phenom_def": "Warm-Up Phenomenon: Symptom alleviation during gentle movement as tissue temperature rises, followed by a delayed latent flare 18-24 hours later.",
    "stress_deprivation_title": "Stress-Deprivation Catabolism",
    "stress_deprivation_desc": "When a tendon is immobilized or unloaded (< 4% strain), matrix metalloproteinases (MMP-1, MMP-13) upregulate, causing rapid enzymatic collagen matrix degradation.",
    "collagen_synthesis_title": "Type I Collagen Synthesis Window (24–72 Hours)",
    "collagen_synthesis_desc": "High mechanical loading induces Type I procollagen mRNA expression peaking at 24-72 hours. Net collagen balance becomes positive after 36-48 hours, requiring 48h rest intervals between HSR bouts.",
    "fw_badge": "EVIDENCE-BASED 12-WEEK PERIODIZED FRAMEWORK",
    "fw_title": "12-Week Periodized Mechanotherapy Progression Engine",
    "fw_sub": "Three structured biological phases: Weeks 1-4 (Isometric analgesia), Weeks 5-8 (HSR matrix synthesis), Weeks 9-12 (Elastic SSC & End-range resilience).",
    "fw_card_p1_badge": "Weeks 1 – 4 | Phase 1",
    "fw_card_p1_title": "Isometric Loading & Cortical Analgesia",
    "fw_card_p1_desc": "Objective: Relieve motor cortex inhibition, redistribute intra-tendinous fluid swelling, and abolish acute sharp pain without tensile shear or compressive bone impingement.",
    "fw_card_p1_dosage": "Dosage: 5 sets x 45-second isometric holds (~70% Maximum Voluntary Contraction).",
    "fw_card_p1_freq": "Frequency: Daily (1–2x per day, separated by ≥ 6 hours).",
    "fw_card_p1_rest": "Rest Interval: 2 minutes passive rest (essential for ATP and neurological recovery).",
    "fw_card_p1_gate": "Progression Criteria: Daily living VAS ≤ 2/10 sustained for 5 consecutive days.",
    "fw_card_p2_badge": "Weeks 5 – 8 | Phase 2",
    "fw_card_p2_title": "Heavy Slow Resistance (HSR) & Type I Collagen Remodeling",
    "fw_card_p2_desc": "Objective: Apply 4–8% mechanical strain to intact aligned fibrils, stimulating tenocyte mechanotransduction, collagen alignment, and tendon cross-sectional hypertrophy.",
    "fw_card_p2_dosage": "Dosage: 3–4 sets with strict 3-1-3 tempo (3s down - 1s pause - 3s up). Week 5 (15RM) -> Week 6 (12RM) -> Week 7 (10RM) -> Week 8 (8RM).",
    "fw_card_p2_freq": "Frequency: 3 sessions/week on non-consecutive days (Mon-Wed-Fri; 48h rest between sessions).",
    "fw_card_p2_rest": "Rest Interval: 2 to 3 minutes between heavy sets.",
    "fw_card_p2_gate": "Progression Criteria: Completing 4 sets x 8RM with perfect tempo; morning test VAS ≤ 3/10.",
    "fw_card_p3_badge": "Weeks 9 – 12 | Phase 3",
    "fw_card_p3_title": "Elastic Energy Storage (SSC) & End-Range Capacity (ATG/FRC)",
    "fw_card_p3_desc": "Objective: Re-educate the stretch-shortening cycle (SSC plyometrics) and build extreme end-range articular bulletproofing via ATG and FRC methods.",
    "fw_card_p3_dosage": "Dosage: 3–4 sets of ballistic plyometrics (pogo hops, drop landings) combined with deep ATG split squats and PAILs/RAILs.",
    "fw_card_p3_freq": "Frequency: 2–3 sessions/week (48–72h recovery between high-impact ballistic sessions).",
    "fw_card_p3_rest": "Rest Interval: 2–3 minutes between plyometric clusters and loaded end-range sets.",
    "fw_card_p3_gate": "Graduation Criteria: Full pain-free return to high-velocity sports, sprinting, and explosive multidirectional tasks.",
    "calc_lbl_zone": "1. Affected Joint / Anatomical Region:",
    "calc_opt_zone_select": "Select anatomical zone...",
    "calc_opt_shoulder": "Shoulder & Rotator Cuff",
    "calc_opt_core": "Core Stability & Spine",
    "calc_opt_elbow": "Elbow (Tennis / Golfer's Elbow)",
    "calc_opt_lower_back": "Lower Back & Lumbar Discs",
    "calc_opt_wrist": "Wrist, Hand & Carpal Tunnel",
    "calc_opt_hip": "Hip, Gluteal & Proximal Hamstring",
    "calc_opt_knee": "Knee & Patellar Tendon (Jumper's Knee)",
    "calc_opt_foot": "Foot, Ankle, Achilles & Plantar Fascia",
    "calc_lbl_chronicity": "2. Symptom Duration & Chronicity:",
    "calc_opt_chronicity_select": "Select duration...",
    "calc_opt_acute": "Acute (< 2-6 weeks): Sudden spike in training load",
    "calc_opt_subacute": "Subacute (6-12 weeks): Persistent overload, sluggish healing",
    "calc_opt_chronic": "Chronic (> 12 weeks): Long-standing recurrent tendon pain",
    "calc_lbl_stiffness": "3. Morning Stiffness Duration on Waking:",
    "calc_opt_stiffness_select": "Select morning stiffness duration...",
    "calc_opt_stiff_none": "None to minimal (< 10-15 minutes)",
    "calc_opt_stiff_mod": "Moderate (15-30 minutes): Requires gentle movement to ease",
    "calc_opt_stiff_sev": "Severe (> 30-60 minutes): Profound stiffness on first steps",
    "calc_lbl_activity": "4. Provocative Aggravating Load / Activity Level:",
    "calc_opt_act_select": "Select provocative load level...",
    "calc_opt_act_sedentary": "Daily living tasks (Walking, prolonged standing, stairs)",
    "calc_opt_act_mod": "Recreational activities (Jogging, light aerobics, fitness)",
    "calc_opt_act_jump": "High-impact elastic storage (Jumping, sprinting, cutting)",
    "calc_opt_act_lift": "Heavy slow resistance (Heavy lifting, deep squats, carries)",
    "calc_lbl_vas": "5. Provocative Pain Score (VAS 0 to 10):",
    "calc_vas_hint": "Slide to indicate your current pain intensity during movement",
    "calc_vas_mild": "VAS 1-3: Safe therapeutic loading zone",
    "calc_vas_mod": "VAS 4-6: Moderate risk / borderline overload",
    "calc_vas_sev": "VAS 7-10: Severe acute overload, immediate de-load required",
    "calc_lbl_latency": "6. Pain Latency & Warm-Up Response:",
    "calc_opt_lat_select": "Select response pattern...",
    "calc_opt_lat_warmup": "Warm-up phenomenon present: Eases during exercise, flares 24h later",
    "calc_opt_lat_immediate": "Pain escalates immediately during loading without easing",
    "calc_opt_lat_constant": "Constant unrelenting ache unaffected by activity",
    "calc_btn_run": "Calculate Clinical Loading Prescription",
    "calc_btn_reset": "Reset Calculator",
    "calc_err_missing": "Please fill in all clinical parameters to compute an accurate prescription.",
    "calc_res_badge": "MECHANOTHERAPY PRESCRIPTION RESULTS",
    "calc_res_title": "Personalized Clinical Rehabilitation Protocol",
    "calc_res_stage_lbl": "Tendon Continuum Diagnostic Stage:",
    "calc_res_phase_lbl": "Recommended Starting Phase:",
    "calc_res_intensity_lbl": "Target Loading Intensity:",
    "calc_res_dosage_lbl": "Prescribed Volume & Holds:",
    "calc_res_tempo_lbl": "Contraction Tempo:",
    "calc_res_freq_lbl": "Weekly Training Frequency:",
    "calc_res_rest_lbl": "Inter-Set Rest Interval:",
    "calc_res_pain_rule_lbl": "24-Hour Pain Recovery Monitoring Rule:",
    "calc_res_pain_rule_detail": "Pain up to VAS ≤ 3/10 during exercise is acceptable; symptoms MUST return to baseline within 24 hours. If morning pain spikes, de-load by 30–50% and return to isometrics for 48 hours.",
    "calc_res_morning_test_lbl": "Standardized Next-Morning Load Test:",
    "calc_res_progression_lbl": "Progression Gatekeeper Criteria:",
    "calc_res_contraindication_lbl": "Compressive Joint Angle Contraindications:",
    "calc_res_primary_ex_lbl": "Primary Recommended Exercise:",
    "calc_res_regression_lbl": "Regression (If Flare-Up Occurs):",
    "calc_res_progression_step_lbl": "Progression Step (When Tolerated):",
    "calc_res_cta_text": "Need detailed technical video guidance for each exercise?",
    "calc_res_cta_btn": "View Exercise Video Library →",
    "stage_reactive_name": "Reactive Tendinopathy (Acute Overload)",
    "stage_reactive_mechanism": "Acute non-inflammatory cellular proliferation in response to sudden load spikes. Bound proteoglycans swell the matrix without fibrillar disruption. Compressive stretching is strictly contraindicated.",
    "stage_dysrepair_name": "Tendon Dysrepair (Matrix Breakdown)",
    "stage_dysrepair_mechanism": "Matrix breakdown resulting from chronic overloading without adequate recovery. Proteoglycans separate collagen fascicles with pathological neovascular in-growth. Requires structured HSR to stimulate collagen alignment.",
    "stage_degenerative_name": "Degenerative Tendinopathy (Treat the Doughnut)",
    "stage_degenerative_mechanism": "Long-standing accumulated microtrauma characterized by acellular necrotic zones and fibrillar fragmentation. Strictly follow 'Treat the Doughnut, Not the Hole' to hypertrophy the surrounding healthy aligned matrix.",
    "stage_reactive_on_deg_name": "Reactive-on-Degenerative Tendon Flare",
    "stage_reactive_on_deg_mechanism": "The intact healthy fibrillar tissue surrounding a chronic degenerative core mounts an acute reactive response. Immediate de-load to Phase 1 isometrics for 7-14 days is required to settle cortical pain prior to HSR.",
    "morning_test_shoulder": "Single-Arm Wall External Rotation Hold at 30° Scaption (30s hold)",
    "morning_test_core": "McGill Modified Curl-Up single 8-second hold with perfect form",
    "morning_test_elbow": "Supported Wrist Extension Hold with 2kg dumbbell (forearm on table)",
    "morning_test_lower_back": "Neutral Spine Glute Bridge 30s Hold with level pelvis",
    "morning_test_wrist": "Radial Deviation Hold with light lever arm",
    "morning_test_hip": "Single-Leg Stance 30s Hold with level pelvis",
    "morning_test_knee": "Single-Leg Decline Squat on 25° slant board to 60° knee flexion",
    "morning_test_foot": "Single-Leg Heel Raise to full height on flat floor",
    "vid_badge": "CLINICAL VIDEO LIBRARY & SURGICAL MASTERCLASSES",
    "vid_title": "Evidence-Based Exercise Video Library",
    "vid_sub": "Every movement features medical rationale, standard execution cues, common error analysis, regressions, and surgical anatomy correlations.",
    "vid_search_ph": "Search exercises (e.g. Spanish squat, calf raise, McGill, split squat)...",
    "vid_filter_zone_all": "All Anatomical Regions",
    "vid_filter_phase_all": "All Rehabilitation Phases",
    "vid_cat_all": "All Videos",
    "vid_cat_p1": "Phase 1: Isometric",
    "vid_cat_p2": "Phase 2: Heavy Slow Resistance",
    "vid_cat_p3": "Phase 3: Elastic & End-Range",
    "vid_cat_surgical": "Surgical Masterclasses",
    "vid_lbl_rationale": "Clinical & Cellular Rationale:",
    "vid_lbl_cues": "Standard Execution Cues:",
    "vid_lbl_errors": "Common Execution Errors & Fixes:",
    "vid_lbl_regression": "Regression Exercise:",
    "vid_lbl_progression": "Progression Exercise:",
    "vid_lbl_surgical": "Surgical Anatomy Correlate:",
    "vid_lbl_tempo": "Contraction Tempo:",
    "vid_lbl_equipment": "Required Equipment:",
    "vid_lbl_hold_reps": "Prescribed Volume & Holds:",
    "vid_btn_watch": "Watch Masterclass",
    "vid_btn_close": "Close Video Player",
    "vid_empty_results": "No rehabilitation movements match the selected filters.",
    "zone_spot1_title": "Shoulder & Rotator Cuff",
    "zone_spot1_pearl": "Supraspinatus tendon is prone to subacromial impingement. Isometric external rotations deliver immediate analgesic relief by inhibiting cortical pain pathways prior to HSR.",
    "zone_spot1_contra": "Strictly avoid combined internal rotation with abduction > 60° (Neer / Hawkins impingement positions) during acute flares.",
    "zone_spot2_title": "General Strength & Core Resilience",
    "zone_spot2_pearl": "Building intra-abdominal pressure and posterior chain force transference protects all distal and proximal joints via McGill's 3D guy-wire cylinder model.",
    "zone_spot2_contra": "Avoid high-velocity spinal twisting or repetitive loaded sit-ups that produce intervertebral disc delamination.",
    "zone_spot3_title": "Elbow & Epicondylalgia",
    "zone_spot3_pearl": "Lateral and medial epicondylalgia respond dramatically to brachioradialis and wrist extensor isometric holds prior to heavy eccentric tendon remodelling.",
    "zone_spot3_contra": "Avoid end-range passive wrist flexion stretch with the elbow fully locked in extension (compresses extensor tendon against lateral epicondyle).",
    "zone_spot4_title": "Lower Back & Lumbar Spine",
    "zone_spot4_pearl": "Prof. Stuart McGill protocol: The lumbar spine requires stiffness and stability, while the hips require mobility to spare the intervertebral discs.",
    "zone_spot4_contra": "Avoid loaded lumbar flexion during the first hour after waking when discs are maximally hydrated and hydrostatic pressures peak.",
    "zone_spot5_title": "Wrist, Hand & Carpal Tunnel",
    "zone_spot5_pearl": "Carpal tunnel and de Quervain tenosynovitis require progressive 4-plane loading and finger tendon glide maneuvers to restore retinacular glide.",
    "zone_spot5_contra": "Avoid combined thumb flexion with forceful ulnar deviation (Finkelstein test position) during acute inflammatory phases.",
    "zone_spot6_title": "Hip Joint, Gluteal & Proximal Hamstring",
    "zone_spot6_pearl": "The hip requires rotational freedom. 90/90 FRC rotations and loaded couch stretches restore internal rotation and decompress the anterior capsule.",
    "zone_spot6_contra": "Avoid adduction past midline (crossing legs compresses gluteus medius/minimus against greater trochanter).",
    "zone_spot7_title": "Knee, Patellar Tendon & Meniscus",
    "zone_spot7_pearl": "Jill Cook gold standard: Patellar tendinopathy responds to 45s Spanish Squat / Wall Sit isometrics for cortical pain relief, followed by ATG split squats for structural remodeling.",
    "zone_spot7_contra": "Avoid deep knee flexion > 90° under heavy loads during the reactive phase to prevent compressive patellofemoral shear.",
    "zone_spot8_title": "Foot, Ankle, Achilles & Plantar Fascia",
    "zone_spot8_pearl": "The Achilles tendon withstands up to 10x bodyweight. High-load isometric calf raises eliminate morning stiffness, while slow eccentric heel drops realign collagen fibers.",
    "zone_spot8_contra": "For insertional Achilles tendinopathy, NEVER perform heel drops below floor level (causes severe calcaneal tuberosity compression). Load exclusively on a flat floor.",
    "err_spanish_squat_title": "Common Execution Errors in Spanish Squat",
    "err_spanish_squat_desc": "1. Squatting too deep (> 90°): Spikes patellofemoral compressive stress.\n2. Shins tilting forward: Loses the perpendicular strap tension, reducing patellar tendon offloading.\n3. Excessive backward torso lean compromising core bracing.",
    "cue_spanish_squat": "Keep shins completely vertical, sit back as if into a chair, brace quads firmly at 60° knee flexion, gaze straight ahead.",
    "err_calf_raise_title": "Common Execution Errors in Calf Raises",
    "err_calf_raise_desc": "1. Ballistic bouncing: Relies on passive Achilles tendon recoil instead of active tenocyte mechanotransduction.\n2. Ankle rolling outward (supination): Transfers force to outer toes, failing to load the medial gastroc/soleus.\n3. Dropping heel below floor level in insertional tendinopathy.",
    "cue_calf_raise": "Drive firmly through the ball of the big toe, lift heel in 3 seconds, pause at the apex for 1 second, lower under control in 3 seconds.",
    "err_split_squat_title": "Common Execution Errors in ATG Split Squat",
    "err_split_squat_desc": "1. Hyperextending lumbar spine to compensate for tight rear hip flexors.\n2. Lifting front heel prematurely before establishing mechanical balance (elevate heel or front foot on wedge if required).\n3. Incomplete forward knee travel failing to cover calf.",
    "cue_split_squat": "Maintain an upright torso like a pillar, descend until front hamstring completely covers calf, back leg extended straight with glute engaged.",
    "err_wall_er_title": "Common Execution Errors in Wall External Rotation",
    "err_wall_er_desc": "1. Flaring elbow away from ribs, violating the 30° scaption plane.\n2. Shrugging the upper trapezius instead of isolating the infraspinatus.\n3. Pushing excessively hard (> 80% MVC), causing muscular tremor and reactive flaring.",
    "cue_wall_er": "Pin a rolled towel between elbow and ribs, elbow flexed 90°, press back of wrist into wall at 70% MVC, breathe rhythmically for 45 seconds.",
    "err_mcgill_curlup_title": "Common Execution Errors in McGill Curl-Up",
    "err_mcgill_curlup_desc": "1. Excessive cervical flexion pulling chin to chest, straining anterior neck scalenes.\n2. Flattening the natural lumbar lordosis (losing support from hands placed beneath lumbar arch).\n3. Curling entire thoracic spine high off floor like a traditional crunch.",
    "cue_mcgill_curlup": "Hands resting under lumbar curve, hover head and shoulder blades only 2-3 cm off floor, brace abdominal wall as if bracing for a punch.",
    "err_birddog_title": "Common Execution Errors in Bird-Dog",
    "err_birddog_desc": "1. Rotating pelvis and hyperextending lower back during reach.\n2. Kicking back leg too high instead of reaching horizontally.\n3. Relaxing core cylinder, losing spinal neutral alignment.",
    "cue_birddog": "Imagine balancing a full glass of water on your lower back, reach opposite arm and leg away to touch imaginary walls, hold steady.",
    "err_rdl_title": "Common Execution Errors in Romanian Deadlift (RDL)",
    "err_rdl_desc": "1. Rounding lumbar spine during descent, generating high intervertebral shear.\n2. Allowing barbell/dumbbells to drift away from shins, increasing spinal load moment arm.\n3. Squatting with excessive knee bend instead of pure hip hinging.",
    "cue_rdl": "Keep weights skimming thighs and shins, push ischial tuberosities straight back, chest proud with rigid spine, reverse at end-range hamstring tension.",
    "err_copenhagen_title": "Common Execution Errors in Copenhagen Plank",
    "err_copenhagen_desc": "1. Hip sagging or forward torso rotation due to weak lateral core stabilizers.\n2. Starting with an excessively long lever (foot on bench) before adductors have adapted, risking groin tears.\n3. Holding breath during isometric contraction.",
    "cue_copenhagen": "Start with knee supported on bench (short lever), elevate hips into a straight diagonal line from shoulder to knee, breathe smoothly.",
    "err_pogo_title": "Common Execution Errors in Pogo Hops",
    "err_pogo_desc": "1. Bending knees deeply on landing, absorbing force through quads rather than ankle stiffness.\n2. Excessive ground contact time (> 250ms), blunting elastic energy return.\n3. Flat-footed or heel-first landings.",
    "cue_pogo": "Lock ankles into rigid springs, bounce exclusively off forefeet, minimize ground contact time, maintain near-straight knees.",
    "err_jefferson_title": "Common Execution Errors in Jefferson Curl",
    "err_jefferson_desc": "1. Using excessive load prematurely before posterior myofascial ligaments have adapted.\n2. Rushing or jerking instead of articulating vertebra by vertebra.\n3. Lack of pelvic rotation control.",
    "cue_jefferson": "Standing on box, tuck chin to chest first, roll down vertebra by vertebra through thoracic and lumbar spine, 4 seconds down, hold 1s, roll up slowly.",
    "postop_eval_heading": "AO Foundation Post-Surgical Clinical Evaluation & Prescription Engine",
    "postop_eval_sub": "Evaluate osteosynthesis stability, direct vs indirect healing mode, and generate an individualized progressive weight-bearing prescription tailored to post-op recovery milestones.",
    "postop_lbl_surgery": "1. Surgical Fixation or Joint Reconstruction Procedure:",
    "postop_opt_im_nail": "Interlocking Intramedullary Nail (IM Nail) - Femur / Tibia",
    "postop_opt_lcp_plate": "Locking Compression Plate (LCP / DCP) - Tibial Plateau, Ankle, Forearm",
    "postop_opt_tension_band": "Tension Band Wiring (TBW) - Patella / Olecranon",
    "postop_opt_acl_meniscus": "Arthroscopic ACL Reconstruction with Meniscal Repair",
    "postop_opt_rotator_cuff": "Arthroscopic Rotator Cuff Repair (Suture Bridge Anchors)",
    "postop_lbl_postop_time": "2. Time Elapsed Since Surgical Procedure:",
    "postop_opt_time_p1": "Early Stage (Weeks 0 - 2): Wound healing, hematoma envelope",
    "postop_opt_time_p2": "Subacute Stage (Weeks 2 - 6): Soft cartilaginous callus, early AAROM",
    "postop_opt_time_p3": "Hard Callus Stage (Weeks 6 - 12): Radiographic bony bridging, progressive FWB",
    "postop_opt_time_p4": "Remodeling Stage (Weeks 12 - 24+): Wolff's law trabecular reorientation",
    "postop_lbl_pain_swelling": "3. Incision Pain & Effusion Level (VAS Scale 0 - 10):",
    "postop_btn_evaluate": "Analyze & Generate AO Post-Op Loading Prescription",
    "postop_res_stability_lbl": "AO Biomechanical Stability Principle:",
    "postop_res_healing_mode_lbl": "Target Bone Healing Mode:",
    "postop_res_target_load_lbl": "Weight-Bearing Prescription (WB Rx):",
    "postop_res_rom_target_lbl": "Target Range of Motion (Target ROM):",
    "postop_res_clinical_actions_lbl": "Clinical Orders & Primary Exercises:",
    "postop_res_contra_lbl": "Strict Contraindications (Prevent Hardware Failure):"
  }
};

const DOTS = [
  { id: 'spot1', zone: 'shoulder', xpct: 62.62,  ypct: 9.481,  titleVi: 'Khớp Vai', titleEn: 'Shoulder' },
  { id: 'spot2', zone: 'core', xpct: 49.963, ypct: 18.481, titleVi: 'Sức Mạnh Tổng Thể', titleEn: 'General Strength' },
  { id: 'spot3', zone: 'elbow', xpct: 31.111, ypct: 24.681, titleVi: 'Khuỷu Tay', titleEn: 'Elbow' },
  { id: 'spot4', zone: 'lower_back', xpct: 49.963, ypct: 30.889, titleVi: 'Thắt Lưng & Cột Sống', titleEn: 'Lower Back' },
  { id: 'spot5', zone: 'wrist', xpct: 25.37,  ypct: 40.667, titleVi: 'Cổ Tay & Cẳng Tay', titleEn: 'Wrist' },
  { id: 'spot6', zone: 'hip', xpct: 58.75,  ypct: 40.667, titleVi: 'Khớp Háng', titleEn: 'Hip' },
  { id: 'spot7', zone: 'knee', xpct: 42.361, ypct: 66.281, titleVi: 'Khớp Gối', titleEn: 'Knee' },
  { id: 'spot8', zone: 'foot', xpct: 58.731, ypct: 88.874, titleVi: 'Bàn Chân & Gân Gót', titleEn: 'Foot, Ankle & Achilles' }
];

// Deep Clinical Mechanotherapy Exercise Data with 3 Biological Phases per Region
const EXERCISE_DATA = {
  spot1: {
    id: "spot1",
    zoneKey: "shoulder",
    titleVi: "Khớp Vai & Chóp Xoay (Rotator Cuff & Long Head of Biceps)",
    titleEn: "Shoulder & Rotator Cuff",
    pearlVi: "Gân cơ trên gai (Supraspinatus) dễ bị chèn ép dưới mỏm cùng vai. Bài tập gồng tĩnh xoay ngoài (Isometric) ở góc Scaption 30 độ làm giảm đau ngay lập tức qua cơ chế ức chế vỏ não (Rio et al. 2015), trước khi tái cấu trúc sợi bằng HSR.",
    pearlEn: "Supraspinatus tendon is prone to subacromial impingement. Isometric external rotation in 30° scaption delivers immediate analgesic relief via cortical inhibition before structural HSR remodeling.",
    pathologiesVi: ["Bệnh lý gân trên gai (Supraspinatus)", "Hội chứng chèn ép dưới mỏm cùng vai", "Viêm gân cơ nhị đầu đầu dài"],
    pathologiesEn: ["Supraspinatus tendinopathy", "Subacromial impingement syndrome", "Long head biceps tendinopathy"],
    biomechanicalRulesVi: "Tránh nạp tải ở góc dạng cánh tay > 60° kết hợp xoay trong. Nạp tải ở góc Scaption 30° với khớp ổ chảo cánh tay ở vị trí trung tính.",
    biomechanicalRulesEn: "Avoid loaded abduction > 60° with internal rotation (Neer/Hawkins impingement). Focus loading in 30° scapular plane with neutral rotation.",
    morningTest: {
      nameVi: "Nghiệm pháp Gồng xoay ngoài áp tường 30° Scaption",
      nameEn: "Single-Arm Wall External Rotation Hold in 30° Scaption",
      instructionVi: "Đứng cạnh tường, khuỷu tay gập 90° kẹp khăn mỏng sát sườn, gồng nhẹ xoay ngoài ép vào tường 10 giây. Đánh giá mức đau (VAS).",
      instructionEn: "Stand adjacent to a wall, elbow flexed to 90° with towel roll at ribcage, press outward into wall for 10s. Rate VAS pain."
    },
    p1: [
      {
        id: "shoulder_p1_ex1",
        name: "Isometric Wall External Rotation in 30° Scaption",
        nameVi: "Gồng Tĩnh Xoay Ngoài Khớp Vai Áp Tường (Góc Scaption 30°)",
        nameEn: "Isometric Wall External Rotation in 30° Scaption",
        reps: "5 hiệp x 45 giây giữ tĩnh (Tải 70% MVC, nghỉ 2 phút)",
        dosageVi: "5 hiệp x 45 giây giữ tĩnh, nghỉ 2 phút giữa hiệp",
        dosageEn: "5 sets x 45s sustained hold, 2 min rest between sets",
        intensity: "70% MVC (Co cơ đẳng trường tối đa có kiểm soát)",
        tempo: "Isometric 45s hold",
        rest: "120 giây (2 phút nghỉ phục hồi ATP)",
        frequencyVi: "Hàng ngày (1-2 lần/ngày, cách nhau >= 6 giờ)",
        frequencyEn: "Daily (1-2x per day, spaced >= 6 hours)",
        clinicalCitation: "Rio et al. 2015 (Br J Sports Med; PMID: 25979840)",
        clinicalRationaleVi: "Gồng tĩnh xoay ngoài ở góc 30° scaption kích hoạt cơ trên gai và dưới gai mà không chèn ép gân vào vòm cùng vai. Tạo cơ chế Cortical Inhibition Relief giúp cắt đứt đường truyền đau lên não bộ trong 45-60 phút.",
        clinicalRationaleEn: "Isometric external rotation at 30° scaption activates supraspinatus and infraspinatus without subacromial compressive contact. Induces immediate cortical inhibition relief for 45-60 minutes.",
        painRuleVi: "Đau VAS <= 3/10 trong lúc gồng là an toàn; bắt buộc phải trở về mức nền sau 24 giờ.",
        painRuleEn: "Pain VAS <= 3/10 during contraction is safe; MUST settle to baseline within 24 hours.",
        commonErrorsVi: [
          "Nhún vai lên phía tai (kích hoạt sai cơ thang trên thay vì chóp xoay).",
          "Gập hoặc xoay cổ tay để tì lực thay vì dùng toàn bộ cẳng tay ép phẳng.",
          "Nín thở làm tăng áp lực lồng ngực thay vì thở cơ hoành nhịp nhàng."
        ],
        commonErrorsEn: [
          "Shrugging shoulder toward ear (compensating with upper trapezius).",
          "Flexing or twisting wrist instead of applying flat forearm pressure.",
          "Holding breath and creating Valsalva strain instead of diaphragmatic breathing."
        ],
        regressionVi: "Hạ mức tải xuống 50% MVC hoặc giảm thời gian giữ xuống 25-30 giây.",
        regressionEn: "De-load to 50% MVC or reduce hold duration to 25-30 seconds.",
        progressionVi: "Nâng tải lên 75-80% MVC hoặc dùng dây kháng lực đàn hồi cao hơn.",
        progressionEn: "Increase intensity to 75-80% MVC or utilize thicker resistance band.",
        videoUrl: "https://www.youtube.com/watch?v=RrKFIVbS4co",
        localVideoRef: "04_Than_Kinh_Ngoai_Bien_&_Chuyen_Gan/04_06_Supraclavicular_Brachial_Plexus_Neurolysis.mp4",
        timestampCues: [
          { timeSec: 10, labelVi: "Tư thế chuẩn bị & kẹp khăn", labelEn: "Setup & Towel Placement" },
          { timeSec: 35, labelVi: "Kích hoạt lực ép 70% MVC", labelEn: "70% MVC Pre-Tensioning" },
          { timeSec: 75, labelVi: "Kiểm soát nhịp thở cơ hoành", labelEn: "Diaphragmatic Breathing" }
        ]
      },
      {
        id: "shoulder_p1_ex2",
        name: "Isometric Biceps & Anterior Glenohumeral Hold",
        nameVi: "Gồng Tĩnh Cơ Nhị Đầu Đầu Dài & Phức Hợp Ổ Chảo Trước",
        nameEn: "Isometric Long Head Biceps & Anterior Glenohumeral Hold",
        reps: "4 hiệp x 45 giây giữ tĩnh (Khuỷu tay gập 90°, cẳng tay ngửa)",
        dosageVi: "4 hiệp x 45 giây giữ tĩnh, nghỉ 2 phút giữa hiệp",
        dosageEn: "4 sets x 45s sustained hold, 2 min rest between sets",
        intensity: "70% MVC",
        tempo: "Isometric 45s hold",
        rest: "120 giây",
        frequencyVi: "Hàng ngày (1 lần/ngày)",
        frequencyEn: "Daily (1x per day)",
        clinicalCitation: "Rio et al. 2016 Tendon Neuroplastic Training (BJSM; PMID: 26405113)",
        clinicalRationaleVi: "Tải gân đầu dài cơ nhị đầu ở góc khuỷu 90 độ và vai duỗi nhẹ giúp ổn định chỏm xương cánh tay trong ổ chảo, giảm lực trượt ra trước.",
        clinicalRationaleEn: "Loading long head of biceps at 90° elbow flexion stabilizes humeral head in glenoid fossa, minimizing anterior translation shear.",
        painRuleVi: "Đau VAS <= 3/10; sáng hôm sau không tăng cứng khớp.",
        painRuleEn: "Pain VAS <= 3/10; no increase in morning stiffness.",
        commonErrorsVi: [
          "Đưa khuỷu tay trôi ra phía sau thân người quá mức.",
          "Xoay sấp cẳng tay làm mất tải trọng gân cơ nhị đầu.",
          "Gù lưng trên và nghiêng thân người sang một bên."
        ],
        commonErrorsEn: [
          "Allowing elbow to drift excessively behind the torso.",
          "Pronating forearm, which loses tension on the biceps tendon.",
          "Thoracic slouching or lateral trunk lean."
        ],
        regressionVi: "Thực hiện ở góc gập khuỷu 60 độ với lực gồng 50%.",
        regressionEn: "Perform at 60° elbow flexion with 50% effort.",
        progressionVi: "Nạp tạ tay đơn 4-6kg giữ tĩnh ở vị trí ngang ngực.",
        progressionEn: "Hold 4-6kg dumbbell statically at chest level.",
        videoUrl: "https://www.youtube.com/watch?v=yvPaq5JyBPg",
        localVideoRef: "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4",
        timestampCues: [
          { timeSec: 15, labelVi: "Góc khuỷu 90° chuẩn y khoa", labelEn: "Clinical 90° Elbow Alignment" },
          { timeSec: 45, labelVi: "Khóa chặt chỏm xương cánh tay", labelEn: "Humeral Head Stabilization" }
        ]
      }
    ],
    p2: [
      {
        id: "shoulder_p2_ex1",
        name: "Side-Lying Heavy Slow Dumbbell External Rotation (Tempo 3-1-3)",
        nameVi: "Xoay Ngoài Khớp Vai Nằm Nghiêng Kháng Lực Nặng Chậm (Nhịp 3-1-3)",
        nameEn: "Side-Lying Heavy Slow Dumbbell External Rotation (Tempo 3-1-3)",
        reps: "3-4 hiệp x 12 RM giảm dần về 8 RM (Hạ 3s, Dừng 1s, Nâng 3s)",
        dosageVi: "3-4 hiệp x 12 RM (Tuần 5-6) tiến dần về 8 RM (Tuần 7-8), nhịp 3-1-3",
        dosageEn: "3-4 sets x 12 RM (W5-6) progressing to 8 RM (W7-8), 3-1-3 tempo",
        intensity: "70-80% 1RM (12 RM đến 8 RM tải nặng)",
        tempo: "Tempo 3-1-3 (3s hạ, 1s dừng, 3s nâng; 7s TUT/lần)",
        rest: "120-180 giây giữa các hiệp",
        frequencyVi: "3 buổi/tuần (cách ngày, nghỉ 48 giờ để tổng hợp collagen)",
        frequencyEn: "3 sessions/week (non-consecutive days, 48h rest for collagen synthesis)",
        clinicalCitation: "Kongsgaard et al. 2009 (Scand J Med Sci Sports; PMID: 19793213)",
        clinicalRationaleVi: "Tải trọng HSR kích hoạt thụ cảm thể cơ học trên tế bào gân (Tenocyte Mechanotransduction), tăng cường phiên mã mRNA Procollagen Type I và làm dày diện tích mặt cắt ngang của gân chóp xoay.",
        clinicalRationaleEn: "HSR loading engages tenocyte integrins and mechanotransduction pathways, stimulating Type I Procollagen mRNA transcription and increasing rotator cuff tendon cross-sectional area.",
        painRuleVi: "Đau VAS <= 3/10 trong bài tập; bắt buộc trở về mức nền sau 24h.",
        painRuleEn: "Pain VAS <= 3/10 during exercise; must settle to baseline within 24h.",
        commonErrorsVi: [
          "Nhả tạ rơi tự do ở thì hạ (làm mất kích thích căng kéo eccentric quan trọng nhất).",
          "Lăn xương chậu hoặc lồng ngực ra sau để ăn gian lực nâng.",
          "Tăng tạ quá nhanh khiến không duy trì được đúng nhịp 3-1-3."
        ],
        commonErrorsEn: [
          "Dropping weight quickly on eccentric phase (losing essential mechanical strain).",
          "Rolling pelvis or torso backward to compensate for weakness.",
          "Increasing load prematurely at the expense of strict 3-1-3 cadence."
        ],
        regressionVi: "Tập với dây kháng lực nhẹ ở tư thế đứng hoặc tạ 1-2kg.",
        regressionEn: "Use light resistance tubing in standing position or 1-2kg dumbbell.",
        progressionVi: "Tăng tạ đạt mức 8 RM (tạ nặng kiểm soát hoàn hảo nhịp 3-1-3).",
        progressionEn: "Progress load to true 8 RM with textbook 3-1-3 tempo control.",
        videoUrl: "https://www.youtube.com/watch?v=yvPaq5JyBPg",
        localVideoRef: "04_Than_Kinh_Ngoai_Bien_&_Chuyen_Gan/04_06_Supraclavicular_Brachial_Plexus_Neurolysis.mp4",
        timestampCues: [
          { timeSec: 10, labelVi: "Tư thế nằm nghiêng kẹp khăn", labelEn: "Side-Lying Alignment" },
          { timeSec: 40, labelVi: "Đếm nhịp 3-1-3 (7 giây/lần)", labelEn: "3-1-3 Tempo Execution (7s TUT)" }
        ]
      },
      {
        id: "shoulder_p2_ex2",
        name: "Cable Scaption Full-Can Raise (Tempo 3-1-3)",
        nameVi: "Kéo Cáp Mặt Phẳng Scaption Ngón Cái Hướng Lên (Nhịp 3-1-3)",
        nameEn: "Cable Scaption Full-Can Raise in 30° Plane (Tempo 3-1-3)",
        reps: "3-4 hiệp x 10-12 lần (Tempo 3-1-3, tải 70-75% 1RM)",
        dosageVi: "3-4 hiệp x 10-12 lần, nhịp 3-1-3, nghỉ 2 phút",
        dosageEn: "3-4 sets x 10-12 reps, 3-1-3 tempo, 2 min rest",
        intensity: "70-75% 1RM",
        tempo: "Tempo 3-1-3",
        rest: "120 giây",
        frequencyVi: "3 buổi/tuần (cách ngày)",
        frequencyEn: "3 sessions/week (non-consecutive)",
        clinicalCitation: "Beyer et al. 2015 (Am J Sports Med; PMID: 26018970)",
        clinicalRationaleVi: "Mặt phẳng scaption (30 độ trước mặt phẳng trán) với ngón cái hướng lên giúp mở rộng tối đa khoang dưới mỏm cùng vai, kích hoạt tối đa cơ trên gai mà không gây chèn ép.",
        clinicalRationaleEn: "The scapular plane (30° anterior to frontal plane) with thumbs up maximizes subacromial space clearance while selectively recruiting supraspinatus without impingement.",
        painRuleVi: "Đau VAS <= 3/10; kiểm tra nghiệm pháp áp tường vào sáng hôm sau.",
        painRuleEn: "Pain VAS <= 3/10; confirm morning wall test at baseline.",
        commonErrorsVi: [
          "Nâng tay quá góc 90 độ (vào vùng chèn ép cơ học).",
          "Úp ngón cái xuống đất (Empty-can — tăng nguy cơ kẹt gân).",
          "Ưỡn lưng dưới để đẩy cáp lên."
        ],
        commonErrorsEn: [
          "Raising arm above 90° (entering mechanical impingement zone).",
          "Pointing thumb downward (Empty-can position — severe impingement risk).",
          "Arching lower back to hoist cable."
        ],
        regressionVi: "Nâng tay không tạ hoặc tạ tay 1kg trong mặt phẳng scaption.",
        regressionEn: "Bodyweight scaption raise or 1kg dumbbell.",
        progressionVi: "Tăng tải cáp trọng lượng và dừng 2 giây ở đỉnh vận động.",
        progressionEn: "Increase cable load with 2-second peak isometric pause.",
        videoUrl: "https://www.youtube.com/watch?v=PRFg1O8vtQI",
        localVideoRef: "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4",
        timestampCues: [
          { timeSec: 20, labelVi: "Xác định góc 30° scaption", labelEn: "Finding the 30° Plane" },
          { timeSec: 60, labelVi: "Tư thế Full-Can an toàn", labelEn: "Full-Can Thumb Up Cue" }
        ]
      }
    ],
    p3: [
      {
        id: "shoulder_p3_ex1",
        name: "Plyometric Medicine Ball Wall Rebound & Reactive Catch",
        nameVi: "Bật Ném & Đón Bóng Tạ Phản Xạ Đàn Hồi Áp Tường (Chu Kỳ SSC)",
        nameEn: "Plyometric Medicine Ball Wall Rebound & Reactive Catch (SSC Spring)",
        reps: "3 hiệp x 10-12 lần ném đàn hồi (Bóng tạ 2-3kg)",
        dosageVi: "3 hiệp x 10-12 lần ném phản xạ, nghỉ 90 giây",
        dosageEn: "3 sets x 10-12 reactive passes, 90s rest",
        intensity: "Tốc độ phát lực cao (High Rate of Force Development - RFD)",
        tempo: "Ballistic SSC (<250ms chuyển đổi co dãn)",
        rest: "90-120 giây",
        frequencyVi: "2-3 buổi/tuần (nghỉ 48-72 giờ giữa các buổi)",
        frequencyEn: "2-3 sessions/week (48-72h recovery between sessions)",
        clinicalCitation: "Cook & Purdam 2016 (Br J Sports Med; PMID: 27127294)",
        clinicalRationaleVi: "Tái tạo chu kỳ co giãn nhanh (Stretch-Shortening Cycle) và chức năng lò xo sinh học của gân chóp xoay để chịu được các hoạt động thể thao ném, đập bóng.",
        clinicalRationaleEn: "Restores stretch-shortening cycle (SSC) elastic recoil and biological spring capacity of rotator cuff tendons for overhead sports and high-rate tasks.",
        painRuleVi: "VAS <= 2/10 trong buổi tập; không được có độ trễ đau vào sáng hôm sau.",
        painRuleEn: "VAS <= 2/10 during session; zero delayed latent flare the following morning.",
        commonErrorsVi: [
          "Đón bóng thụ động để bóng đập giật ngược khớp vai.",
          "Mất độ siết cơ bụng khi ném bóng.",
          "Chọn bóng quá nặng làm mất tính phản xạ lò xo."
        ],
        commonErrorsEn: [
          "Passive catching causing sudden joint shock.",
          "Losing core brace during throws.",
          "Using too heavy a ball, sacrificing high-rate recoil mechanics."
        ],
        regressionVi: "Ném đón bóng tennis một tay ở cự ly gần.",
        regressionEn: "Single-arm tennis ball wall rebound at close distance.",
        progressionVi: "Ném bóng tạ 3-4kg từ tư thế quỳ một chân hoặc ném qua đầu.",
        progressionEn: "Half-kneeling 3-4kg rotational wall chest pass or overhead throw.",
        videoUrl: "https://www.youtube.com/watch?v=n3mLZHh5qOw",
        localVideoRef: "04_Than_Kinh_Ngoai_Bien_&_Chuyen_Gan/04_06_Supraclavicular_Brachial_Plexus_Neurolysis.mp4",
        timestampCues: [
          { timeSec: 10, labelVi: "Kỹ thuật hấp thu xung lực ném", labelEn: "Deceleration & Spring Recoil" },
          { timeSec: 45, labelVi: "Tốc độ phản xạ dưới 250ms", labelEn: "Sub-250ms Reactive Catch" }
        ]
      },
      {
        id: "shoulder_p3_ex2",
        name: "Shoulder CARs & 90/90 End-Range PAILs/RAILs (FRC & ATG Protocol)",
        nameVi: "Vận Động Xoay Khớp Vai Cực Hạn (CARs) & Co Cơ Góc Tận (PAILs/RAILs)",
        nameEn: "Shoulder CARs & 90/90 End-Range PAILs/RAILs (FRC & ATG Protocol)",
        reps: "CARs: 5 vòng xoay cực đại mỗi chiều; PAILs/RAILs: 2 hiệp x 15s nén cực hạn",
        dosageVi: "5 vòng xoay CARs chậm mỗi bên + 2 hiệp PAILs/RAILs góc 90/90",
        dosageEn: "5 slow CARs rotations per direction + 2 rounds PAILs/RAILs at 90/90",
        intensity: "80-100% Nội lực co cơ (Maximal Voluntary Irradiation)",
        tempo: "Chậm có kiểm soát thần kinh cơ tuyệt đối (10s/vòng CARs)",
        rest: "60-90 giây",
        frequencyVi: "Hàng ngày cho CARs; 2-3 lần/tuần cho PAILs/RAILs",
        frequencyEn: "Daily for CARs; 2-3x/week for PAILs/RAILs",
        clinicalCitation: "Spina A. 2014 (Functional Range Conditioning Framework)",
        clinicalRationaleVi: "Kích thích nguyên bào sợi tái định hướng collagen theo định luật Davis. Mở rộng biên độ vận động chủ động có sức mạnh kiểm soát tại góc tận cùng của khớp.",
        clinicalRationaleEn: "Stimulates fibroblast collagen realignment per Davis's Law. Expands usable active articular workspace and neuromuscular control at extreme capsular end-ranges.",
        painRuleVi: "Không có cảm giác kẹt khớp nhọn; chỉ có cảm giác căng cơ nội tại.",
        painRuleEn: "Zero sharp pinch; purely deep muscular irradiation tension.",
        commonErrorsVi: [
          "Ưỡn ngực hoặc xoay vặn thân mình để tạo biên độ giả tạo.",
          "Xoay quá nhanh không tạo đủ lực nén nội tại (Irradiation).",
          "Để chỏm vai nhô ra trước khi xoay ra sau."
        ],
        commonErrorsEn: [
          "Compensating through rib flare or thoracic rotation.",
          "Moving too fast without full-body irradiation tension.",
          "Anterior humeral head glide on extension."
        ],
        regressionVi: "Thực hiện CARs với 30% nội lực ở tư thế quỳ hoặc đứng dựa tường.",
        regressionEn: "Perform standing against wall with 30% irradiation.",
        progressionVi: "Cầm tạ chuông 2-4kg thực hiện PAILs/RAILs nhấc góc tận (Lift-Offs).",
        progressionEn: "Add 2-4kg kettlebell for active end-range lift-offs.",
        videoUrl: "https://www.youtube.com/watch?v=RrKFIVbS4co",
        localVideoRef: "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4",
        timestampCues: [
          { timeSec: 15, labelVi: "Khóa toàn bộ cơ thể (Irradiation)", labelEn: "Whole-Body Irradiation Lock" },
          { timeSec: 60, labelVi: "Quét biên độ tối đa không bù trừ", labelEn: "Pure Glenohumeral Rotation" }
        ]
      }
    ]
  },

  spot2: {
    id: "spot2",
    zoneKey: "core",
    titleVi: "Sức Mạnh Cốt Lõi & Toàn Thân (General Strength & Kinetic Spine Transmission)",
    titleEn: "General Strength & Core Resilience",
    pearlVi: "Xây dựng áp lực trong ổ bụng (Intra-abdominal Pressure) và độ cứng vững đa chiều của cơ thân mình theo mô hình 'dây chằng neo' của GS. Stuart McGill để bảo vệ cột sống và truyền lực toàn diện.",
    pearlEn: "Building intra-abdominal pressure and 3D guy-wire torso stiffness (McGill model) protects the intervertebral discs and efficiently transmits ground reaction force.",
    pathologiesVi: ["Mất vững trục thân mình", "Thiếu áp lực ổ bụng", "Phân tán lực chuỗi động học kém"],
    pathologiesEn: ["Lumbar core instability", "Poor intra-abdominal pressure", "Impaired kinetic chain load transmission"],
    biomechanicalRulesVi: "Không gập vặn cột sống thắt lưng tải nặng liên tục. Cột sống đóng vai trò ống truyền lực cứng vững; chuyển động xoay và gập dồn vào khớp háng và cột sống ngực.",
    biomechanicalRulesEn: "Avoid repetitive loaded spinal flexion and twisting. Lumbar spine acts as a rigid load-transmitting cylinder; mobility is concentrated in hips and thoracic spine.",
    morningTest: {
      nameVi: "Nghiệm pháp Gồng gập bụng McGill 8 giây",
      nameEn: "McGill Modified Curl-Up 8-Second Hold",
      instructionVi: "Nằm ngửa, một gối co một gối duỗi, hai tay luồn dưới thắt lưng, nhấc nhẹ đầu và vai 2cm khỏi sàn giữ 8 giây. Đánh giá đau lưng.",
      instructionEn: "Supine with one knee bent, hands supporting lumbar lordosis, hover head/shoulders 2cm off floor for 8s. Rate back discomfort."
    },
    p1: [
      {
        id: "core_p1_ex1",
        name: "McGill Modified Curl-Up (Spine Sparing Protocol)",
        nameVi: "Gập Bụng McGill Cải Tiến Bảo Tồn Đĩa Đệm",
        nameEn: "McGill Modified Curl-Up (Spine Sparing Protocol)",
        reps: "Kim tự tháp giảm dần (5-3-1 lần giữ 8 giây mỗi lần)",
        dosageVi: "Kim tự tháp 5-3-1 lần giữ 8 giây, nghỉ 2 giây giữa lần gồng",
        dosageEn: "Descending pyramid: 5-3-1 reps of 8s holds, 2s breath reset",
        intensity: "70% Co cứng cơ bụng đẳng trường",
        tempo: "Isometric 8s hold",
        rest: "60-90 giây giữa các đợt",
        frequencyVi: "Hàng ngày (1-2 lần/ngày)",
        frequencyEn: "Daily (1-2x per day)",
        clinicalCitation: "McGill SM 2015 (Low Back Disorders 3rd ed; Human Kinetics)",
        clinicalRationaleVi: "Kích hoạt cơ thẳng bụng và cơ chéo bụng mà không làm uốn cong cột sống thắt lưng, giữ tải trọng nén và cắt lên đĩa đệm ở mức tối thiểu tuyệt đối.",
        clinicalRationaleEn: "Activates rectus abdominis and obliques without lumbar flexion, maintaining disc compression and shear forces at minimal levels.",
        painRuleVi: "Hoàn toàn không được có cảm giác nhói hay tê giật xuống mông/chân.",
        painRuleEn: "Zero sharp ache or radicular tingling into glutes/legs.",
        commonErrorsVi: [
          "Gập cổ quá đà nhìn về rốn (phải khóa cổ và cằm như ngậm quả trứng).",
          "Nâng toàn bộ lưng trên lên khỏi sàn thay vì chỉ nhấc 2cm.",
          "Ấn phẳng thắt lưng xuống sàn làm mất độ ưỡn sinh lý tự nhiên."
        ],
        commonErrorsEn: [
          "Cervical craning (chin must remain packed).",
          "Lifting entire upper back off floor instead of hovering 2cm.",
          "Flattening lumbar lordosis into floor."
        ],
        regressionVi: "Chỉ nhấc đầu 1cm trong 4-5 giây với hai gối cùng co.",
        regressionEn: "Hover head 1cm for 4-5s with both knees bent.",
        progressionVi: "Nhấc hai khuỷu tay lên khỏi sàn đồng thời gồng cơ bụng.",
        progressionEn: "Hover both elbows off floor during hold to eliminate arm support.",
        videoUrl: "https://www.youtube.com/watch?v=b4Gd3VSdzyg",
        localVideoRef: "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4",
        timestampCues: [
          { timeSec: 10, labelVi: "Tư thế đặt tay dưới thắt lưng", labelEn: "Lumbar Hand Placement" },
          { timeSec: 30, labelVi: "Nhấc nhẹ vai 2cm & khóa cằm", labelEn: "2cm Shoulder Hover & Chin Pack" }
        ]
      },
      {
        id: "core_p1_ex2",
        name: "Isometric Pallof Press Anti-Rotation Hold",
        nameVi: "Gồng Tĩnh Kháng Lực Xoay Pallof Press",
        nameEn: "Isometric Pallof Press Anti-Rotation Hold",
        reps: "4 hiệp x 30-45 giây giữ tĩnh mỗi bên",
        dosageVi: "4 hiệp x 30-45 giây giữ tĩnh mỗi bên, nghỉ 60 giây",
        dosageEn: "4 sets x 30-45s hold per side, 60s rest",
        intensity: "70% MVC kháng mô-men xoay",
        tempo: "Isometric 30-45s",
        rest: "60 giây",
        frequencyVi: "Hàng ngày hoặc 4-5 buổi/tuần",
        frequencyEn: "Daily or 4-5 sessions/week",
        clinicalCitation: "McGill SM 2010 (Strength & Conditioning Journal; 32(3):33-46)",
        clinicalRationaleVi: "Huấn luyện cơ chéo bụng và cơ ngang bụng chống lại mô-men xoắn ngoài, tạo độ cứng trục bảo vệ rễ thần kinh.",
        clinicalRationaleEn: "Conditions obliques and transversus abdominis to resist external rotational torque, establishing torso stiffness.",
        painRuleVi: "Đau VAS <= 2/10; cột sống giữ thẳng tuyệt đối.",
        painRuleEn: "Pain VAS <= 2/10; spine perfectly vertical.",
        commonErrorsVi: [
          "Để dây cáp kéo xoay vai và hông về phía điểm neo.",
          "Đứng lệch trọng tâm hoặc khóa cứng hai khớp gối.",
          "Nín thở thay vì duy trì hít thở cơ hoành liên tục."
        ],
        commonErrorsEn: [
          "Allowing cable to rotate shoulders/pelvis toward anchor.",
          "Uneven weight distribution or hyperextended knees.",
          "Holding breath instead of diaphragmatic breathing."
        ],
        regressionVi: "Đưa tay về sát ngực thay vì duỗi thẳng cánh tay ra trước.",
        regressionEn: "Keep hands close to sternum instead of extending arms.",
        progressionVi: "Thực hiện ở tư thế quỳ một chân (Half-kneeling) hoặc quỳ hai gối.",
        progressionEn: "Progress to half-kneeling or tall-kneeling Pallof hold.",
        videoUrl: "https://www.youtube.com/watch?v=zAmvxveQcHw",
        localVideoRef: "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4",
        timestampCues: [
          { timeSec: 15, labelVi: "Khoảng cách cáp & tư thế đứng", labelEn: "Cable Distance & Stance" },
          { timeSec: 40, labelVi: "Khóa thẳng hai tay chống xoay", labelEn: "Anti-Rotation Extension Lock" }
        ]
      }
    ],
    p2: [
      {
        id: "core_p2_ex1",
        name: "Unilateral Heavy Suitcase Carry (Tempo 3-1-3 Cadence)",
        nameVi: "Xách Tạ Đơn Lệch Bên Kháng Nghiêng Cột Sống (Suitcase Carry, Nhịp 3-1-3)",
        nameEn: "Unilateral Heavy Suitcase Carry (Tempo 3-1-3 Cadence)",
        reps: "4 hiệp x 40 bước chân nhịp chậm 3-1-3 mỗi bên",
        dosageVi: "4 hiệp x 40 bước chân (Tempo 3-1-3 / 3s/bước), nghỉ 90s",
        dosageEn: "4 sets x 40 deliberate paces per side (Tempo 3-1-3 cadence), 90s rest",
        intensity: "75-80% Sức tải (Tạ nặng thử thách độ thẳng cột sống)",
        tempo: "Tempo 3-1-3 (Bước chậm 3 giây kiểm soát từng bước)",
        rest: "90 giây",
        frequencyVi: "3 buổi/tuần (cách ngày)",
        frequencyEn: "3 sessions/week (non-consecutive)",
        clinicalCitation: "McGill SM 2015 (Low Back Disorders; Human Kinetics)",
        clinicalRationaleVi: "Kích hoạt tối đa cơ vuông thắt lưng (Quadratus Lumborum) và cơ mông nhỡ bên đối diện để giữ cột sống thẳng đứng dưới tải lệch tâm.",
        clinicalRationaleEn: "Maximally activates contralateral quadratus lumborum and gluteus medius to lock the spine vertical under asymmetric offset loading.",
        painRuleVi: "VAS <= 2/10; tuyệt đối không để cột sống bị kéo nghiêng.",
        painRuleEn: "VAS <= 2/10; zero lateral spinal deviation.",
        commonErrorsVi: [
          "Thân người bị nghiêng vẹo theo hướng tạ kéo.",
          "Bước đi quá nhanh làm mất tính kiểm soát ổn định khớp.",
          "Để tạ đập vào đùi khi di chuyển."
        ],
        commonErrorsEn: [
          "Lateral trunk lean toward weight.",
          "Rushing paces, sacrificing dynamic spinal stiffness.",
          "Bumping weight against lateral thigh."
        ],
        regressionVi: "Giảm trọng lượng tạ hoặc bước đi tại chỗ có kiểm soát.",
        regressionEn: "Reduce load or perform march-in-place with high knee.",
        progressionVi: "Tăng tải lên 30-40% trọng lượng cơ thể mỗi bên.",
        progressionEn: "Progress load to 30-40% of bodyweight.",
        videoUrl: "https://www.youtube.com/watch?v=zAmvxveQcHw",
        localVideoRef: "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4",
        timestampCues: [
          { timeSec: 15, labelVi: "Căn chỉnh cột sống thẳng đứng", labelEn: "Vertical Spine Alignment" },
          { timeSec: 45, labelVi: "Nhịp bước chân chậm 3-1-3", labelEn: "3-1-3 Controlled Step Cadence" }
        ]
      },
      {
        id: "core_p2_ex2",
        name: "Swiss Ball Stir-the-Pot (Tempo 3-1-3 per Circle)",
        nameVi: "Khuấy Nồi Trên Bóng Yoga Kháng Lực Chậm (Stir-the-Pot, Nhịp 3-1-3)",
        nameEn: "Swiss Ball Stir-the-Pot (Tempo 3-1-3 per Circle)",
        reps: "3 hiệp x 8 vòng xuôi, 8 vòng ngược (Nhịp 3-1-3)",
        dosageVi: "3 hiệp x 8 vòng mỗi chiều (Tempo 3-1-3), nghỉ 90s",
        dosageEn: "3 sets x 8 circles clockwise & counter-clockwise (Tempo 3-1-3), 90s rest",
        intensity: "75% Mức gắng sức ổn định thân mình",
        tempo: "Tempo 3-1-3 (3 giây mỗi vòng tròn xoay kiểm soát)",
        rest: "90 giây",
        frequencyVi: "3 buổi/tuần",
        frequencyEn: "3 sessions/week",
        clinicalCitation: "McGill SM 2010 (Strength & Conditioning Journal)",
        clinicalRationaleVi: "Tạo thách thức bất ổn định đa hướng lên cơ lõi trong khi cột sống thắt lưng được khóa hoàn toàn ở vị trí trung tính.",
        clinicalRationaleEn: "Generates multi-directional perturbation challenges across anterior core while keeping lumbar spine locked in neutral.",
        painRuleVi: "VAS <= 2/10; không võng lưng hay lắc hông.",
        painRuleEn: "VAS <= 2/10; no lumbar extension or hip waggle.",
        commonErrorsVi: [
          "Võng thắt lưng khi xoay bóng ra xa.",
          "Lắc lư xương chậu theo vòng xoay của cánh tay.",
          "Thụt vai vào cổ."
        ],
        commonErrorsEn: [
          "Lumbar sagging as ball extends forward.",
          "Pelvic swaying in rhythm with arm circles.",
          "Collapsing shoulders into neck."
        ],
        regressionVi: "Thực hiện ở tư thế quỳ hai gối trên thảm.",
        regressionEn: "Perform in kneeling position on mat.",
        progressionVi: "Khép hai chân lại gần nhau hoặc tăng bán kính vòng xoay.",
        progressionEn: "Narrow stance or enlarge circle radius.",
        videoUrl: "https://www.youtube.com/watch?v=4-ee5oKxrnY",
        localVideoRef: "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4",
        timestampCues: [
          { timeSec: 10, labelVi: "Tư thế plank chuẩn trên bóng", labelEn: "Plank Alignment on Ball" },
          { timeSec: 35, labelVi: "Kỹ thuật vẽ vòng tròn nhịp 3-1-3", labelEn: "3-1-3 Circular Stirring Technique" }
        ]
      }
    ],
    p3: [
      {
        id: "core_p3_ex1",
        name: "Rotational Medicine Ball Scoop Toss against Concrete Wall",
        nameVi: "Ném Bóng Tạ Bùng Nổ Xoay Hông Áp Tường (Chu Kỳ SSC)",
        nameEn: "Rotational Medicine Ball Scoop Toss against Concrete Wall (SSC Power)",
        reps: "3 hiệp x 6 lần ném bùng nổ mỗi bên (Bóng 3-4kg)",
        dosageVi: "3 hiệp x 6 lần bùng nổ mỗi bên, nghỉ 90-120s",
        dosageEn: "3 sets x 6 explosive reps per side, 90-120s rest",
        intensity: "100% Tốc độ phát lực (Explosive Rate of Force Development)",
        tempo: "Ballistic SSC (<250ms chuyển đổi co dãn hông)",
        rest: "90-120 giây",
        frequencyVi: "2 buổi/tuần (cách nhau >= 72 giờ)",
        frequencyEn: "2 sessions/week (>= 72h recovery)",
        clinicalCitation: "Cook & Purdam 2016 (Br J Sports Med; PMID: 27127294)",
        clinicalRationaleVi: "Huấn luyện khả năng truyền năng lượng đàn hồi từ chân qua khớp háng và thân mình mà không để cột sống thắt lưng bị vặn xoắn quá mức.",
        clinicalRationaleEn: "Develops elastic power transfer from lower body through hips and core while maintaining lumbar stiffness.",
        painRuleVi: "VAS <= 2/10; hồi phục hoàn toàn không đau lưng vào sáng hôm sau.",
        painRuleEn: "VAS <= 2/10; fully pain-free lumbar spine next morning.",
        commonErrorsVi: [
          "Dùng tay để ném thay vì dùng lực xoay hông và mông.",
          "Xoay vặn cột sống thắt lưng thay vì xoay qua khớp háng.",
          "Mất thăng bằng sau khi bóng rời tay."
        ],
        commonErrorsEn: [
          "Arm-throwing instead of hip drive.",
          "Twisting lumbar spine instead of pivoting through hips.",
          "Loss of footing following release."
        ],
        regressionVi: "Ném bóng nhẹ 2kg từ tư thế quỳ một chân có kiểm soát.",
        regressionEn: "Half-kneeling 2kg medicine ball toss.",
        progressionVi: "Bóng 5kg ném kèm bước chuyển chân bùng nổ (Pivoting).",
        progressionEn: "5kg ball with explosive stepping pivot.",
        videoUrl: "https://www.youtube.com/watch?v=zAmvxveQcHw",
        localVideoRef: "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4",
        timestampCues: [
          { timeSec: 10, labelVi: "Khóa hông tạo thế lò xo", labelEn: "Hip Spring Pre-Load" },
          { timeSec: 35, labelVi: "Phát lực xoay bùng nổ", labelEn: "Explosive Rotational Release" }
        ]
      },
      {
        id: "core_p3_ex2",
        name: "Standing Segmental Spinal Cat-Camel CARs (FRC Framework)",
        nameVi: "Vận Động Từng Đốt Cột Sống Có Kiểm Soát (Cat-Camel CARs)",
        nameEn: "Standing Segmental Spinal Cat-Camel CARs (FRC Framework)",
        reps: "5 lần cuộn uốn từng đốt sống chậm (15s/lần)",
        dosageVi: "5 lần cuộn uốn chậm từng đốt từ cùng cụt lên cổ, 15s/lần",
        dosageEn: "5 slow segmented repetitions from sacrum to cervical, 15s/rep",
        intensity: "80% Nội lực co thắt phân đoạn",
        tempo: "Chậm 15 giây kiểm soát từng đốt sống",
        rest: "60 giây",
        frequencyVi: "Hàng ngày",
        frequencyEn: "Daily",
        clinicalCitation: "Spina A. 2014 (Functional Anatomy Seminars)",
        clinicalRationaleVi: "Tái kích hoạt khả năng phân tách vận động (motor dissociation) của các cơ nhiều nhánh (Multifidus) và phục hồi dinh dưỡng đĩa đệm.",
        clinicalRationaleEn: "Re-establishes segmental motor dissociation of multifidus and enhances intervertebral disc fluid dynamics.",
        painRuleVi: "Không có cảm giác kẹt khớp nhọn; chỉ có cảm giác cơ bắp hoạt động.",
        painRuleEn: "Zero sharp impingement; pure segmental muscular recruitment.",
        commonErrorsVi: [
          "Chuyển động thành một khối cứng đơ thay vì từng đốt.",
          "Dùng cổ và đầu giật mạnh để bù cho thắt lưng.",
          "Nín thở khi đang uốn cột sống."
        ],
        commonErrorsEn: [
          "Moving spine in a stiff hinge block instead of vertebra by vertebra.",
          "Cervical jerking to compensate for lumbar stiffness.",
          "Holding breath during spinal articulation."
        ],
        regressionVi: "Thực hiện ở tư thế bò 4 điểm (Quadruped) có gương hỗ trợ.",
        regressionEn: "Quadruped 4-point stance with visual mirror feedback.",
        progressionVi: "Thực hiện ở tư thế đứng với tay vươn trần (Standing CARs).",
        progressionEn: "Standing spinal CARs with overhead reach.",
        videoUrl: "https://www.youtube.com/watch?v=b4Gd3VSdzyg",
        localVideoRef: "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4",
        timestampCues: [
          { timeSec: 10, labelVi: "Tách chuyển động vùng xương cùng", labelEn: "Sacral Articulation Initiation" },
          { timeSec: 40, labelVi: "Uốn từng đốt lên cột sống ngực", labelEn: "Thoracic Segmental Wave" }
        ]
      }
    ]
  },

  spot3: {
    id: "spot3",
    zoneKey: "elbow",
    titleVi: "Khuỷu Tay & Lồi Cầu (Tennis & Golfer's Epicondylalgia)",
    titleEn: "Elbow & Epicondylalgia",
    pearlVi: "Viêm lồi cầu ngoài (Tennis Elbow - ECRB) hoặc trong (Golfer's Elbow) là bệnh lý gân kinh điển. Gồng tĩnh cơ duỗi cổ tay và cơ cánh tay quay (Brachialis) 45s làm tê liệt dẫn truyền đau trước khi tái cấu trúc sợi bằng HSR.",
    pearlEn: "Lateral and medial epicondylalgia respond dramatically to wrist extensor and brachialis isometric holds for cortical analgesia before heavy eccentric remodeling.",
    pathologiesVi: ["Viêm lồi cầu ngoài (Tennis Elbow - gân ECRB)", "Viêm lồi cầu trong (Golfer Elbow)", "Viêm gân cơ cánh tay trước"],
    pathologiesEn: ["Lateral epicondylalgia (Tennis elbow - ECRB)", "Medial epicondylalgia (Golfer elbow)", "Brachialis tendinopathy"],
    biomechanicalRulesVi: "Tránh kéo giãn thụ động gập cổ tay hết biên độ kèm duỗi thẳng khuỷu tay trong GĐ 1 (gây chèn ép gân vào mỏm lồi cầu). Nạp tải ở tư thế cẳng tay có điểm tựa.",
    biomechanicalRulesEn: "Avoid passive end-range wrist flexion with locked elbow in Phase 1 (compresses tendon insertion). Load in supported neutral angles.",
    morningTest: {
      nameVi: "Nghiệm pháp Gồng duỗi cổ tay có đỡ 30 giây",
      nameEn: "Supported Wrist Extension 30s Hold with Light Weight",
      instructionVi: "Đặt cẳng tay lên bàn, cổ tay hơi ngửa 20-30°, cầm tạ nhẹ 1-2kg giữ tĩnh 30 giây. Đánh giá đau mỏm lồi cầu.",
      instructionEn: "Rest forearm on table, wrist in 20-30° extension holding 1-2kg dumbbell for 30s. Rate epicondylar pain."
    },
    p1: [
      {
        id: "elbow_p1_ex1",
        name: "Supported Isometric Wrist Extension Press (ECRB Tendon Loading)",
        nameVi: "Gồng Tĩnh Cơ Duỗi Cổ Tay Có Đỡ (Gân ECRB - Giảm Đau Cấp)",
        nameEn: "Supported Isometric Wrist Extension Press (ECRB Tendon Loading)",
        reps: "5 hiệp x 45 giây giữ tĩnh (Tải 70% MVC, cổ tay ngửa 25°)",
        dosageVi: "5 hiệp x 45 giây giữ tĩnh, nghỉ 2 phút giữa hiệp",
        dosageEn: "5 sets x 45s sustained hold, 2 min rest between sets",
        intensity: "70% MVC",
        tempo: "Isometric 45s hold",
        rest: "120 giây",
        frequencyVi: "Hàng ngày (1-2 lần/ngày)",
        frequencyEn: "Daily (1-2x per day)",
        clinicalCitation: "Rio et al. 2015 (Br J Sports Med; PMID: 25979840)",
        clinicalRationaleVi: "Gồng tĩnh cơ duỗi cổ tay quay ngắn (ECRB) ở góc duỗi 20-30 độ làm giảm áp lực chèn ép mỏm lồi cầu ngoài, ức chế tín hiệu đau qua thần kinh trung ương.",
        clinicalRationaleEn: "Isometric ECRB contraction at 20-30° wrist extension minimizes compressive enthesis contact while modulating spinal and cortical pain thresholds.",
        painRuleVi: "Đau VAS <= 3/10; bắt buộc hồi phục về ban đầu sau 24 giờ.",
        painRuleEn: "Pain VAS <= 3/10; must return to baseline within 24h.",
        commonErrorsVi: [
          "Nhấc cẳng tay hoặc khuỷu tay rời khỏi mặt bàn.",
          "Thả lỏng cổ tay để rơi vào tư thế gập (mất vị trí duỗi 25°).",
          "Dùng ngón tay co quắp thay vì cơ duỗi cổ tay."
        ],
        commonErrorsEn: [
          "Lifting forearm off supporting table.",
          "Allowing wrist to drop into flexion.",
          "Gripping tightly with fingers rather than locking wrist extensors."
        ],
        regressionVi: "Gồng tĩnh không dùng tạ ngoài, chỉ ép lòng bàn tay đối diện.",
        regressionEn: "Manual unweighted isometric press with opposite hand.",
        progressionVi: "Cầm tạ đơn 2-3kg giữ tĩnh với cánh tay duỗi thẳng hơn.",
        progressionEn: "2-3kg dumbbell hold with progressively extended elbow.",
        videoUrl: "https://www.youtube.com/watch?v=UEFX85jM784",
        localVideoRef: "04_Than_Kinh_Ngoai_Bien_&_Chuyen_Gan/04_05_Cubital_Tunnel_Ulnar_Nerve_Decompression.mp4",
        timestampCues: [
          { timeSec: 10, labelVi: "Tư thế cẳng tay trên mặt bàn", labelEn: "Forearm Table Placement" },
          { timeSec: 35, labelVi: "Góc duỗi cổ tay 25° chuẩn", labelEn: "25° Extension Lock" }
        ]
      },
      {
        id: "elbow_p1_ex2",
        name: "Isometric Brachialis Hold at 90° Elbow Flexion",
        nameVi: "Gồng Tĩnh Cơ Cánh Tay Trước (Brachialis) Góc 90 Độ",
        nameEn: "Isometric Brachialis Hold at 90° Elbow Flexion",
        reps: "4 hiệp x 30-45 giây giữ tĩnh mỗi bên",
        dosageVi: "4 hiệp x 30-45 giây giữ tĩnh, nghỉ 90s",
        dosageEn: "4 sets x 30-45s hold per side, 90s rest",
        intensity: "70% MVC",
        tempo: "Isometric 45s",
        rest: "90-120 giây",
        frequencyVi: "Hàng ngày",
        frequencyEn: "Daily",
        clinicalCitation: "Rio et al. 2016 (BJSM; PMID: 26405113)",
        clinicalRationaleVi: "Cô lập cơ Brachialis ở tư thế cẳng tay trung tính giúp giảm tải cho khớp khuỷu và gân cơ nhị đầu.",
        clinicalRationaleEn: "Isolates brachialis in neutral forearm rotation to offload epicondylar flexor/extensor origins.",
        painRuleVi: "Đau VAS <= 3/10; không đau nhói vùng gân.",
        painRuleEn: "Pain VAS <= 3/10; zero sharp focal tendinous ache.",
        commonErrorsVi: [
          "Xoay ngửa cẳng tay quá mức làm chuyển tải sang cơ nhị đầu.",
          "Gù lưng và đưa khuỷu tay ra sau.",
          "Gập cổ tay để bù trừ."
        ],
        commonErrorsEn: [
          "Excessive forearm supination transferring load to biceps.",
          "Shoulder retraction compensation.",
          "Wrist flexion cheating."
        ],
        regressionVi: "Thực hiện ở góc 60 độ với 50% lực gồng.",
        regressionEn: "Perform at 60° angle with 50% MVC.",
        progressionVi: "Cầm tạ tay 4-6kg giữ tĩnh tư thế búa (Hammer hold).",
        progressionEn: "Hold 4-6kg dumbbell in static hammer position.",
        videoUrl: "https://www.youtube.com/watch?v=UPMii4RtfkI",
        localVideoRef: "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4",
        timestampCues: [
          { timeSec: 10, labelVi: "Khóa góc khuỷu 90°", labelEn: "90° Angle Lock" },
          { timeSec: 35, labelVi: "Gồng tĩnh cơ Brachialis", labelEn: "Brachialis Activation" }
        ]
      }
    ],
    p2: [
      {
        id: "elbow_p2_ex1",
        name: "Heavy Slow Dumbbell Wrist Extension (Tempo 3-1-3)",
        nameVi: "Duỗi Cổ Tay Tạ Đơn Kháng Lực Nặng Chậm (Nhịp 3-1-3)",
        nameEn: "Heavy Slow Dumbbell Wrist Extension (Tempo 3-1-3)",
        reps: "3-4 hiệp x 15 RM giảm dần về 8 RM (Hạ 3s, Dừng 1s, Nâng 3s)",
        dosageVi: "3-4 hiệp x 12-8 RM, nhịp 3-1-3, nghỉ 2 phút",
        dosageEn: "3-4 sets x 12-8 RM, 3-1-3 tempo, 2 min rest",
        intensity: "70-80% 1RM (Tải nặng kích thích cơ học)",
        tempo: "Tempo 3-1-3 (7s TUT/lần)",
        rest: "120 giây",
        frequencyVi: "3 buổi/tuần (cách ngày, nghỉ 48h)",
        frequencyEn: "3 sessions/week (non-consecutive, 48h rest)",
        clinicalCitation: "Beyer et al. 2015 (Am J Sports Med; PMID: 26018970)",
        clinicalRationaleVi: "Kích thích quá trình tổng hợp sợi Collagen Type I bền vững và ức chế các mạch máu tân sinh bệnh lý (Neovascularization) tại điểm bám lồi cầu ngoài.",
        clinicalRationaleEn: "Drives Type I collagen matrix synthesis and blunts pathological neovascularization at lateral epicondyle insertion.",
        painRuleVi: "Đau VAS <= 3/10; bắt buộc hồi phục về ban đầu sau 24h.",
        painRuleEn: "Pain VAS <= 3/10; must settle to baseline within 24h.",
        commonErrorsVi: [
          "Hạ tạ quá nhanh làm mất kích thích kéo dãn eccentric.",
          "Dùng ngón tay cuộn tạ thay vì chuyển động từ khớp cổ tay.",
          "Nhấc khuỷu tay khỏi bàn để lấy đà."
        ],
        commonErrorsEn: [
          "Dropping weight quickly on eccentric descent.",
          "Rolling weight through fingers rather than articulating wrist joint.",
          "Lifting elbow off bench."
        ],
        regressionVi: "Dùng tạ 1kg hoặc dây kháng lực hỗ trợ thì nâng.",
        regressionEn: "Use 1kg dumbbell or band-assisted concentric phase.",
        progressionVi: "Tăng tạ lên 8 RM và dừng 2 giây ở vị trí duỗi cực đại.",
        progressionEn: "Progress to 8 RM with 2-second peak isometric hold.",
        videoUrl: "https://www.youtube.com/watch?v=thZOqkrRAbo",
        localVideoRef: "04_Than_Kinh_Ngoai_Bien_&_Chuyen_Gan/04_05_Cubital_Tunnel_Ulnar_Nerve_Decompression.mp4",
        timestampCues: [
          { timeSec: 15, labelVi: "Đếm nhịp 3s hạ - 1s dừng - 3s nâng", labelEn: "3-1-3 Cadence Breakdown" },
          { timeSec: 45, labelVi: "Kiểm soát thì Eccentric hạ tạ", labelEn: "Eccentric Strain Control" }
        ]
      },
      {
        id: "elbow_p2_ex2",
        name: "Neutral-Grip Dumbbell Hammer Curl (Tempo 3-1-3)",
        nameVi: "Cuốn Tạ Đơn Tư Thế Cầm Búa Nhịp Chậm (Hammer Curl)",
        nameEn: "Neutral-Grip Dumbbell Hammer Curl (Tempo 3-1-3)",
        reps: "3 hiệp x 8-10 lần (Tempo 3-1-3)",
        dosageVi: "3 hiệp x 8-10 lần, nhịp 3-1-3, nghỉ 90s",
        dosageEn: "3 sets x 8-10 reps, 3-1-3 tempo, 90s rest",
        intensity: "75% 1RM",
        tempo: "Tempo 3-1-3",
        rest: "90-120 giây",
        frequencyVi: "3 buổi/tuần",
        frequencyEn: "3 sessions/week",
        clinicalCitation: "Kongsgaard et al. 2009 (Scand J Med Sci Sports)",
        clinicalRationaleVi: "Huấn luyện phối hợp cơ cánh tay quay (Brachioradialis) và cơ cánh tay trước, giảm tải lực cắt cho khớp khuỷu.",
        clinicalRationaleEn: "Strengthens brachioradialis and brachialis matrix, dissipating joint shear across humeroulnar joint.",
        painRuleVi: "Đau VAS <= 3/10; sáng hôm sau không tăng cứng khớp.",
        painRuleEn: "Pain VAS <= 3/10; no next-morning flare.",
        commonErrorsVi: [
          "Đung đưa thân mình lấy đà nâng tạ.",
          "Đưa khuỷu tay trôi ra trước.",
          "Hạ tạ rơi tự do."
        ],
        commonErrorsEn: [
          "Torso momentum swing.",
          "Anterior elbow flare.",
          "Free-fall eccentric drop."
        ],
        regressionVi: "Thực hiện ở tư thế ngồi tựa lưng có điểm tựa khuỷu tay.",
        regressionEn: "Seated preacher or back-supported hammer curl.",
        progressionVi: "Tăng tạ lên mức 8 RM và dừng 1s ở góc 90 độ.",
        progressionEn: "Progress to 8 RM with 1s pause at 90°.",
        videoUrl: "https://www.youtube.com/watch?v=thZOqkrRAbo",
        localVideoRef: "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4",
        timestampCues: [
          { timeSec: 10, labelVi: "Tư thế cầm búa trung tính", labelEn: "Neutral Hammer Grip" },
          { timeSec: 40, labelVi: "Kiểm soát hạ 3 giây", labelEn: "3s Lowering Phase" }
        ]
      }
    ],
    p3: [
      {
        id: "elbow_p3_ex1",
        name: "Rapid Reactive Ball Catch & Wrist Deceleration (SSC Recoil)",
        nameVi: "Thả & Chụp Bóng Nhanh Phản Xạ Cổ Tay (Chu Kỳ Lò Xo SSC)",
        nameEn: "Rapid Reactive Ball Catch & Wrist Deceleration (SSC Recoil)",
        reps: "3 hiệp x 15 lần chụp bóng phản xạ mỗi tay",
        dosageVi: "3 hiệp x 15 lần chụp phản xạ nhanh, nghỉ 60s",
        dosageEn: "3 sets x 15 reactive catches per arm, 60s rest",
        intensity: "Tốc độ phát lực cao (High RFD)",
        tempo: "Phản xạ nhanh dưới 200ms",
        rest: "60 giây",
        frequencyVi: "2-3 buổi/tuần",
        frequencyEn: "2-3 sessions/week",
        clinicalCitation: "Cook & Purdam 2016 (Br J Sports Med)",
        clinicalRationaleVi: "Tái tạo khả năng hãm lực phanh đột ngột (Deceleration) của gân cơ duỗi cổ tay khi đánh vợt hoặc va chạm thể thao.",
        clinicalRationaleEn: "Rebuilds rapid deceleration braking capacity of wrist extensor tendons for racket sports and dynamic impacts.",
        painRuleVi: "VAS <= 2/10; không được đau nhói chói lồi cầu.",
        painRuleEn: "VAS <= 2/10; zero sharp epicondylar bite.",
        commonErrorsVi: [
          "Chụp bóng quá muộn làm bóng đập gập cổ tay.",
          "Căng cứng toàn bộ cánh tay thay vì thả lỏng nhử phản xạ.",
          "Gù lưng và nhô vai."
        ],
        commonErrorsEn: [
          "Late catch allowing forced wrist flexion.",
          "Excessive pre-stiffness instead of relaxed reactive reflex.",
          "Upper body hunching."
        ],
        regressionVi: "Thả và chụp bóng tennis ở cự ly rơi ngắn 15cm.",
        regressionEn: "Short 15cm drop height with tennis ball.",
        progressionVi: "Dùng bóng tạ nhỏ 1kg hoặc thả từ độ cao lớn hơn.",
        progressionEn: "1kg small medicine ball from higher drop.",
        videoUrl: "https://www.youtube.com/watch?v=5u840hSkzf8",
        localVideoRef: "04_Than_Kinh_Ngoai_Bien_&_Chuyen_Gan/04_05_Cubital_Tunnel_Ulnar_Nerve_Decompression.mp4",
        timestampCues: [
          { timeSec: 10, labelVi: "Kỹ thuật thả và hãm lực cổ tay", labelEn: "Drop & Deceleration Technique" },
          { timeSec: 30, labelVi: "Phản xạ chụp bóng tốc độ cao", labelEn: "High-Rate Grip Lock" }
        ]
      },
      {
        id: "elbow_p3_ex2",
        name: "Quadruped Reverse-Wrist Loaded Stretch & Press (ATG Protocol)",
        nameVi: "Kéo Giãn Có Tải Ngược Cổ Tay Quỳ 4 Điểm (Sức Mạnh Góc Tận ATG)",
        nameEn: "Quadruped Reverse-Wrist Loaded Stretch & Press (ATG Protocol)",
        reps: "3 hiệp x 10 lần ấn tải nhịp nhàng ở góc tận",
        dosageVi: "3 hiệp x 10 lần nén tải góc cực hạn, nghỉ 60s",
        dosageEn: "3 sets x 10 active contractions at end-range, 60s rest",
        intensity: "70-80% Nội lực ở biên độ cực đại",
        tempo: "Chậm 3 giây kéo dãn - 2 giây gồng ấn sàn",
        rest: "60 giây",
        frequencyVi: "3 buổi/tuần",
        frequencyEn: "3 sessions/week",
        clinicalCitation: "Patrick B. 2021 (ATG Knees Over Toes System)",
        clinicalRationaleVi: "Huấn luyện gân cơ chịu tải ở biên độ gập/duỗi cực đại của khớp, xây dựng khả năng kháng chấn thương toàn diện.",
        clinicalRationaleEn: "Conditions tendons and joint capsules to absorb load at extreme articular boundaries, eliminating end-range vulnerability.",
        painRuleVi: "Không có cảm giác kẹt khớp nhọn; chỉ có cảm giác căng dãn có tải.",
        painRuleEn: "Zero pinching; pure loaded tensile stretch sensation.",
        commonErrorsVi: [
          "Dồn toàn bộ trọng lượng cơ thể quá đột ngột lên cổ tay.",
          "Cong gập khuỷu tay thay vì giữ thẳng cánh tay.",
          "Bong gót bàn tay lên khỏi mặt sàn."
        ],
        commonErrorsEn: [
          "Dumping full bodyweight prematurely.",
          "Bending elbows instead of keeping arms straight.",
          "Lifting heels of palms off floor."
        ],
        regressionVi: "Ngồi lùi mông ra sau gót chân để giảm áp lực lên tay.",
        regressionEn: "Shift hips back toward heels to de-load wrists.",
        progressionVi: "Nghiêng người ra trước tăng góc tải hoặc chuyển lên tư thế chống đẩy.",
        progressionEn: "Lean forward to increase angle or progress to push-up plank.",
        videoUrl: "https://www.youtube.com/watch?v=UEFX85jM784",
        localVideoRef: "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4",
        timestampCues: [
          { timeSec: 10, labelVi: "Đặt tay ngược trên sàn", labelEn: "Reverse Wrist Floor Setup" },
          { timeSec: 35, labelVi: "Ấn lực tải góc cực hạn", labelEn: "Loaded End-Range Compression" }
        ]
      }
    ]
  },

  spot4: {
    id: "spot4",
    zoneKey: "lower_back",
    titleVi: "Cột Sống Thắt Lưng (Lumbar Spine Sparing & Posterior Chain)",
    titleEn: "Lower Back & Lumbar Spine",
    pearlVi: "Theo GS. Stuart McGill: Đĩa đệm không được uốn vặn quá mức khi đang đau cấp. Khái niệm then chốt là tạo độ cứng vững thân mình (Core Stiffness) trong khi tăng độ linh hoạt khớp háng (Hip Mobility). Tuyệt đối tránh gập lưng tải nặng trong 60 phút đầu sau khi ngủ dậy (khi đĩa đệm ngậm nước cực đại). Cần xây dựng sức mạnh cơ mông và chuỗi sau để giải phóng áp lực thắt lưng.",
    pearlEn: "Prof. Stuart McGill spine-sparing rule: Build proximal Core Stiffness while expanding distal hip mobility. Avoid loaded lumbar flexion during the first hour after waking (discs are hyper-hydrated). Build gluteal and posterior chain hip hinge capacity to spare the lumbar spine.",
    pathologiesVi: ["Thoát vị đĩa đệm không dung nạp gập (Flexion-intolerant)", "Hội chứng diện khớp liên mấu", "Đau thắt lưng cơ năng"],
    pathologiesEn: ["Flexion-intolerant disc bulge", "Lumbar facet syndrome", "Non-specific mechanical low back pain"],
    biomechanicalRulesVi: "Giữ cột sống thắt lưng ở vị trí trung tính; phân tán toàn bộ lực gập và xoay vào khớp háng (Hip Hinge). Tránh gập lưng kèm xoay vặn dưới tải.",
    biomechanicalRulesEn: "Maintain neutral lumbar spine lordosis; concentrate all bending into hip hinge mechanics. Avoid loaded flexion combined with rotation.",
    morningTest: {
      nameVi: "Nghiệm pháp Cầu mông trục thẳng 30 giây",
      nameEn: "Neutral Spine Glute Bridge 30s Hold",
      instructionVi: "Nằm ngửa nâng mông tạo đường thẳng từ gối qua háng đến vai, giữ vững 30 giây mà không võng thắt lưng. Đánh giá đau mỏi lưng.",
      instructionEn: "Supine, lift pelvis into straight alignment between knees, hips, and shoulders for 30s without lumbar sagging. Rate back pain."
    },
    p1: [
      {
        id: "lower_back_p1_ex1",
        name: "McGill Bird-Dog Neutral Spine Hold",
        nameVi: "Bài Tập McGill Bird-Dog Khóa Cột Sống Đẳng Trường (Bộ Ba McGill)",
        nameEn: "McGill Bird-Dog Neutral Spine Hold (McGill Big 3)",
        reps: "Kim tự tháp giảm dần (5-3-1 lần giữ 8 giây mỗi bên)",
        dosageVi: "5-3-1 lần giữ 8 giây mỗi bên, quét nhẹ sàn giữa các lần",
        dosageEn: "5-3-1 reps of 8s holds per side, floor sweep between reps",
        intensity: "70% Co cứng cơ nhiều nhánh (Multifidus)",
        tempo: "Isometric 8s hold",
        rest: "60 giây",
        frequencyVi: "Hàng ngày",
        frequencyEn: "Daily",
        clinicalCitation: "McGill SM 2010 (Strength & Conditioning Journal; 32(3):33-46)",
        clinicalRationaleVi: "Kích hoạt nhóm cơ dựng sống và cơ nhiều nhánh đối bên với mức tải cắt đĩa đệm tối thiểu, xây dựng sức bền cơ bắp chống mỏi.",
        clinicalRationaleEn: "Recruits contralateral erector spinae and multifidus with minimal spinal shear, building endurance against fatigue failure.",
        painRuleVi: "Không được có cảm giác tê lan xuống chân hay nhói cột sống.",
        painRuleEn: "Zero radicular symptoms or sharp lumbar pinch.",
        commonErrorsVi: [
          "Đá chân quá cao làm võng thắt lưng quá mức.",
          "Nghiêng lắc xương chậu sang bên.",
          "Ngửa cổ nhìn lên trần nhà."
        ],
        commonErrorsEn: [
          "Kicking leg too high, arching lumbar spine.",
          "Pelvic tilt or rotational sag.",
          "Cervical hyperextension."
        ],
        regressionVi: "Chỉ duỗi chân hoặc chỉ giơ tay riêng biệt.",
        regressionEn: "Move leg-only or arm-only.",
        progressionVi: "Vẽ hình vuông nhỏ bằng bàn tay và mũi chân ở vị trí duỗi.",
        progressionEn: "Draw small squares with hand and foot at full extension.",
        videoUrl: "https://www.youtube.com/watch?v=b4Gd3VSdzyg",
        localVideoRef: "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4",
        timestampCues: [
          { timeSec: 15, labelVi: "Tư thế 4 điểm cân bằng", labelEn: "Quadruped Neutral Alignment" },
          { timeSec: 40, labelVi: "Duỗi tay chân đối bên giữ thẳng trục", labelEn: "Contralateral Limb Extension" }
        ]
      },
      {
        id: "lower_back_p1_ex2",
        name: "McGill Side-Bridge / Side-Plank (Spine Sparing Protocol)",
        nameVi: "Cầu Nghiêng McGill Khóa Độ Vững Cột Sống (Side-Bridge)",
        nameEn: "McGill Side-Bridge / Side-Plank (Spine Sparing Protocol)",
        reps: "Kim tự tháp giảm dần (5-3-1 lần giữ 8-10 giây mỗi bên)",
        dosageVi: "5-3-1 lần giữ 8-10s mỗi bên, nghỉ 2s giữa lần gồng",
        dosageEn: "Descending pyramid: 5-3-1 reps of 8-10s holds per side, 2s rest",
        intensity: "70% Co cứng cơ vuông thắt lưng và cơ thành bụng",
        tempo: "Isometric 8-10s hold",
        rest: "60 giây",
        frequencyVi: "Hàng ngày (1-2 lần/ngày)",
        frequencyEn: "Daily (1-2x per day)",
        clinicalCitation: "McGill SM 2015 (Low Back Disorders 3rd ed; Human Kinetics)",
        clinicalRationaleVi: "Tạo lực co cơ vững chắc ở cơ vuông thắt lưng và cơ bụng bên mà hầu như không tạo ra bất kỳ tải trọng nén ép hay lực trượt cắt nào lên đĩa đệm thắt lưng.",
        clinicalRationaleEn: "Fires quadratus lumborum and lateral abdominal wall with negligible lumbar axial compression or shear.",
        painRuleVi: "Đau VAS <= 2/10; hoàn toàn không đau nhói thắt lưng.",
        painRuleEn: "Pain VAS <= 2/10; zero sharp focal lumbar pain.",
        commonErrorsVi: [
          "Gập gập háng ra sau làm mất đường thẳng từ vai xuống gối.",
          "Xoay lồng ngực úp xuống sàn.",
          "Để hông sụp võng xuống."
        ],
        commonErrorsEn: [
          "Hips drifting backward out of plumb line.",
          "Torso twisting toward floor.",
          "Allowing pelvis to sag downward."
        ],
        regressionVi: "Thực hiện tựa trên đầu gối (Kneeling side-bridge).",
        regressionEn: "Perform from knees rather than feet.",
        progressionVi: "Thực hiện nâng chân trên lên cao (Star side-bridge).",
        progressionEn: "Elevate top leg into abduction (Star side-bridge).",
        videoUrl: "https://www.youtube.com/watch?v=b4Gd3VSdzyg",
        localVideoRef: "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4",
        timestampCues: [
          { timeSec: 10, labelVi: "Căn chỉnh thẳng trục từ vai qua hông", labelEn: "Shoulder to Pelvis Line" },
          { timeSec: 30, labelVi: "Nâng hông tạo độ cứng bảo vệ đĩa đệm", labelEn: "Pelvic Lift & Spine Lock" }
        ]
      }
    ],
    p2: [
      {
        id: "lower_back_p2_ex1",
        name: "Seated Good Morning with Flat Back (Patrick ATG Hip Hinge Protocol, Tempo 3-1-3)",
        nameVi: "Gập Người Ngồi Ghế Lưng Thẳng Seated Good Morning (Trường Phái ATG, Nhịp 3-1-3)",
        nameEn: "Seated Good Morning with Flat Back (Patrick ATG Hip Hinge Protocol, Tempo 3-1-3)",
        reps: "3-4 hiệp x 10 lần lưng thẳng tuyệt đối (Tempo 3-1-3)",
        dosageVi: "3-4 hiệp x 10 lần lưng thẳng, nhịp 3-1-3, nghỉ 2 phút",
        dosageEn: "3-4 sets x 10 reps flat back, 3-1-3 tempo, 2 min rest",
        intensity: "70-75% 1RM (Trọng lượng cơ thể tiến dần lên tạ đòn)",
        tempo: "Tempo 3-1-3 (3s gập háng, 1s giữ đáy, 3s nâng người)",
        rest: "120 giây",
        frequencyVi: "3 buổi/tuần (cách ngày, nghỉ 48h)",
        frequencyEn: "3 sessions/week (non-consecutive, 48h rest)",
        clinicalCitation: "Patrick B. 2021 (ATG System) & McGill SM 2015",
        clinicalRationaleVi: "Phân tách hoàn toàn chuyển động xoay quanh ổ cối khớp háng với việc cố định cột sống thắt lưng phẳng tuyệt đối, rèn luyện cơ dựng sống và cơ gập háng chịu tải an toàn.",
        clinicalRationaleEn: "Isolates pure acetabulofemoral hip hinge rotation with rigid neutral flat-back spinal alignment, bulletproofing spinal extensors without flexion shear.",
        painRuleVi: "Đau VAS <= 2/10; căng cơ mông và khớp háng, không đau nhói thắt lưng.",
        painRuleEn: "Pain VAS <= 2/10; hip/glute stretch, zero lumbar pinch.",
        commonErrorsVi: [
          "Cong lưng dưới khi gập người.",
          "Ngửa cổ nhìn lên trần nhà.",
          "Nhấc bàn chân khỏi sàn."
        ],
        commonErrorsEn: [
          "Rounding lumbar spine.",
          "Cervical hyperextension.",
          "Feet lifting off floor."
        ],
        regressionVi: "Ngồi ghế thực hiện không tạ hai tay đặt sau gáy.",
        regressionEn: "Bodyweight with hands behind neck.",
        progressionVi: "Gánh thanh tạ đòn 15-25kg trên lưng trên nhịp 3-1-3.",
        progressionEn: "15-25kg barbell on upper back with 3-1-3 tempo.",
        videoUrl: "https://www.youtube.com/watch?v=b4Gd3VSdzyg",
        localVideoRef: "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4",
        timestampCues: [
          { timeSec: 10, labelVi: "Tư thế ngồi mở rộng háng khóa lưng phẳng", labelEn: "Seated Stance & Flat Back Lock" },
          { timeSec: 35, labelVi: "Hạ thân 3 giây bản lề háng nguyên trục", labelEn: "3s Hip Hinge Descent" }
        ]
      },
      {
        id: "lower_back_p2_ex2",
        name: "Heavy Slow Romanian Deadlift (RDL Hip Hinge, Tempo 3-1-3)",
        nameVi: "Kéo Tạ Bản Lề Háng Kháng Lực Nặng Chậm (RDL, Nhịp 3-1-3)",
        nameEn: "Heavy Slow Romanian Deadlift (RDL Hip Hinge, Tempo 3-1-3)",
        reps: "4 hiệp x 12 RM giảm dần về 8 RM (Hạ 3s, Dừng 1s, Nâng 3s)",
        dosageVi: "4 hiệp x 12-8 RM, nhịp 3-1-3, nghỉ 2-3 phút",
        dosageEn: "4 sets x 12-8 RM, 3-1-3 tempo, 2-3 min rest",
        intensity: "75-80% 1RM (Tải nặng kiểm soát)",
        tempo: "Tempo 3-1-3 (7s TUT/lần)",
        rest: "120-180 giây",
        frequencyVi: "3 buổi/tuần (cách ngày, nghỉ 48h)",
        frequencyEn: "3 sessions/week (non-consecutive, 48h rest)",
        clinicalCitation: "Kongsgaard et al. 2009 (Scand J Med Sci Sports; PMID: 19793213)",
        clinicalRationaleVi: "Huấn luyện chuỗi cơ sau (cơ mông lớn và gân kheo) gánh toàn bộ lực nâng thay cho cột sống thắt lưng, tái định hình sợi collagen dưới tải trọng nặng chậm.",
        clinicalRationaleEn: "Conditions posterior chain (gluteus maximus and hamstrings) to absorb and transmit ground reaction forces while sparing lumbar spine.",
        painRuleVi: "Đau VAS <= 3/10; căng cơ mông và đùi sau, không đau thắt lưng.",
        painRuleEn: "Pain VAS <= 3/10; glute/hamstring tension, zero spinal ache.",
        commonErrorsVi: [
          "Cong lưng dưới ở đáy chuyển động.",
          "Để tạ trôi xa khỏi cẳng chân (tăng cánh tay đòn nén ép thắt lưng).",
          "Khuỵu gối thành bài squat thay vì đẩy hông ra sau."
        ],
        commonErrorsEn: [
          "Lumbar flexion at the bottom of range.",
          "Allowing barbell/dumbbells to drift away from shins.",
          "Squatting down rather than hinging hips rearward."
        ],
        regressionVi: "Tập bản lề háng chạm mông vào tường không tạ.",
        regressionEn: "Wall-touch hip hinge with bodyweight.",
        progressionVi: "Tăng tạ lên 8 RM hoặc thực hiện RDL một chân (Single-leg RDL).",
        progressionEn: "Progress load to 8 RM or perform single-leg RDL.",
        videoUrl: "https://www.youtube.com/watch?v=b4Gd3VSdzyg",
        localVideoRef: "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4",
        timestampCues: [
          { timeSec: 15, labelVi: "Đẩy hông ra sau khóa lưng thẳng", labelEn: "Rearward Hip Drive & Flat Back" },
          { timeSec: 45, labelVi: "Thì hạ eccentric 3 giây chạm tạ cẳng chân", labelEn: "3s Eccentric Shin Glide" }
        ]
      },
      {
        id: "lower_back_p2_ex3",
        name: "45-Degree Roman Chair Back Extension (Tempo 3-1-3)",
        nameVi: "Nâng Thân Ghế Nghiêng 45 Độ Kháng Lực Chậm (Roman Chair)",
        nameEn: "45-Degree Roman Chair Back Extension (Tempo 3-1-3)",
        reps: "3 hiệp x 10 lần (Tempo 3-1-3 có ôm tạ trước ngực)",
        dosageVi: "3 hiệp x 10 lần, nhịp 3-1-3, nghỉ 2 phút",
        dosageEn: "3 sets x 10 reps, 3-1-3 tempo, 2 min rest",
        intensity: "70-75% 1RM",
        tempo: "Tempo 3-1-3",
        rest: "120 giây",
        frequencyVi: "3 buổi/tuần",
        frequencyEn: "3 sessions/week",
        clinicalCitation: "McGill SM 2015 (Low Back Disorders; Human Kinetics)",
        clinicalRationaleVi: "Gập duỗi hoàn toàn từ ổ cối khớp háng trong khi giữ cột sống thắt lưng khóa nguyên ở vị trí trung tính, xây dựng sức mạnh cơ dựng sống.",
        clinicalRationaleEn: "Articulates purely through acetabulofemoral hip joints while locking lumbar spine neutral, building spinal extensor endurance.",
        painRuleVi: "Đau VAS <= 2/10; căng mỏi cơ mông.",
        painRuleEn: "Pain VAS <= 2/10; glute fatigue.",
        commonErrorsVi: [
          "Ưỡn quá đà ở đỉnh chuyển động (Hyperextension).",
          "Cuộn gập lưng dưới khi hạ thân người.",
          "Nhún giật thân trên để lấy đà."
        ],
        commonErrorsEn: [
          "Lumbar hyperextension at top.",
          "Rounding lower back on descent.",
          "Momentum bouncing."
        ],
        regressionVi: "Thực hiện không tạ hai tay bắt chéo trước ngực.",
        regressionEn: "Bodyweight with arms crossed over chest.",
        progressionVi: "Ôm tạ đĩa 10-15kg trước ngực nhịp 3-1-3.",
        progressionEn: "Hold 10-15kg weight plate at chest.",
        videoUrl: "https://www.youtube.com/watch?v=b4Gd3VSdzyg",
        localVideoRef: "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4",
        timestampCues: [
          { timeSec: 10, labelVi: "Căn chỉnh đệm ghế dưới nếp gấp háng", labelEn: "Pad Below Hip Crease" },
          { timeSec: 35, labelVi: "Duy trì thắt lưng thẳng tuyệt đối", labelEn: "Neutral Spine Lock" }
        ]
      }
    ],
    p3: [
      {
        id: "lower_back_p3_ex1",
        name: "Loaded Jefferson Curl (ATG Spinal Mobility Protocol)",
        nameVi: "Cuộn Cột Sống Có Tải Jefferson Curl (Trường Phái ATG)",
        nameEn: "Loaded Jefferson Curl (ATG Spinal Mobility Protocol)",
        reps: "3 hiệp x 5-8 lần cuộn cực chậm (Tạ nhẹ 5-10kg, bục cao)",
        dosageVi: "3 hiệp x 5-8 lần cuộn chậm từng đốt, nhịp 4-1-4, nghỉ 90s",
        dosageEn: "3 sets x 5-8 reps, 4-1-4 tempo, light weight, 90s rest",
        intensity: "Tải nhẹ (10-20% trọng lượng cơ thể)",
        tempo: "Tempo 4-1-4 (4s cuộn xuống, 1s dừng sâu, 4s cuộn lên)",
        rest: "90 giây",
        frequencyVi: "2 buổi/tuần (chỉ tập khi đã vượt qua Giai đoạn 1 & 2)",
        frequencyEn: "2 sessions/week (only after passing Phase 1 & 2)",
        clinicalCitation: "Patrick B. 2021 (ATG System) & Spina A. 2014 (FRC)",
        clinicalRationaleVi: "Huấn luyện dây chằng và các mô liên kết sau cột sống chịu lực kéo dãn có tải ở góc gập tối đa, biến đĩa đệm và cơ lưng thành 'áo giáp' chống chấn thương.",
        clinicalRationaleEn: "Conditions posterior spinal ligaments and myofascia under progressive tensile load, building resilient tissue tolerance at full flexion.",
        painRuleVi: "TUYỆT ĐỐI KHÔNG TẬP KHI ĐANG ĐAU CẤP. Chỉ áp dụng ở Giai đoạn 3 khi đã hết đau đĩa đệm.",
        painRuleEn: "CONTRAINDICATED IN ACUTE FLARES. Reserved for Phase 3 end-range resilience.",
        commonErrorsVi: [
          "Gập lưng thành một khối cứng thay vì cuộn từng đốt sống.",
          "Dùng tạ quá nặng gây quá tải dây chằng.",
          "Khuỵu gối để né tránh kéo dãn gân kheo."
        ],
        commonErrorsEn: [
          "Bending as a rigid unit instead of rolling segmented vertebrae.",
          "Using excessive weight beyond connective tissue capacity.",
          "Bending knees to avoid hamstring stretch."
        ],
        regressionVi: "Thực hiện không tạ đứng trên sàn phẳng cuộn chạm mũi chân.",
        regressionEn: "Bodyweight toe-touch roll on flat floor.",
        progressionVi: "Đứng trên bục gỗ cao hạ tạ sâu qua mũi chân 5-10cm.",
        progressionEn: "Elevated box deficit with dumbbell reaching 5-10cm below toes.",
        videoUrl: "https://www.youtube.com/watch?v=b4Gd3VSdzyg",
        localVideoRef: "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4",
        timestampCues: [
          { timeSec: 15, labelVi: "Cuộn từ cằm xuống từng đốt sống ngực", labelEn: "Cervical & Thoracic Rolling" },
          { timeSec: 50, labelVi: "Chạm góc gập tối đa giữ 2 giây", labelEn: "End-Range Hang & Controlled Rise" }
        ]
      },
      {
        id: "lower_back_p3_ex2",
        name: "Dynamic Kettlebell Swing (Hip Snap SSC Spring Recoil)",
        nameVi: "Vung Tạ Chuông Bùng Nổ Bản Lề Háng (Kettlebell Swing - SSC)",
        nameEn: "Dynamic Kettlebell Swing (Hip Snap SSC Spring Recoil)",
        reps: "4 hiệp x 12-15 lần vung bùng nổ (Tạ chuông 16-24kg)",
        dosageVi: "4 hiệp x 12-15 lần vung bùng nổ, nghỉ 90s",
        dosageEn: "4 sets x 12-15 explosive swings, 90s rest",
        intensity: "Tốc độ phát lực tối đa (High RFD Hip Extension)",
        tempo: "Ballistic SSC (<200ms chu kỳ nén duỗi háng)",
        rest: "90 giây",
        frequencyVi: "2-3 buổi/tuần",
        frequencyEn: "2-3 sessions/week",
        clinicalCitation: "McGill SM 2012 (J Strength Cond Res; 26(1):16-27)",
        clinicalRationaleVi: "GS. McGill chứng minh bài Kettlebell Swing tạo xung lực co cơ mông cực đại (100% MVC) trong khi lực nén ép đĩa đệm chỉ bằng 50% so với squat, phục hồi chu kỳ co giãn nhanh.",
        clinicalRationaleEn: "McGill proved kettlebell swings elicit near-maximal glute contraction with low lumbar compression, restoring rapid stretch-shortening capacity.",
        painRuleVi: "VAS <= 2/10; hồi phục hoàn toàn sau 24h.",
        painRuleEn: "VAS <= 2/10; zero delayed flare at 24h.",
        commonErrorsVi: [
          "Dùng tay nâng tạ lên thay vì dùng lực búng hông.",
          "Hạ tạ quá sâu dưới đầu gối làm cong thắt lưng.",
          "Ưỡn ngửa người ra sau ở đỉnh chuyển động."
        ],
        commonErrorsEn: [
          "Lifting bell with shoulders instead of snapping hips.",
          "Allowing bell to dip below knees, flexing lumbar spine.",
          "Leaning backward at apex."
        ],
        regressionVi: "Vung tạ nhẹ 8-12kg với biên độ ngang rốn.",
        regressionEn: "8-12kg light kettlebell to navel height.",
        progressionVi: "Vung tạ nặng 24-32kg hoặc vung tạ một tay (Single-arm swing).",
        progressionEn: "24-32kg heavy swings or single-arm swing.",
        videoUrl: "https://www.youtube.com/watch?v=KRfTFbeU5iM",
        localVideoRef: "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4",
        timestampCues: [
          { timeSec: 10, labelVi: "Thế hít tạ bản lề háng ban đầu", labelEn: "Hike & Hip Hinge Setup" },
          { timeSec: 30, labelVi: "Búng hông bùng nổ siết chặt cơ mông", labelEn: "Explosive Hip Snap & Glute Lock" }
        ]
      }
    ]
  },

  spot5: {
    id: "spot5",
    zoneKey: "wrist",
    titleVi: "Cổ Tay & Bàn Tay (Wrist, Hand, Carpal Tunnel & De Quervain)",
    titleEn: "Wrist, Hand & Carpal Tunnel",
    pearlVi: "Hội chứng ống cổ tay và viêm bao gân de Quervain xuất phát từ ma sát kéo dài. Cần kết hợp giải phóng bao gân, trượt thần kinh giữa (Nerve Gliding), nạp tải gồng tĩnh 4 mặt phẳng và nâng sức mạnh góc tận.",
    pearlEn: "Carpal tunnel and de Quervain tenosynovitis stem from repetitive friction and retinacular compression. Progressive multi-planar loading and nerve flossing restore sliding dynamics.",
    pathologiesVi: ["Viêm bao gân de Quervain (APL/EPB)", "Hội chứng ống cổ tay (Carpal Tunnel)", "Viêm gân cơ trụ sau (ECU)"],
    pathologiesEn: ["De Quervain's tenosynovitis (APL/EPB)", "Carpal tunnel syndrome", "Extensor carpi ulnaris (ECU) tendinopathy"],
    biomechanicalRulesVi: "Tránh tư thế nghiêng trụ kết hợp gập ngón cái (nghiệm pháp Finkelstein) dưới tải nặng trong GĐ 1. Nạp tải đẳng trường cổ tay ở vị trí trung tính.",
    biomechanicalRulesEn: "Avoid combined ulnar deviation with thumb flexion (Finkelstein compressive position) in Phase 1. Load isometrically in neutral.",
    morningTest: {
      nameVi: "Nghiệm pháp Nghiêng quay cổ tay giữ tĩnh 30 giây",
      nameEn: "Supported Radial Deviation 30s Lever Hold",
      instructionVi: "Cẳng tay đặt trên bàn, cầm thanh đòn hoặc tạ tay nghiêng ngón cái lên trên giữ 30 giây. Đánh giá đau bao gân ngón cái.",
      instructionEn: "Forearm supported on table, hold light dumbbell or lever tilting thumb upward for 30s. Rate radial styloid pain."
    },
    p1: [
      {
        id: "wrist_p1_ex1",
        name: "Supported Isometric Radial Deviation Hold (De Quervain Protocol)",
        nameVi: "Gồng Tĩnh Nghiêng Quay Cổ Tay Có Đỡ (Bảo Tồn Bao Gân de Quervain)",
        nameEn: "Supported Isometric Radial Deviation Hold (De Quervain Protocol)",
        reps: "5 hiệp x 45 giây giữ tĩnh (Tải 70% MVC, cẳng tay tựa bàn)",
        dosageVi: "5 hiệp x 45 giây giữ tĩnh, nghỉ 2 phút giữa hiệp",
        dosageEn: "5 sets x 45s sustained hold, 2 min rest between sets",
        intensity: "70% MVC",
        tempo: "Isometric 45s hold",
        rest: "120 giây",
        frequencyVi: "Hàng ngày (1-2 lần/ngày)",
        frequencyEn: "Daily (1-2x per day)",
        clinicalCitation: "Rio et al. 2015 (Br J Sports Med; PMID: 25979840)",
        clinicalRationaleVi: "Kích hoạt gân cơ giạng dài và duỗi ngắn ngón cái (APL/EPB) ở góc trung tính, giảm thiểu ma sát trượt qua ròng rọc ngăn 1 cổ tay và giảm đau tức thì.",
        clinicalRationaleEn: "Recruits APL/EPB tendons at neutral alignment, avoiding frictional shear through first dorsal compartment pulley while delivering cortical analgesia.",
        painRuleVi: "Đau VAS <= 3/10; không đau nhói mỏm trâm quay.",
        painRuleEn: "Pain VAS <= 3/10; zero sharp styloid pain.",
        commonErrorsVi: [
          "Để cổ tay bị kéo trĩu xuống theo hướng nghiêng trụ.",
          "Gập ngón cái quặp vào lòng bàn tay.",
          "Nhấc cẳng tay khỏi mặt bàn."
        ],
        commonErrorsEn: [
          "Allowing wrist to sag into ulnar deviation.",
          "Curling thumb into palm.",
          "Forearm lifting off surface."
        ],
        regressionVi: "Gồng ép ngón cái vào tường hoặc ngón tay đối diện không tạ.",
        regressionEn: "Manual isometric thumb push against opposite hand.",
        progressionVi: "Cầm tạ đơn đầu nặng hoặc búa dài giữ tĩnh.",
        progressionEn: "Offset hammer or lever dumbbell hold.",
        videoUrl: "https://www.youtube.com/watch?v=UEFX85jM784",
        localVideoRef: "03_Benh_Ly_Gan_Bao_Gan/03_01_De_Quervain_Pulley_Reconstruction.mp4",
        timestampCues: [
          { timeSec: 10, labelVi: "Tư thế cẳng tay & cổ tay trung tính", labelEn: "Forearm Setup & Neutral Wrist" },
          { timeSec: 35, labelVi: "Gồng nghiêng quay 70% MVC", labelEn: "70% Radial Deviation Hold" }
        ]
      },
      {
        id: "wrist_p1_ex2",
        name: "Isometric Grip Crush & Thumb Abduction Hold",
        nameVi: "Gồng Tĩnh Bóp Nắm Khăn & Giạng Ngón Cái Đẳng Trường",
        nameEn: "Isometric Grip Crush & Thumb Abduction Hold",
        reps: "4-5 hiệp x 45 giây giữ tĩnh (Tải 70% MVC, nghỉ 2 phút)",
        dosageVi: "4-5 hiệp x 45 giây giữ tĩnh, nghỉ 2 phút giữa hiệp",
        dosageEn: "4-5 sets x 45s sustained hold, 2 min rest between sets",
        intensity: "70% MVC (Co cơ gập/giạng ngón tay có kiểm soát)",
        tempo: "Isometric 45s hold",
        rest: "120 giây",
        frequencyVi: "Hàng ngày (1-2 lần/ngày)",
        frequencyEn: "Daily (1-2x per day)",
        clinicalCitation: "Rio et al. 2015 & Beyer et al. 2015",
        clinicalRationaleVi: "Gồng tĩnh cơ gấp các ngón tay và cơ giạng ngón cái kích hoạt thụ cảm thể thần kinh cơ, ức chế tín hiệu đau qua thần kinh trung ương và tăng độ vững cổ bàn tay.",
        clinicalRationaleEn: "Isometric grip crush and thenar recruitment activates neuromuscular mechanoreceptors, blunting central pain transmission while stabilizing carpal joints.",
        painRuleVi: "Đau VAS <= 3/10; sáng hôm sau không có cảm giác tê bì đầu ngón.",
        painRuleEn: "Pain VAS <= 3/10; zero numbness or paresthesia next morning.",
        commonErrorsVi: [
          "Bóp quá mạnh vượt quá 70% MVC gây co quắp khớp bàn ngón.",
          "Gập gập cổ tay khi bóp khăn.",
          "Nín thở gồng người."
        ],
        commonErrorsEn: [
          "Crushing beyond 70% MVC causing joint cramping.",
          "Flexing wrist during grip compression.",
          "Breath holding."
        ],
        regressionVi: "Bóp bóng xốp mềm hoặc gối mỏng ở mức 50% lực.",
        regressionEn: "Compress soft foam ball at 50% effort.",
        progressionVi: "Dùng kìm bóp tay đo lực hoặc khăn cuộn dày nạp tạ.",
        progressionEn: "Use hand dynamometer or thick towel roll with resistance.",
        videoUrl: "https://www.youtube.com/watch?v=UEFX85jM784",
        localVideoRef: "04_Than_Kinh_Ngoai_Bien_&_Chuyen_Gan/04_01_Carpal_Tunnel_Release_Comprehensive_Anatomy.mp4",
        timestampCues: [
          { timeSec: 10, labelVi: "Tư thế tay kẹp khăn trung tính", labelEn: "Neutral Towel Grip Setup" },
          { timeSec: 35, labelVi: "Gồng ép 70% MVC giữ vững 45s", labelEn: "70% MVC 45s Compression Hold" }
        ]
      },
      {
        id: "wrist_p1_ex3",
        name: "Active Tendon Gliding & Median Nerve Flossing",
        nameVi: "Trượt Gân Ngón Tay & Giải Phóng Thần Kinh Giữa (Nerve Flossing)",
        nameEn: "Active Tendon Gliding & Median Nerve Flossing",
        reps: "3 hiệp x 45 giây chu kỳ trượt gân nhịp nhàng (Tải 70% kiểm soát)",
        dosageVi: "3 hiệp x 45 giây chu kỳ trượt gân nhịp nhàng (Tải 70% kiểm soát), nghỉ 60s",
        dosageEn: "3 sets x 45s glide cycles (70% neuromuscular control), 60s rest",
        intensity: "70% Lực kiểm soát thần kinh cơ",
        tempo: "Isometric & Dynamic Glide (45s/hiệp)",
        rest: "60 giây",
        frequencyVi: "Hàng ngày (2-3 lần/ngày)",
        frequencyEn: "Daily (2-3x per day)",
        clinicalCitation: "Rooks M. Functional Anatomy of the Hand; and Butler DS (Mobilisation of Nervous System)",
        clinicalRationaleVi: "Phục hồi khả năng trượt tự do của các gân gấp nông, sâu và dây thần kinh giữa trong ống cổ tay, giảm phù nề và giải tỏa chèn ép cơ học.",
        clinicalRationaleEn: "Restores differential gliding between FDS, FDP tendons and median nerve within carpal canal, reducing subretinacular pressure.",
        painRuleVi: "Không được gây cảm giác tê buốt đầu ngón tay.",
        painRuleEn: "Zero tingling or electric shocks into fingertips.",
        commonErrorsVi: [
          "Làm quá nhanh giật cục.",
          "Bẻ quặt cổ tay ra sau quá mức khi đang tê ngón tay.",
          "Nắm chặt ngón tay gồng cứng."
        ],
        commonErrorsEn: [
          "Jerky rapid movements.",
          "Hyperextending wrist when nerve is irritated.",
          "Clenching fist tightly."
        ],
        regressionVi: "Thực hiện từng ngón tay riêng biệt trong nước ấm.",
        regressionEn: "Individual finger glides in warm water basin.",
        progressionVi: "Kết hợp vận động nghiêng đầu đối bên khi trượt thần kinh.",
        progressionEn: "Incorporate contralateral cervical lateral flexion during flossing.",
        videoUrl: "https://www.youtube.com/watch?v=-_6gr8_fVss",
        localVideoRef: "04_Than_Kinh_Ngoai_Bien_&_Chuyen_Gan/04_01_Carpal_Tunnel_Release_Comprehensive_Anatomy.mp4",
        timestampCues: [
          { timeSec: 10, labelVi: "Các tư thế trượt gân bàn tay", labelEn: "Tendon Gliding Positions" },
          { timeSec: 40, labelVi: "Kỹ thuật trượt dây thần kinh giữa", labelEn: "Median Nerve Mobilization" }
        ]
      }
    ],
    p2: [
      {
        id: "wrist_p2_ex1",
        name: "4-Plane Heavy Slow Dumbbell Wrist Circuit (Tempo 3-1-3)",
        nameVi: "Chuỗi Nạp Tải Cổ Tay 4 Mặt Phẳng Kháng Lực Nặng Chậm (Nhịp 3-1-3)",
        nameEn: "4-Plane Heavy Slow Dumbbell Wrist Circuit (Tempo 3-1-3)",
        reps: "3 hiệp x 10 lần mỗi mặt phẳng: Gập, Duỗi, Nghiêng quay, Nghiêng trụ",
        dosageVi: "3 hiệp x 10 lần mỗi hướng (Gập, Duỗi, Nghiêng), nhịp 3-1-3, nghỉ 90s",
        dosageEn: "3 sets x 10 reps per plane (Flex, Extend, Deviate), 3-1-3 tempo, 90s rest",
        intensity: "70-75% 1RM",
        tempo: "Tempo 3-1-3 (7s TUT/lần)",
        rest: "90-120 giây",
        frequencyVi: "3 buổi/tuần (cách ngày)",
        frequencyEn: "3 sessions/week (non-consecutive)",
        clinicalCitation: "Beyer et al. 2015 (Am J Sports Med; PMID: 26018970)",
        clinicalRationaleVi: "Kích thích tái tạo cấu trúc ma trận collagen theo cả 4 hướng cơ học của cổ tay, tăng cường độ vững trục khớp cổ bàn tay.",
        clinicalRationaleEn: "Stimulates collagen fibril realignment across all 4 anatomical axes of the wrist, reinforcing radiocarpal stability.",
        painRuleVi: "Đau VAS <= 3/10; hồi phục hoàn toàn sau 24h.",
        painRuleEn: "Pain VAS <= 3/10; settles to baseline within 24h.",
        commonErrorsVi: [
          "Nhả rơi tạ ở thì hạ eccentric.",
          "Chỉ tập gập cổ tay mà bỏ qua nghiêng quay/nghiêng trụ.",
          "Gồng cơ vai nhún lên."
        ],
        commonErrorsEn: [
          "Dropping weight on eccentric descent.",
          "Omitting radial/ulnar deviation planes.",
          "Shoulder shrugging."
        ],
        regressionVi: "Tập với thanh đũa/gậy nhẹ hoặc tạ tay 1kg.",
        regressionEn: "Light dowel lever or 1kg dumbbell.",
        progressionVi: "Cầm tạ cán búa (Lever hammer) để tăng mô-men tải lệch tâm.",
        progressionEn: "Lever bar or hammer with offset weight.",
        videoUrl: "https://www.youtube.com/watch?v=UEFX85jM784",
        localVideoRef: "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4",
        timestampCues: [
          { timeSec: 15, labelVi: "Gập và duỗi cổ tay nhịp 3-1-3", labelEn: "Flexion & Extension Plane" },
          { timeSec: 50, labelVi: "Nghiêng quay và nghiêng trụ có tải", labelEn: "Radial & Ulnar Deviation Plane" }
        ]
      },
      {
        id: "wrist_p2_ex2",
        name: "Pinch Grip Farmer's Walk & Lever Holds (Tempo 3-1-3)",
        nameVi: "Xách Tạ Kẹp Ngón Tay Tăng Sức Bền Cơ Bàn Tay (Pinch Grip, Nhịp 3-1-3)",
        nameEn: "Pinch Grip Farmer's Walk & Lever Holds (Tempo 3-1-3)",
        reps: "3 hiệp x 30-45 giây giữ kẹp bánh tạ phẳng (Nhịp 3-1-3)",
        dosageVi: "3 hiệp x 30-45 giây giữ kẹp (Tempo 3-1-3), nghỉ 90s",
        dosageEn: "3 sets x 30-45s plate pinch hold (Tempo 3-1-3 cadence), 90s rest",
        intensity: "75-80% Sức kẹp ngón tay (70-80% 1RM)",
        tempo: "Tempo 3-1-3 (Bước chậm 3-1-3 hoặc Timed Hold 30-45s)",
        rest: "90 giây",
        frequencyVi: "3 buổi/tuần",
        frequencyEn: "3 sessions/week",
        clinicalCitation: "Kongsgaard et al. 2009 (Scand J Med Sci Sports)",
        clinicalRationaleVi: "Tăng cường sức chịu tải của các gân cơ gấp ngón tay nông/sâu và gân cơ cái, bảo vệ các khớp liên đốt.",
        clinicalRationaleEn: "Strengthens flexor digitorum tendons and thenar intrinsic musculature against compressive friction.",
        painRuleVi: "Đau VAS <= 2/10; không tê bì ngón tay.",
        painRuleEn: "Pain VAS <= 2/10; zero numbness or tingling.",
        commonErrorsVi: [
          "Dùng lòng bàn tay ôm tạ thay vì chỉ kẹp bằng đầu ngón tay.",
          "Gù vai rụt cổ khi xách tạ.",
          "Để tạ rơi bất ngờ gây giật gân."
        ],
        commonErrorsEn: [
          "Palm cupping instead of pure fingertip pinch.",
          "Shoulder slouching.",
          "Sudden plate slippage shock."
        ],
        regressionVi: "Kẹp khối gỗ dày hoặc sách dày giữ tĩnh.",
        regressionEn: "Pinch thick book or wooden block.",
        progressionVi: "Kẹp 2 đĩa tạ 5kg trơn úp mặt vào nhau bước đi 40 bước.",
        progressionEn: "Two smooth 5kg plates smooth-side out for 40 paces.",
        videoUrl: "https://www.youtube.com/watch?v=UEFX85jM784",
        localVideoRef: "03_Benh_Ly_Gan_Bao_Gan/03_02_Trigger_Finger_A1_Pulley_Release.mp4",
        timestampCues: [
          { timeSec: 10, labelVi: "Kỹ thuật kẹp bánh tạ bằng đầu ngón", labelEn: "Fingertip Plate Pinch Setup" },
          { timeSec: 35, labelVi: "Giữ vững thân mình khi di chuyển", labelEn: "Torso Stability & Controlled Walk" }
        ]
      }
    ],
    p3: [
      {
        id: "wrist_p3_ex1",
        name: "Plyometric Ball Drop & High-Rate Finger Catch",
        nameVi: "Thả & Chụp Bóng Tạ Phản Xạ Nhanh Cổ Bàn Tay (Chu Kỳ SSC)",
        nameEn: "Plyometric Ball Drop & High-Rate Finger Catch (SSC Recoil)",
        reps: "3 hiệp x 15 lần chụp bóng phản xạ mỗi tay",
        dosageVi: "3 hiệp x 15 lần chụp nảy, nghỉ 60s",
        dosageEn: "3 sets x 15 reactive catches, 60s rest",
        intensity: "Tốc độ phản xạ cực nhanh (<200ms)",
        tempo: "Ballistic SSC",
        rest: "60 giây",
        frequencyVi: "2-3 buổi/tuần",
        frequencyEn: "2-3 sessions/week",
        clinicalCitation: "Cook & Purdam 2016 (Br J Sports Med)",
        clinicalRationaleVi: "Tái tạo độ nhạy cảm của các thụ cảm thể cơ học (Mechanoreceptors) và khả năng hấp thu lực đột ngột của bao khớp cổ tay.",
        clinicalRationaleEn: "Reactivates articular mechanoreceptors and stretch-shortening shock absorption across wrist retinaculum.",
        painRuleVi: "VAS <= 2/10; không đau nhức khớp sau 24h.",
        painRuleEn: "VAS <= 2/10; pain-free at 24h.",
        commonErrorsVi: [
          "Chụp bằng lòng bàn tay thay vì đầu các ngón tay.",
          "Gồng cứng ngón tay trước khi bóng rơi.",
          "Để bóng rơi quá sâu."
        ],
        commonErrorsEn: [
          "Catching with palm instead of fingertips.",
          "Pre-tensing fingers rigidly.",
          "Allowing ball to drop too low."
        ],
        regressionVi: "Thả bóng mềm ở cự ly 10cm.",
        regressionEn: "Soft ball drop from 10cm.",
        progressionVi: "Bóng lacrosse hoặc bóng tạ nhỏ 1kg thả từ ngang mắt.",
        progressionEn: "Lacrosse or 1kg weighted ball from eye level.",
        videoUrl: "https://www.youtube.com/watch?v=5u840hSkzf8",
        localVideoRef: "04_Than_Kinh_Ngoai_Bien_&_Chuyen_Gan/04_01_Carpal_Tunnel_Release_Comprehensive_Anatomy.mp4",
        timestampCues: [
          { timeSec: 10, labelVi: "Thả bóng và kích hoạt phản xạ bắt", labelEn: "Ball Release & Catch Reflex" },
          { timeSec: 30, labelVi: "Khóa phanh các ngón tay an toàn", labelEn: "Fingertip Deceleration Lock" }
        ]
      },
      {
        id: "wrist_p3_ex2",
        name: "End-Range Palms-Down Floor Stretch & Push-Away (ATG / FRC)",
        nameVi: "Kéo Giãn Có Tải Áp Bàn Tay Xuống Sàn & Đẩy Góc Tận (ATG & FRC)",
        nameEn: "End-Range Palms-Down Floor Stretch & Push-Away (ATG / FRC)",
        reps: "3 hiệp x 45 giây giữ có tải + 5 lần ấn đẩy chủ động",
        dosageVi: "3 hiệp x 45 giây giữ căng có tải + 5 lần ấn đẩy chủ động, nghỉ 60s",
        dosageEn: "3 sets x 45s loaded stretch + 5 active push-aways, 60s rest",
        intensity: "80% Nội lực co cơ ở góc tận cùng",
        tempo: "Chậm 45s căng dãn + 5s co cơ nén sàn",
        rest: "60 giây",
        frequencyVi: "3 buổi/tuần",
        frequencyEn: "3 sessions/week",
        clinicalCitation: "Spina A. 2014 (FRC PAILs/RAILs) & Patrick B. 2021 (ATG)",
        clinicalRationaleVi: "Biến biên độ dẻo thụ động thành sức mạnh vận động chủ động (Usable Workspace) ở góc ngửa cổ tay 90 độ, bảo vệ khớp khi chống đẩy hoặc ngã chống tay.",
        clinicalRationaleEn: "Converts passive flexibility into usable active strength workspace at 90° wrist extension, bulletproofing against fall-on-outstretched-hand (FOOSH) trauma.",
        painRuleVi: "Không có cảm giác kẹt xương nhọn; chỉ có cảm giác căng cơ nội tại.",
        painRuleEn: "Zero dorsal impingement pinch; pure tensile stretch.",
        commonErrorsVi: [
          "Bong gót bàn tay lên khỏi mặt sàn.",
          "Chùng gập khuỷu tay.",
          "Dồn lực quá tải đột ngột."
        ],
        commonErrorsEn: [
          "Heel of hand peeling off floor.",
          "Bent elbows.",
          "Sudden uncontrolled bodyweight plunge."
        ],
        regressionVi: "Thực hiện ép hai lòng bàn tay vào nhau trước ngực (Prayer stretch có tải).",
        regressionEn: "Prayer stretch with active isometric palm compression.",
        progressionVi: "Vươn vai ra trước vượt qua các ngón tay ở tư thế chống đẩy.",
        progressionEn: "Shoulders leaning forward past fingertips in push-up plank.",
        videoUrl: "https://www.youtube.com/watch?v=-_6gr8_fVss",
        localVideoRef: "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/07_02_Extensor.mp4",
        timestampCues: [
          { timeSec: 15, labelVi: "Áp lòng bàn tay khóa thẳng khuỷu", labelEn: "Flat Palm Floor Placement" },
          { timeSec: 45, labelVi: "Ấn các đầu ngón tay xuống sàn (PAILs)", labelEn: "Fingertip Floor Drive (PAILs)" }
        ]
      }
    ]
  },

  spot6: {
    id: "spot6",
    zoneKey: "hip",
    titleVi: "Khớp Háng & Khung Chậu (Gluteal, Hamstring & Adductor Tendinopathy)",
    titleEn: "Hip Joint & Acetabular Labrum",
    pearlVi: "Khớp háng là khớp chỏm cầu chịu tải lớn nhất. Hội chứng đau mấu chuyển lớn (GTPS / Gluteus Medius), gân cơ ụ ngồi (Hamstring) và cơ khép được giải quyết qua bài gồng tĩnh không chèn ép, tiếp nối bằng HSR và bài tập 90/90 FRC mở rộng góc háng.",
    pearlEn: "The hip withstands multi-directional high loads. Greater trochanteric pain (GTPS), proximal hamstring, and adductor tendinopathy require non-compressive isometrics followed by HSR and 90/90 FRC articular conditioning.",
    pathologiesVi: ["Hội chứng đau mấu chuyển lớn (GTPS - gân cơ mông)", "Viêm gân cơ ụ ngồi (Proximal Hamstring)", "Viêm gân cơ khép dài (Adductor)"],
    pathologiesEn: ["Greater trochanteric pain syndrome (GTPS / Gluteal)", "Proximal hamstring tendinopathy", "Adductor longus tendinopathy"],
    biomechanicalRulesVi: "Tránh khép háng quá đường giữa (vắt chéo chân làm dải chậu chày chèn ép gân cơ mông vào mấu chuyển lớn). Tránh gập háng sâu > 60° khi đang viêm gân cơ ụ ngồi.",
    biomechanicalRulesEn: "Avoid hip adduction past midline (crossing legs compresses gluteal tendons against greater trochanter). Avoid deep flexion > 60° in proximal hamstring flares.",
    morningTest: {
      nameVi: "Nghiệm pháp Đứng một chân giữ thăng bằng chậu 30 giây (Trendelenburg)",
      nameEn: "Single-Leg Stance 30s Hold (Trendelenburg Stability)",
      instructionVi: "Đứng một chân bên đau, giữ khung chậu thăng bằng nằm ngang không nghiêng sụp trong 30 giây. Đánh giá đau mấu chuyển lớn hoặc khớp háng.",
      instructionEn: "Stand on affected leg, maintain level horizontal pelvis without sagging for 30s. Rate trochanteric pain."
    },
    p1: [
      {
        id: "hip_p1_ex1",
        name: "Side-Lying Isometric Hip Abduction (Zero Adduction Compression)",
        nameVi: "Gồng Tĩnh Dạng Khớp Háng Nằm Nghiêng (Tránh Chèn Ép Mấu Chuyển)",
        nameEn: "Side-Lying Isometric Hip Abduction (Zero Adduction Compression)",
        reps: "5 hiệp x 45 giây giữ tĩnh (Tải 70% MVC, chân hơi duỗi sau)",
        dosageVi: "5 hiệp x 45 giây giữ tĩnh, nghỉ 2 phút giữa hiệp",
        dosageEn: "5 sets x 45s sustained hold, 2 min rest between sets",
        intensity: "70% MVC",
        tempo: "Isometric 45s hold",
        rest: "120 giây",
        frequencyVi: "Hàng ngày (1-2 lần/ngày)",
        frequencyEn: "Daily (1-2x per day)",
        clinicalCitation: "Rio et al. 2015 & Cook JL 2016 (Br J Sports Med; PMID: 27127294)",
        clinicalRationaleVi: "Kích hoạt cơ mông nhỡ và mông bé ở góc dạng 15-20 độ, loại bỏ hoàn toàn lực chèn ép của dải chậu chày lên mấu chuyển lớn, tạo ức chế vỏ não giảm đau tức thì.",
        clinicalRationaleEn: "Recruits gluteus medius and minimus at 15-20° abduction, eliminating compressive IT-band shear over greater trochanter while relieving cortical inhibition.",
        painRuleVi: "Đau VAS <= 3/10; không được để chân rơi xuống dưới mặt phẳng thân người.",
        painRuleEn: "Pain VAS <= 3/10; leg must remain above horizontal plane.",
        commonErrorsVi: [
          "Xoay lật xương chậu ngửa ra sau.",
          "Đưa chân ra trước thay vì duỗi nhẹ ra sau (kích hoạt sai cơ TFL).",
          "Nín thở gồng bụng thay vì thở đều."
        ],
        commonErrorsEn: [
          "Pelvis rolling backward.",
          "Drifting leg forward into flexion (TFL dominant substitution).",
          "Breath holding."
        ],
        regressionVi: "Nằm ngửa kẹp gối giữa hai chân hoặc dạng chân trên mặt sàn 50% lực.",
        regressionEn: "Supine with pillow between knees, 50% MVC effort.",
        progressionVi: "Đeo dây kháng lực mini-band quanh cổ chân hoặc tạ đeo cổ chân 2kg.",
        progressionEn: "Add 2kg ankle weight or mini-band around ankles.",
        videoUrl: "https://www.youtube.com/watch?v=VSi9x8dzSnU",
        localVideoRef: "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4",
        timestampCues: [
          { timeSec: 10, labelVi: "Tư thế nằm nghiêng khóa xương chậu", labelEn: "Side-Lying Pelvic Alignment" },
          { timeSec: 35, labelVi: "Dạng chân góc 20° hơi duỗi sau", labelEn: "20° Abduction & Slight Extension" }
        ]
      },
      {
        id: "hip_p1_ex2",
        name: "Prone Knee Flexion Isometric Hold (Hamstring Origin Relief)",
        nameVi: "Gồng Tĩnh Gập Gối Nằm Sấp (Bảo Vệ Điểm Bám Gân Cơ Ụ Ngồi)",
        nameEn: "Prone Knee Flexion Isometric Hold (Hamstring Origin Relief)",
        reps: "5 hiệp x 45 giây giữ tĩnh (Gối gập 30-45°, háng trung tính)",
        dosageVi: "5 hiệp x 45 giây giữ tĩnh, nghỉ 2 phút giữa hiệp",
        dosageEn: "5 sets x 45s sustained hold, 2 min rest between sets",
        intensity: "70% MVC",
        tempo: "Isometric 45s hold",
        rest: "120 giây",
        frequencyVi: "Hàng ngày",
        frequencyEn: "Daily",
        clinicalCitation: "Rio et al. 2015 & Kongsgaard et al. 2009",
        clinicalRationaleVi: "Nạp tải gân cơ đùi sau ở tư thế háng duỗi trung tính, tránh kéo căng gân quanh củ ụ ngồi trong giai đoạn đau cấp.",
        clinicalRationaleEn: "Loads proximal hamstring origin with hip neutral, avoiding compressive tension over ischial tuberosity during acute irritability.",
        painRuleVi: "Đau VAS <= 3/10; hồi phục về ban đầu sau 24h.",
        painRuleEn: "Pain VAS <= 3/10; returns to baseline at 24h.",
        commonErrorsVi: [
          "Gập gối quá 90 độ (làm mất lực căng đẳng trường tối ưu).",
          "Nhấc xương chậu khỏi sàn làm võng thắt lưng.",
          "Xoay bàn chân ra ngoài."
        ],
        commonErrorsEn: [
          "Flexing knee > 90° (losing optimal length-tension).",
          "Anterior pelvic tilt arching lumbar spine.",
          "External foot rotation."
        ],
        regressionVi: "Gập gối 20 độ với lực gồng 40-50% MVC.",
        regressionEn: "20° knee bend at 40-50% effort.",
        progressionVi: "Cầm tạ đơn kẹp giữa hai bàn chân hoặc dùng dây cáp kháng lực.",
        progressionEn: "Hold dumbbell between feet or use cable resistance.",
        videoUrl: "https://www.youtube.com/watch?v=D9YimkCIQ6s",
        localVideoRef: "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4",
        timestampCues: [
          { timeSec: 10, labelVi: "Góc gập gối 30-45° chuẩn", labelEn: "30-45° Knee Angle Setup" },
          { timeSec: 40, labelVi: "Gồng ép gân cơ đùi sau 70% MVC", labelEn: "Hamstring Tendon Pre-Tension" }
        ]
      }
    ],
    p2: [
      {
        id: "hip_p2_ex1",
        name: "Copenhagen Adductor Plank (Tempo 3-1-3 / Timed Holds)",
        nameVi: "Plank Khép Háng Copenhagen Kháng Lực Nặng Chậm (Nhịp 3-1-3)",
        nameEn: "Copenhagen Adductor Plank (Tempo 3-1-3 / Timed Holds)",
        reps: "3-4 hiệp x 8 lần nhịp 3-1-3 hoặc 30 giây giữ tĩnh mỗi bên",
        dosageVi: "3-4 hiệp x 8 lần (nhịp 3-1-3) hoặc 30s giữ mỗi bên, nghỉ 2 phút",
        dosageEn: "3-4 sets x 8 reps (3-1-3 tempo) or 30s hold per side, 2 min rest",
        intensity: "75-80% 1RM cơ khép háng",
        tempo: "Tempo 3-1-3 hoặc Timed Hold 30s",
        rest: "120 giây",
        frequencyVi: "3 buổi/tuần (cách ngày, nghỉ 48h)",
        frequencyEn: "3 sessions/week (non-consecutive, 48h rest)",
        clinicalCitation: "Harøy J et al. 2019 (Br J Sports Med) & Kongsgaard 2009",
        clinicalRationaleVi: "Kích thích tăng sinh collagen Type I tại điểm bám gân cơ khép dài (Adductor Longus), ngăn ngừa và điều trị rách vi thể gân háng thể thao.",
        clinicalRationaleEn: "Induces robust Type I collagen synthesis at adductor longus enthesis, treating and preventing athletic groin strain.",
        painRuleVi: "Đau VAS <= 3/10; bắt buộc trở về mức nền sau 24h.",
        painRuleEn: "Pain VAS <= 3/10; settles to baseline within 24h.",
        commonErrorsVi: [
          "Gập gập háng ra sau làm mất đường thẳng thân mình.",
          "Để chân dưới rơi chạm sàn hoàn toàn.",
          "Chùng khuỷu tay làm sụp vai."
        ],
        commonErrorsEn: [
          "Hip flexion breaking body plumb line.",
          "Dropping bottom leg completely to floor.",
          "Shoulder collapse."
        ],
        regressionVi: "Tựa đầu gối trên ghế băng thay vì tựa bàn chân (Knee-supported).",
        regressionEn: "Knee-supported variation on bench.",
        progressionVi: "Tựa mắt cá chân trên ghế cao và nâng hạ chân dưới nhịp 3-1-3.",
        progressionEn: "Ankle-supported on high bench with bottom leg raise/lower.",
        videoUrl: "https://www.youtube.com/watch?v=VSi9x8dzSnU",
        localVideoRef: "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4",
        timestampCues: [
          { timeSec: 15, labelVi: "Tư thế tựa gối/cổ chân trên ghế", labelEn: "Bench Knee/Ankle Placement" },
          { timeSec: 45, labelVi: "Khóa thẳng trục thân mình 30 giây", labelEn: "Adductor Torso Lock" }
        ]
      },
      {
        id: "hip_p2_ex2",
        name: "Standing Single-Leg Hip Hitch & Cable Abduction (Tempo 3-1-3)",
        nameVi: "Nâng Khung Chậu Một Chân & Kéo Cáp Dạng Háng (Nhịp 3-1-3)",
        nameEn: "Standing Single-Leg Hip Hitch & Cable Abduction (Tempo 3-1-3)",
        reps: "3-4 hiệp x 10-12 lần mỗi bên (Tempo 3-1-3)",
        dosageVi: "3-4 hiệp x 10-12 lần mỗi bên, nhịp 3-1-3, nghỉ 90s",
        dosageEn: "3-4 sets x 10-12 reps per side, 3-1-3 tempo, 90s rest",
        intensity: "70-75% 1RM",
        tempo: "Tempo 3-1-3",
        rest: "90-120 giây",
        frequencyVi: "3 buổi/tuần",
        frequencyEn: "3 sessions/week",
        clinicalCitation: "Beyer et al. 2015 & Kongsgaard et al. 2009",
        clinicalRationaleVi: "Huấn luyện cơ mông nhỡ chịu tải trọng lượng cơ thể kết hợp kháng lực ngoài, tái tạo độ ổn định khung chậu khi chạy nhảy.",
        clinicalRationaleEn: "Strengthens gluteus medius under closed-kinetic-chain stance and open-chain abduction, restoring dynamic pelvic stability.",
        painRuleVi: "Đau VAS <= 3/10; kiểm tra nghiệm pháp đứng một chân sáng hôm sau.",
        painRuleEn: "Pain VAS <= 3/10; check single-leg stance next morning.",
        commonErrorsVi: [
          "Nghiêng thân trên sang bên để ăn gian lực kéo cáp.",
          "Hạ tạ rơi tự do làm mất thì eccentric.",
          "Xoay bàn chân ra ngoài quá nhiều."
        ],
        commonErrorsEn: [
          "Lateral trunk lean cheating.",
          "Free-fall eccentric descent.",
          "Excessive foot external rotation."
        ],
        regressionVi: "Đứng nâng hạ chậu một chân trên bục gỗ không tạ (Pelvic drop).",
        regressionEn: "Bodyweight pelvic drop and hitch on wooden step.",
        progressionVi: "Tăng tạ cáp và dừng 2 giây ở vị trí nâng chậu cực đại.",
        progressionEn: "Heavier cable load with 2s peak isometric pause.",
        videoUrl: "https://www.youtube.com/watch?v=7JJTlYdrLl4",
        localVideoRef: "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4",
        timestampCues: [
          { timeSec: 10, labelVi: "Đứng một chân khóa khung chậu", labelEn: "Single-Leg Stance Lock" },
          { timeSec: 40, labelVi: "Nhịp nâng chậu và hạ 3 giây", labelEn: "Hip Hitch & 3s Lowering" }
        ]
      }
    ],
    p3: [
      {
        id: "hip_p3_ex1",
        name: "Lateral Skater Hops with Stick Landings (Gluteal SSC Deceleration)",
        nameVi: "Bật Nhảy Trượt Băng Sang Ngang Khóa Phanh (Chu Kỳ Lò Xo SSC)",
        nameEn: "Lateral Skater Hops with Stick Landings (Gluteal SSC Deceleration)",
        reps: "3 hiệp x 8 lần bật nhảy mỗi bên (Khóa dừng tiếp đất 2 giây)",
        dosageVi: "3 hiệp x 8 lần bật nhảy mỗi bên, dừng kiểm soát 2s, nghỉ 90s",
        dosageEn: "3 sets x 8 lateral hops per side with 2s stick landing, 90s rest",
        intensity: "Tốc độ phát lực & Hấp thu xung lực cao (High RFD & Deceleration)",
        tempo: "Ballistic SSC (<250ms bật) + 2s isometric landing lock",
        rest: "90 giây",
        frequencyVi: "2-3 buổi/tuần",
        frequencyEn: "2-3 sessions/week",
        clinicalCitation: "Cook & Purdam 2016 (Br J Sports Med)",
        clinicalRationaleVi: "Huấn luyện gân cơ mông nhỡ và cơ khép hấp thu lực phản chấn mặt đất theo mặt phẳng trán (Frontal Plane), tái tạo khả năng đổi hướng trong thể thao.",
        clinicalRationaleEn: "Trains gluteal and adductor tendons to absorb lateral ground reaction forces, restoring cutting agility and multi-directional spring recoil.",
        painRuleVi: "VAS <= 2/10; hồi phục hoàn toàn sau 24h.",
        painRuleEn: "VAS <= 2/10; completely resolved at 24h.",
        commonErrorsVi: [
          "Tiếp đất để gối sụp vào trong (Knee valgus collapse).",
          "Tiếp đất giật cục bằng gót chân thay vì cuộn từ ức bàn chân.",
          "Mất thăng bằng ngã nghiêng người."
        ],
        commonErrorsEn: [
          "Dynamic knee valgus collapse on landing.",
          "Heel striking shock instead of forefoot roll.",
          "Loss of postural balance."
        ],
        regressionVi: "Bước dồn chân sang ngang cự ly ngắn (Lateral bound nhỏ).",
        regressionEn: "Short-distance lateral stepping bound.",
        progressionVi: "Bật nhảy xa qua chướng ngại vật hoặc đeo áo tạ 5kg.",
        progressionEn: "Maximal distance hops over mini-hurdles or 5kg vest.",
        videoUrl: "https://www.youtube.com/watch?v=VSi9x8dzSnU",
        localVideoRef: "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4",
        timestampCues: [
          { timeSec: 10, labelVi: "Kỹ thuật bật đẩy hông ngang", labelEn: "Lateral Hip Drive Technique" },
          { timeSec: 35, labelVi: "Tiếp đất khóa trục háng-gối-cổ chân", labelEn: "Hip-Knee-Ankle Landing Lock" }
        ]
      },
      {
        id: "hip_p3_ex2",
        name: "90/90 Hip Internal & External Rotation PAILs/RAILs (FRC Protocol)",
        nameVi: "Xoay Khớp Háng Góc 90/90 & Co Cơ Cực Hạn (PAILs/RAILs - FRC)",
        nameEn: "90/90 Hip Internal & External Rotation PAILs/RAILs (FRC Protocol)",
        reps: "2 vòng x 15 giây co cơ đẳng trường tối đa ở góc tận",
        dosageVi: "2 vòng x 15s nén ép PAILs/RAILs ở góc cực hạn mỗi bên, nghỉ 90s",
        dosageEn: "2 rounds x 15s maximal isometric PAILs/RAILs per side, 90s rest",
        intensity: "80-100% Nội lực co cơ (Maximal Voluntary Irradiation)",
        tempo: "Chậm có kiểm soát thần kinh cơ (15s ép sàn - 15s nhấc chân)",
        rest: "90 giây",
        frequencyVi: "2-3 buổi/tuần",
        frequencyEn: "2-3 sessions/week",
        clinicalCitation: "Spina A. 2014 (Functional Anatomy Seminars / FRC)",
        clinicalRationaleVi: "Tái tạo không gian vận động xoay trong và xoay ngoài khớp háng, mở rộng bao khớp và kích thích nguyên bào sợi sắp xếp lại collagen.",
        clinicalRationaleEn: "Restores active internal and external rotational workspace, decompressing femoroacetabular capsule and driving fibroblast remodeling.",
        painRuleVi: "Không có cảm giác kẹp sụn khớp nhọn ở bẹn; chỉ có cảm giác cơ bắp làm việc.",
        painRuleEn: "Zero sharp groin impingement pinch; pure capsular muscular work.",
        commonErrorsVi: [
          "Gù lưng và nghiêng người để bù cho độ xoay háng.",
          "Nhấc đầu gối lên khỏi sàn ở thì xoay trong.",
          "Nín thở khi đang gồng tối đa."
        ],
        commonErrorsEn: [
          "Spinal slouching compensating for hip rotation.",
          "Knee lifting off floor during internal rotation.",
          "Breath holding during maximal irradiation."
        ],
        regressionVi: "Đặt một gối kê mông cao hoặc tay chống đỡ phía sau thân.",
        regressionEn: "Elevate hips on yoga block with hands supporting behind.",
        progressionVi: "Thực hiện không chống tay và nhấc hẳn cẳng chân góc tận (Active Lift-Offs).",
        progressionEn: "Hands-free active end-range lift-offs and hover transitions.",
        videoUrl: "https://www.youtube.com/watch?v=VSi9x8dzSnU",
        localVideoRef: "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4",
        timestampCues: [
          { timeSec: 15, labelVi: "Thiết lập góc 90/90 hai khớp háng", labelEn: "90/90 Stance Setup" },
          { timeSec: 50, labelVi: "Co cơ đẳng trường PAILs ép sàn", labelEn: "PAILs Floor Drive" }
        ]
      }
    ]
  },

  spot7: {
    id: "spot7",
    zoneKey: "knee",
    titleVi: "Khớp Gối & Gân Bánh Chè (Patellar, Quadriceps Tendon & Meniscus)",
    titleEn: "Knee, Patellar Tendon & Meniscus",
    pearlVi: "Gân bánh chè (Jumper's Knee) là mô hình kinh điển của GS. Jill Cook & TS. Ebonie Rio. Bài Spanish Squat Isometric 45s làm tê liệt tín hiệu đau ngay lập tức (giảm VAS từ 7 xuống 0), tiếp nối bằng phác đồ HSR (Kongsgaard 2009) và sức mạnh góc gập sâu ATG Split Squat để tái tạo sụn và cơ chày trước.",
    pearlEn: "Patellar tendinopathy is the cornerstone of Jill Cook & Ebonie Rio's research. Spanish Squat 45s isometrics eliminate cortical pain immediately, followed by Kongsgaard 2009 HSR and Ben Patrick's deep ATG Split Squat for patellar remodeling.",
    pathologiesVi: ["Viêm gân bánh chè (Jumper's Knee - cực dưới xương bánh chè)", "Viêm gân cơ tứ đầu", "Hội chứng bánh chè đùi"],
    pathologiesEn: ["Patellar tendinopathy (Jumper's knee)", "Quadriceps tendinopathy", "Patellofemoral pain syndrome"],
    biomechanicalRulesVi: "Tránh gập gối sâu > 90° có lực cắt trước lớn trong GĐ 1. Cô lập tải trọng cơ tứ đầu không gây chèn ép khớp bánh chè đùi (dùng dây đai Spanish Squat giữ cẳng chân thẳng đứng).",
    biomechanicalRulesEn: "Avoid deep knee flexion > 90° with high anterior tibial shear in Phase 1. Use Spanish Squat strap to maintain vertical shins and eliminate compressive patellofemoral contact.",
    morningTest: {
      nameVi: "Nghiệm pháp Squat một chân trên dốc 60° (Single-Leg Decline Squat)",
      nameEn: "Single-Leg Decline Squat to 60° Knee Flexion",
      instructionVi: "Đứng trên ván nghiêng 25° (gót chân nâng cao), từ từ hạ gối một chân bên đau đến 60° rồi đứng lên. Đánh giá mức đau gân bánh chè (VAS).",
      instructionEn: "Stand on 25° decline board (heel elevated), perform single-leg squat to 60° knee flexion. Rate patellar pain score."
    },
    p1: [
      {
        id: "knee_p1_ex1",
        name: "Spanish Squat Isometric Hold (Gold Standard Rio 2015 Protocol)",
        nameVi: "Squat Dây Đai Cố Định Giữ Tĩnh (Spanish Squat Isometric - Chuẩn Rio 2015)",
        nameEn: "Spanish Squat Isometric Hold (Gold Standard Rio 2015 Protocol)",
        reps: "5 hiệp x 45 giây giữ tĩnh (Tải 70% MVC, góc gối 60°, nghỉ 2 phút)",
        dosageVi: "5 hiệp x 45 giây giữ tĩnh ở góc gối 60°, nghỉ đúng 2 phút giữa hiệp",
        dosageEn: "5 sets x 45s sustained hold at 60° knee flexion, 2 min rest between sets",
        intensity: "70% MVC (Co cơ tứ đầu đẳng trường nặng)",
        tempo: "Isometric 45s hold",
        rest: "120 giây (Bắt buộc nghỉ đủ 2 phút để phục hồi dẫn truyền thần kinh)",
        frequencyVi: "Hàng ngày (1-2 lần/ngày, cách nhau >= 6 giờ)",
        frequencyEn: "Daily (1-2x per day, spaced >= 6 hours)",
        clinicalCitation: "Rio et al. 2015 (Br J Sports Med; 49(19):1277-1283; PMID: 25979840)",
        clinicalRationaleVi: "Nghiên cứu của TS. Ebonie Rio chứng minh 5 hiệp x 45s gồng tĩnh ở 70% MVC làm giảm đau gân bánh chè từ 7/10 xuống 0.17/10 ngay lập tức và duy trì trong 45 phút, thông qua giải phóng ức chế vỏ não (Cortical Inhibition Relief). Dây đai giữ cẳng chân thẳng đứng triệt tiêu lực cắt bánh chè.",
        clinicalRationaleEn: "Ebonie Rio's landmark trial proved 5 x 45s isometrics @ 70% MVC immediately reduced patellar tendon pain from 7/10 to 0.17/10 for >= 45 min via cortical inhibition relief. Popliteal strap maintains vertical shins, eliminating patellofemoral shear.",
        painRuleVi: "Đau VAS <= 3/10 trong lúc gồng là an toàn; bắt buộc phải trở về mức nền sau 24 giờ.",
        painRuleEn: "Pain VAS <= 3/10 during hold is acceptable; MUST settle to baseline within 24h.",
        commonErrorsVi: [
          "Để cẳng chân trôi ra trước quá mũi chân (mất điểm tựa dây đai vào khoeo chân).",
          "Gập gối quá sâu vượt quá 70 độ (vào vùng chèn ép gân).",
          "Nín thở hoặc nhổm mông đứng dậy sớm trước 45 giây."
        ],
        commonErrorsEn: [
          "Anterior knee drift over toes (losing rigid strap contact behind popliteal crease).",
          "Squatting beyond 70° knee flexion (entering compressive angle).",
          "Valsalva breath holding or terminating hold prematurely before 45s."
        ],
        regressionVi: "Thực hiện Wall-Sit (dựa lưng vào tường) ở góc gối 45 độ tải 50% lực.",
        regressionEn: "Wall-Sit at 45° knee flexion with 50% MVC effort.",
        progressionVi: "Ôm thêm tạ đĩa hoặc tạ chuông 10-15kg trước ngực giữ 45 giây.",
        progressionEn: "Goblet hold with 10-15kg kettlebell for 45s.",
        videoUrl: "https://www.youtube.com/watch?v=zAmvxveQcHw",
        localVideoRef: "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4",
        timestampCues: [
          { timeSec: 10, labelVi: "Cài đặt dây đai khoeo chân cố định", labelEn: "Popliteal Strap Setup" },
          { timeSec: 30, labelVi: "Hạ gối 60° và khóa cẳng chân thẳng đứng", labelEn: "60° Flexion & Vertical Shin Lock" },
          { timeSec: 70, labelVi: "Kiểm soát nhịp thở và độ siết cơ đùi", labelEn: "Quadriceps Pre-Tension & Breathing" }
        ]
      },
      {
        id: "knee_p1_ex2",
        name: "Seated Leg Extension Isometric Hold at 60° Knee Flexion",
        nameVi: "Gồng Tĩnh Đá Đùi Máy Ở Góc 60 Độ (Leg Extension Isometric)",
        nameEn: "Seated Leg Extension Isometric Hold at 60° Knee Flexion",
        reps: "5 hiệp x 45 giây giữ tĩnh (Tải 70% MVC, nghỉ 2 phút)",
        dosageVi: "5 hiệp x 45 giây giữ tĩnh một chân, nghỉ 2 phút giữa hiệp",
        dosageEn: "5 sets x 45s hold per leg, 2 min rest between sets",
        intensity: "70% MVC",
        tempo: "Isometric 45s hold",
        rest: "120 giây",
        frequencyVi: "Hàng ngày (1 lần/ngày)",
        frequencyEn: "Daily (1x per day)",
        clinicalCitation: "Rio et al. 2016 (BJSM; PMID: 26405113)",
        clinicalRationaleVi: "Cô lập tuyệt đối cơ tứ đầu đùi ở góc 60 độ gập gối (vị trí diện tích tiếp xúc bánh chè đùi lớn nhất, áp lực đơn vị diện tích thấp nhất), tạo tải trọng thuần túy lên gân bánh chè.",
        clinicalRationaleEn: "Isolates quadriceps at 60° knee flexion (maximal patellofemoral contact area, lowest focal pressure), delivering pure tensile strain to patellar tendon.",
        painRuleVi: "Đau VAS <= 3/10; sáng hôm sau kiểm tra squat trên ván dốc không tăng đau.",
        painRuleEn: "Pain VAS <= 3/10; confirm decline squat test at baseline next morning.",
        commonErrorsVi: [
          "Đá chân lên thẳng tắp 0 độ (gây chèn ép diện khớp bánh chè đùi).",
          "Nhấc mông khỏi ghế ngồi.",
          "Thả lỏng bàn chân."
        ],
        commonErrorsEn: [
          "Locking out into terminal 0° extension (severe patellofemoral compression).",
          "Pelvis lifting off seat.",
          "Foot collapsing into plantarflexion."
        ],
        regressionVi: "Thực hiện hai chân cùng lúc với tải 50%.",
        regressionEn: "Bilateral leg extension at 50% load.",
        progressionVi: "Tăng tải tạ đơn chân lên 75-80% MVC.",
        progressionEn: "Progress unilateral load to 75-80% MVC.",
        videoUrl: "https://www.youtube.com/watch?v=m08gkeFXqvs",
        localVideoRef: "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4",
        timestampCues: [
          { timeSec: 15, labelVi: "Căn góc 60° trên thước đo máy đá đùi", labelEn: "Setting 60° Pin on Machine" },
          { timeSec: 45, labelVi: "Gồng tĩnh cơ tứ đầu kiểm soát 45s", labelEn: "45s Isometric Quad Lock" }
        ]
      }
    ],
    p2: [
      {
        id: "knee_p2_ex1",
        name: "ATG Split Squat HSR (Patrick Knee Over Toes Protocol, Tempo 3-1-3)",
        nameVi: "Squat Tấn Trước ATG Split Squat HSR (Trường Phái Ben Patrick, Nhịp 3-1-3)",
        nameEn: "ATG Split Squat HSR (Patrick Knee Over Toes Protocol, Tempo 3-1-3)",
        reps: "4 hiệp x 8-10 lần mỗi chân (Gối vượt qua mũi chân, đùi sau chạm bắp chân)",
        dosageVi: "4 hiệp x 8-10 lần mỗi chân, nhịp 3-1-3, nghỉ 2 phút",
        dosageEn: "4 sets x 8-10 reps per leg, 3-1-3 tempo, 2 min rest",
        intensity: "70-85% 1RM Heavy Slow Resistance (Tempo 3-1-3)",
        tempo: "Tempo 3-1-3 (3s hạ sâu gối vượt mũi chân, 1s giữ, 3s đẩy lên)",
        rest: "120 giây",
        frequencyVi: "3 buổi/tuần (cách ngày, nghỉ 48 giờ để tổng hợp collagen)",
        frequencyEn: "3 sessions/week with 48h rest",
        clinicalCitation: "Patrick B. 2021 (ATG System) & Kongsgaard M. 2009 (BJSM)",
        clinicalRationaleVi: "Gập gối sâu để đùi sau chạm hoàn toàn bắp chân (Hamstring covers calf) kéo dài và làm dày gân bánh chè ở góc cực hạn dưới tải trọng nặng chậm, đồng thời kéo dãn mở khớp háng chân đối diện.",
        clinicalRationaleEn: "Full knee flexion with hamstring completely covering calf conditions patellar tendon and quadriceps enthesis under deep tensile strain with strict 3-1-3 tempo while stretching contralateral hip flexors.",
        painRuleVi: "Đau VAS <= 3/10 trong bài tập; bắt buộc trở về mức nền sau 24h.",
        painRuleEn: "Pain VAS <= 3/10 during session; must return to baseline within 24h.",
        commonErrorsVi: [
          "Gót chân trước bị nhấc bổng lên khi chưa đủ độ dẻo.",
          "Chùng cong lưng dưới hoặc xoay lệch xương chậu.",
          "Chân sau bị co gập gối quá nhiều."
        ],
        commonErrorsEn: [
          "Front heel lifting off surface prematurely.",
          "Lumbar arching or pelvic twisting.",
          "Excessive rear knee bend."
        ],
        regressionVi: "Kê cao chân trước trên bục 20-30cm để giảm tải góc gập.",
        regressionEn: "Elevate front foot on 20-30cm box or bench.",
        progressionVi: "Tập trên mặt sàn phẳng và cầm tạ đôi 15-25% trọng lượng cơ thể.",
        progressionEn: "Flat ground ATG split squat with dumbbells.",
        videoUrl: "https://www.youtube.com/watch?v=N1GnUR7ezaU",
        localVideoRef: "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4",
        timestampCues: [
          { timeSec: 15, labelVi: "Tư thế bước tấn và giữ thân thẳng", labelEn: "Upright Torso Stance" },
          { timeSec: 45, labelVi: "Đẩy gối vượt mũi chân đùi phủ bắp chân", labelEn: "Knee Over Toes & Full Hamstring Cover" }
        ]
      },
      {
        id: "knee_p2_ex2",
        name: "45° Incline Leg Press (Kongsgaard 2009 HSR Protocol, Tempo 3-1-3)",
        nameVi: "Đạp Đùi Ghế Nghiêng 45 Độ Kháng Lực Nặng Chậm (HSR Chuẩn Kongsgaard 2009)",
        nameEn: "45° Incline Leg Press (Kongsgaard 2009 HSR Protocol, Tempo 3-1-3)",
        reps: "4 hiệp x 15 RM (Tuần 5), 12 RM (Tuần 6), 10 RM (Tuần 7), 8 RM (Tuần 8)",
        dosageVi: "4 hiệp x tiến trình từ 15 RM xuống 8 RM, nhịp 3-1-3, nghỉ 2-3 phút",
        dosageEn: "4 sets x 15 RM down to 8 RM progression, 3-1-3 tempo, 2-3 min rest",
        intensity: "70-85% 1RM (Tuần 5: 15RM; Tuần 6: 12RM; Tuần 7: 10RM; Tuần 8: 8RM)",
        tempo: "Tempo 3-1-3 (3s hạ đùi, 1s dừng ở 90°, 3s đạp lên; 7s TUT/lần)",
        rest: "120-180 giây giữa các hiệp",
        frequencyVi: "3 buổi/tuần (cách ngày, nghỉ 48 giờ để chu kỳ tổng hợp collagen dương tính)",
        frequencyEn: "3 sessions/week (non-consecutive days, 48h rest for positive collagen synthesis)",
        clinicalCitation: "Kongsgaard M et al. 2009 (Scand J Med Sci Sports; 19(6):790-802; PMID: 19793213)",
        clinicalRationaleVi: "Thử nghiệm lâm sàng của Kongsgaard chứng minh HSR vượt trội hơn tiêm corticoid và tập eccentric đơn thuần, kích thích tăng sinh Type I collagen và phì đại diện tích mặt cắt ngang gân bánh chè (hypertrophy) bền vững sau 6 tháng.",
        clinicalRationaleEn: "Kongsgaard's RCT demonstrated HSR yields superior long-term clinical satisfaction, tendon cross-sectional area hypertrophy, and Type I collagen turnover compared to corticosteroid shots and eccentric drops.",
        painRuleVi: "Đau VAS <= 3/10 trong bài tập; bắt buộc trở về mức nền sau 24h.",
        painRuleEn: "Pain VAS <= 3/10 during session; must return to baseline within 24h.",
        commonErrorsVi: [
          "Đạp tạ khóa khớp gối hoàn toàn ở đỉnh (mất sức căng liên tục trên gân).",
          "Nhả bàn đạp hạ quá nhanh làm mất thì eccentric 3 giây.",
          "Nhấc gót chân khỏi bàn đạp hoặc để hai đầu gối chụm vào nhau (Knee valgus)."
        ],
        commonErrorsEn: [
          "Locking out knees at apex (losing continuous tension).",
          "Dropping carriage rapidly on eccentric descent.",
          "Heels peeling off platform or knees caving inward."
        ],
        regressionVi: "Thực hiện với 60% 1RM hai chân hoặc squat hộp (Box squat) có kiểm soát.",
        regressionEn: "60% 1RM bilateral leg press or controlled box squat.",
        progressionVi: "Tiến lên 8 RM tải nặng tối đa kiểm soát nghiêm ngặt nhịp 3-1-3.",
        progressionEn: "Progress to true 8 RM heavy resistance under textbook 3-1-3 tempo.",
        videoUrl: "https://www.youtube.com/watch?v=N1GnUR7ezaU",
        localVideoRef: "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4",
        timestampCues: [
          { timeSec: 15, labelVi: "Vị trí đặt bàn chân rộng bằng vai", labelEn: "Foot Placement & Alignment" },
          { timeSec: 45, labelVi: "Đếm nhịp 3-1-3 (7 giây mỗi lần đạp)", labelEn: "3-1-3 Tempo Cadence (7s TUT)" }
        ]
      },
      {
        id: "knee_p2_ex3",
        name: "25° Decline Board Squat (Isolating Patellar Tendon, Tempo 3-1-3)",
        nameVi: "Squat Trên Ván Nghiêng 25 Độ Kháng Lực Chậm (Decline Squat, Nhịp 3-1-3)",
        nameEn: "25° Decline Board Squat (Isolating Patellar Tendon, Tempo 3-1-3)",
        reps: "3-4 hiệp x 10-12 lần (Tempo 3-1-3)",
        dosageVi: "3-4 hiệp x 10-12 lần, nhịp 3-1-3, nghỉ 2 phút",
        dosageEn: "3-4 sets x 10-12 reps, 3-1-3 tempo, 2 min rest",
        intensity: "70-75% 1RM",
        tempo: "Tempo 3-1-3",
        rest: "120 giây",
        frequencyVi: "3 buổi/tuần",
        frequencyEn: "3 sessions/week",
        clinicalCitation: "Purdam CR et al. 2004 (BJSM) & Kongsgaard 2009",
        clinicalRationaleVi: "Ván nghiêng 25 độ triệt tiêu sự bù trừ của khớp cổ chân và cơ bắp chân, dồn 100% lực cơ học vào cơ tứ đầu và gân bánh chè để tái cấu trúc bó sợi.",
        clinicalRationaleEn: "25° decline angle eliminates ankle plantarflexor compensation, directing 100% mechanical strain into quadriceps and patellar tendon matrix.",
        painRuleVi: "Đau VAS <= 3/10; sáng hôm sau kiểm tra không tăng đau.",
        painRuleEn: "Pain VAS <= 3/10; next-morning check at baseline.",
        commonErrorsVi: [
          "Gập người ra trước quá nhiều (phải giữ thân người gần như thẳng đứng).",
          "Hạ quá nhanh không kiểm soát.",
          "Bong gót chân khỏi ván nghiêng."
        ],
        commonErrorsEn: [
          "Excessive forward trunk lean (torso must remain upright).",
          "Rushing descent.",
          "Heels peeling off decline board."
        ],
        regressionVi: "Tập hai chân không tạ có tay vịn hỗ trợ.",
        regressionEn: "Bilateral bodyweight with handrail support.",
        progressionVi: "Cầm thêm tạ đôi 10-15kg hoặc tập một chân (Single-leg decline squat).",
        progressionEn: "Add dumbbells or progress to single-leg decline squat.",
        videoUrl: "https://www.youtube.com/watch?v=N1GnUR7ezaU",
        localVideoRef: "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4",
        timestampCues: [
          { timeSec: 10, labelVi: "Đứng trên ván nghiêng 25° giữ lưng thẳng", labelEn: "25° Slant Board Upright Alignment" },
          { timeSec: 40, labelVi: "Hạ gối 3 giây có kiểm soát", labelEn: "3s Controlled Descent" }
        ]
      },
      {
        id: "knee_p2_ex4",
        name: "Tibialis Raise (Patrick ATG Protocol for Knee Deceleration)",
        nameVi: "Nâng Mũi Chân Cơ Chày Trước Kháng Lực Chậm (Tibialis Raise - ATG)",
        nameEn: "Tibialis Raise (Patrick ATG Protocol for Knee Deceleration)",
        reps: "3 hiệp x 20 lần nhịp chậm (Hạ 3s, Dừng 1s, Nâng 3s)",
        dosageVi: "3 hiệp x 20 lần nhịp 3-1-3, nghỉ 60s",
        dosageEn: "3 sets x 20 reps, 3-1-3 tempo, 60s rest",
        intensity: "70% Sức bền co cơ chày trước",
        tempo: "Tempo 3-1-3",
        rest: "60 giây",
        frequencyVi: "3 buổi/tuần",
        frequencyEn: "3 sessions/week",
        clinicalCitation: "Patrick B. 2021 (Knees Over Toes / ATG System)",
        clinicalRationaleVi: "Cơ chày trước (Tibialis Anterior) là hệ thống giảm xóc đầu tiên của chân khi tiếp đất. Làm khỏe cơ chày trước triệt tiêu lực xung kích trước khi nó truyền lên gân bánh chè.",
        clinicalRationaleEn: "Tibialis anterior acts as the primary shock absorber for ground reaction forces, mitigating impulse spikes before they reach patellar tendon.",
        painRuleVi: "Hoàn toàn không đau gân; chỉ mỏi cơ chày trước.",
        painRuleEn: "Zero tendon ache; pure anterior compartment burn.",
        commonErrorsVi: [
          "Gập gối nhún nhảy thay vì khóa thẳng đầu gối.",
          "Chỉ nâng nửa biên độ thay vì kéo mũi chân sát về cẳng chân.",
          "Đứng quá gần tường làm giảm tải."
        ],
        commonErrorsEn: [
          "Bending knees instead of keeping them locked straight.",
          "Partial range instead of maximal dorsiflexion pull.",
          "Feet too close to wall reducing lever."
        ],
        regressionVi: "Đứng sát tường gót chân cách tường 20cm.",
        regressionEn: "Stand closer to wall (20cm heel distance).",
        progressionVi: "Đứng xa tường 60cm hoặc dùng thanh tạ kẹp mũi chân (Tib-bar).",
        progressionEn: "Feet 60cm from wall or use weighted Tib-Bar.",
        videoUrl: "https://www.youtube.com/watch?v=m08gkeFXqvs",
        localVideoRef: "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4",
        timestampCues: [
          { timeSec: 10, labelVi: "Tư thế dựa lưng vào tường khóa thẳng gối", labelEn: "Wall Lean & Locked Knees" },
          { timeSec: 35, labelVi: "Kéo tối đa mũi chân chạm ống đồng", labelEn: "Maximal Dorsiflexion Pull" }
        ]
      }
    ],
    p3: [
      {
        id: "knee_p3_ex1",
        name: "Reversing / Backward Sled Walking & Depth Drops (Patrick ATG & SSC Protocol)",
        nameVi: "Kéo Xe Tạ Đi Lùi Reversing & Bật Nhảy SSC (Trường Phái ATG & SSC)",
        nameEn: "Reversing / Backward Sled Walking & Depth Drops (Patrick ATG & SSC Protocol)",
        reps: "3 hiệp x 6 lần bật nhảy hoặc tiếp đất hãm lực (Hộp 30cm)",
        dosageVi: "3 hiệp x 6 lần bật nhảy / tiếp đất kiểm soát, nghỉ 2 phút",
        dosageEn: "3 sets x 6 jumps / depth drops from 30cm box, 2 min rest",
        intensity: "Tốc độ phát lực tối đa (High Rate of Force Development)",
        tempo: "Ballistic SSC (<200ms co dãn chuyển đổi)",
        rest: "120 giây giữa các hiệp",
        frequencyVi: "2-3 buổi/tuần (cách nhau >= 48-72 giờ)",
        frequencyEn: "2-3 sessions/week (spaced >= 48-72 hours)",
        clinicalCitation: "Cook JL & Purdam CR 2016 (Br J Sports Med; PMID: 27127294)",
        clinicalRationaleVi: "Tái tạo hoàn toàn chức năng lò xo sinh học (Biological Spring) của gân bánh chè, huấn luyện gân tích trữ và giải phóng năng lượng đàn hồi cho các môn thể thao cường độ cao.",
        clinicalRationaleEn: "Rebuilds biological spring recoil of the patellar tendon, restoring elastic energy storage and release for high-demand athletic activities.",
        painRuleVi: "VAS <= 2/10; kiểm tra nghiệm pháp squat ván dốc sáng hôm sau không được có phản ứng bùng phát đau muộn.",
        painRuleEn: "VAS <= 2/10; morning decline squat test must show zero latent pain flare.",
        commonErrorsVi: [
          "Tiếp đất cứng đơ đập gót chân xuống sàn.",
          "Đầu gối bị chụm vào trong (Knee valgus) khi tiếp đất.",
          "Tập quá nhiều hiệp khi cơ bắp đã kiệt sức."
        ],
        commonErrorsEn: [
          "Stiff heel-strike landing.",
          "Dynamic knee valgus collapse on impact.",
          "Continuing jumps into deep fatigue."
        ],
        regressionVi: "Bật nhảy tại chỗ nhẹ nhàng (Submaximal pogo jumps).",
        regressionEn: "Submaximal in-place pogo hops.",
        progressionVi: "Tiếp đất một chân (Single-leg depth drop) từ hộp 30cm.",
        progressionEn: "Single-leg depth drop from 30cm box with stick landing.",
        videoUrl: "https://www.youtube.com/watch?v=eHNjINgNJzY",
        localVideoRef: "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4",
        timestampCues: [
          { timeSec: 10, labelVi: "Kỹ thuật rơi và phanh tiếp đất", labelEn: "Drop & Deceleration Mechanics" },
          { timeSec: 40, labelVi: "Bật nảy phản xạ tức thì dưới 200ms", labelEn: "Sub-200ms Elastic Rebound" }
        ]
      },
      {
        id: "knee_p3_ex2",
        name: "Reverse Nordic Curl & Poliquin Step-Up (Eccentric Bulletproofing)",
        nameVi: "Ngả Người Ngược Quỳ Gối (Reverse Nordic Curl) & Poliquin Step-Up",
        nameEn: "Reverse Nordic Curl & Poliquin Step-Up (Eccentric Bulletproofing)",
        reps: "3 hiệp x 6-8 lần Reverse Nordic + 3 hiệp x 15 lần Poliquin Step-Up",
        dosageVi: "3 hiệp x 6-8 lần Reverse Nordic chậm, nghỉ 90s",
        dosageEn: "3 sets x 6-8 slow Reverse Nordic reps, 90s rest",
        intensity: "80% Lực eccentric cơ tứ đầu đùi",
        tempo: "Tempo 4-1-2 (4s ngả người eccentric, 1s giữ, 2s nâng lên)",
        rest: "90-120 giây",
        frequencyVi: "2 buổi/tuần",
        frequencyEn: "2 sessions/week",
        clinicalCitation: "Patrick B. 2021 & Kongsgaard M. 2009",
        clinicalRationaleVi: "Tạo tải trọng eccentric cực đại kéo dài các sợi cơ thẳng đùi (Rectus Femoris) và gân bánh chè, củng cố cơ Vastus Medialis Oblique (VMO) bảo vệ sụn gối vĩnh viễn.",
        clinicalRationaleEn: "Generates maximal eccentric lengthening strain on rectus femoris and patellar tendon, hyper-strengthening VMO to bulletproof patellofemoral tracking.",
        painRuleVi: "VAS <= 2/10; chỉ căng mỏi cơ đùi trước.",
        painRuleEn: "VAS <= 2/10; pure quadriceps fatigue.",
        commonErrorsVi: [
          "Gập gập háng làm mất đường thẳng từ gối lên vai.",
          "Ngả quá sâu vượt quá kiểm soát làm giật gối.",
          "Nín thở khi đang ngả sau."
        ],
        commonErrorsEn: [
          "Hips breaking line into flexion.",
          "Leaning back beyond eccentric control.",
          "Breath holding."
        ],
        regressionVi: "Dùng dây kháng lực neo trước ngực hỗ trợ hoặc ngả 20 độ.",
        regressionEn: "Band-assisted Reverse Nordic or limit lean to 20°.",
        progressionVi: "Ngả người chạm gót chân hoặc ôm tạ 5kg trước ngực.",
        progressionEn: "Full floor touch or hold 5kg plate at chest.",
        videoUrl: "https://www.youtube.com/watch?v=eHNjINgNJzY",
        localVideoRef: "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4",
        timestampCues: [
          { timeSec: 10, labelVi: "Khóa đường thẳng từ đầu gối qua háng lên vai", labelEn: "Knee-to-Shoulder Plumb Line" },
          { timeSec: 35, labelVi: "Ngả người sau 4 giây có kiểm soát", labelEn: "4s Controlled Eccentric Lean" }
        ]
      }
    ]
  },

  spot8: {
    id: "spot8",
    zoneKey: "foot",
    titleVi: "Cổ Chân, Gân Gót & Gan Bàn Chân (Achilles & Plantar Fascia)",
    titleEn: "Foot, Ankle & Achilles",
    pearlVi: "Gân gót Achilles là gân chịu tải nặng nhất cơ thể (gấp 8-10 lần trọng lượng khi chạy nhảy). Với viêm điểm bám (Insertional), TUYỆT ĐỐI KHÔNG hạ gót dưới mặt sàn ở GĐ 1-2 để tránh chèn ép xương gót. Với viêm đoạn giữa (Mid-portion), áp dụng phác đồ Alfredson (Alfredson protocol) kết hợp nạp HSR (Beyer 2015) và bài tập cân gan chân Windlass (Rathleff 2015).",
    pearlEn: "The Achilles tendon absorbs up to 10x bodyweight. For insertional tendinopathy, NEVER drop heels below floor level in Phase 1-2 to avoid bony impingement. Mid-portion tendinopathy responds to the classic Alfredson protocol, Beyer 2015 HSR, and Rathleff 2015 plantar fascia high-load protocols.",
    pathologiesVi: ["Viêm gân gót đoạn giữa (Mid-portion Achilles)", "Viêm gân gót điểm bám (Insertional Achilles)", "Viêm cân gan bàn chân (Plantar Fasciopathy)"],
    pathologiesEn: ["Mid-portion Achilles tendinopathy", "Insertional Achilles tendinopathy", "Plantar fasciopathy"],
    biomechanicalRulesVi: "Insertional Achilles: TUYỆT ĐỐI KHÔNG tập hạ gót qua mép bậc thang trong GĐ 1-2; bắt buộc tập trên MẶT SÀN PHẲNG (Flat floor). Mid-portion có thể tập mép bậc thang khi đã qua giai đoạn phản ứng cấp.",
    biomechanicalRulesEn: "Insertional Achilles: NEVER perform heel drops below floor level in Phase 1-2; MUST perform exclusively on FLAT FLOOR. Mid-portion can progress off a step once reactive irritability settles.",
    morningTest: {
      nameVi: "Nghiệm pháp Nhón gót một chân hết biên độ trên sàn phẳng",
      nameEn: "Single-Leg Heel Raise to Full Height on Flat Floor",
      instructionVi: "Đứng trên mặt sàn phẳng, nhón hết biên độ gót chân bên đau giữ 5 giây rồi hạ xuống chậm. Đánh giá đau gân gót.",
      instructionEn: "On flat ground, perform maximum single-leg heel raise, hold peak 5s, lower slowly. Rate Achilles pain."
    },
    p1: [
      {
        id: "foot_p1_ex1",
        name: "Single-Leg Standing Heel Raise Isometric Hold on Flat Floor",
        nameVi: "Gồng Tĩnh Nhón Gót Một Chân Trên Sàn Phẳng (Chuẩn Rio 2015 / Beyer)",
        nameEn: "Single-Leg Standing Heel Raise Isometric Hold on Flat Floor",
        reps: "5 hiệp x 45 giây giữ tĩnh (Tải 70% MVC, sàn phẳng, nghỉ 2 phút)",
        dosageVi: "5 hiệp x 45 giây giữ tĩnh ở đỉnh nhón gót trên sàn phẳng, nghỉ 2 phút",
        dosageEn: "5 sets x 45s sustained hold at peak heel raise on flat floor, 2 min rest",
        intensity: "70% MVC (Cầm tạ đơn bổ sung nếu trọng lượng cơ thể chưa đủ tải)",
        tempo: "Isometric 45s hold",
        rest: "120 giây giữa các hiệp",
        frequencyVi: "Hàng ngày (1-2 lần/ngày, cách nhau >= 6 giờ)",
        frequencyEn: "Daily (1-2x per day, spaced >= 6 hours)",
        clinicalCitation: "Rio et al. 2015 & Beyer et al. 2015 (Am J Sports Med; PMID: 26018970)",
        clinicalRationaleVi: "Gồng tĩnh ở tư thế nhón gót trên sàn phẳng (0-10 độ gập lòng bàn chân) kích hoạt cơ bụng chân (Gastrocnemius) mà không ép gân vào củ xương gót, giải phóng ức chế vỏ não và loại bỏ cứng gân sáng sớm.",
        clinicalRationaleEn: "Isometric heel raise hold on flat floor activates gastrocnemius without calcaneal bony impingement, blunting central cortical inhibition and eliminating morning stiffness.",
        painRuleVi: "Đau VAS <= 3/10 trong lúc gồng là an toàn; bắt buộc trở về mức nền sau 24 giờ.",
        painRuleEn: "Pain VAS <= 3/10 during hold is safe; MUST settle to baseline within 24 hours.",
        commonErrorsVi: [
          "Để cổ chân bị lật nghiêng vẹo trong hoặc vẹo ngoài (phải dồn lực đều vào ngón chân cái).",
          "Khuỵu đầu gối khi đang muốn nhắm vào cơ bụng chân (Gastrocnemius).",
          "Hạ gót chân sụp xuống trước khi đủ 45 giây."
        ],
        commonErrorsEn: [
          "Ankle rolling into inversion or eversion (drive pressure through great toe).",
          "Knee bending when targeting gastrocnemius.",
          "Dropping heel prematurely before 45s."
        ],
        regressionVi: "Tập hai chân cùng lúc (Bilateral heel raise hold) trên sàn phẳng.",
        regressionEn: "Bilateral standing heel raise hold on flat floor.",
        progressionVi: "Cầm tạ tay 5-10kg một bên tay cùng bên chân đau.",
        progressionEn: "Hold 5-10kg dumbbell on ipsilateral side.",
        videoUrl: "https://www.youtube.com/watch?v=SCPoAEqd87I",
        localVideoRef: "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4",
        timestampCues: [
          { timeSec: 10, labelVi: "Tư thế đứng thẳng sàn phẳng dồn lực ngón cái", labelEn: "Flat Floor Alignment & Big Toe Drive" },
          { timeSec: 35, labelVi: "Nhón hết biên độ gót giữ tĩnh 45 giây", labelEn: "Peak Heel Raise & 45s Lock" }
        ]
      },
      {
        id: "foot_p1_ex2",
        name: "Isometric Heel Raise with Rolled Towel (Rathleff 2015 Plantar Fascia)",
        nameVi: "Gồng Tĩnh Nhón Chân Cuộn Khăn Dưới Ngón (Chuẩn Rathleff 2015 Gan Chân)",
        nameEn: "Isometric Heel Raise with Rolled Towel (Rathleff 2015 Plantar Fascia)",
        reps: "5 hiệp x 45 giây giữ tĩnh (Khăn cuộn kích hoạt cơ chế Windlass)",
        dosageVi: "5 hiệp x 45 giây giữ tĩnh, nghỉ 2 phút giữa hiệp",
        dosageEn: "5 sets x 45s hold with towel under toes, 2 min rest",
        intensity: "70% MVC",
        tempo: "Isometric 45s",
        rest: "120 giây",
        frequencyVi: "Hàng ngày",
        frequencyEn: "Daily",
        clinicalCitation: "Rathleff MS et al. 2015 (Scand J Med Sci Sports; 25(3):e292-300; PMID: 25145882)",
        clinicalRationaleVi: "Cuộn khăn dưới các ngón chân kích hoạt cơ chế tời (Windlass Mechanism), làm căng cân gan chân và cơ gấp ngón chân cái, nạp tải cơ học kích thích lành mô cân gan chân.",
        clinicalRationaleEn: "Rolled towel under toes engages the Windlass Mechanism, placing tensile strain through plantar fascia and flexor hallucis longus for structural remodeling.",
        painRuleVi: "Đau VAS <= 3/10; sáng hôm sau bước bước chân đầu tiên giảm đau buốt rõ rệt.",
        painRuleEn: "Pain VAS <= 3/10; first morning steps show marked reduction in sharp pain.",
        commonErrorsVi: [
          "Khăn cuộn quá nhỏ không nâng được khớp đốt bàn ngón chân.",
          "Nhấc các ngón chân khỏi khăn.",
          "Chùng gối."
        ],
        commonErrorsEn: [
          "Towel roll too flat to extend MTP joints.",
          "Toes lifting off towel.",
          "Knee bending."
        ],
        regressionVi: "Thực hiện ở tư thế ngồi trên ghế có cuộn khăn dưới ngón.",
        regressionEn: "Seated towel-roll heel raise.",
        progressionVi: "Đeo ba lô chứa tạ 5-8kg khi thực hiện một chân.",
        progressionEn: "Wear 5-8kg weighted backpack on single leg.",
        videoUrl: "https://www.youtube.com/watch?v=UAN7-CrZnDM",
        localVideoRef: "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4",
        timestampCues: [
          { timeSec: 15, labelVi: "Kê khăn cuộn dưới các ngón chân", labelEn: "Towel Roll Placement Under Toes" },
          { timeSec: 45, labelVi: "Kích hoạt cơ chế Windlass giữ tĩnh", labelEn: "Windlass Tension & Peak Hold" }
        ]
      }
    ],
    p2: [
      {
        id: "foot_p2_ex1",
        name: "Alfredson Heavy Slow Heel Drop & Calf Raise HSR (Tempo 3-1-3)",
        nameVi: "Hạ Gót Nặng Chậm Alfredson & Nhón Bắp Chân HSR (Nhịp 3-1-3)",
        nameEn: "Alfredson Heavy Slow Heel Drop & Calf Raise HSR (Tempo 3-1-3)",
        reps: "4 hiệp x 15 RM (Tuần 5), 12 RM (Tuần 6), 10 RM (Tuần 7), 8 RM (Tuần 8)",
        dosageVi: "4 hiệp x 15 RM tiến dần về 8 RM, nhịp 3-1-3, nghỉ 2-3 phút",
        dosageEn: "4 sets x 15 RM down to 8 RM progression, 3-1-3 tempo, 2-3 min rest",
        intensity: "70-85% 1RM (Tải nặng co cơ có kiểm soát)",
        tempo: "Tempo 3-1-3 (3s hạ gót, 1s dừng kiểm soát, 3s nhón lên; 7s TUT/lần)",
        rest: "120-180 giây giữa các hiệp",
        frequencyVi: "3 buổi/tuần (cách ngày, nghỉ 48 giờ để tổng hợp collagen)",
        frequencyEn: "3 sessions/week (non-consecutive days, 48h rest for collagen synthesis)",
        clinicalCitation: "Beyer R et al. 2015 (Am J Sports Med; 43(7):1704-1711; PMID: 26018970)",
        clinicalRationaleVi: "Thử nghiệm lâm sàng của Beyer chứng minh HSR nhịp 3-1-3 đem lại điểm phục hồi VISA-A vượt trội và tỷ lệ tuân thủ cao hơn hẳn phác đồ Alfredson cũ (180 lần/ngày), tái tạo mạng lưới Collagen Type I song song cho gân gót.",
        clinicalRationaleEn: "Beyer's RCT proved 3 sessions/week of HSR (3-1-3 tempo) matched or exceeded Alfredson's eccentric heel drops (180 reps/day) in clinical VISA-A score with vastly superior patient compliance and robust Type I collagen synthesis.",
        painRuleVi: "Đau VAS <= 3/10 trong bài tập; bắt buộc trở về mức nền sau 24h.",
        painRuleEn: "Pain VAS <= 3/10 during exercise; must settle to baseline within 24h.",
        commonErrorsVi: [
          "Với viêm điểm bám (Insertional): hạ gót sâu dưới bậc thang (gây tái phát rách vi thể).",
          "Nhún giật nhả tạ nhanh ở thì hạ (làm mất kích thích căng kéo eccentric).",
          "Gập cong đầu gối (chuyển tải từ cơ bụng chân sang cơ dép)."
        ],
        commonErrorsEn: [
          "Dropping heel below step in insertional tendinopathy (causes severe bone impingement).",
          "Bouncing or rushing the 3s eccentric phase.",
          "Bending knees (unloading gastrocnemius onto soleus)."
        ],
        regressionVi: "Tập hai chân có tạ nhẹ trên mặt sàn phẳng.",
        regressionEn: "Bilateral standing heel raise on flat floor with light weight.",
        progressionVi: "Tiến lên 8 RM một chân với tạ nặng tối đa kiểm soát nhịp 3-1-3.",
        progressionEn: "Progress to true 8 RM single-leg load with strict 3-1-3 tempo.",
        videoUrl: "https://www.youtube.com/watch?v=SCPoAEqd87I",
        localVideoRef: "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4",
        timestampCues: [
          { timeSec: 10, labelVi: "Tư thế sàn phẳng (hoặc mép bậc với mid-portion)", labelEn: "Flat Floor vs Step Placement" },
          { timeSec: 40, labelVi: "Đếm nhịp 3-1-3 (7 giây mỗi lần nhón)", labelEn: "3-1-3 Cadence Breakdown" }
        ]
      },
      {
        id: "foot_p2_ex2",
        name: "Seated Calf Raise Machine (Isolating Soleus - 65% Achilles Load)",
        nameVi: "Nhón Bắp Chân Ngồi Máy Kháng Lực Chậm (Cô Lập Cơ Dép - Soleus, Nhịp 3-1-3)",
        nameEn: "Seated Calf Raise Machine (Isolating Soleus - 65% Achilles Load)",
        reps: "4 hiệp x 12-8 RM (Gối gập 90° cô lập cơ dép, Tempo 3-1-3)",
        dosageVi: "4 hiệp x 12-8 RM, nhịp 3-1-3, nghỉ 2 phút",
        dosageEn: "4 sets x 12-8 RM, 3-1-3 tempo, 2 min rest",
        intensity: "75-80% 1RM cơ dép",
        tempo: "Tempo 3-1-3",
        rest: "120 giây",
        frequencyVi: "3 buổi/tuần",
        frequencyEn: "3 sessions/week",
        clinicalCitation: "Beyer et al. 2015 & Kongsgaard et al. 2009",
        clinicalRationaleVi: "Cơ dép (Soleus) đóng góp 60-70% tổng lực cơ học mà gân gót Achilles phải chịu khi chạy. Gập gối 90 độ làm chùng cơ bụng chân, dồn toàn bộ tải trọng tái tạo vào cơ dép.",
        clinicalRationaleEn: "The soleus contributes 60-70% of total Achilles tendon force during running. 90° knee flexion slackens gastrocnemius, isolating soleus mechanotransduction.",
        painRuleVi: "Đau VAS <= 3/10; hồi phục hoàn toàn sau 24h.",
        painRuleEn: "Pain VAS <= 3/10; fully settled at 24h.",
        commonErrorsVi: [
          "Để đệm tạ đè sai vị trí trên đầu gối gây cấn xương.",
          "Hạ gót chân quá nhanh không có 1s dừng kiểm soát.",
          "Dùng tay nhấc đệm hỗ trợ."
        ],
        commonErrorsEn: [
          "Pad positioned over patella instead of distal quadriceps.",
          "Dropping heels without 1s pause.",
          "Lifting pad with hands."
        ],
        regressionVi: "Ngồi ghế đặt tạ đôi 10kg lên đùi nhón gót.",
        regressionEn: "Seated with 10kg dumbbells on knees.",
        progressionVi: "Tăng tạ máy lên 8 RM và dừng 2 giây ở đỉnh nhón.",
        progressionEn: "Progress to 8 RM machine load with 2s peak pause.",
        videoUrl: "https://www.youtube.com/watch?v=a974n8T5iTY",
        localVideoRef: "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4",
        timestampCues: [
          { timeSec: 10, labelVi: "Khóa góc gối 90° cô lập cơ dép", labelEn: "90° Knee Angle Soleus Isolation" },
          { timeSec: 35, labelVi: "Nhịp nhón 3s và hạ 3s", labelEn: "3s Raise & 3s Lower Cadence" }
        ]
      }
    ],
    p3: [
      {
        id: "foot_p3_ex1",
        name: "Full Ankle CARs & Dorsiflexion PAILs/RAILs (FRC & ATG Protocol)",
        nameVi: "Vận Động Khớp Cổ Chân Cực Hạn (Ankle CARs) & Ép Góc Gập Lưng (PAILs/RAILs)",
        nameEn: "Full Ankle CARs & Dorsiflexion PAILs/RAILs (FRC & ATG Protocol)",
        reps: "5 vòng xoay CARs mỗi chiều + 2 hiệp x 15s nén ép PAILs/RAILs góc gập sâu",
        dosageVi: "5 vòng CARs chậm mỗi chân + 2 hiệp PAILs/RAILs ở tư thế Combat Stretch",
        dosageEn: "5 slow CARs circles + 2 rounds PAILs/RAILs in Combat Stretch, 90s rest",
        intensity: "80-100% Nội lực co cơ (Maximal Irradiation)",
        tempo: "Chậm 10s/vòng CARs + 15s nén PAILs ép sàn + 15s kéo RAILs",
        rest: "90 giây",
        frequencyVi: "Hàng ngày cho CARs; 2-3 lần/tuần cho PAILs/RAILs",
        frequencyEn: "Daily for CARs; 2-3x/week for PAILs/RAILs",
        clinicalCitation: "Spina A. 2014 (Functional Anatomy Seminars) & Patrick B. 2021",
        clinicalRationaleVi: "Mở rộng biên độ gập lưng cổ chân (Dorsiflexion) có sức mạnh kiểm soát thần kinh cơ, triệt tiêu nguy cơ chấn thương gân gót và bảo vệ khớp gối khi hạ sâu.",
        clinicalRationaleEn: "Expands usable active dorsiflexion workspace, eliminating mechanical restrictions and bulletproofing against Achilles re-injury during deep athletic deceleration.",
        painRuleVi: "Không có cảm giác kẹt cứng khớp phía trước cổ chân; chỉ có cảm giác căng bắp chân sau.",
        painRuleEn: "Zero anterior ankle impingement pinch; pure posterior calf tension.",
        commonErrorsVi: [
          "Xoay đầu gối và xương chày lắc lư bù trừ thay vì xoay cổ chân.",
          "Nhấc gót chân lên khi đang tập PAILs kéo dãn.",
          "Nín thở khi đang co cơ tối đa."
        ],
        commonErrorsEn: [
          "Tibial or knee rotation compensation instead of pure talocrural motion.",
          "Heel lifting off floor during PAILs drive.",
          "Breath holding."
        ],
        regressionVi: "Ngồi trên ghế thực hiện CARs không tải trọng.",
        regressionEn: "Seated unweighted ankle CARs.",
        progressionVi: "Tư thế Combat Stretch sâu với tạ chuông 16kg đặt trên đầu gối ép sàn.",
        progressionEn: "Deep combat stretch with 16kg kettlebell over knee.",
        videoUrl: "https://www.youtube.com/watch?v=a974n8T5iTY",
        localVideoRef: "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4",
        timestampCues: [
          { timeSec: 15, labelVi: "Quét biên độ tròn CARs tối đa", labelEn: "Maximal Ankle CARs Circle" },
          { timeSec: 45, labelVi: "Kỹ thuật PAILs ấn mũi chân ép sàn", labelEn: "PAILs Ball-of-Foot Drive" }
        ]
      },
      {
        id: "foot_p3_ex2",
        name: "Elastic Ankle Hops & Pogo Spring Recoil (Achilles SSC Protocol)",
        nameVi: "Nhún Bật Lò Xo Cổ Chân Elastic Ankle Hops (Chu Kỳ Lò Xo SSC)",
        nameEn: "Elastic Ankle Hops & Pogo Spring Recoil (Achilles SSC Protocol)",
        reps: "3-4 hiệp x 20-30 lần nhún bật nhanh (Thời gian chạm đất <200ms)",
        dosageVi: "3-4 hiệp x 25 lần nhún bật lò xo nhanh, nghỉ 90s",
        dosageEn: "3-4 sets x 25 rapid spring bounces (<200ms contact time), 90s rest",
        intensity: "Tốc độ phát lực cao & Độ cứng lò xo cổ chân (Ankle Stiffness)",
        tempo: "Ballistic SSC (<200ms Ground Contact Time)",
        rest: "90-120 giây giữa các hiệp",
        frequencyVi: "2-3 buổi/tuần (cách nhau >= 48-72 giờ)",
        frequencyEn: "2-3 sessions/week (spaced >= 48-72 hours)",
        clinicalCitation: "Cook JL & Purdam CR 2016 (Br J Sports Med; PMID: 27127294)",
        clinicalRationaleVi: "Gân gót Achilles hoạt động như một lò xo tích trữ năng lượng hoàn hảo khi chạy nhảy. Bài tập Pogo Hops khôi phục khả năng co giãn đàn hồi và tốc độ phát lực nhanh (RFD).",
        clinicalRationaleEn: "The Achilles functions as the premier biological spring during locomotion. Pogo hops restore rapid stretch-shortening cycle (SSC) elastic recoil and high rate of force development.",
        painRuleVi: "VAS <= 2/10 trong bài; kiểm tra nghiệm pháp nhón gót sáng hôm sau không tăng đau.",
        painRuleEn: "VAS <= 2/10 during hops; morning single-leg heel raise at baseline.",
        commonErrorsVi: [
          "Gập gối quá nhiều biến thành bài squat nhảy (phải khóa cứng gối gần như thẳng).",
          "Tiếp đất đập gót chân xuống sàn (phải tiếp đất đàn hồi bằng ức bàn chân).",
          "Thời gian tiếp đất quá lâu (>300ms làm mất tính đàn hồi)."
        ],
        commonErrorsEn: [
          "Bending knees excessively into a squat jump (knees must remain stiff).",
          "Heel striking instead of bouncy forefoot contact.",
          "Prolonged ground contact time (>300ms losing elastic spring)."
        ],
        regressionVi: "Nhún bật hai chân có tay vịn vào lan can hỗ trợ.",
        regressionEn: "Bilateral supported pogo hops with handrail.",
        progressionVi: "Nhún bật một chân (Single-leg pogo hops) hoặc nhảy dây đúp (Double-unders).",
        progressionEn: "Single-leg pogo hops or jump rope double-unders.",
        videoUrl: "https://www.youtube.com/watch?v=eHNjINgNJzY",
        localVideoRef: "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4",
        timestampCues: [
          { timeSec: 10, labelVi: "Khóa cứng khớp gối giữ độ nảy cổ chân", labelEn: "Stiff Knee & Ankle Spring Lock" },
          { timeSec: 30, labelVi: "Chạm đất bật nảy dưới 200ms", labelEn: "Sub-200ms Ground Contact" }
        ]
      }
    ]
  }
};

// Aliases for semantic zone keys
EXERCISE_DATA.shoulder = EXERCISE_DATA.spot1;
EXERCISE_DATA.core = EXERCISE_DATA.spot2;
EXERCISE_DATA.general_strength = EXERCISE_DATA.spot2;
EXERCISE_DATA.spine = EXERCISE_DATA.spot2;
EXERCISE_DATA.elbow = EXERCISE_DATA.spot3;
EXERCISE_DATA.lower_back = EXERCISE_DATA.spot4;
EXERCISE_DATA.lumbar = EXERCISE_DATA.spot4;
EXERCISE_DATA.wrist = EXERCISE_DATA.spot5;
EXERCISE_DATA.hand = EXERCISE_DATA.spot5;
EXERCISE_DATA.hip = EXERCISE_DATA.spot6;
EXERCISE_DATA.pelvis = EXERCISE_DATA.spot6;
EXERCISE_DATA.knee = EXERCISE_DATA.spot7;
EXERCISE_DATA.patellar = EXERCISE_DATA.spot7;
EXERCISE_DATA.foot = EXERCISE_DATA.spot8;
EXERCISE_DATA.ankle = EXERCISE_DATA.spot8;
EXERCISE_DATA.achilles = EXERCISE_DATA.spot8;
EXERCISE_DATA.foot_achilles = EXERCISE_DATA.spot8;

/**
 * CLINICAL CALCULATOR ENGINE
 * Deterministic multi-variable algorithm implementing the Cook & Purdam Tendon Continuum Model:
 * Evaluates zone, chronicity, morning stiffness, activity demand, VAS pain, and load latency.
 */
/**
 * CLINICAL VIDEO LIBRARY CATALOG
 * 48 Rehabilitation Protocols (8 Zones x 3 Phases) + 57 Surgical Masterclasses (AAOS / NYU Langone)
 * Total: 105 Clinical Video Assets
 */
const VIDEO_LIBRARY_CATALOG = [
  {
    "id": "ex_shoulder_p1_01",
    "category": "rehabilitation",
    "zone": "shoulder",
    "phase": "p1",
    "title_vi": "Gồng Tĩnh Xoay Ngoài Khớp Vai Áp Tường (30° Scaption)",
    "title_en": "Isometric Wall External Rotation in 30° Scaption",
    "videoUrl": "https://www.youtube.com/watch?v=RrKFIVbS4co",
    "duration": "04:15",
    "duration_sec": 255,
    "intensity": "70% MVC Isometric",
    "dosage_vi": "5 hiệp x 45 giây giữ tĩnh, nghỉ 2 phút giữa hiệp, 1-2 lần/ngày",
    "dosage_en": "5 sets x 45s sustained holds, 2 min rest interval, 1-2x daily",
    "tempo": "Isometric 45s hold",
    "timestamps": [
      {
        "time": "00:15",
        "timeSec": 15,
        "label_vi": "Tư thế chuẩn bị & Chèn khăn nách duy trì 30° scaption",
        "label_en": "Setup & Towel Roll Placement for 30° Scaption"
      },
      {
        "time": "00:45",
        "timeSec": 45,
        "label_vi": "Kích hoạt gồng tĩnh 70% lực chống tường",
        "label_en": "70% MVC Isometric Contraction Cue against Wall"
      },
      {
        "time": "01:30",
        "timeSec": 90,
        "label_vi": "Duy trì áp lực & Kiểm soát nhịp thở hoành",
        "label_en": "Sustained Pressure & Diaphragmatic Breathing"
      },
      {
        "time": "02:15",
        "timeSec": 135,
        "label_vi": "Lỗi sai thường gặp: Xoay vặn thân mình",
        "label_en": "Common Fault: Compensatory Torso Rotation"
      }
    ],
    "rationale_vi": "Theo cơ chế Cortical Inhibition Relief (Rio et al. 2015), co cơ đẳng trường xoay ngoài khớp vai kích thích ức chế vỏ não vận động, giúp giảm đau nhạy cảm trung ương trong 45-60 phút mà không gây cọ xát gân cơ trên gai (Supraspinatus) vào vòm cùng vai (Subacromial arch). Khăn cuộn dưới nách giúp mở góc scaption 30 độ, tránh tình trạng co thắt thiếu máu tại vùng nghèo mạch Codman.",
    "rationale_en": "Per Rio et al. (2015) cortical inhibition relief, isometric external rotation down-regulates central nociceptive drive for 45-60 minutes without provoking subacromial friction on the supraspinatus tendon. The axillary towel roll maintains 30° scaption, preserving microvascular perfusion across Codman's critical zone.",
    "common_errors_vi": [
      "Lỗi 1: Ép chặt khuỷu tay vào sườn hoặc dang rộng quá 60 độ làm tăng áp lực chèn ép mỏm cùng vai.",
      "Lỗi 2: Xoay vặn toàn bộ cột sống ngực để ép mu bàn tay vào tường thay vì cô lập cơ dưới gai (Infraspinatus) và cơ tròn bé.",
      "Lỗi 3: Nín thở gồng cứng cơ thang trên (Upper Trapezius) làm nhấc mỏm vai lên trên."
    ],
    "common_errors_en": [
      "Fault 1: Excessive elbow adduction or abducting beyond 60° increasing subacromial impingement.",
      "Fault 2: Compensatory thoracic spine rotation instead of pure infraspinatus and teres minor recruitment.",
      "Fault 3: Breath holding and superior humeral translation via excessive upper trapezius hiking."
    ],
    "regression_vi": "Hạ cấp: Giảm thời gian giữ xuống 20-30 giây hoặc giảm cường độ lực gồng xuống 40-50% MVC khi đang viêm cấp đau nhiều.",
    "regression_en": "Regression: Decrease hold to 20-30s or reduce effort to 40-50% MVC during acute reactive flares.",
    "progression_vi": "Nâng cấp: Tăng tải trọng tạ ngoài với dây đàn hồi hoặc chuyển sang tư thế nằm nghiêng xoay ngoài có tạ (Side-Lying DB External Rotation - HSR).",
    "progression_en": "Progression: Introduce light elastic band pre-tensioning or transition to Side-Lying Dumbbell External Rotation (Phase 2 HSR).",
    "surgical_correlate": "04_06_Supraclavicular_Brachial_Plexus_Neurolysis.mp4"
  },
  {
    "id": "ex_shoulder_p1_02",
    "category": "rehabilitation",
    "zone": "shoulder",
    "phase": "p1",
    "title_vi": "Trượt Bả Vai Áp Tường Giữ Tĩnh (Scapular Wall Slide Hold)",
    "title_en": "Scapular Wall Slide Isometric Hold at 90°",
    "videoUrl": "https://www.youtube.com/watch?v=yvPaq5JyBPg",
    "duration": "03:45",
    "duration_sec": 225,
    "intensity": "60-70% MVC Isometric",
    "dosage_vi": "4 hiệp x 30 giây giữ tĩnh tại góc 90 độ, nghỉ 90 giây giữa hiệp",
    "dosage_en": "4 sets x 30s isometric hold at 90°, 90s rest interval",
    "tempo": "Isometric 30s hold",
    "timestamps": [
      {
        "time": "00:10",
        "timeSec": 10,
        "label_vi": "Áp cẳng tay lên tường, cổ chân và lưng dưới trung tính",
        "label_en": "Forearms on Wall, Neutral Lumbar Spine Setup"
      },
      {
        "time": "00:35",
        "timeSec": 35,
        "label_vi": "Trượt lên góc 90° và kích hoạt cơ răng trước",
        "label_en": "Slide Up to 90° & Serratus Anterior Activation"
      },
      {
        "time": "01:10",
        "timeSec": 70,
        "label_vi": "Duy trì tách xương bả vai ra ngoài (Protraction)",
        "label_en": "Sustained Scapular Upward Rotation & Protraction"
      },
      {
        "time": "01:50",
        "timeSec": 110,
        "label_vi": "Lỗi sai: Ưỡn thắt lưng để bù góc trượt",
        "label_en": "Common Fault: Lumbar Hyperextension Compensation"
      }
    ],
    "rationale_vi": "Tái kích hoạt nhịp vận động bả vai - cánh tay (Scapulohumeral Rhythm). Giữ tĩnh ở góc 90 độ kích thích cơ răng trước (Serratus Anterior) và cơ thang dưới, ngăn ngừa mỏm cùng vai sập xuống chèn ép gân chóp xoay khi nâng tay.",
    "rationale_en": "Restores scapulohumeral rhythm. Isometric holds at 90° recruit the serratus anterior and lower trapezius, optimizing upward scapular rotation and preventing anterior-superior humeral migration.",
    "common_errors_vi": [
      "Lỗi 1: Ưỡn thắt lưng và rụt cổ để cố đẩy tay lên cao.",
      "Lỗi 2: Để cẳng tay bong ra khỏi tường làm mất lực kích hoạt cơ răng trước.",
      "Lỗi 3: Ép hai xương bả vai vào nhau thay vì dang rộng ôm quanh lồng ngực."
    ],
    "common_errors_en": [
      "Fault 1: Lumbar hyperextension and cervical craning to mimic upward reach.",
      "Fault 2: Allowing elbows to drift off wall surface, uncoupling serratus tension.",
      "Fault 3: Retracting scapulae together rather than wrapping them anterolaterally across the ribcage."
    ],
    "regression_vi": "Hạ cấp: Đứng lùi gần tường hơn hoặc thực hiện biến thể gác cẳng tay lên bàn phẳng nằm ngang.",
    "regression_en": "Regression: Step closer to the wall or perform table-supported forearm slides.",
    "progression_vi": "Nâng cấp: Quàng dây kháng lực mini-band quanh cổ tay để kích hoạt cơ xoay ngoài đồng thời.",
    "progression_en": "Progression: Loop a mini-band around wrists to recruit posterior rotator cuff concurrently.",
    "surgical_correlate": "04_06_Supraclavicular_Brachial_Plexus_Neurolysis.mp4"
  },
  {
    "id": "ex_shoulder_p2_01",
    "category": "rehabilitation",
    "zone": "shoulder",
    "phase": "p2",
    "title_vi": "Nằm Nghiêng Xoay Ngoài Khớp Vai Nhịp Chậm (Side-Lying DB External Rotation)",
    "title_en": "Side-Lying Dumbbell External Rotation (Tempo 3-1-3)",
    "videoUrl": "https://www.youtube.com/watch?v=yvPaq5JyBPg",
    "duration": "05:10",
    "duration_sec": 310,
    "intensity": "70-75% 1RM (12 RM target)",
    "dosage_vi": "3-4 hiệp x 8-12 lần, Tempo 3-1-3 (3s hạ, 1s giữ, 3s nâng), nghỉ 2 phút, 3 buổi/tuần",
    "dosage_en": "3-4 sets x 8-12 reps, Tempo 3-1-3 (3s eccentric, 1s hold, 3s concentric), 2 min rest, 3x/wk",
    "tempo": "3-1-3 Heavy Slow Resistance",
    "timestamps": [
      {
        "time": "00:20",
        "timeSec": 20,
        "label_vi": "Tư thế nằm nghiêng, gối kê đầu, khăn cuộn kẹp khuỷu",
        "label_en": "Side-Lying Setup, Head Support, Elbow Towel Roll"
      },
      {
        "time": "00:50",
        "timeSec": 50,
        "label_vi": "Pha Concentric: Nâng tạ chậm 3 giây lên mặt phẳng ngang",
        "label_en": "Concentric Phase: 3-Second Controlled Raise"
      },
      {
        "time": "01:25",
        "timeSec": 85,
        "label_vi": "Điểm dừng 1 giây đẳng cự tại đỉnh phát lực",
        "label_en": "1-Second Isometric Pause at Peak Contraction"
      },
      {
        "time": "02:00",
        "timeSec": 120,
        "label_vi": "Pha Eccentric: Hạ tạ có kiểm soát chính xác 3 giây",
        "label_en": "Eccentric Phase: 3-Second Slow Lengthening"
      }
    ],
    "rationale_vi": "Giao thức Heavy Slow Resistance (HSR) theo Kongsgaard et al. (2009). Nhịp 3-1-3 duy trì lực căng cơ học liên tục 7 giây/lần lặp, kích hoạt thụ thể màng tế bào Tenocytes sản sinh Collagen Type I, tái tạo cấu trúc ma trận sợi song song của gân cơ dưới gai.",
    "rationale_en": "Heavy Slow Resistance (HSR) protocol per Kongsgaard et al. (2009). The strict 3-1-3 cadence enforces 7 seconds of continuous time-under-tension per repetition, driving mechanotransduction cascades for parallel Type I collagen synthesis.",
    "common_errors_vi": [
      "Lỗi 1: Thả rơi tạ tự do ở pha eccentric (mất 50% kích thích tái tạo gân).",
      "Lỗi 2: Xoay lật cả lồng ngực lên trần nhà để nhấc tạ cao hơn.",
      "Lỗi 3: Khuỷu tay bị nhấc bổng khỏi mạng sườn làm chuyển lực sang cơ delta sau."
    ],
    "common_errors_en": [
      "Fault 1: Dropping weight eccentrically, losing half of the mechanostimulatory loading signal.",
      "Fault 2: Rolling upper torso backward toward ceiling to artificially increase ROM.",
      "Fault 3: Lifting elbow off the ribcage, transferring load to posterior deltoid."
    ],
    "regression_vi": "Hạ cấp: Giảm mức tạ xuống 1-2kg hoặc thực hiện với dây cáp kháng lực nhẹ.",
    "regression_en": "Regression: Deload to 1-2kg dumbbell or use light elastic tubing.",
    "progression_vi": "Nâng cấp: Tăng tạ đạt mốc 8 RM hoặc thêm tạ vòng cổ tay để gia tăng lực kháng đòn bẩy.",
    "progression_en": "Progression: Increase load toward 8 RM threshold or add wrist weights to lengthen resistance arm.",
    "surgical_correlate": "07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4"
  },
  {
    "id": "ex_shoulder_p2_02",
    "category": "rehabilitation",
    "zone": "shoulder",
    "phase": "p2",
    "title_vi": "Nâng Cáp Mặt Phẳng Xương Bả Vai (Cable Scaption Full-Can Raise)",
    "title_en": "Cable Scaption Full-Can Raise (Tempo 3-1-3)",
    "videoUrl": "https://www.youtube.com/watch?v=PRFg1O8vtQI",
    "duration": "04:30",
    "duration_sec": 270,
    "intensity": "70-75% 1RM (10-12 RM)",
    "dosage_vi": "3 hiệp x 10-12 lần, Tempo 3-1-3, nâng góc 30 độ trước mặt, 3 buổi/tuần",
    "dosage_en": "3 sets x 10-12 reps, Tempo 3-1-3, 30° scapular plane, 3 sessions/week",
    "tempo": "3-1-3 Heavy Slow Resistance",
    "timestamps": [
      {
        "time": "00:15",
        "timeSec": 15,
        "label_vi": "Định vị cáp ở vị trí thấp nhất, tư thế ngón cái hướng lên (Full-Can)",
        "label_en": "Low Cable Anchor Setup, Full-Can Thumb-Up Grip"
      },
      {
        "time": "00:45",
        "timeSec": 45,
        "label_vi": "Nâng chậm 3 giây theo mặt phẳng bả vai (30° Scaption)",
        "label_en": "3-Second Concentric Raise along Scapular Plane"
      },
      {
        "time": "01:15",
        "timeSec": 75,
        "label_vi": "Dừng 1 giây ngang vai (không nâng quá 90° để tránh cọ xát)",
        "label_en": "1-Second Pause at Shoulder Level (≤ 90°)"
      },
      {
        "time": "01:55",
        "timeSec": 115,
        "label_vi": "Hạ chậm 3 giây duy trì độ căng gân trên gai",
        "label_en": "3-Second Controlled Eccentric Descent"
      }
    ],
    "rationale_vi": "Tư thế Full-Can (ngón cái hướng lên) mở rộng khoang dưới mỏm cùng vai tối đa, kích hoạt chọn lọc gân cơ trên gai với lực trượt mượt mà. Nạp tải chậm theo mặt phẳng bả vai tạo sức căng thích nghi dọc trục sinh lý của sợi gân.",
    "rationale_en": "The Full-Can position maximizes subacromial clearance, selectively loading the supraspinatus while preventing subacromial pinch. Moving within the 30° scapular plane aligns resistance directly along the tendon's anatomical fiber orientation.",
    "common_errors_vi": [
      "Lỗi 1: Xoay ngón cái chúc xuống (Empty-Can) gây kẹt gân vào mỏm cùng vai.",
      "Lỗi 2: Nâng tay quá cao vượt quá 90 độ khi chưa làm chủ kiểm soát bả vai.",
      "Lỗi 3: Dùng đà nhún người để giật tạ lên."
    ],
    "common_errors_en": [
      "Fault 1: Internal rotation (Empty-Can) causing direct subacromial tendon abutment.",
      "Fault 2: Elevating arm above 90° before adequate periscapular dynamic control is established.",
      "Fault 3: Utilizing torso momentum and knee bouncing to launch the cable."
    ],
    "regression_vi": "Hạ cấp: Sử dụng tạ tay nhẹ 1kg hoặc dây cao su kháng lực vàng.",
    "regression_en": "Regression: Deload to 1kg dumbbell or yellow light elastic band.",
    "progression_vi": "Nâng cấp: Tăng tải cáp và giữ 2 giây ở đỉnh vận động.",
    "progression_en": "Progression: Increase cable resistance with a 2-second isometric pause at 90°.",
    "surgical_correlate": "04_06_Supraclavicular_Brachial_Plexus_Neurolysis.mp4"
  },
  {
    "id": "ex_shoulder_p3_01",
    "category": "rehabilitation",
    "zone": "shoulder",
    "phase": "p3",
    "title_vi": "Xoay Khớp Vai Toàn Biên Độ FRC (Shoulder CARs 80% Irradiation)",
    "title_en": "Shoulder Controlled Articular Rotations (FRC CARs)",
    "videoUrl": "https://www.youtube.com/watch?v=RrKFIVbS4co",
    "duration": "06:10",
    "duration_sec": 370,
    "intensity": "80% Toàn thân gồng cứng (Whole-body irradiation)",
    "dosage_vi": "5 vòng xoay cực đại theo chiều kim đồng hồ + 5 vòng ngược lại mỗi bên, 2-3 buổi/tuần",
    "dosage_en": "5 maximal clockwise rotations + 5 counter-clockwise per side, 2-3 sessions/week",
    "tempo": "Chậm, kiểm soát từng milimet biên độ cực hạn",
    "timestamps": [
      {
        "time": "00:20",
        "timeSec": 20,
        "label_vi": "Khoá chặt khung chậu, gồng cơ bụng 80% áp lực",
        "label_en": "Pelvic Lock & 80% Whole-Body Abdominal Bracing"
      },
      {
        "time": "01:00",
        "timeSec": 60,
        "label_vi": "Gập vai tối đa đưa cánh tay lên sát tai",
        "label_en": "Maximal Glenohumeral Flexion to Ear Level"
      },
      {
        "time": "01:45",
        "timeSec": 105,
        "label_vi": "Bắt đầu xoay trong nội tại cực đại (Internal Rotation Drive)",
        "label_en": "End-Range Internal Rotation & Scapular Decoupling"
      },
      {
        "time": "02:30",
        "timeSec": 150,
        "label_vi": "Duỗi vai ra sau và hoàn thành quỹ đạo tròn",
        "label_en": "Terminal Extension Arc Completion"
      }
    ],
    "rationale_vi": "Nguyên lý FRC (Dr. Andreo Spina): Khớp vai cần được huấn luyện kiểm soát thần kinh cơ ở biên độ cực hạn. Xoay tròn có kiểm soát ở 80% lực kích hoạt thụ thể cơ học Mechanoreceptors trong bao khớp, kích thích tiết dịch hoạt dịch và tái định hình các bó sợi collagen ngoại vi.",
    "rationale_en": "FRC framework per Dr. Andreo Spina: The glenohumeral joint requires neurological motor control at outer articular boundaries. CARs with 80% somatic irradiation stimulate mechanoreceptors, optimize synovial fluid circulation, and condition capsular collagen.",
    "common_errors_vi": [
      "Lỗi 1: Xoay lật thân người hoặc ưỡn lưng để gian lận biên độ vai.",
      "Lỗi 2: Bỏ qua điểm xoay trong ở đỉnh cao làm giảm tác dụng mở rộng bao khớp sau.",
      "Lỗi 3: Xoay quá nhanh như vung tay làm mất lực căng bảo vệ của bao khớp."
    ],
    "common_errors_en": [
      "Fault 1: Torso rotation and lumbar arching to fake true glenohumeral excursion.",
      "Fault 2: Skimping on maximal internal rotation at the zenith of the overhead arc.",
      "Fault 3: Rapid swinging momentum eliminating neuro-muscular capsular tension."
    ],
    "regression_vi": "Hạ cấp: Giảm bán kính vòng xoay hoặc thực hiện ở tư thế ngồi tựa lưng vào tường.",
    "regression_en": "Regression: Constrain rotational diameter or perform seated against a wall back-support.",
    "progression_vi": "Nâng cấp: Cầm tạ chuông (Kettlebell) hoặc tạ đĩa 1-2kg trong lòng bàn tay khi xoay CARs.",
    "progression_en": "Progression: Hold a 1-2kg kettlebell in an open palm to amplify irradiation torque.",
    "surgical_correlate": "07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4"
  },
  {
    "id": "ex_shoulder_p3_02",
    "category": "rehabilitation",
    "zone": "shoulder",
    "phase": "p3",
    "title_vi": "Ném Bóng Bật Tường Tốc Độ Cao (Plyometric Rebound Chest Pass)",
    "title_en": "Plyometric Medicine Ball Rebound Chest Pass",
    "videoUrl": "https://www.youtube.com/watch?v=n3mLZHh5qOw",
    "duration": "03:50",
    "duration_sec": 230,
    "intensity": "Tốc độ phản xạ bộc phát (SSC - Stretch-Shortening Cycle)",
    "dosage_vi": "3 hiệp x 10-12 lần ném bắt phản hồi nhanh với bóng 2-3kg, nghỉ 2 phút",
    "dosage_en": "3 sets x 10-12 reactive passes with 2-3kg ball, 2 min rest interval",
    "tempo": "Nhanh, phản xạ co ngắn đàn hồi (< 250ms)",
    "timestamps": [
      {
        "time": "00:15",
        "timeSec": 15,
        "label_vi": "Đứng cách tường cứng 1 mét, thế tấn thể thao vững vàng",
        "label_en": "Athletic Stance, 1 Meter from Solid Wall"
      },
      {
        "time": "00:40",
        "timeSec": 40,
        "label_vi": "Ném bóng dứt khoát bằng lực đẩy ngực và vai",
        "label_en": "Explosive Chest & Anterior Shoulder Push"
      },
      {
        "time": "01:05",
        "timeSec": 65,
        "label_vi": "Đón bóng nảy lại và bật trả lập tức (SSC Spring Recoil)",
        "label_en": "Catch & Immediate Elastic Return (SSC)"
      },
      {
        "time": "01:40",
        "timeSec": 100,
        "label_vi": "Lỗi sai: Đón bóng bị lùi gót chân hoặc chùn vai",
        "label_en": "Common Fault: Collapse of Deceleration Posture"
      }
    ],
    "rationale_vi": "Tái huấn luyện chu kỳ Stretch-Shortening Cycle (SSC). Khả năng hấp thu và giải phóng lực đàn hồi là thuộc tính sống còn của gân chóp xoay khi chơi thể thao ném/đập (cầu lông, tennis, bóng chuyền).",
    "rationale_en": "Re-educates the Stretch-Shortening Cycle (SSC). Dynamic elastic recoil capacity is critical for the rotator cuff during overhead throwing and striking sports, preventing deceleration injuries.",
    "common_errors_vi": [
      "Lỗi 1: Giữ bóng quá lâu khi bóng nảy về làm mất năng lượng đàn hồi của gân.",
      "Lỗi 2: Dùng bóng quá nặng (> 4kg) làm gân bị sốc tải thụ động.",
      "Lỗi 3: Khép chặt khuỷu tay làm vai mất vị trí đón bóng trung tính."
    ],
    "common_errors_en": [
      "Fault 1: Pausing upon catch, dissipating stored elastic energy as heat.",
      "Fault 2: Using excessively heavy medicine ball (> 4kg) overloading reactive capacity.",
      "Fault 3: Tucking elbows too tightly, disrupting centrated glenohumeral deceleration."
    ],
    "regression_vi": "Hạ cấp: Ném bóng phản hồi hai tay với bóng cao su nhẹ 1kg hoặc bóng rổ.",
    "regression_en": "Regression: Use a 1kg rubber ball or basketball with reduced throwing distance.",
    "progression_vi": "Nâng cấp: Ném nảy đơn tay một bên (Single-Arm Deceleration Ball Slams).",
    "progression_en": "Progression: Single-arm unilateral deceleration wall throws.",
    "surgical_correlate": "04_06_Supraclavicular_Brachial_Plexus_Neurolysis.mp4"
  },
  {
    "id": "ex_core_p1_01",
    "category": "rehabilitation",
    "zone": "core",
    "phase": "p1",
    "title_vi": "Bài Tập Gập Bụng McGill Cải Tiến (McGill Modified Curl-Up)",
    "title_en": "McGill Modified Curl-Up (Descending Pyramid)",
    "videoUrl": "https://www.youtube.com/watch?v=b4Gd3VSdzyg",
    "duration": "04:55",
    "duration_sec": 295,
    "intensity": "Gồng đẳng cự tạo độ cứng (Torso Stiffness)",
    "dosage_vi": "Kim tự tháp lùi: 5 lần - 3 lần - 1 lần giữ 8 giây mỗi hiệp, nghỉ 60 giây",
    "dosage_en": "Descending pyramid: 5 - 3 - 1 reps of 8s holds, 60s rest between tiers",
    "tempo": "8 giây giữ tĩnh có kiểm soát hơi thở",
    "timestamps": [
      {
        "time": "00:15",
        "timeSec": 15,
        "label_vi": "Đặt hai bàn tay dưới thắt lưng đỡ đường cong sinh lý",
        "label_en": "Hand Placement under Lumbar Lordosis"
      },
      {
        "time": "00:45",
        "timeSec": 45,
        "label_vi": "Một chân co 90°, một chân duỗi thẳng khoá khung chậu",
        "label_en": "One Knee Bent, One Straight to Neutralize Pelvis"
      },
      {
        "time": "01:20",
        "timeSec": 80,
        "label_vi": "Nhấc đầu và vai cách sàn 2-3 cm (Cổ giữ thẳng)",
        "label_en": "2-3cm Head & Shoulder Lift with Packed Chin"
      },
      {
        "time": "02:00",
        "timeSec": 120,
        "label_vi": "Lỗi sai: Gập gập cổ hoặc ép bẹp thắt lưng xuống sàn",
        "label_en": "Common Fault: Cervical Craning & Lumbar Flattening"
      }
    ],
    "rationale_vi": "Nguyên lý Spine Sparing của GS. Stuart McGill: Kích hoạt nhóm cơ thẳng bụng và cơ chéo bụng tạo áo giáp cơ bảo vệ cột sống mà KHÔNG tạo tải trọng nén uốn cong đĩa đệm. Duy trì nguyên vẹn độ ưỡn thắt lưng ngăn ngừa thoát vị đĩa đệm thủy lực ra sau.",
    "rationale_en": "Prof. Stuart McGill's spine-sparing principle: Recruits rectus abdominis and obliques creating protective torso stiffness without inducing disc flexion strain. Maintaining neutral lordosis prevents hydraulic retropulsion of the nucleus pulposus.",
    "common_errors_vi": [
      "Lỗi 1: Cố cuộn gập cả lưng lên cao như gập bụng truyền thống (sit-up) gây đè ép đĩa đệm.",
      "Lỗi 2: Rút cằm hoặc ngửa cổ ra sau làm căng cứng cơ ức đòn chũm.",
      "Lỗi 3: Nín thở thay vì thở đều nông trên nền thành bụng gồng cứng."
    ],
    "common_errors_en": [
      "Fault 1: Curling full thoracic spine up like a sit-up, introducing lumbar flexion shear.",
      "Fault 2: Cervical craning or hyper-extending neck, overloading sternocleidomastoid.",
      "Fault 3: Valsalva breath-holding instead of shallow diaphragmatic breathing behind a braced wall."
    ],
    "regression_vi": "Hạ cấp: Giữ 4-5 giây mỗi lần lặp hoặc chỉ thực hiện gồng cơ bụng nằm ngửa không nhấc vai.",
    "regression_en": "Regression: Shorten holds to 4-5 seconds or perform supine abdominal bracing without shoulder lift.",
    "progression_vi": "Nâng cấp: Nhấc hai khuỷu tay cách mặt sàn 1 cm để loại bỏ hoàn toàn điểm tỳ hỗ trợ.",
    "progression_en": "Progression: Hover elbows 1cm above floor to eliminate all ground assistance.",
    "surgical_correlate": "07_04_Radius_Extensive_Volar_Henry_Approach_Cadaver.mp4"
  },
  {
    "id": "ex_core_p1_02",
    "category": "rehabilitation",
    "zone": "core",
    "phase": "p1",
    "title_vi": "Gồng Tĩnh Kháng Lực Xoay Cáp Áp Lực Ổ Bụng (Isometric Pallof Press Hold)",
    "title_en": "Isometric Pallof Press Anti-Rotation Hold",
    "videoUrl": "https://www.youtube.com/watch?v=b4Gd3VSdzyg",
    "duration": "04:10",
    "duration_sec": 250,
    "intensity": "Kháng lực xoay (Anti-Rotation) 60-70% lực",
    "dosage_vi": "4 hiệp x 30-45 giây giữ tĩnh mỗi bên, nghỉ 60 giây giữa các hiệp",
    "dosage_en": "4 sets x 30-45s hold per side, 60s rest interval",
    "tempo": "Isometric 30-45s sustained hold",
    "timestamps": [
      {
        "time": "00:15",
        "timeSec": 15,
        "label_vi": "Đứng tư thế tấn thể thao, chốt dây cáp ngang ức",
        "label_en": "Athletic Stance, Cable Anchored at Sternum Height"
      },
      {
        "time": "00:45",
        "timeSec": 45,
        "label_vi": "Đẩy hai tay thẳng ra trước mặt và khoá chặt chống xoay",
        "label_en": "Push Arms Forward & Lock Anti-Rotational Torque"
      },
      {
        "time": "01:30",
        "timeSec": 90,
        "label_vi": "Hít thở bằng cơ hoành, duy trì áp lực trong ổ bụng (IAP)",
        "label_en": "Diaphragmatic Breathing & Intra-Abdominal Pressure"
      },
      {
        "time": "02:10",
        "timeSec": 130,
        "label_vi": "Lỗi sai: Để cáp kéo xoay vặn vai hoặc lệch hông",
        "label_en": "Common Fault: Lateral Pelvic Shift or Shoulder Twist"
      }
    ],
    "rationale_vi": "Cơ hoành và nhóm cơ thành bụng sâu (Transversus Abdominis, Internal Oblique) phối hợp tạo áp lực trong ổ bụng (IAP - Intra-Abdominal Pressure). Bài tập Pallof Press chống lại lực xoắn vặn bảo vệ các đốt sống L4-S1 khỏi lực cắt ngang (Shear Force).",
    "rationale_en": "Diaphragmatic recruitment with deep abdominals generates intra-abdominal pressure (IAP). The Pallof press enforces anti-rotational stiffness, shielding the L4-S1 motion segments from destructive torsional shear forces.",
    "common_errors_vi": [
      "Lỗi 1: Để lực kéo của cáp làm xoay thân mình hoặc lệch vẹo khung chậu sang bên.",
      "Lỗi 2: Nhún vai hoặc gồng cơ cổ thay vì kích hoạt cơ bụng và cơ mông.",
      "Lỗi 3: Đứng thẳng đơ đầu gối làm mất điểm tựa vững chãi của bàn chân."
    ],
    "common_errors_en": [
      "Fault 1: Allowing cable torque to twist shoulders or cause lateral pelvic translation.",
      "Fault 2: Shrugging shoulders and recruiting neck musculature instead of core and glutes.",
      "Fault 3: Hyperextending knees, losing stable tripod foot pressure."
    ],
    "regression_vi": "Hạ cấp: Thực hiện ở tư thế quỳ hai gối (Tall Kneeling) hoặc giữ hai tay gần ngực hơn.",
    "regression_en": "Regression: Perform in tall-kneeling position or keep hands closer to sternum.",
    "progression_vi": "Nâng cấp: Tư thế quỳ một chân (Half-Kneeling) hoặc vẽ vòng tròn nhỏ với hai tay.",
    "progression_en": "Progression: Half-kneeling stance or adding small perturbation circles with arms extended.",
    "surgical_correlate": "07_04_Radius_Extensive_Volar_Henry_Approach_Cadaver.mp4"
  },
  {
    "id": "ex_core_p2_01",
    "category": "rehabilitation",
    "zone": "core",
    "phase": "p2",
    "title_vi": "Xách Tạ Một Bên Thân Nhịp Chậm (Unilateral Suitcase Carry)",
    "title_en": "Heavy Unilateral Suitcase Carry (Tempo Cadence)",
    "videoUrl": "https://www.youtube.com/watch?v=zAmvxveQcHw",
    "duration": "05:00",
    "duration_sec": 300,
    "intensity": "Tạ nặng 25-35% trọng lượng cơ thể",
    "dosage_vi": "4 hiệp x 40 bước chân chậm mỗi bên, nhịp 3 giây/bước, nghỉ 90 giây",
    "dosage_en": "4 sets x 40 deliberate paces per side (3s per step cadence), 90s rest",
    "tempo": "3 giây mỗi bước chân có kiểm soát",
    "timestamps": [
      {
        "time": "00:20",
        "timeSec": 20,
        "label_vi": "Nhấc tạ bằng tư thế Deadlift chuẩn mực, lưng thẳng",
        "label_en": "Neutral-Spine Deadlift Pickup Setup"
      },
      {
        "time": "00:50",
        "timeSec": 50,
        "label_vi": "Bước đi chậm rãi, vai và hông thăng bằng tuyệt đối",
        "label_en": "Slow Deliberate Gait with Level Shoulders and Hips"
      },
      {
        "time": "01:30",
        "timeSec": 90,
        "label_vi": "Kích hoạt cơ vuông thắt lưng đối bên (Contralateral QL)",
        "label_en": "Contralateral Quadratus Lumborum Anti-Lateral Flexion"
      },
      {
        "time": "02:15",
        "timeSec": 135,
        "label_vi": "Lỗi sai: Nghiêng người sang bên để đỡ tạ",
        "label_en": "Common Fault: Lateral Spinal Leaning or Hip Sag"
      }
    ],
    "rationale_vi": "Bài tập chống nghiêng thân mình (Anti-Lateral Flexion) kinh điển của GS. McGill. Cơ vuông thắt lưng (Quadratus Lumborum) và cơ chéo bụng đối diện phải co thắt cực đại để giữ cột sống thẳng đứng khi chịu tải lệch trục, rèn luyện khả năng truyền lực ổn định khi di chuyển.",
    "rationale_en": "Premier anti-lateral flexion drill per McGill. The contralateral quadratus lumborum and obliques contract forcefully to maintain vertical spinal orientation under asymmetric axial load, building real-world dynamic torso resilience.",
    "common_errors_vi": [
      "Lỗi 1: Nghiêng người về bên cầm tạ hoặc ưỡn ngả ra sau.",
      "Lỗi 2: Bước đi quá nhanh, lắc lư khung chậu làm mất kiểm soát tải trọng.",
      "Lỗi 3: Để tạ va đập vào đùi làm mất ổn định khớp vai."
    ],
    "common_errors_en": [
      "Fault 1: Lateral spinal bending toward the weight or hyperextending backward.",
      "Fault 2: Walking too quickly with excessive pelvic sway and lost core tension.",
      "Fault 3: Allowing dumbbell to collide against thigh, disrupting humeral stability."
    ],
    "regression_vi": "Hạ cấp: Giảm trọng lượng tạ hoặc rút ngắn cự ly bước chân xuống 20 bước.",
    "regression_en": "Regression: Decrease dumbbell load or reduce distance to 20 paces.",
    "progression_vi": "Nâng cấp: Xách tạ ở vị trí nâng ngang vai (Front Rack Carry) hoặc nhấc cao qua đầu (Waiter Carry).",
    "progression_en": "Progression: Advance to Front-Rack carry or overhead Waiter carry position.",
    "surgical_correlate": "07_04_Radius_Extensive_Volar_Henry_Approach_Cadaver.mp4"
  },
  {
    "id": "ex_core_p3_01",
    "category": "rehabilitation",
    "zone": "core",
    "phase": "p3",
    "title_vi": "Uốn Cuộn Từng Đốt Cột Sống Có Tải (Standing Loaded Jefferson Curl)",
    "title_en": "Standing Loaded Jefferson Curl (ATG Spinal Protocol)",
    "videoUrl": "https://www.youtube.com/watch?v=b4Gd3VSdzyg",
    "duration": "05:40",
    "duration_sec": 340,
    "intensity": "Tải nhẹ tăng dần (5-10kg), biên độ cực hạn",
    "dosage_vi": "3 hiệp x 6-8 lần, Tempo 4-1-4 (4s cuộn xuống, 1s giữ, 4s cuộn lên), nghỉ 2 phút",
    "dosage_en": "3 sets x 6-8 reps, Tempo 4-1-4 (4s descent, 1s hold, 4s ascent), 2 min rest",
    "tempo": "4-1-4 Phân đoạn từng đốt sống",
    "timestamps": [
      {
        "time": "00:20",
        "timeSec": 20,
        "label_vi": "Đứng trên bục cao, hai chân thẳng, cầm thanh tạ nhẹ",
        "label_en": "Box Elevation Setup, Straight Knees, Light Barbell"
      },
      {
        "time": "00:50",
        "timeSec": 50,
        "label_vi": "Cuộn cằm vào ngực, hạ từng đốt sống cổ rồi ngực",
        "label_en": "Chin Tuck & Segmental Cervical-Thoracic Flexion"
      },
      {
        "time": "01:40",
        "timeSec": 100,
        "label_vi": "Tiếp tục cuộn đốt sống thắt lưng xuống dưới mép bục",
        "label_en": "Controlled Lumbar Flexion below Platform Rim"
      },
      {
        "time": "02:30",
        "timeSec": 150,
        "label_vi": "Cuộn ngược lại từ thắt lưng lên ngực và đầu",
        "label_en": "Vertebra-by-Vertebra Segmental Ascent"
      }
    ],
    "rationale_vi": "Trường phái Sức mạnh góc tận ATG (Ben Patrick): Trái ngược với giai đoạn cấp cần giữ thẳng cột sống, khi mô đã hồi phục, hệ thống dây chằng dọc sau và cơ dựng gai sống cần được rèn luyện chịu lực căng kéo giãn ở biên độ gập tối đa với tải trọng nhẹ để tạo sức đề kháng bền bỉ trọn đời.",
    "rationale_en": "ATG end-range strength principle (Ben Patrick): Once acute tissue sensitivity settles, the posterior longitudinal ligaments and erector spinae are systematically strengthened under controlled flexion tensile load, remodeling fascial compliance and removing fear of bending.",
    "common_errors_vi": [
      "Lỗi 1: Dùng tạ quá nặng ngay từ đầu khi chưa có nền tảng phân đoạn cột sống.",
      "Lỗi 2: Trùng đầu gối làm mất lực kéo giãn chuỗi cơ gân khoeo phía sau.",
      "Lỗi 3: Gập nhanh theo quán tính thay vì uốn từng đốt sống tuần tự."
    ],
    "common_errors_en": [
      "Fault 1: Excessive loading before mastering slow segmental spinal control.",
      "Fault 2: Bending knees, uncoupling posterior fascial sling tension.",
      "Fault 3: Rapid uncontrolled dropping instead of sequential segmental articulation."
    ],
    "regression_vi": "Hạ cấp: Đứng trên mặt sàn phẳng không bục và thực hiện không tạ (Bodyweight Curl).",
    "regression_en": "Regression: Perform on flat floor without box using bodyweight only.",
    "progression_vi": "Nâng cấp: Tăng độ cao bục đứng và tải tạ lên 15-20kg với nhịp 5 giây.",
    "progression_en": "Progression: Increase box elevation and load to 15-20kg with 5-second descent tempo.",
    "surgical_correlate": "07_04_Radius_Extensive_Volar_Henry_Approach_Cadaver.mp4"
  },
  {
    "id": "ex_elbow_p1_01",
    "category": "rehabilitation",
    "zone": "elbow",
    "phase": "p1",
    "title_vi": "Gồng Tĩnh Cơ Duỗi Cổ Tay Chống Lồi Cầu Ngoài (Isometric Wrist Extension Hold)",
    "title_en": "Isometric Wrist Extension Press for ECRB Tendon",
    "videoUrl": "https://www.youtube.com/watch?v=UEFX85jM784",
    "duration": "04:20",
    "duration_sec": 260,
    "intensity": "70% MVC Isometric",
    "dosage_vi": "5 hiệp x 45 giây giữ tĩnh, cổ tay duỗi 20-30°, nghỉ 2 phút giữa hiệp, 1-2 lần/ngày",
    "dosage_en": "5 sets x 45s sustained hold at 20-30° extension, 2 min rest, 1-2x daily",
    "tempo": "Isometric 45s sustained hold",
    "timestamps": [
      {
        "time": "00:15",
        "timeSec": 15,
        "label_vi": "Đặt cẳng tay tựa trên bàn phẳng, cổ tay thò ra ngoài mép bàn",
        "label_en": "Forearm Table Support, Wrist Clearing Table Edge"
      },
      {
        "time": "00:45",
        "timeSec": 45,
        "label_vi": "Cổ tay nâng lên góc 20-30° duỗi nhẹ (Tránh góc tận nén gân)",
        "label_en": "Elevate Wrist into 20-30° Extension (Non-Compressive Arc)"
      },
      {
        "time": "01:20",
        "timeSec": 80,
        "label_vi": "Tỳ tay đối diện hoặc tạ đè ép giữ tĩnh 70% lực",
        "label_en": "Opposing Hand/Weight Isometric Press at 70% MVC"
      },
      {
        "time": "02:00",
        "timeSec": 120,
        "label_vi": "Lỗi sai: Gập cổ tay xuống dưới mép bàn gây cọ xát lồi cầu",
        "label_en": "Common Fault: Wrist Flexion below Table Edge (Fascial Shear)"
      }
    ],
    "rationale_vi": "Gân cơ duỗi cổ tay quay ngắn (ECRB - Extensor Carpi Radialis Brevis) là vị trí tổn thương chính trong Tennis Elbow. Giữ tĩnh ở góc duỗi 20-30 độ làm giảm đau qua cơ chế ức chế vỏ não vận động (Rio et al. 2015), tuyệt đối tránh góc gập cổ tay tối đa vì sẽ tạo lực ép nén gân vào lồi cầu ngoài xương cánh tay.",
    "rationale_en": "The ECRB origin is the epicenter of lateral epicondylalgia. Isometric holds at 20-30° wrist extension deliver immediate cortical analgesia while avoiding compressive tendon impingement against the lateral humeral condyle.",
    "common_errors_vi": [
      "Lỗi 1: Để cổ tay gập sâu xuống dưới mép bàn gây kéo căng nén dập gân đang viêm.",
      "Lỗi 2: Nhấc cả khuỷu tay lên khỏi mặt bàn làm chuyển tải sang cơ delta vai.",
      "Lỗi 3: Nắm chặt bàn tay quá mức làm co thắt cơ gấp ngón tay."
    ],
    "common_errors_en": [
      "Fault 1: Dropping wrist into full flexion, inducing tensile-compressive shear across inflamed enthesis.",
      "Fault 2: Lifting forearm off table, shifting torque to shoulder girdle.",
      "Fault 3: Excessive fist clenching inducing paradoxical flexor spasm."
    ],
    "regression_vi": "Hạ cấp: Giữ 20-30 giây hoặc giảm lực ép xuống 50% MVC.",
    "regression_en": "Regression: Reduce hold to 20-30s or lower effort to 50% MVC.",
    "progression_vi": "Nâng cấp: Cầm tạ đơn 2-3kg giữ tĩnh với cánh tay duỗi thẳng hoàn toàn ở khớp khuỷu.",
    "progression_en": "Progression: Hold 2-3kg dumbbell isometrically with elbow fully extended.",
    "surgical_correlate": "04_05_Cubital_Tunnel_Ulnar_Nerve_Decompression_Subcutaneous_Transposition.mp4"
  },
  {
    "id": "ex_elbow_p2_01",
    "category": "rehabilitation",
    "zone": "elbow",
    "phase": "p2",
    "title_vi": "Duỗi Cổ Tay Tạ Đơn Nhịp Chậm HSR (Heavy Slow Dumbbell Wrist Extension)",
    "title_en": "Heavy Slow Dumbbell Wrist Extension (Tempo 3-1-3)",
    "videoUrl": "https://www.youtube.com/watch?v=UEFX85jM784",
    "duration": "04:45",
    "duration_sec": 285,
    "intensity": "70-80% 1RM (10-12 RM)",
    "dosage_vi": "3-4 hiệp x 8-12 lần, Tempo 3-1-3 (3s hạ, 1s giữ, 3s nâng), nghỉ 2 phút, 3 buổi/tuần",
    "dosage_en": "3-4 sets x 8-12 reps, Tempo 3-1-3, 2 min rest interval, 3 sessions/week",
    "tempo": "3-1-3 Heavy Slow Resistance",
    "timestamps": [
      {
        "time": "00:15",
        "timeSec": 15,
        "label_vi": "Tựa cẳng tay vững vàng trên đùi hoặc ghế, lòng bàn tay úp",
        "label_en": "Forearm Thigh/Bench Support, Pronated Grip"
      },
      {
        "time": "00:45",
        "timeSec": 45,
        "label_vi": "Pha nâng: Duỗi cổ tay lên có kiểm soát trong 3 giây",
        "label_en": "Concentric Phase: 3-Second Smooth Wrist Extension"
      },
      {
        "time": "01:20",
        "timeSec": 80,
        "label_vi": "Dừng 1 giây tại đỉnh co cơ đẳng cự",
        "label_en": "1-Second Isometric Hold at Peak Contraction"
      },
      {
        "time": "01:55",
        "timeSec": 115,
        "label_vi": "Pha hạ: Hạ tạ chậm rãi 3 giây không thả rơi",
        "label_en": "Eccentric Phase: 3-Second Controlled Lowering"
      }
    ],
    "rationale_vi": "Nạp tải Heavy Slow Resistance cho gân ECRB kích hoạt dòng thác cơ sinh học (Mechanobiology), tổng hợp Collagen Type I và loại bỏ tân mạch bệnh lý (Neovascularization) thâm nhiễm thần kinh cảm giác đau.",
    "rationale_en": "Heavy Slow Resistance for ECRB triggers mechanical strain cascades, stimulating parallel Type I collagen synthesis while suppressing aberrant hypervascularity and nociceptive ingrowth.",
    "common_errors_vi": [
      "Lỗi 1: Giật cổ tay lên nhanh bằng đà ngón tay thay vì cơ cẳng tay.",
      "Lỗi 2: Thả tạ rơi tự do ở pha duỗi làm mất kích thích tái tạo.",
      "Lỗi 3: Nâng khuỷu tay lên khỏi đùi khi mỏi cơ."
    ],
    "common_errors_en": [
      "Fault 1: Jerking wrist using finger extension momentum rather than forearm extensors.",
      "Fault 2: Free-falling through the eccentric phase, eliminating strain stimulus.",
      "Fault 3: Lifting elbow off thigh support as forearm fatigues."
    ],
    "regression_vi": "Hạ cấp: Dùng tay kia hỗ trợ nâng lên ở pha concentric, chỉ tự hạ chậm ở pha eccentric (Eccentric-Only).",
    "regression_en": "Regression: Assist concentric phase with opposite hand, performing eccentric-only lowering.",
    "progression_vi": "Nâng cấp: Tăng mức tạ lên 8 RM hoặc dùng thanh uốn FlexBar (Tyler Twist protocol).",
    "progression_en": "Progression: Increase load toward 8 RM or integrate FlexBar Tyler Twist protocol.",
    "surgical_correlate": "04_05_Cubital_Tunnel_Ulnar_Nerve_Decompression_Subcutaneous_Transposition.mp4"
  },
  {
    "id": "ex_elbow_p3_01",
    "category": "rehabilitation",
    "zone": "elbow",
    "phase": "p3",
    "title_vi": "Thả Bắt Bóng Phản Xạ Đàn Hồi Cổ Tay (Reactive Drop & Catch Plyometrics)",
    "title_en": "Rapid Reactive Ball Drop & Deceleration Catch",
    "videoUrl": "https://www.youtube.com/watch?v=5u840hSkzf8",
    "duration": "03:30",
    "duration_sec": 210,
    "intensity": "Tốc độ phản xạ bộc phát (High RFD)",
    "dosage_vi": "3 hiệp x 15 lần thả bắt nhanh mỗi tay, nghỉ 90 giây giữa các hiệp",
    "dosage_en": "3 sets x 15 rapid drop-catches per arm, 90s rest interval",
    "tempo": "Phản xạ chụp bắt tức thì (< 200ms)",
    "timestamps": [
      {
        "time": "00:15",
        "timeSec": 15,
        "label_vi": "Cầm bóng tennis ngang ngực, cẳng tay duỗi thẳng",
        "label_en": "Hold Tennis Ball at Chest Height, Arm Extended"
      },
      {
        "time": "00:35",
        "timeSec": 35,
        "label_vi": "Thả bóng rơi tự do và chụp bắt lại ngay lập tức",
        "label_en": "Release Ball into Free Fall & Immediate Deceleration Catch"
      },
      {
        "time": "01:00",
        "timeSec": 60,
        "label_vi": "Kích hoạt co cơ lệch tâm tốc độ cao của nhóm cơ duỗi",
        "label_en": "High-Rate Eccentric Deceleration of Extensor Group"
      },
      {
        "time": "01:30",
        "timeSec": 90,
        "label_vi": "Lỗi sai: Đợi bóng rơi quá thấp mới chụp làm mất kiểm soát",
        "label_en": "Common Fault: Waiting for Ball to Fall Too Low"
      }
    ],
    "rationale_vi": "Tái rèn luyện tốc độ phát lực (Rate of Force Development - RFD) và khả năng hấp thu xung lực đàn hồi của gân cơ cẳng tay khi chơi thể thao dùng vợt. Phản xạ chụp bắt nhanh kích thích các thoi cơ (Muscle Spindles) tái lập độ nhạy phản xạ bảo vệ khớp khuỷu.",
    "rationale_en": "Restores Rate of Force Development (RFD) and elastic shock absorption across forearm tendons for racquet sports. Rapid drop-catches recalibrate muscle spindle sensitivity and protective stretch reflexes around the elbow joint.",
    "common_errors_vi": [
      "Lỗi 1: Chụp bóng chậm chạp sau khi bóng đã rơi khỏi tầm với tối ưu.",
      "Lỗi 2: Gập cong khuỷu tay để bù trừ thay vì cô lập bàn tay và cổ tay.",
      "Lỗi 3: Gồng cứng vai làm mất sự linh hoạt của khớp cổ tay."
    ],
    "common_errors_en": [
      "Fault 1: Sluggish catch timing after ball has escaped optimal catching arc.",
      "Fault 2: Excessive elbow flexion compensation instead of isolating wrist-finger extensors.",
      "Fault 3: Rigid shoulder bracing eliminating wrist compliance."
    ],
    "regression_vi": "Hạ cấp: Thả bóng từ độ cao thấp hơn (10-15cm) hoặc dùng bóng xốp mềm.",
    "regression_en": "Regression: Drop ball from lower height (10-15cm) or use a soft foam ball.",
    "progression_vi": "Nâng cấp: Dùng bóng tạ nhồi nước nặng 0.5-1kg để tăng xung lực phanh hãm.",
    "progression_en": "Progression: Utilize a 0.5-1kg weighted agility ball to augment braking impulse.",
    "surgical_correlate": "04_05_Cubital_Tunnel_Ulnar_Nerve_Decompression_Subcutaneous_Transposition.mp4"
  },
  {
    "id": "ex_lower_back_p1_01",
    "category": "rehabilitation",
    "zone": "lower_back",
    "phase": "p1",
    "title_vi": "Bài Tập Tấm Ván Nghiêng McGill (McGill Side Bridge / Plank)",
    "title_en": "McGill Side Bridge Isometric Endurance Protocol",
    "videoUrl": "https://www.youtube.com/watch?v=b4Gd3VSdzyg",
    "duration": "04:40",
    "duration_sec": 280,
    "intensity": "Gồng tĩnh chống trượt đốt sống (Anti-Shear Stiffness)",
    "dosage_vi": "Kim tự tháp lùi: 5 - 3 - 1 lần giữ 8-10 giây mỗi bên, nghỉ 60 giây",
    "dosage_en": "Descending pyramid: 5 - 3 - 1 reps of 8-10s holds per side, 60s rest",
    "tempo": "Isometric 8-10s holds with 2s breath reset",
    "timestamps": [
      {
        "time": "00:15",
        "timeSec": 15,
        "label_vi": "Nằm nghiêng, chống khuỷu tay vuông góc dưới khớp vai",
        "label_en": "Side-Lying Elbow Support Perpendicular Under Shoulder"
      },
      {
        "time": "00:45",
        "timeSec": 45,
        "label_vi": "Chân trên đặt trước chân dưới, nâng hông tạo đường thẳng",
        "label_en": "Top Foot Forward, Lift Hips into Straight Neutral Line"
      },
      {
        "time": "01:25",
        "timeSec": 85,
        "label_vi": "Gồng cơ vuông thắt lưng (QL) và cơ chéo bụng, giữ 10s",
        "label_en": "Activate Quadratus Lumborum & Obliques for 10s Hold"
      },
      {
        "time": "02:10",
        "timeSec": 130,
        "label_vi": "Lỗi sai: Vặn xoay người hoặc để hông chùng võng xuống",
        "label_en": "Common Fault: Hip Sag or Torso Rolling Forward"
      }
    ],
    "rationale_vi": "GS. Stuart McGill: Cơ vuông thắt lưng (Quadratus Lumborum) là trụ cột tạo độ cứng bên cho cột sống. Bài tập Side-Bridge kích hoạt cơ vuông thắt lưng cực đại với lực nén lên đĩa đệm thấp nhất (rất an toàn cho người đau thần kinh tọa, thoát vị đĩa đệm).",
    "rationale_en": "Per Prof. Stuart McGill: The quadratus lumborum provides essential lateral buttressing for the lumbar spine. The side bridge elicits high QL motor recruitment with minimal intervertebral compressive penalty, ideal for discogenic pathologies.",
    "common_errors_vi": [
      "Lỗi 1: Để hông bị tụt võng xuống sàn gây bẻ cong cột sống sang bên.",
      "Lỗi 2: Khuỷu tay đặt quá xa vai làm tăng áp lực xé khớp vai.",
      "Lỗi 3: Nín thở gồng cứng cổ thay vì thở nhịp nhàng bằng bụng."
    ],
    "common_errors_en": [
      "Fault 1: Allowing hips to sag toward floor, introducing lateral spinal bending strain.",
      "Fault 2: Elbow placed too far from shoulder, creating high glenohumeral shear.",
      "Fault 3: Holding breath with cervical tension rather than relaxed diaphragmatic respiration."
    ],
    "regression_vi": "Hạ cấp: Gập hai đầu gối 90 độ và chống bằng đầu gối (Kneeling Side Bridge).",
    "regression_en": "Regression: Bend knees to 90° and support on knees (Kneeling Side Bridge).",
    "progression_vi": "Nâng cấp: Nhấc chân trên lên cao (Side Bridge with Hip Abduction) hoặc nhấc tay trên.",
    "progression_en": "Progression: Elevate top leg into abduction (Star Plank) or add torso rotational roll.",
    "surgical_correlate": "07_04_Radius_Extensive_Volar_Henry_Approach_Cadaver.mp4"
  },
  {
    "id": "ex_lower_back_p1_02",
    "category": "rehabilitation",
    "zone": "lower_back",
    "phase": "p1",
    "title_vi": "Bài Tập Chim - Chó Săn McGill (McGill Quadruped Bird-Dog)",
    "title_en": "McGill Quadruped Bird-Dog Isometric Hold",
    "videoUrl": "https://www.youtube.com/watch?v=b4Gd3VSdzyg",
    "duration": "04:30",
    "duration_sec": 270,
    "intensity": "Chống xoay & Bảo tồn cột sống thắt lưng",
    "dosage_vi": "Kim tự tháp lùi: 5 - 3 - 1 lần giữ 8 giây mỗi bên đối diện, nghỉ 60 giây",
    "dosage_en": "Descending pyramid: 5 - 3 - 1 reps of 8s holds per opposite pair, 60s rest",
    "tempo": "Isometric 8s hold with sweep between reps",
    "timestamps": [
      {
        "time": "00:15",
        "timeSec": 15,
        "label_vi": "Tư thế bốn điểm bò (Quadruped), cổ tay dưới vai, gối dưới hông",
        "label_en": "Quadruped Setup, Wrists Under Shoulders, Knees Under Hips"
      },
      {
        "time": "00:45",
        "timeSec": 45,
        "label_vi": "Duỗi đồng thời tay trái và chân phải ra hai hướng đối lập",
        "label_en": "Simultaneous Contralateral Arm & Leg Extension"
      },
      {
        "time": "01:20",
        "timeSec": 80,
        "label_vi": "Siết cơ mông, giữ cột sống thắt lưng phẳng tuyệt đối trong 8s",
        "label_en": "Glute Lock & Flat Neutral Lumbar Spine for 8s Hold"
      },
      {
        "time": "02:00",
        "timeSec": 120,
        "label_vi": "Lỗi sai: Đá chân quá cao làm ưỡn võng thắt lưng",
        "label_en": "Common Fault: Excessive Leg Elevation Inducing Lumbar Hyperlordosis"
      }
    ],
    "rationale_vi": "Kích hoạt cơ nhiều chân (Multifidus) và cơ dựng gai sống (Erector Spinae) đối bên đồng thời với cơ mông lớn, mà không tạo ra bất kỳ lực uốn cong nào lên đĩa đệm. Tư thế đạp gót chân ra sau kích hoạt ức chế tương hỗ giảm co cứng cơ thắt lưng.",
    "rationale_en": "Recruits contralateral multifidus, erector spinae, and gluteus maximus while maintaining zero lumbar flexion/extension movement. Driving heel backward recruits reciprocal inhibition, relaxing hypertonic paraspinal musculature.",
    "common_errors_vi": [
      "Lỗi 1: Đá chân quá cao lên trời làm võng gãy thắt lưng và chèn ép khớp mỏm sau (Facet joint).",
      "Lỗi 2: Xoay lật nghiêng khung chậu sang bên khi nhấc chân.",
      "Lỗi 3: Rụt cổ hoặc cúi gập đầu nhìn xuống bụng."
    ],
    "common_errors_en": [
      "Fault 1: Kicking leg too high, arching lumbar spine and jamming facet joints.",
      "Fault 2: Lateral pelvic tilt and rotation upon leg lift.",
      "Fault 3: Cervical extension or drooping head toward the floor."
    ],
    "regression_vi": "Hạ cấp: Chỉ duỗi từng chân riêng biệt, giữ hai tay chống sàn.",
    "regression_en": "Regression: Perform single-leg extension only with both hands planted.",
    "progression_vi": "Nâng cấp: Vẽ hình vuông nhỏ bằng bàn tay và bàn chân ở điểm duỗi tận cùng.",
    "progression_en": "Progression: Draw small squares with extended hand and foot at end-range.",
    "surgical_correlate": "07_04_Radius_Extensive_Volar_Henry_Approach_Cadaver.mp4"
  },
  {
    "id": "ex_lower_back_p2_01",
    "category": "rehabilitation",
    "zone": "lower_back",
    "phase": "p2",
    "title_vi": "Cúi Gập Bản Lề Khớp Háng RDL Nhịp Chậm (Romanian Deadlift HSR)",
    "title_en": "Heavy Slow Romanian Deadlift (Hip Hinge HSR)",
    "videoUrl": "https://www.youtube.com/watch?v=b4Gd3VSdzyg",
    "duration": "05:15",
    "duration_sec": 315,
    "intensity": "70-75% 1RM (10-12 RM)",
    "dosage_vi": "4 hiệp x 8-12 lần, Tempo 3-1-3 (3s hạ, 1s giữ, 3s nâng), nghỉ 2 phút, 3 buổi/tuần",
    "dosage_en": "4 sets x 8-12 reps, Tempo 3-1-3, 2 min rest interval, 3 sessions/week",
    "tempo": "3-1-3 Heavy Slow Hip Hinge",
    "timestamps": [
      {
        "time": "00:20",
        "timeSec": 20,
        "label_vi": "Tư thế đứng thẳng, siết mông, khóa xương bả vai ra sau",
        "label_en": "Upright Stance, Glute Lock, Lat & Scapular Pack"
      },
      {
        "time": "00:50",
        "timeSec": 50,
        "label_vi": "Pha hạ: Đẩy mông ra sau 3 giây, tạ bám sát cẳng chân",
        "label_en": "3-Second Descent: Push Hips Back, Bar Skimming Shins"
      },
      {
        "time": "01:30",
        "timeSec": 90,
        "label_vi": "Dừng 1 giây tại điểm căng cơ gân khoeo (Lưng phẳng lỳ)",
        "label_en": "1-Second Pause at Hamstring Stretch Point with Flat Spine"
      },
      {
        "time": "02:10",
        "timeSec": 130,
        "label_vi": "Pha nâng: Siết mông đẩy hông về trước 3 giây",
        "label_en": "3-Second Concentric Ascent: Drive Hips Forward via Glutes"
      }
    ],
    "rationale_vi": "Phân ly vận động khớp háng - cột sống (Hip-Spine Disassociation). Chuyển toàn bộ tải trọng uốn cong ra khỏi cột sống thắt lưng và nạp vào khớp háng (cơ mông và cơ gân khoeo), rèn luyện chuỗi cơ sau chịu tải nặng theo nhịp chậm 3-1-3.",
    "rationale_en": "Hip-spine disassociation. Completely offloads flexion moment from the lumbar motion segments to the acetabulofemoral joints, conditioning the posterior chain via controlled 3-1-3 cadence.",
    "common_errors_vi": [
      "Lỗi 1: Cong lưng tôm để với tạ xuống sàn thay vì đẩy hông ra sau.",
      "Lỗi 2: Trùng đầu gối quá nhiều biến bài tập thành động tác Squat.",
      "Lỗi 3: Ngửa cổ nhìn lên gương làm bẻ gãy trục cột sống cổ."
    ],
    "common_errors_en": [
      "Fault 1: Rounding lumbar spine to reach floor instead of hinging from hips.",
      "Fault 2: Excessive knee flexion turning the movement into a squat pattern.",
      "Fault 3: Hyperextending neck to look in mirror, disrupting neutral spinal axis."
    ],
    "regression_vi": "Hạ cấp: Thực hiện đứng tựa mông vào tường đẩy mông chạm tường không tạ.",
    "regression_en": "Regression: Wall hip-hinge drill without weight pushing hips back to wall.",
    "progression_vi": "Nâng cấp: Tăng tải tạ đòn hoặc thực hiện RDL đơn chân (Single-Leg RDL).",
    "progression_en": "Progression: Barbell progressive overload or Single-Leg RDL for rotary stability.",
    "surgical_correlate": "07_04_Radius_Extensive_Volar_Henry_Approach_Cadaver.mp4"
  },
  {
    "id": "ex_lower_back_p3_01",
    "category": "rehabilitation",
    "zone": "lower_back",
    "phase": "p3",
    "title_vi": "Vung Tạ Chuông Bộc Phát Hấp Thu Xung Lực (Kettlebell Explosive Swing)",
    "title_en": "Kettlebell Explosive Hip Swing (Elastic SSC Power)",
    "videoUrl": "https://www.youtube.com/watch?v=KRfTFbeU5iM",
    "duration": "04:50",
    "duration_sec": 290,
    "intensity": "Tốc độ phát lực bộc phát (Elastic Hip Snap)",
    "dosage_vi": "4 hiệp x 12-15 lần vung tạ bộc phát, nghỉ 90 giây giữa các hiệp",
    "dosage_en": "4 sets x 12-15 explosive swings, 90s rest interval",
    "tempo": "Bộc phát, chu kỳ kéo giãn co ngắn gân cơ mông (< 1s/rep)",
    "timestamps": [
      {
        "time": "00:15",
        "timeSec": 15,
        "label_vi": "Tư thế bắt đầu: Tạ đặt trước mặt 30cm, thế tấn bắt bóng",
        "label_en": "Hike Setup: Kettlebell 30cm Ahead, Athletic Hinge Stance"
      },
      {
        "time": "00:45",
        "timeSec": 45,
        "label_vi": "Hike tạ về sát háng và búng hông bộc phát đưa tạ lên ngang ngực",
        "label_en": "Hike Between Thighs & Explosive Hip Extension Snap"
      },
      {
        "time": "01:20",
        "timeSec": 80,
        "label_vi": "Đứng thẳng như tấm ván thép ở đỉnh tạ, không ngả lưng",
        "label_en": "Standing Plank Finish at Apex with Zero Hyperextension"
      },
      {
        "time": "02:00",
        "timeSec": 120,
        "label_vi": "Lỗi sai: Dùng lực cánh tay nhấc tạ hoặc ngồi thụp squat",
        "label_en": "Common Fault: Lifting with Deltoids or Squatting the Weight"
      }
    ],
    "rationale_vi": "Tái rèn luyện chu kỳ Stretch-Shortening Cycle (SSC) của cơ mông lớn và gân khoeo. Cột sống được giữ như một 'cột trụ thép' bất động truyền tải năng lượng nổ từ khớp háng ra toàn thân, huấn luyện khả năng phản xạ bảo vệ lưng trong thể thao va chạm.",
    "rationale_en": "Re-educates the Stretch-Shortening Cycle (SSC) across gluteals and hamstrings. The lumbar spine acts as an unyielding structural pillar transmitting elastic torque from hips to limbs, bulletproofing against dynamic overload.",
    "common_errors_vi": [
      "Lỗi 1: Ngả người ưỡn thắt lưng ra sau ở đỉnh tạ thay vì khóa chặt mông và cơ bụng.",
      "Lỗi 2: Dùng cơ vai kéo tạ lên thay vì lực đẩy búng từ khớp háng.",
      "Lỗi 3: Hạ tạ xuống quá thấp dưới đầu gối làm cong vặn thắt lưng."
    ],
    "common_errors_en": [
      "Fault 1: Lumbar hyperextension at top instead of glute-abdominal plank lockout.",
      "Fault 2: Pulling kettlebell with anterior deltoids rather than hip snap drive.",
      "Fault 3: Allowing kettlebell to drop below knees, rounding lumbar spine."
    ],
    "regression_vi": "Hạ cấp: Thực hiện động tác búng hông đẩy tạ với dây kháng lực quanh hông.",
    "regression_en": "Regression: Band-resisted hip thrusts or dead-stop kettlebell swings.",
    "progression_vi": "Nâng cấp: Vung tạ một tay (Single-Arm Kettlebell Swing) đòi hỏi chống xoay tối đa.",
    "progression_en": "Progression: Single-arm kettlebell swings demanding anti-rotational core lock.",
    "surgical_correlate": "07_04_Radius_Extensive_Volar_Henry_Approach_Cadaver.mp4"
  },
  {
    "id": "ex_wrist_p1_01",
    "category": "rehabilitation",
    "zone": "wrist",
    "phase": "p1",
    "title_vi": "Gồng Tĩnh Nghiêng Quay Cổ Tay (Isometric Radial Deviation Hold)",
    "title_en": "Isometric Radial Deviation Hold (De Quervain Sheath Unloading)",
    "videoUrl": "https://www.youtube.com/watch?v=UEFX85jM784",
    "duration": "03:55",
    "duration_sec": 235,
    "intensity": "70% MVC Isometric",
    "dosage_vi": "5 hiệp x 45 giây giữ tĩnh, cổ tay ở vị trí trung tính, nghỉ 2 phút, 1-2 lần/ngày",
    "dosage_en": "5 sets x 45s sustained hold, neutral wrist, 2 min rest, 1-2x daily",
    "tempo": "Isometric 45s sustained hold",
    "timestamps": [
      {
        "time": "00:15",
        "timeSec": 15,
        "label_vi": "Tựa cạnh trụ cẳng tay lên bàn, ngón cái hướng lên trên",
        "label_en": "Ulnar Border Supported on Table, Thumb Pointing Up"
      },
      {
        "time": "00:45",
        "timeSec": 45,
        "label_vi": "Nghiêng nhẹ ngón cái lên trần nhà (Radial Deviation)",
        "label_en": "Slight Radial Deviation of Thumb toward Ceiling"
      },
      {
        "time": "01:15",
        "timeSec": 75,
        "label_vi": "Áp lực tỳ giữ tĩnh 70% lực đối kháng ở gốc ngón cái",
        "label_en": "70% MVC Opposing Isometric Pressure at Thumb Base"
      },
      {
        "time": "01:50",
        "timeSec": 110,
        "label_vi": "Lỗi sai: Gập ngón cái vào lòng bàn tay gây đau nhói bao gân",
        "label_en": "Common Fault: Thumb Flexion into Palm Provoking Sheath Pinch"
      }
    ],
    "rationale_vi": "Giải phóng gân cơ dạng dài và duỗi ngắn ngón cái (APL & EPB) trong khoang gân mu tay số 1 (De Quervain). Gồng tĩnh ở vị trí trung tính kích hoạt ức chế vỏ não giảm đau mà không gây ma sát trượt gân qua rãnh hẹp mỏm trâm quay.",
    "rationale_en": "Unloads abductor pollicis longus (APL) and extensor pollicis brevis (EPB) within the first dorsal compartment (De Quervain). Isometric loading in neutral elicits cortical analgesia without friction across the radial styloid sheath.",
    "common_errors_vi": [
      "Lỗi 1: Gập ngón cái sâu vào lòng bàn tay rồi bẻ nghiêng trụ (tư thế nghiệm pháp Finkelstein) gây rách vi thể.",
      "Lỗi 2: Nhấc cổ tay lên khỏi mặt bàn làm mất điểm tỳ ổn định.",
      "Lỗi 3: Gồng cứng các ngón tay còn lại thay vì chỉ cô lập bờ quay cổ tay."
    ],
    "common_errors_en": [
      "Fault 1: Clenching thumb into palm and ulnar deviating (Finkelstein test position) aggravating sheath.",
      "Fault 2: Lifting forearm off table, losing stable unweighted baseline.",
      "Fault 3: Excessive co-contraction of digits 2-5 instead of isolating the radial border."
    ],
    "regression_vi": "Hạ cấp: Giữ 20-30 giây hoặc chỉ thực hiện gồng cơ dạng ngón cái không dùng lực cản ngoài.",
    "regression_en": "Regression: 20-30s holds or active thumb abduction against gravity without resistance.",
    "progression_vi": "Nâng cấp: Dùng búa cán dài cầm ở đuôi cán để tạo lực đòn bẩy kháng lực nghiêng quay.",
    "progression_en": "Progression: Hold end of a hammer handle to augment radial deviation lever torque.",
    "surgical_correlate": "03_01_De_Quervain_Pulley_Reconstruction_Retinacular_Graft.mp4"
  },
  {
    "id": "ex_wrist_p1_02",
    "category": "rehabilitation",
    "zone": "wrist",
    "phase": "p1",
    "title_vi": "Bài Tập Trượt Gân Bàn Tay 6 Tư Thế (Active Tendon Gliding Exercises)",
    "title_en": "Active 6-Stage Tendon Gliding Maneuver",
    "videoUrl": "https://www.youtube.com/watch?v=-_6gr8_fVss",
    "duration": "04:20",
    "duration_sec": 260,
    "intensity": "Vận động chủ động không đau",
    "dosage_vi": "3 hiệp x 10 chu kỳ hoàn chỉnh, thực hiện 2-3 lần mỗi ngày",
    "dosage_en": "3 sets x 10 complete cycles, performed 2-3 times daily",
    "tempo": "Chậm rãi, giữ 3 giây ở mỗi tư thế bàn tay",
    "timestamps": [
      {
        "time": "00:15",
        "timeSec": 15,
        "label_vi": "Tư thế 1 & 2: Bàn tay mở thẳng duỗi ngón -> Tư thế Móc vuốt (Hook Fist)",
        "label_en": "Stage 1 & 2: Straight Hand to Hook Fist (Max FDS/FDP Differential Glide)"
      },
      {
        "time": "00:50",
        "timeSec": 50,
        "label_vi": "Tư thế 3: Nắm tay hoàn toàn (Full Fist - Trượt tối đa FDP)",
        "label_en": "Stage 3: Full Fist (Maximal FDP Excursion)"
      },
      {
        "time": "01:25",
        "timeSec": 85,
        "label_vi": "Tư thế 4: Mặt bàn phẳng (Table Top - Khớp bàn ngón gập 90°)",
        "label_en": "Stage 4: Table Top (Intrinsic Lumbrical Activation)"
      },
      {
        "time": "02:00",
        "timeSec": 120,
        "label_vi": "Tư thế 5 & 6: Nắm tay thẳng (Straight Fist) và mở bung",
        "label_en": "Stage 5 & 6: Straight Fist (Max FDS Excursion) & Full Open"
      }
    ],
    "rationale_vi": "Bài tập vàng phục hồi sự trượt tương đối giữa gân gấp nông (FDS) và gân gấp sâu (FDP) qua hệ thống ròng rọc A1-A5. Ngăn chặn hiện tượng xơ dính bao gân sau phẫu thuật hoặc viêm bao gân gấp ngón tay lò xo (Trigger Finger).",
    "rationale_en": "Gold-standard protocol maximizing differential excursion between flexor digitorum superficialis (FDS) and profundus (FDP) through the A1-A5 pulley system. Prevents tenosynovial adhesions and resolves trigger finger crepitus.",
    "common_errors_vi": [
      "Lỗi 1: Làm nhanh qua loa không đạt biên độ gập tối đa ở từng khớp đốt ngón.",
      "Lỗi 2: Gồng bóp tay quá mạnh gây kích ứng ròng rọc A1 đang viêm.",
      "Lỗi 3: Quên giữ thẳng cổ tay khi vận động các ngón tay."
    ],
    "common_errors_en": [
      "Fault 1: Rushing through transitions without reaching full joint excursion at each position.",
      "Fault 2: Aggressive squeezing during fists aggravating an inflamed A1 pulley.",
      "Fault 3: Allowing wrist to flex or extend uncontrollably during finger gliding."
    ],
    "regression_vi": "Hạ cấp: Ngâm bàn tay trong nước ấm 38°C trong 5 phút trước khi tập trượt gân.",
    "regression_en": "Regression: Warm water soak at 38°C for 5 minutes prior to gliding maneuvers.",
    "progression_vi": "Nâng cấp: Quàng dây chun nhẹ quanh đầu các ngón tay để tạo lực kháng nhẹ.",
    "progression_en": "Progression: Add light rubber-band finger resistance across distal phalanges.",
    "surgical_correlate": "03_02_Trigger_Finger_&_Trigger_Thumb_Surgical_Anatomy_Release.mp4"
  },
  {
    "id": "ex_wrist_p2_01",
    "category": "rehabilitation",
    "zone": "wrist",
    "phase": "p2",
    "title_vi": "Chuỗi Tập Cổ Tay 4 Mặt Phẳng Nhịp Chậm (4-Plane Dumbbell Wrist HSR)",
    "title_en": "4-Plane Dumbbell Wrist Circuit (Tempo 3-1-3)",
    "videoUrl": "https://www.youtube.com/watch?v=UEFX85jM784",
    "duration": "05:30",
    "duration_sec": 330,
    "intensity": "70-75% 1RM (10-12 RM)",
    "dosage_vi": "3 hiệp x 10 lần trong cả 4 mặt phẳng (Gập, Duỗi, Nghiêng quay, Nghiêng trụ), 3 buổi/tuần",
    "dosage_en": "3 sets x 10 reps in all 4 planes (Flexion, Extension, Radial, Ulnar Deviation), 3x/wk",
    "tempo": "3-1-3 Heavy Slow Resistance",
    "timestamps": [
      {
        "time": "00:20",
        "timeSec": 20,
        "label_vi": "Mặt phẳng 1: Gập cổ tay ngửa bàn tay (Wrist Flexion Curls)",
        "label_en": "Plane 1: Supinated Wrist Flexion Curls (FCR/FCU HSR)"
      },
      {
        "time": "01:10",
        "timeSec": 70,
        "label_vi": "Mặt phẳng 2: Duỗi cổ tay úp bàn tay (Wrist Extension Curls)",
        "label_en": "Plane 2: Pronated Wrist Extension Curls (ECRL/ECRB HSR)"
      },
      {
        "time": "02:00",
        "timeSec": 120,
        "label_vi": "Mặt phẳng 3: Nghiêng quay với tạ đơn cầm lệch đầu",
        "label_en": "Plane 3: Radial Deviation with Offset Dumbbell"
      },
      {
        "time": "02:50",
        "timeSec": 170,
        "label_vi": "Mặt phẳng 4: Nghiêng trụ kiểm soát chậm rãi 3-1-3",
        "label_en": "Plane 4: Controlled Ulnar Deviation (ECU/FCU Stability)"
      }
    ],
    "rationale_vi": "Khớp cổ tay là cấu trúc đa trục phức tạp gồm 8 xương cổ tay. Nạp tải Heavy Slow Resistance trong cả 4 mặt phẳng vận động tái cấu trúc sụn tam giác (TFCC), màng liên cốt và các dây chằng gian cổ tay, tạo độ vững chắc toàn diện cho bàn tay.",
    "rationale_en": "The carpus comprises 8 complex articulating bones. Multi-planar HSR loading conditions the triangular fibrocartilage complex (TFCC), interosseous membrane, and intercarpal ligaments for robust grip stability.",
    "common_errors_vi": [
      "Lỗi 1: Dùng tạ quá nặng làm cổ tay bị bẻ gãy trục ở cuối biên độ.",
      "Lỗi 2: Nhấc cẳng tay lên khỏi điểm tỳ làm mất kiểm soát cơ biệt lập.",
      "Lỗi 3: Bỏ qua mặt phẳng nghiêng trụ (nơi gân ECU dễ bị tổn thương)."
    ],
    "common_errors_en": [
      "Fault 1: Excessive weight forcing joint collapse at terminal range of motion.",
      "Fault 2: Arm lifting off bench, compensating with shoulder and elbow drive.",
      "Fault 3: Skipping ulnar deviation where ECU tendon subluxation frequently occurs."
    ],
    "regression_vi": "Hạ cấp: Tập với tạ 1kg hoặc dây cao su kháng lực dẹt.",
    "regression_en": "Regression: 1kg dumbbell or flat therapeutic resistance bands.",
    "progression_vi": "Nâng cấp: Dùng tạ đòn cẳng tay chuyên dụng hoặc tăng tạ lên 8 RM.",
    "progression_en": "Progression: Forearm roller device or increasing resistance toward 8 RM threshold.",
    "surgical_correlate": "02_10_TFCC_Central_Tears_Repair_Technical_Trick_Shin.mp4"
  },
  {
    "id": "ex_wrist_p3_01",
    "category": "rehabilitation",
    "zone": "wrist",
    "phase": "p3",
    "title_vi": "Kéo Giãn Góc Tận Lòng Bàn Tay Có Tải (End-Range Palms-Down Floor Stretch)",
    "title_en": "End-Range Palms-Down Loaded Floor Conditioning",
    "videoUrl": "https://www.youtube.com/watch?v=-_6gr8_fVss",
    "duration": "04:15",
    "duration_sec": 255,
    "intensity": "Tải trọng cơ thể kiểm soát ở biên độ cực hạn",
    "dosage_vi": "3 hiệp x 45 giây giữ có tải + 10 nhịp co cơ chủ động chống sàn, 2-3 buổi/tuần",
    "dosage_en": "3 sets x 45s loaded hold + 10 active floor press pulses, 2-3 sessions/week",
    "tempo": "45 giây kéo giãn có tải + nhịp đè 5 giây",
    "timestamps": [
      {
        "time": "00:15",
        "timeSec": 15,
        "label_vi": "Quỳ bốn điểm, xoay bàn tay sao cho các ngón tay hướng về đầu gối",
        "label_en": "Quadruped Setup, Turn Palms Down with Fingers Facing Knees"
      },
      {
        "time": "00:50",
        "timeSec": 50,
        "label_vi": "Khóa thẳng khớp khuỷu, từ từ ngả hông ra sau kéo căng cẳng tay",
        "label_en": "Lock Elbows, Shift Hips Back into Forearm Flexor Stretch"
      },
      {
        "time": "01:30",
        "timeSec": 90,
        "label_vi": "Kích hoạt PAILs: Đè mạnh 10 đầu ngón tay xuống sàn 10 giây",
        "label_en": "PAILs Contraction: Drive Fingertips Hard into Floor for 10s"
      },
      {
        "time": "02:15",
        "timeSec": 135,
        "label_vi": "Lỗi sai: Trùng khuỷu tay hoặc để gốc bàn tay bong khỏi sàn",
        "label_en": "Common Fault: Elbow Bending or Heel of Hand Peeling Off Floor"
      }
    ],
    "rationale_vi": "Nguyên lý PAILs/RAILs của FRC kết hợp sức mạnh góc tận ATG: Mở rộng biên độ duỗi cổ tay thụ động lên > 90 độ và nạp lực gồng cơ đẳng cự tối đa ở góc tận cùng. Giúp cổ tay chịu được các tư thế chống đẩy, trồng chuối (handstand), hay té ngã chống tay mà không bị bong gân.",
    "rationale_en": "FRC PAILs/RAILs and ATG end-range conditioning: Expands passive wrist extension beyond 90° while establishing active isometric motor control, rendering wrists resilient during push-ups, handstands, or fall-arrest loading.",
    "common_errors_vi": [
      "Lỗi 1: Nhấc lòng bàn tay hoặc khớp đốt bàn ngón tay lên khỏi mặt sàn.",
      "Lỗi 2: Trùng khuỷu tay làm triệt tiêu sức căng của gân cơ gấp chung các ngón.",
      "Lỗi 3: Ngả người ra sau quá nhanh gây sốc tải dây chằng cổ tay."
    ],
    "common_errors_en": [
      "Fault 1: Palmar heel peeling off the floor, dissipating retinacular load.",
      "Fault 2: Bending elbows, slacking the flexor digitorum muscle bellies.",
      "Fault 3: Aggressive backward lunging shocking the radiocarpal ligaments."
    ],
    "regression_vi": "Hạ cấp: Đặt tay trên mặt bàn nâng cao hoặc hướng ngón tay chếch sang hai bên.",
    "regression_en": "Regression: Table-top elevation or angling fingers laterally at 45°.",
    "progression_vi": "Nâng cấp: Chuyển một phần trọng lượng cơ thể thành tư thế Chống Đẩy (Push-Up) với tay xoay ngược.",
    "progression_en": "Progression: Progress toward reverse-palm push-up position.",
    "surgical_correlate": "07_03_Volar_Wrist_Approach_&_Bruner_Zigzag_Incision_Anatomy.mp4"
  },
  {
    "id": "ex_hip_p1_01",
    "category": "rehabilitation",
    "zone": "hip",
    "phase": "p1",
    "title_vi": "Gồng Tĩnh Dang Háng Nằm Nghiêng (Side-Lying Isometric Hip Abduction)",
    "title_en": "Side-Lying Isometric Hip Abduction (Zero Adduction Hold)",
    "videoUrl": "https://www.youtube.com/watch?v=VSi9x8dzSnU",
    "duration": "04:30",
    "duration_sec": 270,
    "intensity": "70% MVC Isometric",
    "dosage_vi": "5 hiệp x 45 giây giữ tĩnh, chân hơi duỗi sau và xoay trong nhẹ, nghỉ 2 phút, 1-2 lần/ngày",
    "dosage_en": "5 sets x 45s sustained hold with slight hip extension, 2 min rest, 1-2x daily",
    "tempo": "Isometric 45s hold",
    "timestamps": [
      {
        "time": "00:15",
        "timeSec": 15,
        "label_vi": "Nằm nghiêng, gối kê đầu, chân dưới hơi co vững trục",
        "label_en": "Side-Lying Setup, Bottom Knee Bent for Pelvic Stability"
      },
      {
        "time": "00:45",
        "timeSec": 45,
        "label_vi": "Chân trên nâng cao 30°, hơi duỗi ra sau mặt phẳng thân",
        "label_en": "Elevate Top Leg 30° with Slight Posterior Extension"
      },
      {
        "time": "01:20",
        "timeSec": 80,
        "label_vi": "Gồng cứng cơ mông nhỡ (Gluteus Medius), giữ 45 giây",
        "label_en": "Gluteus Medius Isometric Lock at 70% MVC for 45s"
      },
      {
        "time": "02:00",
        "timeSec": 120,
        "label_vi": "Lỗi sai: Xoay lật mũi chân lên trời làm kích hoạt sai cơ TFL",
        "label_en": "Common Fault: External Foot Flare Dominating with TFL"
      }
    ],
    "rationale_vi": "Viêm gân cơ mông nhỡ và mấu chuyển lớn (GTPS - Greater Trochanteric Pain Syndrome): Tuyệt đối tránh tư thế khép háng qua đường giữa (Adduction) vì dải chậu chày sẽ ép nát gân vào mấu chuyển lớn. Giữ tĩnh ở góc dang 30 độ giảm đau tức thì qua ức chế vỏ não mà không tạo lực nén cơ học.",
    "rationale_en": "Greater Trochanteric Pain Syndrome (GTPS): Hip adduction past midline severely compresses gluteus medius/minimus tendons against the greater trochanter. Isometric abduction at 30° delivers cortical analgesia without compressive shear.",
    "common_errors_vi": [
      "Lỗi 1: Xoay mũi chân lên trần nhà khiến cơ căng mạc đùi (TFL) cướp quyền kích hoạt của cơ mông nhỡ.",
      "Lỗi 2: Đưa chân ra trước mặt thay vì giữ hơi duỗi ra sau.",
      "Lỗi 3: Nghiêng ngửa khung chậu ra sau khi mỏi chân."
    ],
    "common_errors_en": [
      "Fault 1: External rotation of foot, causing tensor fasciae latae (TFL) dominance.",
      "Fault 2: Drifting leg forward into flexion instead of maintaining slight extension.",
      "Fault 3: Rolling pelvis backward as gluteal fatigue sets in."
    ],
    "regression_vi": "Hạ cấp: Giữ 20-30 giây hoặc đặt gối ôm giữa hai chân ở tư thế nằm nghiêng.",
    "regression_en": "Regression: 20-30s holds or placing a pillow between knees in side-lying rest.",
    "progression_vi": "Nâng cấp: Đeo tạ vòng cổ chân 1-2kg hoặc áp gót chân giữ tĩnh vào tường.",
    "progression_en": "Progression: Add 1-2kg ankle weights or wall-drive isometric resistance.",
    "surgical_correlate": "07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4"
  },
  {
    "id": "ex_hip_p2_01",
    "category": "rehabilitation",
    "zone": "hip",
    "phase": "p2",
    "title_vi": "Tấm Ván Copenhagen Khép Háng Nhịp Chậm (Heavy Slow Copenhagen Adductor)",
    "title_en": "Heavy Slow Copenhagen Adductor Plank (Tempo 3-1-3)",
    "videoUrl": "https://www.youtube.com/watch?v=D9YimkCIQ6s",
    "duration": "05:00",
    "duration_sec": 300,
    "intensity": "Kháng lực cao cơ khép háng (Adductor Longus HSR)",
    "dosage_vi": "3-4 hiệp x 8-10 lần hạ nâng chậm (hoặc giữ 30s), Tempo 3-1-3, nghỉ 2 phút, 3 buổi/tuần",
    "dosage_en": "3-4 sets x 8-10 slow reps (or 30s hold), Tempo 3-1-3, 2 min rest, 3x/week",
    "tempo": "3-1-3 Heavy Slow Resistance",
    "timestamps": [
      {
        "time": "00:20",
        "timeSec": 20,
        "label_vi": "Đặt mặt trong cổ chân hoặc gối chân trên lên ghế tập",
        "label_en": "Bench Placement on Medial Malleolus or Knee"
      },
      {
        "time": "00:50",
        "timeSec": 50,
        "label_vi": "Chống khuỷu tay nâng thân mình lên thành một đường thẳng",
        "label_en": "Forearm Side-Bridge Elevating Torso into Line"
      },
      {
        "time": "01:30",
        "timeSec": 90,
        "label_vi": "Hạ hông chậm 3 giây và nâng lên co cơ khép háng 3 giây",
        "label_en": "3-Second Descent & 3-Second Concentric Adductor Lift"
      },
      {
        "time": "02:15",
        "timeSec": 135,
        "label_vi": "Lỗi sai: Gập gãy hông hoặc để đầu gối chân trên bị vặn xoắn",
        "label_en": "Common Fault: Hip Flexion Sag or Medial Knee Shear"
      }
    ],
    "rationale_vi": "Tiêu chuẩn vàng phục hồi cơ khép dài (Adductor Longus) và khớp mu (Osteitis Pubis). Nạp tải Heavy Slow Resistance làm tăng sức căng chịu lực của gân cơ khép, giải quyết tận gốc chứng đau háng mãn tính ở vận động viên bóng đá và điền kinh.",
    "rationale_en": "Gold-standard intervention for adductor longus tendinopathy and athletic pubalgia. HSR Copenhagen loading augments adductor eccentric strength and tendon stiffness, preventing recurrent groin strains.",
    "common_errors_vi": [
      "Lỗi 1: Đặt điểm tỳ ở mắt cá chân quá sớm khi sức mạnh gối chưa đủ gây đau dây chằng bên trong (MCL).",
      "Lỗi 2: Gập hông ra trước làm mất độ căng thẳng trục của nhóm cơ khép.",
      "Lỗi 3: Nín thở gồng cứng cổ gây tăng huyết áp đột ngột."
    ],
    "common_errors_en": [
      "Fault 1: Lever arm too long on ankle too soon, transferring valgus stress to MCL.",
      "Fault 2: Flexing hips forward, disengaging pure adductor plane tension.",
      "Fault 3: Breath-holding inducing excessive cardiovascular strain."
    ],
    "regression_vi": "Hạ cấp: Tỳ khớp gối lên ghế thay vì mắt cá chân để rút ngắn đòn bẩy chịu lực.",
    "regression_en": "Regression: Shorten lever arm by placing bench contact under the knee joint.",
    "progression_vi": "Nâng cấp: Tỳ mũi chân xa nhất trên ghế và đeo thêm áo tạ có trọng lượng.",
    "progression_en": "Progression: Distal foot contact only with a weighted vest.",
    "surgical_correlate": "07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4"
  },
  {
    "id": "ex_hip_p3_01",
    "category": "rehabilitation",
    "zone": "hip",
    "phase": "p3",
    "title_vi": "Xoay Khớp Háng 90/90 Nâng Chân Góc Tận FRC (90/90 Active Hip CARs & Lift-Offs)",
    "title_en": "90/90 Active Hip Rotations & End-Range Lift-Offs",
    "videoUrl": "https://www.youtube.com/watch?v=VSi9x8dzSnU",
    "duration": "05:45",
    "duration_sec": 345,
    "intensity": "Sức mạnh góc tận nội xoay & ngoại xoay khớp háng",
    "dosage_vi": "2-3 hiệp x 8-10 lần nhấc chân giữ 3 giây ở góc tận cùng mỗi bên, 2-3 buổi/tuần",
    "dosage_en": "2-3 sets x 8-10 end-range lift-offs (3s peak hold) per side, 2-3 sessions/week",
    "tempo": "Kiểm soát chủ động không dùng quán tính",
    "timestamps": [
      {
        "time": "00:20",
        "timeSec": 20,
        "label_vi": "Ngồi tư thế 90/90: Gối trước 90°, gối sau 90°, thân thẳng",
        "label_en": "90/90 Seated Stance: Both Knees & Hips at 90°"
      },
      {
        "time": "00:55",
        "timeSec": 55,
        "label_vi": "Gồng cơ bụng, chủ động nhấc gót chân sau lên khỏi sàn (Nội xoay)",
        "label_en": "Internal Rotation Lift-Off: Elevate Back Heel Actively"
      },
      {
        "time": "01:40",
        "timeSec": 100,
        "label_vi": "Giữ 3 giây tại đỉnh cao nhất mà không nghiêng người",
        "label_en": "3-Second Isometric Hold at Absolute Terminal Arc"
      },
      {
        "time": "02:25",
        "timeSec": 145,
        "label_vi": "Lỗi sai: Nghiêng gập người sang bên đối diện để nhấc chân",
        "label_en": "Common Fault: Excessive Lateral Torso Leaning Compensation"
      }
    ],
    "rationale_vi": "Nguyên lý FRC (Dr. Andreo Spina): Hầu hết chấn thương háng xuất phát từ việc thiếu hụt góc xoay trong chủ động (Active Internal Rotation). Bài tập biến độ dẻo thụ động thành sức mạnh cơ bắp thực sự ở góc tận cùng, bảo vệ sụn viền khớp háng (Labrum).",
    "rationale_en": "FRC framework per Dr. Spina: Hip pathology frequently stems from loss of active internal rotation. End-range lift-offs convert passive laxity into active neurological motor control, decompressing the acetabular labrum.",
    "common_errors_vi": [
      "Lỗi 1: Đổ nghiêng cả người sang bên đối diện để gian lận nhấc chân lên cao.",
      "Lỗi 2: Bị chuột rút cơ mông nhỡ do gồng đột ngột khi chưa khởi động kỹ.",
      "Lỗi 3: Chân sau không mở đủ góc 90 độ ở khớp gối."
    ],
    "common_errors_en": [
      "Fault 1: Drastic lateral trunk lean to mechanically cheat leg height.",
      "Fault 2: Gluteal cramping from sudden unprimed end-range contraction.",
      "Fault 3: Allowing posterior knee to collapse inside 90° arc."
    ],
    "regression_vi": "Hạ cấp: Chống hai tay xuống sàn hỗ trợ hoặc kê mông ngồi lên một gối đệm.",
    "regression_en": "Regression: Hand support on floor or sitting on a yoga block to elevate pelvis.",
    "progression_vi": "Nâng cấp: Khoanh hai tay trước ngực và chuyển thế từ 90/90 sang tư thế ngồi thẳng không chạm tay.",
    "progression_en": "Progression: Hands folded across chest performing active 90/90 hip switches.",
    "surgical_correlate": "07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4"
  },
  {
    "id": "ex_knee_p1_01",
    "category": "rehabilitation",
    "zone": "knee",
    "phase": "p1",
    "title_vi": "Gồng Tĩnh Dây Đai Squat Tây Ban Nha (Spanish Squat Isometric Hold)",
    "title_en": "Spanish Squat Isometric Hold (Cook & Rio Gold Standard)",
    "videoUrl": "https://www.youtube.com/watch?v=zAmvxveQcHw",
    "duration": "04:50",
    "duration_sec": 290,
    "intensity": "70% MVC Isometric (Tải nặng gân bánh chè)",
    "dosage_vi": "5 hiệp x 45 giây giữ tĩnh ở góc gối 60°, nghỉ đúng 2 phút giữa hiệp, 1-2 lần/ngày",
    "dosage_en": "5 sets x 45s sustained hold at 60° knee flexion, 2 min rest interval, 1-2x daily",
    "tempo": "Isometric 45s sustained hold",
    "timestamps": [
      {
        "time": "00:20",
        "timeSec": 20,
        "label_vi": "Cố định dây đai cứng sau khoeo chân, đứng lùi căng dây",
        "label_en": "Rigid Strap Anchored Behind Popliteal Creases"
      },
      {
        "time": "00:50",
        "timeSec": 50,
        "label_vi": "Hạ mông xuống góc gối 60°, giữ cẳng chân thẳng đứng 90°",
        "label_en": "Lower Hips to 60° Knee Flexion, Vertical Shins (90° to Floor)"
      },
      {
        "time": "01:30",
        "timeSec": 90,
        "label_vi": "Khoanh tay trước ngực, duy trì lực căng gân bánh chè 45s",
        "label_en": "Arms Folded across Chest, Sustaining 70% MVC Tension"
      },
      {
        "time": "02:15",
        "timeSec": 135,
        "label_vi": "Lỗi sai: Đẩy đầu gối vượt mũi chân làm tăng lực cắt gối",
        "label_en": "Common Fault: Knees Drifting Forward Past Toes (Shear Penalty)"
      }
    ],
    "rationale_vi": "Phác đồ tiêu chuẩn vàng của GS. Jill Cook & TS. Ebonie Rio (2015). Dây đai sau khoeo cho phép người bệnh giữ cẳng chân hoàn toàn thẳng đứng, triệt tiêu lực cắt trượt (Anterior Shear) và góc ép nhọn lên gân bánh chè, kích hoạt cơ chế ức chế vỏ não vận động giúp xóa bỏ cơn đau gân bánh chè (Jumper's Knee) tức thì trong 45-60 phút.",
    "rationale_en": "Cook & Rio (2015) gold standard for patellar tendinopathy. The popliteal strap enforces vertical shins, eliminating anterior tibial shear while allowing high quadriceps torque at 60° knee flexion. Induces 45-60 minutes of cortical inhibition relief and analgesia.",
    "common_errors_vi": [
      "Lỗi 1: Để đầu gối trôi về phía trước vượt quá mũi chân (mất tác dụng của dây đai giữ cẳng chân thẳng).",
      "Lỗi 2: Hạ gối quá sâu (> 90 độ) tạo lực ép nén nhọn giữa gân và cực dưới xương bánh chè.",
      "Lỗi 3: Nghỉ giữa hiệp quá ngắn (< 2 phút) làm tế bào thần kinh vận động chưa kịp tái nạp năng lượng ATP."
    ],
    "common_errors_en": [
      "Fault 1: Knees translating forward over toes, forfeiting vertical shin mechanics.",
      "Fault 2: Squatting beyond 90°, inducing high tendon-bone impingement at inferior patellar pole.",
      "Fault 3: Rest interval < 2 minutes, failing corticospinal neuro-motor recovery."
    ],
    "regression_vi": "Hạ cấp: Giảm góc gối xuống 45 độ hoặc tập tư thế Wall Sit dựa lưng vào tường.",
    "regression_en": "Regression: Shallow knee angle to 45° or perform standard wall-sit.",
    "progression_vi": "Nâng cấp: Ôm thêm tạ đĩa 10-20kg trước ngực hoặc thực hiện bằng một chân.",
    "progression_en": "Progression: Hold 10-20kg plate at chest or progress to single-leg Spanish squat.",
    "surgical_correlate": "07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4"
  },
  {
    "id": "ex_knee_p2_01",
    "category": "rehabilitation",
    "zone": "knee",
    "phase": "p2",
    "title_vi": "Đạp Đùi 45 Độ Nhịp Chậm HSR (45° Incline Leg Press HSR)",
    "title_en": "Heavy Slow 45° Leg Press (Kongsgaard 2009 Protocol)",
    "videoUrl": "https://www.youtube.com/watch?v=N1GnUR7ezaU",
    "duration": "05:15",
    "duration_sec": 315,
    "intensity": "Tiến triển từ 15 RM (Tuần 5) xuống 8 RM (Tuần 8)",
    "dosage_vi": "3-4 hiệp x 8-15 lần, Tempo 3-1-3 (3s hạ, 1s giữ ở 90°, 3s đạp), nghỉ 2-3 phút, 3 buổi/tuần",
    "dosage_en": "3-4 sets x 8-15 reps progressing from 15RM to 8RM, Tempo 3-1-3, 2-3 min rest, 3x/wk",
    "tempo": "3-1-3 Heavy Slow Resistance",
    "timestamps": [
      {
        "time": "00:20",
        "timeSec": 20,
        "label_vi": "Đặt hai bàn chân giữa bàn đạp, lưng và mông dán chặt vào ghế",
        "label_en": "Mid-Platform Foot Placement, Glutes & Lumbar Glued to Seat"
      },
      {
        "time": "00:50",
        "timeSec": 50,
        "label_vi": "Hạ tạ chậm rãi đúng 3 giây cho tới góc gối 90°",
        "label_en": "3-Second Controlled Eccentric Descent to 90° Knee Flexion"
      },
      {
        "time": "01:30",
        "timeSec": 90,
        "label_vi": "Dừng tĩnh 1 giây tại điểm 90° triệt tiêu lực quán tính",
        "label_en": "1-Second Isometric Pause at 90° (Zero Momentum)"
      },
      {
        "time": "02:10",
        "timeSec": 130,
        "label_vi": "Đạp lên chậm 3 giây bằng lực cơ tứ đầu (Không khóa khớp gối)",
        "label_en": "3-Second Concentric Push via Quads (Soft Knee Lockout)"
      }
    ],
    "rationale_vi": "Nghiên cứu kinh điển Kongsgaard et al. (2009): Heavy Slow Resistance trên máy Leg Press vượt trội hơn tiêm corticoid và bài tập gập duỗi nhanh. Kích thích tăng sinh nguyên bào gân Tenocytes, làm dày thiết diện ngang gân bánh chè (Cross-Sectional Area) và tăng mật độ Collagen Type I song song.",
    "rationale_en": "Kongsgaard et al. (2009) seminal trial: Heavy Slow Resistance leg press outperforms corticosteroids and passive rest. Strains the healthy aligned fibrillar matrix ('treating the doughnut'), inducing tendon hypertrophy and collagen cross-linking.",
    "common_errors_vi": [
      "Lỗi 1: Đạp hết biên độ rồi giật khóa khớp gối (khớp gối gắt) gây xung chấn lên sụn bánh chè.",
      "Lỗi 2: Nhấc mông và cuộn thắt lưng lên khỏi ghế khi hạ tạ sâu.",
      "Lỗi 3: Hạ tạ quá nhanh trong 1 giây làm mất 50% thời gian chịu lực căng của gân."
    ],
    "common_errors_en": [
      "Fault 1: Violent knee hyperextension lockout, sending impact stress to patellofemoral cartilage.",
      "Fault 2: Pelvis lifting and lumbar posterior tilting at bottom of press.",
      "Fault 3: Rapid 1-second drop, forfeiting eccentric mechanotransductive signaling."
    ],
    "regression_vi": "Hạ cấp: Giảm mức tạ xuống 50% 1RM hoặc thực hiện bài Squat tựa tường với bóng.",
    "regression_en": "Regression: Reduce to 50% 1RM or perform Swiss ball wall squats.",
    "progression_vi": "Nâng cấp: Thực hiện bài Squat trên ván nghiêng 25° (25° Decline Board Squat) hoặc đạp đơn chân.",
    "progression_en": "Progression: Single-leg leg press or 25° decline slant-board squats.",
    "surgical_correlate": "07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4"
  },
  {
    "id": "ex_knee_p3_01",
    "category": "rehabilitation",
    "zone": "knee",
    "phase": "p3",
    "title_vi": "Chùng Chân Gập Sâu Đầu Gối Qua Mũi Chân (ATG Split Squat)",
    "title_en": "ATG Split Squat (Full Knee Bend Over Toes)",
    "videoUrl": "https://www.youtube.com/watch?v=N1GnUR7ezaU",
    "duration": "05:50",
    "duration_sec": 350,
    "intensity": "Tải trọng cơ thể tới tạ đơn cầm tay, biên độ cực đại",
    "dosage_vi": "4 hiệp x 6-8 lần mỗi bên, Tempo 3-1-3, bắp đùi chạm bắp chân, 2-3 buổi/tuần",
    "dosage_en": "4 sets x 6-8 reps per leg, Tempo 3-1-3, full hamstring-calf coverage, 2-3x/wk",
    "tempo": "3-1-3 Kiểm soát sâu góc tận",
    "timestamps": [
      {
        "time": "00:20",
        "timeSec": 20,
        "label_vi": "Tư thế chùng chân bước dài, thân người thẳng đứng",
        "label_en": "Long Lunge Stance, Upright Vertical Torso"
      },
      {
        "time": "00:55",
        "timeSec": 55,
        "label_vi": "Đẩy gối trước qua mũi chân, bắp đùi sau ép chặt bắp chân",
        "label_en": "Drive Knee Over Toes Until Hamstring Completely Covers Calf"
      },
      {
        "time": "01:40",
        "timeSec": 100,
        "label_vi": "Chân sau duỗi thẳng tuyệt đối, kéo căng cơ thắt lưng chậu",
        "label_en": "Back Leg Completely Straight, Stretching Hip Flexor"
      },
      {
        "time": "02:30",
        "timeSec": 150,
        "label_vi": "Đạp gót chân trước nâng người lên chậm rãi",
        "label_en": "Drive Through Front Foot to Smooth Concentric Return"
      }
    ],
    "rationale_vi": "Trường phái Knees Over Toes (Ben Patrick): Xóa tan định kiến sai lầm 'không được để đầu gối vượt mũi chân'. Khi cơ bắp và gân đã được tôi luyện qua Phase 1 và 2, việc nạp tải ở góc gập gối tối đa kích thích tái tạo sụn khớp bánh chè đùi, nuôi dưỡng bao khớp qua dịch hoạt dịch và xây dựng sức mạnh cơ rộng trong (VMO).",
    "rationale_en": "Ben Patrick (ATG) philosophy: Overcomes outdated biomechanical myths regarding knees past toes. Full knee flexion under progressive control stimulates patellofemoral cartilage nutrition, strengthens the vastus medialis oblique (VMO), and builds structural resilience.",
    "common_errors_vi": [
      "Lỗi 1: Gập người chúc về phía trước làm mất sự kéo căng của chân sau và giảm tải lên gối trước.",
      "Lỗi 2: Trùng gối chân sau khiến khung chậu bị lệch trục xoay.",
      "Lỗi 3: Nhấc gót chân trước lên khỏi mặt đất khi chưa kê bục hỗ trợ."
    ],
    "common_errors_en": [
      "Fault 1: Forward torso collapse, slacking hip flexor and reducing front quad loading.",
      "Fault 2: Bending back knee, allowing pelvis to rotate out of neutral alignment.",
      "Fault 3: Heel violently lifting without an elevated foot wedge."
    ],
    "regression_vi": "Hạ cấp: Kê chân trước lên bục cao 20-30cm hoặc nắm tay vào lan can trợ lực.",
    "regression_en": "Regression: Elevate front foot on a 20-30cm step or use handrail assistance.",
    "progression_vi": "Nâng cấp: Thực hiện dưới sàn phẳng cầm hai quả tạ đơn nặng 25% trọng lượng cơ thể.",
    "progression_en": "Progression: Flat ground stance holding dumbbells equal to 25% bodyweight.",
    "surgical_correlate": "07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4"
  },
  {
    "id": "ex_knee_p3_02",
    "category": "rehabilitation",
    "zone": "knee",
    "phase": "p3",
    "title_vi": "Kéo Xe Đi Lùi Tăng Tuần Hoàn Nuôi Dưỡng Gối (Backward Sled Drag / Reversing)",
    "title_en": "Backward Sled Drag / Reversing (Non-Impact VMO Pump)",
    "videoUrl": "https://www.youtube.com/watch?v=eHNjINgNJzY",
    "duration": "04:10",
    "duration_sec": 250,
    "intensity": "Chịu tải chuyển động liên tục không va đập",
    "dosage_vi": "3-5 phút đi lùi liên tục với xe kéo tạ (hoặc máy chạy tắt điện), 2-3 buổi/tuần",
    "dosage_en": "3-5 minutes continuous backward drag with sled, 2-3 sessions/week",
    "tempo": "Nhịp nhàng từng bước đạp mũi chân qua gót",
    "timestamps": [
      {
        "time": "00:15",
        "timeSec": 15,
        "label_vi": "Quàng đai kéo quanh hông, cầm dây đai căng chắc chắn",
        "label_en": "Waist Harness Strap Connection, Firm Grip"
      },
      {
        "time": "00:45",
        "timeSec": 45,
        "label_vi": "Đi lùi từng bước dứt khoát: Tiếp đất bằng mũi chân rồi đạp gót",
        "label_en": "Toe-to-Heel Backward Roll with Deliberate Knee Extension"
      },
      {
        "time": "01:25",
        "timeSec": 85,
        "label_vi": "Mỗi bước đi kích hoạt cơ rộng trong (VMO) và bơm máu vào gối",
        "label_en": "Continuous VMO Contraction & Synovial Fluid Perfusion"
      },
      {
        "time": "02:10",
        "timeSec": 130,
        "label_vi": "Lỗi sai: Ngả người quá nhiều ra sau thay vì dùng lực đạp của đùi",
        "label_en": "Common Fault: Passive Torso Leaning Instead of Active Quad Drive"
      }
    ],
    "rationale_vi": "Đi lùi có tải (Reversing) là bài tập an toàn tuyệt đối vì hoàn toàn KHÔNG có lực phản chấn từ mặt đất (Zero Ground Impact). Mỗi bước đi lùi kích hoạt cơ rộng trong (VMO) từ góc duỗi gối, bơm dòng máu giàu dưỡng chất vào gân bánh chè và tái lập độ trơn trượt của khớp.",
    "rationale_en": "Backward sled dragging provides zero impact-shock ground reaction force while delivering continuous concentric vastus medialis (VMO) stimulation. It pumps nutrient-rich blood and synovial fluid into avascular tendon matrix zones.",
    "common_errors_vi": [
      "Lỗi 1: Bước đi quá dài làm gối bị ưỡn khóa quá mức về sau.",
      "Lỗi 2: Để dây đai giật cục không duy trì được lực căng liên tục.",
      "Lỗi 3: Ngửa đầu ra sau làm mất thăng bằng."
    ],
    "common_errors_en": [
      "Fault 1: Over-striding backward causing hyperextension snapping of knee joints.",
      "Fault 2: Jerky cable tension losing smooth continuous quadriceps engagement.",
      "Fault 3: Looking upward, compromising cervical alignment and balance."
    ],
    "regression_vi": "Hạ cấp: Đi bộ lùi trên dốc nhẹ hoặc trên máy chạy bộ tắt nguồn bằng sức chân.",
    "regression_en": "Regression: Backward incline walking or walking backward on an unpowered treadmill.",
    "progression_vi": "Nâng cấp: Tăng tải xe kéo lên 50-100% trọng lượng cơ thể.",
    "progression_en": "Progression: Increase sled load toward 50-100% bodyweight.",
    "surgical_correlate": "07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4"
  },
  {
    "id": "ex_achilles_p1_01",
    "category": "rehabilitation",
    "zone": "achilles",
    "phase": "p1",
    "title_vi": "Gồng Tĩnh Nhón Gót Một Chân Mặt Sàn Phẳng (Single-Leg Isometric Calf Raise)",
    "title_en": "Single-Leg Flat-Floor Isometric Calf Raise",
    "videoUrl": "https://www.youtube.com/watch?v=SCPoAEqd87I",
    "duration": "04:25",
    "duration_sec": 265,
    "intensity": "70% MVC Isometric (Tải nặng gân gót)",
    "dosage_vi": "5 hiệp x 45 giây giữ tĩnh ở đỉnh nhón gót trên mặt sàn phẳng, nghỉ 2 phút, 1-2 lần/ngày",
    "dosage_en": "5 sets x 45s sustained hold at peak plantarflexion on flat floor, 2 min rest, 1-2x daily",
    "tempo": "Isometric 45s sustained hold",
    "timestamps": [
      {
        "time": "00:15",
        "timeSec": 15,
        "label_vi": "Đứng trên mặt sàn phẳng (Tuyệt đối không đứng mép bậc thang ở Phase 1)",
        "label_en": "Flat Floor Stance (Avoid Step Edges in Phase 1)"
      },
      {
        "time": "00:45",
        "timeSec": 45,
        "label_vi": "Nhón cao gót chân lên hết biên độ, dồn trọng tâm vào ngón chân cái",
        "label_en": "Elevate to Peak Plantarflexion, Weight on 1st/2nd Metatarsals"
      },
      {
        "time": "01:25",
        "timeSec": 85,
        "label_vi": "Giữ gối thẳng (hoặc hơi chùng 10°), duy trì áp lực gân gót 45s",
        "label_en": "Sustain Isometric Calf-Achilles Tension for 45s"
      },
      {
        "time": "02:05",
        "timeSec": 125,
        "label_vi": "Lỗi sai: Lật nghiêng bàn chân ra mép ngoài (bàn chân lật ngoài)",
        "label_en": "Common Fault: Supinating Ankle, Losing Great Toe Grounding"
      }
    ],
    "rationale_vi": "Phác đồ điều trị gân gót Achilles theo Cook & Rio: Bệnh lý gân gót chia thành thể thân gân (Mid-portion) và thể điểm bám (Insertional). Ở Phase 1, BẮT BUỘC tập trên MẶT SÀN PHẲNG để tránh gập mu chân (Dorsiflexion) gây lực ép nén nhọn gân vào củ xương gót. Giữ tĩnh 45s kích hoạt ức chế vỏ não xóa đau và cứng khớp buổi sáng.",
    "rationale_en": "Achilles protocol per Cook & Purdam: In acute or insertional tendinopathy, loading MUST occur on a FLAT FLOOR to eliminate compressive dorsiflexion impingement against the calcaneal tuberosity. Sustained 45s isometric hold delivers profound pain relief.",
    "common_errors_vi": [
      "Lỗi 1: Đứng ở mép bậc thang để gót chân tụt xuống dưới mặt sàn gây chèn ép gân gót điểm bám.",
      "Lỗi 2: Nghiêng bàn chân ra ngón út làm mất kích hoạt gân cơ bụng chân trong.",
      "Lỗi 3: Chùng gối quá nhiều chuyển tải lệch sang cơ dép khi đang muốn nạp cơ bụng chân.",
      "Lỗi 4: Nghỉ giữa hiệp quá ngắn (< 2 phút) không đủ tái nạp thần kinh cơ."
    ],
    "common_errors_en": [
      "Fault 1: Dropping heel below step in insertional tendinopathy provoking retrocalcaneal bursitis.",
      "Fault 2: Ankle supination rolling onto lateral border, losing first ray windlass drive.",
      "Fault 3: Excessive knee bending uncoupling gastrocnemius tension.",
      "Fault 4: Rushing rest interval under 2 minutes."
    ],
    "regression_vi": "Hạ cấp: Nhón gót hai chân cùng lúc (Bilateral) hoặc giảm thời gian giữ xuống 20-30 giây.",
    "regression_en": "Regression: Bilateral double-leg calf raise hold or reduce hold to 20-30s.",
    "progression_vi": "Nâng cấp: Cầm thêm tạ đơn 10-15kg ở tay cùng bên để tăng tải lên 70% MVC.",
    "progression_en": "Progression: Hold 10-15kg dumbbell in ipsilateral hand to ensure true 70% MVC load.",
    "surgical_correlate": "07_07_Transtibial_Amputation_AMI_Technique_Colin_Harrington.mp4"
  },
  {
    "id": "ex_achilles_p1_02",
    "category": "rehabilitation",
    "zone": "achilles",
    "phase": "p1",
    "title_vi": "Gồng Tĩnh Cơ Gấp Ngón Cái Kẹp Khăn Cuộn (Great Toe Flexor Towel Hold)",
    "title_en": "Plantar Fascia & Great Toe Flexor Towel Isometric (Rathleff 2015)",
    "videoUrl": "https://www.youtube.com/watch?v=UAN7-CrZnDM",
    "duration": "03:50",
    "duration_sec": 230,
    "intensity": "Kích hoạt cơ chế Windlass (Cơ học cân gan chân)",
    "dosage_vi": "4 hiệp x 45 giây giữ tĩnh nhón gót với khăn cuộn dưới các ngón chân, nghỉ 90 giây",
    "dosage_en": "4 sets x 45s isometric heel raise with rolled towel under toes, 90s rest",
    "tempo": "Isometric 45s hold",
    "timestamps": [
      {
        "time": "00:15",
        "timeSec": 15,
        "label_vi": "Cuộn một chiếc khăn tắm đặt dưới các ngón chân để ngón cái duỗi 30°",
        "label_en": "Rolled Towel Placement Under Toes (30° Extension)"
      },
      {
        "time": "00:45",
        "timeSec": 45,
        "label_vi": "Nhấc gót chân lên cao, kích hoạt cơ chế tời Windlass của cân gan chân",
        "label_en": "Heel Raise Engaging Windlass Mechanism of Plantar Fascia"
      },
      {
        "time": "01:20",
        "timeSec": 80,
        "label_vi": "Bấm chặt đầu ngón cái xuống khăn, duy trì lực căng 45 giây",
        "label_en": "Press Big Toe Firmly into Towel, Sustaining 45s Tension"
      },
      {
        "time": "02:00",
        "timeSec": 120,
        "label_vi": "Lỗi sai: Gập co quắp các ngón chân thay vì ấn thẳng trục",
        "label_en": "Common Fault: Clawing Toes Instead of Planar Digital Press"
      }
    ],
    "rationale_vi": "Nghiên cứu kinh điển Rathleff et al. (2015): Kê khăn cuộn dưới ngón chân tạo góc duỗi ngón chân cái 30 độ, siết chặt cơ chế tời Windlass làm căng cân gan chân và cơ gấp ngón cái dài (FHL). Nạp tải đẳng trường giúp giảm viêm và xóa bỏ cơn đau nhói thấu xương gót khi bước bước chân đầu tiên buổi sáng.",
    "rationale_en": "Rathleff et al. (2015) landmark study: Placing a rolled towel under the toes pre-tensions the windlass mechanism, stiffening the plantar fascia and flexor hallucis longus. Delivers targeted mechanotransduction, eliminating acute first-step morning heel pain.",
    "common_errors_vi": [
      "Lỗi 1: Khăn cuộn quá mỏng không nâng đủ góc duỗi ngón chân cái.",
      "Lỗi 2: Nhón gót lệch ra ngoài làm trượt cân gan chân khỏi rãnh chịu lực.",
      "Lỗi 3: Nín thở gồng cứng khớp gối."
    ],
    "common_errors_en": [
      "Fault 1: Towel roll too flat, failing to induce meaningful windlass tension.",
      "Fault 2: Lateral ankle roll slacking medial slip of plantar fascia.",
      "Fault 3: Hyperextending knee joint rigidly."
    ],
    "regression_vi": "Hạ cấp: Thực hiện ở tư thế ngồi trên ghế (Seated Towel Press) giảm bớt trọng lượng.",
    "regression_en": "Regression: Perform seated in a chair to reduce bodyweight percentage.",
    "progression_vi": "Nâng cấp: Đứng một chân với ba lô tạ 5-10kg trên lưng.",
    "progression_en": "Progression: Single-leg standing with a 5-10kg weighted backpack.",
    "surgical_correlate": "07_07_Transtibial_Amputation_AMI_Technique_Colin_Harrington.mp4"
  },
  {
    "id": "ex_achilles_p2_01",
    "category": "rehabilitation",
    "zone": "achilles",
    "phase": "p2",
    "title_vi": "Hạ Gót Nặng Nhịp Chậm Alfredson HSR (Alfredson Heavy Slow Heel Drop)",
    "title_en": "Alfredson Heavy Slow Resistance Heel Drop (Beyer 2015)",
    "videoUrl": "https://www.youtube.com/watch?v=SCPoAEqd87I",
    "duration": "05:20",
    "duration_sec": 320,
    "intensity": "Tiến triển từ 15 RM xuống 8 RM (Tạ nặng)",
    "dosage_vi": "3-4 hiệp x 8-12 lần, Tempo 3-1-3 (3s hạ, 1s giữ, 3s nâng), nghỉ 2 phút, 3 buổi/tuần",
    "dosage_en": "3-4 sets x 8-12 reps, Tempo 3-1-3, 2 min rest interval, 3 sessions/week",
    "tempo": "3-1-3 Heavy Slow Resistance",
    "timestamps": [
      {
        "time": "00:20",
        "timeSec": 20,
        "label_vi": "Đứng mép bậc thang (thể thân gân) hoặc mặt sàn phẳng (thể điểm bám)",
        "label_en": "Step Edge Stance (Mid-Portion) or Flat Floor (Insertional)"
      },
      {
        "time": "00:50",
        "timeSec": 50,
        "label_vi": "Nâng lên bằng 2 chân, nhấc 1 chân và hạ chậm 3 giây có tải",
        "label_en": "Ascend Bilaterally, Transfer to Single-Leg for 3s Slow Lowering"
      },
      {
        "time": "01:35",
        "timeSec": 95,
        "label_vi": "Dừng 1 giây tại điểm thấp nhất kiểm soát hoàn toàn sức căng",
        "label_en": "1-Second Pause at Lowest Controlled Plantar Point"
      },
      {
        "time": "02:15",
        "timeSec": 135,
        "label_vi": "Nâng lên chậm rãi 3 giây duy trì nhịp 3-1-3 đồng tốc",
        "label_en": "3-Second Concentric Raise Maintaining Strict Cadence"
      }
    ],
    "rationale_vi": "Nghiên cứu Beyer et al. (2015): Heavy Slow Resistance 3 buổi/tuần cho kết quả tương đương hoặc vượt trội so với phác đồ tập lệch tâm cũ của Alfredson (180 lần/ngày), với tỷ lệ tuân thủ cao hơn gấp 3 lần. Nhịp 3-1-3 kích thích tổng hợp Collagen Type I dọc theo trục kéo dài của gân gót.",
    "rationale_en": "Beyer et al. (2015): HSR 3 days per week achieved equivalent or superior VISA-A improvements compared to classic Alfredson eccentric loading (180 reps/day) with dramatically higher compliance. The 3-1-3 cadence remodels aligned collagen fascicles.",
    "common_errors_vi": [
      "Lỗi 1: Hạ gót quá sâu ở bệnh nhân viêm gân gót điểm bám (Insertional) gây bùng phát viêm bao hoạt dịch sau xương gót.",
      "Lỗi 2: Nhún nảy tạ bằng quán tính ở cuối biên độ thay vì kiểm soát cơ bắp.",
      "Lỗi 3: Dùng tạ quá nhẹ không đạt ngưỡng kích hoạt dòng thác cơ học mechanotransduction."
    ],
    "common_errors_en": [
      "Fault 1: Dropping heel below step in insertional tendinopathy provoking retrocalcaneal bursitis.",
      "Fault 2: Bouncing elastically at bottom instead of controlled muscular deceleration.",
      "Fault 3: Using loads too light to exceed the 4% mechanical tendon strain threshold."
    ],
    "regression_vi": "Hạ cấp: Nâng lên bằng hai chân và chỉ hạ xuống bằng một chân (Eccentric-Only).",
    "regression_en": "Regression: Bilateral ascent with single-leg eccentric lowering.",
    "progression_vi": "Nâng cấp: Gánh thêm đòn tạ trên lưng hoặc dùng máy Smith Machine đạt mốc 8 RM.",
    "progression_en": "Progression: Barbell on back or Smith machine loading progressing to 8 RM.",
    "surgical_correlate": "07_07_Transtibial_Amputation_AMI_Technique_Colin_Harrington.mp4"
  },
  {
    "id": "ex_achilles_p2_02",
    "category": "rehabilitation",
    "zone": "achilles",
    "phase": "p2",
    "title_vi": "Nhón Bắp Chân Ngồi Cô Lập Cơ Dép (Seated Soleus Calf Raise HSR)",
    "title_en": "Seated Soleus Calf Raise (Deep Achilles Motor HSR)",
    "videoUrl": "https://www.youtube.com/watch?v=SCPoAEqd87I",
    "duration": "04:40",
    "duration_sec": 280,
    "intensity": "70-80% 1RM (10-12 RM)",
    "dosage_vi": "3-4 hiệp x 10-12 lần, Tempo 3-1-3, gối gập 90 độ, nghỉ 2 phút, 3 buổi/tuần",
    "dosage_en": "3-4 sets x 10-12 reps, Tempo 3-1-3, knees flexed 90°, 2 min rest, 3x/wk",
    "tempo": "3-1-3 Heavy Slow Resistance",
    "timestamps": [
      {
        "time": "00:15",
        "timeSec": 15,
        "label_vi": "Ngồi trên ghế, gối gập 90° để vô hiệu hóa cơ bụng chân hai khớp",
        "label_en": "Seated Stance, Knees Flexed 90° to Sliders Gastrocnemius"
      },
      {
        "time": "00:45",
        "timeSec": 45,
        "label_vi": "Đặt tạ lên đùi trên đầu gối, kê mũi chân trên bục gỗ 5cm",
        "label_en": "Weight on Distal Thighs, Forefeet on 5cm Block"
      },
      {
        "time": "01:25",
        "timeSec": 85,
        "label_vi": "Nhón gót chậm 3 giây lên đỉnh cao, dừng 1 giây đẳng cự",
        "label_en": "3-Second Concentric Raise, 1-Second Peak Pause"
      },
      {
        "time": "02:05",
        "timeSec": 125,
        "label_vi": "Hạ gót chậm 3 giây cảm nhận sức căng cơ dép sâu",
        "label_en": "3-Second Eccentric Lowering Feeling Deep Soleus Burn"
      }
    ],
    "rationale_vi": "Cơ dép (Soleus) chịu trách nhiệm tới 60-70% tổng lực tải truyền qua gân gót Achilles khi chạy nhảy (lực tải lên tới 6-8 lần trọng lượng cơ thể). Khi gối gập 90 độ, cơ bụng chân bị chùng lại (Active Insufficiency), buộc cơ dép phải chịu toàn bộ tải trọng tái tạo gân.",
    "rationale_en": "The soleus contributes 60-70% of total plantarflexion propulsion forces transmitted through the Achilles during running (up to 8x bodyweight). At 90° knee flexion, the gastrocnemius is actively slackened, selectively loading the soleus.",
    "common_errors_vi": [
      "Lỗi 1: Ngồi trượt mông ra sau làm góc gối tù không cô lập được cơ dép.",
      "Lỗi 2: Giật tạ nảy bằng lò xo gân thay vì co cơ chủ động 3-1-3.",
      "Lỗi 3: Đặt tạ quá gần háng thay vì tỳ trên đầu gối."
    ],
    "common_errors_en": [
      "Fault 1: Sitting too far back, extending knee past 90° and engaging gastrocnemius.",
      "Fault 2: Bouncing weights elastically rather than deliberate 3-1-3 muscular contraction.",
      "Fault 3: Positioning dumbbells too close to hips instead of distal femur."
    ],
    "regression_vi": "Hạ cấp: Tập không tạ với bục gỗ hoặc tạ đơn nhẹ 5kg trên đùi.",
    "regression_en": "Regression: Bodyweight seated heel raises or light 5kg dumbbell.",
    "progression_vi": "Nâng cấp: Dùng máy tập cơ dép chuyên dụng nâng tạ đĩa 30-50kg.",
    "progression_en": "Progression: Dedicated seated calf raise machine loaded to 30-50kg.",
    "surgical_correlate": "07_07_Transtibial_Amputation_AMI_Technique_Colin_Harrington.mp4"
  },
  {
    "id": "ex_achilles_p3_01",
    "category": "rehabilitation",
    "zone": "achilles",
    "phase": "p3",
    "title_vi": "Nhún Bật Cổ Chân Đàn Hồi Nhịp Nhanh (Low-Amplitude Elastic Pogo Hops)",
    "title_en": "Low-Amplitude Elastic Pogo Hops (Achilles Biological Spring)",
    "videoUrl": "https://www.youtube.com/watch?v=eHNjINgNJzY",
    "duration": "04:00",
    "duration_sec": 240,
    "intensity": "Tích trữ & Giải phóng năng lượng lò xo sinh học (SSC)",
    "dosage_vi": "3-4 hiệp x 25-30 cái nhún bật nhanh, thời gian chạm đất < 200ms, nghỉ 2 phút",
    "dosage_en": "3-4 sets x 25-30 rapid elastic hops, ground contact < 200ms, 2 min rest",
    "tempo": "Nhún bật nảy nhanh như lò xo (< 200ms ground contact time)",
    "timestamps": [
      {
        "time": "00:15",
        "timeSec": 15,
        "label_vi": "Đứng thẳng, hai chân hẹp bằng hông, gối hơi chùng nhẹ và khoá cứng",
        "label_en": "Hip-Width Stance, Soft Locked Knees, Upright Torso"
      },
      {
        "time": "00:45",
        "timeSec": 45,
        "label_vi": "Bật nảy liên tục hoàn toàn bằng khớp cổ chân như chiếc lò xo (Pogo)",
        "label_en": "Continuous Pure Ankle Bounces Like a Pogo Stick"
      },
      {
        "time": "01:15",
        "timeSec": 75,
        "label_vi": "Thời gian tiếp đất cực ngắn (< 200ms), tiếp đất bằng phần trước bàn chân",
        "label_en": "Minimal Ground Contact Time (< 200ms), Forefoot Strike"
      },
      {
        "time": "01:50",
        "timeSec": 110,
        "label_vi": "Lỗi sai: Gập sâu đầu gối biến thành động tác Squat Jump",
        "label_en": "Common Fault: Bending Knees Deeply Turning into Squat Jumps"
      }
    ],
    "rationale_vi": "Giai đoạn 3 (Weeks 9-12): Khôi phục chức năng lò xo sinh học của gân gót Achilles. Khác với cơ bắp co rút tạo lực, gân gót hoạt động như một dây cung đàn hồi tích trữ thế năng khi tiếp đất và bắn người đi. Bài tập Pogo Hops rèn luyện độ cứng gân (Tendon Stiffness) và khả năng hấp thu lực xung kích thể thao.",
    "rationale_en": "Phase 3 (Weeks 9-12): Restores the biological spring mechanism of the Achilles tendon. Rather than metabolic muscle contraction, the tendon acts as an elastic recoil structure storing kinetic strain energy. Pogo hops optimize tendon stiffness and high-rate shock tolerance.",
    "common_errors_vi": [
      "Lỗi 1: Trùng gập đầu gối quá nhiều biến thành bài tập nhảy squat (làm mất cơ chế lò xo cổ chân).",
      "Lỗi 2: Tiếp đất bằng gót chân dộng lực thẳng lên khớp gối và cột sống.",
      "Lỗi 3: Nhảy quá cao làm mất nhịp tiếp đất nhanh (< 200ms)."
    ],
    "common_errors_en": [
      "Fault 1: Excessive knee flexion converting drill into a squat jump, slacking Achilles spring.",
      "Fault 2: Heel-first heavy landing sending shock waves directly to knee and lumbar spine.",
      "Fault 3: Jumping too high, increasing ground contact time beyond the elastic threshold."
    ],
    "regression_vi": "Hạ cấp: Nhún bật nhẹ tại chỗ không rời chân khỏi sàn hoặc nhảy dây hai chân chậm.",
    "regression_en": "Regression: Ankling drills with toes remaining on ground or slow double-foot jump rope.",
    "progression_vi": "Nâng cấp: Bật nảy đơn chân (Single-Leg Pogo Hops) hoặc bật nảy đa hướng (Multi-Directional).",
    "progression_en": "Progression: Single-leg pogo hops or multidirectional bounding patterns.",
    "surgical_correlate": "07_07_Transtibial_Amputation_AMI_Technique_Colin_Harrington.mp4"
  },
  {
    "id": "ex_core_p2_02",
    "category": "rehabilitation",
    "zone": "core",
    "phase": "p2",
    "title_vi": "Tấm Ván Xoay Quả Bóng Thụy Sĩ Nhịp Chậm (Swiss Ball Stir-the-Pot)",
    "title_en": "Swiss Ball Stir-the-Pot Dynamic Plank (McGill Core HSR)",
    "videoUrl": "https://www.youtube.com/watch?v=b4Gd3VSdzyg",
    "duration": "04:35",
    "duration_sec": 275,
    "intensity": "Kháng chuyển động động học đa hướng",
    "dosage_vi": "3 hiệp x 8 vòng tròn mỗi chiều (3s/vòng), nghỉ 90 giây giữa hiệp",
    "dosage_en": "3 sets x 8 circles per direction (3s per revolution), 90s rest",
    "tempo": "3 giây một vòng xoay có kiểm soát",
    "timestamps": [
      {
        "time": "00:15",
        "timeSec": 15,
        "label_vi": "Chống cẳng tay lên bóng, thân người tạo đường thẳng tấm ván",
        "label_en": "Forearms on Ball Setup, Rigid Torso Plank Stance"
      },
      {
        "time": "00:45",
        "timeSec": 45,
        "label_vi": "Vẽ vòng tròn nhỏ bằng khuỷu tay theo chiều kim đồng hồ",
        "label_en": "Draw Controlled Small Circles Clockwise with Elbows"
      },
      {
        "time": "01:25",
        "timeSec": 85,
        "label_vi": "Khóa chặt khung chậu, ngăn ngừa mọi chuyển động lắc lư hông",
        "label_en": "Lock Pelvis, Eliminating Any Lateral Hip Sway"
      },
      {
        "time": "02:05",
        "timeSec": 125,
        "label_vi": "Lỗi sai: Võng thắt lưng hoặc để bóng trượt xa khỏi ngực",
        "label_en": "Common Fault: Lumbar Sag or Over-Reaching Ball"
      }
    ],
    "rationale_vi": "GS. Stuart McGill đánh giá đây là bài tập chống xoay và chống ưỡn (Anti-Rotation & Anti-Extension) hoàn hảo nhất. Chuyển động khuỷu tay kích thích cơ thẳng bụng và cơ chéo bụng phản xạ liên tục để giữ cột sống bất động, tạo độ cứng trục thân trong điều kiện động.",
    "rationale_en": "Regarded by Prof. Stuart McGill as the premier dynamic torso conditioning drill. Micro-circular perturbations force instantaneous neuromuscular co-contraction of obliques and transverse abdominis to shield the spine.",
    "common_errors_vi": [
      "Lỗi 1: Để thắt lưng võng xuống sàn gây đau thắt lưng cấp.",
      "Lỗi 2: Vẽ vòng tròn quá lớn làm mất kiểm soát bả vai và cột sống.",
      "Lỗi 3: Nín thở gồng cứng cổ thay vì duy trì hơi thở hoành đều đặn."
    ],
    "common_errors_en": [
      "Fault 1: Lumbar hyperextension sag pinching posterior facet joints.",
      "Fault 2: Excessively wide circles causing shoulder instability and lost spinal stiffness.",
      "Fault 3: Holding breath with cervical tension instead of diaphragmatic respiration."
    ],
    "regression_vi": "Hạ cấp: Chống hai đầu gối xuống sàn (Kneeling Swiss Ball Plank) giữ tĩnh không xoay.",
    "regression_en": "Regression: Perform kneeling on a mat holding an isometric plank on the ball.",
    "progression_vi": "Nâng cấp: Mở rộng bán kính vòng tròn hoặc vẽ hình số 8 với thời gian 4 giây/vòng.",
    "progression_en": "Progression: Enlarge circle diameter or trace figure-8 patterns at 4s cadence.",
    "surgical_correlate": "07_04_Radius_Extensive_Volar_Henry_Approach_Cadaver.mp4"
  },
  {
    "id": "ex_core_p3_02",
    "category": "rehabilitation",
    "zone": "core",
    "phase": "p3",
    "title_vi": "Ném Xúc Bóng Tạ Xoay Thân Bộc Phát (Rotational Med Ball Scoop Toss)",
    "title_en": "Rotational Medicine Ball Scoop Toss (Elastic Power Transfer)",
    "videoUrl": "https://www.youtube.com/watch?v=KRfTFbeU5iM",
    "duration": "03:55",
    "duration_sec": 235,
    "intensity": "Tốc độ phát lực bộc phát chuỗi động lực (Kinetic Chain RFD)",
    "dosage_vi": "3-4 hiệp x 6-8 lần ném bộc phát mỗi bên, bóng 3-4kg, nghỉ 2 phút",
    "dosage_en": "3-4 sets x 6-8 explosive throws per side with 3-4kg ball, 2 min rest",
    "tempo": "Bộc phát, chu kỳ kéo giãn co ngắn xoay hông (< 1s)",
    "timestamps": [
      {
        "time": "00:15",
        "timeSec": 15,
        "label_vi": "Đứng ngang cách tường cứng 1.5m, tư thế chùng hông nạp lực",
        "label_en": "Side Stance 1.5m from Wall, Athletic Hip Load Setup"
      },
      {
        "time": "00:40",
        "timeSec": 40,
        "label_vi": "Xoay hông sau ra trước, đạp gót chân sau truyền lực lên tay",
        "label_en": "Rear Hip Drive & Heel Pivot Kinetic Power Transfer"
      },
      {
        "time": "01:10",
        "timeSec": 70,
        "label_vi": "Giải phóng bóng tạ đập mạnh vào tường, bụng khóa cứng",
        "label_en": "Explosive Ball Release into Wall with Braced Torso"
      },
      {
        "time": "01:45",
        "timeSec": 105,
        "label_vi": "Lỗi sai: Vặn xoắn thắt lưng thay vì xoay từ khớp háng",
        "label_en": "Common Fault: Twisting Lumbar Spine Instead of Hip Pivot"
      }
    ],
    "rationale_vi": "Tái rèn luyện khả năng truyền năng lượng động học từ mặt đất qua khớp háng và lõi thân (Core) ra chi trên. Cột sống thắt lưng được khóa cứng bảo vệ bởi cơ bụng, lực xoay phát sinh hoàn toàn từ khớp háng đối bên theo cơ chế chuỗi động đóng - mở.",
    "rationale_en": "Trains rotational kinetic chain force transfer from ground through hips and braced core to upper extremities. Lumbar spine is locked rigid while rotational torque is generated strictly by acetabulofemoral internal/external rotation.",
    "common_errors_vi": [
      "Lỗi 1: Cố vặn xoắn đĩa đệm thắt lưng thay vì xoay bản lề khớp háng sau.",
      "Lỗi 2: Dùng bóng quá nặng (> 5kg) làm chậm tốc độ phát lực bộc phát.",
      "Lỗi 3: Mất thăng bằng ngả nghiêng sau khi giải phóng bóng."
    ],
    "common_errors_en": [
      "Fault 1: Torsional twisting across lumbar discs rather than pivoting through rear hip.",
      "Fault 2: Ball too heavy (> 5kg), blunting velocity of stretch-shortening cycle.",
      "Fault 3: Stumbling or losing balance upon release."
    ],
    "regression_vi": "Hạ cấp: Ném bóng nhẹ 1-2kg ở tư thế quỳ một chân (Half-Kneeling Scoop Toss).",
    "regression_en": "Regression: Half-kneeling 1-2kg med ball throw focusing on pure trunk bracing.",
    "progression_vi": "Nâng cấp: Bước chéo chân trước khi ném (Crow-Hop Step Rotational Scoop Toss).",
    "progression_en": "Progression: Crow-hop dynamic step-up prior to rotational release.",
    "surgical_correlate": "07_04_Radius_Extensive_Volar_Henry_Approach_Cadaver.mp4"
  },
  {
    "id": "ex_elbow_p1_02",
    "category": "rehabilitation",
    "zone": "elbow",
    "phase": "p1",
    "title_vi": "Gồng Tĩnh Gập Cổ Tay & Sấp Cẳng Tay (Isometric Wrist Flexion & Pronation)",
    "title_en": "Isometric Wrist Flexion & Pronation for Medial Epicondylalgia",
    "videoUrl": "https://www.youtube.com/watch?v=UEFX85jM784",
    "duration": "04:10",
    "duration_sec": 250,
    "intensity": "70% MVC Isometric (Gân cơ gấp cổ tay quay & cơ sấp tròn)",
    "dosage_vi": "5 hiệp x 45 giây giữ tĩnh, cẳng tay tựa bàn phẳng, nghỉ 2 phút, 1-2 lần/ngày",
    "dosage_en": "5 sets x 45s sustained hold, forearm supported, 2 min rest, 1-2x daily",
    "tempo": "Isometric 45s sustained hold",
    "timestamps": [
      {
        "time": "00:15",
        "timeSec": 15,
        "label_vi": "Cẳng tay ngửa tựa vững vàng trên bàn, cổ tay hơi gập 15°",
        "label_en": "Forearm Supinated on Table, Wrist in 15° Slight Flexion"
      },
      {
        "time": "00:45",
        "timeSec": 45,
        "label_vi": "Tay đối diện đè ép mu bàn tay chống lại động tác gập",
        "label_en": "Opposing Hand Pressing Against Palm/Fingers at 70% MVC"
      },
      {
        "time": "01:20",
        "timeSec": 80,
        "label_vi": "Duy trì lực gồng cơ gấp cổ tay quay (FCR) và cơ sấp tròn 45s",
        "label_en": "Sustain Isometric Tension Across FCR and Pronator Teres"
      },
      {
        "time": "02:00",
        "timeSec": 120,
        "label_vi": "Lỗi sai: Bẻ gập cổ tay quá sâu gây đau nhói lồi cầu trong",
        "label_en": "Common Fault: Excessive Wrist Flexion Pinching Medial Epicondyle"
      }
    ],
    "rationale_vi": "Điều trị viêm lồi cầu trong (Golfer's Elbow / Medial Epicondylalgia): Tổn thương gân cơ gấp cổ tay quay (FCR) và cơ sấp tròn. Gồng tĩnh ở góc trung tính kích hoạt ức chế vỏ não vận động (Cortical Inhibition Relief), giảm đau ngay mà không gây lực căng trượt cọ xát vào mỏm trên lồi cầu trong.",
    "rationale_en": "Targeted protocol for medial epicondylalgia ('Golfer's Elbow') involving the FCR and pronator teres origins. Mid-range isometric flexion-pronation down-regulates central pain processing without provocative traction shear across the medial epicondyle.",
    "common_errors_vi": [
      "Lỗi 1: Gập cổ tay hết biên độ rồi mới gồng gây chèn ép gân vào xương.",
      "Lỗi 2: Nhấc khuỷu tay lên khỏi bàn để dùng lực vai ấn xuống.",
      "Lỗi 3: Nắm chặt bàn tay làm tăng áp lực lên thần kinh trụ ở rãnh khuỷu."
    ],
    "common_errors_en": [
      "Fault 1: Clenching into full flexion before contracting, creating bony impingement.",
      "Fault 2: Elevating elbow off table using shoulder depression to cheat resistance.",
      "Fault 3: Excessive fist clenching exacerbating ulnar nerve compression at cubital tunnel."
    ],
    "regression_vi": "Hạ cấp: Giữ 20-30 giây hoặc giảm lực gồng xuống 50% MVC.",
    "regression_en": "Regression: 20-30s holds or reduce isometric force to 50% MVC.",
    "progression_vi": "Nâng cấp: Cầm tạ chuông hoặc tạ đơn giữ tĩnh ở tư thế cẳng tay sấp.",
    "progression_en": "Progression: Hold dumbbell or kettlebell isometrically in pronated orientation.",
    "surgical_correlate": "04_05_Cubital_Tunnel_Ulnar_Nerve_Decompression_Subcutaneous_Transposition.mp4"
  },
  {
    "id": "ex_elbow_p2_02",
    "category": "rehabilitation",
    "zone": "elbow",
    "phase": "p2",
    "title_vi": "Cuộn Tay Búa Tạ Đơn Nhịp Chậm HSR (Neutral-Grip Dumbbell Hammer Curls)",
    "title_en": "Heavy Slow Dumbbell Hammer Curls (Brachioradialis HSR)",
    "videoUrl": "https://www.youtube.com/watch?v=thZOqkrRAbo",
    "duration": "04:40",
    "duration_sec": 280,
    "intensity": "70-75% 1RM (10-12 RM)",
    "dosage_vi": "3-4 hiệp x 8-12 lần, Tempo 3-1-3 (3s hạ, 1s giữ, 3s nâng), nghỉ 2 phút, 3 buổi/tuần",
    "dosage_en": "3-4 sets x 8-12 reps, Tempo 3-1-3, 2 min rest interval, 3 sessions/week",
    "tempo": "3-1-3 Heavy Slow Resistance",
    "timestamps": [
      {
        "time": "00:15",
        "timeSec": 15,
        "label_vi": "Tư thế đứng thẳng, tạ cầm vị trí trung tính (Lòng bàn tay hướng vào nhau)",
        "label_en": "Standing Stance, Neutral Grip (Palms Facing Inward)"
      },
      {
        "time": "00:45",
        "timeSec": 45,
        "label_vi": "Cuộn tạ lên chậm rãi 3 giây kích hoạt cơ cánh tay quay (Brachioradialis)",
        "label_en": "3-Second Concentric Raise Recruiting Brachioradialis & Brachialis"
      },
      {
        "time": "01:20",
        "timeSec": 80,
        "label_vi": "Dừng 1 giây tại góc gập khuỷu 90 độ đẳng cự",
        "label_en": "1-Second Isometric Hold at 90° Peak Mechanical Tension"
      },
      {
        "time": "02:00",
        "timeSec": 120,
        "label_vi": "Hạ tạ có kiểm soát chính xác 3 giây, khóa khuỷu tay sát sườn",
        "label_en": "3-Second Controlled Eccentric Lowering with Fixed Elbows"
      }
    ],
    "rationale_vi": "Cơ cánh tay quay (Brachioradialis) và cơ cánh tay (Brachialis) là hai cơ bảo vệ chính cho khớp khuỷu. Nạp tải Heavy Slow Resistance ở tư thế tay búa trung tính giúp phân tán tải trọng kéo dãn ra khỏi gân duỗi cổ tay quay ngắn (ECRB), kích thích tăng sinh chất nền collagen vững bền.",
    "rationale_en": "The brachioradialis and brachialis provide primary dynamic joint stabilization for the elbow. Heavy Slow Resistance in neutral hammer grip redistributes tensile load away from the vulnerable ECRB origin, remodeling healthy parallel collagen fascicles.",
    "common_errors_vi": [
      "Lỗi 1: Đưa khuỷu tay trôi ra trước hoặc ra sau để dùng đà quán tính nhấc tạ.",
      "Lỗi 2: Xoay ngửa cổ tay ở đỉnh làm mất tính chất trung tính của bài tập.",
      "Lỗi 3: Thả tạ rơi tự do ở pha hạ làm mất kích thích kéo giãn lệch tâm."
    ],
    "common_errors_en": [
      "Fault 1: Swinging elbows forward or backward to leverage torso momentum.",
      "Fault 2: Supinating wrists at top, altering target muscle recruitment.",
      "Fault 3: Free-falling through eccentric phase, eliminating strain stimulus."
    ],
    "regression_vi": "Hạ cấp: Giảm trọng lượng tạ hoặc thực hiện từng tay một có tựa lưng vào tường.",
    "regression_en": "Regression: Deload weight or perform alternating curls with back against wall.",
    "progression_vi": "Nâng cấp: Dùng thanh tạ đòn cầm dày (Fat Grip) hoặc tăng mức tạ đạt mốc 8 RM.",
    "progression_en": "Progression: Use Fat Gripz or advance resistance toward 8 RM threshold.",
    "surgical_correlate": "04_05_Cubital_Tunnel_Ulnar_Nerve_Decompression_Subcutaneous_Transposition.mp4"
  },
  {
    "id": "ex_elbow_p3_02",
    "category": "rehabilitation",
    "zone": "elbow",
    "phase": "p3",
    "title_vi": "Dòng Chảy Dây Dẻo Giải Nén Khuỷu Tay (Wrist Rope Flow for Elbow Decompression)",
    "title_en": "Wrist Rope Flow for Elbow Decompression & Radioulnar CARs",
    "videoUrl": "https://www.youtube.com/watch?v=5u840hSkzf8",
    "duration": "05:15",
    "duration_sec": 315,
    "intensity": "Vận động nhịp điệu phối hợp thần kinh cơ đa mặt phẳng",
    "dosage_vi": "3 hiệp x 30-45 giây xoay dây nhịp nhàng mỗi bên tay, 2-3 buổi/tuần",
    "dosage_en": "3 sets x 30-45s rhythmic rope flow per arm, 2-3 sessions/week",
    "tempo": "Nhịp nhàng, liên tục, giải phóng căng thẳng bao khớp",
    "timestamps": [
      {
        "time": "00:20",
        "timeSec": 20,
        "label_vi": "Cầm đoạn dây thừng mềm, tư thế đứng chùng gối linh hoạt",
        "label_en": "Grip Soft Rope, Athletic Resilient Knee Flexion Setup"
      },
      {
        "time": "00:50",
        "timeSec": 50,
        "label_vi": "Bắt đầu vẽ số 8 vô cực (Figure-8 Flow) bằng khớp cổ tay và khuỷu",
        "label_en": "Initiate Figure-8 Infinity Arc Through Wrist & Elbow"
      },
      {
        "time": "01:35",
        "timeSec": 95,
        "label_vi": "Chuyển đổi nhịp nhàng sấp ngửa cẳng tay theo quán tính dây",
        "label_en": "Rhythmic Pronation-Supination Tracking Rope Momentum"
      },
      {
        "time": "02:20",
        "timeSec": 140,
        "label_vi": "Lỗi sai: Gồng cứng vai làm mất sự chuyển động xoay tự nhiên",
        "label_en": "Common Fault: Rigid Shoulder Shrugging Killing Elastic Flow"
      }
    ],
    "rationale_vi": "Nguyên lý Decompression qua vận động xoắn ốc (Spiral Biomechanics): Sau khi cơ bắp đã khỏe ở Phase 2, các động tác xoay dây Rope Flow tạo lực ly tâm nhẹ giúp 'bơm' hoạt dịch vào các khe khớp hẹp của chỏm xương quay và lồi cầu, giải tỏa các điểm xơ cứng vi thể.",
    "rationale_en": "Spiral biomechanics and articular decompression: Centrifugal forces generated by rope flow circulate synovial fluid across the radio-capitellar joint while releasing myofascial tension bands across forearm interosseous compartments.",
    "common_errors_vi": [
      "Lỗi 1: Nắm quá chặt cán dây làm gồng cứng cơ gấp cẳng tay.",
      "Lỗi 2: Dùng lực cánh tay vung mạnh thay vì chuyển động nhịp từ cổ tay và hông.",
      "Lỗi 3: Chuyển hướng giật cục làm mất dòng chảy đàn hồi liên tục."
    ],
    "common_errors_en": [
      "Fault 1: Death-gripping rope handle, causing forearm flexor cramping.",
      "Fault 2: Violent shoulder heave instead of fluid wrist and hip wave transmission.",
      "Fault 3: Abrupt jerky halts disrupting elastic momentum."
    ],
    "regression_vi": "Hạ cấp: Xoay vòng tròn đơn giản một mặt phẳng với dải khăn mềm.",
    "regression_en": "Regression: Single-plane gentle circles with a light towel.",
    "progression_vi": "Nâng cấp: Dùng dây thừng nặng 1kg (Heavy Flow Rope) kết hợp di chuyển bước chân.",
    "progression_en": "Progression: 1kg heavy flow rope with multi-directional footwork integration.",
    "surgical_correlate": "04_05_Cubital_Tunnel_Ulnar_Nerve_Decompression_Subcutaneous_Transposition.mp4"
  },
  {
    "id": "ex_lower_back_p2_02",
    "category": "rehabilitation",
    "zone": "lower_back",
    "phase": "p2",
    "title_vi": "Duỗi Lưng Ghế La Mã 45 Độ Nhịp Chậm (45° Roman Chair Back Extension HSR)",
    "title_en": "Heavy Slow 45° Roman Chair Back Extension (Posterior Chain HSR)",
    "videoUrl": "https://www.youtube.com/watch?v=b4Gd3VSdzyg",
    "duration": "04:50",
    "duration_sec": 290,
    "intensity": "70-75% 1RM (10-12 RM)",
    "dosage_vi": "3-4 hiệp x 8-12 lần, Tempo 3-1-3 (3s gập, 1s giữ, 3s duỗi), ôm đĩa tạ ngực, 3 buổi/tuần",
    "dosage_en": "3-4 sets x 8-12 reps, Tempo 3-1-3, holding plate at chest, 2 min rest, 3x/wk",
    "tempo": "3-1-3 Heavy Slow Resistance",
    "timestamps": [
      {
        "time": "00:20",
        "timeSec": 20,
        "label_vi": "Điều chỉnh đệm ghế nằm ngay dưới nếp gấp khớp háng",
        "label_en": "Pad Adjusted Just Below Anterior Hip Crease"
      },
      {
        "time": "00:50",
        "timeSec": 50,
        "label_vi": "Gập người xuống 3 giây hoàn toàn từ khớp háng, cột sống thẳng",
        "label_en": "3-Second Hip Flexion Descent with Locked Neutral Spine"
      },
      {
        "time": "01:30",
        "timeSec": 90,
        "label_vi": "Dừng 1 giây tại điểm căng cơ gân khoeo",
        "label_en": "1-Second Pause at Hamstring Stretch Point"
      },
      {
        "time": "02:10",
        "timeSec": 130,
        "label_vi": "Nâng lên 3 giây bằng cơ mông lớn (Không ưỡn quá mức về sau)",
        "label_en": "3-Second Ascent via Gluteus Maximus Lockout (No Hyperextension)"
      }
    ],
    "rationale_vi": "Huấn luyện sức bền và sức mạnh chuỗi cơ sau theo nguyên lý GS. Stuart McGill: Đệm ghế đặt dưới nếp gấp háng buộc chuyển động uốn phải diễn ra tại khớp háng (cơ mông và gân khoeo) trong khi cột sống thắt lưng đóng vai trò như một thanh đòn cứng cáp chịu tải isometric liên tục.",
    "rationale_en": "Posterior chain hypertrophy per McGill guidelines: Positioning pads below the anterior superior iliac spine ensures pure hip articulation while the lumbar spine maintains isometric stiffness, building immense fatigue tolerance in the erectors.",
    "common_errors_vi": [
      "Lỗi 1: Đệm ghế đặt quá cao trên rốn làm bẻ cong cột sống thắt lưng khi gập xuống.",
      "Lỗi 2: Ưỡn ngực cong lưng ra sau quá mức ở đỉnh làm kẹt các khớp mỏm sau (Facet joints).",
      "Lỗi 3: Nhún nảy tạ bằng quán tính ở cuối biên độ."
    ],
    "common_errors_en": [
      "Fault 1: Pads positioned too high, forcing lumbar flexion over the support.",
      "Fault 2: Hyperextending lumbar spine at apex, jamming posterior facet joints.",
      "Fault 3: Bouncing elastically at bottom turn-around."
    ],
    "regression_vi": "Hạ cấp: Tập không tạ, đặt hai tay chéo trước ngực, biên độ gập 45 độ.",
    "regression_en": "Regression: Bodyweight only, arms crossed over chest, 45° partial range.",
    "progression_vi": "Nâng cấp: Ôm đĩa tạ 10-20kg trước ngực hoặc giữ 2 giây ở đỉnh vận động.",
    "progression_en": "Progression: Hold 10-20kg plate at chest or add a 2-second isometric peak hold.",
    "surgical_correlate": "07_04_Radius_Extensive_Volar_Henry_Approach_Cadaver.mp4"
  },
  {
    "id": "ex_lower_back_p3_02",
    "category": "rehabilitation",
    "zone": "lower_back",
    "phase": "p3",
    "title_vi": "Chào Buổi Sáng Ngồi Ghế Kéo Giãn Có Tải (Seated Good Morning Loaded End-Range)",
    "title_en": "Seated Good Morning Loaded End-Range Hip-Spine Conditioning",
    "videoUrl": "https://www.youtube.com/watch?v=KRfTFbeU5iM",
    "duration": "05:25",
    "duration_sec": 325,
    "intensity": "Tải tăng dần (10-20kg), biên độ góc tận khớp háng",
    "dosage_vi": "3 hiệp x 8-10 lần, Tempo 3-1-3 (3s gập sâu, 1s giữ, 3s nâng), 2-3 buổi/tuần",
    "dosage_en": "3 sets x 8-10 reps, Tempo 3-1-3 (3s descent, 1s hold, 3s ascent), 2-3x/week",
    "tempo": "3-1-3 Sâu có kiểm soát ở góc tận",
    "timestamps": [
      {
        "time": "00:20",
        "timeSec": 20,
        "label_vi": "Ngồi trên ghế, hai chân mở rộng hình chữ V vững chãi",
        "label_en": "Seated Stance on Bench, Wide V-Stance Foot Placement"
      },
      {
        "time": "00:55",
        "timeSec": 55,
        "label_vi": "Gánh thanh tạ nhẹ trên cơ thang, lưng giữ phẳng lỳ",
        "label_en": "Light Barbell across Upper Traps, Flat Neutral Spine Setup"
      },
      {
        "time": "01:40",
        "timeSec": 100,
        "label_vi": "Gập người chậm 3 giây đưa bụng chạm sâu giữa hai đùi",
        "label_en": "3-Second Descent: Abdomen Deep Between Thighs (Adductor Stretch)"
      },
      {
        "time": "02:30",
        "timeSec": 150,
        "label_vi": "Dừng 1 giây ở góc tận cùng rồi đạp cơ mông nâng người lên",
        "label_en": "1-Second End-Range Pause, Drive Glutes to Concentric Ascent"
      }
    ],
    "rationale_vi": "Trường phái Sức mạnh góc tận ATG (Ben Patrick): Ngồi trên ghế loại bỏ sự hạn chế của cơ gân khoeo, cho phép khớp háng gập sâu tối đa, kéo giãn có tải nhóm cơ khép lớn (Adductor Magnus) và bao khớp háng sau. Tạo sức chịu tải bền bỉ cho thắt lưng khi nhặt đồ nặng ở tư thế ngồi.",
    "rationale_en": "ATG end-range loading protocol (Ben Patrick): Sitting neutralizes hamstring tension, allowing maximal acetabulofemoral flexion. Loads the adductor magnus and posterior hip capsule under deep stretch, bulletproofing the lower back against seated flexion injuries.",
    "common_errors_vi": [
      "Lỗi 1: Gù cong gập lưng trên để cố chạm ngực xuống ghế.",
      "Lỗi 2: Nhấc mông lên khỏi mặt ghế khi gập người xuống.",
      "Lỗi 3: Khép hai đầu gối vào trong khi hạ người."
    ],
    "common_errors_en": [
      "Fault 1: Kyphotic thoracic rounding to fake deep range of motion.",
      "Fault 2: Ischial tuberosities lifting off bench during descent.",
      "Fault 3: Knees collapsing into valgus during deep fold."
    ],
    "regression_vi": "Hạ cấp: Tập không tạ, đặt hai tay sau gáy hoặc ôm bóng cao su trước ngực.",
    "regression_en": "Regression: Bodyweight with hands behind head or hugging a light medicine ball.",
    "progression_vi": "Nâng cấp: Tăng mức tạ đòn lên 30-40kg và hạ sâu ngực ngang mặt ghế.",
    "progression_en": "Progression: Barbell progressive overload to 30-40kg with chest touching bench plane.",
    "surgical_correlate": "07_04_Radius_Extensive_Volar_Henry_Approach_Cadaver.mp4"
  },
  {
    "id": "ex_wrist_p2_02",
    "category": "rehabilitation",
    "zone": "wrist",
    "phase": "p2",
    "title_vi": "Nghiêng Quay & Nghiêng Trụ Đòn Bẩy Nhịp Chậm (Heavy Slow Lever Bar Deviation)",
    "title_en": "Heavy Slow Lever Bar Radial & Ulnar Deviation HSR",
    "videoUrl": "https://www.youtube.com/watch?v=UEFX85jM784",
    "duration": "04:45",
    "duration_sec": 285,
    "intensity": "Kháng lực đòn bẩy lệch tâm 70-75% 1RM",
    "dosage_vi": "3 hiệp x 8-10 lần mỗi bên (3s nâng, 1s giữ, 3s hạ), 3 buổi/tuần",
    "dosage_en": "3 sets x 8-10 reps per side, Tempo 3-1-3, 90s rest interval, 3x/week",
    "tempo": "3-1-3 Heavy Slow Resistance",
    "timestamps": [
      {
        "time": "00:15",
        "timeSec": 15,
        "label_vi": "Cầm đuôi cán búa hoặc thanh đòn lệch tạ, cánh tay sát sườn",
        "label_en": "Hold Base of Lever Bar/Sledgehammer, Arm at Side"
      },
      {
        "time": "00:45",
        "timeSec": 45,
        "label_vi": "Nâng đầu búa lên bằng cơ nghiêng quay (Radial Deviation) trong 3s",
        "label_en": "3-Second Concentric Raise via Radial Deviators (APL/EPB/FCR)"
      },
      {
        "time": "01:25",
        "timeSec": 85,
        "label_vi": "Dừng 1 giây tại điểm đỉnh kiểm soát hoàn toàn góc quay",
        "label_en": "1-Second Isometric Hold at Peak Vertical Angle"
      },
      {
        "time": "02:05",
        "timeSec": 125,
        "label_vi": "Hạ đầu búa chậm rãi 3 giây về tư thế nghiêng trụ có kiểm soát",
        "label_en": "3-Second Controlled Eccentric Descent into Ulnar Deviation"
      }
    ],
    "rationale_vi": "Sử dụng đòn bẩy dài tạo mô-men xoắn kháng lực cực đại tại khoang gân mu tay số 1 và gân cơ duỗi cổ tay trụ (ECU). Nhịp chậm 3-1-3 kích thích tổng hợp Collagen Type I làm dày thành bao gân, giải quyết triệt để tình trạng trật gân ECU hoặc đau gân mạn tính sau gãy xương thuyền.",
    "rationale_en": "A long lever bar maximizes resistive torque across the first dorsal compartment and ECU subsheath. Slow 3-1-3 tempos drive tenocyte collagen remodeling, preventing chronic ECU subluxation and post-fracture wrist pain.",
    "common_errors_vi": [
      "Lỗi 1: Cầm quá xa đầu cán búa khi chưa đủ sức mạnh làm rơi bẻ gãy cổ tay.",
      "Lỗi 2: Xoay lật cẳng tay sấp ngửa để gian lận góc nghiêng quay.",
      "Lỗi 3: Nâng khuỷu tay lên khỏi sườn khi nâng tạ."
    ],
    "common_errors_en": [
      "Fault 1: Choking too far down the handle before establishing baseline tendon capacity.",
      "Fault 2: Compensatory forearm pronation/supination to fake radial deviation.",
      "Fault 3: Abducting elbow off the flank to assist the lift."
    ],
    "regression_vi": "Hạ cấp: Cầm tay tiến gần về phía đầu búa để rút ngắn đòn bẩy chịu lực.",
    "regression_en": "Regression: Choke up closer to the hammer head to shorten resistance lever.",
    "progression_vi": "Nâng cấp: Dịch tay xuống sát đuôi cán hoặc gắn thêm tạ đĩa 1-2kg ở đầu cán.",
    "progression_en": "Progression: Slide hand to the absolute distal tip or add 1-2kg magnetic weights.",
    "surgical_correlate": "03_01_De_Quervain_Pulley_Reconstruction_Retinacular_Graft.mp4"
  },
  {
    "id": "ex_wrist_p3_02",
    "category": "rehabilitation",
    "zone": "wrist",
    "phase": "p3",
    "title_vi": "Xoay Dây Dẻo Đa Hướng & CARs Cổ Tay (Multi-Directional Wrist Rope Flow & Full CARs)",
    "title_en": "Multi-Directional Wrist Rope Flow & Full Wrist CARs",
    "videoUrl": "https://www.youtube.com/watch?v=5u840hSkzf8",
    "duration": "05:00",
    "duration_sec": 300,
    "intensity": "Kiểm soát chủ động biên độ cực hạn 80% lực",
    "dosage_vi": "5 vòng xoay CARs cực đại mỗi chiều + 30 vòng xoay dây đa hướng, 2-3 buổi/tuần",
    "dosage_en": "5 maximal CARs circles per direction + 30 multi-directional rope revs, 2-3x/wk",
    "tempo": "Chậm từng milimet (CARs) & Nhịp điệu liên tục (Rope Flow)",
    "timestamps": [
      {
        "time": "00:20",
        "timeSec": 20,
        "label_vi": "Cố định cẳng tay trên bàn, chỉ cho phép khớp cổ tay cử động",
        "label_en": "Forearm Clamped on Table, Isolating Pure Carpal Articulation"
      },
      {
        "time": "00:55",
        "timeSec": 55,
        "label_vi": "Vẽ vòng tròn cực đại: Duỗi tối đa -> Nghiêng quay -> Gập -> Nghiêng trụ",
        "label_en": "Max Circumference: Full Extension -> Radial -> Flexion -> Ulnar"
      },
      {
        "time": "01:40",
        "timeSec": 100,
        "label_vi": "Chuyển sang tư thế đứng xoay dây thừng đa hướng giải phóng bao gân",
        "label_en": "Transition to Standing Multi-Directional Rope Flow"
      },
      {
        "time": "02:25",
        "timeSec": 145,
        "label_vi": "Lỗi sai: Xoay cẳng tay bù trừ thay vì cô lập khớp cổ tay",
        "label_en": "Common Fault: Pronating/Supinating Forearm to Cheat Wrist Arc"
      }
    ],
    "rationale_vi": "Kết hợp giữa kiểm soát thần kinh cơ ở biên độ tối đa (FRC CARs) và chuyển động giải nén nhịp điệu (Rope Flow). Huấn luyện 8 xương cổ tay và sụn tam giác (TFCC) trượt êm ái trên hõm xương quay mà không bị kẹt hay kêu lạo xạo khi chơi thể thao chịu lực cổ tay.",
    "rationale_en": "Integrates maximum neurological control at articular boundaries (FRC CARs) with dynamic fluid decompression (Rope Flow). Retrains the 8 carpal bones and TFCC to glide smoothly within the radial sigmoid notch during dynamic athletics.",
    "common_errors_vi": [
      "Lỗi 1: Cẳng tay xoay sấp ngửa liên tục để ăn gian vòng tròn của cổ tay.",
      "Lỗi 2: Bỏ qua các góc khuyết tật nơi cổ tay bị cứng để đi đường tắt.",
      "Lỗi 3: Xoay quá nhanh làm mất lực căng bảo vệ bao khớp."
    ],
    "common_errors_en": [
      "Fault 1: Forearm pronating and supinating to fake true radiocarpal circumduction.",
      "Fault 2: Cutting corners across stiff arcs instead of tracing absolute outer boundary.",
      "Fault 3: Moving rapidly without somatic irradiation tension."
    ],
    "regression_vi": "Hạ cấp: Giảm bán kính vòng xoay hoặc dùng tay đối diện hỗ trợ nhẹ nhàng.",
    "regression_en": "Regression: Constrain rotational diameter or use opposite hand for passive guidance.",
    "progression_vi": "Nâng cấp: Cầm tạ đĩa 1kg trong lòng bàn tay khi thực hiện vòng xoay CARs.",
    "progression_en": "Progression: Balance a 1kg weight plate in open palm while executing wrist CARs.",
    "surgical_correlate": "02_10_TFCC_Central_Tears_Repair_Technical_Trick_Shin.mp4"
  },
  {
    "id": "ex_hip_p1_02",
    "category": "rehabilitation",
    "zone": "hip",
    "phase": "p1",
    "title_vi": "Gồng Tĩnh Ép Sàn 90/90 & Cầu Mông Đẳng Cự (90/90 Isometric Floor Press & Glute Bridge)",
    "title_en": "90/90 Isometric Floor Press & Glute Bridge Hold",
    "videoUrl": "https://www.youtube.com/watch?v=VSi9x8dzSnU",
    "duration": "04:30",
    "duration_sec": 270,
    "intensity": "70% MVC Isometric",
    "dosage_vi": "4 hiệp x 45 giây gồng ép đầu gối xuống sàn + 3 hiệp x 45s giữ cầu mông, 1-2 lần/ngày",
    "dosage_en": "4 sets x 45s knee floor-press holds + 3 sets x 45s glute bridge hold, 1-2x daily",
    "tempo": "Isometric 45s sustained hold",
    "timestamps": [
      {
        "time": "00:15",
        "timeSec": 15,
        "label_vi": "Ngồi tư thế 90/90, đầu gối chân trước và chân sau vuông góc",
        "label_en": "90/90 Seated Stance with Both Legs at 90° Angles"
      },
      {
        "time": "00:45",
        "timeSec": 45,
        "label_vi": "Ép mạnh toàn bộ cẳng chân và đầu gối chân trước xuống sàn (PAILs)",
        "label_en": "70% MVC Downward Knee & Shin Floor Press (PAILs Drive)"
      },
      {
        "time": "01:25",
        "timeSec": 85,
        "label_vi": "Chuyển tư thế nằm ngửa nâng cầu mông gồng cứng cơ mông lớn 45s",
        "label_en": "Transfer to Supine Glute Bridge, Locking Glutes at Peak"
      },
      {
        "time": "02:10",
        "timeSec": 130,
        "label_vi": "Lỗi sai: Ưỡn lưng thắt lưng thay vì dùng lực siết của cơ mông",
        "label_en": "Common Fault: Lumbar Hyperextension Dominating Over Glutes"
      }
    ],
    "rationale_vi": "Kích hoạt ức chế vỏ não vận động (Rio et al.) cho gân cơ thắt lưng chậu (Iliopsoas) và gân cơ mông. Lực ép tĩnh xuống sàn kích hoạt cơ xoay ngoài và bao khớp háng mà không gây cọ xát sụn viền (Labrum), trong khi cầu mông khôi phục lực đẩy trục háng mà không làm cong cột sống.",
    "rationale_en": "Induces cortical inhibition relief for iliopsoas and proximal gluteal entheses. The downward isometric drive recruits deep rotators and capsular stabilizers without labral impingement, while the glute bridge establishes pure hip extension.",
    "common_errors_vi": [
      "Lỗi 1: Ưỡn võng cột sống thắt lưng khi nâng cầu mông thay vì khóa cơ bụng và siết mông.",
      "Lỗi 2: Bị chuột rút cơ gân khoeo do đặt bàn chân quá xa mông.",
      "Lỗi 3: Nghiêng vẹo khung chậu sang bên khi ép sàn 90/90."
    ],
    "common_errors_en": [
      "Fault 1: Hyperextending lumbar spine during bridge instead of abdominal-glute lockout.",
      "Fault 2: Hamstring cramping due to feet placed too far from pelvis.",
      "Fault 3: Lateral pelvic tilt during 90/90 floor press."
    ],
    "regression_vi": "Hạ cấp: Kê gối đệm dưới mông hoặc giảm thời gian gồng ép xuống 20-30 giây.",
    "regression_en": "Regression: Sit on a yoga block or shorten hold duration to 20-30s.",
    "progression_vi": "Nâng cấp: Nâng cầu mông bằng một chân (Single-Leg Glute Bridge Hold).",
    "progression_en": "Progression: Single-leg glute bridge isometric hold with pelvis perfectly level.",
    "surgical_correlate": "07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4"
  },
  {
    "id": "ex_hip_p2_02",
    "category": "rehabilitation",
    "zone": "hip",
    "phase": "p2",
    "title_vi": "Kéo Giãn Giường Có Tải Đạp Đùi Trước (Loaded Couch Stretch with Active Quad Drive)",
    "title_en": "Loaded Couch Stretch with Active Quadriceps Drive (Hip HSR)",
    "videoUrl": "https://www.youtube.com/watch?v=D9YimkCIQ6s",
    "duration": "05:10",
    "duration_sec": 310,
    "intensity": "Kéo giãn có tải trọng cơ học kích hoạt cơ đối kháng",
    "dosage_vi": "3 hiệp x giữ 45 giây mỗi bên chân + 10 nhịp co cơ đạp mu bàn chân vào tường, 3 buổi/tuần",
    "dosage_en": "3 sets x 45s loaded hold per leg + 10 active foot-wall press pulses, 3x/week",
    "tempo": "45 giây kéo giãn có tải + nhịp đè 5 giây",
    "timestamps": [
      {
        "time": "00:20",
        "timeSec": 20,
        "label_vi": "Áp mu bàn chân sau lên tường, đầu gối chạm sát góc tường",
        "label_en": "Rear Foot Elevated on Wall, Knee Rooted in Corner"
      },
      {
        "time": "00:55",
        "timeSec": 55,
        "label_vi": "Chân trước bước tấn 90°, nâng thân mình thẳng đứng khóa cơ mông sau",
        "label_en": "Front Leg at 90°, Upright Torso, Squeeze Posterior Glute"
      },
      {
        "time": "01:40",
        "timeSec": 100,
        "label_vi": "Kích hoạt PAILs: Đạp mạnh mu bàn chân vào tường 10 giây (Tải HSR)",
        "label_en": "PAILs Contraction: Drive Top of Rear Foot into Wall for 10s"
      },
      {
        "time": "02:25",
        "timeSec": 145,
        "label_vi": "Lỗi sai: Ưỡn lưng thắt lưng để bù góc gập háng bị co rút",
        "label_en": "Common Fault: Lumbar Hyperlordosis Compensating for Tight Hip"
      }
    ],
    "rationale_vi": "Trường phái ATG kết hợp FRC: Cơ thắt lưng chậu (Psoas) và cơ thẳng đùi (Rectus Femoris) bị co ngắn do ngồi nhiều làm kéo khung chậu đổ trước (Anterior Pelvic Tilt). Kéo giãn có tải kết hợp đạp cơ đối kháng giúp tái cấu trúc chiều dài sợi cơ và giải phóng áp lực chèn ép khớp háng trước.",
    "rationale_en": "ATG & FRC hybrid: Chronic sitting shortens the psoas and rectus femoris, driving anterior pelvic tilt and femoral abutment. Loaded stretching with active isometric wall drive drives longitudinal sarcomere addition, restoring anterior capsular clearance.",
    "common_errors_vi": [
      "Lỗi 1: Ưỡn gãy thắt lưng để đẩy người lên thẳng thay vì siết cơ mông chân sau.",
      "Lỗi 2: Đầu gối chân sau cách tường quá xa làm mất lực kéo giãn cơ thẳng đùi.",
      "Lỗi 3: Nín thở gồng cứng cổ khi cảm giác căng rát xuất hiện."
    ],
    "common_errors_en": [
      "Fault 1: Severe lumbar arching to achieve upright posture instead of gluteal drive.",
      "Fault 2: Posterior knee drifting too far from wall, forfeiting rectus femoris stretch.",
      "Fault 3: Breath-holding panic under intense quadriceps stretch tension."
    ],
    "regression_vi": "Hạ cấp: Đặt đầu gối sau cách tường 15-20cm hoặc chống hai tay lên ghế phía trước.",
    "regression_en": "Regression: Position knee 15-20cm away from wall and support hands on a bench.",
    "progression_vi": "Nâng cấp: Dán hoàn toàn lưng và vai phẳng vào tường phía sau.",
    "progression_en": "Progression: Flat back and shoulders touching wall behind in full upright posture.",
    "surgical_correlate": "07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4"
  },
  {
    "id": "ex_hip_p3_02",
    "category": "rehabilitation",
    "zone": "hip",
    "phase": "p3",
    "title_vi": "Bật Nhảy Băng Đồng Tiếp Đất Giữ Vững (Lateral Skater Hops with Stick Landings)",
    "title_en": "Lateral Skater Hops with Stick Landings (Gluteus Medius SSC)",
    "videoUrl": "https://www.youtube.com/watch?v=VSi9x8dzSnU",
    "duration": "04:15",
    "duration_sec": 255,
    "intensity": "Tích trữ & Giải phóng năng lượng đàn hồi mặt phẳng ngang (Frontal Plane SSC)",
    "dosage_vi": "3-4 hiệp x 8 lần nhảy bật mỗi bên, giữ tiếp đất 2 giây ổn định, nghỉ 2 phút",
    "dosage_en": "3-4 sets x 8 hops per side, stick landing for 2s freeze, 2 min rest",
    "tempo": "Bật nảy bộc phát + Dừng chết 2 giây kiểm soát",
    "timestamps": [
      {
        "time": "00:15",
        "timeSec": 15,
        "label_vi": "Đứng một chân, đầu gối và hông hơi chùng nạp năng lượng đàn hồi",
        "label_en": "Single-Leg Athletic Ready Stance, Pre-Tensioning Glute"
      },
      {
        "time": "00:45",
        "timeSec": 45,
        "label_vi": "Bật nhảy ngang dứt khoát sang bên đối diện (Cự ly 1.5 - 2 mét)",
        "label_en": "Explosive Lateral Bound across 1.5 - 2 Meters"
      },
      {
        "time": "01:20",
        "timeSec": 80,
        "label_vi": "Tiếp đất bằng một chân và giữ bất động 2 giây (Stick Landing)",
        "label_en": "Single-Leg Deceleration & 2-Second Frozen Stick Landing"
      },
      {
        "time": "02:00",
        "timeSec": 120,
        "label_vi": "Lỗi sai: Đầu gối bị sụp vào trong (Knee Valgus) khi tiếp đất",
        "label_en": "Common Fault: Dynamic Knee Valgus Collapse on Landing"
      }
    ],
    "rationale_vi": "Khôi phục khả năng hấp thu xung lực lệch tâm của cơ mông nhỡ và cơ căng mạc đùi trong mặt phẳng trán (Frontal Plane). Động tác dừng chết (Stick Landing) huấn luyện cơ bắp phanh hãm lực quán tính, ngăn ngừa tổn thương dây chằng chéo trước (ACL) và hội chứng dải chậu chày.",
    "rationale_en": "Re-educates high-velocity eccentric shock absorption across the gluteus medius in the frontal plane. The stick landing trains instantaneous deceleration, eradicating dynamic knee valgus and safeguarding the ACL and IT band.",
    "common_errors_vi": [
      "Lỗi 1: Đầu gối sụp vào trong hướng về ngón cái (Valgus) thể hiện cơ mông nhỡ bị yếu phản xạ.",
      "Lỗi 2: Nhảy tiếp đất bằng gót chân dộng lực thẳng lên khớp háng.",
      "Lỗi 3: Không giữ được thăng bằng 2 giây, phải dặm chân phụ xuống sàn."
    ],
    "common_errors_en": [
      "Fault 1: Dynamic knee valgus collapse indicating delayed gluteus medius firing.",
      "Fault 2: Heavy heel strike jarring the acetabulofemoral articular cartilage.",
      "Fault 3: Inability to freeze for 2 seconds, requiring compensatory second-foot tap."
    ],
    "regression_vi": "Hạ cấp: Rút ngắn khoảng cách nhảy xuống 0.5 mét hoặc nhảy bước bộ (Skater Steps).",
    "regression_en": "Regression: Shorten bound distance to 0.5m or perform skater lateral step-overs.",
    "progression_vi": "Nâng cấp: Tăng cự ly nhảy và thực hiện liên tục không dừng (Continuous Rebound Skaters).",
    "progression_en": "Progression: Increase distance to 2.5m with reactive continuous elastic rebounds.",
    "surgical_correlate": "07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4"
  },
  {
    "id": "ex_knee_p1_02",
    "category": "rehabilitation",
    "zone": "knee",
    "phase": "p1",
    "title_vi": "Gồng Tĩnh Đá Đùi Máy Góc 60 Độ (Seated Leg Extension Isometric Hold at 60°)",
    "title_en": "Seated Leg Extension Isometric Hold at 60° (Cook & Rio Analgesia)",
    "videoUrl": "https://www.youtube.com/watch?v=m08gkeFXqvs",
    "duration": "04:20",
    "duration_sec": 260,
    "intensity": "70% MVC Isometric (Cô lập gân bánh chè)",
    "dosage_vi": "5 hiệp x 45 giây giữ tĩnh ở góc gập gối 60 độ, nghỉ 2 phút giữa hiệp, 1-2 lần/ngày",
    "dosage_en": "5 sets x 45s sustained hold at 60° knee flexion, 2 min rest interval, 1-2x daily",
    "tempo": "Isometric 45s sustained hold",
    "timestamps": [
      {
        "time": "00:15",
        "timeSec": 15,
        "label_vi": "Ngồi tựa lưng ghế máy đá đùi, trục xoay máy khớp với khớp gối",
        "label_en": "Seat Setup, Machine Axis Aligned Perfectly with Knee Joint"
      },
      {
        "time": "00:45",
        "timeSec": 45,
        "label_vi": "Cố định cần gạt ở góc gối 60° (Tránh góc 90° nén gân hoặc 0° quá tải)",
        "label_en": "Lock Machine Arm at 60° Knee Flexion (Optimal Tension Arc)"
      },
      {
        "time": "01:25",
        "timeSec": 85,
        "label_vi": "Đá gồng tĩnh 70% lực tối đa vào cần gạt, giữ liên tục 45 giây",
        "label_en": "70% MVC Isometric Extension Drive into Pad for 45s"
      },
      {
        "time": "02:05",
        "timeSec": 125,
        "label_vi": "Lỗi sai: Nhấc mông lên khỏi ghế hoặc gồng giật cục",
        "label_en": "Common Fault: Pelvis Lifting Off Seat or Jerky Force Spikes"
      }
    ],
    "rationale_vi": "Giao thức nghiên cứu gốc của TS. Ebonie Rio (2015): Giữ tĩnh trên máy Leg Extension ở góc 60 độ flexione là góc sinh cơ học tối ưu nơi gân bánh chè chịu lực căng tối đa mà diện tiếp xúc khớp bánh chè - đùi rộng nhất, giảm áp lực nén đỉnh điểm và triệt tiêu 80% cảm giác đau trong 45 phút.",
    "rationale_en": "Seminal protocol per Dr. Ebonie Rio (2015): Isometric leg extension at 60° knee flexion optimizes patellar tendon tensile strain while distributing patellofemoral contact stress broadly, yielding immediate 80% analgesia via cortical motor inhibition.",
    "common_errors_vi": [
      "Lỗi 1: Đặt góc gối quá sâu (90 độ) gây đau chèn ép cực dưới xương bánh chè.",
      "Lỗi 2: Nhấc mông lên khỏi ghế dùng trọng lượng cơ thể đè thay vì cơ tứ đầu đùi.",
      "Lỗi 3: Nghỉ giữa hiệp quá ngắn (< 2 phút) không đủ tái nạp thần kinh trung ương."
    ],
    "common_errors_en": [
      "Fault 1: Setting angle at 90° flexion inducing painful bone-tendon impingement.",
      "Fault 2: Buttocks lifting off seat, compensating with trunk inertia.",
      "Fault 3: Rushing rest interval under 2 minutes, preventing CNS motor reset."
    ],
    "regression_vi": "Hạ cấp: Giảm mức tạ xuống 50% MVC hoặc gồng tĩnh duỗi gối thẳng chân nằm ngửa.",
    "regression_en": "Regression: Reduce to 50% MVC or perform supine straight-leg isometric quad squeezes.",
    "progression_vi": "Nâng cấp: Thực hiện đơn chân (Single-Leg Leg Extension Isometric) tăng tải lên 75% MVC.",
    "progression_en": "Progression: Single-leg execution with external load calibrated to 75% unilateral MVC.",
    "surgical_correlate": "07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4"
  },
  {
    "id": "ex_knee_p2_02",
    "category": "rehabilitation",
    "zone": "knee",
    "phase": "p2",
    "title_vi": "Squat Ván Nghiêng 25 Độ Nhịp Chậm (25° Slant Board Decline Squat HSR)",
    "title_en": "Heavy Slow 25° Slant Board Decline Squat (Patellar Tendon HSR)",
    "videoUrl": "https://www.youtube.com/watch?v=N1GnUR7ezaU",
    "duration": "05:05",
    "duration_sec": 305,
    "intensity": "70-75% 1RM (10-12 RM)",
    "dosage_vi": "3-4 hiệp x 8-12 lần, Tempo 3-1-3 (3s hạ, 1s giữ, 3s nâng), gánh tạ đòn, 3 buổi/tuần",
    "dosage_en": "3-4 sets x 8-12 reps, Tempo 3-1-3, holding dumbbells/barbell, 2 min rest, 3x/wk",
    "tempo": "3-1-3 Heavy Slow Resistance",
    "timestamps": [
      {
        "time": "00:20",
        "timeSec": 20,
        "label_vi": "Đứng trên ván nghiêng 25° chúi xuống, thân người thẳng đứng",
        "label_en": "25° Decline Slant Board Stance, Upright Torso Setup"
      },
      {
        "time": "00:50",
        "timeSec": 50,
        "label_vi": "Hạ người chậm rãi 3 giây, đẩy đầu gối tịnh tiến về trước",
        "label_en": "3-Second Descent: Knees Translating Forward over Toes"
      },
      {
        "time": "01:30",
        "timeSec": 90,
        "label_vi": "Dừng 1 giây tại góc gối 90° nạp toàn bộ tải vào gân bánh chè",
        "label_en": "1-Second Pause at 90° Maximizing Patellar Tendon Strain"
      },
      {
        "time": "02:10",
        "timeSec": 130,
        "label_vi": "Nâng lên 3 giây bằng cơ tứ đầu (Không giật khóa khớp gối)",
        "label_en": "3-Second Smooth Ascent via Quads with Soft Lockout"
      }
    ],
    "rationale_vi": "Mô hình thực nghiệm Kongsgaard & Purdam: Đứng trên ván nghiêng 25 độ dốc xuống vô hiệu hóa sự tham gia của bắp chân và cơ mông, cô lập hoàn toàn lực kéo lên cơ tứ đầu và gân bánh chè (tăng lực căng gân bánh chè thêm 30% so với squat trên sàn phẳng), kích hoạt tái cấu trúc ma trận collagen Type I tối đa.",
    "rationale_en": "Kongsgaard & Purdam decline model: A 25° decline slant board eliminates calf and glute compensation, directing 30% higher mechanical strain into the patellar tendon compared to flat squats, maximally driving tenocyte collagen synthesis.",
    "common_errors_vi": [
      "Lỗi 1: Gập hông chúc người ra trước làm mất lực căng cô lập của gân bánh chè.",
      "Lỗi 2: Nhấc gót chân lên khỏi ván nghiêng làm mất điểm tựa vững chãi.",
      "Lỗi 3: Thả tạ rơi nhanh làm gân bị sốc tải thụ động."
    ],
    "common_errors_en": [
      "Fault 1: Bending forward at hips, converting the movement into a hip hinge.",
      "Fault 2: Heels lifting off board, destabilizing weight distribution.",
      "Fault 3: Rapid descent shocking the tendon fascicles with passive shear."
    ],
    "regression_vi": "Hạ cấp: Tập với trọng lượng cơ thể không tạ hoặc giảm độ nghiêng xuống 15 độ.",
    "regression_en": "Regression: Bodyweight only on a 15° board or handrail-assisted decline squats.",
    "progression_vi": "Nâng cấp: Gánh tạ đòn 75% 1RM hoặc thực hiện squat ván nghiêng đơn chân (Single-Leg).",
    "progression_en": "Progression: Barbell loaded to 75% 1RM or single-leg decline squats.",
    "surgical_correlate": "07_01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4"
  },
  {
    "id": "ex_achilles_p3_02",
    "category": "rehabilitation",
    "zone": "achilles",
    "phase": "p3",
    "title_vi": "Nhón Gót Gối Qua Mũi Chân KOT & Nâng Cơ Chày Trước (KOT Calf & Tibialis Bar Raise)",
    "title_en": "Knees Over Toes Calf Raise & Weighted Tibialis Bar Raise (ATG Ankle)",
    "videoUrl": "https://www.youtube.com/watch?v=a974n8T5iTY",
    "duration": "05:10",
    "duration_sec": 310,
    "intensity": "Tải trọng góc tận cực đại gập mu bàn chân & Cơ đối kháng",
    "dosage_vi": "3 hiệp x 15 lần nhón gót sâu KOT + 3 hiệp x 20 lần nâng cơ chày trước, 2-3 buổi/tuần",
    "dosage_en": "3 sets x 15 KOT deep calf raises + 3 sets x 20 weighted tibialis raises, 2-3x/week",
    "tempo": "3-1-3 Kiểm soát sâu góc tận",
    "timestamps": [
      {
        "time": "00:20",
        "timeSec": 20,
        "label_vi": "Đứng dựa tường, đầu gối đẩy sâu về phía trước vượt qua mũi chân",
        "label_en": "Wall Support Stance, Knees Pushed Deep Over Toes"
      },
      {
        "time": "00:55",
        "timeSec": 55,
        "label_vi": "Nhón gót chân lên hết biên độ chịu tải ở góc gối gập (KOT Calf)",
        "label_en": "Elevate Heels into Full Plantarflexion with Knees Forward"
      },
      {
        "time": "01:40",
        "timeSec": 100,
        "label_vi": "Chuyển tư thế tựa lưng tường, nâng bẻ ngược mũi chân lên trần (Tibialis)",
        "label_en": "Lean Against Wall, Dorsiflex Toes Toward Ceiling (Tibialis Raise)"
      },
      {
        "time": "02:25",
        "timeSec": 145,
        "label_vi": "Lỗi sai: Nhấc mông rời tường hoặc nhún giật quán tính",
        "label_en": "Common Fault: Hips Peeling Off Wall or Bouncing Toes"
      }
    ],
    "rationale_vi": "Hệ thống bảo vệ cổ chân toàn diện ATG (Ben Patrick): Để gân gót Achilles không bao giờ bị đứt hay viêm tái phát, cơ đối kháng của nó là cơ chày trước (Tibialis Anterior) phải đủ khỏe để hoạt động như một bộ giảm xóc khi tiếp đất. Bài tập KOT Calf kết hợp Tibialis Raise xây dựng sự cân bằng cơ học hoàn hảo quanh khớp cổ chân.",
    "rationale_en": "Comprehensive ATG ankle bulletproofing (Ben Patrick): To prevent Achilles rupture or recurrence, the antagonist tibialis anterior must be conditioned as a hydraulic shock-absorber. Pairing KOT calf raises with weighted tibialis raises creates reciprocal dynamic ankle joint symmetry.",
    "common_errors_vi": [
      "Lỗi 1: Đẩy hông ra sau khi nâng mũi chân làm giảm tải lên cơ chày trước.",
      "Lỗi 2: Biên độ nhón gót quá nông không kích hoạt được sợi gân sâu.",
      "Lỗi 3: Tiếp đất bằng gót chân quá gắt khi hạ mũi chân."
    ],
    "common_errors_en": [
      "Fault 1: Pushing hips back during tibialis raises, slacking anterior compartment load.",
      "Fault 2: Shallow heel lift failing to access terminal plantarflexion excursion.",
      "Fault 3: Harsh ground impact during eccentric foot lowering."
    ],
    "regression_vi": "Hạ cấp: Đứng gần tường hơn khi nâng cơ chày trước và nhón gót hai chân không tạ.",
    "regression_en": "Regression: Stand closer to wall to reduce lever arm during tibialis raises.",
    "progression_vi": "Nâng cấp: Dùng thanh tạ chuyên dụng móc tạ đĩa vào mũi chân (Tib-Bar loaded to 10-15kg).",
    "progression_en": "Progression: Utilize a plate-loaded Tib-Bar attachment weighted to 10-15kg.",
    "surgical_correlate": "07_07_Transtibial_Amputation_AMI_Technique_Colin_Harrington.mp4"
  },
  {
    "id": "surg_01_01",
    "category": "surgical_masterclass",
    "subspecialty_id": "01_fractures",
    "subspecialty_vi": "Gãy xương cổ bàn tay & Cẳng tay",
    "subspecialty_en": "Hand, Wrist & Forearm Fractures",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "01_Distal_Radius_Fracture_Reduction_Strategies.mp4",
    "local_path": "01_Gay_Xuong_Co_Ban_Tay/01_Distal_Radius_Fracture_Reduction_Strategies.mp4",
    "videoUrl": "local://01_Gay_Xuong_Co_Ban_Tay/01_Distal_Radius_Fracture_Reduction_Strategies.mp4",
    "title_vi": "Chiến lược nắn chỉnh các mảnh gãy đầu dưới xương quay phức tạp",
    "title_en": "Distal Radius Fracture Reduction Strategies",
    "duration": "10.6 phút",
    "duration_sec": 636,
    "description_vi": "Phân tích chiến lược nắn chỉnh mở và phục hồi diện khớp đầu dưới xương quay, kiểm soát góc nghiêng mặt khớp và phục hồi chiều dài trụ - quay.",
    "description_en": "Detailed reduction strategies for complex intra-articular distal radius fractures, restoring radial height, inclination, and volar tilt.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Phục hồi giải phẫu diện khớp và độ vững cơ học sau kết hợp xương là điều kiện tiên quyết để bắt đầu tập vận động chủ động sớm (Early Controlled Motion - ECM). Nạp tải gồng tĩnh đẳng trường ngón tay và cổ tay sớm ngăn chặn dính gân gấp/duỗi trong rãnh xơ, duy trì dinh dưỡng thẩm thấu của sụn khớp và giảm phù nề chi.",
    "rationale_en": "Rigid anatomical fixation permits early active-controlled motion (ECM). Controlled loading stimulates synovial fluid nutrient diffusion, prevents tendon adhesion to the volar plate, and attenuates complex regional pain syndrome (CRPS).",
    "mechanotherapy_correlation_vi": "Tại sao phẫu thuật chuẩn xác cần kết hợp cơ học trị liệu bảo tồn? Xem xét sự trượt của gân gấp sâu (FDP) và gân gấp nông (FDS) trên nền nẹp mặt lòng, tập trượt gân sớm có kiểm soát giúp ngăn ngừa biến chứng xơ dính và đứt gân FPL thứ phát.",
    "mechanotherapy_correlation_en": "Surgical precision enables conservative mechanotherapy: controlled tendon gliding maneuvers minimize friction over the volar implant, preventing secondary FPL rupture.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_01_02",
    "category": "surgical_masterclass",
    "subspecialty_id": "01_fractures",
    "subspecialty_vi": "Gãy xương cổ bàn tay & Cẳng tay",
    "subspecialty_en": "Hand, Wrist & Forearm Fractures",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "02_Distal_Radius_FCR_Approach_Volar_Plating.mp4",
    "local_path": "01_Gay_Xuong_Co_Ban_Tay/02_Distal_Radius_FCR_Approach_Volar_Plating.mp4",
    "videoUrl": "local://01_Gay_Xuong_Co_Ban_Tay/02_Distal_Radius_FCR_Approach_Volar_Plating.mp4",
    "title_vi": "Đường mổ FCR và kết hợp xương nẹp mặt lòng đầu dưới xương quay",
    "title_en": "Distal Radius FCR Approach and Volar Plating",
    "duration": "7.7 phút",
    "duration_sec": 462,
    "description_vi": "Kỹ thuật bộc lộ qua bao gân cơ gấp cổ tay quay (FCR), bộc lộ khoảng Parona và giải phóng cơ sấp vuông để đặt nẹp khóa mặt lòng.",
    "description_en": "Volar approach through the FCR tendon sheath, exposing Parona's space and pronator quadratus elevation for stable volar locking plating.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Đường mổ FCR bảo tồn thần kinh giữa và nhánh bì gan tay. Việc bóc tách tôn trọng cơ sấp vuông và khâu phục hồi lại cơ này ngăn ngừa cọ xát trực tiếp giữa mép nẹp kim loại và gân gấp ngón cái dài (FPL).",
    "rationale_en": "The FCR approach spares the median nerve palmar cutaneous branch. Meticulous pronator quadratus repair insulates the flexor pollicis longus (FPL) tendon from metal hardware prominence.",
    "mechanotherapy_correlation_vi": "Giai đoạn hậu phẫu đòi hỏi nạp tải trượt gân ngón cái nhẹ nhàng trong 2 tuần đầu nhằm ngăn cản mô hạt xơ hóa kết nối gân FPL với nẹp nắp xương.",
    "mechanotherapy_correlation_en": "Early post-operative tendon gliding is mandatory within the first 14 days to prevent fibroblastic tethering of the FPL tendon over the plate margin.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_01_03",
    "category": "surgical_masterclass",
    "subspecialty_id": "01_fractures",
    "subspecialty_vi": "Gãy xương cổ bàn tay & Cẳng tay",
    "subspecialty_en": "Hand, Wrist & Forearm Fractures",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "03_Distal_Radius_Extended_FCR_Approach_Orbay_Technique.mp4",
    "local_path": "01_Gay_Xuong_Co_Ban_Tay/03_Distal_Radius_Extended_FCR_Approach_Orbay_Technique.mp4",
    "videoUrl": "local://01_Gay_Xuong_Co_Ban_Tay/03_Distal_Radius_Extended_FCR_Approach_Orbay_Technique.mp4",
    "title_vi": "Đường mổ FCR mở rộng giải phóng vách gian cơ quay (Kỹ thuật Dr. Orbay)",
    "title_en": "Extended FCR Approach & Radial Septum Release (Orbay Technique)",
    "duration": "14.4 phút",
    "duration_sec": 864,
    "description_vi": "Kỹ thuật Dr. Jorge Orbay giải phóng vách gian cơ quay (Radial Septum) và chỗ bám cơ cánh tay quay (Brachioradialis), cho phép lật toàn bộ khối xương quay để nắn chỉnh mảnh mặt khớp.",
    "description_en": "Dr. Jorge Orbay's extended approach releasing the radial septum and brachioradialis insertion, allowing complete pronation of the proximal fragment for direct articular reduction.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Cơ cánh tay quay (Brachioradialis) là yếu tố gây co rút kéo lệch mỏm trâm quay lên trên. Giải phóng vách gian cơ triệt tiêu lực kéo biến dạng, tạo điều kiện cho cơ sinh học nắn chỉnh hoàn hảo.",
    "rationale_en": "Brachioradialis deforming force drives proximal migration of the radial styloid. Radial septum release neutralizes this deforming vector, facilitating anatomical reconstruction.",
    "mechanotherapy_correlation_vi": "Cơ học trị liệu vận động xoay sấp - ngửa sớm sau khi cố định nẹp vững chắc giúp duy trì trục xoay trơn tru của khớp quay trụ dưới (DRUJ).",
    "mechanotherapy_correlation_en": "Mechanotherapy emphasizing early active pronation-supination restores physiological rotation across the distal radioulnar joint (DRUJ).",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_01_04",
    "category": "surgical_masterclass",
    "subspecialty_id": "01_fractures",
    "subspecialty_vi": "Gãy xương cổ bàn tay & Cẳng tay",
    "subspecialty_en": "Hand, Wrist & Forearm Fractures",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "04_Distal_Radius_Malunion_Volar_Ulnar_Osteotomy.mp4",
    "local_path": "01_Gay_Xuong_Co_Ban_Tay/04_Distal_Radius_Malunion_Volar_Ulnar_Osteotomy.mp4",
    "videoUrl": "local://01_Gay_Xuong_Co_Ban_Tay/04_Distal_Radius_Malunion_Volar_Ulnar_Osteotomy.mp4",
    "title_vi": "Đục xương sửa trục can lệch đầu dưới xương quay mảnh góc trong lòng",
    "title_en": "Distal Radius Malunion Volar Ulnar Osteotomy",
    "duration": "4.2 phút",
    "duration_sec": 252,
    "description_vi": "Phẫu thuật đục xương sửa trục cho các trường hợp can liền lệch mặt lòng xương quay gây mất vững khớp quay trụ dưới và hạn chế xoay cẳng tay.",
    "description_en": "Corrective osteotomy for volar malunion of the distal radius restoring volar tilt, radial length, and DRUJ congruent kinematics.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Can lệch đầu dưới xương quay làm thay đổi phân bố tải trọng qua cổ tay (bình thường 80% qua xương quay, 20% qua xương trụ). Phục hồi trục xương giúp đưa phân bố lực cơ sinh học về trạng thái sinh lý.",
    "rationale_en": "Malunion shifts axial load distribution abnormally to the ulnar column. Realignment re-establishes normal 80/20 radial-ulnar load transmission.",
    "mechanotherapy_correlation_vi": "Sau đục xương sửa trục, các bài tập Heavy Slow Resistance tăng dần tải nén dọc trục kích thích tái cấu trúc xương ghép theo định luật Wolff.",
    "mechanotherapy_correlation_en": "Post-osteotomy, graduated Heavy Slow Resistance compressive loading accelerates graft incorporation and trabecular remodeling per Wolff's Law.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_01_05",
    "category": "surgical_masterclass",
    "subspecialty_id": "01_fractures",
    "subspecialty_vi": "Gãy xương cổ bàn tay & Cẳng tay",
    "subspecialty_en": "Hand, Wrist & Forearm Fractures",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "05_Distal_Radius_Closed_Reduction_Percutaneous_Pinning.mp4",
    "local_path": "01_Gay_Xuong_Co_Ban_Tay/05_Distal_Radius_Closed_Reduction_Percutaneous_Pinning.mp4",
    "videoUrl": "local://01_Gay_Xuong_Co_Ban_Tay/05_Distal_Radius_Closed_Reduction_Percutaneous_Pinning.mp4",
    "title_vi": "Nắn kín và xuyên đinh Kirschner qua da gãy đầu dưới xương quay",
    "title_en": "Closed Reduction & Percutaneous Pinning (CRPP) of Distal Radius",
    "duration": "10.1 phút",
    "duration_sec": 606,
    "description_vi": "Kỹ thuật nắn kín dưới màn tăng sáng C-arm và cố định vững chắc qua da bằng các chùm đinh Kirschner chéo và đinh Kapandji nội ổ gãy.",
    "description_en": "Fluoroscopy-guided closed reduction and percutaneous Kirschner wire fixation utilizing cross-pinning and intrafocal Kapandji techniques.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Phương pháp xâm lấn tối thiểu bảo tồn tối đa màng xương và nguồn cấp máu tại ổ gãy, giảm thiểu nguy cơ nhiễm trùng và sẹo dính gân phần mềm.",
    "rationale_en": "Minimally invasive pinning preserves periosteal biology and fracture hematoma, reducing soft-tissue scar formation and flexor tethering.",
    "mechanotherapy_correlation_vi": "Trong thời gian mang đinh Kirschner, việc duy trì gồng cơ đẳng cự (Isometric) các ngón tay và khớp vai là tối quan trọng để chống teo cơ do stress deprivation.",
    "mechanotherapy_correlation_en": "While pinned, daily isometric digital and proximal shoulder loading prevents stress-deprivation disuse atrophy and edema.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_01_06",
    "category": "surgical_masterclass",
    "subspecialty_id": "01_fractures",
    "subspecialty_vi": "Gãy xương cổ bàn tay & Cẳng tay",
    "subspecialty_en": "Hand, Wrist & Forearm Fractures",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "06_Distal_Radius_Colles_Fracture_Review_&_Outcomes.mp4",
    "local_path": "01_Gay_Xuong_Co_Ban_Tay/06_Distal_Radius_Colles_Fracture_Review_&_Outcomes.mp4",
    "videoUrl": "local://01_Gay_Xuong_Co_Ban_Tay/06_Distal_Radius_Colles_Fracture_Review_&_Outcomes.mp4",
    "title_vi": "Tổng quan gãy Colles, phân loại và kết quả điều trị",
    "title_en": "Colles Fracture Comprehensive Review, Classification & Outcomes",
    "duration": "10.0 phút",
    "duration_sec": 600,
    "description_vi": "Tổng kết toàn diện về cơ chế chấn thương ngã chống tay (FOOSH), phân loại Fernandez / Frykman và các chỉ số dự báo kết quả chức năng.",
    "description_en": "Comprehensive review of FOOSH injury mechanics, Frykman/Fernandez classification systems, and functional radiological benchmarks.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Gãy Colles ngoài khớp ở người lớn tuổi thường đi kèm loãng xương. Hiểu rõ cơ sinh học góc nghiêng mặt khớp giúp bác sĩ lựa chọn giữa bó bột bảo tồn hay phẫu thuật kết hợp xương.",
    "rationale_en": "Extra-articular Colles fractures in osteoporotic bone require rigorous radiographic threshold evaluation to determine non-operative cast vs surgical candidacy.",
    "mechanotherapy_correlation_vi": "Cơ học trị liệu chứng minh rằng bó bột quá 6 tuần gây cứng gân gập ngón và giảm mật độ khoáng chất xương; tập vận động chủ động sớm có kiểm soát mang lại điểm số DASH vượt trội.",
    "mechanotherapy_correlation_en": "Mechanotherapy evidence highlights that cast immobilization beyond 6 weeks causes tenosynovial rigidity; early controlled motion yields superior functional DASH scores.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_01_07",
    "category": "surgical_masterclass",
    "subspecialty_id": "01_fractures",
    "subspecialty_vi": "Gãy xương cổ bàn tay & Cẳng tay",
    "subspecialty_en": "Hand, Wrist & Forearm Fractures",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "07_Forearm_Both_Bone_Fractures_ORIF.mp4",
    "local_path": "01_Gay_Xuong_Co_Ban_Tay/07_Forearm_Both_Bone_Fractures_ORIF.mp4",
    "videoUrl": "local://01_Gay_Xuong_Co_Ban_Tay/07_Forearm_Both_Bone_Fractures_ORIF.mp4",
    "title_vi": "Kết hợp xương gãy 2 xương cẳng tay (ORIF Both Bone Forearm)",
    "title_en": "Both Bone Forearm Fractures Open Reduction Internal Fixation",
    "duration": "9.5 phút",
    "duration_sec": 570,
    "description_vi": "Phẫu thuật kết hợp xương nẹp vít vững chắc cho gãy cả xương quay và xương trụ, tái lập độ cong sinh lý xương quay (Radial Bow) để bảo tồn sấp ngửa.",
    "description_en": "Rigid plate osteosynthesis of radius and ulna shaft fractures, anatomically restoring the radial bow to preserve rotational forearm kinematics.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Cẳng tay hoạt động như một khớp nối kép (Joint of pronation-supination). Mất độ cong sinh lý xương quay trên 5% sẽ làm suy giảm nghiêm trọng biên độ quay sấp ngửa cẳng tay.",
    "rationale_en": "The forearm operates as a bicentric joint. Loss of radial bow exceeding 5% produces marked rotational loss in pronation and supination.",
    "mechanotherapy_correlation_vi": "Nẹp vít trung hòa lực uốn cho phép tập phục hồi chức năng xoay cẳng tay chủ động ngay từ ngày thứ 3 hậu phẫu, kích thích màng liên cốt thích ứng dẻo dai.",
    "mechanotherapy_correlation_en": "Neutralization plating permits active forearm rotation by post-operative day 3, stimulating healthy tensile remodeling of the interosseous membrane.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_01_08",
    "category": "surgical_masterclass",
    "subspecialty_id": "01_fractures",
    "subspecialty_vi": "Gãy xương cổ bàn tay & Cẳng tay",
    "subspecialty_en": "Hand, Wrist & Forearm Fractures",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "08_Scaphoid_Acute_Fracture_Fixation_2_Headless_Screws.mp4",
    "local_path": "01_Gay_Xuong_Co_Ban_Tay/08_Scaphoid_Acute_Fracture_Fixation_2_Headless_Screws.mp4",
    "videoUrl": "local://01_Gay_Xuong_Co_Ban_Tay/08_Scaphoid_Acute_Fracture_Fixation_2_Headless_Screws.mp4",
    "title_vi": "Kết hợp xương gãy xương thuyền cấp bằng 2 vít headless compression",
    "title_en": "Acute Scaphoid Fracture Fixation with Two Headless Compression Screws",
    "duration": "8.2 phút",
    "duration_sec": 492,
    "description_vi": "Kỹ thuật bắt 2 vít nén tự ép không mũ (Headless Compression Screws) qua da hoặc mổ mở nhỏ điều trị gãy eo và thân xương thuyền, tăng độ vững chống xoay.",
    "description_en": "Percutaneous or mini-open fixation of acute scaphoid fractures using two parallel headless compression screws to resist rotational shear forces.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Xương thuyền có nguồn cấp máu nội cốt đi ngược dòng từ cực xa về cực gần. Hai vít song song tạo lực ép nén tuyệt đối và chống xoắn vặn vượt trội so với một vít đơn độc.",
    "rationale_en": "The scaphoid relies on retrograde intraosseous vascularity. Dual parallel screws provide superior rotational stability and continuous interfragmentary compression.",
    "mechanotherapy_correlation_vi": "Lực nén liên tục theo định luật biến dạng vi thể Perren (Interfragmentary Strain Theory) thúc đẩy liền xương trực tiếp không qua giai đoạn can xơ, rút ngắn thời gian bất động cổ tay.",
    "mechanotherapy_correlation_en": "Continuous interfragmentary compression per Perren's strain theory fosters direct primary bone healing without callus, dramatically reducing casting time.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_01_09",
    "category": "surgical_masterclass",
    "subspecialty_id": "01_fractures",
    "subspecialty_vi": "Gãy xương cổ bàn tay & Cẳng tay",
    "subspecialty_en": "Hand, Wrist & Forearm Fractures",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "09_Scaphoid_ORIF_Dorsal_Approach.mp4",
    "local_path": "01_Gay_Xuong_Co_Ban_Tay/09_Scaphoid_ORIF_Dorsal_Approach.mp4",
    "videoUrl": "local://01_Gay_Xuong_Co_Ban_Tay/09_Scaphoid_ORIF_Dorsal_Approach.mp4",
    "title_vi": "Đường mổ lối sau kết hợp xương gãy xương thuyền",
    "title_en": "Scaphoid Fracture Dorsal Approach ORIF",
    "duration": "9.9 phút",
    "duration_sec": 594,
    "description_vi": "Bộc lộ xương thuyền từ mặt lưng qua khoang gân duỗi số 3 và số 4, đặc biệt chỉ định cho các trường hợp gãy cực gần (Proximal Pole).",
    "description_en": "Dorsal approach between the 3rd and 4th extensor compartments, uniquely tailored for proximal pole scaphoid fractures.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Gãy cực gần xương thuyền có nguy cơ hoại tử vô mạch (AVN) rất cao do nguồn mạch máu bị cắt đứt. Đường mổ sau cho phép nhìn thấy trực tiếp diện gãy và bắt vít vuông góc vào trung tâm mảnh cực gần.",
    "rationale_en": "Proximal pole fractures carry high avascular necrosis (AVN) risks. The dorsal approach affords direct visualization and central screw trajectory into the small proximal fragment.",
    "mechanotherapy_correlation_vi": "Sau khi cố định vững, vận động chủ động nhẹ nhàng các khớp ngón tay kích thích tuần hoàn tĩnh mạch trở về, giảm ứ trệ phù nề vùng cổ tay.",
    "mechanotherapy_correlation_en": "Post-fixation active digital exercises promote lymphatic pumping and venous return, preventing wrist joint capsular fibrosis.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_01_10",
    "category": "surgical_masterclass",
    "subspecialty_id": "01_fractures",
    "subspecialty_vi": "Gãy xương cổ bàn tay & Cẳng tay",
    "subspecialty_en": "Hand, Wrist & Forearm Fractures",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "10_Scaphoid_Proximal_Pole_Two_Screw_Fixation.mp4",
    "local_path": "01_Gay_Xuong_Co_Ban_Tay/10_Scaphoid_Proximal_Pole_Two_Screw_Fixation.mp4",
    "videoUrl": "local://01_Gay_Xuong_Co_Ban_Tay/10_Scaphoid_Proximal_Pole_Two_Screw_Fixation.mp4",
    "title_vi": "Bắt 2 vít headless điều trị gãy cực gần xương thuyền",
    "title_en": "Scaphoid Proximal Pole Two-Screw Fixation Technique",
    "duration": "9.0 phút",
    "duration_sec": 540,
    "description_vi": "Chi tiết kỹ thuật định vị hai dây dẫn hướng song song và bắt 2 vít nén nhỏ vào mảnh gãy cực gần xương thuyền kích thước nhỏ.",
    "description_en": "Technical nuances of dual guidewire placement and cannulated micro-screw compression into small proximal pole scaphoid fragments.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Mảnh gãy cực gần chịu lực cắt xoắn rất lớn từ dây chằng thuyền - nguyệt. Hai vít tạo ngàm khóa đa điểm triệt tiêu lực xoắn vặn.",
    "rationale_en": "The proximal pole endures high rotational shear via the scapholunate interosseous ligament. Dual micro-screws provide multi-point mechanical purchase.",
    "mechanotherapy_correlation_vi": "Tập gồng tĩnh cổ tay ở vị trí trung tính kích thích tái thông mạch máu xương ghép mà không tạo lực cắt làm lỏng vít.",
    "mechanotherapy_correlation_en": "Neutral-wrist isometric loading promotes revascularization of the bone fragment without inducing micro-motion or screw loosening.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_01_11",
    "category": "surgical_masterclass",
    "subspecialty_id": "01_fractures",
    "subspecialty_vi": "Gãy xương cổ bàn tay & Cẳng tay",
    "subspecialty_en": "Hand, Wrist & Forearm Fractures",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "11_Scaphoid_Nonunion_Volar_Plate_Fixation.mp4",
    "local_path": "01_Gay_Xuong_Co_Ban_Tay/11_Scaphoid_Nonunion_Volar_Plate_Fixation.mp4",
    "videoUrl": "local://01_Gay_Xuong_Co_Ban_Tay/11_Scaphoid_Nonunion_Volar_Plate_Fixation.mp4",
    "title_vi": "Kết hợp xương nẹp mặt lòng điều trị khớp giả xương thuyền",
    "title_en": "Scaphoid Nonunion Volar Plate Fixation & Bone Grafting",
    "duration": "7.7 phút",
    "duration_sec": 462,
    "description_vi": "Điều trị khớp giả xương thuyền tiêu xương khuyết hổng bằng ghép xương xốp mào chậu và cố định nẹp khóa mặt lòng xương thuyền chuyên dụng.",
    "description_en": "Reconstruction of scaphoid nonunion with structural corticocancellous bone grafting and low-profile volar scaphoid locking plate fixation.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Khớp giả xương thuyền lâu ngày dẫn đến biến dạng gập lưng xương thuyền (Humpback deformity) và thoái hóa tiến triển SNAC. Nẹp mặt lòng tạo độ cứng chống gập vượt trội khi khuyết hổng xương lớn.",
    "rationale_en": "Chronic scaphoid nonunion triggers humpback collapse and SNAC wrist arthritis. Volar plating provides superior angular rigidity against flexion collapse in large structural bone voids.",
    "mechanotherapy_correlation_vi": "Sau khi nẹp giữ vững cấu trúc giải phẫu, các bài tập Heavy Slow Resistance ở tuần 6-8 tạo kích thích áp điện (Piezoelectric effect) đẩy nhanh tốc độ tích hợp xương ghép.",
    "mechanotherapy_correlation_en": "Once the construct stabilizes anatomy, progressive HSR at weeks 6-8 generates piezoelectric stimuli accelerating graft osseointegration.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_01_12",
    "category": "surgical_masterclass",
    "subspecialty_id": "01_fractures",
    "subspecialty_vi": "Gãy xương cổ bàn tay & Cẳng tay",
    "subspecialty_en": "Hand, Wrist & Forearm Fractures",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "12_Scaphoid_Nonunion_Nanoscopic_Arthroscopy_Resection.mp4",
    "local_path": "01_Gay_Xuong_Co_Ban_Tay/12_Scaphoid_Nonunion_Nanoscopic_Arthroscopy_Resection.mp4",
    "videoUrl": "local://01_Gay_Xuong_Co_Ban_Tay/12_Scaphoid_Nonunion_Nanoscopic_Arthroscopy_Resection.mp4",
    "title_vi": "Nội soi cổ tay Nanoscopic kết hợp mổ mở ghép xương khớp giả thuyền",
    "title_en": "Nanoscopic Wrist Arthroscopy & Minimally Invasive Scaphoid Grafting",
    "duration": "16.5 phút",
    "duration_sec": 990,
    "description_vi": "Ứng dụng camera nội soi Nanoscopy xâm lấn tối thiểu đánh giá diện khớp, làm sạch tổ chức xơ khớp giả và hỗ trợ ghép xương qua da.",
    "description_en": "Application of ultra-minimally invasive Nanoscopy arthroscopy for articular debridement, fibrous nonunion resection, and percutaneous cannulated grafting.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Nội soi Nanoscopic không làm tổn thương bao khớp và dây chằng cổ tay, bảo tồn tối đa nguồn mạch nuôi dưỡng ngoài xương của xương thuyền.",
    "rationale_en": "Nanoscopic visualization avoids capsular and ligamentous dissection, preserving critical peri-scaphoid extraosseous vascular leashes.",
    "mechanotherapy_correlation_vi": "Giảm thiểu tổn thương bao khớp cho phép bệnh nhân bắt đầu các bài tập CARs cổ tay sớm hơn 3 tuần so với mổ mở truyền thống.",
    "mechanotherapy_correlation_en": "Preserving the wrist capsule allows initiation of gentle wrist CARs up to 3 weeks earlier than conventional open arthrotomy.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_01_13",
    "category": "surgical_masterclass",
    "subspecialty_id": "01_fractures",
    "subspecialty_vi": "Gãy xương cổ bàn tay & Cẳng tay",
    "subspecialty_en": "Hand, Wrist & Forearm Fractures",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "13_Metacarpal_Shaft_Fractures_Antegrade_IM_K-Wire.mp4",
    "local_path": "01_Gay_Xuong_Co_Ban_Tay/13_Metacarpal_Shaft_Fractures_Antegrade_IM_K-Wire.mp4",
    "videoUrl": "local://01_Gay_Xuong_Co_Ban_Tay/13_Metacarpal_Shaft_Fractures_Antegrade_IM_K-Wire.mp4",
    "title_vi": "Gãy thân xương bàn: Kết hợp đinh Kirschner nội tủy xuôi dòng",
    "title_en": "Metacarpal Shaft Fractures Antegrade Intramedullary K-Wire Pinning",
    "duration": "15.1 phút",
    "duration_sec": 906,
    "description_vi": "Kỹ thuật xuyên đinh Kirschner nội tủy xuôi dòng qua gốc xương bàn tay điều trị gãy thân xương bàn ngón 2-5, tránh tổn thương gân duỗi.",
    "description_en": "Antegrade intramedullary K-wire fixation entered at the metacarpal base for shaft fractures, protecting the overlying extensor tendon apparatus.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Đường vào xuôi dòng tại đáy xương bàn không đi qua khớp bàn ngón (MCP) hay bộ máy gân duỗi, ngăn ngừa biến chứng dính gân duỗi và cứng khớp MCP.",
    "rationale_en": "Antegrade entry at the metacarpal base avoids transfixing the MCP joint and sagittal bands, eliminating extensor tendon adhesions.",
    "mechanotherapy_correlation_vi": "Bệnh nhân có thể tập nắm mở bàn tay hoàn toàn (Full Fist) ngay từ tuần đầu tiên, kích thích trượt gân FDS/FDP tối đa.",
    "mechanotherapy_correlation_en": "Immediate active finger flexion (Full Fist) can commence in week 1, maximizing differential flexor tendon excursion.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_01_14",
    "category": "surgical_masterclass",
    "subspecialty_id": "01_fractures",
    "subspecialty_vi": "Gãy xương cổ bàn tay & Cẳng tay",
    "subspecialty_en": "Hand, Wrist & Forearm Fractures",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "14_Proximal_Phalanx_Fractures_Limited_Incision_2_Screws.mp4",
    "local_path": "01_Gay_Xuong_Co_Ban_Tay/14_Proximal_Phalanx_Fractures_Limited_Incision_2_Screws.mp4",
    "videoUrl": "local://01_Gay_Xuong_Co_Ban_Tay/14_Proximal_Phalanx_Fractures_Limited_Incision_2_Screws.mp4",
    "title_vi": "Gãy đốt gần ngón tay: Mổ đường rạch nhỏ bắt 2 vít tự ép",
    "title_en": "Proximal Phalanx Fractures Limited Incision Two-Screw Fixation",
    "duration": "9.2 phút",
    "duration_sec": 552,
    "description_vi": "Phẫu thuật xâm lấn tối thiểu bộc lộ gian gân duỗi, nắn chỉnh gãy chéo xoắn đốt gần và cố định vững chắc bằng 2 vít vi phẫu tự ép.",
    "description_en": "Minimally invasive inter-tendinous approach for spiral/oblique proximal phalanx fractures using dual lag screw osteosynthesis.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Đốt gần nằm ngay dưới dải giữa gân duỗi và bao gân gấp. Cố định vững bằng vít chìm cho phép tập vận động lập tức, ngăn ngừa thảm họa dính gân ngón tay.",
    "rationale_en": "The proximal phalanx is intimately enveloped by flexor and extensor mechanisms. Flush lag screws provide absolute stability permitting immediate active motion.",
    "mechanotherapy_correlation_vi": "Vận động sớm ngón tay sau bắt vít 48 giờ ngăn ngừa dính dải bên gân duỗi vào can xương, bảo toàn góc gập khớp liên đốt gần (PIP).",
    "mechanotherapy_correlation_en": "Active digital motion within 48 hours prevents extensor lateral band adherence to fracture callus, preserving PIP joint flexion.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_02_01",
    "category": "surgical_masterclass",
    "subspecialty_id": "02_pip_ligaments",
    "subspecialty_vi": "Khớp PIP & Mất vững dây chằng",
    "subspecialty_en": "PIP Joint & Ligamentous Instability",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "01_PIP_Joint_Dynamic_External_Fixation.mp4",
    "local_path": "01_Gay_Xuong_Co_Ban_Tay/01_PIP_Joint_Dynamic_External_Fixation.mp4",
    "videoUrl": "local://01_Gay_Xuong_Co_Ban_Tay/01_PIP_Joint_Dynamic_External_Fixation.mp4",
    "title_vi": "Khung cố định ngoài động khớp PIP cho trật gãy khớp liên đốt gần",
    "title_en": "Dynamic External Fixation for Fracture-Dislocations of the PIP Joint",
    "duration": "7.4 phút",
    "duration_sec": 444,
    "description_vi": "Lắp đặt khung cố định ngoài động (Dynamic Compass Hinge) điều trị trật gãy diện khớp ngón tay phức tạp, bảo toàn trục xoay giải phẫu.",
    "description_en": "Application of dynamic external fixator hinge precisely aligned with the PIP center of rotation for unstable fracture-dislocations.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Lực kéo giãn có kiểm soát của khung cố định ngoài giải phóng áp lực đè ép mặt khớp (Ligamentotaxis), đồng thời cho phép gập duỗi thụ động.",
    "rationale_en": "Controlled dynamic distraction (ligamentotaxis) restores congruent joint space while permitting concentric passive and active PIP flexion.",
    "mechanotherapy_correlation_vi": "Sự vận động khớp liên tục kích thích dòng chảy hoạt dịch thẩm thấu nuôi dưỡng tế bào sụn khớp bị dập nát, ngăn ngừa cứng khớp vĩnh viễn.",
    "mechanotherapy_correlation_en": "Continuous passive/active motion circulates synovial fluid, providing essential chondrocyte nutrition and preventing intra-articular ankylosis.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_02_02",
    "category": "surgical_masterclass",
    "subspecialty_id": "02_pip_ligaments",
    "subspecialty_vi": "Khớp PIP & Mất vững dây chằng",
    "subspecialty_en": "PIP Joint & Ligamentous Instability",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "02_PIP_Chronic_Fracture_Dislocation_Hemi_Hamate_Arthroplasty.mp4",
    "local_path": "02_Khop_PIP_&_Mat_Vung_Day_Chang/02_PIP_Chronic_Fracture_Dislocation_Hemi_Hamate_Arthroplasty.mp4",
    "videoUrl": "local://02_Khop_PIP_&_Mat_Vung_Day_Chang/02_PIP_Chronic_Fracture_Dislocation_Hemi_Hamate_Arthroplasty.mp4",
    "title_vi": "Tạo hình khớp bằng mảnh ghép bán xương móc cho trật gãy PIP mãn tính",
    "title_en": "Hemi-Hamate Arthroplasty for Chronic PIP Fracture-Dislocation",
    "duration": "9.0 phút",
    "duration_sec": 540,
    "description_vi": "Lấy một phần diện khớp xương móc (Hamate) làm mảnh ghép sụn xương tự thân tái tạo bờ mặt lòng khuyết hổng của đốt giữa khớp PIP.",
    "description_en": "Autologous osteochondral graft harvest from the distal hamate to reconstruct the volar base of the middle phalanx in chronic PIP dislocations.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Diện khớp giữa xương móc và xương bàn 4-5 có độ cong giải phẫu tương đồng hoàn hảo với hõm khớp mặt lòng đốt giữa ngón tay.",
    "rationale_en": "The dorsal hamate articular surface uniquely mirrors the bicondylar anatomy of the middle phalanx base, restoring intrinsic bony restraint.",
    "mechanotherapy_correlation_vi": "Sau khi mảnh ghép được bắt vít vững, phác đồ cơ học trị liệu nẹp hạn chế duỗi (Dorsal Blocking Splint) cho phép gập chủ động sớm.",
    "mechanotherapy_correlation_en": "Rigid screw fixation coupled with a dorsal blocking splint enables early active flexion, remodeling the neocartilage interface under physiologic load.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_02_03",
    "category": "surgical_masterclass",
    "subspecialty_id": "02_pip_ligaments",
    "subspecialty_vi": "Khớp PIP & Mất vững dây chằng",
    "subspecialty_en": "PIP Joint & Ligamentous Instability",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "03_PIP_Neglected_Fracture_Dislocation_Hemi_Hamate_Arthroplasty_Full.mp4",
    "local_path": "02_Khop_PIP_&_Mat_Vung_Day_Chang/03_PIP_Neglected_Fracture_Dislocation_Hemi_Hamate_Arthroplasty_Full.mp4",
    "videoUrl": "local://02_Khop_PIP_&_Mat_Vung_Day_Chang/03_PIP_Neglected_Fracture_Dislocation_Hemi_Hamate_Arthroplasty_Full.mp4",
    "title_vi": "Hemi-hamate arthroplasty cho trật gãy PIP bỏ sót (Bản full)",
    "title_en": "Neglected PIP Fracture-Dislocation Hemi-Hamate Arthroplasty (Full Case)",
    "duration": "16.1 phút",
    "duration_sec": 966,
    "description_vi": "Phẫu thuật đại tu toàn diện cho ca trật khớp PIP đến muộn nhiều tháng: Giải phóng xơ dính, gọt mảnh ghép xương móc và phục hồi tấm mặt lòng.",
    "description_en": "Comprehensive reconstruction for neglected PIP dislocation: Extensive arthrolysis, custom hamate graft shaping, and volar plate advancement.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Ca bệnh mãn tính luôn kèm theo co rút dây chằng bên và xơ hóa bao khớp. Cần giải phóng triệt để trước khi đặt mảnh ghép xương móc.",
    "rationale_en": "Neglected dislocations exhibit severe collateral contracture and scarring. Complete soft-tissue release is essential prior to seating the autograft.",
    "mechanotherapy_correlation_vi": "Tập trượt gân thụ động và chủ động cách quãng ngăn ngừa hình thành cầu xơ mới trong khoang khớp mới tái tạo.",
    "mechanotherapy_correlation_en": "Intermittent active-assisted gliding exercises prevent secondary adhesions within the newly sculpted joint envelope.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_02_04",
    "category": "surgical_masterclass",
    "subspecialty_id": "02_pip_ligaments",
    "subspecialty_vi": "Khớp PIP & Mất vững dây chằng",
    "subspecialty_en": "PIP Joint & Ligamentous Instability",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "04_PIP_Volar_Plate_Repair_Chronic_Hyperextension.mp4",
    "local_path": "02_Khop_PIP_&_Mat_Vung_Day_Chang/04_PIP_Volar_Plate_Repair_Chronic_Hyperextension.mp4",
    "videoUrl": "local://02_Khop_PIP_&_Mat_Vung_Day_Chang/04_PIP_Volar_Plate_Repair_Chronic_Hyperextension.mp4",
    "title_vi": "Khâu tiền nẹp tấm mặt lòng bàn tay sửa tật quá duỗi PIP / cổ thiên nga",
    "title_en": "PIP Volar Plate Repair & Tenodesis for Chronic Hyperextension Laxity",
    "duration": "3.4 phút",
    "duration_sec": 204,
    "description_vi": "Phục hồi điểm bám tấm mặt lòng (Volar Plate) vào đốt giữa và tạo hình néo gân (Tenodesis) sửa biến dạng cổ thiên nga (Swan-Neck Deformity).",
    "description_en": "Volar plate advancement and tenodesis to middle phalanx to correct chronic PIP hyperextension and swan-neck deformity.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Tấm mặt lòng là cấu trúc chính chống lại lực quá duỗi khớp PIP. Đính lại tấm mặt lòng ở tư thế gập nhẹ 15-20 độ tái lập điểm tựa cơ học.",
    "rationale_en": "The volar plate is the primary static restraint against PIP hyperextension. Anchoring it with a slight 15-20° flexion check-rein restores stability.",
    "mechanotherapy_correlation_vi": "Tập gập ngón tay chủ động kết hợp nẹp khóa góc duỗi ngăn đứt mối khâu nhưng vẫn kích thích sợi collagen tấm mặt lòng tăng sinh.",
    "mechanotherapy_correlation_en": "Active finger flexion with an extension-block splint prevents suture failure while promoting fibroblastic maturation of the repaired fibrocartilage.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_02_05",
    "category": "surgical_masterclass",
    "subspecialty_id": "02_pip_ligaments",
    "subspecialty_vi": "Khớp PIP & Mất vững dây chằng",
    "subspecialty_en": "PIP Joint & Ligamentous Instability",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "05_PIP_Chronic_Untreated_Dislocations_Open_Reduction.mp4",
    "local_path": "02_Khop_PIP_&_Mat_Vung_Day_Chang/05_PIP_Chronic_Untreated_Dislocations_Open_Reduction.mp4",
    "videoUrl": "local://02_Khop_PIP_&_Mat_Vung_Day_Chang/05_PIP_Chronic_Untreated_Dislocations_Open_Reduction.mp4",
    "title_vi": "Mổ mở nắn chỉnh trật khớp PIP đến muộn / không điều trị",
    "title_en": "Open Reduction of Chronic Untreated PIP Joint Dislocations",
    "duration": "12.0 phút",
    "duration_sec": 720,
    "description_vi": "Kỹ thuật mổ mở bộc lộ hai bên giải phóng bao khớp và dây chằng bên bị kẹt trong hõm khớp cho các trường hợp trật khớp PIP bỏ quên.",
    "description_en": "Bilateral open approach for chronic neglected PIP dislocations with scar resection, collateral ligament mobilization, and concentric reduction.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Mô xơ sẹo và tấm mặt lòng bị kẹt vào khe khớp ngăn cản nắn kín. Mổ mở dọn sạch tổ chức hạt là bắt buộc để tái lập diện khớp đồng trục.",
    "rationale_en": "Entrapped volar plate and fibrous tissue prevent closed reduction. Surgical debridement is mandatory to restore concentric articulation.",
    "mechanotherapy_correlation_vi": "Cần kết hợp ngay bài tập FRC CARs đốt ngón tay sau khi rút đinh định vị tạm thời để chống dính khớp tái phát.",
    "mechanotherapy_correlation_en": "Digital CARs and active range-of-motion drills must be instituted immediately following temporary K-wire removal to combat re-stiffness.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_02_06",
    "category": "surgical_masterclass",
    "subspecialty_id": "02_pip_ligaments",
    "subspecialty_vi": "Khớp PIP & Mất vững dây chằng",
    "subspecialty_en": "PIP Joint & Ligamentous Instability",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "06_Thumb_MCP_Radial_Collateral_Ligament_InternalBrace.mp4",
    "local_path": "02_Khop_PIP_&_Mat_Vung_Day_Chang/06_Thumb_MCP_Radial_Collateral_Ligament_InternalBrace.mp4",
    "videoUrl": "local://02_Khop_PIP_&_Mat_Vung_Day_Chang/06_Thumb_MCP_Radial_Collateral_Ligament_InternalBrace.mp4",
    "title_vi": "Tái tạo dây chằng bên quay (RCL) khớp bàn ngón cái bằng InternalBrace",
    "title_en": "Thumb MCP Radial Collateral Ligament Reconstruction with InternalBrace",
    "duration": "7.8 phút",
    "duration_sec": 468,
    "description_vi": "Kỹ thuật neo chỉ siêu bền InternalBrace (FiberTape) tái tạo dây chằng bên quay (RCL) khớp MCP ngón cái, phục hồi lực kẹp véo bàn tay.",
    "description_en": "Ligament augmentation using high-strength suture tape InternalBrace for acute or chronic radial collateral ligament (RCL) tears of thumb MCP.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "RCL ngón cái chịu tải trọng xoay ngoài lớn khi véo kẹp đồ vật. Tăng cường InternalBrace tạo độ vững tức thì mà không cần lấy gân tự thân.",
    "rationale_en": "The thumb RCL resists palmar-ulnar subluxation during pinch grip. InternalBrace augmentation offers immediate mechanical strength without donor morbidity.",
    "mechanotherapy_correlation_vi": "Nhờ có nẹp chỉ chịu tải bên trong, bệnh nhân có thể tập véo ngón cái nhẹ nhàng (Isometric Pinch) ngay từ tuần thứ 2 hậu phẫu.",
    "mechanotherapy_correlation_en": "The InternalBrace supports immediate physiological stress, allowing isometric pinch training at post-op week 2 without ligament stretching.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_02_07",
    "category": "surgical_masterclass",
    "subspecialty_id": "02_pip_ligaments",
    "subspecialty_vi": "Khớp PIP & Mất vững dây chằng",
    "subspecialty_en": "PIP Joint & Ligamentous Instability",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "07_Scapholunate_Dissociation_RASL_Procedure_Nadir_Paksima.mp4",
    "local_path": "02_Khop_PIP_&_Mat_Vung_Day_Chang/07_Scapholunate_Dissociation_RASL_Procedure_Nadir_Paksima.mp4",
    "videoUrl": "local://02_Khop_PIP_&_Mat_Vung_Day_Chang/07_Scapholunate_Dissociation_RASL_Procedure_Nadir_Paksima.mp4",
    "title_vi": "Phẫu thuật RASL điều trị phân ly thuyền nguyet còn nắn được",
    "title_en": "RASL Procedure for Reducible Scapholunate Dissociation (Paksima Technique)",
    "duration": "8.3 phút",
    "duration_sec": 498,
    "description_vi": "Phẫu thuật tái tạo khớp thuyền - nguyệt bằng trục vít tự do (Reduction and Association of Scapholunate - RASL) theo kỹ thuật Dr. Nadir Paksima.",
    "description_en": "Dr. Nadir Paksima's RASL technique utilizing a Herbert screw across the SL joint acting as an artificial axle to maintain scaphoid-lunate alignment.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Dây chằng thuyền - nguyệt (SLIL) đứt hoàn toàn gây mất vững DISI và thoái hóa SLAC. Vít RASL cho phép xoay vi thể giữa hai xương trong khi giữ vững khoảng cách khe khớp.",
    "rationale_en": "SLIL disruption triggers DISI deformity and SLAC wrist. The RASL screw serves as a dynamic mechanical link, permitting rotational freedom without dissociation.",
    "mechanotherapy_correlation_vi": "Cần tập nạp tải cơ đối kháng (cơ gập cổ tay quay FCR) để chủ động kéo xương thuyền về tư thế ngửa sinh lý, hỗ trợ cho khớp thuyền nguyệt.",
    "mechanotherapy_correlation_en": "Targeted isometric FCR activation acts as an active dynamic scaphoid stabilizer, pulling the scaphoid into extension and unloading the neo-ligament.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_02_08",
    "category": "surgical_masterclass",
    "subspecialty_id": "02_pip_ligaments",
    "subspecialty_vi": "Khớp PIP & Mất vững dây chằng",
    "subspecialty_en": "PIP Joint & Ligamentous Instability",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "08_Scapholunate_Instability_Modified_RASL_InternalBrace.mp4",
    "local_path": "02_Khop_PIP_&_Mat_Vung_Day_Chang/08_Scapholunate_Instability_Modified_RASL_InternalBrace.mp4",
    "videoUrl": "local://02_Khop_PIP_&_Mat_Vung_Day_Chang/08_Scapholunate_Instability_Modified_RASL_InternalBrace.mp4",
    "title_vi": "Phẫu thuật RASL cải tiến tăng cường nẹp chỉ ngầm InternalBrace",
    "title_en": "Modified RASL with InternalBrace Scapholunate Ligament Augmentation",
    "duration": "8.4 phút",
    "duration_sec": 504,
    "description_vi": "Kết hợp vít nén RASL với nẹp dây chằng nhân tạo InternalBrace neo xương qua cúc neo suture anchor, tăng cường độ vững gấp đôi.",
    "description_en": "Hybrid construct combining trans-articular cannulated screw with knotless suture-tape InternalBrace augmentation for recalcitrant SL instability.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Sự kết hợp giữa kim loại và chỉ dệt siêu bền tạo sức chống chịu lực cắt ngang và lực xoắn vặn đa hướng khi cổ tay chịu tải nặng.",
    "rationale_en": "Hybrid fixation confers dual protection against multidirectional shear and torsional loads during heavy wrist loading.",
    "mechanotherapy_correlation_vi": "Giai đoạn phục hồi áp dụng các bài tập Heavy Slow Resistance nhịp 3-1-3 tăng dần tải trọng mà không sợ giãn đứt dây chằng tái tạo.",
    "mechanotherapy_correlation_en": "Permits graduated 3-1-3 HSR loading in Phase 2, stimulating bone-anchor integration while protecting against ligament elongation.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_02_09",
    "category": "surgical_masterclass",
    "subspecialty_id": "02_pip_ligaments",
    "subspecialty_vi": "Khớp PIP & Mất vững dây chằng",
    "subspecialty_en": "PIP Joint & Ligamentous Instability",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "09_Midcarpal_Instability_VISI_Wrist_Arthroscopy_DRC_Repair.mp4",
    "local_path": "02_Khop_PIP_&_Mat_Vung_Day_Chang/09_Midcarpal_Instability_VISI_Wrist_Arthroscopy_DRC_Repair.mp4",
    "videoUrl": "local://02_Khop_PIP_&_Mat_Vung_Day_Chang/09_Midcarpal_Instability_VISI_Wrist_Arthroscopy_DRC_Repair.mp4",
    "title_vi": "Nội soi cổ tay khâu dây chằng quay-cổ tay lưng trị mất vững VISI/CIND",
    "title_en": "Wrist Arthroscopy DRC Ligament Repair for VISI Midcarpal Instability",
    "duration": "11.7 phút",
    "duration_sec": 702,
    "description_vi": "Nội soi cổ tay qua các cổng 3-4 và 6R, xác định rách dây chằng quay-cổ tay lưng (DRC) và khâu néo dây chằng phục hồi mất vững gian cổ tay (CIND-VISI).",
    "description_en": "Wrist arthroscopy evaluation of midcarpal instability (VISI/CIND) with capsuloligamentous plication of the dorsal radiocarpal (DRC) ligament.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Mất vững VISI gây tiếng lục cục và đau bờ trụ cổ tay khi cử động. Khâu căng dây chằng DRC phục hồi độ vững thành sau cổ tay.",
    "rationale_en": "CIND-VISI causes painful clunking and ulnar-sided wrist weakness. Thermal or suture DRC plication restores dorsal tension band mechanics.",
    "mechanotherapy_correlation_vi": "Tập luyện thần kinh cơ tăng cường sức mạnh cơ duỗi cổ tay trụ (ECU) giúp chủ động kéo lùi xương nguyệt về tư thế cân bằng.",
    "mechanotherapy_correlation_en": "Neuromuscular re-education of the extensor carpi ulnaris (ECU) dynamic sling stabilizes the carpus against volar midcarpal sag.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_02_10",
    "category": "surgical_masterclass",
    "subspecialty_id": "02_pip_ligaments",
    "subspecialty_vi": "Khớp PIP & Mất vững dây chằng",
    "subspecialty_en": "PIP Joint & Ligamentous Instability",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "10_TFCC_Central_Tears_Repair_Technical_Trick_Shin.mp4",
    "local_path": "02_Khop_PIP_&_Mat_Vung_Day_Chang/10_TFCC_Central_Tears_Repair_Technical_Trick_Shin.mp4",
    "videoUrl": "local://02_Khop_PIP_&_Mat_Vung_Day_Chang/10_TFCC_Central_Tears_Repair_Technical_Trick_Shin.mp4",
    "title_vi": "Mẹo kỹ thuật xử trí rách trung tâm sụn chêm cổ tay TFCC bên trụ",
    "title_en": "Technical Nuances in Central TFCC Tear Debridement & Repair (Shin Method)",
    "duration": "5.4 phút",
    "duration_sec": 324,
    "description_vi": "Kỹ thuật phẫu thuật nội soi của Dr. Alexander Shin xử lý rách trung tâm đĩa sụn tam giác (TFCC Palmer 1A), tạo mép cắt ổn định và khâu màng xương.",
    "description_en": "Dr. Alexander Shin's arthroscopic technical pearls for central TFCC (Palmer 1A) tears: Debridement to stable rims and peripheral capsular repair.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Vùng trung tâm TFCC là vùng vô mạch (Avascular), không có khả năng tự liền sẹo. Cắt lọc tạo mép nhẵn giúp loại bỏ kẹt khớp và triệt tiêu cảm giác đau nhói.",
    "rationale_en": "The central articular disc is avascular with zero intrinsic healing potential. Smooth contouring debridement resolves mechanical catching and pain.",
    "mechanotherapy_correlation_vi": "Sau mổ TFCC, phác đồ HSR tập sấp ngửa cẳng tay có kiểm soát bằng thanh đòn bẩy kích thích phục hồi độ vững cơ động của khớp quay trụ dưới (DRUJ).",
    "mechanotherapy_correlation_en": "Post-debridement, controlled pronation-supination HSR with lever bars recalibrates dynamic stabilizing muscles around the DRUJ.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_02_11",
    "category": "surgical_masterclass",
    "subspecialty_id": "02_pip_ligaments",
    "subspecialty_vi": "Khớp PIP & Mất vững dây chằng",
    "subspecialty_en": "PIP Joint & Ligamentous Instability",
    "zone": "elbow",
    "phase": "anatomy",
    "filename": "11_Essex_Lopresti_Interosseous_Reconstruction_Pronator_Teres.mp4",
    "local_path": "02_Khop_PIP_&_Mat_Vung_Day_Chang/11_Essex_Lopresti_Interosseous_Reconstruction_Pronator_Teres.mp4",
    "videoUrl": "local://02_Khop_PIP_&_Mat_Vung_Day_Chang/11_Essex_Lopresti_Interosseous_Reconstruction_Pronator_Teres.mp4",
    "title_vi": "Tổn thương Essex-Lopresti: Tái tạo màng gian cốt bằng cơ sấp tròn",
    "title_en": "Essex-Lopresti Interosseous Membrane Reconstruction using Pronator Teres",
    "duration": "14.8 phút",
    "duration_sec": 888,
    "description_vi": "Phẫu thuật phức tạp tái tạo dải trung tâm màng gian cốt cẳng tay (IOM Central Band) bằng gân cơ sấp tròn tự thân cho tổn thương Essex-Lopresti.",
    "description_en": "Reconstruction of the disrupted interosseous membrane central band utilizing a pronator teres tendon graft in chronic Essex-Lopresti lesions.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Tổn thương Essex-Lopresti gồm gãy chỏm quay, trật khớp DRUJ và rách toàn bộ màng liên cốt. Tái tạo dải trung tâm ngăn chặn xương quay di lệch trượt lên trên.",
    "rationale_en": "Essex-Lopresti features radial head fracture, DRUJ disruption, and longitudinal IOM tear. Central band reconstruction halts proximal radial migration.",
    "mechanotherapy_correlation_vi": "Cần nạp tải cơ học đẳng cự kéo nén cẳng tay tuần tự để kích hoạt cơ học trị liệu giúp mảnh ghép gân chuyển hóa thành cấu trúc dây chằng chịu lực.",
    "mechanotherapy_correlation_en": "Sequential isometric forearm axial loading promotes mechanotransductive ligamentization of the transposed pronator teres autograft.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_02_12",
    "category": "surgical_masterclass",
    "subspecialty_id": "02_pip_ligaments",
    "subspecialty_vi": "Khớp PIP & Mất vững dây chằng",
    "subspecialty_en": "PIP Joint & Ligamentous Instability",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "12_Perilunate_Dislocations_Reduction_&_Fixation.mp4",
    "local_path": "02_Khop_PIP_&_Mat_Vung_Day_Chang/12_Perilunate_Dislocations_Reduction_&_Fixation.mp4",
    "videoUrl": "local://02_Khop_PIP_&_Mat_Vung_Day_Chang/12_Perilunate_Dislocations_Reduction_&_Fixation.mp4",
    "title_vi": "Trật quanh nguyệt & Trật gãy quanh nguyệt qua thuyền",
    "title_en": "Perilunate & Trans-Scaphoid Perilunate Dislocations Reduction & Fixation",
    "duration": "13.2 phút",
    "duration_sec": 792,
    "description_vi": "Phẫu thuật khẩn cấp kết hợp đường mổ đôi mặt lòng và mặt lưng, nắn chỉnh trật khối xương cổ tay quanh xương nguyệt và khâu phục hồi dây chằng.",
    "description_en": "Combined dorsal-volar open reduction and internal fixation of trans-scaphoid perilunate fracture-dislocations (Mayfield Stage IV instability).",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Đây là chấn thương năng lượng cao tàn phá toàn bộ hệ thống dây chằng cổ tay và chèn ép cấp thần kinh giữa. Giải phóng ống cổ tay và nắn phục hồi xương thuyền - nguyệt là sống còn.",
    "rationale_en": "High-energy catastrophe disrupting carpal arches with acute median nerve compression. Urgent carpal tunnel release and rigid perilunate stabilization are paramount.",
    "mechanotherapy_correlation_vi": "Sau 8-10 tuần cố định, phác đồ vận động góc tận FRC CARs và trượt thần kinh giữa là chìa khóa duy nhất cứu vãn biên độ vận động cổ tay.",
    "mechanotherapy_correlation_en": "Following 8-10 weeks of immobilization, FRC wrist CARs and median nerve neurodynamics are essential to salvage functional wrist arc.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_03_01",
    "category": "surgical_masterclass",
    "subspecialty_id": "03_tendon_sheath",
    "subspecialty_vi": "Bệnh lý gân & Bao gân",
    "subspecialty_en": "Tendon & Tenosynovial Pathologies",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "01_De_Quervain_Pulley_Reconstruction_Retinacular_Graft.mp4",
    "local_path": "01_Gay_Xuong_Co_Ban_Tay/01_De_Quervain_Pulley_Reconstruction_Retinacular_Graft.mp4",
    "videoUrl": "local://01_Gay_Xuong_Co_Ban_Tay/01_De_Quervain_Pulley_Reconstruction_Retinacular_Graft.mp4",
    "title_vi": "Tái tạo ròng rọc khoang duỗi 1 bằng mạc giữ tự thân sau mổ De Quervain",
    "title_en": "First Dorsal Compartment Pulley Reconstruction with Retinacular Graft",
    "duration": "10.7 phút",
    "duration_sec": 642,
    "description_vi": "Xử trí biến chứng trật gân APL/EPB sau phẫu thuật giải phóng De Quervain quá mức bằng cách tạo hình lại ròng rọc từ dải mạc giữ gân duỗi.",
    "description_en": "Correction of painful subluxation of APL/EPB tendons following aggressive De Quervain release via local extensor retinaculum pulley reconstruction.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Cắt bỏ toàn bộ mạc giữ khoang 1 sẽ khiến gân bị trật ra trước mỏm trâm quay khi gập cổ tay. Ròng rọc tái tạo giữ gân nằm đúng rãnh sinh học.",
    "rationale_en": "Complete resection of the first dorsal roof causes volar tendon subluxation during flexion. Pulley reconstruction restores physiological tendon tracking.",
    "mechanotherapy_correlation_vi": "Tại sao Mechanotherapy giúp tránh phẫu thuật này? Gồng tĩnh đẳng trường nghiêng quay (Phase 1) làm giảm sưng bao gân mà không cọ xát, giúp 85% bệnh nhân De Quervain khỏi hoàn toàn không cần phẫu thuật.",
    "mechanotherapy_correlation_en": "Mechanotherapy relevance: Neutral isometric radial deviation (Phase 1) eliminates tenosynovial swelling without friction, resolving 85% of De Quervain cases conservatively.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_03_02",
    "category": "surgical_masterclass",
    "subspecialty_id": "03_tendon_sheath",
    "subspecialty_vi": "Bệnh lý gân & Bao gân",
    "subspecialty_en": "Tendon & Tenosynovial Pathologies",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "02_Trigger_Finger_&_Trigger_Thumb_Surgical_Anatomy_Release.mp4",
    "local_path": "03_Benh_Ly_Gan_Bao_Gan/02_Trigger_Finger_&_Trigger_Thumb_Surgical_Anatomy_Release.mp4",
    "videoUrl": "local://03_Benh_Ly_Gan_Bao_Gan/02_Trigger_Finger_&_Trigger_Thumb_Surgical_Anatomy_Release.mp4",
    "title_vi": "Giải phẫu ngoại khoa & Giải phóng ngón tay lò xo, ngón cái lò xo",
    "title_en": "Trigger Finger & Trigger Thumb Surgical Anatomy & A1 Pulley Release",
    "duration": "10.0 phút",
    "duration_sec": 600,
    "description_vi": "Bộc lộ giải phẫu chi tiết rãnh ròng rọc A1, bảo tồn thần kinh ngón tay riêng và cắt dọc giải phóng hoàn toàn ròng rọc A1 ngón tay và ngón cái.",
    "description_en": "Surgical exposure of A1 pulley anatomy, digital neurovascular bundle protection, and complete longitudinal release for trigger finger and thumb.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Sự mất cân xứng giữa kích thước gân gấp bị phì đại nốt xơ và đường kính ròng rọc A1 gây hiện tượng kẹt ngón. Cắt ròng rọc A1 phục hồi đường trượt tự do.",
    "rationale_en": "Mismatch between swollen flexor tendon nodule (Notta's node) and tight A1 pulley creates locking. Sectioning A1 restores unhindered gliding.",
    "mechanotherapy_correlation_vi": "Trước khi mổ, phác đồ bài tập trượt gân 6 tư thế (Active Tendon Gliding) làm thon gọn nốt phì đại gân và dàn đều dịch bao hoạt dịch, chữa khỏi bệnh ở giai đoạn 1-2.",
    "mechanotherapy_correlation_en": "Conservatively, the 6-stage Active Tendon Gliding protocol remodels the tendon nodule and disperses synovial edema, resolving early-stage trigger digits.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_03_03",
    "category": "surgical_masterclass",
    "subspecialty_id": "03_tendon_sheath",
    "subspecialty_vi": "Bệnh lý gân & Bao gân",
    "subspecialty_en": "Tendon & Tenosynovial Pathologies",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "03_Trigger_Wrist_&_Extended_Carpal_Tunnel_Anatomy.mp4",
    "local_path": "03_Benh_Ly_Gan_Bao_Gan/03_Trigger_Wrist_&_Extended_Carpal_Tunnel_Anatomy.mp4",
    "videoUrl": "local://03_Benh_Ly_Gan_Bao_Gan/03_Trigger_Wrist_&_Extended_Carpal_Tunnel_Anatomy.mp4",
    "title_vi": "Hội chứng kẹt cổ tay (Trigger wrist) & Đường mổ rộng ống cổ tay",
    "title_en": "Trigger Wrist Pathology & Extended Carpal Tunnel Decompression Anatomy",
    "duration": "6.6 phút",
    "duration_sec": 396,
    "description_vi": "Xử trí hội chứng kẹt cổ tay hiếm gặp do khối u xơ, nang hoạt dịch hoặc cơ dị dạng kẹt trong ống cổ tay khi gập duỗi các ngón.",
    "description_en": "Exploration and decompression of trigger wrist caused by anomalous muscle bellies (lumbrical ingrowth), tenosynovial fibroma, or giant synovial cysts.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Gân gấp hoặc cơ phụ đi qua ống cổ tay chật hẹp làm tăng vọt áp lực nội khoang, gây kẹt cổ tay và chèn ép thần kinh giữa cấp tính.",
    "rationale_en": "Anomalous space-occupying lesions gliding through the rigid carpal tunnel spike compartment pressures, producing intermittent locking and acute median neuropathy.",
    "mechanotherapy_correlation_vi": "Bài tập trượt thần kinh giữa (Median Nerve Flossing) kết hợp nạp tải cổ tay đa mặt phẳng giúp duy trì hành lang trượt thông thoáng sau can thiệp.",
    "mechanotherapy_correlation_en": "Median nerve flossing combined with multi-planar wrist HSR maintains patency of the carpal tunnel gliding bed post-intervention.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_03_04",
    "category": "surgical_masterclass",
    "subspecialty_id": "03_tendon_sheath",
    "subspecialty_vi": "Bệnh lý gân & Bao gân",
    "subspecialty_en": "Tendon & Tenosynovial Pathologies",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "04_FPL_Rupture_Rheumatoid_Arthritis_Mannerfelt_Syndrome.mp4",
    "local_path": "03_Benh_Ly_Gan_Bao_Gan/04_FPL_Rupture_Rheumatoid_Arthritis_Mannerfelt_Syndrome.mp4",
    "videoUrl": "local://03_Benh_Ly_Gan_Bao_Gan/04_FPL_Rupture_Rheumatoid_Arthritis_Mannerfelt_Syndrome.mp4",
    "title_vi": "Đứt gân gấp dài ngón cái ở bệnh nhân VKDT / Mannerfelt syndrome",
    "title_en": "FPL Tendon Rupture in Rheumatoid Arthritis (Mannerfelt Syndrome)",
    "duration": "9.3 phút",
    "duration_sec": 558,
    "description_vi": "Phẫu thuật làm sạch gai xương củ thuyền mài mòn gân, cắt bao hoạt dịch viêm và chuyển gân FDS ngón 4 tái tạo gân FPL bị đứt trong hội chứng Mannerfelt.",
    "description_en": "Resection of scaphoid osteophyte spur, radical tenosynovectomy, and ring finger FDS tendon transfer for attrition FPL rupture (Mannerfelt syndrome).",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Gai xương thô ráp ở cực dưới xương thuyền mài mòn liên tục gân FPL trong viêm khớp dạng thấp cho đến khi đứt gân hoàn toàn.",
    "rationale_en": "A sharp osteophyte on the volar scaphoid attritionally saws through the gliding FPL tendon within the inflamed rheumatoid tenosynovium.",
    "mechanotherapy_correlation_vi": "Cơ học trị liệu phân tích: Bất động ngón cái đơn thuần không ngăn được đứt gân nếu còn gai xương; sau chuyển gân, bài tập tái giáo dục vỏ não (Biofeedback) giúp chuyển đổi chức năng gân nhanh chóng.",
    "mechanotherapy_correlation_en": "Biomechanical pearl: Cortical motor re-education and biofeedback training re-train the transferred FDS tendon to execute pure thumb flexion.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_03_05",
    "category": "surgical_masterclass",
    "subspecialty_id": "03_tendon_sheath",
    "subspecialty_vi": "Bệnh lý gân & Bao gân",
    "subspecialty_en": "Tendon & Tenosynovial Pathologies",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "05_Chronic_FPL_Laceration_Tendon_Advancement_Nerve_Allograft.mp4",
    "local_path": "03_Benh_Ly_Gan_Bao_Gan/05_Chronic_FPL_Laceration_Tendon_Advancement_Nerve_Allograft.mp4",
    "videoUrl": "local://03_Benh_Ly_Gan_Bao_Gan/05_Chronic_FPL_Laceration_Tendon_Advancement_Nerve_Allograft.mp4",
    "title_vi": "Tiến gân FPL cũ + Ghép thần kinh đồng loại do u thần kinh",
    "title_en": "Chronic FPL Laceration: Tendon Advancement & Processed Nerve Allograft",
    "duration": "11.2 phút",
    "duration_sec": 672,
    "description_vi": "Xử lý đứt gân FPL mãn tính co rút kèm u thần kinh đau (Neuroma) bằng phẫu thuật cắt u thần kinh, ghép mảnh thần kinh đồng loại và kéo tiến gân FPL.",
    "description_en": "Reconstruction of chronic retracted FPL laceration with digital neuroma excision, processed nerve allograft (PNA), and FPL tendon advancement.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Gân FPL co rút sau nhiều tuần sẽ bị teo sợi cơ và thoái hóa mỡ. Kéo tiến gân kết hợp giải phóng xơ giúp khôi phục hành trình co ngắn chủ động.",
    "rationale_en": "Chronic tendon retraction leads to myotendinous shortening and fatty infiltration. Tendon advancement and tenolysis restore working excursion.",
    "mechanotherapy_correlation_vi": "Tập nạp tải đẳng trường nhẹ nhàng ở tuần 4 kích thích quá trình tái tạo trục sợi thần kinh qua mảnh ghép đồng loại (Axonal regeneration).",
    "mechanotherapy_correlation_en": "Graduated isometric tension at week 4 stimulates Schwann cell migration and axonal elongation across the nerve allograft.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_03_06",
    "category": "surgical_masterclass",
    "subspecialty_id": "03_tendon_sheath",
    "subspecialty_vi": "Bệnh lý gân & Bao gân",
    "subspecialty_en": "Tendon & Tenosynovial Pathologies",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "06_Zone_1_Flexor_Tendon_Repair_Jersey_Finger.mp4",
    "local_path": "03_Benh_Ly_Gan_Bao_Gan/06_Zone_1_Flexor_Tendon_Repair_Jersey_Finger.mp4",
    "videoUrl": "local://03_Benh_Ly_Gan_Bao_Gan/06_Zone_1_Flexor_Tendon_Repair_Jersey_Finger.mp4",
    "title_vi": "Khâu phục hồi gân gấp Vùng 1 / Đứt chỗ bám FDP / Jersey finger",
    "title_en": "Zone 1 Flexor Tendon Repair for Avulsion of FDP (Jersey Finger)",
    "duration": "9.6 phút",
    "duration_sec": 576,
    "description_vi": "Phẫu thuật khâu đính lại gân gấp sâu ngón tay (FDP) bị giật đứt khỏi đốt xa (Jersey finger) qua cúc néo xuyên móng hoặc mỏ neo xương.",
    "description_en": "Anatomical refixation of avulsed flexor digitorum profundus (FDP) tendon to distal phalanx base using suture anchors or pull-out button.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Gân FDP đứt văng vào lòng bàn tay cắt đứt nguồn cấp máu từ hệ thống dây chằng vincula. Cần khâu lại khẩn cấp trước khi đầu gân bị hoại tử xơ hóa.",
    "rationale_en": "FDP avulsion compromises vincula brevia blood supply. Urgent anatomical re-anchoring prevents irreversible tendon necrosis and vincula ischemia.",
    "mechanotherapy_correlation_vi": "Phác đồ Kleinert hoặc Duran: Vận động duỗi chủ động có nẹp thun đàn hồi kéo gập thụ động bảo vệ mối khâu khỏi lực căng phá vỡ nhưng ngăn ngừa dính gân.",
    "mechanotherapy_correlation_en": "Kleinert/Duran protocol: Passive flexion with elastic recoil and active extension protects the repair site while preventing adhesion formation.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_03_07",
    "category": "surgical_masterclass",
    "subspecialty_id": "03_tendon_sheath",
    "subspecialty_vi": "Bệnh lý gân & Bao gân",
    "subspecialty_en": "Tendon & Tenosynovial Pathologies",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "07_Zone_1_Flexor_Tendon_Repair_Technique_Moses.mp4",
    "local_path": "03_Benh_Ly_Gan_Bao_Gan/07_Zone_1_Flexor_Tendon_Repair_Technique_Moses.mp4",
    "videoUrl": "local://03_Benh_Ly_Gan_Bao_Gan/07_Zone_1_Flexor_Tendon_Repair_Technique_Moses.mp4",
    "title_vi": "Chi tiết kỹ thuật mổ khâu phục hồi gân gấp Vùng 1 (Moses - NYU)",
    "title_en": "Zone 1 Flexor Tendon Repair Surgical Technique (Moses - NYU Langone)",
    "duration": "14.2 phút",
    "duration_sec": 852,
    "description_vi": "Kỹ thuật khâu lõi 4 sợi (4-strand core suture) kết hợp khâu viền biểu mô của TS. Moses - NYU Langone đảm bảo độ bền kéo đứt > 40 Newton.",
    "description_en": "Dr. Moses (NYU Langone) technique: 4-strand core suture with running epitendinous stitch achieving > 40N tensile strength for safe early active motion.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Mối khâu chịu lực vững chắc là nền tảng sống còn để người bệnh có thể tập vận động chủ động sớm (True Early Active Motion) mà không sợ bung mối khâu.",
    "rationale_en": "High tensile repair strength (> 40N) is the mandatory prerequisite permitting True Early Active Motion (TEAM) protocols without gap formation.",
    "mechanotherapy_correlation_vi": "Lực căng cơ học có kiểm soát 5-10% lực kích hoạt nguyên bào gân sản sinh Collagen Type I làm tăng độ bền sinh học của mối khâu gấp 3 lần sau 4 tuần.",
    "mechanotherapy_correlation_en": "Controlled cyclic loading (5-10% MVC) upregulates tendon intrinsic collagen synthesis, accelerating tensile strength gain threefold by week 4.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_04_01",
    "category": "surgical_masterclass",
    "subspecialty_id": "04_nerve_tendon_transfer",
    "subspecialty_vi": "Thần kinh ngoại biên & Chuyển gân",
    "subspecialty_en": "Peripheral Nerves & Tendon Transfers",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "01_Carpal_Tunnel_Release_Comprehensive_Anatomy_&_Local_Anesthesia.mp4",
    "local_path": "01_Gay_Xuong_Co_Ban_Tay/01_Carpal_Tunnel_Release_Comprehensive_Anatomy_&_Local_Anesthesia.mp4",
    "videoUrl": "local://01_Gay_Xuong_Co_Ban_Tay/01_Carpal_Tunnel_Release_Comprehensive_Anatomy_&_Local_Anesthesia.mp4",
    "title_vi": "Giải phóng Hội chứng ống cổ tay toàn diện: Gây tê, giải phẫu, kỹ thuật",
    "title_en": "Carpal Tunnel Release: Comprehensive Anatomy, WALANT Anesthesia & Technique",
    "duration": "23.2 phút",
    "duration_sec": 1392,
    "description_vi": "Bài giảng phẫu thuật toàn diện: Gây tê tại chỗ bệnh nhân tỉnh táo (WALANT), giải phẫu mạc giữ gân gấp, nhánh vận động cơ mô cái và cắt mở ống cổ tay an toàn.",
    "description_en": "Comprehensive masterclass: WALANT anesthesia, transverse carpal ligament surgical anatomy, recurrent motor branch variations, and safe decompression.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Hội chứng ống cổ tay (CTS) là tình trạng chèn ép vi mạch máu nuôi thần kinh giữa do tăng áp lực nội ống. Cắt mạc giữ gân gấp hạ áp lực từ > 30mmHg về mức sinh lý.",
    "rationale_en": "CTS induces intraneural ischemia due to elevated carpal tunnel pressure (> 30 mmHg). Transverse carpal ligament sectioning restores microvascular perfusion.",
    "mechanotherapy_correlation_vi": "Bảo tồn không mổ bằng Mechanotherapy: Bài tập trượt gân bàn tay kết hợp kéo giãn cơ gấp cổ tay giúp giảm áp lực ống cổ tay, đảo ngược triệu chứng tê rần ở 70% ca CTS nhẹ và trung bình.",
    "mechanotherapy_correlation_en": "Conservative mechanotherapy: Lumbrical stretching and median nerve flossing reduce intracarpal pressure, resolving symptoms in 70% of mild-to-moderate CTS.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_04_02",
    "category": "surgical_masterclass",
    "subspecialty_id": "04_nerve_tendon_transfer",
    "subspecialty_vi": "Thần kinh ngoại biên & Chuyển gân",
    "subspecialty_en": "Peripheral Nerves & Tendon Transfers",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "02_Recurrent_Carpal_Tunnel_Hypothenar_Fat_Pad_Flap.mp4",
    "local_path": "04_Than_Kinh_Ngoai_Bien_&_Chuyen_Gan/02_Recurrent_Carpal_Tunnel_Hypothenar_Fat_Pad_Flap.mp4",
    "videoUrl": "local://04_Than_Kinh_Ngoai_Bien_&_Chuyen_Gan/02_Recurrent_Carpal_Tunnel_Hypothenar_Fat_Pad_Flap.mp4",
    "title_vi": "Vạt mỡ mô út (Hypothenar fat pad flap) cho ống cổ tay tái phát",
    "title_en": "Hypothenar Fat Pad Flap for Recurrent & Recalcitrant Carpal Tunnel",
    "duration": "11.1 phút",
    "duration_sec": 666,
    "description_vi": "Phẫu thuật cứu vãn hội chứng ống cổ tay tái phát do xơ dính sẹo: Bóc vạt mỡ có cuống mạch mô út xoay phủ cách ly thần kinh giữa khỏi nền gân.",
    "description_en": "Salvage reconstruction for recurrent carpal tunnel scarring: Pedicled hypothenar fat pad flap rotated to wrap and insulate the median nerve.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Thần kinh giữa bị dính vào khối sẹo xơ cứng sẽ mất khả năng trượt dọc (bình thường trượt 10-12mm khi gập duỗi). Vạt mỡ cung cấp đệm lót giàu mạch máu tái tạo giường trượt.",
    "rationale_en": "Scar tethering obliterates longitudinal median nerve excursion (normal 10-12mm). The vascularized fat pad restores a friction-free gliding bed.",
    "mechanotherapy_correlation_vi": "Sau mổ, phác đồ trượt thần kinh nhẹ nhàng ở biên độ nhỏ ngăn cản mô hạt dính thần kinh vào vạt mỡ.",
    "mechanotherapy_correlation_en": "Post-flap neurodynamic flossing ensures smooth gliding interface between the nerve epineurium and transposed adipose tissue.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_04_03",
    "category": "surgical_masterclass",
    "subspecialty_id": "04_nerve_tendon_transfer",
    "subspecialty_vi": "Thần kinh ngoại biên & Chuyển gân",
    "subspecialty_en": "Peripheral Nerves & Tendon Transfers",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "03_Recalcitrant_Carpal_Tunnel_FDS_Muscle_Flap.mp4",
    "local_path": "04_Than_Kinh_Ngoai_Bien_&_Chuyen_Gan/03_Recalcitrant_Carpal_Tunnel_FDS_Muscle_Flap.mp4",
    "videoUrl": "local://04_Than_Kinh_Ngoai_Bien_&_Chuyen_Gan/03_Recalcitrant_Carpal_Tunnel_FDS_Muscle_Flap.mp4",
    "title_vi": "Vạt cơ gấp nông các ngón (FDS flap) cho ống cổ tay xơ dính nặng",
    "title_en": "FDS Muscle Bellies Local Vascularized Flap for Recalcitrant CTS",
    "duration": "10.5 phút",
    "duration_sec": 630,
    "description_vi": "Sử dụng bụng cơ gân gấp nông (FDS) xoay lật phủ làm hàng rào sinh học bảo vệ thần kinh giữa bị tổn thương xơ teo sau nhiều lần phẫu thuật thất bại.",
    "description_en": "Use of an FDS muscle belly flap as a vascularized barrier to cushion and revascularize an injured median nerve in multiply operated carpal tunnels.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Cung cấp nguồn tuần hoàn dồi dào trực tiếp từ các nhánh mạch cơ bắp giúp đảo ngược tình trạng thiếu máu cục bộ trong sợi thần kinh (Endoneurial ischemia).",
    "rationale_en": "Direct muscular capillary ingrowth reverses chronic endoneurial ischemia and neuropathic pain in damaged median nerve segments.",
    "mechanotherapy_correlation_vi": "Kích thích co cơ FDS nhịp chậm tạo lực bơm cơ học tuần hoàn mao mạch tại chỗ.",
    "mechanotherapy_correlation_en": "Slow rhythmic concentric contractions of the FDS donor muscle pump localized lymphatic and capillary fluid beds.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_04_04",
    "category": "surgical_masterclass",
    "subspecialty_id": "04_nerve_tendon_transfer",
    "subspecialty_vi": "Thần kinh ngoại biên & Chuyển gân",
    "subspecialty_en": "Peripheral Nerves & Tendon Transfers",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "04_Guyon_Canal_Syndrome_Anatomy_&_3_Zones_Decompression.mp4",
    "local_path": "04_Than_Kinh_Ngoai_Bien_&_Chuyen_Gan/04_Guyon_Canal_Syndrome_Anatomy_&_3_Zones_Decompression.mp4",
    "videoUrl": "local://04_Than_Kinh_Ngoai_Bien_&_Chuyen_Gan/04_Guyon_Canal_Syndrome_Anatomy_&_3_Zones_Decompression.mp4",
    "title_vi": "Hội chứng kênh Guyon: Giải phẫu & Giải ép TK trụ qua 3 phân vùng",
    "title_en": "Guyon Canal Syndrome Anatomy & Three-Zone Ulnar Nerve Decompression",
    "duration": "11.3 phút",
    "duration_sec": 678,
    "description_vi": "Phẫu thuật giải phóng thần kinh trụ tại kênh Guyon: Phân loại 3 vùng (Zone 1 thân chung, Zone 2 nhánh vận động sâu, Zone 3 nhánh cảm giác nông).",
    "description_en": "Surgical release of ulnar nerve entrapment in Guyon's canal with detailed exploration of Zone 1 (motor/sensory), Zone 2 (deep motor), and Zone 3 (superficial sensory).",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Chèn ép nhánh vận động sâu ở Zone 2 gây teo các cơ gian cốt và cơ khép ngón cái mà không mất cảm giác; giải ép chọn lọc giải phóng sức kẹp ngón tay.",
    "rationale_en": "Zone 2 deep motor branch compression causes isolated intrinsic muscle wasting without sensory deficit; targeted release restores intrinsic hand strength.",
    "mechanotherapy_correlation_vi": "Bài tập FRC CARs cổ tay kết hợp trượt thần kinh trụ chủ động ngăn ngừa chèn ép thứ phát do tư thế tỳ đè cổ tay khi đạp xe hoặc dùng dụng cụ.",
    "mechanotherapy_correlation_en": "Targeted ulnar nerve mobilization and ergonomic handlebar unloading prevent compressive neuropraxia in cyclists and manual laborers.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_04_05",
    "category": "surgical_masterclass",
    "subspecialty_id": "04_nerve_tendon_transfer",
    "subspecialty_vi": "Thần kinh ngoại biên & Chuyển gân",
    "subspecialty_en": "Peripheral Nerves & Tendon Transfers",
    "zone": "elbow",
    "phase": "anatomy",
    "filename": "05_Cubital_Tunnel_Ulnar_Nerve_Decompression_Subcutaneous_Transposition.mp4",
    "local_path": "04_Than_Kinh_Ngoai_Bien_&_Chuyen_Gan/05_Cubital_Tunnel_Ulnar_Nerve_Decompression_Subcutaneous_Transposition.mp4",
    "videoUrl": "local://04_Than_Kinh_Ngoai_Bien_&_Chuyen_Gan/05_Cubital_Tunnel_Ulnar_Nerve_Decompression_Subcutaneous_Transposition.mp4",
    "title_vi": "Giải ép & Chuyển TK trụ ra trước dưới da bằng vách liên cơ trong",
    "title_en": "Cubital Tunnel Ulnar Nerve Decompression & Subcutaneous Anterior Transposition",
    "duration": "7.0 phút",
    "duration_sec": 420,
    "description_vi": "Giải phóng dải Osborne, bóc tách thần kinh trụ tại rãnh khuỷu và chuyển ra trước dưới da, tạo đai giữ bằng vạt cân mạc vách gian cơ trong.",
    "description_en": "Release of Osborne's band, medial epicondylectomy/decompression, and anterior subcutaneous transposition with a fascial sling restraint.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Khi gập khuỷu tay, thần kinh trụ bị kéo căng dài thêm 5-8mm và áp lực nội rãnh tăng gấp 6 lần. Chuyển thần kinh ra trước mặt phẳng trục quay triệt tiêu lực kéo căng.",
    "rationale_en": "Elbow flexion elongates the ulnar nerve by 5-8mm while intra-tunnel pressure rises sixfold. Anterior transposition eliminates dynamic stretch and friction.",
    "mechanotherapy_correlation_vi": "Trước phẫu thuật, bài tập gồng tĩnh cơ cánh tay và duỗi khuỷu kiểm soát góc gập < 90° giúp giải phóng chèn ép rãnh khuỷu bảo tồn thành công.",
    "mechanotherapy_correlation_en": "Conservatively, avoiding > 90° prolonged elbow flexion coupled with brachialis isometrics relieves dynamic cubital tunnel hypertension.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_04_06",
    "category": "surgical_masterclass",
    "subspecialty_id": "04_nerve_tendon_transfer",
    "subspecialty_vi": "Thần kinh ngoại biên & Chuyển gân",
    "subspecialty_en": "Peripheral Nerves & Tendon Transfers",
    "zone": "shoulder",
    "phase": "anatomy",
    "filename": "06_Supraclavicular_Brachial_Plexus_Neurolysis.mp4",
    "local_path": "04_Than_Kinh_Ngoai_Bien_&_Chuyen_Gan/06_Supraclavicular_Brachial_Plexus_Neurolysis.mp4",
    "videoUrl": "local://04_Than_Kinh_Ngoai_Bien_&_Chuyen_Gan/06_Supraclavicular_Brachial_Plexus_Neurolysis.mp4",
    "title_vi": "Bóc tách giải ép đám rối thần kinh cánh tay trên đòn",
    "title_en": "Supraclavicular Brachial Plexus Neurolysis & Thoracic Outlet Decompression",
    "duration": "9.1 phút",
    "duration_sec": 546,
    "description_vi": "Phẫu thuật vi phẫu phức tạp giải phóng xơ dính các thân trên, giữa, dưới của đám rối cánh tay và cắt cơ bậc thang trước điều trị hội chứng lối thoát ngực (TOS).",
    "description_en": "Microsurgical neurolysis of upper, middle, and lower trunks of brachial plexus with anterior scalenectomy for neurogenic thoracic outlet syndrome.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Sự chèn ép giữa cơ bậc thang và xương sườn 1 gây thiếu máu rễ thần kinh C5-T1, biểu hiện đau lan tỏa khắp vai và cánh tay.",
    "rationale_en": "Entrapment between the anterior scalene and first rib induces chronic ischemia across C5-T1 nerve roots, driving disabling shoulder-arm pain.",
    "mechanotherapy_correlation_vi": "Các bài tập vận động trượt bả vai Scapular Wall Slide và phục hồi cơ răng trước (Phase 1 Shoulder) giúp mở rộng khoang ngực trên đòn, giải phóng chèn ép tự nhiên.",
    "mechanotherapy_correlation_en": "Periscapular re-education via Scapular Wall Slides (Phase 1) restores thoracic outlet clearance, relieving neurogenic compression without surgery.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_04_07",
    "category": "surgical_masterclass",
    "subspecialty_id": "04_nerve_tendon_transfer",
    "subspecialty_vi": "Thần kinh ngoại biên & Chuyển gân",
    "subspecialty_en": "Peripheral Nerves & Tendon Transfers",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "07_Persistent_Claw_Hand_Modified_Stiles_Bunnell_&_EIP_to_APB.mp4",
    "local_path": "04_Than_Kinh_Ngoai_Bien_&_Chuyen_Gan/07_Persistent_Claw_Hand_Modified_Stiles_Bunnell_&_EIP_to_APB.mp4",
    "videoUrl": "local://04_Than_Kinh_Ngoai_Bien_&_Chuyen_Gan/07_Persistent_Claw_Hand_Modified_Stiles_Bunnell_&_EIP_to_APB.mp4",
    "title_vi": "Phẫu thuật bàn tay vuốt trụ: Chuyển Stiles-Bunnell + EIP to APB",
    "title_en": "Persistent Claw Hand Reconstruction: Modified Stiles-Bunnell & EIP to APB",
    "duration": "11.5 phút",
    "duration_sec": 690,
    "description_vi": "Đại tu bàn tay vuốt trụ mãn tính: Chuyển gân FDS tách đôi theo Stiles-Bunnell phục hồi gập khớp MCP và chuyển gân duỗi ngón trỏ (EIP) phục hồi đối chiếu ngón cái.",
    "description_en": "Reconstruction of severe ulnar claw hand: Modified Stiles-Bunnell FDS slip transfer to restore MCP flexion and EIP-to-APB transfer for thumb opposition.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Liệt thần kinh trụ làm mất các cơ giun 3-4 và cơ gian cốt, dẫn đến biến dạng quá duỗi khớp MCP và gập quắp khớp IP. Chuyển gân phục hồi lại sự cân bằng cơ nội tại.",
    "rationale_en": "Ulnar nerve palsy paralyzes interossei and lumbricals 3-4, causing MCP hyperextension and IP clawing. Tendon transfer restores intrinsic muscular balance.",
    "mechanotherapy_correlation_vi": "Cơ học trị liệu: Bài tập tái huấn luyện vỏ não vận động (Tendon Neuroplastic Training - TNT) theo Rio et al. giúp người bệnh học cách dùng cơ gấp để duỗi ngón tay mượt mà.",
    "mechanotherapy_correlation_en": "Mechanotherapy TNT (Tendon Neuroplastic Training): Auditory-paced metronome loading re-maps cortical motor drive for seamless donor-to-recipient motor control.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_04_08",
    "category": "surgical_masterclass",
    "subspecialty_id": "04_nerve_tendon_transfer",
    "subspecialty_vi": "Thần kinh ngoại biên & Chuyển gân",
    "subspecialty_en": "Peripheral Nerves & Tendon Transfers",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "08_Thumb_Opposition_Tendon_Transfer_EIP_to_APB.mp4",
    "local_path": "04_Than_Kinh_Ngoai_Bien_&_Chuyen_Gan/08_Thumb_Opposition_Tendon_Transfer_EIP_to_APB.mp4",
    "videoUrl": "local://04_Than_Kinh_Ngoai_Bien_&_Chuyen_Gan/08_Thumb_Opposition_Tendon_Transfer_EIP_to_APB.mp4",
    "title_vi": "Chuyển gân EIP sang APB phục hồi đối chiếu ngón cái liệt TK giữa",
    "title_en": "Thumb Opposition Tendon Transfer (EIP to APB Burkhalter Technique)",
    "duration": "11.0 phút",
    "duration_sec": 660,
    "description_vi": "Kỹ thuật Burkhalter: Lấy gân duỗi riêng ngón trỏ (EIP) luồn quanh bờ trụ cổ tay đính vào gân dạng ngắn ngón cái (APB), khôi phục hoàn hảo động tác đối chiếu.",
    "description_en": "Burkhalter opponeusplasty: Harvest of extensor indicis proprius (EIP) routed around ulnar border to APB insertion, restoring thumb palmar abduction and pronation.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Liệt thần kinh giữa làm ngón cái mất khả năng xoay sấp và đối chiếu (Bàn tay khỉ). Hướng kéo từ bờ trụ cổ tay của gân EIP tạo véc-tơ lực lý tưởng để ngón cái chạm ngón út.",
    "rationale_en": "Low median nerve palsy destroys thumb opposition (ape-hand). The ulnar-to-radial trajectory of the EIP harvest creates the ideal vector for palmar abduction.",
    "mechanotherapy_correlation_vi": "Sau khi cố định 3 tuần, bài tập nạp tải gồng tĩnh bấm ngón tay tăng dần sức chịu tải giúp gân EIP thích nghi làm việc trong môi trường cơ sinh học mới.",
    "mechanotherapy_correlation_en": "Graduated isometric pinch loading at week 3 stimulates tensile adaptation of the transposed EIP unit into its new mechanical pulley line.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_05_01",
    "category": "surgical_masterclass",
    "subspecialty_id": "05_arthritis_salvage",
    "subspecialty_vi": "Thoái hóa khớp & Phẫu thuật cứu vãn",
    "subspecialty_en": "Arthritis & Salvage Arthroplasty",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "01_Thumb_CMC_Joint_Total_Replacement_Arthroplasty.mp4",
    "local_path": "01_Gay_Xuong_Co_Ban_Tay/01_Thumb_CMC_Joint_Total_Replacement_Arthroplasty.mp4",
    "videoUrl": "local://01_Gay_Xuong_Co_Ban_Tay/01_Thumb_CMC_Joint_Total_Replacement_Arthroplasty.mp4",
    "title_vi": "Thay toàn bộ khớp bàn ngón cái (CMC Arthroplasty)",
    "title_en": "Total Joint Replacement Arthroplasty of Thumb Basal CMC Joint",
    "duration": "9.1 phút",
    "duration_sec": 546,
    "description_vi": "Thay khớp nhân tạo chỏm cầu - ổ cối bằng hợp kim và polyethylene cho khớp bàn ngón cái (Trapeziometacarpal joint) bị thoái hóa nặng.",
    "description_en": "Total joint arthroplasty using modular dual-mobility or ball-and-socket implants for end-stage thumb basal carpometacarpal osteoarthritis.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Khớp CMC ngón cái chịu tải nén ép gấp 12 lần lực kẹp véo ở đầu ngón tay. Thay khớp nhân tạo loại bỏ cơn đau cọ xát xương và duy trì chiều dài ngón cái.",
    "rationale_en": "The thumb CMC joint sustains compressive contact stress up to 12 times tip-pinch force. Total arthroplasty eliminates bone-on-bone pain and preserves ray length.",
    "mechanotherapy_correlation_vi": "Cơ học trị liệu phòng ngừa: Rèn luyện cơ dạng dài ngón cái và cơ liên cốt mu tay 1 (1st DI) giúp chia sẻ tải trọng nén ép, trì hoãn thoái hóa khớp CMC từ 5-10 năm.",
    "mechanotherapy_correlation_en": "Preventative mechanotherapy: Strengthening the first dorsal interosseous (1st DI) dynamically stabilizes the metacarpal base, delaying arthrosis by years.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_05_02",
    "category": "surgical_masterclass",
    "subspecialty_id": "05_arthritis_salvage",
    "subspecialty_vi": "Thoái hóa khớp & Phẫu thuật cứu vãn",
    "subspecialty_en": "Arthritis & Salvage Arthroplasty",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "02_Thumb_Basal_Joint_Arthritis_Modified_Del_Signore_Arthroplasty.mp4",
    "local_path": "05_Thoai_Hoa_Khop_&_Phau_Thuat_Cuu_Van/02_Thumb_Basal_Joint_Arthritis_Modified_Del_Signore_Arthroplasty.mp4",
    "videoUrl": "local://05_Thoai_Hoa_Khop_&_Phau_Thuat_Cuu_Van/02_Thumb_Basal_Joint_Arthritis_Modified_Del_Signore_Arthroplasty.mp4",
    "title_vi": "Tạo hình khớp gốc ngón cái cải tiến theo Del Signore (HSS)",
    "title_en": "Modified Del Signore Basal Joint Arthroplasty (HSS Technique)",
    "duration": "4.7 phút",
    "duration_sec": 282,
    "description_vi": "Cắt xương thang bán phần kết hợp đệm mô liên kết sinh học và néo gân FCR cải tiến tại Bệnh viện Phẫu thuật Chỉnh hình HSS New York.",
    "description_en": "Hospital for Special Surgery (HSS) modified partial trapeziectomy with biological interposition and FCR suspensionplasty.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Tránh biến chứng lỏng chuôi nhân tạo của thay khớp kim loại, sử dụng chính mô sinh học của cơ thể để tạo lớp đệm giảm chấn trọn đời.",
    "rationale_en": "Avoids prosthetic loosening risks of metal implants by creating an autologous biologic cushion from interpositional tendon tissue.",
    "mechanotherapy_correlation_vi": "Nẹp bảo vệ kết hợp tập gồng tĩnh cơ mô cái nhẹ nhàng kích thích mô ghép xơ sụn hóa (Fibrocartilage metaplasia) thành tấm đệm vững bền.",
    "mechanotherapy_correlation_en": "Post-op isometric thenar recruitment stimulates fibrocartilaginous metaplasia of the tendon coil spacer under physiological contact stress.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_05_03",
    "category": "surgical_masterclass",
    "subspecialty_id": "05_arthritis_salvage",
    "subspecialty_vi": "Thoái hóa khớp & Phẫu thuật cứu vãn",
    "subspecialty_en": "Arthritis & Salvage Arthroplasty",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "03_Proximal_Row_Carpectomy_PRC_with_Capitate_Resurfacing.mp4",
    "local_path": "05_Thoai_Hoa_Khop_&_Phau_Thuat_Cuu_Van/03_Proximal_Row_Carpectomy_PRC_with_Capitate_Resurfacing.mp4",
    "videoUrl": "local://05_Thoai_Hoa_Khop_&_Phau_Thuat_Cuu_Van/03_Proximal_Row_Carpectomy_PRC_with_Capitate_Resurfacing.mp4",
    "title_vi": "Cắt hàng xương cổ tay 1 (PRC) kèm tái tạo mặt khớp chỏm xương cả",
    "title_en": "Proximal Row Carpectomy (PRC) with Dorsal Capsule Capitate Resurfacing",
    "duration": "7.2 phút",
    "duration_sec": 432,
    "description_vi": "Cắt bỏ 3 xương cổ tay hàng 1 (thuyền, nguyệt, tháp) và dùng vạt bao khớp mu tay tái tạo bề mặt chỏm xương cả tiếp khớp với hõm xương quay.",
    "description_en": "Excision of scaphoid, lunate, and triquetrum (PRC) combined with dorsal capsular interposition to resurface an arthritic capitate head.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Chỉ định cho thoái hóa cổ tay tiến triển SLAC/SNAC giai đoạn 2. Biến khớp cổ tay phức tạp thành một khớp bản lề đơn giản giữa xương cả và xương quay.",
    "rationale_en": "Indicated for Stage II SLAC/SNAC wrist collapse. Simplifies complex carpal kinematics into a single radio-capitate ball-and-socket articulation.",
    "mechanotherapy_correlation_vi": "Sau mổ PRC, bệnh nhân bảo tồn được 60-70% biên độ gập duỗi cổ tay; bài tập HSR nhịp chậm giúp bao khớp lót thích nghi chịu tải.",
    "mechanotherapy_correlation_en": "Patients retain 60-70% flexion-extension arc; controlled HSR cadences facilitate biological adaptation of the neo-articular interface.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_05_04",
    "category": "surgical_masterclass",
    "subspecialty_id": "05_arthritis_salvage",
    "subspecialty_vi": "Thoái hóa khớp & Phẫu thuật cứu vãn",
    "subspecialty_en": "Arthritis & Salvage Arthroplasty",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "04_PRC_PAMPER_Technique_Matrix_Placement_Capitate_Preservation.mp4",
    "local_path": "05_Thoai_Hoa_Khop_&_Phau_Thuat_Cuu_Van/04_PRC_PAMPER_Technique_Matrix_Placement_Capitate_Preservation.mp4",
    "videoUrl": "local://05_Thoai_Hoa_Khop_&_Phau_Thuat_Cuu_Van/04_PRC_PAMPER_Technique_Matrix_Placement_Capitate_Preservation.mp4",
    "title_vi": "Kỹ thuật PAMPER: Cắt PRC kèm đệm màng chất nền sinh học",
    "title_en": "PRC with PAMPER Technique: Acellular Dermal Matrix Capitate Interposition",
    "duration": "5.8 phút",
    "duration_sec": 348,
    "description_vi": "Ứng dụng màng chất nền vô bào tái tạo sụn (Acellular Dermal Matrix - PAMPER) bọc chỏm xương cả trong phẫu thuật PRC bảo tồn khớp cổ tay.",
    "description_en": "Application of acellular dermal matrix (ADM) interposition (PAMPER protocol) over the capitate pole to prevent secondary radio-capitate wear.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Màng chất nền vô bào ngăn chặn ma sát xương chạm xương giữa chỏm xương cả và hố bán nguyệt xương quay, giảm thiểu nguy cơ đau thoái hóa thứ phát.",
    "rationale_en": "ADM interposition insulates bone-on-bone abrasion between the capitate apex and the lunate fossa, dampening shear wear.",
    "mechanotherapy_correlation_vi": "Sự phân bố tải trọng nén vi thể qua màng sinh học kích thích tế bào gốc trung mô di chuyển đến phủ mặt khớp mới.",
    "mechanotherapy_correlation_en": "Compressive fluid pressurization across the matrix scaffold guides host mesenchymal stem cells to synthesize neo-articular lining.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_05_05",
    "category": "surgical_masterclass",
    "subspecialty_id": "05_arthritis_salvage",
    "subspecialty_vi": "Thoái hóa khớp & Phẫu thuật cứu vãn",
    "subspecialty_en": "Arthritis & Salvage Arthroplasty",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "05_DRUJ_Arthritis_Darrach_Distal_Ulna_Resection.mp4",
    "local_path": "05_Thoai_Hoa_Khop_&_Phau_Thuat_Cuu_Van/05_DRUJ_Arthritis_Darrach_Distal_Ulna_Resection.mp4",
    "videoUrl": "local://05_Thoai_Hoa_Khop_&_Phau_Thuat_Cuu_Van/05_DRUJ_Arthritis_Darrach_Distal_Ulna_Resection.mp4",
    "title_vi": "Phẫu thuật Darrach: Cắt đầu dưới xương trụ thoái hóa/mất vững DRUJ",
    "title_en": "Darrach Procedure: Distal Ulna Resection for Post-Traumatic DRUJ Arthritis",
    "duration": "11.6 phút",
    "duration_sec": 696,
    "description_vi": "Cắt bỏ 1.5 - 2cm chỏm xương trụ kèm tạo hình gân cơ ECU và cơ sấp vuông ổn định mỏm cụt xương trụ, giải quyết đau nhức khớp quay trụ dưới.",
    "description_en": "Resection of the distal 1.5-2cm of the ulnar head with ECU/FCU soft-tissue stabilization to eliminate painful DRUJ arthrosis.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Thoái hóa khớp DRUJ sau gãy xương quay làm bệnh nhân đau đớn dữ dội mỗi khi xoay cẳng tay. Cắt bỏ diện khớp tiếp xúc giải phóng hoàn toàn biên độ sấp ngửa.",
    "rationale_en": "End-stage post-traumatic DRUJ arthritis severely impairs pronation-supination. Resecting the joint surfaces eliminates bone impingement.",
    "mechanotherapy_correlation_vi": "Sau mổ Darrach, cần rèn luyện cơ duỗi cổ tay trụ (ECU) để làm dây chằng động giữ mỏm cụt xương trụ không bị bật trôi ra sau khi chịu tải.",
    "mechanotherapy_correlation_en": "Post-Darrach rehabilitation focuses on dynamic ECU stabilization to prevent painful dorsal scalloping and impingement of the ulnar stump.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_06_01",
    "category": "surgical_masterclass",
    "subspecialty_id": "06_soft_tissue_dupuytren",
    "subspecialty_vi": "U phần mềm & Co rút Dupuytren",
    "subspecialty_en": "Soft Tissue Tumors & Dupuytren Disease",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "01_Dupuytren_Segmental_Fasciectomy_&_Needle_Aponeurotomy.mp4",
    "local_path": "01_Gay_Xuong_Co_Ban_Tay/01_Dupuytren_Segmental_Fasciectomy_&_Needle_Aponeurotomy.mp4",
    "videoUrl": "local://01_Gay_Xuong_Co_Ban_Tay/01_Dupuytren_Segmental_Fasciectomy_&_Needle_Aponeurotomy.mp4",
    "title_vi": "Cắt mạc gan tay từng đoạn & Rạch cân bằng kim cho bệnh Dupuytren",
    "title_en": "Dupuytren Segmental Fasciectomy & Percutaneous Needle Aponeurotomy (PNA)",
    "duration": "7.6 phút",
    "duration_sec": 456,
    "description_vi": "So sánh kỹ thuật xâm lấn tối thiểu rạch đứt dải co rút bằng kim qua da (PNA) và phẫu thuật cắt bỏ từng đoạn mạc gan tay xơ co rút ngón 4-5.",
    "description_en": "Comparison and demonstration of percutaneous needle aponeurotomy (PNA) vs open segmental fasciectomy for Dupuytren contracture cords.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Bệnh Dupuytren do nguyên bào sợi cơ (Myofibroblasts) tăng sinh bất thường tạo các dải xơ Collagen Type III co rút ngón tay. Rạch ngắt quãng giải phóng biến dạng gập.",
    "rationale_en": "Dupuytren disease involves myofibroblast proliferation creating pathological Type III collagen cords. Mechanical interruption releases flexion deformities.",
    "mechanotherapy_correlation_vi": "Sau giải phóng, nẹp đêm duỗi thẳng ngón tay kết hợp bài tập duỗi ngón chủ động (Phase 3 End-Range) là yếu tố quyết định chống tái phát co rút.",
    "mechanotherapy_correlation_en": "Post-release nocturnal extension splinting coupled with active end-range finger extension exercises prevents myofibroblastic contracture relapse.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_06_02",
    "category": "surgical_masterclass",
    "subspecialty_id": "06_soft_tissue_dupuytren",
    "subspecialty_vi": "U phần mềm & Co rút Dupuytren",
    "subspecialty_en": "Soft Tissue Tumors & Dupuytren Disease",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "02_Dupuytren_Partial_Fasciectomy_Technique.mp4",
    "local_path": "06_U_Phan_Mem_&_Co_Rut_Dupuytren/02_Dupuytren_Partial_Fasciectomy_Technique.mp4",
    "videoUrl": "local://06_U_Phan_Mem_&_Co_Rut_Dupuytren/02_Dupuytren_Partial_Fasciectomy_Technique.mp4",
    "title_vi": "Phẫu thuật cắt bán phần mạc gan tay trị co rút Dupuytren",
    "title_en": "Limited Open Fasciectomy for Dupuytren Disease with Bruner Zigzag",
    "duration": "11.9 phút",
    "duration_sec": 714,
    "description_vi": "Phẫu thuật mở kinh điển qua đường rạch zich-zac Bruner, bộc lộ bảo tồn thần kinh mạch máu ngón tay và cắt sạch toàn bộ các dải xơ co rút xoắn vặn.",
    "description_en": "Open limited fasciectomy using Bruner zigzag incisions, meticulous neurovascular bundle mobilization, and complete excision of spiral/retrovascular cords.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Dải xơ xoắn vặn (Spiral Cord) có thể kéo lệch bó mạch thần kinh ngón tay vào giữa đường mổ. Phẫu tích vi phẫu tỉ mỉ tránh biến chứng đứt thần kinh ngón.",
    "rationale_en": "Spiral cords displace digital neurovascular bundles midline and superficially. Meticulous identification prevents catastrophic iatrogenic nerve transection.",
    "mechanotherapy_correlation_vi": "Vận động chủ động ngón tay từ ngày thứ 2 hậu phẫu ngăn sẹo mổ dính vào gân gấp bên dưới, duy trì độ dẻo của da lòng bàn tay.",
    "mechanotherapy_correlation_en": "Early active mobilization starting on day 2 prevents skin flap tethering to underlying flexor sheaths, preserving palmar supple elasticity.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_06_03",
    "category": "surgical_masterclass",
    "subspecialty_id": "06_soft_tissue_dupuytren",
    "subspecialty_vi": "U phần mềm & Co rút Dupuytren",
    "subspecialty_en": "Soft Tissue Tumors & Dupuytren Disease",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "03_Giant_Cell_Tumor_of_Tendon_Sheath_GCTTS_Ring_Finger.mp4",
    "local_path": "06_U_Phan_Mem_&_Co_Rut_Dupuytren/03_Giant_Cell_Tumor_of_Tendon_Sheath_GCTTS_Ring_Finger.mp4",
    "videoUrl": "local://06_U_Phan_Mem_&_Co_Rut_Dupuytren/03_Giant_Cell_Tumor_of_Tendon_Sheath_GCTTS_Ring_Finger.mp4",
    "title_vi": "U tế bào khổng lồ bao gân (GCTTS) ngón tay: Bóc u bảo tồn mạch TK",
    "title_en": "Giant Cell Tumor of Tendon Sheath (GCTTS) Ring Finger Marginal Excision",
    "duration": "6.3 phút",
    "duration_sec": 378,
    "description_vi": "Phẫu thuật bóc tách trọn vẹn khối u tế bào khổng lồ bao gân ngón nhẫn đa thùy có vỏ bọc bám sâu vào rãnh ròng rọc và bao khớp PIP.",
    "description_en": "Marginal en-bloc excision of a lobulated giant cell tumor of the flexor tendon sheath intimately adherent to the A2/A3 pulleys and volar capsule.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "GCTTS là u lành tính phổ biến thứ hai ở bàn tay nhưng có tỷ lệ tái phát cao (15-20%) nếu sót vỏ u. Bóc tách tỉ mỉ bảo tồn hệ thống ròng rọc gân gấp.",
    "rationale_en": "GCTTS is the second most common hand tumor, bearing a 15-20% recurrence rate if capsules fragment. Clean marginal dissection preserves pulley architecture.",
    "mechanotherapy_correlation_vi": "Sau khi bóc u, bài tập trượt gân bàn tay giúp phục hồi lưu lượng hoạt dịch bôi trơn rãnh gân nơi u từng chèn ép.",
    "mechanotherapy_correlation_en": "Post-resection gliding exercises restore unhindered synovial fluid nourishment across the previously compressed flexor compartment.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_06_04",
    "category": "surgical_masterclass",
    "subspecialty_id": "06_soft_tissue_dupuytren",
    "subspecialty_vi": "U phần mềm & Co rút Dupuytren",
    "subspecialty_en": "Soft Tissue Tumors & Dupuytren Disease",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "04_Glomus_Tumor_Excision_Nail_Sparing_Approach.mp4",
    "local_path": "06_U_Phan_Mem_&_Co_Rut_Dupuytren/04_Glomus_Tumor_Excision_Nail_Sparing_Approach.mp4",
    "videoUrl": "local://06_U_Phan_Mem_&_Co_Rut_Dupuytren/04_Glomus_Tumor_Excision_Nail_Sparing_Approach.mp4",
    "title_vi": "Bóc u cuộn mạch (Glomus tumor) dưới móng đường bảo tồn móng",
    "title_en": "Subungual Glomus Tumor Excision with Nail Bed Sparing Approach",
    "duration": "4.4 phút",
    "duration_sec": 264,
    "description_vi": "Bộc lộ qua cửa sổ giường móng vi phẫu bóc tách khối u cuộn mạch cực nhỏ gây đau buốt dữ dội khi tiếp xúc lạnh ở đầu ngón tay.",
    "description_en": "Subungual transungual or lateral subperiosteal excision of a painful glomus tumor with precise nail matrix repair preventing nail deformity.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "U cuộn mạch xuất phát từ cấu trúc nối thông động - tĩnh mạch Sukquet-Hoyer ở đầu ngón. Khâu phục hồi giường móng bằng chỉ vi phẫu 7-0 tránh biến chứng nẻ móng.",
    "rationale_en": "Glomus tumors derive from thermoregulatory Sucquet-Hoyer glomus bodies. Meticulous 7-0 chromic nail bed repair prevents permanent nail dystrophic split.",
    "mechanotherapy_correlation_vi": "Tập giải mẫn cảm xúc giác (Sensory Desensitization) đầu ngón tay sau mổ giúp tái lập ngưỡng cảm giác bình thường cho hệ thần kinh.",
    "mechanotherapy_correlation_en": "Post-operative sensory desensitization drills recalibrate hyperesthetic cutaneous receptors back to physiological sensory thresholds.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_07_01",
    "category": "surgical_masterclass",
    "subspecialty_id": "07_functional_anatomy",
    "subspecialty_vi": "Giải phẫu chức năng & Đường mổ",
    "subspecialty_en": "Functional Anatomy & Surgical Approaches",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4",
    "local_path": "01_Gay_Xuong_Co_Ban_Tay/01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4",
    "videoUrl": "local://01_Gay_Xuong_Co_Ban_Tay/01_Functional_Anatomy_of_the_Hand_Part_1_Flexor_Michael_Rooks.mp4",
    "title_vi": "Bài giảng Giải phẫu chức năng cơ chế bàn tay - Phần 1: Cơ chế gập",
    "title_en": "Functional Anatomy of the Hand - Part 1: Flexor Apparatus (Dr. Michael Rooks)",
    "duration": "12.9 phút",
    "duration_sec": 774,
    "description_vi": "Bài giảng kinh điển của GS. Michael Rooks: Cơ sinh học của hệ thống gân gấp nông (FDS), gấp sâu (FDP), hệ thống ròng rọc A1-A5 và các dải vincula cấp máu.",
    "description_en": "Master lecture by Prof. Michael Rooks detailing the functional biomechanics of FDS, FDP, the A1-A5 pulley system, and vincula vascular arches.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Ròng rọc A2 và A4 là hai cấu trúc bất khả xâm phạm; mất một trong hai ròng rọc này sẽ gây hiện tượng kéo dây cung (Bowstringing) làm mất 40% lực kẹp.",
    "rationale_en": "Pulleys A2 and A4 are biomechanically indispensable; rupture or sacrifice produces severe bowstringing, squandering 40% of digital flexor torque.",
    "mechanotherapy_correlation_vi": "Đây là nền tảng lý thuyết trực tiếp cho các bài tập Mechanotherapy: Hiểu rõ hành trình trượt gân giúp kê đơn số lần lặp và góc gập tối ưu tái tạo gân mà không quá tải ròng rọc.",
    "mechanotherapy_correlation_en": "Direct foundation of Mechanotherapy: Precise understanding of differential tendon excursion governs dosage and angular boundaries for safe rehabilitation.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_07_02",
    "category": "surgical_masterclass",
    "subspecialty_id": "07_functional_anatomy",
    "subspecialty_vi": "Giải phẫu chức năng & Đường mổ",
    "subspecialty_en": "Functional Anatomy & Surgical Approaches",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "02_Functional_Anatomy_of_the_Hand_Part_2_Extensor_Michael_Rooks.mp4",
    "local_path": "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/02_Functional_Anatomy_of_the_Hand_Part_2_Extensor_Michael_Rooks.mp4",
    "videoUrl": "local://07_Giai_Phau_Chuc_Nang_&_Duong_Mo/02_Functional_Anatomy_of_the_Hand_Part_2_Extensor_Michael_Rooks.mp4",
    "title_vi": "Bài giảng Giải phẫu chức năng cơ chế bàn tay - Phần 2: Cơ chế duỗi",
    "title_en": "Functional Anatomy of the Hand - Part 2: Extensor Mechanism (Dr. Michael Rooks)",
    "duration": "9.9 phút",
    "duration_sec": 594,
    "description_vi": "Phân tích cơ chế bộ máy gân duỗi ngón tay: Dải giữa (Central Slip), dải bên (Lateral Bands), dây chằng chéo Landsmeer và cơ giun nội tại.",
    "description_en": "Prof. Michael Rooks' breakdown of the extensor apparatus: Central slip, lateral bands, retinacular ligaments of Landsmeer, and intrinsic lumbrical balancing.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Mất cân bằng giữa dải giữa và dải bên tạo nên các biến dạng kinh điển: Đứt dải giữa gây ngón tay thùa khuyết (Boutonnière), trượt dải bên gây cổ thiên nga.",
    "rationale_en": "Imbalance between central slip and lateral bands generates classic deformities: Central slip disruption yields Boutonnière; lateral band dorsal migration yields Swan-Neck.",
    "mechanotherapy_correlation_vi": "Bài tập duỗi ngón chủ động độc lập (Isolated DIP/PIP extension) tái thiết lập sự trượt cân bằng của dải bên trên nền sụn khớp liên đốt.",
    "mechanotherapy_correlation_en": "Isolated DIP/PIP active extension drills restore harmonious tension balance across lateral bands, correcting early Boutonnière collapse.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_07_03",
    "category": "surgical_masterclass",
    "subspecialty_id": "07_functional_anatomy",
    "subspecialty_vi": "Giải phẫu chức năng & Đường mổ",
    "subspecialty_en": "Functional Anatomy & Surgical Approaches",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "03_Volar_Wrist_Approach_&_Bruner_Zigzag_Incision_Anatomy.mp4",
    "local_path": "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/03_Volar_Wrist_Approach_&_Bruner_Zigzag_Incision_Anatomy.mp4",
    "videoUrl": "local://07_Giai_Phau_Chuc_Nang_&_Duong_Mo/03_Volar_Wrist_Approach_&_Bruner_Zigzag_Incision_Anatomy.mp4",
    "title_vi": "Giải phẫu đường mổ mặt lòng cổ tay & Đường zich zac Bruner trên xác",
    "title_en": "Cadaveric Volar Wrist Approach & Bruner Zigzag Incision Anatomy",
    "duration": "26.6 phút",
    "duration_sec": 1596,
    "description_vi": "Phẫu tích trên xác tươi chi tiết toàn bộ các lớp giải phẫu mặt lòng cổ bàn tay: Đường rạch Bruner góc 60 độ, bảo tồn vạt da nuôi dưỡng và bộc lộ gân gấp.",
    "description_en": "Detailed fresh cadaveric dissection: 60° angled Bruner zigzag incisions, neurovascular angiosome preservation, and deep flexor sheath exposure.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Đường rạch zich-zac Bruner đi qua các nếp gấp tự nhiên của da ngón tay, triệt tiêu lực kéo căng dọc trục và ngăn ngừa sẹo co rút gập ngón tay vĩnh viễn.",
    "rationale_en": "Bruner zigzag incisions cross flexion creases at 60° angles, dissipating linear longitudinal scar contracture vectors and preserving full extension.",
    "mechanotherapy_correlation_vi": "Hiểu cấu trúc da và màng hoạt dịch qua phẫu tích xách giúp người tập tự tin thực hiện các bài kéo giãn góc tận (Loaded Stretching) mà không sợ tổn hại cấu trúc sâu.",
    "mechanotherapy_correlation_en": "Cadaveric structural clarity empowers clinicians and athletes to execute end-range loaded stretches confidently within safe biological limits.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_07_04",
    "category": "surgical_masterclass",
    "subspecialty_id": "07_functional_anatomy",
    "subspecialty_vi": "Giải phẫu chức năng & Đường mổ",
    "subspecialty_en": "Functional Anatomy & Surgical Approaches",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "04_Radius_Extensive_Volar_Henry_Approach_Cadaver.mp4",
    "local_path": "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/04_Radius_Extensive_Volar_Henry_Approach_Cadaver.mp4",
    "videoUrl": "local://07_Giai_Phau_Chuc_Nang_&_Duong_Mo/04_Radius_Extensive_Volar_Henry_Approach_Cadaver.mp4",
    "title_vi": "Đường mổ Henry mặt lòng xương quay từ nếp khuỷu tới cổ tay",
    "title_en": "Extensive Volar Henry Approach from Antecubital Fossa to Wrist (Cadaver Dissection)",
    "duration": "9.3 phút",
    "duration_sec": 558,
    "description_vi": "Phẫu tích toàn bộ chiều dài xương quay qua đường mổ Henry: Bộc lộ bó mạch quay, cơ sấp tròn, cơ gấp nông và giải phóng thần kinh gian cốt sau (PIN).",
    "description_en": "Full-length Henry approach cadaver dissection: Radial artery protection, pronator teres release, FDS elevation, and posterior interosseous nerve (PIN) preservation.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Đường mổ liên thần kinh (Internervous plane) giữa thần kinh quay (cơ cánh tay quay) và thần kinh giữa (cơ sấp tròn, FCR), cho phép bộc lộ toàn bộ xương quay an toàn.",
    "rationale_en": "Internervous interval between radial (brachioradialis) and median (pronator teres/FCR) nerves, affording extensive atraumatic diaphyseal exposure.",
    "mechanotherapy_correlation_vi": "Đường mổ Henry chứng minh cơ sấp tròn là chìa khóa điều hòa lực xoay cẳng tay; nạp tải cơ học phục hồi chức năng cơ sấp tròn giúp tái lập sức mạnh cẳng tay toàn diện.",
    "mechanotherapy_correlation_en": "The Henry dissection validates the pronator teres as the fulcrum of forearm rotation; focused mechanotherapy accelerates full torsional restoration.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_07_05",
    "category": "surgical_masterclass",
    "subspecialty_id": "07_functional_anatomy",
    "subspecialty_vi": "Giải phẫu chức năng & Đường mổ",
    "subspecialty_en": "Functional Anatomy & Surgical Approaches",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "05_Radial_Shaft_Nonunion_Vascularized_Free_Fibula_Flap.mp4",
    "local_path": "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/05_Radial_Shaft_Nonunion_Vascularized_Free_Fibula_Flap.mp4",
    "videoUrl": "local://07_Giai_Phau_Chuc_Nang_&_Duong_Mo/05_Radial_Shaft_Nonunion_Vascularized_Free_Fibula_Flap.mp4",
    "title_vi": "Vạt xương mác tự do có cuống mạch điều trị khớp giả thân xương quay",
    "title_en": "Radial Shaft Nonunion Treated with Free Vascularized Fibula Flap",
    "duration": "10.7 phút",
    "duration_sec": 642,
    "description_vi": "Phẫu thuật vi phẫu tạo hình khuyết hổng xương quay lớn (> 6cm) do khớp giả nhiễm trùng bằng vạt ghép xương mác tự do nối mạch máu vi phẫu.",
    "description_en": "Microvascular reconstruction of massive (> 6cm) segmental radial shaft defect using a free vascularized fibula flap with microvascular anastomoses.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Xương mác tự do cung cấp nguồn máu nuôi nội tại độc lập, kích thích liền xương mạnh mẽ ngay cả trong môi trường mô sẹo nghèo máu hoặc từng bị nhiễm trùng.",
    "rationale_en": "The vascularized fibula provides intrinsic endosteal/periosteal blood supply, driving osteogenesis even within scarred or previously infected recipient beds.",
    "mechanotherapy_correlation_vi": "Hiện tượng phì đại xương mác ghép (Fibula hypertrophy): Khi cẳng tay bắt đầu chịu tải cơ học tăng dần (Phase 2 & 3), xương mác ghép sẽ tự động dày lên gấp đôi theo định luật Wolff.",
    "mechanotherapy_correlation_en": "Fibula graft hypertrophy: Progressive mechanotherapy loading (Phases 2 & 3) induces adaptive cortical thickening via Wolff's Law, doubling graft caliber.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_07_06",
    "category": "surgical_masterclass",
    "subspecialty_id": "07_functional_anatomy",
    "subspecialty_vi": "Giải phẫu chức năng & Đường mổ",
    "subspecialty_en": "Functional Anatomy & Surgical Approaches",
    "zone": "wrist",
    "phase": "anatomy",
    "filename": "06_Transradial_Amputation_Targeted_Reinnervation_RPNI.mp4",
    "local_path": "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/06_Transradial_Amputation_Targeted_Reinnervation_RPNI.mp4",
    "videoUrl": "local://07_Giai_Phau_Chuc_Nang_&_Duong_Mo/06_Transradial_Amputation_Targeted_Reinnervation_RPNI.mp4",
    "title_vi": "Tái tạo mỏm cụt cẳng tay với TMR và RPNI giảm đau mỏm cụt",
    "title_en": "Transradial Amputation with TMR & RPNI for Phantom Limb & Neuroma Pain",
    "duration": "9.9 phút",
    "duration_sec": 594,
    "description_vi": "Kỹ thuật tiên tiến chuyển thần kinh đích (TMR) và bọc mảnh ghép cơ tái phân nhánh thần kinh (RPNI) điều trị và phòng ngừa đau chi ma sau cắt cụt cẳng tay.",
    "description_en": "Advanced targeted muscle reinnervation (TMR) and regenerative peripheral nerve interfaces (RPNI) preventing phantom limb pain and neuroma formation.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Sợi thần kinh bị cắt đứt nếu không có cơ tiếp nhận sẽ mọc hỗn loạn thành u thần kinh đau (Neuroma). RPNI cung cấp một miếng cơ nhỏ làm đích đến cho thần kinh mọc vào.",
    "rationale_en": "Transected axons devoid of targets form disorganized, painful neuromas. RPNI provides physiological muscle targets, terminating aberrant regenerative pain signals.",
    "mechanotherapy_correlation_vi": "Các tín hiệu điện cơ (EMG) từ mảnh RPNI và TMR tạo nền tảng để điều khiển tay giả sinh học thông minh bằng cơ học trị liệu thần kinh.",
    "mechanotherapy_correlation_en": "EMG signals generated by stable RPNI constructs enable intuitive, high-fidelity neuro-mechanical control of advanced myoelectric prosthetics.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
  {
    "id": "surg_07_07",
    "category": "surgical_masterclass",
    "subspecialty_id": "07_functional_anatomy",
    "subspecialty_vi": "Giải phẫu chức năng & Đường mổ",
    "subspecialty_en": "Functional Anatomy & Surgical Approaches",
    "zone": "achilles",
    "phase": "anatomy",
    "filename": "07_Transtibial_Amputation_AMI_Technique_Colin_Harrington.mp4",
    "local_path": "07_Giai_Phau_Chuc_Nang_&_Duong_Mo/07_Transtibial_Amputation_AMI_Technique_Colin_Harrington.mp4",
    "videoUrl": "local://07_Giai_Phau_Chuc_Nang_&_Duong_Mo/07_Transtibial_Amputation_AMI_Technique_Colin_Harrington.mp4",
    "title_vi": "Kỹ thuật giao diện thần kinh-cơ (AMI) trong cắt cụt cẳng chân",
    "title_en": "Agonist-Antagonist Myoneural Interface (AMI) in Transtibial Amputation (Harrington)",
    "duration": "9.7 phút",
    "duration_sec": 582,
    "description_vi": "Kỹ thuật đột phá AMI của MIT / Harvard tạo cặp cơ đồng vận - đối vận (Tibialis Anterior - Gastrocnemius) liên kết để bảo tồn cảm thụ bản thể (Proprioception).",
    "description_en": "Breakthrough Agonist-Antagonist Myoneural Interface (AMI) preserving reciprocal mechanoreceptor dynamics between TA and gastrocnemius for bionic feedback.",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Đánh giá hình ảnh học & Chỉ định lâm sàng",
        "label_en": "Radiographic Assessment & Clinical Indications"
      },
      {
        "time": "02:45",
        "timeSec": 165,
        "label_vi": "Đường mổ & Bộc lộ mốc giải phẫu an toàn",
        "label_en": "Surgical Approach & Critical Anatomy Exposure"
      },
      {
        "time": "05:30",
        "timeSec": 330,
        "label_vi": "Thực hiện thao tác cốt lõi / Cố định cơ sinh học",
        "label_en": "Core Operative Procedure & Biomechanical Fixation"
      },
      {
        "time": "08:15",
        "timeSec": 495,
        "label_vi": "Đánh giá độ vững, phục hồi bao khớp & Phác đồ hậu phẫu",
        "label_en": "Stability Verification, Closure & Post-Op Protocol"
      }
    ],
    "rationale_vi": "Cắt cụt truyền thống làm mất phản hồi cơ học từ thoi cơ. Nối hai gân cơ đối vận cho phép cơ này co thì cơ kia bị kéo giãn, gửi tín hiệu cảm thụ bản thể về não bộ.",
    "rationale_en": "Conventional amputation severs reciprocal mechanoreceptor loops. The AMI links antagonistic muscles, restoring natural muscle spindle stretch signaling to the CNS.",
    "mechanotherapy_correlation_vi": "Đỉnh cao của Cơ học trị liệu: Cơ thể và máy móc giao tiếp qua lực căng sinh học. Bệnh nhân AMI có thể cảm nhận vị trí bàn chân và độ dốc mặt đất như chân thật.",
    "mechanotherapy_correlation_en": "Pinnacle of Mechanotherapy: Biomechanical tension restores neuro-sensory proprioception, enabling amputees to perceive ankle position and ground slope naturally.",
    "common_errors_vi": [
      "Lỗi 1: Bất động ngón tay và cổ tay thụ động quá lâu gây xơ dính gân và cứng khớp vĩnh viễn.",
      "Lỗi 2: Ép nén kéo căng quá mức lên mô mềm đang trong giai đoạn viêm cấp tính.",
      "Lỗi 3: Bỏ qua các bài tập tái giáo dục thần kinh cơ (TNT) dẫn đến rối loạn dẫn truyền vận động."
    ],
    "common_errors_en": [
      "Fault 1: Prolonged passive immobilization causing dense tendon adhesions and permanent joint ankylosis.",
      "Fault 2: Aggressive passive stretching over-straining acute tissue during active inflammatory phase.",
      "Fault 3: Neglecting Tendon Neuroplastic Training (TNT), leaving aberrant cortical motor patterns unresolved."
    ],
    "regression_vi": "Hạ cấp: Nẹp bảo vệ hạn chế biên độ kết hợp tập gồng tĩnh đẳng cự (Isometric) không di chuyển góc khớp.",
    "regression_en": "Regression: Protected splinting with non-displaceable isometric contractions.",
    "progression_vi": "Nâng cấp: Từng bước nạp tải Heavy Slow Resistance (Phase 2 HSR) và rèn luyện sức mạnh góc tận FRC CARs.",
    "progression_en": "Progression: Transition to progressive HSR tempo loading and FRC end-range articular conditioning."
  },
{
    "id": "postop_ankle_pumps_quad_setting",
    "category": "post_op",
    "phase": "post_op",
    "zone": "knee",
    "title_vi": "Bơm Mắt Cá Chân & Gồng Cơ Tĩnh Tứ Đầu Đùi (Phòng Huyết Khối DVT & Chống Ức Chế Thần Kinh Cơ)",
    "title_en": "Ankle Pumps & Quad Setting Isometrics (DVT Prophylaxis & Arthrogenic Muscle Inhibition Relief)",
    "videoUrl": "https://www.youtube.com/watch?v=XoxeB1-tzwY",
    "duration": "03:45",
    "duration_sec": 225,
    "intensity": "Submaximal Isometric (40-60% MVC)",
    "dosage_vi": "Bơm cổ chân: 20-30 lần/giờ khi thức. Gồng tứ đầu: 3 hiệp x 15 lần (giữ 5-10s mỗi lần)",
    "dosage_en": "Ankle pumps: 20-30 reps/hour awake. Quad sets: 3 sets x 15 reps (5-10s hold each)",
    "tempo": "5s hold - 3s relax",
    "timestamps": [
      {
        "time": "00:15",
        "timeSec": 15,
        "label_vi": "Tư thế kê cao chân & Kỹ thuật bơm mắt cá",
        "label_en": "Leg Elevation Setup & Ankle Pump Technique"
      },
      {
        "time": "01:20",
        "timeSec": 80,
        "label_vi": "Gồng ép khoeo chân xuống đệm kích hoạt VMO",
        "label_en": "Knee Extension Press Down for VMO Activation"
      }
    ],
    "rationale_vi": "Tuần 0-2 sau mổ gãy xương chi dưới hoặc dây chằng, tràn dịch khớp kích hoạt phản xạ ức chế thần kinh cơ (AMI). Gồng tĩnh cơ tứ đầu đùi ép gối xuống giường giúp phục hồi khả năng phát xung thần kinh và ngăn teo cơ không sử dụng. Bơm mắt cá chân co bóp cơ bắp chân, kích hoạt bơm cơ tĩnh mạch (Venous Muscle Pump) chống ứ trệ tuần hoàn và dự phòng huyết khối tĩnh mạch sâu (DVT).",
    "rationale_en": "During weeks 0-2 post-fracture fixation or ligament surgery, joint effusion triggers arthrogenic muscle inhibition (AMI). Submaximal quad sets restore motor cortex efferent drive without shear stress on implants. Active ankle pumps engage the soleus venous pump, drastically reducing venous stasis and preventing deep vein thrombosis (DVT).",
    "common_errors_vi": [
      "Nín thở khi gồng cơ gây tăng áp lực nội lồng ngực (Valsalva)",
      "Dùng cơ mông hoặc cơ gập háng thay thế cơ tứ đầu đùi",
      "Bỏ qua động tác bơm mắt cá trong ngày"
    ],
    "common_errors_en": [
      "Holding breath during isometric contraction (Valsalva phenomenon)",
      "Compensating with hip flexors or glutes instead of vastus medialis",
      "Failing to perform hourly ankle pumps during immobilization"
    ],
    "regression_vi": "Đặt khăn cuộn mỏng dưới khoeo để dễ cảm nhận động tác ấn đè",
    "regression_en": "Place a rolled towel under the popliteal fossa to cue downward pressing",
    "progression_vi": "Thêm động tác gồng cơ tĩnh kết hợp nâng thẳng chân (Straight Leg Raise - SLR)",
    "progression_en": "Progress to active Straight Leg Raise (SLR) with locked knee extension",
    "surgical_correlation_vi": "Áp dụng ngay ngày 1 sau mổ kết hợp xương đùi, cẳng chân, mâm chày, mắt cá, thay khớp gối và tái tạo ACL.",
    "surgical_correlation_en": "Indicated on Post-Op Day 1 for femur/tibia IM nails, tibial plateau plates, ankle ORIF, and ACL reconstruction."
  },
  {
    "id": "postop_pwb_two_crutches_gait",
    "category": "post_op",
    "phase": "post_op",
    "zone": "knee",
    "title_vi": "Tập Tì Đè Tăng Dần Có Kiểm Soát Bằng 2 Nạng (PWB 25% – 50% & Kỹ Thuật Dáng Đi 3 Điểm)",
    "title_en": "Controlled Partial Weight-Bearing (PWB 25-50% & 3-Point Crutch Gait Training)",
    "videoUrl": "https://www.youtube.com/watch?v=ElZkPye4WtA",
    "duration": "05:10",
    "duration_sec": 310,
    "intensity": "25% - 50% Bodyweight Load Cell",
    "dosage_vi": "Tập đi 10-15 phút/buổi, 3-4 buổi/ngày; kiểm soát cân trọng tải trên cân sức khỏe trước khi đi",
    "dosage_en": "10-15 min sessions, 3-4x daily; calibrate load using a bathroom scale before walking",
    "tempo": "Slow rhythmic gait cycle (Heel-to-toe)",
    "timestamps": [
      {
        "time": "00:20",
        "timeSec": 20,
        "label_vi": "Đo chiều cao nạng chuẩn (cách nách 2-3 ngón tay)",
        "label_en": "Crutch Height Adjustment (2-3 fingerbreadths below axilla)"
      },
      {
        "time": "01:45",
        "timeSec": 105,
        "label_vi": "Kỹ thuật tì đè chạm ngón (TDWB) vs Tì một phần (PWB)",
        "label_en": "Touch-Down Weight-Bearing vs Partial Weight-Bearing"
      }
    ],
    "rationale_vi": "Theo Thuyết Biến Dạng Mô Perren và Định luật Wolff, các ổ gãy kết xương vững chắc tương đối (như đinh nội tủy hoặc nẹp bắc cầu) cần vi chuyển động cơ học (micromotion) dọc trục để kích hoạt nguyên bào xương tạo can xương. Đi 2 nạng tì đè tăng dần (PWB) cung cấp áp lực nén sinh lý có kiểm soát mà không gây cong gãy nẹp vít.",
    "rationale_en": "Under Perren's strain theory and Wolff's law, secondary bone healing requires controlled axial micromotion (0.2-1mm). Progressive partial weight-bearing with bilateral axillary or elbow crutches introduces physiological compressive strain stimulating robust bridging callus without exceeding implant yield strength.",
    "common_errors_vi": [
      "Tì toàn bộ trọng lượng cơ thể lên hõm nách gây chèn ép đám rối thần kinh cánh tay",
      "Nhảy lò cò 1 chân khiến khung chậu bị lệch và teo cơ bên mổ",
      "Bỏ nạng quá sớm khi X-quang chưa có cầu can xương vững"
    ],
    "common_errors_en": [
      "Bearing weight directly on axillary pads risking brachial plexus compression palsy",
      "Hopping unilaterally creating pelvic asymmetry and disuse atrophy",
      "Premature crutch weaning before radiographic bridging callus verification"
    ],
    "regression_vi": "Tì chạm ngón thăng bằng (Touch-down weight bearing, < 10% trọng lượng)",
    "regression_en": "Regress to Touch-Down Weight-Bearing (TDWB, < 10% bodyweight)",
    "progression_vi": "Chuyển sang đi 1 nạng bên đối diện khi bác sĩ cho phép tì đè 75%",
    "progression_en": "Advance to single contralateral crutch when cleared for 75% PWB",
    "surgical_correlation_vi": "Đặc biệt quan trọng trong gãy liên mấu chuyển xương đùi mổ DHS/PFNA, gãy thân xương đùi/cẳng chân mổ đinh nội tủy.",
    "surgical_correlation_en": "Critical for intertrochanteric fractures treated with DHS/PFNA, and shaft fractures with intramedullary nails."
  },
  {
    "id": "postop_heel_slides_aarom",
    "category": "post_op",
    "phase": "post_op",
    "zone": "knee",
    "title_vi": "Trượt Gót Chân & Vận Động Khớp Gối Chủ Động Có Trợ Giúp (AAROM Knee Mobilization)",
    "title_en": "Heel Slides & Active-Assisted Knee Range of Motion (AAROM Arthrofibrosis Prevention)",
    "videoUrl": "https://www.youtube.com/watch?v=FfAulipxONA",
    "duration": "04:00",
    "duration_sec": 240,
    "intensity": "Gentle Stretch (VAS <= 3/10)",
    "dosage_vi": "3 hiệp x 10-15 lần trượt, 2-3 lần/ngày, giữ 5 giây ở góc gập tối đa trong ngưỡng cho phép",
    "dosage_en": "3 sets x 10-15 slides, 2-3x daily, 5-second end-range hold within cleared ROM limit",
    "tempo": "3s slide in - 5s hold - 3s return",
    "timestamps": [
      {
        "time": "00:15",
        "timeSec": 15,
        "label_vi": "Dùng khăn hoặc dây đai trợ lực kéo trượt gót",
        "label_en": "Using a Towel or Strap to Assist Heel Slide"
      },
      {
        "time": "01:30",
        "timeSec": 90,
        "label_vi": "Duy trì duỗi thẳng 0° tuyệt đối giữa các lần trượt",
        "label_en": "Ensuring Full Terminal Extension (0°) Between Reps"
      }
    ],
    "rationale_vi": "Bất động khớp gối sau mổ chấn thương nhanh chóng gây kết dính bao hoạt dịch, rút ngắn dây chằng và tăng sinh bao xơ (Arthrofibrosis). Trượt gót chân chủ động có trợ giúp kích thích dịch khớp bôi trơn bề mặt sụn, duy trì chuyển động trượt xoay sinh lý của lồi cầu đùi trên mâm chày mà không gây lực xé (shear force) lên các cấu trúc tái tạo.",
    "rationale_en": "Prolonged postoperative knee immobilization accelerates capsular adhesions and arthrofibrosis. Active-assisted heel slides promote synovial fluid distribution, nourish hyaline cartilage, and restore physiologic roll-and-glide mechanics without harmful shear strain on surgical repairs.",
    "common_errors_vi": [
      "Gập gối thô bạo vượt quá góc bác sĩ mổ cho phép trong 4 tuần đầu",
      "Nhấc đùi lên cao thay vì giữ gót chân trượt sát mặt giường",
      "Quên phục hồi duỗi thẳng hoàn toàn 0°"
    ],
    "common_errors_en": [
      "Aggressively forcing flexion past prescribed ROM constraints during early graft maturation",
      "Lifting thigh off table instead of keeping heel gliding smoothly",
      "Neglecting full terminal knee extension (0°)"
    ],
    "regression_vi": "Tập trượt gót tựa chân lên tường (Wall slides) có trọng lực hỗ trợ gập gối",
    "regression_en": "Regress to gravity-assisted wall heel slides",
    "progression_vi": "Tập ngồi thả chân bờ giường (Seated edge-of-bed knee flexion/extension)",
    "progression_en": "Progress to active seated edge-of-table pendulum swings and eccentric control",
    "surgical_correlation_vi": "Phác đồ chuẩn sau mổ kết hợp xương bánh chè, mâm chày, nẹp đầu dưới xương đùi, và tái tạo dây chằng chéo.",
    "surgical_correlation_en": "Standard protocol following patellar ORIF, tibial plateau plating, distal femur plates, and ligament repairs."
  },
  {
    "id": "postop_tibial_plateau_plate_lcp",
    "category": "post_op",
    "phase": "post_op",
    "zone": "knee",
    "title_vi": "Phục Hồi Sau Mổ Nẹp Khóa Gãy Mâm Chày (Bảo Vệ Mặt Sụn Khớp & Vận Động Không Tì Đè 6 Tuần)",
    "title_en": "Post-Op Tibial Plateau Locking Plate Rehabilitation (Articular Protection & 6-Week NWB Protocol)",
    "videoUrl": "https://www.youtube.com/watch?v=IdymlDpgzuk",
    "duration": "06:20",
    "duration_sec": 380,
    "intensity": "Non-Weight Bearing (NWB)",
    "dosage_vi": "Tuần 0-6: NWB nghiêm ngặt khi đứng đi lại. Tập ROM gối trên máy CPM hoặc chủ động có trợ giúp 0-90°",
    "dosage_en": "Weeks 0-6: Strict NWB during ambulation. Active-assisted knee ROM 0-90° or CPM machine",
    "tempo": "Controlled smooth cadence",
    "timestamps": [
      {
        "time": "00:25",
        "timeSec": 25,
        "label_vi": "Giải thích cơ chế bảo vệ mặt khớp mâm chày không bị lún",
        "label_en": "Mechanism of Articular Surface Protection Against Subsidence"
      },
      {
        "time": "02:10",
        "timeSec": 130,
        "label_vi": "Bài tập co cơ cẳng chân & di động xương bánh chè",
        "label_en": "Open Chain Ankle & Patellar Mobilization Exercises"
      }
    ],
    "rationale_vi": "Gãy mâm chày là gãy nội khớp (Schatzker I-VI). Mặc dù nẹp vít khóa cung cấp độ vững cấu trúc tốt, xương xốp dưới sụn cần tối thiểu 6-8 tuần để tích hợp và can hóa. Tì đè sớm trước thời gian này sẽ gây lún mặt khớp thứ phát, lệch trục chi và dẫn tới thoái hóa khớp sớm nghiêm trọng. Do đó cần tuân thủ nghiêm ngặt NWB kèm tập ROM sớm không tải.",
    "rationale_en": "Tibial plateau fractures involve articular surface reconstruction (Schatzker classification). While locking plates provide angular stability, cancellous subchondral bone consolidation requires 6-8 weeks. Early premature axial loading causes subchondral collapse, step-off deformity, and secondary osteoarthritis. Strict NWB coupled with early unloaded AAROM is paramount.",
    "common_errors_vi": [
      "Tì chân xuống đất sớm do cảm thấy ít đau sau mổ",
      "Bất động cứng gối trong nẹp suốt 6 tuần làm cứng khớp vĩnh viễn",
      "Không chụp kiểm tra X-quang đối soát ở tuần thứ 6"
    ],
    "common_errors_en": [
      "Premature weight-bearing due to post-surgical analgesia",
      "Immobilizing the knee rigidly for 6 weeks inducing irreversible arthrofibrosis",
      "Skipping the Week 6 radiographic verification X-ray before starting PWB"
    ],
    "regression_vi": "Dùng máy thụ động CPM (Continuous Passive Motion) nếu đau nhiều",
    "regression_en": "Utilize CPM device under physical therapist supervision if pain inhibits active movement",
    "progression_vi": "Tuần 6-8: Khởi đầu tì chạm chân (TDWB) sau khi X-quang xác nhận mặt khớp phẳng vững",
    "progression_en": "Weeks 6-8: Transition to PWB (25%) once radiographic evaluation confirms stable joint line",
    "surgical_correlation_vi": "Gãy mâm chày trong, mâm chày ngoài và gãy hai mâm chày (Schatzker type II, IV, V, VI) kết hợp nẹp khóa và ghép xương xốp.",
    "surgical_correlation_en": "Indicated for Schatzker Type II-VI fractures reconstructed with LCP plates and subchondral bone grafting."
  },
  {
    "id": "postop_im_nail_femur_tibia_rehab",
    "category": "post_op",
    "phase": "post_op",
    "zone": "knee",
    "title_vi": "Phục Hồi Sau Mổ Đinh Nội Tủy Có Chốt Xương Đùi & Cẳng Chân (Tì Đè Dọc Trục Kích Hoạt Can Xương)",
    "title_en": "Intramedullary Nail (IMN) Femur & Tibia Rehabilitation (Axial Loading for Callus Stimulation)",
    "videoUrl": "https://www.youtube.com/watch?v=h9QT4E3Fl-c",
    "duration": "05:40",
    "duration_sec": 340,
    "intensity": "Progressive Axial Loading (PWB to FWB)",
    "dosage_vi": "Tuần 2-4: Tì 25-50% PWB. Tuần 6-8: Tiến tới FWB khi có cầu can xương X-quang",
    "dosage_en": "Weeks 2-4: 25-50% PWB. Weeks 6-8: Progress to FWB as bridging callus appears on AP/lateral X-rays",
    "tempo": "Controlled gait cadence",
    "timestamps": [
      {
        "time": "00:20",
        "timeSec": 20,
        "label_vi": "Đặc tính chia sẻ tải trọng (Load-sharing) của đinh nội tủy",
        "label_en": "Load-Sharing Biomechanics of Intramedullary Nails"
      },
      {
        "time": "02:00",
        "timeSec": 120,
        "label_vi": "Bài tập đứng dồn trọng lượng qua lại giữa 2 chân",
        "label_en": "Weight-Shifting Balance Exercises in Parallel Bars"
      }
    ],
    "rationale_vi": "Đinh nội tủy có chốt là thiết bị chia sẻ tải trọng (Load-sharing device) đặt ngay trong trục cơ học của xương dài. Khác với nẹp vít (Load-bearing), đinh nội tủy chuyển trực tiếp lực ép dọc trục qua ổ gãy, kích thích sự hình thành can xương thứ cấp ngoài màng xương nhanh chóng và giảm nguy cơ gãy dụng cụ.",
    "rationale_en": "Interlocking intramedullary nails act as load-sharing implants positioned along the anatomical axis. Unlike load-bearing plates, IM nails permit controlled axial compression across the fracture site, accelerating secondary periosteal bridging callus according to Wolff's law while minimizing fatigue failure.",
    "common_errors_vi": [
      "Xoay vặn chi quá mức khi xương chưa có can liên kết",
      "Sợ hãi không dám tì đè khiến xương bị chậm liền (Delayed union)",
      "Tập nâng chân nghiêng (Abduction) quá mạnh khi gãy cổ/thân xương đùi"
    ],
    "common_errors_en": [
      "Excessive rotational/torsional torque prior to cortical bridging",
      "Kinesiophobia and prolonged zero-loading leading to delayed union",
      "Vigorous open-chain hip abduction against gravity with proximal femoral implants"
    ],
    "regression_vi": "Đứng tập dồn trọng lực trong thanh song song hoặc bám mép bàn vững",
    "regression_en": "Perform weight-shifting drills inside parallel bars or holding sturdy countertop",
    "progression_vi": "Bài tập đạp xe tại chỗ (Stationary cycling) và bước lên bục thấp (Step-ups)",
    "progression_en": "Advance to stationary cycling and low step-up eccentric descent drills",
    "surgical_correlation_vi": "Gãy thân xương đùi, gãy dưới mấu chuyển, gãy thân xương chày kết hợp đinh nội tủy chốt ngang có doa hoặc không doa ống tủy.",
    "surgical_correlation_en": "Indicated for femoral shaft, subtrochanteric, and tibial diaphyseal fractures treated with reamed/unreamed IM nails."
  },
  {
    "id": "postop_patella_tension_band_wiring",
    "category": "post_op",
    "phase": "post_op",
    "zone": "knee",
    "title_vi": "Phục Hồi Sau Mổ Néo Ép Số 8 Gãy Xương Bánh Chè (Bảo Vệ Cơ Chế Duỗi Gối & Phục Hồi ROM)",
    "title_en": "Patellar Fracture Tension Band Wiring Rehabilitation (Extensor Mechanism Protection & ROM Progression)",
    "videoUrl": "https://www.youtube.com/watch?v=8zXfCHPMN4w",
    "duration": "04:50",
    "duration_sec": 290,
    "intensity": "Locked Extension in Ambulation / Passive Flexion",
    "dosage_vi": "Khoá nẹp 0° khi đi lại. Tuần 0-2: ROM 0-30°. Tuần 2-4: 0-60°. Tuần 4-6: 0-90°. Tuần 6+: Vượt 90°",
    "dosage_en": "Brace locked at 0° for ambulation. Weeks 0-2: ROM 0-30°. Weeks 2-4: 0-60°. Weeks 4-6: 0-90°. Week 6+: >90°",
    "tempo": "Slow controlled flexion",
    "timestamps": [
      {
        "time": "00:15",
        "timeSec": 15,
        "label_vi": "Nguyên lý biến lực căng bề mặt thành lực nén ổ gãy của néo ép",
        "label_en": "Tension Band Principle: Converting Tensile Strain into Interfragmentary Compression"
      },
      {
        "time": "01:40",
        "timeSec": 100,
        "label_vi": "Kỹ thuật di động xương bánh chè 4 hướng chống dính",
        "label_en": "Superior/Inferior/Medial/Lateral Patellar Glides"
      }
    ],
    "rationale_vi": "Nguyên lý néo ép số 8 (Tension Band Wiring) chuyển đổi lực kéo căng cực đại của cơ tứ đầu đùi khi gập gối thành lực nén ép động ép chặt các diện gãy bánh chè. Tuy nhiên, gập gối quá 90° trong 4 tuần đầu có thể làm căng đứt chỉ thép hoặc bật đinh Kirschner. Bắt buộc phải khóa nẹp thẳng gối 0° khi tì đè đi lại để bảo vệ tuyệt đối hệ thống duỗi gối.",
    "rationale_en": "Tension band wiring converts anterior distraction forces from the quadriceps into dynamic compressive forces across the articular surface during flexion. However, flexion beyond 90° in the first 4 weeks risks Kirschner wire migration or wire breakage. Walking requires a hinged brace locked at 0° extension to shield the extensor mechanism.",
    "common_errors_vi": [
      "Đi lại không khóa nẹp gối thẳng làm co kéo bật đinh Kirschner",
      "Không tập di động xương bánh chè dẫn tới xơ dính bánh chè - lồi cầu đùi",
      "Tập đá tạ tạ tự do chuỗi động mở quá sớm"
    ],
    "common_errors_en": [
      "Ambulating with an unlocked knee brace triggering K-wire displacement",
      "Neglecting patellofemoral joint mobilizations causing patellar baja or stiffness",
      "Initiating heavy open-chain leg extensions prematurely"
    ],
    "regression_vi": "Di động thụ động xương bánh chè trong tư thế gối duỗi thẳng hoàn toàn",
    "regression_en": "Perform superior-inferior patellar mobilizations with relaxed quadriceps in full extension",
    "progression_vi": "Từ tuần 6: Bắt đầu bài tập co cơ chuỗi động đóng (Leg press góc hẹp 0-45°)",
    "progression_en": "From Week 6: Begin closed kinetic chain leg press in 0-45° range",
    "surgical_correlation_vi": "Gãy ngang xương bánh chè, gãy cực dưới bánh chè kết hợp 2 đinh Kirschner và chỉ thép néo ép số 8.",
    "surgical_correlation_en": "Transverse patellar fractures and inferior pole avulsions repaired via AO tension band technique."
  },
  {
    "id": "postop_acl_meniscus_repair_protocol",
    "category": "post_op",
    "phase": "post_op",
    "zone": "knee",
    "title_vi": "Phục Hồi Sau Mổ Tái Tạo Dây Chằng Chéo Trước (ACL) & Khâu Bảo Tồn Sụn Chêm",
    "title_en": "ACL Reconstruction with Meniscal Repair Rehabilitation (Graft Ligamentization & Suture Protection)",
    "videoUrl": "https://www.youtube.com/watch?v=Czx6LUnG1cs",
    "duration": "07:15",
    "duration_sec": 435,
    "intensity": "Graft-Safe Biomechanics",
    "dosage_vi": "Duỗi thẳng 0° ngay ngày 1. Giới hạn gập gối <= 90° trong 4-6 tuần đầu để bảo vệ đường khâu sụn chêm",
    "dosage_en": "Full extension (0°) Day 1. Restrict flexion to <= 90° for first 4-6 weeks to safeguard meniscal sutures",
    "tempo": "Strict isometric to controlled concentric",
    "timestamps": [
      {
        "time": "00:30",
        "timeSec": 30,
        "label_vi": "Tầm quan trọng của lấy lại duỗi gối 0° tuyệt đối ngay tuần 1",
        "label_en": "Importance of Achieving Immediate Full Extension (0°) in Week 1"
      },
      {
        "time": "02:15",
        "timeSec": 135,
        "label_vi": "Tư thế cấm gập sâu quá 90° khi có khâu sụn chêm sừng sau",
        "label_en": "Biomechanics of Posterior Horn Meniscal Suture Protection (<90° Flexion)"
      }
    ],
    "rationale_vi": "Mảnh ghép ACL trải qua giai đoạn chuyển hóa dây chằng (Ligamentization) yếu nhất vào tuần 6-12 sau mổ. Nếu kèm khâu sụn chêm (đặc biệt sừng sau), gập gối sâu >90° tạo áp lực nén và trượt cực lớn làm rách bục đường chỉ khâu sụn chêm. Phục hồi cần cân bằng: lấy lại duỗi thẳng 0° tức thì chống dính khớp, nhưng giới hạn gập sâu <90° và hoãn tì đè sâu trong 4-6 tuần đầu.",
    "rationale_en": "The ACL graft undergoes a vulnerable ligamentization and revascularization phase between Weeks 6-12. Concurrent meniscal repair (especially posterior horn) is subject to high hoop stresses and compressive shear beyond 90° of flexion. Rehab must secure full 0° terminal extension while strictly capping flexion at 90° during early meniscal fibrocartilage healing.",
    "common_errors_vi": [
      "Kê gối dưới khoeo chân khi nằm ngủ làm mất duỗi thẳng 0° vĩnh viễn (Cyclops lesion)",
      "Tập đá chân chuỗi mở (Open chain leg extension) 45-0° làm căng đứt mảnh ghép",
      "Ngồi xổm hoặc nhảy tiếp đất quá sớm trước 6 tháng"
    ],
    "common_errors_en": [
      "Placing pillows beneath the knee in bed creating irreversible flexion contracture",
      "Aggressive open kinetic chain terminal extensions (45-0°) placing peak anterior shear on graft",
      "Deep squatting or jumping prior to 6-month biological graft maturity"
    ],
    "regression_vi": "Nằm sấp thõng gối cuối giường (Prone knee hang) để trọng lực kéo duỗi thẳng 0°",
    "regression_en": "Perform prone knee hangs off bed edge to achieve passive terminal extension",
    "progression_vi": "Tháng thứ 3-4: Bắt đầu chạy thẳng trục trên máy chạy, tập thăng bằng Y-Balance",
    "progression_en": "Months 3-4: Progress to straight-line treadmill jogging and Y-Balance dynamic stability drills",
    "surgical_correlation_vi": "Nội soi tái tạo ACL bằng gân hamstring hoặc gân bánh chè BTB, kèm khâu sụn chêm kỹ thuật All-Inside / Inside-Out.",
    "surgical_correlation_en": "Arthroscopic ACL reconstruction (Hamstring/BTB autograft) combined with All-Inside/Inside-Out meniscal repairs."
  },
  {
    "id": "postop_rotator_cuff_codman_pendulum",
    "category": "post_op",
    "phase": "post_op",
    "zone": "shoulder",
    "title_vi": "Bài Tập Con Lắc Codman & Vận Động Thụ Động Sau Mổ Khâu Chóp Xoay Khớp Vai (Bảo Vệ Chỉ Neo Gân)",
    "title_en": "Codman Pendulum & Passive Range of Motion (PROM) Post Rotator Cuff Repair (Suture Anchor Protection)",
    "videoUrl": "https://www.youtube.com/watch?v=QF_ubbr_RUE",
    "duration": "04:30",
    "duration_sec": 270,
    "intensity": "100% Passive (Không dùng cơ vai chủ động)",
    "dosage_vi": "Tuần 0-6: Đeo đai túi có gối dạng vai 24/24. Con lắc Codman: 3 hiệp x 20 vòng nhẹ nhàng, 3 lần/ngày",
    "dosage_en": "Weeks 0-6: Abduction sling worn 24/7. Codman pendulums: 3 sets x 20 gentle circles, 3x daily",
    "tempo": "Passive momentum driven by trunk sway",
    "timestamps": [
      {
        "time": "00:20",
        "timeSec": 20,
        "label_vi": "Đung đưa thân mình để tạo chuyển động con lắc vai (không co cơ vai)",
        "label_en": "Using Torso Sway to Drive Passive Arm Oscillation (Zero Deltoid/Cuff Fire)"
      },
      {
        "time": "01:50",
        "timeSec": 110,
        "label_vi": "Vận động chủ động bàn tay, cổ tay và cẳng tay chống phù nề",
        "label_en": "Active Distal Hand, Wrist, and Forearm Pumping"
      }
    ],
    "rationale_vi": "Gân trên gai (Supraspinatus) được khâu đính lại vào mấu động lớn xương cánh tay bằng các vít neo sinh học. Trong 6 tuần đầu, điểm bám chỉ được giữ bằng lực cơ học của sợi chỉ (chưa có tích hợp mô sợi - xương). Nghiêm cấm tự nâng tay chủ động vì lực co cơ deltoid và chóp xoay sẽ làm tuột chỉ neo ngay lập tức. Bài tập con lắc Codman lợi dụng quán tính chuyển động thân mình giúp bôi trơn ổ chảo - cánh tay hoàn toàn thụ động.",
    "rationale_en": "The repaired rotator cuff tendon (supraspinatus) relies strictly on suture anchor purchase for the first 6 weeks prior to enthesis fibrocartilage integration. Active arm elevation produces destructive contractile tension pulling anchors out of the greater tuberosity. Codman pendulums utilize trunk momentum to passively oscillate the humerus, maintaining capsular compliance without activating the rotator cuff.",
    "common_errors_vi": [
      "Tự gồng cơ vai để quay cánh tay thay vì đung đưa toàn thân",
      "Tháo đai treo dạng vai nằm ngủ làm gân bị ép thiếu máu cục bộ",
      "Nâng vật nặng hoặc chống tay xuống giường quá sớm"
    ],
    "common_errors_en": [
      "Actively firing shoulder muscles to move arm instead of relying on torso sway",
      "Removing abduction pillow sling during sleep creating hypoperfusion and tension",
      "Weight-bearing through arm or pushing up from chair prematurely"
    ],
    "regression_vi": "Tựa trán và tay lành lên bàn, thả lỏng hoàn toàn cánh tay bên mổ như con lắc đồng hồ",
    "regression_en": "Support torso on sturdy table with good arm, letting operative arm hang dead weight",
    "progression_vi": "Tuần 6+: Bắt đầu vận động chủ động có trợ giúp (AAROM bằng gậy hoặc dây ròng rọc)",
    "progression_en": "Week 6+: Initiate Active-Assisted ROM with pulley or wand under clinical supervision",
    "surgical_correlation_vi": "Nội soi khâu rách chóp xoay vai (Rotator Cuff Repair - Single/Double Row Suture Bridge) và nẹp xương đòn.",
    "surgical_correlation_en": "Indicated for arthroscopic rotator cuff repairs (Single/Double Row Suture Bridge) and clavicle plating."
  }
];

if (typeof window !== 'undefined') {
  window.VIDEO_LIBRARY_CATALOG = VIDEO_LIBRARY_CATALOG;
}

// Harmonize Exercise-to-Video IDs across EXERCISE_DATA and VIDEO_LIBRARY_CATALOG
const EXERCISE_TO_CATALOG_ID_MAP = {
  shoulder_p1_ex1: 'ex_shoulder_p1_01',
  shoulder_p1_ex2: 'ex_shoulder_p1_02',
  shoulder_p2_ex1: 'ex_shoulder_p2_01',
  shoulder_p2_ex2: 'ex_shoulder_p2_02',
  shoulder_p3_ex1: 'ex_shoulder_p3_01',
  shoulder_p3_ex2: 'ex_shoulder_p3_02',
  core_p1_ex1: 'ex_core_p1_01',
  core_p1_ex2: 'ex_core_p1_02',
  core_p2_ex1: 'ex_core_p2_01',
  core_p2_ex2: 'ex_core_p2_02',
  core_p3_ex1: 'ex_core_p3_01',
  core_p3_ex2: 'ex_core_p3_02',
  elbow_p1_ex1: 'ex_elbow_p1_01',
  elbow_p1_ex2: 'ex_elbow_p1_02',
  elbow_p2_ex1: 'ex_elbow_p2_01',
  elbow_p2_ex2: 'ex_elbow_p2_02',
  elbow_p3_ex1: 'ex_elbow_p3_01',
  elbow_p3_ex2: 'ex_elbow_p3_02',
  lower_back_p1_ex1: 'ex_lower_back_p1_01',
  lower_back_p1_ex2: 'ex_lower_back_p1_02',
  lower_back_p2_ex1: 'ex_lower_back_p2_01',
  lower_back_p2_ex2: 'ex_lower_back_p2_02',
  lower_back_p2_ex3: 'ex_lower_back_p2_02',
  lower_back_p3_ex1: 'ex_lower_back_p3_01',
  lower_back_p3_ex2: 'ex_lower_back_p3_02',
  wrist_p1_ex1: 'ex_wrist_p1_01',
  wrist_p1_ex2: 'ex_wrist_p1_02',
  wrist_p1_ex3: 'ex_wrist_p1_02',
  wrist_p2_ex1: 'ex_wrist_p2_01',
  wrist_p2_ex2: 'ex_wrist_p2_02',
  wrist_p3_ex1: 'ex_wrist_p3_01',
  wrist_p3_ex2: 'ex_wrist_p3_02',
  hip_p1_ex1: 'ex_hip_p1_01',
  hip_p1_ex2: 'ex_hip_p1_02',
  hip_p2_ex1: 'ex_hip_p2_01',
  hip_p2_ex2: 'ex_hip_p2_02',
  hip_p3_ex1: 'ex_hip_p3_01',
  hip_p3_ex2: 'ex_hip_p3_02',
  knee_p1_ex1: 'ex_knee_p1_01',
  knee_p1_ex2: 'ex_knee_p1_02',
  knee_p2_ex1: 'ex_knee_p2_01',
  knee_p2_ex2: 'ex_knee_p2_02',
  knee_p2_ex3: 'ex_knee_p2_01',
  knee_p2_ex4: 'ex_knee_p2_02',
  knee_p3_ex1: 'ex_knee_p3_01',
  knee_p3_ex2: 'ex_knee_p3_02',
  foot_p1_ex1: 'ex_achilles_p1_01',
  foot_p1_ex2: 'ex_achilles_p1_02',
  foot_p2_ex1: 'ex_achilles_p2_01',
  foot_p2_ex2: 'ex_achilles_p2_02',
  foot_p3_ex1: 'ex_achilles_p3_01',
  foot_p3_ex2: 'ex_achilles_p3_02'
};

// Bidirectional catalog mapping function
function resolveVideoId(id) {
  if (!id || typeof id !== 'string') return '';
  const cleanId = id.trim();
  if (VIDEO_LIBRARY_CATALOG.some(v => v.id === cleanId)) return cleanId;
  if (EXERCISE_TO_CATALOG_ID_MAP[cleanId]) return EXERCISE_TO_CATALOG_ID_MAP[cleanId];
  if (VIDEO_LIBRARY_CATALOG.some(v => v.id === 'ex_' + cleanId)) return 'ex_' + cleanId;
  let converted = cleanId;
  if (converted.startsWith('foot_')) converted = converted.replace(/^foot_/, 'achilles_');
  if (!converted.startsWith('ex_')) {
    converted = 'ex_' + converted.replace(/_ex(\d+)$/, (_, n) => (n.length === 1 ? '_0' + n : '_' + n));
  }
  if (VIDEO_LIBRARY_CATALOG.some(v => v.id === converted)) return converted;
  return cleanId;
}

// Populate catalogId on every exercise and aliases in catalog
for (let i = 1; i <= 8; i++) {
  const spot = EXERCISE_DATA['spot' + i];
  if (spot) {
    for (const p of ['p1', 'p2', 'p3']) {
      if (Array.isArray(spot[p])) {
        spot[p].forEach(ex => {
          if (ex && ex.id) {
            const catId = EXERCISE_TO_CATALOG_ID_MAP[ex.id] || resolveVideoId(ex.id);
            ex.catalogId = catId;
            const targetVid = VIDEO_LIBRARY_CATALOG.find(v => v.id === catId);
            if (targetVid) {
              if (!targetVid.aliases) targetVid.aliases = [];
              if (!targetVid.aliases.includes(ex.id)) targetVid.aliases.push(ex.id);
            }
          }
        });
      }
    }
  }
}

const CALCULATOR_ENGINE = {
  ZONE_MAP: Object.assign(Object.create(null), {
    spot1: 'shoulder', shoulder: 'shoulder', rotator_cuff: 'shoulder', vai: 'shoulder',
    spot2: 'core', core: 'core', general_strength: 'core', spine: 'core', abs: 'core', bung: 'core',
    spot3: 'elbow', elbow: 'elbow', tennis_elbow: 'elbow', khuyu: 'elbow',
    spot4: 'lower_back', lower_back: 'lower_back', lumbar: 'lower_back', lung: 'lower_back', cot_song: 'lower_back',
    spot5: 'wrist', wrist: 'wrist', hand: 'wrist', co_tay: 'wrist',
    spot6: 'hip', hip: 'hip', pelvis: 'hip', hong: 'hip', groin: 'hip',
    spot7: 'knee', knee: 'knee', patellar: 'knee', goi: 'knee',
    spot8: 'foot', foot: 'foot', ankle: 'foot', achilles: 'foot', foot_achilles: 'foot', co_chan: 'foot'
  }),

  MORNING_TESTS: {
    shoulder: {
      nameVi: "Nghiệm pháp Gồng xoay ngoài áp tường 30° Scaption",
      nameEn: "Single-Arm Wall External Rotation Hold in 30° Scaption",
      instructionVi: "Đứng cạnh tường, khuỷu tay gập 90° kẹp khăn mỏng sát sườn, gồng nhẹ xoay ngoài ép vào tường 10 giây. Đánh giá mức đau (VAS).",
      instructionEn: "Stand adjacent to a wall, elbow flexed to 90° with towel roll at ribcage, press outward into wall for 10s. Rate VAS pain."
    },
    core: {
      nameVi: "Nghiệm pháp Gồng gập bụng McGill 8 giây",
      nameEn: "McGill Modified Curl-Up 8-Second Hold",
      instructionVi: "Nằm ngửa, một gối co một gối duỗi, hai tay luồn dưới thắt lưng, nhấc nhẹ đầu và vai 2cm khỏi sàn giữ 8 giây. Đánh giá đau lưng.",
      instructionEn: "Supine with one knee bent, hands supporting lumbar lordosis, hover head/shoulders 2cm off floor for 8s. Rate back pain."
    },
    elbow: {
      nameVi: "Nghiệm pháp Gồng duỗi cổ tay có đỡ 30 giây",
      nameEn: "Supported Wrist Extension 30s Hold with Light Weight",
      instructionVi: "Đặt cẳng tay lên bàn, cổ tay hơi ngửa 20-30°, cầm tạ nhẹ 1-2kg giữ tĩnh 30 giây. Đánh giá đau mỏm lồi cầu.",
      instructionEn: "Rest forearm on table, wrist in 20-30° extension holding 1-2kg dumbbell for 30s. Rate epicondylar pain."
    },
    lower_back: {
      nameVi: "Nghiệm pháp Cầu mông trục thẳng 30 giây",
      nameEn: "Neutral Spine Glute Bridge 30s Hold",
      instructionVi: "Nằm ngửa nâng mông tạo đường thẳng từ gối qua háng đến vai, giữ vững 30 giây mà không võng thắt lưng. Đánh giá đau thắt lưng.",
      instructionEn: "Supine, lift pelvis into straight alignment between knees, hips, and shoulders for 30s without lumbar sagging. Rate back pain."
    },
    wrist: {
      nameVi: "Nghiệm pháp Nghiêng quay cổ tay giữ tĩnh 30 giây",
      nameEn: "Supported Radial Deviation 30s Lever Hold",
      instructionVi: "Cẳng tay đặt trên bàn, cầm thanh đòn hoặc tạ tay nghiêng ngón cái lên trên giữ 30 giây. Đánh giá đau bao gân ngón cái.",
      instructionEn: "Forearm supported on table, hold light dumbbell or lever tilting thumb upward for 30s. Rate radial styloid pain."
    },
    hip: {
      nameVi: "Nghiệm pháp Đứng một chân giữ thăng bằng chậu 30 giây (Trendelenburg)",
      nameEn: "Single-Leg Stance 30s Hold (Trendelenburg Stability)",
      instructionVi: "Đứng một chân bên đau, giữ khung chậu thăng bằng nằm ngang không nghiêng sụp trong 30 giây. Đánh giá đau mấu chuyển lớn.",
      instructionEn: "Stand on affected leg, maintain level horizontal pelvis without sagging for 30s. Rate trochanteric pain."
    },
    knee: {
      nameVi: "Nghiệm pháp Squat một chân trên dốc 60° (Single-Leg Decline Squat)",
      nameEn: "Single-Leg Decline Squat to 60° Knee Flexion",
      instructionVi: "Đứng trên ván nghiêng 25° (gót chân nâng cao), từ từ hạ gối một chân bên đau đến 60° rồi đứng lên. Đánh giá mức đau gân bánh chè.",
      instructionEn: "Stand on 25° decline board (heel elevated), perform single-leg squat to 60° knee flexion. Rate patellar pain score."
    },
    foot: {
      nameVi: "Nghiệm pháp Nhón gót một chân hết biên độ trên sàn phẳng",
      nameEn: "Single-Leg Heel Raise to Full Height on Flat Floor",
      instructionVi: "Đứng trên mặt sàn phẳng, nhón hết biên độ gót chân bên đau giữ 5 giây rồi hạ xuống chậm. Đánh giá đau gân gót.",
      instructionEn: "On flat ground, perform maximum single-leg heel raise, hold peak 5s, lower slowly. Rate Achilles pain."
    }
  },

  GATEKEEPERS: {
    p1: {
      gateNameVi: "Cổng Tiến Triển Giai Đoạn 1 -> 2 (Chuyển sang Kháng Lực Nặng Chậm HSR)",
      gateNameEn: "Progression Gate Phase 1 -> 2 (Advance to Heavy Slow Resistance)",
      criteriaVi: [
        "Thời gian cứng gân vào buổi sáng giảm xuống < 10-15 phút trong 5 ngày liên tiếp.",
        "Mức đau trong khi gồng tĩnh 45 giây (tải 70% MVC) ổn định ở mức VAS <= 2/10.",
        "Phản ứng đau sau 24 giờ hoàn toàn hồi phục về mức nền sau mỗi buổi nạp tải.",
        "Không có dấu hiệu sưng nóng đỏ hoặc tràn dịch khớp cục bộ."
      ],
      criteriaEn: [
        "Morning stiffness < 10 min for 5 consecutive days + 45s isometric hold pain <= 2/10.",
        "Pain during 45s isometric hold (70% MVC) settles to VAS <= 2/10.",
        "24-hour post-load pain settles completely to baseline after sessions.",
        "No signs of localized erythema, heat flare, or joint effusion."
      ]
    },
    p2: {
      gateNameVi: "Cổng Tiến Triển Giai Đoạn 2 -> 3 (Chuyển sang Lò Xo Đàn Hồi SSC & Góc Tận ATG/FRC)",
      gateNameEn: "Progression Gate Phase 2 -> 3 (Advance to SSC Elastic Recoil & End-Range)",
      criteriaVi: [
        "Đã hoàn thành tối thiểu 4 tuần nạp tải HSR liên tục (nhịp 3-1-3) không bùng phát đau.",
        "Sức mạnh cơ đạt tỷ số đối xứng chi (Limb Symmetry Index - LSI) >= 80-85% so với bên lành.",
        "Đau trong bài HSR nặng (8-10 RM) không vượt quá VAS 3/10 và hết sạch sau 24 giờ.",
        "Kiểm tra biên độ chủ động không bị kẹt cứng cơ học."
      ],
      criteriaEn: [
        "4 consecutive weeks HSR without post-load pain flare + Limb Symmetry Index >= 85%.",
        "Completed a minimum of 4 consecutive weeks of HSR (3-1-3 tempo) with no flares.",
        "Pain during heavy HSR (8-10 RM) remains <= VAS 3/10 and fully settles within 24h.",
        "Active joint range of motion free of mechanical impingement."
      ]
    },
    p3: {
      gateNameVi: "Tiêu Chí Tái Hòa Nhập Thể Thao Đỉnh Cao & Bảo Trì Trọn Đời",
      gateNameEn: "Return-to-Sport & Lifelong Articular Resilience Gate",
      criteriaVi: [
        "Khả năng hấp thu xung lực bật nhảy một chân (Single-leg hop test) đạt LSI >= 90%.",
        "Kiểm soát góc cực hạn (ATG Split Squat / FRC PAILs/RAILs) vững vàng, không sợ hãi.",
        "Duy trì tối thiểu 1 buổi nạp tải gân (Isometric hoặc HSR) mỗi tuần như liều vắc-xin bảo vệ gân vĩnh viễn."
      ],
      criteriaEn: [
        "Sport-specific multi-directional deceleration tolerance.",
        "Single-leg hop test for distance / reactive strength index LSI >= 90%.",
        "Full confidence and control at extreme end-ranges (ATG / FRC) without apprehension.",
        "Maintain at least 1 tendon loading session/week (Isometric or HSR) as a lifelong vaccine against tendinopathy."
      ]
    }
  },

  STAGE_DEFINITIONS: {
    reactive: {
      key: "reactive",
      titleVi: "Viêm Gân Phản Ứng Cấp Tính (Reactive Tendinopathy)",
      titleEn: "Reactive Tendinopathy (Acute Overload)",
      descVi: "Phản ứng tăng sinh không viêm cấp tính của tế bào gân (Tenocytes) khi gặp phải đột biến tải trọng cơ học. Tế bào tăng tiết aggrecan ngậm nước làm dày gân cục bộ nhưng các bó sợi collagen vẫn nguyên vẹn.",
      descEn: "Non-inflammatory acute proliferative tenocyte response to a sudden tensile or compressive load spike. Tendon swells via bound water and aggrecan, but collagen fascicles remain largely intact.",
      mechanismVi: "Tăng sinh tế bào gân cục bộ, ngậm nước proteoglycan, ức chế vận động vỏ não (Cortical Inhibition).",
      mechanismEn: "Cellular tenocyte proliferation, proteoglycan hydration, elevated corticospinal inhibition.",
      startingPhase: "p1"
    },
    dysrepair: {
      key: "dysrepair",
      titleVi: "Gân Suy Thoái Cấu Trúc (Tendon Dysrepair)",
      titleEn: "Tendon Dysrepair (Failed Healing)",
      descVi: "Giai đoạn suy thoái cấu trúc do tiếp tục nạp tải quá mức mà không có thời gian nghỉ hồi phục. Chất nền ngoại bào phân tách các bó sợi collagen, tế bào gân bị tròn hóa dạng sụn và xuất hiện tân mạch bệnh lý.",
      descEn: "Matrix failure and failed tendon healing from persistent chronic overload without adequate recovery. Collagen fascicles separate, tenocytes undergo chondroid metaplasia, and pathological neovascularization initiates.",
      mechanismVi: "Phân tách bó sợi collagen, tăng sinh tân mạch bệnh lý, chất nền ngoại bào mất tổ chức.",
      mechanismEn: "Collagen fascicle separation, abnormal micro-vessel proliferation, extracellular matrix disorganization.",
      startingPhase: "p2"
    },
    degenerative: {
      key: "degenerative",
      titleVi: "Thoái Hóa Gân Mãn Tính (Degenerative Tendinopathy)",
      titleEn: "Degenerative Tendinopathy (Chronic Remodeling)",
      descVi: "Giai đoạn thoái hóa tiến triển với các vùng tế bào chết vô mạch (acellular necrosis) xen kẽ các vùng collagen đứt đoạn. Áp dụng nguyên lý 'Treat the Donut, Not the Hole' của GS. Jill Cook: tập trung nạp tải làm dày mô gân lành xung quanh.",
      descEn: "Advanced tendon degeneration featuring focal areas of cell death, acellularity, and disordered collagen fragmentation. Cook & Docking principle applies: 'Treat the Donut, Not the Hole' by strengthening abundant intact surrounding fibrillar matrix.",
      mechanismVi: "Vùng hoại tử tế bào vô mạch, đứt gãy sợi collagen, giảm độ đàn hồi sinh học.",
      mechanismEn: "Acellular necrotic islands, collagen fibril breakdown, loss of biological spring recoil.",
      startingPhase: "p2"
    },
    reactive_on_degenerative: {
      key: "reactive_on_degenerative",
      titleVi: "Đợt Viêm Cấp Trên Nền Thoái Hóa Mãn Tính (Reactive-on-Degenerative Flare)",
      titleEn: "Reactive-on-Degenerative Flare",
      descVi: "Cơn đau cấp bùng phát trên nền một gân đã có thoái hóa cấu trúc lâu năm. Vùng mô gân lành xung quanh bị quá tải đột ngột gây phản ứng sưng đau cấp. Bắt buộc phải hạ tải ngay về Giai đoạn 1 Isometric để dập tắt cơn đau trước khi tiếp tục HSR.",
      descEn: "An acute reactive inflammatory-like flare superimposed on an underlying chronic degenerative tendon. The remaining healthy fibrillar matrix has been acutely overloaded. Requires immediate de-loading to Phase 1 isometrics to calm neurogenic reactivity before resuming HSR.",
      mechanismVi: "Phản ứng tăng sinh ngậm nước cấp tính trên nền gân có sẵn vùng thoái hóa xơ hóa.",
      mechanismEn: "Acute reactive proteoglycan swelling triggered within the healthy reserve of a chronically degenerated tendon.",
      startingPhase: "p1"
    }
  },

  PHASE_DOSAGES: {
    p1: {
      phase: "p1",
      titleVi: "Giai Đoạn 1: Gồng Tĩnh Giảm Đau Cấp (Isometric Loading)",
      titleEn: "Phase 1: Isometric Pain Control (Cortical Inhibition Relief)",
      intensityVi: "70% MVC (Co cơ đẳng trường tối đa có kiểm soát)",
      intensityEn: "70% MVC Isometric",
      dosageVi: "5 hiệp x 45 giây giữ tĩnh, nghỉ 2 phút giữa hiệp",
      dosageEn: "5 sets x 45s holds, 2 min rest",
      tempo: "Isometric 45s hold",
      restInterval: "2 phút (120 giây)",
      frequencyVi: "Hàng ngày (1-2 lần/ngày, cách nhau >= 6 giờ)",
      frequencyEn: "Daily (1-2x/day)",
      painRuleVi: "Đau VAS <= 3/10 trong lúc tập là an toàn; bắt buộc phải trở về mức nền sau 24 giờ.",
      painRuleEn: "VAS <= 3/10 acceptable during loading; pain must return to baseline within 24 hours"
    },
    p2: {
      phase: "p2",
      titleVi: "Giai Đoạn 2: Kháng Lực Nặng Nhịp Chậm (Heavy Slow Resistance - HSR)",
      titleEn: "Phase 2: Heavy Slow Resistance (Type I Collagen Synthesis)",
      intensityVi: "70-85% 1RM (Tiến dần từ 15 RM xuống 8 RM tải nặng, nhịp 3-1-3)",
      intensityEn: "70-85% 1RM Heavy Slow Resistance (Tempo 3-1-3)",
      dosageVi: "3-4 hiệp x 8-10 lần, nhịp 3-1-3 nghiêm ngặt, nghỉ 2-3 phút",
      dosageEn: "3-4 sets x 8-10 reps",
      tempo: "Tempo 3-1-3 (3s eccentric, 1s pause, 3s concentric; 7s TUT)",
      restInterval: "2-3 phút (120-180 giây)",
      frequencyVi: "3 buổi/tuần (cách ngày, nghỉ 48 giờ để tổng hợp collagen)",
      frequencyEn: "3 sessions/week with 48h rest",
      painRuleVi: "Đau VAS <= 3/10 trong bài tập; bắt buộc hồi phục về ban đầu sau 24 giờ.",
      painRuleEn: "VAS <= 3/10 acceptable during loading; pain must return to baseline within 24 hours"
    },
    p3: {
      phase: "p3",
      titleVi: "Giai Đoạn 3: Tích Trữ Đàn Hồi SSC & Sức Mạnh Góc Tận (ATG & FRC)",
      titleEn: "Phase 3: Elastic Energy Storage & End-Range Capacity (ATG & FRC)",
      intensityVi: "Tốc độ phát lực đàn hồi tối đa (Elastic Recoil) + Sức mạnh góc cực hạn",
      intensityEn: "Stretch-Shortening Cycle Elastic Recoil & End-Range Capacity",
      dosageVi: "3 hiệp x 15-20 lần bật lò xo đàn hồi + 2 hiệp x 45s vận động góc cực hạn",
      dosageEn: "3 sets x 15-20 elastic hops + 2 sets x 45s loaded mobility",
      tempo: "Ballistic SSC (<200ms) + 15s PAILs/RAILs isometric lock",
      restInterval: "90-120 giây giữa các hiệp",
      frequencyVi: "2-3 buổi/tuần (nghỉ 48-72 giờ giữa các buổi tập bật nhảy)",
      frequencyEn: "2-3 sessions/week",
      painRuleVi: "Đau VAS <= 2/10 trong buổi tập; nghiệm pháp kiểm tra sáng hôm sau phải hoàn toàn không đau.",
      painRuleEn: "VAS <= 3/10 acceptable during loading; pain must return to baseline within 24 hours"
    }
  },

  normalizeInputs(raw) {
    const inputs = (raw && typeof raw === 'object' && !Array.isArray(raw)) ? raw : {};
    
    const toSafeStr = (val, fallback = '') => {
      if (typeof val === 'string') return val.trim();
      if (typeof val === 'number' && Number.isFinite(val)) return String(val);
      if (typeof val === 'boolean') return String(val);
      return fallback;
    };

    // 1. Zone
    const rawZone = toSafeStr(inputs.zone || inputs.zoneId || inputs.spotId, 'knee').toLowerCase();
    let zone = 'knee';
    if (rawZone && Object.prototype.hasOwnProperty.call(this.ZONE_MAP, rawZone) && typeof this.ZONE_MAP[rawZone] === 'string') {
      zone = this.ZONE_MAP[rawZone];
    } else {
      zone = 'knee';
    }

    // 2. Chronicity / Onset / Duration
    const rawOnset = toSafeStr(inputs.onset || inputs.chronicity || inputs.duration || inputs.symptomDuration, '<6wks').toLowerCase();
    let onset = 'acute';
    if (rawOnset.includes('chron') || rawOnset.includes('man_tinh') || rawOnset.includes('mãn tính') || rawOnset.includes('>12') || rawOnset.includes('>8')) {
      onset = 'chronic';
    } else if (rawOnset.includes('sub') || rawOnset.includes('ban_cap') || rawOnset.includes('bán cấp') || rawOnset.includes('6-12')) {
      onset = 'subacute';
    } else if (rawOnset.includes('acute') || rawOnset.includes('cap_tinh') || rawOnset.includes('cấp tính') || rawOnset.includes('<6')) {
      onset = 'acute';
    } else if (rawOnset.includes('year') || rawOnset.includes('năm') || rawOnset.includes('nam')) {
      onset = 'chronic';
    } else {
      const monthMatch = rawOnset.match(/([\d.]+)\s*(months?|tháng|thang)/i);
      if (monthMatch) {
        const m = parseFloat(monthMatch[1]);
        if (m >= 3) onset = 'chronic';
        else if (m >= 1.5) onset = 'subacute';
        else onset = 'acute';
      } else {
        const weekMatch = rawOnset.match(/([\d.]+)\s*(weeks?|tuần|tuan|wks?|w)/i);
        if (weekMatch) {
          const w = parseFloat(weekMatch[1]);
          if (w > 12) onset = 'chronic';
          else if (w >= 6) onset = 'subacute';
          else onset = 'acute';
        } else {
          const dayMatch = rawOnset.match(/([\d.]+)\s*(days?|ngày|ngay|d)/i);
          if (dayMatch) {
            const d = parseFloat(dayMatch[1]);
            if (d > 84) onset = 'chronic';
            else if (d >= 42) onset = 'subacute';
            else onset = 'acute';
          } else if (rawOnset.includes('tuần') || rawOnset.includes('tuan')) {
            onset = 'subacute';
          } else {
            onset = 'acute';
          }
        }
      }
    }

    // 3. Morning Stiffness
    const rawStiff = toSafeStr(inputs.stiffness || inputs.morningStiffness || inputs.morning_stiffness, 'mild').toLowerCase();
    let stiffness = 'mild';
    if (rawStiff.includes('none') || /\b0\s*m/i.test(rawStiff) || rawStiff.includes('khong') || rawStiff.includes('không') || rawStiff === '0' || rawStiff === '0m') {
      stiffness = 'none';
    } else if (rawStiff.includes('<15') || rawStiff.includes('mild') || rawStiff.includes('nhe') || rawStiff.includes('nhẹ')) {
      stiffness = 'mild';
    } else if (rawStiff.includes('>30') || rawStiff.includes('severe') || rawStiff.includes('nang') || rawStiff.includes('nặng')) {
      stiffness = 'severe';
    } else if (rawStiff.includes('hour') || rawStiff.includes('giờ') || rawStiff.includes('gio') || rawStiff.includes('hr')) {
      stiffness = 'severe';
    } else {
      const minMatch = rawStiff.match(/([\d.]+)\s*(min|minute|phút|phut|m\b)/i);
      if (minMatch) {
        const mins = parseFloat(minMatch[1]);
        if (mins > 30) stiffness = 'severe';
        else if (mins >= 15) stiffness = 'moderate';
        else if (mins > 0) stiffness = 'mild';
        else stiffness = 'none';
      } else if (rawStiff.includes('15-30') || rawStiff.includes('mod') || rawStiff.includes('vua') || rawStiff.includes('vừa')) {
        stiffness = 'moderate';
      } else {
        stiffness = 'mild';
      }
    }

    // 4. Activity Demand
    const rawAct = toSafeStr(inputs.activity || inputs.activityIntensity || inputs.activity_intensity, 'moderate').toLowerCase();
    let activity = 'moderate';
    if (rawAct.includes('sed') || rawAct.includes('ngoi') || rawAct.includes('van_phong') || rawAct === 'low') {
      activity = 'sedentary';
    } else if (rawAct.includes('jump') || rawAct.includes('nhay') || rawAct.includes('sport') || rawAct.includes('high')) {
      activity = 'high_jumping';
    } else if (rawAct.includes('lift') || rawAct.includes('heavy') || rawAct.includes('power') || rawAct.includes('tạ') || /\bta\b/.test(rawAct)) {
      activity = 'heavy_lifting';
    } else {
      activity = 'moderate';
    }

    // 5. VAS Pain
    let rawVas = 5;
    const vCandidate = inputs.vas ?? inputs.currentVAS ?? inputs.vas_pain_score;
    if (typeof vCandidate === 'number') {
      rawVas = vCandidate;
    } else if (typeof vCandidate === 'string') {
      const parsed = parseFloat(vCandidate.trim());
      rawVas = isNaN(parsed) ? 5 : parsed;
    } else {
      rawVas = 5;
    }
    const vas = Math.max(0, Math.min(10, Math.round(rawVas)));

    // 6. Load Latency / Pain Pattern
    const rawLat = toSafeStr(inputs.latency || inputs.loadLatency || inputs.warmup_phenomenon, 'warmup_delayed').toLowerCase();
    let latency = 'warmup_delayed';
    if (rawLat.includes('during') || rawLat.includes('worse') || rawLat.includes('tang') || rawLat.includes('tăng') || rawLat === 'no') {
      latency = 'during';
    } else if (rawLat.includes('const') || rawLat.includes('lien_tuc') || rawLat.includes('liên tục') || rawLat.includes('severe')) {
      latency = 'constant';
    } else {
      latency = 'warmup_delayed'; // improves with warmup, aches next day (classic 24h latency)
    }

    return { zone, onset, stiffness, activity, vas, latency };
  },

  evaluate(rawInputs) {
    const { zone, onset, stiffness, activity, vas, latency } = this.normalizeInputs(rawInputs);

    let scoreReactive = 0;
    let scoreDysrepair = 0;
    let scoreDegenerative = 0;

    // Chronicity scoring
    if (onset === 'acute') scoreReactive += 4;
    else if (onset === 'subacute') scoreDysrepair += 4;
    else scoreDegenerative += 4; // chronic

    // Morning stiffness scoring
    if (stiffness === 'none') {
      scoreReactive += 2;
    } else if (stiffness === 'mild') { // <15m
      scoreReactive += 3;
      scoreDysrepair += 1;
    } else if (stiffness === 'moderate') { // 15-30m
      scoreDysrepair += 4;
      scoreDegenerative += 2;
    } else { // severe >30m
      scoreDegenerative += 5;
    }

    // Load latency scoring
    if (latency === 'during') {
      scoreReactive += 4;
    } else if (latency === 'warmup_delayed') {
      scoreDysrepair += 3;
      scoreDegenerative += 3;
    } else { // constant severe
      scoreReactive += 2;
      scoreDegenerative += 3;
    }

    // Activity demand weighting
    if (activity === 'high_jumping' && onset === 'acute') {
      scoreReactive += 2;
    } else if (activity === 'heavy_lifting' && onset === 'chronic') {
      scoreDegenerative += 2;
    }

    // Determine Stage & Starting Phase via Evidence Rules
    let stageKey = 'reactive';
    let startingPhase = 'p1';
    let isFlareUp = false;

    // Clinical Safety Rule 2 (Acute Onset): Acute onset (<6 weeks) is strictly reactive cellular proliferation
    // and MUST begin with Phase 1 Isometrics (Rio et al. 2015) for tendon calming and cortical inhibition relief.
    if (onset === 'acute') {
      stageKey = 'reactive';
      startingPhase = 'p1';
    }
    // Clinical Safety Rule 1 & 3: High pain (VAS >= 6) or worsening during load in chronic/subacute tendon
    // indicates active reactive flare (Cook & Purdam 2016). MUST calm tendon with isometrics before HSR!
    else if ((onset === 'chronic' || onset === 'subacute') && (vas >= 6 || latency === 'during')) {
      stageKey = (onset === 'chronic') ? 'reactive_on_degenerative' : 'reactive';
      startingPhase = 'p1';
      isFlareUp = (onset === 'chronic');
    } else if (scoreReactive >= scoreDysrepair && scoreReactive >= scoreDegenerative) {
      stageKey = 'reactive';
      startingPhase = 'p1';
    } else if (scoreDysrepair >= scoreDegenerative) {
      stageKey = 'dysrepair';
      startingPhase = (vas <= 3 && stiffness !== 'severe') ? 'p2' : 'p1';
    } else {
      stageKey = 'degenerative';
      // Cook & Purdam: "Treat the Donut, Not the Hole" -> HSR builds surrounding aligned fibrillar matrix
      // Phase 3 gate: strictly requires low VAS (<=2), low stiffness, high activity demand,
      // and safe load latency (strictly barred if constant unremitting pain or worsening during load)
      if (vas <= 2 && (stiffness === 'none' || stiffness === 'mild') && 
          (activity === 'high_jumping' || activity === 'heavy_lifting') && 
          latency !== 'constant' && latency !== 'during') {
        startingPhase = 'p3'; // Ready for elastic storage & end-range resilience
      } else if (vas <= 4) {
        startingPhase = 'p2'; // HSR matrix remodeling
      } else {
        startingPhase = 'p1'; // De-load transition with isometrics
      }
    }

    // Safety Rule 1 (Constant Unremitting Pain Guardrail):
    // Constant pain indicates high irritability; startingPhase can NEVER be 'p3'.
    // Clamp to 'p1' if VAS >= 4 or acute/subacute, else 'p2'.
    if (latency === 'constant') {
      if (startingPhase === 'p3') {
        startingPhase = (vas <= 3 && onset === 'chronic' && stiffness !== 'severe') ? 'p2' : 'p1';
      }
      if (vas >= 4 || onset === 'acute' || onset === 'subacute') {
        startingPhase = 'p1';
      }
    }

    // Global Safety Guardrails (Defense-in-Depth):
    // 1. Pain safety ceiling: VAS >= 6 strictly locked to Phase 1
    if (vas >= 6) {
      startingPhase = 'p1';
    }
    // 2. Acute onset (<6w) strictly locked to Phase 1 isometrics
    if (onset === 'acute') {
      stageKey = 'reactive';
      startingPhase = 'p1';
    }
    // 3. Worsening during load, severe stiffness, or non-chronic duration barred from Phase 3
    if (latency === 'during' || latency === 'constant' || stiffness === 'severe' || onset !== 'chronic') {
      if (startingPhase === 'p3') {
        startingPhase = 'p2';
      }
    }
    // 4. Subacute with severe stiffness and pain worsening during load with VAS >= 4 barred from Phase 2
    if (onset === 'subacute' && stiffness === 'severe' && latency === 'during' && vas >= 4) {
      startingPhase = 'p1';
    }

    // Stage and Phase Metadata
    const stageDef = this.STAGE_DEFINITIONS[stageKey];
    const phaseDosage = this.PHASE_DOSAGES[startingPhase];
    const morningTest = this.MORNING_TESTS[zone] || this.MORNING_TESTS.knee;
    const gatekeeper = this.GATEKEEPERS[startingPhase] || this.GATEKEEPERS.p1;

    // Retrieve Zone Exercises
    const zoneData = EXERCISE_DATA[zone] || EXERCISE_DATA.spot7;
    const phaseExercises = zoneData[startingPhase] || [];
    const primaryExercise = phaseExercises[0] || null;

    // Construct Result per Interface Contract
    return {
      stage: stageKey,
      stageTitleVi: stageDef.titleVi,
      stageTitleEn: stageDef.titleEn,
      stageDescriptionVi: stageDef.descVi,
      stageDescriptionEn: stageDef.descEn,
      clinicalMechanismVi: stageDef.mechanismVi,
      clinicalMechanismEn: stageDef.mechanismEn,
      startingPhase: startingPhase,
      phaseTitleVi: phaseDosage.titleVi,
      phaseTitleEn: phaseDosage.titleEn,
      intensity: phaseDosage.intensityEn,
      intensityVi: phaseDosage.intensityVi,
      intensityEn: phaseDosage.intensityEn,
      dosage: phaseDosage.dosageEn,
      dosageVi: phaseDosage.dosageVi,
      dosageEn: phaseDosage.dosageEn,
      frequency: phaseDosage.frequencyEn,
      frequencyVi: phaseDosage.frequencyVi,
      frequencyEn: phaseDosage.frequencyEn,
      tempo: phaseDosage.tempo,
      restInterval: phaseDosage.restInterval,
      painRule: phaseDosage.painRuleEn,
      painRuleVi: phaseDosage.painRuleVi,
      painRuleEn: phaseDosage.painRuleEn,
      gatekeeperTest: gatekeeper.criteriaEn.join(" | "),
      gatekeeperTestVi: gatekeeper.criteriaVi.join(" | "),
      gatekeeperTestEn: gatekeeper.criteriaEn.join(" | "),
      gatekeeperDetails: gatekeeper,
      morningTest: morningTest.nameEn + ": " + morningTest.instructionEn,
      morningTestVi: morningTest.nameVi + ": " + morningTest.instructionVi,
      morningTestEn: morningTest.nameEn + ": " + morningTest.instructionEn,
      morningTestDetails: morningTest,
      isFlareUp: isFlareUp,
      exercise: primaryExercise,
      allPhaseExercises: phaseExercises,
      zoneKey: zone,
      zoneTitleVi: zoneData.titleVi,
      zoneTitleEn: zoneData.titleEn,
      inputs: { zone, onset, stiffness, activity, vas, latency }
    };
  },

  calculate(rawInputs) {
    return this.evaluate(rawInputs);
  },

  getZoneProtocols(zoneId) {
    const rawZone = (typeof zoneId === 'string') ? zoneId.toLowerCase().trim() : '';
    let safeZone = 'knee';
    if (rawZone && Object.prototype.hasOwnProperty.call(this.ZONE_MAP, rawZone) && typeof this.ZONE_MAP[rawZone] === 'string') {
      safeZone = this.ZONE_MAP[rawZone];
    } else if (rawZone && EXERCISE_DATA[rawZone]) {
      safeZone = rawZone;
    }
    return EXERCISE_DATA[safeZone] || EXERCISE_DATA.knee || EXERCISE_DATA.spot7 || null;
  },

  getMorningTest(zoneId) {
    const rawZone = (typeof zoneId === 'string') ? zoneId.toLowerCase().trim() : '';
    let safeZone = 'knee';
    if (rawZone && Object.prototype.hasOwnProperty.call(this.ZONE_MAP, rawZone) && typeof this.ZONE_MAP[rawZone] === 'string') {
      safeZone = this.ZONE_MAP[rawZone];
    }
    return this.MORNING_TESTS[safeZone] || this.MORNING_TESTS.knee;
  },

  getGatekeeperTest(phaseId) {
    const rawPhase = (typeof phaseId === 'string') ? phaseId.toLowerCase().trim() : 'p1';
    return this.GATEKEEPERS[rawPhase] || this.GATEKEEPERS.p1;
  }
};

// Standalone Helper Proxy
function calculateTendonLoad(rawInputs) {
  return CALCULATOR_ENGINE.evaluate(rawInputs);
}

/**
 * AO POST-OPERATIVE CLINICAL REHABILITATION ENGINE
 * Evaluates surgical procedure, post-op timeframe, and pain/swelling level
 * to produce precise weight-bearing prescriptions, target ROM, exercises, and contraindications.
 */
const AO_POSTOP_ENGINE = {
  SURGERY_DATABASE: {
    im_nail: {
      id: "im_nail",
      nameVi: "Đinh nội tủy có chốt (IM Nail) - Xương đùi & Cẳng chân",
      nameEn: "Interlocking Intramedullary Nail (IM Nail) - Femur & Tibia",
      stabilityPrincipleVi: "Vững chắc tương đối (Relative Stability - Strain 2–10%)",
      stabilityPrincipleEn: "Relative Stability (Interfragmentary Strain 2–10%)",
      healingModeVi: "Liền xương gián tiếp thứ cấp qua tạo can sụn và can xương cứng (Secondary Callus Healing)",
      healingModeEn: "Secondary indirect bone healing via periosteal and endosteal callus formation",
      videoTargetId: "postop_im_nail_femur_tibia_rehab",
      phases: {
        p1: {
          wbVi: "TDWB (Chạm ngón giữ thăng bằng 10-15kg) với 2 nạng nách",
          wbEn: "TDWB (Touch-Down Weight-Bearing 10-15kg) with bilateral axillary crutches",
          romVi: "Gấp gối chủ động có trợ giúp 0-60°, duỗi thẳng gối 0° hoàn toàn",
          romEn: "Active-assisted knee flexion 0-60°, full passive extension 0°",
          rxVi: "Bơm cổ chân 30 lần/giờ; gồng tĩnh cơ tứ đầu (Quad sets); trượt gót chân trên giường; kê cao chân 20cm chống phù nề.",
          rxEn: "Ankle pumps 30 reps/hour; quad sets; supine heel slides; limb elevation 20cm above heart for edema.",
          contraVi: "CẤM xoay vặn thân mình khi bàn chân cố định; cấm tì đè quá 15kg khi chưa rút chỉ.",
          contraEn: "NO pivoting or torsional stress on planted foot; strictly avoid loading > 15kg."
        },
        p2: {
          wbVi: "PWB (Tì đè từng phần 25% -> 50% trọng lượng cơ thể) với 2 nạng",
          wbEn: "PWB (Partial Weight-Bearing 25% -> 50% bodyweight) with bilateral crutches",
          romVi: "Gấp gối 0-90°, tập đạp xe tĩnh không kháng lực (vòng đạp tròn trơn tru)",
          romEn: "Knee flexion 0-90°, stationary cycling zero resistance for smooth rotations",
          rxVi: "Đứng trụ trên cân kiểm soát lực tì 30-50%; nâng chân thẳng (SLR); trượt gối có bóng tì tường; di động bánh chè.",
          rxEn: "Scale-monitored weight bearing 30-50%; Straight Leg Raises; wall ball slides; patellar mobilization.",
          contraVi: "CẤM bỏ nạng đi khập khiễng; cấm nhảy hoặc tiếp đất giật cục.",
          contraEn: "NO single crutch or unassisted walking with limp; avoid abrupt impact landings."
        },
        p3: {
          wbVi: "FWB (Tì đè toàn bộ) - Cai từ 2 nạng sang 1 nạng rồi bỏ nạng hoàn toàn",
          wbEn: "FWB (Full Weight-Bearing) - Wean from 2 crutches to 1 cane to unassisted gait",
          romVi: "Gấp gối > 120° đến hết biên độ đối bên",
          romEn: "Knee flexion > 120° progressing to symmetrical full ROM",
          rxVi: "Mini Squat hai chân tựa tường; Step-ups bục 10cm; rèn luyện dáng đi chuẩn không nghiêng háng Trendelenburg; tập thăng bằng thảm bọt.",
          rxEn: "Bilateral wall mini squats; 10cm step-ups; symmetrical gait re-education without Trendelenburg lurch; balance pad training.",
          contraVi: "CẤM chạy nhảy hoặc xoay người đổi hướng thể thao đột ngột.",
          contraEn: "NO running, cutting, pivoting, or high-impact athletic participation."
        },
        p4: {
          wbVi: "Tì đè bình thường + Tải trọng thể thao tăng dần theo định luật Wolff",
          wbEn: "Full normal loading + progressive athletic loading according to Wolff's Law",
          romVi: "Toàn bộ biên độ khớp bình thường không hạn chế",
          romEn: "Full anatomical range of motion without restrictions",
          rxVi: "Leg Press chuỗi động đóng tải 70-80% 1RM; Deadlift và Squat có kiểm soát; chạy bộ thẳng trục trên máy; kiểm tra LSI >= 90%.",
          rxEn: "Closed kinetic chain Leg Press 70-80% 1RM; controlled Squats/Deadlifts; straight-line jogging; Limb Symmetry Index >= 90%.",
          contraVi: "CẤM thi đấu thể thao đối kháng khi cơ tứ đầu chưa đạt LSI >= 90% so với chân lành.",
          contraEn: "NO collision/contact sports until quadriceps/hamstrings LSI >= 90%."
        }
      }
    },

    lcp_plate: {
      id: "lcp_plate",
      nameVi: "Nẹp khóa (LCP) / Nẹp nén (DCP) - Mâm chày, Mắt cá & Cẳng tay",
      nameEn: "Locking Compression Plate (LCP / DCP) - Tibial Plateau, Ankle & Forearm",
      stabilityPrincipleVi: "Vững chắc tuyệt đối (Absolute Stability - Strain < 2%) với nẹp nén hoặc bắc cầu khóa",
      stabilityPrincipleEn: "Absolute Stability (Strain < 2%) with lag screw compression or rigid bridging",
      healingModeVi: "Liền xương trực tiếp nguyên phát qua nón bào mòn Harvers (Primary Direct Contact Bone Healing)",
      healingModeEn: "Primary direct contact bone healing via Haversian cutting cones without periosteal callus",
      videoTargetId: "postop_tibial_plateau_plate_lcp",
      phases: {
        p1: {
          wbVi: "NWB (Tuyệt đối KHÔNG tì đè) 0kg lên chi phẫu thuật",
          wbEn: "Strict NWB (Non-Weight-Bearing 0kg) on operative limb",
          romVi: "Tập máy CPM hoặc thụ động nhẹ nhàng 0-45° để bôi trơn mặt sụn khớp",
          romEn: "Continuous Passive Motion (CPM) or gentle PROM 0-45° to nourish articular cartilage",
          rxVi: "Kê cao chi hơn ngực; bơm cổ chân và gồng cơ tĩnh bàn ngón chân; tập nâng tay/thân trên không dồn lực lên nẹp mâm chày/mắt cá.",
          rxEn: "Elevate limb above chest; distal pump exercises; isometric ankle/toe work; maintain upper extremity conditioning.",
          contraVi: "NGHIÊM CẤM đặt bàn chân chạm đất tì tải (nguy cơ sụp lún mặt sụn mâm chày hoặc bung nẹp nén).",
          contraEn: "STRICTLY FORBIDDEN to bear weight on foot (prevents articular surface collapse or plate displacement)."
        },
        p2: {
          wbVi: "Vẫn duy trì NWB hoặc chỉ TDWB chạm ngón < 10kg khi đứng chuyển tư thế",
          wbEn: "Maintain NWB or strictly TDWB touch-down < 10kg only during transfers",
          romVi: "Gấp gối/cổ chân đạt 0-90° chủ động có trợ giúp (AAROM)",
          romEn: "AAROM progression achieving 0-90° knee/ankle flexion",
          rxVi: "Tập trượt gót có khăn kéo; gập mu cổ chân chủ động không tải (tháo nẹp bốt tạm thời khi tập); xoa bóp sẹo mổ.",
          rxEn: "Heel slides with strap; non-weight bearing active ankle dorsiflexion out of boot; surgical scar desensitization.",
          contraVi: "CẤM tì đè thân mình; cấm đá tạ tạ chuỗi động mở kháng lực nặng.",
          contraEn: "NO axial loading through foot; avoid heavy open-chain knee extensions."
        },
        p3: {
          wbVi: "Bắt đầu PWB (25% -> 50% trọng lượng) sau khi chụp X-quang kiểm tra mặt sụn vững",
          wbEn: "Initiate PWB (25% -> 50% bodyweight) once follow-up X-ray confirms articular integrity",
          romVi: "Tầm vận động 0-110° gối / Đạt gập mu cổ chân > 10°",
          romEn: "Active ROM 0-110° knee / Dorsiflexion > 10° ankle",
          rxVi: "Tập đứng trụ có kiểm soát tải trên cân đo; đạp xe tĩnh không kháng lực; squat nông tựa tường với bóng.",
          rxEn: "Scale-monitored weight bearing; stationary cycling; shallow wall squats with exercise ball.",
          contraVi: "CẤM tăng tải tì đè đột ngột khi chưa có phim X-quang xác nhận lành mặt sụn.",
          contraEn: "NO premature advancement to full weight-bearing without radiographic bone bridging."
        },
        p4: {
          wbVi: "FWB (Tì đè hoàn toàn, cai nạng hoàn toàn) khi có can xương cứng liên tục",
          wbEn: "FWB (Full Weight-Bearing, crutches discontinued) upon solid radiographic union",
          romVi: "Đạt biên độ khớp tương đương bên lành",
          romEn: "Symmetrical anatomical range of motion",
          rxVi: "Rèn luyện sức mạnh chuỗi động đóng; step-up bậc thang; rèn thăng bằng một chân; tái cấu trúc bè xương.",
          rxEn: "Closed-chain progressive resistance training; step-ups; single-leg balance and proprioception drills.",
          contraVi: "CẤM nhảy tiếp đất độ cao lớn hoặc chơi bóng đá đối kháng trước tháng thứ 6-9.",
          contraEn: "NO high-impact jumping or contact sports prior to months 6-9."
        }
      }
    },

    tension_band: {
      id: "tension_band",
      nameVi: "Néo ép số 8 chỉ thép (Tension Band Wiring) - Xương bánh chè / Mỏm khuỷu",
      nameEn: "Tension Band Wiring (TBW) - Patella & Olecranon",
      stabilityPrincipleVi: "Vững chắc tuyệt đối bằng cơ chế chuyển lực kéo thành lực nén (Conversion of Tensile to Compressive Strain)",
      stabilityPrincipleEn: "Absolute Stability converting dynamic tensile distracting forces into interfragmentary compression",
      healingModeVi: "Liền xương trực tiếp diện tiếp xúc không qua can xương phồng (Direct Contact Healing)",
      healingModeEn: "Direct primary bone healing with minimal external callus",
      videoTargetId: "postop_patella_tension_band_wiring",
      phases: {
        p1: {
          wbVi: "Khóa nẹp gối thẳng 0° khi đi lại - Cho phép tì đè chịu tải chân có nẹp khóa",
          wbEn: "Locked knee brace at 0° extension for ambulation - Full extension weight-bearing permitted",
          romVi: "Tháo nẹp tập gập thụ động có trợ giúp nhẹ nhàng 0-30° (Tuần 1-2)",
          romEn: "Unlock brace for gentle passive-assisted flexion 0-30° (Weeks 1-2)",
          rxVi: "Gồng tĩnh cơ tứ đầu (Quad sets khóa gối); nâng chân thẳng có nẹp thẳng; di động xương bánh chè sang 2 bên.",
          rxEn: "Isometric quad sets at 0°; Straight Leg Raise in locked brace; gentle mediolateral patellar glides.",
          contraVi: "TUYỆT ĐỐI CẤM gập gối khi đang tì chân xuống đất; cấm đá tạ mở gối chủ động.",
          contraEn: "STRICTLY FORBIDDEN to bear weight on a flexed knee; no active open-chain leg extensions."
        },
        p2: {
          wbVi: "Vẫn khóa nẹp thẳng 0° khi đi lại; tì đè FWB chân thẳng",
          wbEn: "Maintain 0° locked brace for walking; FWB in full extension allowed",
          romVi: "Tăng dần góc gập gối khi nằm/ngồi: Tuần 3-4 (0-60°), Tuần 5-6 (0-90°)",
          romEn: "Progress seated/supine flexion: Weeks 3-4 (0-60°), Weeks 5-6 (0-90°)",
          rxVi: "Trượt gót chân có dây kéo trợ giúp; ngồi buông thõng chân mép giường; đạp xe bán phần (nửa vòng quay trước-sau).",
          rxEn: "Strap-assisted heel slides; gentle edge-of-bed pendulum hangs; partial rocking rotations on stationary bike.",
          contraVi: "CẤM cố ép gập gối vượt quá 90° trước tuần thứ 6 (nguy cơ kéo đứt chỉ thép néo ép).",
          contraEn: "DO NOT force flexion beyond 90° before week 6 to prevent cerclage wire failure."
        },
        p3: {
          wbVi: "Mở khóa nẹp gối khi đi lại hoặc bỏ nẹp chuyển sang bó gối mềm (Tuần 6-8)",
          wbEn: "Unlock brace for walking or transition to soft supportive sleeve (Weeks 6-8)",
          romVi: "Gấp gối chủ động 0-120°",
          romEn: "Active knee flexion 0-120°",
          rxVi: "Đạp xe tĩnh trọn vòng; squat nông 0-45° có hỗ trợ; bài tập bước bục thấp; tăng cường sức mạnh cơ tứ đầu.",
          rxEn: "Full revolution stationary cycling; shallow supported mini-squats (0-45°); low step-downs; quad strengthening.",
          contraVi: "CẤM ngồi xổm sâu hoặc quỳ gối tì đè lên xương bánh chè có chỉ thép.",
          contraEn: "NO deep squatting past 90° or direct kneeling over wire implants."
        },
        p4: {
          wbVi: "Tì đè hoàn toàn bình thường không giới hạn",
          wbEn: "Full unrestricted loading and functional agility",
          romVi: "Đầy đủ biên độ khớp như bên lành (0-135°)",
          romEn: "Full symmetrical range of motion (0-135°)",
          rxVi: "Tập squat sâu ATG có kê gót; rèn luyện sức mạnh eccentric cơ tứ đầu; chạy bộ thẳng trục; chuẩn bị rút chỉ thép nếu cộm da.",
          rxEn: "Heel-elevated deep squats; eccentric quad bulletproofing; return to jogging; assess hardware for elective removal.",
          contraVi: "CẤM va đập trực tiếp vùng bánh chè vào vật cứng khi chỉ thép còn dưới da.",
          contraEn: "Avoid direct impact trauma over prominent subcutaneous cerclage wires."
        }
      }
    },

    acl_meniscus: {
      id: "acl_meniscus",
      nameVi: "Nội soi tái tạo ACL kèm khâu phục hồi sụn chêm",
      nameEn: "Arthroscopic ACL Reconstruction with Meniscal Repair",
      stabilityPrincipleVi: "Tái tạo dây chằng cơ sinh học & Bảo vệ đường khâu sụn chêm bằng nẹp khóa góc",
      stabilityPrincipleEn: "Biological Ligamentous Graft & Suture Anchor Protection with Hinged Brace",
      healingModeVi: "Tích hợp mô gân vào đường hầm xương (Ligamentization) & Liền mô sụn chêm xơ sụn",
      healingModeEn: "Graft ligamentization in bone tunnels & fibrocartilaginous healing of meniscal suture line",
      videoTargetId: "postop_acl_meniscus_repair_protocol",
      phases: {
        p1: {
          wbVi: "TDWB (Chạm ngón 10-15kg) hoặc NWB có nẹp khóa gối thẳng 0°",
          wbEn: "TDWB (10-15kg touch down) or NWB in hinged brace locked at 0°",
          romVi: "ƯU TIÊN SỐ 1: Duỗi thẳng 0° hoàn toàn (chống sẹo Cyclops). Gấp gối giới hạn <= 90°",
          romEn: "PRIORITY #1: Full passive extension 0° (prevents Cyclops syndrome). Flexion limited <= 90°",
          rxVi: "Kê khăn dưới gót chân duỗi thẳng gối; gồng cơ tĩnh tứ đầu đùi (Quad sets); bơm cổ chân phòng DVT; di động bánh chè.",
          rxEn: "Heel prop extension hangs; quad sets; ankle pumps; superior/inferior patellar mobilization.",
          contraVi: "NGHIÊM CẤM kê gối dưới khoeo chân khi nằm ngủ (gây co rút gấp gối vĩnh viễn); cấm gấp gối > 90°.",
          contraEn: "ABSOLUTELY NO pillow under knee in bed (causes permanent flexion contracture); do not exceed 90° flexion."
        },
        p2: {
          wbVi: "PWB tăng dần sang FWB với nẹp gối mở khóa góc khi đi lại (Tuần 4-6)",
          wbEn: "Progress PWB to FWB as tolerated; brace unlocked for ambulation by weeks 4-6",
          romVi: "Gấp gối tăng dần 0-110° sau tuần thứ 4",
          romEn: "Flexion progressed to 0-110° after week 4",
          rxVi: "Trượt gót chân có kiểm soát; nâng chân thẳng 4 hướng; đạp xe tĩnh hạ yên vừa tầm; tập thăng bằng 2 chân.",
          rxEn: "Heel slides; 4-way straight leg raises; stationary cycling with appropriate seat height; double-leg balance.",
          contraVi: "CẤM ngồi xổm sâu hoặc xoay vặn trục cẳng chân (bảo vệ mối chỉ khâu sụn chêm sừng sau).",
          contraEn: "NO deep squatting or twisting/pivoting through the knee joint."
        },
        p3: {
          wbVi: "FWB không cần nẹp (sau tuần 6-8 khi kiểm soát cơ tứ đầu tốt)",
          wbEn: "Full unassisted ambulation without brace once quad lag is eliminated",
          romVi: "Gấp gối 0-130°",
          romEn: "Knee flexion 0-130°",
          rxVi: "Leg press chuỗi động đóng góc 0-60°; Step-ups; Romanian Deadlift rèn cơ gân kheo; đạp xe ngoài trời nhẹ nhàng.",
          rxEn: "Closed-chain leg press (0-60°); step-ups; Romanian deadlifts for hamstring graft recovery; outdoor cycling.",
          contraVi: "CẤM đá tạ chuỗi động mở (Leg extension máy) ở góc 45-0° (tạo lực trượt trước xé rách mảnh ghép ACL).",
          contraEn: "STRICTLY FORBIDDEN open kinetic chain seated leg extensions from 45° to 0° (extreme anterior shear on graft)."
        },
        p4: {
          wbVi: "FWB thể thao - Giai đoạn tái cấu trúc mảnh ghép (Ligamentization)",
          wbEn: "Athletic loading - Graft maturation and remodeling window (Months 4-9+)",
          romVi: "Biên độ khớp hoàn toàn bình thường 0-135°",
          romEn: "Full anatomical symmetrical range of motion",
          rxVi: "Chạy thẳng trục trên máy chạy (Tháng 3-4); bài tập bật nhảy tiếp đất Y-Balance; kiểm tra sức mạnh LSI >= 90%.",
          rxEn: "Straight-line treadmill jogging (Months 3-4); deceleration landing mechanics; Y-Balance dynamic stability; LSI >= 90%.",
          contraVi: "CẤM quay lại đá bóng đối kháng, xoay chuyển đổi hướng trước tháng thứ 9.",
          contraEn: "NO return to competitive cutting/contact sports prior to month 9 and objective clearance testing."
        }
      }
    },

    rotator_cuff: {
      id: "rotator_cuff",
      nameVi: "Nội soi khâu rách chóp xoay vai (Rotator Cuff Repair - Suture Anchors)",
      nameEn: "Arthroscopic Rotator Cuff Repair (Suture Bridge Anchors)",
      stabilityPrincipleVi: "Bảo vệ lực căng cơ học trên vít neo gân (Suture Anchor purchase protection)",
      stabilityPrincipleEn: "Mechanical Suture Anchor Purchase Protection without Active Tensile Loading",
      healingModeVi: "Tích hợp mô xơ sụn điểm bám gân vào xương cánh tay (Enthesis Fibrocartilage Integration)",
      healingModeEn: "Fibrocartilaginous tendon-to-bone insertion enthesis healing",
      videoTargetId: "postop_rotator_cuff_codman_pendulum",
      phases: {
        p1: {
          wbVi: "Đeo đai túi có gối dạng vai 24/7 (kể cả khi ngủ) - 0% chịu lực chi trên",
          wbEn: "Abduction pillow sling worn 24/7 (including sleep) - Strict 0% upper limb loading",
          romVi: "100% Vận động thụ động (PROM) - Bài tập con lắc Codman đung đưa thân mình",
          romEn: "100% Passive ROM (PROM) - Codman pendulum oscillations driven by trunk sway",
          rxVi: "Con lắc Codman 3 lần/ngày; tập chủ động bàn tay, cổ tay và cẳng tay chống phù nề; chườm lạnh ngắt quãng 20 phút.",
          rxEn: "Codman pendulum 3x/day; active hand, wrist, and forearm pumping; intermittent cryotherapy 20 min.",
          contraVi: "NGHIÊM CẤM tự nâng tay chủ động (Active Elevation); cấm chống tay xuống giường đứng dậy (nhổ vít neo ngay lập tức).",
          contraEn: "ABSOLUTELY NO active arm elevation or pushing up from chair/bed (immediately pulls suture anchors out)."
        },
        p2: {
          wbVi: "Vẫn mang đai vai khi ra ngoài; bắt đầu tháo đai tập trong nhà có kiểm soát (Tuần 4-6)",
          wbEn: "Sling worn in public; wean from sling in controlled home environments (Weeks 4-6)",
          romVi: "Chuyển sang vận động chủ động có trợ giúp (AAROM bằng gậy hoặc dây ròng rọc)",
          romEn: "Transition to Active-Assisted ROM (AAROM) using wand or overhead pulley",
          rxVi: "Tập gậy nằm ngửa nâng tay có trợ giúp; trượt tay trên mặt bàn có khăn; kéo giãn thụ động bao khớp nhẹ nhàng.",
          rxEn: "Supine wand-assisted arm elevation; table towel slides; gentle passive posterior capsule stretching.",
          contraVi: "CẤM xách túi xách, bê vật nặng; cấm xoay trong đưa tay quặt ra sau lưng.",
          contraEn: "NO carrying groceries/weights; avoid aggressive internal rotation behind back."
        },
        p3: {
          wbVi: "Bỏ đai treo hoàn toàn - Bắt đầu vận động chủ động hoàn toàn (AROM)",
          wbEn: "Discontinue sling completely - Progress to full Active ROM (AROM)",
          romVi: "Lấy lại toàn bộ biên độ giơ tay qua đầu và xoay ngoài",
          romEn: "Restore full active overhead elevation and external rotation",
          rxVi: "Gồng tĩnh xoay vai tựa tường; tập cơ bả vai thành ngực (Scapular retraction, Serratus punch); bài tập chóp xoay với dây chun nhẹ.",
          rxEn: "Isometric wall external rotation; scapulothoracic strengthening (rows, serratus punches); light band rotator cuff work.",
          contraVi: "CẤM đẩy tạ ngực nặng (Bench press), chống đẩy đất (Push-ups) hoặc kéo xà đơn.",
          contraEn: "NO heavy bench pressing, floor push-ups, or pull-ups."
        },
        p4: {
          wbVi: "Rèn luyện sức mạnh chức năng và tái hòa nhập thể thao",
          wbEn: "Progressive functional strengthening and return to sports",
          romVi: "Đầy đủ biên độ khớp không đau",
          romEn: "Full painless range of motion in all planes",
          rxVi: "Tăng tải kháng lực xoay ngoài/xoay trong chóp xoay; bài tập ném bóng tạ nhỏ; rèn sức mạnh góc Scaption 30°; kiểm tra cơ lực.",
          rxEn: "Rotator cuff strengthening with dumbbells/cables; plyometric rebound ball throws; scaption strengthening; functional discharge testing.",
          contraVi: "CẤM tập thể thao ném bóng hoặc bơi lội gắng sức nếu cơ lực xoay ngoài chưa đạt chuẩn.",
          contraEn: "Avoid overhead throwing or vigorous swimming until symmetrical rotator cuff strength is restored."
        }
      }
    }
  },

  evaluate(rawInputs) {
    const surgeryKey = (rawInputs && rawInputs.surgery) ? String(rawInputs.surgery).toLowerCase().trim() : 'im_nail';
    const timeKey = (rawInputs && rawInputs.time) ? String(rawInputs.time).toLowerCase().trim() : 'p1';
    const vas = Number(rawInputs && rawInputs.vas !== undefined ? rawInputs.vas : 4);

    const surgData = this.SURGERY_DATABASE[surgeryKey] || this.SURGERY_DATABASE.im_nail;
    let phaseKey = 'p1';
    if (['p1', 'p2', 'p3', 'p4'].includes(timeKey)) {
      phaseKey = timeKey;
    }

    // Safety Override: Severe acute flare / extreme pain and swelling drops to phase p1 protective
    let isSafetyDowngraded = false;
    if (vas >= 7 && phaseKey !== 'p1') {
      phaseKey = 'p1';
      isSafetyDowngraded = true;
    }

    const currentPhaseData = surgData.phases[phaseKey] || surgData.phases.p1;

    return {
      surgeryKey: surgData.id,
      surgeryNameVi: surgData.nameVi,
      surgeryNameEn: surgData.nameEn,
      stabilityPrincipleVi: surgData.stabilityPrincipleVi,
      stabilityPrincipleEn: surgData.stabilityPrincipleEn,
      healingModeVi: surgData.healingModeVi,
      healingModeEn: surgData.healingModeEn,
      videoTargetId: surgData.videoTargetId,
      phaseKey: phaseKey,
      isSafetyDowngraded: isSafetyDowngraded,
      wbVi: currentPhaseData.wbVi,
      wbEn: currentPhaseData.wbEn,
      romVi: currentPhaseData.romVi,
      romEn: currentPhaseData.romEn,
      rxVi: currentPhaseData.rxVi,
      rxEn: currentPhaseData.rxEn,
      contraVi: currentPhaseData.contraVi,
      contraEn: currentPhaseData.contraEn,
      inputs: { surgery: surgeryKey, time: timeKey, vas }
    };
  }
};

function evaluateAOPostOp(rawInputs) {
  return AO_POSTOP_ENGINE.evaluate(rawInputs);
}

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

// Browser Environment Check
const isBrowser = typeof document !== 'undefined';

// DOM Elements
const stage = isBrowser ? document.getElementById('bm-stage') : null;
const overlay = isBrowser ? document.getElementById('bm-overlay') : null;
const panel = isBrowser ? document.getElementById('bm-panel') : null;

// 1. Render Interactive Hotspots
function renderHotspots() {
  if (!stage) return;
  const oldHotspots = stage.querySelectorAll('.bm-hotspot');
  oldHotspots.forEach(el => el.remove());

  DOTS.forEach(d => {
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
  if (!overlay) return;
  activeModalSpot = spotId;
  activeModalPhase = 'p1';
  renderModalContent();
  overlay.classList.add('bm-open');
}

function renderModalContent() {
  if (!panel) return;
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
    const exName = currentLang === 'vi' ? (ex.nameVi || ex.name) : (ex.nameEn || ex.name);
    const exReps = currentLang === 'vi' ? (ex.dosageVi || ex.reps) : (ex.dosageEn || ex.reps);
    const exCitation = ex.clinicalCitation ? `<div class="bm-citation-badge"><i class="fa-solid fa-book-bookmark"></i> ${ex.clinicalCitation}</div>` : '';
    const exIntensity = ex.intensity ? `<span class="bm-tag-intensity"><i class="fa-solid fa-gauge-high"></i> ${ex.intensity}</span>` : '';
    const exTempo = ex.tempo ? `<span class="bm-tag-tempo"><i class="fa-solid fa-stopwatch-20"></i> ${ex.tempo}</span>` : '';

    const row = document.createElement('div');
    row.className = 'bm-exercise-row';
    row.innerHTML = `
      <div class="bm-thumb" style="background-image: url('${thumbUrl}')">
        <div class="bm-play">
          <svg viewBox="0 0 24 24" fill="#06282a"><path d="M8 5v14l11-7z"/></svg>
        </div>
      </div>
      <div class="bm-ex-info">
        <p class="bm-name">${exName}</p>
        <p class="bm-reps"><i class="fa-solid fa-stopwatch"></i> ${exReps}</p>
        <div class="bm-meta-badges">
          ${exIntensity}
          ${exTempo}
        </div>
        ${exCitation}
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
  if (!overlay || !panel) return;
  overlay.classList.remove('bm-open');
  panel.innerHTML = '';
  activeModalSpot = null;
}

if (isBrowser && overlay) {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
}

if (isBrowser) {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeSuccessModal();
    }
  });
}

// 3. Testimonials Carousel
let currentSlide = 0;
let sliderInterval = null;

function initSlider() {
  if (!isBrowser) return;
  const track = document.getElementById('slider-track');
  const dotsContainer = document.getElementById('slider-dots');
  if (!track || !dotsContainer) return;

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

  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);

  startAutoSlide();

  const wrapper = document.querySelector('.slider-wrapper');
  if (wrapper) {
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
}

function updateSlider() {
  if (!isBrowser) return;
  const track = document.getElementById('slider-track');
  if (!track) return;
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
  const num = Number(idx);
  if (isNaN(num) || !Number.isFinite(num)) return;
  const len = (TESTIMONIAL_IMAGES && TESTIMONIAL_IMAGES.length) ? TESTIMONIAL_IMAGES.length : 1;
  currentSlide = (Math.round(num) % len + len) % len;
  updateSlider();
}

function startAutoSlide() {
  if (!isBrowser) return;
  clearInterval(sliderInterval);
  sliderInterval = setInterval(nextSlide, 4500);
}

// 4. Form Handling & Local Storage
const appForm = isBrowser ? document.getElementById('coaching-application-form') : null;
const successOverlay = isBrowser ? document.getElementById('success-overlay') : null;

if (isBrowser && appForm) {
  appForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const confirmBox = document.getElementById('crit-confirm');
    if (!confirmBox || !confirmBox.checked) {
      alert(currentLang === 'vi' 
        ? 'Vui lòng đánh dấu xác nhận tiêu chí trước khi nộp hồ sơ.' 
        : 'Please confirm the qualification criteria before submitting.');
      if (confirmBox) confirmBox.focus();
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
    if (successOverlay) successOverlay.classList.add('open');
    appForm.reset();
  });
}

function closeSuccessModal() {
  if (successOverlay) successOverlay.classList.remove('open');
}

// 5. Language Switcher
const langBtn = isBrowser ? document.getElementById('lang-toggle-btn') : null;
const currentLangText = isBrowser ? document.getElementById('current-lang-text') : null;

if (isBrowser && langBtn) {
  langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'vi' ? 'en' : 'vi';
    applyLanguage(currentLang);
  });
}


// ==========================================================
// 4. MOBILE DRAWER NAVIGATION CONTROLLER
// ==========================================================
function initMobileDrawer() {
  if (!isBrowser) return;
  const hamburger = document.getElementById('nav-hamburger');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('mobile-drawer-overlay');
  const closeBtn = document.getElementById('drawer-close-btn');
  const drawerLangBtn = document.getElementById('drawer-lang-btn');

  if (hamburger) hamburger.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  if (drawer) {
    drawer.querySelectorAll('.drawer-link').forEach(link => {
      link.addEventListener('click', () => closeDrawer());
    });
  }

  if (drawerLangBtn) {
    drawerLangBtn.addEventListener('click', () => {
      currentLang = currentLang === 'vi' ? 'en' : 'vi';
      applyLanguage(currentLang);
    });
  }

  // Decoupled Escape key listener for accessible drawer dismissal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
    }
  });
}

function openDrawer() {
  if (!isBrowser) return;
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('mobile-drawer-overlay');
  if (drawer) {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
  }
  if (overlay) overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  if (!isBrowser) return;
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('mobile-drawer-overlay');
  if (drawer) {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
  }
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// ==========================================================
// 5. TENDON LOAD CALCULATOR CONTROLLER
// ==========================================================
let lastCalculatorResult = null;

function initCalculator() {
  if (!isBrowser) return;
  const form = document.getElementById('tendon-calculator-form');
  const vasSlider = document.getElementById('calc-vas');
  const vasVal = document.getElementById('calc-vas-val');
  const submitBtn = document.getElementById('calc-submit-btn');
  const resetBtn = document.getElementById('calc-reset-btn');
  const jumpBtn = document.getElementById('calc-jump-video-btn');

  if (vasSlider && vasVal) {
    const updateVasBadge = () => {
      const v = Number(vasSlider.value);
      vasVal.textContent = `${v} / 10`;
      vasVal.className = 'vas-badge';
      if (v <= 3) vasVal.classList.add('vas-mild');
      else if (v <= 6) vasVal.classList.add('vas-mod');
      else vasVal.classList.add('vas-sev');
    };
    vasSlider.addEventListener('input', () => {
      updateVasBadge();
      runCalculator();
    });
    updateVasBadge();
  }

  if (form) {
    form.querySelectorAll('select').forEach(sel => {
      sel.addEventListener('change', () => runCalculator());
    });
  }

  if (submitBtn) {
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      runCalculator();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (form) form.reset();
      if (vasSlider) vasSlider.value = 5;
      if (vasSlider && vasVal) {
        vasVal.textContent = '5 / 10';
        vasVal.className = 'vas-badge vas-mod';
      }
      runCalculator();
    });
  }

  if (jumpBtn) {
    jumpBtn.addEventListener('click', () => {
      if (lastCalculatorResult && lastCalculatorResult.exercise) {
        const ex = lastCalculatorResult.exercise;
        const targetId = ex.catalogId || ex.id;
        if (typeof openVideoModal === 'function') {
          openVideoModal(targetId);
        } else {
          const vidLib = document.getElementById('video-library');
          if (vidLib) vidLib.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  // Initial calculation
  runCalculator();
}

function runCalculator() {
  if (!isBrowser) return;
  const zoneEl = document.getElementById('calc-zone');
  const chronEl = document.getElementById('calc-chronicity');
  const stiffEl = document.getElementById('calc-stiffness');
  const actEl = document.getElementById('calc-activity');
  const vasEl = document.getElementById('calc-vas');
  const latEl = document.getElementById('calc-latency');

  if (!zoneEl || !chronEl || !stiffEl || !actEl || !vasEl || !latEl) return;

  const rawInputs = {
    zone: zoneEl.value,
    chronicity: chronEl.value,
    stiffness: stiffEl.value,
    activity: actEl.value,
    vas: Number(vasEl.value),
    latency: latEl.value
  };

  lastCalculatorResult = CALCULATOR_ENGINE.evaluate(rawInputs);
  updateCalculatorDisplay();
}

function updateCalculatorDisplay() {
  if (!isBrowser || !lastCalculatorResult) return;
  const res = lastCalculatorResult;
  const lang = currentLang;

  // Stage Badge & Description
  const stageEl = document.getElementById('calc-out-stage-title');
  const stageDescEl = document.getElementById('calc-out-stage-desc');
  if (stageEl) {
    stageEl.textContent = lang === 'en' ? res.stageTitleEn : res.stageTitleVi;
    stageEl.className = `diag-val-badge stage-badge stage-${res.stage}`;
  }
  if (stageDescEl) {
    stageDescEl.textContent = lang === 'en' ? res.clinicalMechanismEn : res.clinicalMechanismVi;
  }

  // Phase Badge & Title
  const phaseEl = document.getElementById('calc-out-phase-title');
  if (phaseEl) {
    phaseEl.textContent = lang === 'en' ? res.phaseTitleEn : res.phaseTitleVi;
    phaseEl.className = `diag-val-badge phase-badge phase-${res.startingPhase}`;
  }

  // Exercise Name
  const exNameEl = document.getElementById('calc-out-exercise-name');
  if (exNameEl) {
    if (res.exercise) {
      exNameEl.textContent = lang === 'en' ? (res.exercise.nameEn || res.exercise.name) : (res.exercise.nameVi || res.exercise.name);
    } else {
      exNameEl.textContent = lang === 'en' ? 'Standardized Loading Protocol' : 'Phác đồ nạp tải chuẩn';
    }
  }

  // Prescription Parameters
  const intensityEl = document.getElementById('calc-out-intensity');
  if (intensityEl) intensityEl.textContent = lang === 'en' ? res.intensityEn : res.intensityVi;

  const dosageEl = document.getElementById('calc-out-dosage');
  if (dosageEl) dosageEl.textContent = lang === 'en' ? res.dosageEn : res.dosageVi;

  const tempoEl = document.getElementById('calc-out-tempo');
  if (tempoEl) tempoEl.textContent = res.tempo;

  const freqEl = document.getElementById('calc-out-frequency');
  if (freqEl) freqEl.textContent = lang === 'en' ? res.frequencyEn : res.frequencyVi;

  const restEl = document.getElementById('calc-out-rest');
  if (restEl) restEl.textContent = res.restInterval;

  // Pain Rule & Morning Test & Gatekeeper
  const painRuleEl = document.getElementById('calc-out-pain-rule');
  if (painRuleEl) painRuleEl.textContent = lang === 'en' ? res.painRuleEn : res.painRuleVi;

  const morningTestEl = document.getElementById('calc-out-morning-test');
  if (morningTestEl) morningTestEl.textContent = lang === 'en' ? res.morningTestEn : res.morningTestVi;

  const progEl = document.getElementById('calc-out-progression');
  if (progEl) progEl.textContent = lang === 'en' ? res.gatekeeperTestEn : res.gatekeeperTestVi;

  // Regressions and Progressions
  const regEl = document.getElementById('calc-out-regression');
  if (regEl) {
    if (res.exercise && (res.exercise.regressionEn || res.exercise.regressionVi)) {
      regEl.textContent = lang === 'en' ? res.exercise.regressionEn : res.exercise.regressionVi;
    } else {
      regEl.textContent = lang === 'en' 
        ? 'De-load: Reduce hold duration by 30-50% or perform bodyweight isometric.' 
        : 'Hạ tải: Giảm thời gian giữ 30-50% hoặc gồng tĩnh tự trọng cơ thể.';
    }
  }

  const progStepEl = document.getElementById('calc-out-progression-step');
  if (progStepEl) {
    if (res.exercise && (res.exercise.progressionEn || res.exercise.progressionVi)) {
      progStepEl.textContent = lang === 'en' ? res.exercise.progressionEn : res.exercise.progressionVi;
    } else {
      progStepEl.textContent = lang === 'en'
        ? 'Advancement: Progress load toward 8 RM threshold with strict 3-1-3 cadence.'
        : 'Nâng tải: Tăng mức tạ tiến về ngưỡng 8 RM với nhịp 3-1-3 nghiêm ngặt.';
    }
  }
}

// ==========================================================
// 6. CLINICAL VIDEO LIBRARY & ENHANCED MODAL PLAYER
// ==========================================================
let currentVideoFilter = {
  category: 'all',
  zone: 'all',
  search: ''
};
let activeVideoModalId = null;

function initVideoLibrary() {
  if (!isBrowser) return;
  const searchInput = document.getElementById('video-search-input');
  const searchClear = document.getElementById('video-search-clear');
  const catPills = document.getElementById('video-cat-pills');
  const zoneSelect = document.getElementById('video-zone-filter');
  const resetBtn = document.getElementById('video-reset-filters-btn');
  const modalCloseBtn = document.getElementById('video-modal-close-btn');
  const videoModal = document.getElementById('video-modal');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentVideoFilter.search = String(e?.target?.value || '').toLowerCase().trim();
      renderVideoGrid();
    });
  }

  if (searchClear && searchInput) {
    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      currentVideoFilter.search = '';
      renderVideoGrid();
    });
  }

  if (catPills) {
    catPills.addEventListener('click', (e) => {
      const btn = e.target.closest('.video-cat-btn');
      if (!btn) return;
      catPills.querySelectorAll('.video-cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentVideoFilter.category = btn.getAttribute('data-cat') || 'all';
      renderVideoGrid();
    });
  }

  if (zoneSelect) {
    zoneSelect.addEventListener('change', (e) => {
      currentVideoFilter.zone = e.target.value;
      renderVideoGrid();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      currentVideoFilter = { category: 'all', zone: 'all', search: '' };
      if (searchInput) searchInput.value = '';
      if (zoneSelect) zoneSelect.value = 'all';
      if (catPills) {
        catPills.querySelectorAll('.video-cat-btn').forEach(b => b.classList.remove('active'));
        const first = catPills.querySelector('[data-cat="all"]');
        if (first) first.classList.add('active');
      }
      renderVideoGrid();
    });
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeVideoModal);
  }

  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) closeVideoModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeVideoModal();
      closeDrawer();
    }
  });

  renderVideoGrid();
}

function filterVideos() {
  const { category, zone, search } = currentVideoFilter;
  return VIDEO_LIBRARY_CATALOG.filter(v => {
    // 1. Category filter
    if (category === 'p1' && v.phase !== 'p1') return false;
    if (category === 'p2' && v.phase !== 'p2') return false;
    if (category === 'p3' && v.phase !== 'p3') return false;
    if (category === 'surgical' && v.category !== 'surgical_masterclass' && v.phase !== 'anatomy') return false;
    if (category === 'post_op' && v.category !== 'post_op' && v.phase !== 'post_op') return false;

    // 2. Zone filter
    if (zone !== 'all') {
      const vZone = (v.zone || '').toLowerCase();
      const targetZone = zone.toLowerCase();
      if (vZone !== targetZone && !(targetZone === 'foot' && vZone === 'achilles') && !(targetZone === 'achilles' && vZone === 'foot')) {
        return false;
      }
    }

    // 3. Search query filter
    if (search) {
      const textCorpus = [
        v.title_vi,
        v.title_en,
        v.rationale_vi,
        v.rationale_en,
        v.zone,
        v.phase,
        v.tempo,
        v.id
      ].filter(Boolean).join(' ').toLowerCase();

      if (!textCorpus.includes(search)) return false;
    }

    return true;
  });
}

function renderVideoGrid() {
  if (!isBrowser) return;
  const grid = document.getElementById('video-grid');
  const emptyState = document.getElementById('video-empty-state');
  if (!grid) return;

  const videos = filterVideos();
  grid.innerHTML = '';

  if (videos.length === 0) {
    if (emptyState) emptyState.style.display = 'block';
    return;
  }
  if (emptyState) emptyState.style.display = 'none';

  const lang = currentLang;

  videos.forEach(v => {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.setAttribute('data-id', v.id);

    const title = lang === 'en' ? (v.title_en || v.title_vi) : (v.title_vi || v.title_en);
    const rationale = lang === 'en' ? (v.rationale_en || '') : (v.rationale_vi || '');
    const rationaleSnippet = rationale.length > 130 ? rationale.slice(0, 127) + '...' : rationale;

    let thumbUrl = '';
    if (v.videoUrl && v.videoUrl.includes('youtube.com')) {
      thumbUrl = getYouTubeThumbnail(v.videoUrl);
    } else {
      thumbUrl = 'https://assets.cdn.filesafe.space/7RV9Hg6yzbZa9Xa7wzoN/media/6a9eb0e8bcef8b5f2c245ad6.jpg';
    }

    let phaseBadgeText = '';
    let phaseClass = v.phase || 'p1';
    if (v.category === 'surgical_masterclass' || v.phase === 'anatomy') {
      phaseBadgeText = lang === 'en' ? 'Surgical Anatomy' : 'Giải Phẫu Ngoại Khoa';
      phaseClass = 'surgical';
    } else if (v.category === 'post_op' || v.phase === 'post_op') {
      phaseBadgeText = lang === 'en' ? 'Post-Op Osteosynthesis' : 'Sau Mổ & Kết Xương';
      phaseClass = 'postop';
    } else if (v.phase === 'p1') {
      phaseBadgeText = lang === 'en' ? 'P1 Isometric' : 'GĐ 1: Gồng Tĩnh';
    } else if (v.phase === 'p2') {
      phaseBadgeText = lang === 'en' ? 'P2 HSR' : 'GĐ 2: Kháng Lực Chậm';
    } else if (v.phase === 'p3') {
      phaseBadgeText = lang === 'en' ? 'P3 Elastic / End-Range' : 'GĐ 3: Đàn Hồi & Góc Tận';
    }

    const zoneLabel = v.zone ? v.zone.toUpperCase() : 'GENERAL';

    card.innerHTML = `
      <div class="video-card-thumb-wrap">
        <img src="${thumbUrl}" alt="${title}" class="video-card-thumb" loading="lazy">
        <div class="video-play-overlay">
          <i class="fa-solid fa-circle-play"></i>
        </div>
        <span class="video-duration-chip">${v.duration || '04:00'}</span>
      </div>
      <div class="video-card-content">
        <div class="video-card-meta">
          <span class="video-phase-badge ${phaseClass}">${phaseBadgeText}</span>
          <span class="video-zone-badge"><i class="fa-solid fa-tag"></i> ${zoneLabel}</span>
        </div>
        <h4 class="video-card-title">${title}</h4>
        <p class="video-card-rationale">${rationaleSnippet}</p>
        <div class="video-card-footer">
          <button type="button" class="btn-video-watch">
            <i class="fa-solid fa-play"></i> <span>${lang === 'en' ? 'Watch Guide' : 'Xem Video'}</span>
          </button>
        </div>
      </div>
    `;

    card.addEventListener('click', () => openVideoModal(v.id));
    grid.appendChild(card);
  });
}

function openVideoModal(videoId) {
  if (!isBrowser) return;
  const modal = document.getElementById('video-modal');
  if (!modal) return;

  const targetId = resolveVideoId(videoId);
  const video = VIDEO_LIBRARY_CATALOG.find(v => v.id === targetId || v.id === videoId || (v.aliases && v.aliases.includes(videoId)));
  if (!video) return;
  activeVideoModalId = video.id;

  const lang = currentLang;
  const title = lang === 'en' ? (video.title_en || video.title_vi) : (video.title_vi || video.title_en);
  const rationale = lang === 'en' ? (video.rationale_en || '') : (video.rationale_vi || '');
  const errors = lang === 'en' ? (video.common_errors_en || []) : (video.common_errors_vi || []);
  const regression = lang === 'en' ? (video.regression_en || '') : (video.regression_vi || '');
  const progression = lang === 'en' ? (video.progression_en || '') : (video.progression_vi || '');

  // Modal Title & Badge
  const titleEl = document.getElementById('vmodal-title');
  const badgeEl = document.getElementById('vmodal-badge');
  if (titleEl) titleEl.textContent = title;
  if (badgeEl) {
    if (video.category === 'surgical_masterclass') {
      badgeEl.textContent = lang === 'en' ? 'Surgical Anatomy Masterclass' : 'Giải Phẫu Ngoại Khoa Chuyên Sâu';
    } else if (video.category === 'post_op' || video.phase === 'post_op') {
      badgeEl.textContent = lang === 'en' ? 'Post-Op Osteosynthesis Rehab' : 'Phục Hồi Sau Mổ & Kết Xương';
    } else {
      badgeEl.textContent = (video.phase || 'p1').toUpperCase() + ' • ' + (video.zone || '').toUpperCase();
    }
  }

  // Video Player Frame (YouTube embed or HTML5)
  const playerContainer = document.getElementById('vmodal-player-container');
  if (playerContainer) {
    playerContainer.innerHTML = '';
    if (video.videoUrl && video.videoUrl.includes('youtube.com')) {
      const embedUrl = getYouTubeEmbedUrl(video.videoUrl);
      const iframe = document.createElement('iframe');
      iframe.id = 'vmodal-iframe';
      iframe.src = `${embedUrl}?enablejsapi=1&autoplay=1`;
      iframe.setAttribute('allowfullscreen', 'true');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      playerContainer.appendChild(iframe);
    } else if (video.videoUrl && video.videoUrl.startsWith('local://')) {
      const videoEl = document.createElement('video');
      videoEl.id = 'vmodal-html5';
      videoEl.controls = true;
      videoEl.autoplay = true;
      videoEl.style.width = '100%';
      videoEl.style.height = '100%';
      const source = document.createElement('source');
      source.src = video.videoUrl.replace('local://', '');
      source.type = 'video/mp4';
      videoEl.appendChild(source);
      playerContainer.appendChild(videoEl);
    } else {
      playerContainer.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#fff;"><p>Video Demonstration</p></div>`;
    }
  }

  // Interactive Timestamp Cue Chips
  const tsContainer = document.getElementById('vmodal-timestamps');
  if (tsContainer) {
    tsContainer.innerHTML = '';
    const timestamps = video.timestamps || [];
    timestamps.forEach(ts => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'ts-chip';
      const label = lang === 'en' ? (ts.label_en || ts.label_vi) : (ts.label_vi || ts.label_en);
      chip.innerHTML = `<i class="fa-solid fa-play" style="font-size:0.65rem;"></i> <strong>${ts.time}</strong> ${label}`;
      chip.addEventListener('click', () => jumpVideoTimestamp(ts.timeSec));
      tsContainer.appendChild(chip);
    });
  }

  // Rationale
  const ratEl = document.getElementById('vmodal-rationale');
  if (ratEl) ratEl.textContent = rationale;

  // Common Errors
  const errList = document.getElementById('vmodal-errors');
  if (errList) {
    errList.innerHTML = '';
    errors.forEach(err => {
      const li = document.createElement('li');
      li.textContent = err;
      errList.appendChild(li);
    });
  }

  // Regressions and Progressions
  const regEl = document.getElementById('vmodal-regression');
  if (regEl) regEl.textContent = regression || (lang === 'en' ? 'De-load: Reduce volume and intensity.' : 'Hạ tải: Giảm thời gian và cường độ tải.');

  const progEl = document.getElementById('vmodal-progression');
  if (progEl) progEl.textContent = progression || (lang === 'en' ? 'Advancement: Increase resistance and tempo.' : 'Nâng tải: Tăng kháng lực và tuân thủ nhịp điệu.');

  // Surgical Correlate Link
  const surgWrap = document.getElementById('vmodal-surgical-wrap');
  const surgText = document.getElementById('vmodal-surgical-text');
  const surgBtn = document.getElementById('vmodal-surgical-btn');
  if (surgWrap && surgText && surgBtn) {
    if (video.surgical_correlate) {
      surgWrap.style.display = 'flex';
      surgText.textContent = video.surgical_correlate;
      surgBtn.onclick = () => {
        // Find matching surgical masterclass
        const match = VIDEO_LIBRARY_CATALOG.find(v => v.filename === video.surgical_correlate || (v.videoUrl && v.videoUrl.includes(video.surgical_correlate)));
        if (match) {
          openVideoModal(match.id);
        } else {
          alert((lang === 'en' ? 'Surgical masterclass file: ' : 'Video giải phẫu: ') + video.surgical_correlate);
        }
      };
    } else {
      surgWrap.style.display = 'none';
    }
  }

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function updateVideoModalContent() {
  if (activeVideoModalId) {
    openVideoModal(activeVideoModalId);
  }
}

function closeVideoModal() {
  if (!isBrowser) return;
  const modal = document.getElementById('video-modal');
  if (!modal) return;
  const playerContainer = document.getElementById('vmodal-player-container');
  if (playerContainer) playerContainer.innerHTML = '';
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  activeVideoModalId = null;
}

function jumpVideoTimestamp(timeSec) {
  if (!isBrowser) return;
  const sec = Number(timeSec);
  const safeSec = Number.isFinite(sec) ? Math.max(0, sec) : 0;

  const iframe = document.getElementById('vmodal-iframe');
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.postMessage(JSON.stringify({
      event: 'command',
      func: 'seekTo',
      args: [safeSec, true]
    }), '*');
  }

  const video = document.getElementById('vmodal-html5');
  if (video) {
    video.currentTime = safeSec;
    if (typeof video.play === 'function') {
      const p = video.play();
      if (p && typeof p.catch === 'function') {
        p.catch(() => {});
      }
    }
  }
}

// ==========================================================
// 7. UPGRADED BILINGUAL LOCALIZATION CONTROLLER
// ==========================================================
function applyLanguage(lang) {
  currentLang = lang;
  if (!isBrowser) return;

  const currentLangText = document.getElementById('current-lang-text');
  if (currentLangText) currentLangText.innerText = lang === 'vi' ? 'EN' : 'VI';

  const drawerLangText = document.getElementById('drawer-lang-text');
  if (drawerLangText) drawerLangText.innerText = lang === 'vi' ? 'EN' : 'VI';

  document.documentElement.lang = lang;

  // 1. Text Content with HTML tags preservation
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const trans = (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || (TRANSLATIONS['vi'] && TRANSLATIONS['vi'][key]);
    if (trans !== undefined) {
      if (/<[a-z][sS]*>/i.test(trans)) {
        el.innerHTML = trans;
      } else {
        el.textContent = trans;
      }
    }
  });

  // 2. Placeholders [data-i18n-placeholder]
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const trans = (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || (TRANSLATIONS['vi'] && TRANSLATIONS['vi'][key]);
    if (trans) el.setAttribute('placeholder', trans);
  });

  // 3. Title attributes [data-i18n-title]
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    const trans = (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || (TRANSLATIONS['vi'] && TRANSLATIONS['vi'][key]);
    if (trans) el.setAttribute('title', trans);
  });

  // 4. Aria labels [data-i18n-aria]
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria');
    const trans = (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || (TRANSLATIONS['vi'] && TRANSLATIONS['vi'][key]);
    if (trans) el.setAttribute('aria-label', trans);
  });

  // 5. Select options with data-i18n
  document.querySelectorAll('select option[data-i18n]').forEach(opt => {
    const key = opt.getAttribute('data-i18n');
    const trans = (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || (TRANSLATIONS['vi'] && TRANSLATIONS['vi'][key]);
    if (trans) opt.textContent = trans;
  });

  // 6. Dynamic components re-rendering
  if (typeof renderHotspots === 'function') renderHotspots();
  if (activeModalSpot && typeof renderModalContent === 'function') renderModalContent();
  if (typeof updateCalculatorDisplay === 'function') updateCalculatorDisplay();
  if (typeof renderVideoGrid === 'function') renderVideoGrid();
  if (activeVideoModalId && typeof updateVideoModalContent === 'function') updateVideoModalContent();
}

// ==========================================
// PWA SERVICE WORKER & APP INSTALL PROMOTION
// ==========================================
let deferredPrompt = null;

function initPWA() {
  if (!isBrowser) return;

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(err => {
        console.warn('ServiceWorker registration error:', err);
      });
    });
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const banner = document.getElementById('pwa-install-banner');
    const headerBtn = document.getElementById('header-install-btn');
    const drawerBtn = document.getElementById('drawer-install-btn');
    if (banner) banner.style.display = 'flex';
    if (headerBtn) headerBtn.style.display = 'inline-flex';
    if (drawerBtn) drawerBtn.style.display = 'flex';
  });

  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    const banner = document.getElementById('pwa-install-banner');
    const headerBtn = document.getElementById('header-install-btn');
    const drawerBtn = document.getElementById('drawer-install-btn');
    if (banner) banner.style.display = 'none';
    if (headerBtn) headerBtn.style.display = 'none';
    if (drawerBtn) drawerBtn.style.display = 'none';
  });

  const pwaInstallBtn = document.getElementById('pwa-install-btn');
  if (pwaInstallBtn) {
    pwaInstallBtn.addEventListener('click', triggerPWAInstall);
  }
  const headerInstallBtn = document.getElementById('header-install-btn');
  if (headerInstallBtn) {
    headerInstallBtn.addEventListener('click', triggerPWAInstall);
  }
  const pwaDismissBtn = document.getElementById('pwa-dismiss-btn');
  if (pwaDismissBtn) {
    pwaDismissBtn.addEventListener('click', () => {
      const banner = document.getElementById('pwa-install-banner');
      if (banner) banner.style.display = 'none';
    });
  }
}

function triggerPWAInstall() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        const banner = document.getElementById('pwa-install-banner');
        if (banner) banner.style.display = 'none';
      }
      deferredPrompt = null;
    });
  } else {
    alert(currentLang === 'vi' 
      ? 'Để cài đặt ứng dụng: Trên Chrome/Edge máy tính, bấm biểu tượng Cài đặt trên thanh địa chỉ hoặc Menu ⋮ -> "Cài đặt ứng dụng". Trên Safari iPhone/iPad, bấm nút Chia sẻ -> "Thêm vào Màn hình chính".' 
      : 'To install the app: On Chrome/Edge desktop, click the Install icon in the address bar or Menu ⋮ -> "Install app". On iOS Safari, tap Share -> "Add to Home Screen".');
  }
}

// ==========================================
// TABBED SINGLE-PAGE ARCHITECTURE NAVIGATION
// ==========================================
function switchMainTab(tabId) {
  if (!isBrowser) return;
  const cleanId = String(tabId || '').replace(/^#/, '').replace(/^tab-/, '');
  const targetId = cleanId || 'body-map';

  // 1. Switch Active Section Pane
  const panes = document.querySelectorAll('.app-tab-pane');
  let matched = false;
  panes.forEach(pane => {
    if (pane.id === targetId) {
      pane.classList.add('active');
      matched = true;
    } else {
      pane.classList.remove('active');
    }
  });

  if (!matched) {
    const fallback = document.getElementById('body-map');
    if (fallback) fallback.classList.add('active');
  }

  // 2. Synchronize Desktop Top Tab Buttons
  document.querySelectorAll('.app-top-tabs .nav-tab-btn').forEach(btn => {
    const target = btn.getAttribute('data-tab-target');
    if (target === targetId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // 3. Synchronize Mobile Segmented Bar Buttons
  document.querySelectorAll('.mobile-segmented-bar .seg-btn').forEach(btn => {
    const target = btn.getAttribute('data-tab');
    if (target === targetId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // 4. Synchronize Mobile Drawer Links
  document.querySelectorAll('.drawer-nav .drawer-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === `#tab-${targetId}` || href === `#${targetId}`) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // 5. Smooth Scroll to Top
  try {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (e) {
    window.scrollTo(0, 0);
  }

  // 6. Update URL Hash without Page Reload
  if (window.history && window.history.replaceState) {
    window.history.replaceState(null, null, '#' + targetId);
  }
}

function initTabNavigation() {
  if (!isBrowser) return;

  // Handle URL Hash Deep Linking
  const hash = window.location.hash;
  if (hash) {
    const tabFromHash = hash.replace(/^#/, '').replace(/^tab-/, '');
    const validTabs = ['body-map', 'calculator', 'framework', 'post-op', 'video-library', 'science', 'testimonials', 'apply'];
    if (validTabs.includes(tabFromHash)) {
      switchMainTab(tabFromHash);
    }
  }

  // Listen to popstate / hashchange for back/forward navigation
  window.addEventListener('hashchange', () => {
    const newHash = window.location.hash.replace(/^#/, '').replace(/^tab-/, '');
    if (newHash) {
      switchMainTab(newHash);
    }
  });
}

// Helper to navigate to Video Library filtered by Post-Op
function viewPostOpVideos() {
  if (typeof switchMainTab === 'function') {
    switchMainTab('video-library');
  }
  if (!isBrowser) return;
  setTimeout(() => {
    const catPills = document.getElementById('video-cat-pills');
    if (catPills) {
      const btn = catPills.querySelector('[data-cat="post_op"]');
      if (btn) btn.click();
    }
  }, 100);
}

// ==========================================
// AO POST-OPERATIVE EVALUATOR INTERACTIVE UI
// ==========================================
let lastPostOpResult = null;

function initPostOpEvaluator() {
  if (!isBrowser) return;
  const surgSelect = document.getElementById('postop-surgery-select');
  const timeSelect = document.getElementById('postop-time-select');
  const vasSlider = document.getElementById('postop-vas-slider');
  const vasVal = document.getElementById('postop-vas-val');
  const evalBtn = document.getElementById('postop-eval-btn');
  const videoBtn = document.getElementById('postop-res-video-btn');

  if (vasSlider && vasVal) {
    const updateVas = () => {
      const v = Number(vasSlider.value);
      vasVal.textContent = v + ' / 10';
      vasVal.className = 'vas-badge';
      if (v <= 3) vasVal.classList.add('vas-mild');
      else if (v <= 6) vasVal.classList.add('vas-mod');
      else vasVal.classList.add('vas-sev');
    };
    vasSlider.addEventListener('input', () => {
      updateVas();
      runPostOpEvaluation();
    });
    updateVas();
  }

  if (surgSelect) {
    surgSelect.addEventListener('change', runPostOpEvaluation);
  }
  if (timeSelect) {
    timeSelect.addEventListener('change', runPostOpEvaluation);
  }
  if (evalBtn) {
    evalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      runPostOpEvaluation();
    });
  }

  if (videoBtn) {
    videoBtn.addEventListener('click', () => {
      if (lastPostOpResult && lastPostOpResult.videoTargetId) {
        if (typeof openVideoModal === 'function') {
          openVideoModal(lastPostOpResult.videoTargetId);
        }
      }
    });
  }

  // Initial evaluation
  runPostOpEvaluation();
}

function runPostOpEvaluation() {
  if (!isBrowser) return;
  const surgSelect = document.getElementById('postop-surgery-select');
  const timeSelect = document.getElementById('postop-time-select');
  const vasSlider = document.getElementById('postop-vas-slider');

  if (!surgSelect || !timeSelect || !vasSlider) return;

  const rawInputs = {
    surgery: surgSelect.value,
    time: timeSelect.value,
    vas: Number(vasSlider.value)
  };

  lastPostOpResult = AO_POSTOP_ENGINE.evaluate(rawInputs);
  updatePostOpDisplay();
}

function updatePostOpDisplay() {
  if (!isBrowser || !lastPostOpResult) return;
  const res = lastPostOpResult;
  const lang = currentLang;

  const surgNameEl = document.getElementById('postop-out-surgery-name');
  if (surgNameEl) surgNameEl.textContent = lang === 'en' ? res.surgeryNameEn : res.surgeryNameVi;

  const stabEl = document.getElementById('postop-out-stability');
  if (stabEl) stabEl.textContent = lang === 'en' ? res.stabilityPrincipleEn : res.stabilityPrincipleVi;

  const healEl = document.getElementById('postop-out-healing');
  if (healEl) healEl.textContent = lang === 'en' ? res.healingModeEn : res.healingModeVi;

  const wbEl = document.getElementById('postop-out-wb');
  if (wbEl) wbEl.textContent = lang === 'en' ? res.wbEn : res.wbVi;

  const romEl = document.getElementById('postop-out-rom');
  if (romEl) romEl.textContent = lang === 'en' ? res.romEn : res.romVi;

  const rxEl = document.getElementById('postop-out-rx');
  if (rxEl) rxEl.textContent = lang === 'en' ? res.rxEn : res.rxVi;

  const contraEl = document.getElementById('postop-out-contra');
  if (contraEl) contraEl.textContent = lang === 'en' ? res.contraEn : res.contraVi;

  // Warning Banner for Safety Downgrade
  const warnEl = document.getElementById('postop-safety-warning');
  if (warnEl) {
    if (res.isSafetyDowngraded) {
      warnEl.style.display = 'flex';
      const warnText = warnEl.querySelector('.warn-text');
      if (warnText) {
        warnText.textContent = lang === 'en'
          ? "Safety Override: VAS Pain/Effusion >= 7/10 detected. Weight-bearing is temporarily restricted to Phase 1 (NWB/TDWB) to protect hardware fixation."
          : "Cảnh Báo An Toàn: Điểm đau/phù nề VAS >= 7/10. Hệ thống tạm thời hạ tải về Giai Đoạn 1 (NWB/TDWB) để bảo vệ nẹp vít.";
      }
    } else {
      warnEl.style.display = 'none';
    }
  }
}

// Global browser window assignment
if (typeof window !== 'undefined') {
  window.viewPostOpVideos = viewPostOpVideos;
  window.switchMainTab = switchMainTab;
  window.triggerPWAInstall = triggerPWAInstall;
  window.initPWA = initPWA;
  window.initTabNavigation = initTabNavigation;
  window.runPostOpEvaluation = runPostOpEvaluation;
  window.initPostOpEvaluator = initPostOpEvaluator;
}

// Initialize on Load in Browser
if (isBrowser) {
  document.addEventListener('DOMContentLoaded', () => {
    renderHotspots();
    initSlider();
    initMobileDrawer();
    initCalculator();
    initVideoLibrary();
    initPostOpEvaluator();
    initTabNavigation();
    initPWA();
  });
}

// Node.js Module Export for Tests and Downstream Runners
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    viewPostOpVideos,
    TRANSLATIONS,
    DOTS,
    EXERCISE_DATA,
    CALCULATOR_ENGINE,
    calculateTendonLoad,
    AO_POSTOP_ENGINE,
    evaluateAOPostOp,
    initPostOpEvaluator,
    runPostOpEvaluation,
    VIDEO_LIBRARY_CATALOG,
    initCalculator,
    runCalculator,
    initVideoLibrary,
    renderVideoGrid,
    openVideoModal,
    closeVideoModal,
    initMobileDrawer,
    openDrawer,
    closeDrawer,
    applyLanguage,
    resolveVideoId,
    EXERCISE_TO_CATALOG_ID_MAP,
    switchMainTab,
    initTabNavigation,
    initPWA,
    triggerPWAInstall,
    getYouTubeEmbedUrl,
    getYouTubeThumbnail
  };
}
