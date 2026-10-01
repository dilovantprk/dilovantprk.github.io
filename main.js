/* ==========================================================================
   CONFIGURATION & CUSTOM ENDPOINTS
   ========================================================================== */
const CONFIG = {
    // To use a service like Formspree or Web3Forms, enter your endpoint URL here.
    // If left empty, the contact form falls back to a clean client-side clipboard copy & mailto flow.
    formEndpoint: ""
};

/* ==========================================================================
   TRANSLATIONS DICTIONARY
   ========================================================================== */
const translations = {
    tr: {
        "nav.home": "Selam",
        "nav.projects": "Projeler",
        "nav.experience": "Geçmiş",
        "nav.skills": "Yetiler",
        "nav.contact": "İletişim",
        
        "hero.greeting": "Selam, ben",
        "hero.greeting_prefix": "Selam",
        "hero.greeting_suffix": "ben",
        "hero.desc": "Anlam ve form arasında bir yerlerde çalışıyorum. Düşünce sistemlerini arayüzlere, soyut modelleri çalışan ürünlere dönüştürüyorum. Bıraktığım şeyin estetik olması gerektiğine inanıyorum.",
        "hero.cta_projects": "Projelerimi Gör",
        "hero.cta_contact": "İletişime Geç",
        
        "projects.tag": "Projeler",
        "projects.title": "İşlerim",
        "projects.desc": "Ayinesi iştir kişinin, lafa bakılmaz.",
        "projects.more_details": "Detayları Gör",
        
        "projects.aura.category": "Wellness / Web App",
        "projects.aura.summary": "Bir dönem her şey üstüme geliyor gibiydi. Nefes almayı yeniden öğrenmem gerekiyordu... Araştırdım, denedim, işe yarayanları aktardım. Arkadaşlarımla paylaşmak isteyince de bu projeye evrildi.",
        
        "projects.sosyal.category": "Social / Web App",
        "projects.sosyal.summary": "Bir lise öğrencisinin okulu tüm dünyasıdır nerdeyse. STTFL o dünyanın hafızası — kuşaktan kuşağa aktarılan bir okul kültürü arşivi. Envai çeşit sosyal medya platformu varken STTFL farklı bir şey yapıyor: herkese eşit söz hakkı tanıyor. Öğrenci de mezun da öğretmen de. Okuldaki güç ilişkilerini sözlük formatıyla ters yüz ediyor — öğrencilere kurtarılmış bir bölge açıyor.",
        
        "projects.yazareser.category": "Education / Mobile App",
        "projects.yazareser.summary": "AYT Edebiyat sınavına hazırlanırken kapsamlı bir kaynak bulamayınca kendi verimi kendim derledim. 1.799 doğrulanmış kartlık bir veri havuzunu; aralıklı tekrar algoritmaları ve oyun modlarıyla birleştiren, öğrenim sürecini kolaylaştıran bir mobil uygulamaya dönüştürdüm.",

        "projects.ekotakippro.category": "Climate Tech / Web App",
        "projects.ekotakippro.summary": "Türkiye sanayi emisyonları, kurumsal iklim beyannameleri ve 4-kategorili kurumsal etkinlik karbon hesaplayıcısını tek çatı altında toplayan, %100 gizlilik odaklı (Zero-PII) iklim ve karbon yönetim portalı.",

        "projects.adnet.category": "Sürdürülebilirlik / Web App",
        "projects.adnet.summary": "Adnet Türkiye için bir karbon emisyon portalı geliştirdim — kurumsal karbon ayak izi verilerini görselleştiren bir web arayüzü.",

        "projects.aradapay.category": "Android & FinTech",
        "projects.aradapay.summary": "Grup harcamalarını Cross-Settlement DFS graf algoritmalarıyla optimize eden, Merkle Ağacı ile kriptografik dekontlar üreten Material 3 Android finans platformu.",

        "projects.other.category": "Keşfet / Arşiv",
        "projects.other.title": "Diğer Projeler",
        "projects.other.summary": "STTFL Mezun Topluluğu ve YazarEser Android projelerini gör.",
        "projects.other.action": "Projeleri Gör",
        "projects.otherToggle": "Diğer Projeler",
        "projects.otherToggle_less": "Daha Az Göster",
        
        "timeline.tag": "Geçmiş",
        "timeline.title": "Geçtiğim Yerler",
        "timeline.desc": "Yollar ve duraklar",
        
        "timeline.iu.title": "Hukuk Lisansı",
        "timeline.iu.org": "İstanbul Üniversitesi",
        "timeline.iu.loc": "İstanbul, Türkiye (Devam Ediyor)",
        "timeline.iu.desc": "Hukuk nosyonu, normatif düşünce ve kural koyucu sistemlerin mantığı üzerine lisans eğitimi.",

        "timeline.boun.title": "Felsefe Lisansı",
        "timeline.boun.org": "Boğaziçi Üniversitesi",
        "timeline.boun.loc": "İstanbul, Türkiye (Ayrıldı)",
        "timeline.boun.desc": "Bölümden çok okul değiştirdi beni. Farklı arka planlardan, birbirinden zeki insanlarla olan etkileşimlerim hiçbir derste öğrenemeyeceğim şeyler öğretti. Bölüm ise arzu, anlam ve iletişimin doğasını düşünebilmemi sağlayan araçlar verdi bana.",
        
        "timeline.bued.title": "Yürütme Kurulu Üyesi",
        "timeline.bued.org": "Boğaziçi Üni. Edebiyat Kulübü",
        "timeline.bued.loc": "İstanbul, Türkiye",
        "timeline.bued.desc": "Tanıtım postundan konuk iletişimine kadar her adıma şahitlik edip çoğunda görev aldım. İnsanları bir araya getirmenin, ekipçe çalışmanın kolay olmadığını ama her şeye rağmen hakkıyla düzenlenen bir etkinliğin insanın tüm yorgunluğunu aldığını gördüm.",
        
        "timeline.cedid.title": "Erasmus+ Öğrenci Koordinatörü",
        "timeline.cedid.org": "Cedid Sivil Toplum Kuruluşu",
        "timeline.cedid.loc": "Türkiye",
        "timeline.cedid.desc": "Türkiye'ye gelen uluslararası öğrencilerle etkinliklerde bir aradaydık. Farklı ülkelerden, farklı dillerden insanlarla ortak bir zemin yakalamak düşündüğünden çok daha kolay oluyor — ve tam o anda büyük insanlık idealini hissedebiliyorsun.",
        
        "timeline.siirt.title": "Fen Lisesi",
        "timeline.siirt.org": "Siirt Türk Telekom Fen Lisesi",
        "timeline.siirt.loc": "Siirt, Türkiye (Mezun)",
        "timeline.siirt.desc": "Lise yıllarımdaki en büyük merakım sinemayaydı; arkadaşlarımla kısa filmler çekerdik. Koronavirüs her şeyi durdurdu ve evlere kapandık. O sessizlikte felsefeye ve bilime olan merakımı keşfettim — öğrendiklerimi başkalarıyla paylaşmaya can atıyordum. İki arkadaşımla bir web sitesi ve sosyal medya açtık. Web tasarımıyla ve içerik tasarımıyla ilk karşılaşmam o döneme denk geliyor.",
        
        "timeline.ucondort.title": "Kurucu & Editör",
        "timeline.ucondort.org": "Üç On Dört",
        "timeline.ucondort.desc": "Teknik becerilerden çok bir şey öğretti bana bu proje: koordinasyon içinde, aylarca düzenli üretmeye devam edebilmek. Sürekliliği bu dönemde keşfettim.",
        "timeline.ucondort.date": "Haziran 2019",
        "timeline.siirt.date": "2019 - 2023",
        "timeline.cedid.date": "2023 - 2024",
        "timeline.bued.date": "2024 - 2026",
        "timeline.boun.date": "2024 - 2026",
        "timeline.iu.date": "2026 - Günümüz",
        
        "skills.tag": "Yetiler",
        "skills.title": "Elimden Gelenler & Ürettiklerim",
        "skills.desc": "Gözüm harmoniyi arıyor; kararlarımı teknik ezberlerden çok şeylerin bana hissettirdikleri yönlendiriyor. Araçların kendisi değil, ortaya çıkan ürünün ruhu ve insanla kurduğu bağ önemli.",
        "skills.cat1": "Çalışan Dijital Ürünler",
        "skills.tech_badge1": "Uçtan Uca Geliştirme",
        "skills.tech_name1": "Fikirden canlıya; mimarisi ve arayüzüyle yaşayan web ve mobil ürünleri.",
        "skills.tech_badge2": "Sade ve Güvenli Akışlar",
        "skills.tech_name2": "Kullanıcıyı yormayan ödeme, emanet ve işlem mekanizmaları.",
        "skills.tech_badge3": "Kalıcı Mimariler",
        "skills.tech_name3": "Arkasında sağlam veri modelleri barındıran dayanıklı yapılar.",
        
        "skills.cat2": "Dokunsal Arayüzler & Ritim",
        "skills.design_badge1": "Tipografik Ritim",
        "skills.design_name1": "Şablonlara sığınmayan, her işin ruhuna özel editoryal ve görsel denge.",
        "skills.design_badge2": "Canlı Etkileşimler",
        "skills.design_name2": "Soğuk pikseller yerine parmak ucunda yaşayan, akıcı ve dokunsal geçişler.",
        "skills.design_badge3": "Sezgisel Yolculuklar",
        "skills.design_name3": "Kullanıcıyı boğmayan, nereye gideceğini hissettiren sakin akışlar.",
        
        "skills.cat3": "Düşünce, Süreç & Üretim",
        "skills.thought_badge1": "Kavramsal Derinlik",
        "skills.thought_name1": "Hukuk ve felsefeden süzülen normatif mantık ve analitik kurgu.",
        "skills.thought_badge2": "Topluluk ve Yayıncılık",
        "skills.thought_name2": "İnsanları ortak paydada buluşturan üretim ve yayıncılık disiplini.",
        "skills.thought_badge3": "Kültürlerarası İletişim",
        "skills.thought_name3": "Farklı disiplinler ve diller arasında empatiye dayalı akıcı diyalog.",
        
        "contact.tag": "İletişim",
        "contact.title": "Gel, Bir Şey(ler) Yapalım",
        "contact.desc": "Deneysel projeler ya da sivil toplum alanında birlikte bir şey üretmek istiyorsan konuşalım. İnsan odaklı işler beni heyecanlandırıyor.",
        "contact.panel_title": "İletişim Bilgileri",
        "contact.panel_desc": "Bana buralardan ulaşabilirsin.",
        "contact.method_mail": "E-posta Gönder",
        "contact.method_telegram": "Telegram'dan Yaz",
        "contact.method_github": "GitHub'da İncele",
        "contact.method_linkedin": "LinkedIn'den Bağlan",
        "contact.method_phone": "Telefon Et",
        "contact.method_loc": "Konum",
        "contact.method_loc_val": "İstanbul, Türkiye",
        
        "contact.form_name": "Adınız Soyadınız",
        "contact.form_name_placeholder": "Örn. Ahmet Yılmaz",
        "contact.form_email": "E-posta Adresiniz",
        "contact.form_email_placeholder": "Örn. ahmet@mail.com",
        "contact.form_subject": "Konu",
        "contact.form_subject_placeholder": "Mesajınızın konusu nedir?",
        "contact.form_message": "Mesajınız",
        "contact.form_message_placeholder": "Sizinle nasıl iş birliği yapabiliriz?",
        "contact.form_btn": "Gönder",
        
        "contact.error_name": "Lütfen isminizi girin.",
        "contact.error_email": "Geçerli bir e-posta adresi girin.",
        "contact.error_subject": "Lütfen bir konu belirtin.",
        "contact.error_message": "Lütfen mesajınızı yazın.",
        
        "contact.form_sending": "Gönderiliyor...",
        "contact.form_success": "Mesajınız başarıyla iletildi! En kısa sürede dönüş yapacağım.",
        "contact.form_error": "Gönderim sırasında hata oluştu.",
        
        "footer.loop_back": "Döngüyü Tamamla (Başa Dön)",
        "footer.copyright": "© 2026 Mehmet Dilovan Toprak. Tüm hakları saklıdır.",
        "footer.design": "",
        
        "modal.role": "Rolüm",
        "modal.duration": "Süre",
        "modal.tech": "Teknolojiler",
        "modal.about": "Proje Hakkında",
        "modal.code_review": "Kodları İncele",
        "modal.live_site": "Siteyi Aç",
        "modal.apk_download": "APK İndir",
        "modal.screenshots": "Ekran Görüntüleri"
    },
    en: {
        "nav.home": "Home",
        "nav.projects": "Projects",
        "nav.experience": "Past",
        "nav.skills": "Skills",
        "nav.contact": "Contact",
        
        "hero.greeting": "Hi, I'm",
        "hero.greeting_prefix": "Hi",
        "hero.greeting_suffix": "here",
        "hero.desc": "I work somewhere between meaning and form. I translate thought systems into interfaces and abstract models into working products. I believe whatever I leave behind should be beautiful.",
        "hero.cta_projects": "View My Work",
        "hero.cta_contact": "Get In Touch",
        
        "projects.tag": "Projects",
        "projects.title": "Selected Projects",
        "projects.desc": "Work tells you more about a person than any introduction. Here's mine.",
        "projects.more_details": "View Details",
        
        "projects.aura.category": "Wellness / Web App",
        "projects.aura.summary": "For a while, everything felt like it was closing in on me. I needed to relearn how to breathe... I researched, experimented, and transferred what worked. When I wanted to share it with friends, it evolved into this project.",
        
        "projects.sosyal.category": "Social / Web App",
        "projects.sosyal.summary": "For a high school student, school is almost the whole world. STTFL is that world's memory — an archive of school culture passed from generation to generation. With countless social media platforms out there, STTFL does something different: it gives everyone an equal voice. Student, alumni, teacher alike. It turns the school's power dynamics upside down with the sözlük format — opening a liberated space for students.",
        
        "projects.yazareser.category": "Education / Mobile App",
        "projects.yazareser.summary": "When I couldn't find a comprehensive source while preparing for the AYT Literature exam, I compiled my own data. I transformed a database of 1,799 verified cards into a mobile app that facilitates the learning process by combining spaced repetition algorithms and game modes.",

        "projects.ekotakippro.category": "Climate Tech / Web App",
        "projects.ekotakippro.summary": "A 100% privacy-focused (Zero-PII) climate and carbon management portal bringing together Turkey's industrial emissions, corporate climate declarations, and a 4-category corporate event carbon calculator.",

        "projects.adnet.category": "Sustainability / Web App",
        "projects.adnet.summary": "I built a carbon emission portal for Adnet Turkey — a web interface that visualizes corporate carbon footprint data.",

        "projects.aradapay.category": "Android & FinTech",
        "projects.aradapay.summary": "A next-gen Material 3 Android fintech platform optimizing group expenses via Cross-Settlement DFS graph algorithms and generating cryptographic Merkle Tree receipts.",

        "projects.other.category": "Explore / Archive",
        "projects.other.title": "Other Projects",
        "projects.other.summary": "Explore STTFL Alumni Community and YazarEser Android projects.",
        "projects.other.action": "View Projects",
        "projects.otherToggle": "Other Projects",
        "projects.otherToggle_less": "Show Less",
        
        "timeline.tag": "Past",
        "timeline.title": "Education & Experience",
        "timeline.desc": "Paths and stops",
        
        "timeline.iu.title": "LL.B. in Law",
        "timeline.iu.org": "Istanbul University",
        "timeline.iu.loc": "Istanbul, Turkey (Ongoing)",
        "timeline.iu.desc": "Undergraduate studies focused on legal theory, normative logic, and rule-based systems.",

        "timeline.boun.title": "B.A. in Philosophy",
        "timeline.boun.org": "Boğaziçi University",
        "timeline.boun.loc": "Istanbul, Turkey (Discontinued)",
        "timeline.boun.desc": "The university changed me more than the department did. My interactions with brilliant people from wildly different backgrounds taught me things no class ever could. The department gave me tools: to think about desire, meaning, and the nature of communication.",
        
        "timeline.bued.title": "Executive Board Member",
        "timeline.bued.org": "Boğaziçi Uni. Literature Club",
        "timeline.bued.loc": "Istanbul, Turkey",
        "timeline.bued.desc": "I was involved in every step of organizing literature events, from promotional posts to guest communications. I learned that bringing people together and working as a team is far from easy, but seeing a successful event take shape makes all the exhaustion disappear.",
        
        "timeline.cedid.title": "Erasmus+ Student Coordinator",
        "timeline.cedid.org": "Cedid Non-Governmental Organization",
        "timeline.cedid.loc": "Turkey",
        "timeline.cedid.desc": "We were side by side at events with international students coming to Turkey. Finding common ground with people from different countries, different languages, turns out to be much easier than you'd think — and in that exact moment, you can feel the great human ideal.",
        
        "timeline.siirt.title": "Science High School Education",
        "timeline.siirt.org": "Siirt Turk Telekom Science High School",
        "timeline.siirt.loc": "Siirt, Turkey (Graduate)",
        "timeline.siirt.desc": "My biggest passion in high school was cinema — we shot short films with friends. Then the pandemic hit and locked us all inside. In that silence, I discovered my curiosity for philosophy and science. I was desperate to share what I was learning, so two friends and I built a website and social media accounts. My first encounter with web design and content creation was right there.",
        
        "timeline.ucondort.title": "Founder & Editor",
        "timeline.ucondort.org": "Üç On Dört",
        "timeline.ucondort.desc": "This project taught me something beyond technical skills: staying coordinated and producing consistently for months. It's where I learned what continuity actually means.",
        "timeline.ucondort.date": "June 2019",
        "timeline.siirt.date": "2019 - 2023",
        "timeline.cedid.date": "2023 - 2024",
        "timeline.bued.date": "2024 - 2026",
        "timeline.boun.date": "2024 - 2026",
        "timeline.iu.date": "2026 - Present",
        
        "skills.tag": "Skills",
        "skills.title": "What I Do & What I Build",
        "skills.desc": "My eye seeks harmony; my decisions are guided by what things make me feel rather than rigid technical formulas. It's not about the tools themselves, but the spirit of the finished craft and its connection to people.",
        "skills.cat1": "Digital Products",
        "skills.tech_badge1": "End-to-End Build",
        "skills.tech_name1": "From concept to production; living, responsive web and mobile products.",
        "skills.tech_badge2": "Calm & Reliable Flows",
        "skills.tech_name2": "Frictionless user journeys, escrow mechanisms, and secure transactions.",
        "skills.tech_badge3": "Resilient Systems",
        "skills.tech_name3": "Durable architectures backed by clean and maintainable data models.",
        
        "skills.cat2": "Tactile Interfaces & Rhythm",
        "skills.design_badge1": "Typographic Rhythm",
        "skills.design_name1": "Beyond templates; tailored color harmonies and editorial elegance for each project.",
        "skills.design_badge2": "Living Interactions",
        "skills.design_name2": "Fluid, tactile motion that feels responsive beneath your fingertips.",
        "skills.design_badge3": "Intuitive Journeys",
        "skills.design_name3": "Serene, clutter-free layouts where navigation feels effortless.",
        
        "skills.cat3": "Thought & Process",
        "skills.thought_badge1": "Conceptual Depth",
        "skills.thought_name1": "Normative logic and analytical depth informed by legal and philosophical studies.",
        "skills.thought_badge2": "Community & Publishing",
        "skills.thought_name2": "Publishing and organizing discipline that unites people around shared ideas.",
        "skills.thought_badge3": "Cross-Cultural Dialogue",
        "skills.thought_name3": "Empathetic, fluent bridges across different languages and disciplines.",
        
        "contact.tag": "Contact",
        "contact.title": "Let's Work Together",
        "contact.desc": "If you're working on an experimental project or something in the civil society space, let's talk. Human-centered work is what excites me.",
        "contact.panel_title": "Contact Information",
        "contact.panel_desc": "You can reach me directly through these channels.",
        "contact.method_mail": "Send Email",
        "contact.method_telegram": "Message on Telegram",
        "contact.method_github": "View on GitHub",
        "contact.method_linkedin": "Connect on LinkedIn",
        "contact.method_phone": "Call Me",
        "contact.method_loc": "Location",
        "contact.method_loc_val": "Istanbul, Turkey",
        
        "contact.form_name": "Full Name",
        "contact.form_name_placeholder": "e.g. John Doe",
        "contact.form_email": "Email Address",
        "contact.form_email_placeholder": "e.g. john@mail.com",
        "contact.form_subject": "Subject",
        "contact.form_subject_placeholder": "What is the subject of your message?",
        "contact.form_message": "Message",
        "contact.form_message_placeholder": "How can we collaborate?",
        "contact.form_btn": "Send",
        
        "contact.error_name": "Please enter your name.",
        "contact.error_email": "Please enter a valid email address.",
        "contact.error_subject": "Please specify a subject.",
        "contact.error_message": "Please write your message.",
        
        "contact.form_sending": "Sending...",
        "contact.form_success": "Your message was sent successfully! I will get back to you as soon as possible.",
        "contact.form_error": "An error occurred during submission.",
        
        "footer.loop_back": "Complete the Loop (Back to Start)",
        "footer.copyright": "© 2026 Mehmet Dilovan Toprak. All rights reserved.",
        "footer.design": "",
        
        "modal.role": "Role",
        "modal.duration": "Duration",
        "modal.tech": "Technologies",
        "modal.about": "About Project",
        "modal.code_review": "Inspect Code",
        "modal.live_site": "Open Site",
        "modal.apk_download": "Download APK",
        "modal.screenshots": "Screenshots"
    }
};

/* ==========================================================================
   PROJECT DETAILS DICTIONARY (BILINGUAL)
   ========================================================================== */
const projectsData = {
    aura: {
        title: "Aura",
        categoryKey: "projects.aura.category",
        bannerClass: "visual-aura",
        icon: "heart",
        role: {
            tr: "Kurucu & Tek Geliştirici",
            en: "Founder & Sole Developer"
        },
        duration: {
            tr: "3 Ay",
            en: "3 Months"
        },
        tags: ["Vanilla JS", "Web Audio API", "Firebase Auth", "PWA"],
        links: [
            { textKey: "modal.live_site", url: "https://aurawell-wmhi.vercel.app/", icon: "external-link" },
            { textKey: "modal.code_review", url: "https://github.com/dilovantprk/aurawll", icon: "github" }
        ],
        screenshots: [
            "assets/aura-1.jpeg",
            "assets/aura-2.jpeg",
            "assets/aura-3.jpeg",
            "assets/aura-4.jpeg",
            "assets/aura-5.jpeg",
            "assets/aura-6.jpeg",
            "assets/aura-7.jpeg",
            "assets/aura-8.jpeg",
            "assets/aura-9.jpeg",
            "assets/aura-10.jpeg"
        ],
        description: {
            tr: `
                <p>Beyin nöroplastik bir yapıya sahip; ancak her deneyim doğrudan bir değişime yol açmıyor. Değişim için farkındalık ve uygun koşullar gerekiyor. Çoğu wellness uygulaması sana "nefes al" der; Aura önce nerede olduğunu gösterir, sonra ne yapabileceğini.</p>

                <h4>Özellikler</h4>
                <ul>
                    <li><strong>Somatik Check-In Akışı:</strong> 6 adımlı bir süreç: beden sinyallerini gir, duygu haritasında yerini işaretle, nefes protokolü seç, değişimi fark et. Her adımın arkasında ayrı bir bilimsel referans var — Porges'ten Damasio'ya, Lieberman'dan Russell'a.</li>
                    <li><strong>Kişiselleştirilmiş Nefes Rehberliği:</strong> 1. ve 2. adımdaki beden sinyallerine ve duygu haritasındaki konumuna göre en uygun nefes protokolünü öneriyor. Genel bir "nefes al" komutu değil — o an nerede olduğuna göre kişiselleştirilmiş bir yönlendirme.</li>
                    <li><strong>Geçmiş & Haftalık Analiz:</strong> Her check-in geçmişe kaydediliyor. Haftalık analizde sinir sisteminin zaman içinde nasıl değiştiğini görebiliyorsun — hangi günler daha zor geçmiş, hangi günler denge daha kolay gelmiş.</li>
                    <li><strong>Aura+:</strong> Sistem genişliyor: somatik günlük, nöral odak zamanlayıcı, algoritmik ambiyans ve uyku ritüeli — ihtiyacına göre açıp kapatabiliyorsun.</li>
                </ul>

                <h4>Teknik Altyapı</h4>
                <ul>
                    <li><strong>Vanilla HTML/JS (ES Modules), bundler yok</strong> — hızlı, hafif, bakımı kolay.</li>
                    <li><strong>Web Audio API:</strong> binaural ritimler, pembe/kahverengi gürültü — ses dosyası indirmeden, tarayıcıda anlık sentez.</li>
                    <li><strong>Barycentric koordinat sistemi:</strong> Vagal Üçgeni üzerindeki hesaplamalar bu matematiksel yapı üzerine kurulu.</li>
                    <li><strong>Firebase Auth + Firestore:</strong> kimlik doğrulama ve bulut senkronizasyonu.</li>
                    <li><strong>PWA + Service Worker:</strong> çevrimdışı çalışma, mobil ve masaüstüne yüklenebilme.</li>
                    <li><strong>WebGL fragment shader (Focus Series):</strong> GPU üzerinde render edilen görsel odak matrisi.</li>
                </ul>

                <p><em>Bilimsel çalışmalara sadık kalmak için uzun bir araştırma süreci geçirdim. Kodlama işlerinin çoğunda yapay zekadan destek aldım ama görsel tasarım ve kullanıcı deneyiminde sayısız revizyon yaptım — her animasyonu, her rengi, her geçişi hissedene kadar. Uygulamanın her köşesinde o kararların izleri var.</em></p>
            `,
            en: `
                <p>The brain is neuroplastic — but not every experience leads to change. Awareness and the right conditions make the difference. Most wellness apps tell you to "just breathe"; Aura first shows you where you are, then what you can do.</p>

                <h4>Features</h4>
                <ul>
                    <li><strong>Somatic Check-In Flow:</strong> A 6-step process: enter body signals, mark your position on the emotion map, choose a breathing protocol, notice the shift. Each step is backed by its own scientific reference — from Porges to Damasio, Lieberman to Russell.</li>
                    <li><strong>Personalized Breathing Guidance:</strong> Based on your body signals from steps 1 and 2 and your position on the emotion map, it recommends the most fitting breathing protocol. Not a generic "just breathe" — a personalized direction based on where your nervous system is right now.</li>
                    <li><strong>History & Weekly Analysis:</strong> Every check-in is saved to your history. In the weekly analysis, you can see how your nervous system shifted over time — which days were harder, which days balance came more easily.</li>
                    <li><strong>Aura+:</strong> The system expands: somatic journal, neural focus timer, algorithmic ambiance, and a sleep ritual — turn each one on or off based on what you need.</li>
                </ul>

                <h4>Technical Foundation</h4>
                <ul>
                    <li><strong>Vanilla HTML/JS (ES Modules), no bundlers</strong> — fast, lightweight, easy to maintain.</li>
                    <li><strong>Web Audio API:</strong> binaural beats, pink/brown noise — synthesized in real-time in the browser, no audio files downloaded.</li>
                    <li><strong>Barycentric coordinate system:</strong> the mathematical foundation behind Vagal Triangle calculations.</li>
                    <li><strong>Firebase Auth + Firestore:</strong> authentication and cloud synchronization.</li>
                    <li><strong>PWA + Service Worker:</strong> offline support, installable on mobile and desktop.</li>
                    <li><strong>WebGL fragment shader (Focus Series):</strong> a visual focus matrix rendered directly on the GPU.</li>
                </ul>

                <p><em>Staying true to the science took a long research process. I used AI support for most of the coding, but the visual design and user experience went through countless revisions — every animation, every color, every transition until it felt right. The traces of those decisions are in every corner of the app.</em></p>
            `
        }
    },
    sosyal: {
        title: "STTFL",
        categoryKey: "projects.sosyal.category",
        bannerClass: "visual-sosyal",
        icon: "message-square",
        role: {
            tr: "Kurucu & Geliştirici",
            en: "Founder & Developer"
        },
        duration: {
            tr: "5 Ay",
            en: "5 Months"
        },
        tags: ["Next.js 15", "Google Genkit", "Gemini API", "Firebase App Hosting", "Cloud Firestore", "Tailwind CSS"],
        links: [
            { textKey: "modal.live_site", url: "https://www.sttflsozluk.com/", icon: "external-link" },
            { textKey: "modal.code_review", url: "https://github.com/dilovantprk/sttfl", icon: "github" }
        ],
        screenshots: [
            "assets/sttfl-1.jpeg",
            "assets/sttfl-2.jpeg",
            "assets/sttfl-3.jpeg",
            "assets/sttfl-4.jpeg",
            "assets/sttfl-5.jpeg"
        ],
        description: {
            tr: `
                <p>Lise yıllarından gelen bağları koparmamak ve ortak anıları canlı tutmak için STTFL mezunları ve öğrencilerini bir araya getirmeye çalışan özgür tartışma platformu. Ekşi Sözlük'ten ilham aldım.</p>

                <h4>Özellikler</h4>
                <ul>
                    <li><strong>Genkit & Gemini AI:</strong> Entry'leri analiz ediyor, etiket çıkarıyor, benzer içerik öneriyor.</li>
                    <li><strong>Çift Akış:</strong> Genel akış veya sadece takip ettiğin yazarlar — birinden diğerine tek tıkla.</li>
                    <li><strong>Anlık DM & Bildirimler:</strong> Sayfayı yenilemeden anında düşüyor.</li>
                </ul>

                <h4>Teknik Altyapı</h4>
                <ul>
                    <li><strong>Next.js 15 + TypeScript</strong></li>
                    <li><strong>Google Genkit + Gemini API</strong></li>
                    <li><strong>Cloud Firestore + Firebase Security Rules</strong></li>
                    <li><strong>Firebase App Hosting</strong> — Git entegrasyonlu CI/CD ile otomatik dağıtım.</li>
                    <li><strong>Tailwind CSS + Liquid Glass</strong> tasarım sistemi.</li>
                </ul>
            `,
            en: `
                <p>A free discussion platform bringing together alumni and students of STTFL to keep connections alive and shared memories from slipping away. Inspired by Ekşi Sözlük.</p>

                <h4>Features</h4>
                <ul>
                    <li><strong>Genkit & Gemini AI:</strong> Analyzes entries, extracts tags, and suggests related content automatically.</li>
                    <li><strong>Dual Feed:</strong> General feed or only authors you follow — switch with one click.</li>
                    <li><strong>Real-time DMs & Notifications:</strong> Messages and notifications arrive instantly without reloading.</li>
                </ul>

                <h4>Technical Foundation</h4>
                <ul>
                    <li><strong>Next.js 15 + TypeScript</strong></li>
                    <li><strong>Google Genkit + Gemini API</strong></li>
                    <li><strong>Cloud Firestore + Firebase Security Rules</strong></li>
                    <li><strong>Firebase App Hosting</strong> — automated CI/CD via Git integration.</li>
                    <li><strong>Tailwind CSS + Liquid Glass</strong> design system.</li>
                </ul>
            `
        }
    },
    yazareser: {
        title: "YazarEser",
        categoryKey: "projects.yazareser.category",
        bannerClass: "visual-yazareser",
        icon: "book-open",
        role: {
            tr: "Yazılım Geliştirici",
            en: "Software Developer"
        },
        duration: {
            tr: "3 Ay",
            en: "3 Months"
        },
        tags: ["Kotlin", "Jetpack Compose", "Material 3", "Room DB v3", "Learning Path", "Games Hub", "Firebase Auth", "Python"],
        links: [
            { textKey: "modal.code_review", url: "https://github.com/dilovantprk/yazareser", icon: "github" },
            { textKey: "modal.apk_download", url: "https://github.com/dilovantprk/yazareser/raw/main/YazarEser.apk", icon: "download" }
        ],
        screenshots: [
            "assets/yazareser-1.jpeg",
            "assets/yazareser-2.jpeg",
            "assets/yazareser-3.jpeg",
            "assets/yazareser-4.jpeg",
            "assets/yazareser-5.jpeg",
            "assets/yazareser-6.jpeg",
            "assets/yazareser-7.jpeg",
            "assets/yazareser-8.jpeg"
        ],
        description: {
            tr: `
                <p>AYT Edebiyat sınavına hazırlanan öğrencilerin ezber yükünü hafifletmek, kafa karıştırıcı yazar-eser eşleşmelerini oyunlaştırılmış kartlarla kalıcı öğrenmeye dönüştürmek için yapıldı. 1.799 doğrulanmış kart, 2018–2025 arası tüm sınavları kapsıyor.</p>

                <h4>Özellikler</h4>
                <ul>
                    <li><strong>Eser → Yazar kartları:</strong> Kafa karışıklığını gidermek için bilinçli yön tercihi.</li>
                    <li><strong>Spaced Repetition (Leitner):</strong> Zor kartlar daha sık, bilinen kartlar daha seyrek karşına çıkıyor.</li>
                    <li><strong>Oyunlaştırma:</strong> Gravity modu, eşleştirme, sınav simülasyonu.</li>
                    <li><strong>Python otomasyon:</strong> MEB müfredatı verisini ayıklayıp veritabanına aktardım.</li>
                </ul>

                <h4>Teknik Altyapı</h4>
                <ul>
                    <li><strong>Kotlin + Jetpack Compose</strong></li>
                    <li><strong>Room DB v3</strong> — offline-first mimari.</li>
                    <li><strong>Firebase Auth + Firestore</strong> — bulut senkronizasyonu.</li>
                    <li><strong>WorkManager</strong> — arka plan görevleri.</li>
                    <li><strong>Python</strong> — veri ayıklama ve veritabanı doldurma scriptleri.</li>
                </ul>
            `,
            en: `
                <p>Built to ease the memorization load for students preparing for the AYT Literature exam — turning confusing author-work pairs into lasting learning through gamified flashcards. 1,799 verified cards covering every exam from 2018 to 2025.</p>

                <h4>Features</h4>
                <ul>
                    <li><strong>Eser → Yazar cards:</strong> A deliberate direction choice to eliminate answer ambiguity.</li>
                    <li><strong>Spaced Repetition (Leitner):</strong> Hard cards come up more often, known cards less — efficient without thinking about it.</li>
                    <li><strong>Gamification:</strong> Gravity mode, matching game, exam simulation.</li>
                    <li><strong>Python automation:</strong> Scraped and cleaned MEB curriculum data to populate the database.</li>
                </ul>

                <h4>Technical Foundation</h4>
                <ul>
                    <li><strong>Kotlin + Jetpack Compose</strong></li>
                    <li><strong>Room DB v3</strong> — offline-first architecture.</li>
                    <li><strong>Firebase Auth + Firestore</strong> — cloud sync.</li>
                    <li><strong>WorkManager</strong> — background tasks.</li>
                    <li><strong>Python</strong> — data extraction and database population scripts.</li>
                </ul>
            `
        }
    },
    ekotakippro: {
        title: "EkoTakip Pro",
        categoryKey: "projects.ekotakippro.category",
        bannerClass: "visual-adnet",
        icon: "globe",
        role: {
            tr: "Lead Architect & Full-Stack Developer",
            en: "Lead Architect & Full-Stack Developer"
        },
        duration: {
            tr: "Temmuz 2026",
            en: "July 2026"
        },
        tags: ["Vanilla JS (ES6+)", "CSS3 (Apple HIG)", "Chart.js", "Leaflet.js", "Vercel Serverless", "Python (ETL)", "PWA", "Zero-PII"],
        links: [
            { textKey: "modal.live_site", url: "https://ekotakippro.vercel.app", icon: "external-link" },
            { textKey: "modal.code_review", url: "https://github.com/dilovantprk/ekotakippro", icon: "github" }
        ],
        screenshots: [],
        description: {
            tr: `
                <p><strong>EkoTakip Pro</strong>, kurumların ve tesislerin sera gazı emisyonlarını ISO/GHG Protokolü standartlarına uygun olarak hesaplayan, görselleştiren ve raporlayan bağımsız bir iklim portalıdır.</p>
                <p>Uygulama, Türkiye genelindeki sanayi tesislerinin 20 yıllık tarihsel emisyon verilerini interaktif haritalar (Leaflet.js) ve dinamik grafiklerle (Chart.js) sunarken; kurumsal etkinlikler için seyahat, tesis, catering ve malzeme/atık olmak üzere 4 farklı kategoride detaylı emisyon hesaplaması yapar. İstemci taraflı (Zero-PII) mimarisi sayesinde veriler yalnızca kullanıcının tarayıcısında saklanır ve işlenir.</p>

                <h4>Öne Çıkan Özellikler</h4>
                <ul>
                    <li><strong>4-Kategorili Etkinlik Karbon Hesaplayıcısı:</strong> Seyahat (uçuş, transfer, kargo), Tesis (alan, elektrik, konaklama), Catering (kırmızı et, tavuk/balık, veg/vegan), Malzeme & Atık (sahne branda m², promosyon ürün).</li>
                    <li><strong>Makro İklim Zekası & Haritalama:</strong> Türkiye genelindeki sanayi tesisleri, holding emisyonları ve 20 yıllık tarihsel sera gazı verilerinin Leaflet.js ve Chart.js ile görselleştirilmesi.</li>
                    <li><strong>%100 Gizlilik Odaklı Mimari (Zero-PII):</strong> Tüm emisyon verilerinin yalnızca kullanıcının tarayıcısında (localStorage) işlenmesi ve saklanması.</li>
                    <li><strong>Tek Tıkla PDF Raporu ve Veri Aktarımı:</strong> Kurumsal yönetim sunumlarına hazır yazdırılabilir PDF emisyon beyannamesi ile CSV/JSON veri dışa/içe aktarımı.</li>
                    <li><strong>Apple HIG & Native PWA Deneyimi:</strong> Otomatik açık/koyu tema senkronizasyonu, PWA desteği ve mobil cihazlar için optimize edilmiş sezgisel arayüz.</li>
                </ul>

                <h4>Teknik Altyapı</h4>
                <ul>
                    <li><strong>Frontend:</strong> Vanilla JavaScript (ES6+), HTML5, Vanilla CSS3 (Apple HIG Design System, Dark/Light Mode), Chart.js, Leaflet.js, FontAwesome 6, Lucide Icons.</li>
                    <li><strong>Backend & API:</strong> Vercel Serverless Functions (cloud-sync.js), Python (process_data.py - Veri dönüşüm & temizleme), Node.js Runtime.</li>
                    <li><strong>Veritabanı & Depolama:</strong> Yerel Depolama (localStorage %100 Zero-PII), CSV & JSON Veri Yapıları.</li>
                    <li><strong>DevOps & PWA:</strong> Vercel (Edge Network), Web App Manifest, Service Worker, Strict CSP, HSTS, CORS Guards.</li>
                </ul>
            `,
            en: `
                <p><strong>EkoTakip Pro</strong> is an independent climate portal that calculates, visualizes, and reports greenhouse gas emissions for organizations and facilities in compliance with ISO/GHG Protocol standards.</p>
                <p>The application presents 20-year historical emission data of industrial facilities across Turkey using interactive maps (Leaflet.js) and dynamic charts (Chart.js), while offering detailed 4-category emission calculations (Travel, Facility, Catering, Material/Waste) for corporate events. Thanks to its client-side (Zero-PII) architecture, all data is processed and stored strictly within the user's browser.</p>

                <h4>Key Features</h4>
                <ul>
                    <li><strong>4-Category Event Carbon Calculator:</strong> Travel (flights, transfer, cargo), Facility (area, electricity, lodging), Catering (red meat, poultry, veg/vegan menus), Material & Waste (stage banners m², promo items).</li>
                    <li><strong>Macro Climate Intelligence & Mapping:</strong> Visualization of industrial facilities, holding emissions, and 20-year historical GHG trends across Turkey using Leaflet.js and Chart.js.</li>
                    <li><strong>100% Privacy-Focused Architecture (Zero-PII):</strong> All emission data is processed and stored client-side in local storage with zero PII retention.</li>
                    <li><strong>One-Click PDF Reports & Data Export:</strong> Boardroom-ready printable PDF emission declarations with CSV/JSON import/export capabilities.</li>
                    <li><strong>Apple HIG & Native PWA Experience:</strong> Automatic light/dark theme sync, PWA support, and responsive mobile UITabBar navigation.</li>
                </ul>

                <h4>Technical Foundation</h4>
                <ul>
                    <li><strong>Frontend:</strong> Vanilla JavaScript (ES6+), HTML5, Vanilla CSS3 (Apple HIG Design System, Dark/Light Mode), Chart.js, Leaflet.js, FontAwesome 6, Lucide Icons.</li>
                    <li><strong>Backend & API:</strong> Vercel Serverless Functions (cloud-sync.js), Python (process_data.py ETL script), Node.js Runtime.</li>
                    <li><strong>Storage & Data:</strong> Browser LocalStorage (%100 Zero-PII), CSV & JSON Data Formats.</li>
                    <li><strong>DevOps & PWA:</strong> Vercel Deployment (Edge Network), Web App Manifest, Service Worker, Strict CSP, HSTS, CORS Guards.</li>
                </ul>
            `
        }
    },
    adnet: {
        title: "Adnet Karbon Emisyon Portalı",
        categoryKey: "projects.adnet.category",
        bannerClass: "visual-adnet",
        icon: "wind",
        role: {
            tr: "Frontend Geliştirici",
            en: "Frontend Developer"
        },
        duration: {
            tr: "2 Ay",
            en: "2 Months"
        },
        tags: ["React", "Chart.js", "REST API", "CSS Modules"],
        links: [],
        screenshots: [],
        description: {
            tr: `
                <p>Adnet Türkiye'nin kurumsal karbon ayak izini ölçmek ve raporlamak amacıyla geliştirilen bir web portalı. Şirketin farklı departmanlarından gelen emisyon verilerini toplayıp görselleştiriyor; yöneticilerin karbon hedeflerini takip etmesini kolaylaştırıyor.</p>

                <h4>Özellikler</h4>
                <ul>
                    <li><strong>Emisyon Dashboard'u:</strong> Departman bazlı CO₂ verilerinin grafikler ve metriklerle özet görünümü.</li>
                    <li><strong>Veri Girişi Akışı:</strong> Farklı enerji kaynaklarından gelen tüketim verilerini standart bir forma dönüştüren form yapısı.</li>
                    <li><strong>Raporlama:</strong> Seçilen zaman aralığı için emisyon özeti ve indirilebilir rapor.</li>
                </ul>

                <h4>Teknik Altyapı</h4>
                <ul>
                    <li><strong>React</strong> — bileşen tabanlı arayüz mimarisi.</li>
                    <li><strong>Chart.js</strong> — çubuk, çizgi ve pasta grafik entegrasyonları.</li>
                    <li><strong>REST API</strong> — arka uç veri akışı.</li>
                    <li><strong>CSS Modules</strong> — izole stil yönetimi.</li>
                </ul>
            `,
            en: `
                <p>A web portal developed to measure and report Adnet Turkey's corporate carbon footprint. It aggregates emission data from various departments and visualizes it, making it easy for managers to track their carbon targets.</p>

                <h4>Features</h4>
                <ul>
                    <li><strong>Emissions Dashboard:</strong> Summary view of department-level CO₂ data with charts and metrics.</li>
                    <li><strong>Data Entry Flow:</strong> A form structure that converts energy consumption inputs from different sources into a standardized format.</li>
                    <li><strong>Reporting:</strong> Emissions summary for selected date ranges and downloadable reports.</li>
                </ul>

                <h4>Technical Foundation</h4>
                <ul>
                    <li><strong>React</strong> — component-based UI architecture.</li>
                    <li><strong>Chart.js</strong> — bar, line, and pie chart integrations.</li>
                    <li><strong>REST API</strong> — backend data flow.</li>
                    <li><strong>CSS Modules</strong> — isolated style management.</li>
                </ul>
            `
        }
    },
    aradapay: {
        title: "AradaPay",
        categoryKey: "projects.aradapay.category",
        bannerClass: "visual-aradapay",
        icon: "credit-card",
        role: {
            tr: "Lead Android Architect & UI/UX Designer",
            en: "Lead Android Architect & UI/UX Designer"
        },
        duration: {
            tr: "2026",
            en: "2026"
        },
        tags: [
            "Kotlin",
            "Jetpack Compose",
            "Material 3",
            "Clean Architecture",
            "MVI",
            "Dagger Hilt",
            "Firebase Firestore",
            "Directed Graph DFS",
            "Merkle Tree",
            "Google ML Kit",
            "AndroidX Biometric",
            "iText PDF"
        ],
        links: [
            { textKey: "modal.live_site", url: "https://arada.whatevervedoneididitfor.fun", icon: "external-link" },
            { textKey: "modal.code_review", url: "https://github.com/dilovantprk/AradaPay", icon: "github" },
            { textKey: "modal.apk_download", url: "https://github.com/dilovantprk/AradaPay/raw/main/AradaPay.apk", icon: "download" }
        ],
        screenshots: [
            "assets/aradapay.png"
        ],
        description: {
            tr: `
                <p><strong>AradaPay (ArdaBank)</strong>, karmaşık grup harcamalarını ve çoklu borç ilişkilerini matematiksel optimizasyonla çözen, kriptografik Merkle Ağacı ile manipüle edilemez dekontlar üreten Material 3 tabanlı yeni nesil bir Android finans platformudur.</p>

                <h4>Öne Çıkan Özellikler & Algoritmalar</h4>
                <ul>
                    <li><strong>Cross-Settlement DFS Borç Sadeleştirme:</strong> Çoklu kullanıcılar arasındaki döngüsel borç düğümlerini (A → B, B → C, C → A) yönlü graf (Directed Graph) algoritmalarıyla analiz ederek transfer adedini %65 oranında azaltır ve doğrudan net transfer modeline indirger.</li>
                    <li><strong>Kriptografik Merkle Tree Makbuz Motoru:</strong> Harcama geçmişini ve işlem bloklarını Merkle Kök Hash'i (Root Hash) ile mühürler; üçüncü taraflarca kriptografik olarak doğrulanabilir, resmi PDF dekontları üretir.</li>
                    <li><strong>KVKK Uyumlu Biyometrik Kasa & Bakiye Maskeleme:</strong> <code>MaskedFinancialText</code> bileşeni ile halka açık alanlarda tek dokunuşla bakiyeleri gizler; AndroidX Biometric (FaceID / Parmak İzi) ve SHA-256 şifreli PIN kasası ile bankacılık düzeyinde güvenlik sunar.</li>
                    <li><strong>Temassız QR Ekosistemi:</strong> Google ML Kit ve CameraX tabanlı donanım hızlandırmalı kamera katmanı ile 100 milisaniyenin altında QR kod tanıma ve anında borç kapatma deneyimi sağlar.</li>
                    <li><strong>Çoklu Bölüşüm Modelleri:</strong> Eşit (equal), yüzdesel (percentage) ve kesin tutarlı (exact) harcama bölüşüm yöntemleri ile TRY, USD ve EUR para birimi desteği.</li>
                </ul>

                <h4>Mimari & Teknik Altyapı</h4>
                <ul>
                    <li><strong>Modern Android Yığını:</strong> %100 saf Kotlin (JVM 17), Coroutines & StateFlow reaktif veri akışları.</li>
                    <li><strong>UI & Tasarım Sistemi:</strong> Jetpack Compose, Material 3 (Material You dinamik temalama, Dark Tonal Elevation, Edge-to-Edge).</li>
                    <li><strong>Mimari Standartlar:</strong> Hedvig Android Clean Architecture, MVI (Model-View-Intent) ve Tek Yönlü Veri Akışı (UDF).</li>
                    <li><strong>Bağımlılık Enjeksiyonu & Veri:</strong> Dagger Hilt DI, Cloud Firestore gerçek zamanlı senkronizasyon, Firebase Auth & FCM bildirim altyapısı.</li>
                    <li><strong>Güvenlik & Donanım:</strong> Jetpack Encrypted DataStore, AndroidX Biometrics, CameraX, Google ML Kit Vision Barcode Scanner, iText PDF & ZXing Barcode.</li>
                </ul>
            `,
            en: `
                <p><strong>AradaPay (ArdaBank)</strong> is a next-generation Material 3 Android fintech platform that resolves complex group expenses and multi-party debt cycles through mathematical optimization, generating tamper-proof receipts via cryptographic Merkle Trees.</p>

                <h4>Key Features & Algorithms</h4>
                <ul>
                    <li><strong>Cross-Settlement DFS Debt Simplification:</strong> Analyzes circular debt loops (A → B, B → C, C → A) across multi-user graphs using Directed Graph DFS algorithms, reducing total transaction count by 65% down to minimal direct net transfers.</li>
                    <li><strong>Cryptographic Merkle Tree Receipt Engine:</strong> Seals transaction histories with Merkle Root Hashes, enabling third-party cryptographically verifiable, exportable PDF bank-grade receipts.</li>
                    <li><strong>Privacy-First Biometric Vault & Balance Masking:</strong> Dynamic privacy masking (<code>MaskedFinancialText</code>) to obscure sensitive balances in public spaces; protected by AndroidX Biometrics (FaceID / Fingerprint) and SHA-256 encrypted PIN vault.</li>
                    <li><strong>Contactless QR Ecosystem:</strong> Hardware-accelerated camera layer built with CameraX and Google ML Kit for sub-100ms instant QR scanning and seamless peer-to-peer settlement.</li>
                    <li><strong>Flexible Split Methods:</strong> Equal, percentage-based, and exact amount division models supporting multi-currency transactions (TRY, USD, EUR).</li>
                </ul>

                <h4>Architecture & Technical Foundation</h4>
                <ul>
                    <li><strong>Modern Android Stack:</strong> 100% Kotlin (JVM 17), Coroutines & StateFlow reactive streams.</li>
                    <li><strong>UI & Design System:</strong> Jetpack Compose, Material 3 (Material You dynamic theming, Dark Tonal Elevation, Edge-to-Edge).</li>
                    <li><strong>Architecture:</strong> Hedvig Android Clean Architecture, MVI (Model-View-Intent), Unidirectional Data Flow (UDF).</li>
                    <li><strong>Dependency Injection & Cloud:</strong> Dagger Hilt DI, Cloud Firestore real-time sync, Firebase Auth & Firebase Cloud Messaging (FCM).</li>
                    <li><strong>Security & Hardware:</strong> Jetpack Encrypted DataStore, AndroidX Biometrics, CameraX, Google ML Kit Vision Barcode, iText PDF & ZXing.</li>
                </ul>
            `
        }
    }
};

/* ==========================================================================
   LANGUAGE ENGINE (TR / EN)
   ========================================================================== */
let currentLanguage = "tr";

/* ==========================================================================
   INITIALIZATION & FEATHER ICONS
   ========================================================================== */
function startApp() {
    // Initialize language first
    initLanguage();
    
    // Initialize feather icons
    if (typeof feather !== "undefined") {
        feather.replace();
    }
    
    // Core Modules
    initTheme();
    initNavigation();
    initScrollReveal();
    initProjectModals();
    initContactForm();
    initSmoothScrollInterception();
}

function initLanguage() {
    const langToggleBtns = document.querySelectorAll(".lang-toggle");
    
    // Get saved language or default to "tr"
    const savedLang = localStorage.getItem("lang");
    if (savedLang) {
        currentLanguage = savedLang;
    }
    
    updateLanguageDOM();
    updateLanguageToggleUI();

    langToggleBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            currentLanguage = currentLanguage === "tr" ? "en" : "tr";
            localStorage.setItem("lang", currentLanguage);
            
            updateLanguageDOM();
            updateLanguageToggleUI();
            
            // Re-replace icons because some translations might have new icon placeholders
            if (typeof feather !== "undefined") {
                feather.replace();
            }
        });
    });
}

function updateLanguageToggleUI() {
    const langTexts = document.querySelectorAll(".lang-toggle .lang-text");
    langTexts.forEach(textEl => {
        textEl.textContent = currentLanguage === "tr" ? "EN" : "TR";
    });
}

function updateLanguageDOM() {
    // Set document lang attribute
    document.documentElement.lang = currentLanguage;
    
    // Update simple text tags
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            el.innerHTML = translations[currentLanguage][key];
        }
    });

    // Update input placeholders
    const inputs = document.querySelectorAll("[data-i18n-placeholder]");
    inputs.forEach(input => {
        const key = input.getAttribute("data-i18n-placeholder");
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            input.placeholder = translations[currentLanguage][key];
        }
    });
}

/* ==========================================================================
   THEME MODULE (LIGHT / DARK)
   ========================================================================== */
function initTheme() {
    const themeToggleBtn = document.getElementById("theme-toggle");
    const htmlElement = document.documentElement;
    
    // Helper to apply system/device theme setting
    function applySystemTheme() {
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        htmlElement.className = systemPrefersDark ? "dark" : "light";
        updateThemeIcon();
    }
    
    // Initialize theme based on device settings
    applySystemTheme();

    // Listen to changes in device/system theme preference dynamically
    const themeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    try {
        themeMediaQuery.addEventListener("change", applySystemTheme);
    } catch (e) {
        // Fallback for older browsers
        themeMediaQuery.addListener(applySystemTheme);
    }

    // Toggle click event lets them override for the current session
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            if (htmlElement.classList.contains("dark")) {
                htmlElement.className = "light";
            } else {
                htmlElement.className = "dark";
            }
            updateThemeIcon();
        });
    }
}

function updateThemeIcon() {
    const sunIcon = document.querySelector(".theme-toggle .sun-icon");
    const moonIcon = document.querySelector(".theme-toggle .moon-icon");
    const isDark = document.documentElement.classList.contains("dark");
    
    if (sunIcon && moonIcon) {
        if (isDark) {
            sunIcon.style.display = "block";
            moonIcon.style.display = "none";
        } else {
            sunIcon.style.display = "none";
            moonIcon.style.display = "block";
        }
    }
}

/* ==========================================================================
   NAVIGATION MODULE (STICKY & MOBILE MENU)
   ========================================================================== */
function initNavigation() {
    const header = document.querySelector(".header");
    const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    // Create backdrop overlay
    const backdrop = document.createElement("div");
    backdrop.className = "mobile-menu-backdrop";
    document.body.appendChild(backdrop);

    function openMenu() {
        navMenu.classList.add("active");
        backdrop.classList.add("active");
        document.body.style.overflow = "hidden";
        const menuIcon = mobileMenuToggle.querySelector(".menu-icon");
        const closeIcon = mobileMenuToggle.querySelector(".close-icon");
        if (menuIcon && closeIcon) {
            menuIcon.style.display = "none";
            closeIcon.style.display = "block";
        }
    }

    function closeMenu() {
        navMenu.classList.remove("active");
        backdrop.classList.remove("active");
        document.body.style.overflow = "";
        const menuIcon = mobileMenuToggle.querySelector(".menu-icon");
        const closeIcon = mobileMenuToggle.querySelector(".close-icon");
        if (menuIcon && closeIcon) {
            menuIcon.style.display = "block";
            closeIcon.style.display = "none";
        }
    }

    // Scroll Shrink effect
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
        
        // Mobile side-nav opacity fade
        const sideNav = document.getElementById("side-nav");
        if (sideNav) {
            if (window.scrollY > 150) {
                sideNav.classList.remove("at-top");
            } else {
                sideNav.classList.add("at-top");
            }
        }
        
        trackActiveSection();
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run on initial load

    // Mobile menu toggle
    mobileMenuToggle.addEventListener("click", () => {
        if (navMenu.classList.contains("active")) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close on nav link click
    navLinks.forEach(link => {
        link.addEventListener("click", () => closeMenu());
    });

    // Close on backdrop click
    backdrop.addEventListener("click", () => closeMenu());

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && navMenu.classList.contains("active")) {
            closeMenu();
        }
    });

    // Smooth scroll for logo click
    const logoLink = document.getElementById("logo-link");
    logoLink.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// Variable to block scroll listener wheel updates during programmatic scrolling
let isProgrammaticScrolling = false;
let scrollTimeout = null;
// Current accumulated wheel rotation to support infinite shortest-path looping
let currentWheelRotation = 0;

// Rotate the wheel to a specific section using shortest path circular rotation logic
function rotateWheelToSection(sectionId) {
    const sideNavWheel = document.getElementById("side-nav-wheel");
    const sectionIndexMap = {
        'home': 0,
        'projects': 1,
        'experience': 2,
        'skills': 3,
        'contact': 4
    };

    if (sideNavWheel && sectionId && sectionIndexMap[sectionId] !== undefined) {
        const targetIndex = sectionIndexMap[sectionId];
        // The dot for index `i` is at `i * 72` degrees.
        // To align it at 0deg (the rightmost point), the wheel must be rotated by `-i * 72` degrees.
        const targetBaseAngle = -targetIndex * 72;
        
        // Find the angle difference modulo 360
        let diff = (targetBaseAngle - currentWheelRotation) % 360;
        
        // Normalize the difference to [-180, 180] for shortest-path rotation
        if (diff > 180) diff -= 360;
        if (diff < -180) diff += 360;
        
        currentWheelRotation += diff;

        sideNavWheel.style.transform = `rotate(${currentWheelRotation}deg)`;
        sideNavWheel.style.setProperty('--wheel-rotation', `${currentWheelRotation}deg`);
    }
}

// Track active section and highlight nav link + side-nav wheel
function trackActiveSection() {
    if (isProgrammaticScrolling) return;

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");
    const sideNavItems = document.querySelectorAll(".side-nav-item");
    let currentSectionId = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 150) {
            currentSectionId = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSectionId}`) {
            link.classList.add("active");
        }
    });

    sideNavItems.forEach(item => {
        item.classList.remove("active");
        if (item.getAttribute("data-section") === currentSectionId) {
            item.classList.add("active");
        }
    });

    if (currentSectionId) {
        rotateWheelToSection(currentSectionId);
    }
}

// Smooth scroll link click interception for loop navigation
function initSmoothScrollInterception() {
    // Select all links starting with hash
    const allLinks = document.querySelectorAll('a[href^="#"]');

    allLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (!href || href === "#" || href.startsWith("#project-modal")) return;

        link.addEventListener("click", (e) => {
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (!targetElement) return;

            // Set programmatic scroll flag to disable scroll listener updates
            isProgrammaticScrolling = true;
            
            // Clear any existing timeout
            if (scrollTimeout) clearTimeout(scrollTimeout);

            // Rotate the wheel immediately to the target section using shortest path
            rotateWheelToSection(targetId);

            // Set active class on nav links and side nav items immediately
            document.querySelectorAll(".nav-link, .side-nav-item").forEach(item => {
                item.classList.remove("active");
                if (item.getAttribute("href") === href || item.getAttribute("data-section") === targetId) {
                    item.classList.add("active");
                }
            });

            // Smooth scroll to the target — offset for fixed navbar height + breathing room
            const navHeight = document.querySelector('.header')?.offsetHeight || 70;
            const scrollOffset = Math.max(0, targetElement.offsetTop - navHeight - 12);
            window.scrollTo({
                top: scrollOffset,
                behavior: "smooth"
            });

            // Re-enable scroll listener updates after the smooth scroll finishes (850ms)
            scrollTimeout = setTimeout(() => {
                isProgrammaticScrolling = false;
                // Double check active section alignment
                trackActiveSection();
            }, 850);
        });
    });
}


/* ==========================================================================
   SCROLL REVEAL MODULE (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollReveal() {
    // Animate elements on initial load
    const fadeElements = document.querySelectorAll(".animate-fade, .animate-hero-name");
    setTimeout(() => {
        fadeElements.forEach(el => el.classList.add("revealed"));
    }, 100);

    // Scroll Observer for scroll-based animations
    const scrollElements = document.querySelectorAll(".animate-scroll");
    
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    scrollElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   PROJECT DETAILS MODALS MODULE
   ========================================================================== */
function initProjectModals() {
    const projectCards = document.querySelectorAll(".project-card");
    const modal = document.getElementById("project-modal");
    const modalClose = document.getElementById("modal-close");
    const modalBackdrop = document.getElementById("modal-backdrop");
    const modalBody = document.getElementById("modal-body");

    // Click project card to open modal
    projectCards.forEach(card => {
        card.addEventListener("click", () => {
            const projectId = card.getAttribute("data-project");
            const project = projectsData[projectId];
            
            if (project) {
                renderModalContent(project, projectId);
                openModal();
            }
        });
    });

    // Close actions
    modalClose.addEventListener("click", closeModal);
    modalBackdrop.addEventListener("click", closeModal);
    
    // Escape key press close
    window.addEventListener("keydown", (e) => {
        const lightbox = document.getElementById("screenshot-lightbox");
        const lightboxActive = lightbox && lightbox.classList.contains("active");
        if (e.key === "Escape" && modal.classList.contains("active") && !lightboxActive) {
            closeModal();
        }
    });

    const wrapper = modal.querySelector(".modal-wrapper");
    if (wrapper) {
        wrapper.addEventListener("scroll", () => {
            if (wrapper.scrollTop > 30) {
                wrapper.classList.add("is-scrolled");
            } else {
                wrapper.classList.remove("is-scrolled");
            }
        });
    }

    function openModal() {
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden"; // Prevent background scroll
        
        // Reset scroll position of the modal wrapper
        if (wrapper) {
            wrapper.scrollTop = 0;
            wrapper.classList.remove("is-scrolled");
        }
    }

    function closeModal() {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = ""; // Restore scroll
        if (wrapper) {
            wrapper.classList.remove("is-scrolled");
        }
    }

    function renderModalContent(project, projectId) {
        // Translate labels
        const labelAbout = translations[currentLanguage]["modal.about"];
        const labelRole = translations[currentLanguage]["modal.role"];
        const labelDuration = translations[currentLanguage]["modal.duration"];
        const labelTech = translations[currentLanguage]["modal.tech"];
        const categoryText = translations[currentLanguage][project.categoryKey] || "";

        // Update sticky header title & category
        const stickyCat = document.getElementById("modal-sticky-cat");
        const stickyTitle = document.getElementById("modal-sticky-title");
        if (stickyCat) stickyCat.textContent = categoryText;
        if (stickyTitle) stickyTitle.textContent = project.title;

        // Build tech tags HTML
        const tagsHTML = project.tags.map(tag => `<span>${tag}</span>`).join("");

        // Build link buttons HTML
        const linksHTML = project.links.map(link => {
            const linkText = translations[currentLanguage][link.textKey];
            return `
                <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="btn ${link.icon === 'github' ? 'btn-secondary' : 'btn-primary'}">
                    <i data-feather="${link.icon}"></i>
                    <span>${linkText}</span>
                </a>
            `;
        }).join("");

        // Build screenshots HTML if present
        let screenshotsHTML = "";
        if (project.screenshots && project.screenshots.length > 0) {
            const labelScreenshots = translations[currentLanguage]["modal.screenshots"];
            const itemsHTML = project.screenshots.map((src, index) => `
                <div class="screenshot-item" data-index="${index}">
                    <img src="${src}" alt="Screenshot ${index + 1}" loading="lazy" />
                </div>
            `).join("");
            
            screenshotsHTML = `
                <div class="modal-project-screenshots">
                    <h4>${labelScreenshots}</h4>
                    <div class="screenshots-grid-container">
                        <div class="screenshots-track">
                            ${itemsHTML}
                        </div>
                    </div>
                </div>
            `;
        }

        // Build animated visual HTML matching card view (Baskı Dili Artwork)
        let visualHTML = "";
        if (projectId === "aradapay") {
            visualHTML = `
                <div class="visual-inner">
                    <svg viewBox="0 0 280 150">
                        <g class="b" filter="url(#ink)"><circle cx="112" cy="76" r="46" fill="var(--blue)"/></g>
                        <g class="o" filter="url(#ink)"><circle cx="164" cy="76" r="34" fill="var(--orange)"/></g>
                    </svg>
                </div>
            `;
        } else if (projectId === "aura") {
            visualHTML = `
                <div class="visual-inner">
                    <svg viewBox="0 0 280 150">
                        <g class="b" filter="url(#ink)" fill="none" stroke="var(--blue)" stroke-width="7">
                            <circle cx="140" cy="75" r="56" stroke-dasharray="1 11" stroke-linecap="round" stroke-width="9"/>
                            <circle cx="140" cy="75" r="38"/>
                            <circle cx="140" cy="75" r="20" stroke-width="9"/>
                        </g>
                        <g class="o" filter="url(#ink)"><circle cx="140" cy="75" r="8" fill="var(--orange)"/></g>
                    </svg>
                </div>
            `;
        } else if (projectId === "ekotakippro" || projectId === "adnet") {
            visualHTML = `
                <div class="visual-inner">
                    <svg viewBox="0 0 280 150">
                        <g class="b" filter="url(#ink)">
                            <circle cx="140" cy="75" r="26" fill="var(--blue)"/>
                            <circle cx="140" cy="75" r="56" fill="none" stroke="var(--blue)" stroke-width="3" stroke-dasharray="2 9" stroke-linecap="round"/>
                        </g>
                        <g class="o" filter="url(#ink)">
                            <circle cx="184" cy="38" r="9" fill="var(--orange)"/>
                            <circle cx="96" cy="112" r="6" fill="var(--orange)"/>
                            <circle cx="190" cy="108" r="4" fill="var(--orange)"/>
                        </g>
                    </svg>
                </div>
            `;
        } else if (projectId === "sosyal") {
            visualHTML = `
                <div class="visual-inner">
                    <svg viewBox="0 0 280 150">
                        <g class="b" filter="url(#ink)">
                            <rect x="52" y="34" width="100" height="36" rx="18" fill="var(--blue)"/>
                            <path d="M152 52 C 190 52, 170 96, 204 96" fill="none" stroke="var(--blue)" stroke-width="3" stroke-dasharray="2 8" stroke-linecap="round"/>
                        </g>
                        <g class="o" filter="url(#ink)">
                            <rect x="150" y="80" width="100" height="36" rx="18" fill="var(--orange)"/>
                        </g>
                    </svg>
                </div>
            `;
        } else if (projectId === "yazareser") {
            visualHTML = `
                <div class="visual-inner">
                    <svg viewBox="0 0 280 150">
                        <g class="b" filter="url(#ink)">
                            <rect x="70" y="38" width="80" height="74" rx="10" fill="var(--blue)"/>
                            <line x1="85" y1="58" x2="135" y2="58" stroke="var(--paper)" stroke-width="3" stroke-linecap="round"/>
                            <line x1="85" y1="72" x2="120" y2="72" stroke="var(--paper)" stroke-width="3" stroke-linecap="round"/>
                        </g>
                        <g class="o" filter="url(#ink)">
                            <rect x="130" y="44" width="80" height="74" rx="10" fill="var(--orange)"/>
                            <line x1="145" y1="64" x2="195" y2="64" stroke="var(--plate)" stroke-width="3" stroke-linecap="round"/>
                            <line x1="145" y1="78" x2="180" y2="78" stroke="var(--plate)" stroke-width="3" stroke-linecap="round"/>
                        </g>
                    </svg>
                </div>
            `;
        }

        modalBody.innerHTML = `
            <div class="modal-project-header">
                <h3 class="modal-project-title">${project.title}</h3>
            </div>
            
            <div class="modal-project-banner art visual-${projectId}">
                ${visualHTML}
            </div>
            
            <div class="modal-project-content">
                <div class="modal-text-section">
                    <h4>${labelAbout}</h4>
                    ${project.description[currentLanguage]}
                    ${screenshotsHTML}
                </div>
                
                <div class="modal-info-panel-right">
                    <div class="modal-info-list">
                        <div class="modal-info-item">
                            <span class="modal-info-label">${labelRole}</span>
                            <span class="modal-info-val">${project.role[currentLanguage]}</span>
                        </div>
                        <div class="modal-info-item">
                            <span class="modal-info-label">${labelDuration}</span>
                            <span class="modal-info-val">${project.duration[currentLanguage]}</span>
                        </div>
                        <div class="modal-info-item">
                            <span class="modal-info-label">${labelTech}</span>
                            <div class="modal-tech-pills">
                                ${tagsHTML}
                            </div>
                        </div>
                    </div>
                    
                    <div class="modal-project-links">
                        ${linksHTML}
                    </div>
                </div>
            </div>
        `;

        const modalBottomBar = document.getElementById("modal-sticky-bottom-bar");
        if (modalBottomBar) {
            modalBottomBar.innerHTML = linksHTML;
        }
        
        // Replace Feather Icons in newly injected markup
        if (typeof feather !== "undefined") {
            feather.replace();
        }
    }

    // Screenshot Lightbox Logic
    function initLightbox() {
        const lightbox = document.getElementById("screenshot-lightbox");
        if (!lightbox) return;
        
        const lightboxImg = document.getElementById("lightbox-img");
        const lightboxClose = lightbox.querySelector(".lightbox-close");
        const lightboxPrev = lightbox.querySelector(".lightbox-nav.prev");
        const lightboxNext = lightbox.querySelector(".lightbox-nav.next");
        const lightboxBackdrop = lightbox.querySelector(".lightbox-backdrop");
        
        let currentScreenshots = [];
        let currentImgIndex = 0;
        
        // Use event delegation on modal-body for screenshot item clicks
        modalBody.addEventListener("click", (e) => {
            const item = e.target.closest(".screenshot-item");
            if (!item) return;
            
            const index = parseInt(item.getAttribute("data-index"), 10);
            const activeModalBanner = document.querySelector(".modal-project-banner");
            if (!activeModalBanner) return;
            
            // Deduce project ID from banner class visual-[projectId]
            const match = activeModalBanner.className.match(/visual-(\w+)/);
            const activeProjectId = match ? match[1] : null;
            
            if (activeProjectId && projectsData[activeProjectId]) {
                const project = projectsData[activeProjectId];
                if (project.screenshots && project.screenshots.length > 0) {
                    currentScreenshots = project.screenshots;
                    currentImgIndex = index;
                    showImage(currentImgIndex);
                    openLightbox();
                }
            }
        });
        
        function showImage(idx) {
            if (idx < 0 || idx >= currentScreenshots.length) return;
            lightboxImg.src = currentScreenshots[idx];
            currentImgIndex = idx;
        }
        
        function openLightbox() {
            lightbox.classList.add("active");
            lightbox.setAttribute("aria-hidden", "false");
            
            // Render feather icons inside lightbox just in case
            if (typeof feather !== "undefined") {
                feather.replace();
            }
        }
        
        function closeLightbox() {
            lightbox.classList.remove("active");
            lightbox.setAttribute("aria-hidden", "true");
            lightboxImg.src = "";
        }
        
        lightboxClose.addEventListener("click", closeLightbox);
        lightboxBackdrop.addEventListener("click", closeLightbox);
        
        lightboxPrev.addEventListener("click", (e) => {
            e.stopPropagation();
            let prevIdx = currentImgIndex - 1;
            if (prevIdx < 0) prevIdx = currentScreenshots.length - 1;
            showImage(prevIdx);
        });
        
        lightboxNext.addEventListener("click", (e) => {
            e.stopPropagation();
            let nextIdx = currentImgIndex + 1;
            if (nextIdx >= currentScreenshots.length) nextIdx = 0;
            showImage(nextIdx);
        });
        
        // Keyboard navigation
        window.addEventListener("keydown", (e) => {
            if (!lightbox.classList.contains("active")) return;
            
            if (e.key === "Escape") {
                closeLightbox();
            } else if (e.key === "ArrowLeft") {
                lightboxPrev.click();
            } else if (e.key === "ArrowRight") {
                lightboxNext.click();
            }
        });
    }

    // Initialize lightbox logic
    initLightbox();
}

/* ==========================================================================
   CONTACT FORM VALIDATION & SUBMISSION
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById("contact-form");
    const statusDiv = document.getElementById("form-status");
    
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const inputs = form.querySelectorAll("input, textarea");
        let isValid = true;

        // Validation checks
        inputs.forEach(input => {
            const formGroup = input.closest(".form-group");
            
            if (input.hasAttribute("required") && !input.value.trim()) {
                formGroup.classList.add("invalid");
                isValid = false;
            } else if (input.getAttribute("type") === "email" && input.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value.trim())) {
                    formGroup.classList.add("invalid");
                    isValid = false;
                } else {
                    formGroup.classList.remove("invalid");
                }
            } else {
                formGroup.classList.remove("invalid");
            }
            
            // Clear error style on input change
            input.addEventListener("input", () => {
                formGroup.classList.remove("invalid");
            });
        });

        if (isValid) {
            submitForm();
        }
    });

    function submitForm() {
        const submitBtn = form.querySelector(".btn-submit");
        const submitBtnText = submitBtn.querySelector("span");
        const submitBtnIcon = submitBtn.querySelector("svg");
        
        const textSending = translations[currentLanguage]["contact.form_sending"];
        const textSuccess = translations[currentLanguage]["contact.form_success"];
        const textError = translations[currentLanguage]["contact.form_error"];
        const textBtn = translations[currentLanguage]["contact.form_btn"];

        // UI states loading
        submitBtn.disabled = true;
        submitBtnText.textContent = textSending;
        if (submitBtnIcon) submitBtnIcon.style.opacity = "0.5";
        statusDiv.style.display = "none";
        statusDiv.className = "form-status";
        
        const nameVal = form.name.value.trim();
        const emailVal = form.email.value.trim();
        const subjectVal = form.subject.value.trim();
        const messageVal = form.message.value.trim();

        if (CONFIG.formEndpoint) {
            // Send real API request
            fetch(CONFIG.formEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: nameVal,
                    email: emailVal,
                    subject: subjectVal,
                    message: messageVal
                })
            })
            .then(res => {
                submitBtn.disabled = false;
                submitBtnText.textContent = textBtn;
                if (submitBtnIcon) submitBtnIcon.style.opacity = "1";
                if (res.ok) {
                    statusDiv.textContent = textSuccess;
                    statusDiv.classList.add("success");
                    form.reset();
                } else {
                    throw new Error("API error");
                }
            })
            .catch(() => {
                submitBtn.disabled = false;
                submitBtnText.textContent = textBtn;
                if (submitBtnIcon) submitBtnIcon.style.opacity = "1";
                statusDiv.textContent = textError;
                statusDiv.classList.add("error");
            });
        } else {
            // Local fallback flow: Open custom interactive modal
            setTimeout(() => {
                // Restore submit button
                submitBtn.disabled = false;
                submitBtnText.textContent = textBtn;
                if (submitBtnIcon) submitBtnIcon.style.opacity = "1";

                openFallbackModal(nameVal, emailVal, subjectVal, messageVal);
            }, 500);
        }
    }

    function openFallbackModal(name, email, subject, message) {
        const modal = document.getElementById("project-modal");
        const modalBody = document.getElementById("modal-body");
        
        // Dynamic content depending on language
        const isTr = currentLanguage === "tr";
        const titleText = isTr ? "Mesajınız Hazırlandı" : "Message Compiled";
        const descText = isTr 
            ? "Sunucu altyapısı yerel çalıştığından, mesajınızı doğrudan aşağıdaki yöntemlerle iletebilirsiniz:" 
            : "Since the server is offline, you can send your message directly using the methods below:";
        
        const mailtoLabel = isTr ? "E-posta Uygulamasını Aç" : "Open Email Client";
        const copyLabel = isTr ? "Mesajı Panoya Kopyala" : "Copy to Clipboard";
        const backLabel = isTr ? "Düzenlemeye Geri Dön" : "Go Back to Edit";
        
        const copiedSuccessText = isTr ? "Kopyalandı!" : "Copied!";
        const mailtoHref = `mailto:dilovanre@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("Gönderen: " + name + "\nE-posta: " + email + "\n\n" + message)}`;
        
        const messageText = `Gönderen: ${name}\nE-posta: ${email}\nKonu: ${subject}\n\nMesaj:\n${message}`;

        modalBody.innerHTML = `
            <div class="modal-contact-fallback">
                <h3 class="modal-fallback-title"><i data-feather="send"></i> ${titleText}</h3>
                <p class="modal-fallback-desc">${descText}</p>
                
                <div class="message-preview-card">
                    <div class="preview-item"><strong>${isTr ? 'Gönderen' : 'From'}:</strong> <span>${name} (${email})</span></div>
                    <div class="preview-item"><strong>${isTr ? 'Konu' : 'Subject'}:</strong> <span>${subject}</span></div>
                    <div class="preview-body">
                        <strong>${isTr ? 'Mesaj' : 'Message'}:</strong>
                        <pre>${message}</pre>
                    </div>
                </div>
                
                <div class="modal-fallback-actions">
                    <a href="${mailtoHref}" class="btn btn-primary" id="fallback-mailto-btn">
                        <i data-feather="external-link"></i>
                        <span>${mailtoLabel}</span>
                    </a>
                    <button class="btn btn-secondary" id="fallback-copy-btn">
                        <i data-feather="copy"></i>
                        <span id="copy-btn-text">${copyLabel}</span>
                    </button>
                </div>
                <div class="modal-fallback-footer">
                    <button class="btn-link" id="fallback-back-btn">${backLabel}</button>
                </div>
            </div>
        `;

        // Load Feather Icons for injected content
        if (typeof feather !== "undefined") {
            feather.replace();
        }

        // Open modal
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        // Handle Copy button
        const copyBtn = document.getElementById("fallback-copy-btn");
        const copyBtnText = document.getElementById("copy-btn-text");
        copyBtn.addEventListener("click", () => {
            navigator.clipboard.writeText(messageText).then(() => {
                copyBtnText.textContent = copiedSuccessText;
                copyBtn.classList.add("btn-primary");
                copyBtn.classList.remove("btn-secondary");
                setTimeout(() => {
                    copyBtnText.textContent = copyLabel;
                    copyBtn.classList.remove("btn-primary");
                    copyBtn.classList.add("btn-secondary");
                }, 2000);
            });
        });

        // Handle Back/Close button
        const backBtn = document.getElementById("fallback-back-btn");
        backBtn.addEventListener("click", () => {
            modal.classList.remove("active");
            modal.setAttribute("aria-hidden", "true");
            document.body.style.overflow = "";
        });
    }
}

// Start application after all modules and functions are declared
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startApp);
} else {
    startApp();
}

