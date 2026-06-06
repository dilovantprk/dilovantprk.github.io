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
        "nav.home": "Giriş",
        "nav.projects": "Projeler",
        "nav.experience": "Özgeçmiş",
        "nav.skills": "Beceriler",
        "nav.contact": "İletişim",
        
        "hero.greeting": "Merhaba, ben",
        "hero.desc": "Boğaziçi'nde felsefe okuyorum — anlam arıyorum. Düşünce sistemlerini arayüzlere, soyut modelleri çalışan ürünlere dönüştürüyorum. Bıraktığım şeyin estetik olması gerektiğine inanıyorum.",
        "hero.cta_projects": "Projelerimi Gör",
        "hero.cta_contact": "İletişime Geç",
        
        "projects.tag": "Neler Ürettim?",
        "projects.title": "Seçilmiş Projeler",
        "projects.desc": "Ayinesi iştir kişinin, lafa bakılmaz. Fikir aşamasından kodlamaya kadar bizzat geliştirdiğim mobil, web ve topluluk odaklı uygulamalar.",
        "projects.more_details": "Detayları Gör",
        
        "projects.aura.pill": "Somatik Denge",
        "projects.aura.category": "Wellness / Web App",
        "projects.aura.summary": "Modern yaşamın getirdiği stres ve kaygıyı, bedensel duyumları takip edip nefes ve ses sentezleri ile otonom sinir sistemini sakinleştirmeyi amaçlayan kişisel somatik regülasyon alanı.",
        
        "projects.sosyal.category": "Social / Web App",
        "projects.sosyal.summary": "Lise yıllarımdan gelen bağları koparmamak ve ortak anıları canlı tutmak için Siirt Türk Telekom Fen Lisesi (STTFL) mezunları ve öğrencilerini bir araya getiren özgür tartışma ve topluluk platformu.",
        
        "projects.yazareser.pill": "1.799 Kart",
        "projects.yazareser.category": "Education / Mobile App",
        "projects.yazareser.summary": "AYT Edebiyat sınavına hazırlanan öğrencilerin ezber yükünü hafifletmek, kafa karıştırıcı yazar-eser eşleşmelerini oyunlaştırılmış kartlarla eğlenceli ve kalıcı bir öğrenme sürecine dönüştürmek için tasarlandı.",
        
        "timeline.tag": "Zaman Tüneli",
        "timeline.title": "Eğitim & Deneyim",
        "timeline.desc": "Akademik geçmişim ve sivil toplum kuruluşlarındaki liderlik rollerim.",
        
        "timeline.boun.title": "Felsefe Lisansı",
        "timeline.boun.org": "Boğaziçi Üniversitesi",
        "timeline.boun.loc": "İstanbul, Türkiye (Devam Ediyor)",
        "timeline.boun.desc": "İnsan ve Toplum Bilimleri Fakültesi bünyesinde Felsefe okuyor, mantık, epistemoloji ve analitik felsefe üzerine yoğunlaşıyorum. Felsefi düşünme biçiminin problem çözme ve soyut modelleme becerilerime ciddi katkı sağladığına inanıyorum.",
        
        "timeline.bued.title": "Yürütme Kurulu Üyesi",
        "timeline.bued.org": "Boğaziçi Üni. Edebiyat Kulübü",
        "timeline.bued.loc": "İstanbul, Türkiye",
        "timeline.bued.desc": "Edebiyat söyleşileri, atölyeler ve kültürel etkinliklerin düzenlenmesine öncülük ettim. Bir yıl boyunca yürütme kurulunda görev alarak kulübün idari ve operasyonel süreçlerini yönettim.",
        
        "timeline.cedid.title": "Erasmus+ Öğrenci Koordinatörü",
        "timeline.cedid.org": "Cedid Sivil Toplum Kuruluşu",
        "timeline.cedid.loc": "Türkiye",
        "timeline.cedid.desc": "Erasmus+ programı kapsamında Türkiye'ye gelen uluslararası öğrencilerin adaptasyon süreçlerini yönettim. Kültürlerarası etkileşimi kolaylaştıran etkinlikler planlayarak çok kültürlü bir çalışma ortamında koordinasyon sağladım.",
        
        "timeline.siirt.title": "Fen Lisesi",
        "timeline.siirt.org": "Siirt Türk Telekom Fen Lisesi",
        "timeline.siirt.loc": "Siirt, Türkiye (Mezun)",
        "timeline.siirt.desc": "Sayısal ağırlıklı bir müfredatla analitik düşünme temelimi attığım yıllar. Yazılım ve teknolojiye olan ilgim de bu dönemde başladı.",
        
        "timeline.ucondort.title": "Kurucu & Editör",
        "timeline.ucondort.org": "Üç On Dört",
        "timeline.ucondort.desc": "Lise 1. sınıfta iki arkadaşımla birlikte bilim ve felsefe odaklı ilk web sitemizi kurdum; teknik altyapıyı inşa edip içerik yönetimi ve sosyal medya topluluğunun geliştirilmesini üstlendim.",
        
        "skills.tag": "Neler Yapabilirim?",
        "skills.title": "Yetenekler & Araçlar",
        "skills.desc": "Felsefi ve analitik bakış açımı teknik becerilerle harmanlayarak dijital dünyada fark yaratıyorum.",
        "skills.cat1": "Yazılım & Geliştirme",
        "skills.cat2": "Tasarım & Kreatif",
        "skills.cat3": "Organizasyon & Düşünce",
        "skills.level_adv": "İleri Seviye",
        "skills.level_int": "Orta Seviye",
        "skills.level_soft": "Felsefi Temel",
        "skills.level_erasmus": "Erasmus+ Deneyimi",
        "skills.level_cedid": "Cedid Sivil Toplum",
        
        "skills.soft1": "Analitik & Eleştirel Düşünme",
        "skills.soft2": "Kültürlerarası İletişim (İngilizce C1)",
        "skills.soft3": "Proje Organizasyon & Koordinasyon",
        
        "contact.tag": "İletişime Geçin",
        "contact.title": "Birlikte Çalışalım",
        "contact.desc": "Sorularınız, iş ortaklıkları ya da felsefe ve yazılım üzerine sohbet etmek için bana yazın.",
        "contact.panel_title": "İletişim Bilgileri",
        "contact.panel_desc": "Benimle doğrudan aşağıdaki kanallardan da iletişime geçebilirsiniz.",
        "contact.method_mail": "E-posta Gönder",
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
        
        "footer.copyright": "© 2026 Mehmet Dilovan Toprak. Tüm hakları saklıdır.",
        "footer.design": "Minimalist & Yenilikçi Arayüz Tasarımı",
        
        "modal.role": "Rolüm",
        "modal.duration": "Süre",
        "modal.tech": "Teknolojiler",
        "modal.about": "Proje Hakkında",
        "modal.code_review": "Kodları İncele"
    },
    en: {
        "nav.home": "Home",
        "nav.projects": "Projects",
        "nav.experience": "Experience",
        "nav.skills": "Skills",
        "nav.contact": "Contact",
        
        "hero.greeting": "Hi, I'm",
        "hero.desc": "Studying philosophy at Boğaziçi — searching for meaning. I translate thought systems into interfaces and abstract models into working products. I believe whatever I leave behind should be beautiful.",
        "hero.cta_projects": "View My Work",
        "hero.cta_contact": "Get In Touch",
        
        "projects.tag": "What I've Built",
        "projects.title": "Selected Projects",
        "projects.desc": "A person's mirror is their work; words do not matter. Mobile, web, and community-driven applications built entirely by me from concept to code.",
        "projects.more_details": "View Details",
        
        "projects.aura.pill": "Somatic Balance",
        "projects.aura.category": "Wellness / Web App",
        "projects.aura.summary": "A personal somatic space designed to calm modern stress and anxiety by tracking bodily sensations and regulating the nervous system with guided breathing and audio synthesis.",
        
        "projects.sosyal.category": "Social / Web App",
        "projects.sosyal.summary": "A free discussion and community platform bringing Siirt Türk Telekom Science High School (STTFL) students and alumni together to keep school memories and connections alive.",
        
        "projects.yazareser.pill": "1,799 Cards",
        "projects.yazareser.category": "Education / Mobile App",
        "projects.yazareser.summary": "Designed to ease the heavy memorization load of literature exams, turning confusing author-work associations into a gamified, permanent learning experience using flashcards.",
        
        "timeline.tag": "Timeline",
        "timeline.title": "Education & Experience",
        "timeline.desc": "My academic background and leadership roles in non-governmental organizations.",
        
        "timeline.boun.title": "B.A. in Philosophy",
        "timeline.boun.org": "Boğaziçi University",
        "timeline.boun.loc": "Istanbul, Turkey (Ongoing)",
        "timeline.boun.desc": "Pursuing a Philosophy degree under the Faculty of Arts and Sciences. Focusing on logic, epistemology, and analytical philosophy to reinforce problem-solving and abstract modeling skills.",
        
        "timeline.bued.title": "Executive Board Member",
        "timeline.bued.org": "Boğaziçi Uni. Literature Club",
        "timeline.bued.loc": "Istanbul, Turkey",
        "timeline.bued.desc": "Organized literary talks, workshops, and cultural events. Served on the Executive Board for 1 year, participating in active decision-making and administrative management of the club.",
        
        "timeline.cedid.title": "Erasmus+ Student Coordinator",
        "timeline.cedid.org": "Cedid Non-Governmental Organization",
        "timeline.cedid.loc": "Turkey",
        "timeline.cedid.desc": "Coordinated incoming international students under Erasmus+ youth and student exchange programs. Managed cross-cultural adaptation processes, event planning, and active communication in multicultural environments.",
        
        "timeline.siirt.title": "Science High School Education",
        "timeline.siirt.org": "Siirt Turk Telekom Science High School",
        "timeline.siirt.loc": "Siirt, Turkey (Graduate)",
        "timeline.siirt.desc": "Intense scientific curriculum which built a strong foundation in analytical thinking. The period where my passion for software and technology began.",
        
        "timeline.ucondort.title": "Founder & Editor",
        "timeline.ucondort.org": "Üç On Dört",
        "timeline.ucondort.desc": "My very first web project, launched in 9th grade with 2 of my friends to popularize science and philosophy. Handled content creation, web interface setup, and social media account management.",
        
        "skills.tag": "What I Can Do",
        "skills.title": "Skills & Tools",
        "skills.desc": "Blending my philosophical and analytical perspective with technical skills to make a difference in the digital world.",
        "skills.cat1": "Software & Development",
        "skills.cat2": "Design & Creative",
        "skills.cat3": "Organization & Thought",
        "skills.level_adv": "Advanced",
        "skills.level_int": "Intermediate",
        "skills.level_soft": "Philosophical Foundation",
        "skills.level_erasmus": "Erasmus+ Experience",
        "skills.level_cedid": "Cedid NGO Leadership",
        
        "skills.soft1": "Analytical & Critical Thinking",
        "skills.soft2": "Intercultural Communication (C1 English)",
        "skills.soft3": "Project Organization & Coordination",
        
        "contact.tag": "Get in Touch",
        "contact.title": "Let's Work Together",
        "contact.desc": "Write to me for questions, business partnerships, or to chat about philosophy and software development.",
        "contact.panel_title": "Contact Information",
        "contact.panel_desc": "You can also contact me directly through the channels below.",
        "contact.method_mail": "Send Email",
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
        
        "footer.copyright": "© 2026 Mehmet Dilovan Toprak. All rights reserved.",
        "footer.design": "Minimalist & Innovative Interface Design",
        
        "modal.role": "Role",
        "modal.duration": "Duration",
        "modal.tech": "Technologies",
        "modal.about": "About Project",
        "modal.code_review": "Inspect Code"
    }
};

/* ==========================================================================
   PROJECT DETAILS DICTIONARY (BILINGUAL)
   ========================================================================== */
const projectsData = {
    aura: {
        title: "Aura",
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
        tags: ["Vanilla JS", "Web Audio API", "Somatic UX", "Firebase Auth", "PWA"],
        links: [
            { textKey: "modal.code_review", url: "https://github.com/dilovantprk/aurawll", icon: "github" }
        ],
        description: {
            tr: `
                <p><strong>Aura</strong>, polyvagal teoriyi temel alan ve bireylerin otonom sinir sistemi durumlarını izlemelerine, anlamalarına ve düzenlemelerine yardımcı olan yenilikçi bir wellness web uygulamasıdır.</p>
                <p>Uygulama, karmaşık paketleyiciler (bundlers) kullanılmadan tamamen <strong>Vanilla HTML/JS (ES Modules) ve Vanilla CSS</strong> mimarisi ile sıfırdan inşa edilmiştir. Bu sayede son derece hafif, hızlı ve bakımı kolay bir yapı sunar.</p>
                <h4>Öne Çıkan Özellikler:</h4>
                <ul>
                    <li><strong>Özgün Somatik Check-In Akışı (Kendi İcadım):</strong> Kullanıcının fiziksel durum girdilerini barycentric koordinatlar kullanarak Vagal Üçgeni üzerindeki yerini hesaplayan, tasarımı ve mantığı tamamen bana ait olan interaktif bir 2D Affect Grid tuvali. Bu modül, kullanıcının otonom sinir sisteminin o anki fizyolojik durumunu (güvende/sosyal, uyarılmış/stresli veya yorgun/donmuş) görselleştirerek kendi beden farkındalığını (somatic awareness) artırmasına ve fizyolojik regülasyon sağlamasına yardımcı olur.</li>
                    <li><strong>Web Audio API Ses Sentezleyici:</strong> Arka planda statik ses dosyaları indirmek yerine, tarayıcıda anlık olarak binaural ritimler (binaural beats) ve sakinleştirici pembe/kahverengi ses dalgaları sentezleyerek zihni dinginleştirir.</li>
                    <li><strong>Kişiselleştirilmiş Nefes Rehberliği:</strong> Sinir sistemini dengelemek ve sakinleştirmek için tasarlanmış Box, 4-7-8 ve Physiological Sigh gibi özel nefes ritimlerini yöneten interaktif egzersiz rehberi.</li>
                </ul>
            `,
            en: `
                <p><strong>Aura</strong> is a somatic wellness web application based on Stephen Porges' Polyvagal Theory, designed to help users track and regulate their nervous system state.</p>
                <p>Built completely from scratch using <strong>Vanilla HTML5, ES Modules (no-bundler), and Vanilla CSS</strong>. This architectural decision ensures the app loads instantly, performs efficiently, and avoids package-bloat.</p>
                <h4>Core Highlights:</h4>
                <ul>
                    <li><strong>Original Somatic Check-In Flow (My Design/Invention):</strong> An interactive 2D Affect Grid canvas that calculates the user's physiological state position on the Vagal Triangle using barycentric coordinates. Invented and designed entirely by me, this module visualizes the nervous system's state (safe/social, fight/flight, or freeze/collapse) to help users build somatic self-awareness and self-regulate.</li>
                    <li><strong>Real-time Web Audio API Synthesizer:</strong> Generates real-time procedural noise buffers (pink and brown noise) and binaural beats directly in the browser to calm the mind without downloading heavy audio files.</li>
                    <li><strong>Guided Breathing Exercises:</strong> Interactive guides for box breathing, 4-7-8, and physiological sighs to help regulate and stabilize the user's nervous system.</li>
                </ul>
            `
        }
    },
    sosyal: {
        title: "STTFL",
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
            { textKey: "modal.code_review", url: "https://github.com/dilovantprk", icon: "github" }
        ],
        description: {
            tr: `
                <p><strong>STTFL</strong>, mezun olduğum Siirt Türk Telekom Fen Lisesi (STTFL) mezunları ve öğrencileri için popüler Türkçe tartışma platformlarından (Ekşi Sözlük vb.) ilham alınarak tasarlanmış, <strong>Next.js 15 ve TypeScript</strong> tabanlı modern bir sosyal içerik ve tartışma platformudur.</p>
                <p>Uygulama, görsel mükemmelliği hedefleyen <strong>Liquid Glass</strong> tasarım diliyle inşa edilmiş olup, cam efekti (frosted glass) ve pürüzsüz morphing geçiş animasyonlarıyla premium bir kullanıcı deneyimi sunar.</p>
                <h4>Öne Çıkan Özellikler:</h4>
                <ul>
                    <li><strong>Genkit &amp; Gemini AI Katmanı:</strong> Google Genkit altyapısıyla entegre çalışan Gemini API; entry'leri otomatik analiz eder, ilgili içerik önerilerinde bulunur ve etiketleri otomatik olarak çıkarır.</li>
                    <li><strong>İkili Ana Sayfa Akışı:</strong> Kullanıcının hem genel akışı hem de takip ettiği yazarların paylaşımlarını görebileceği özelleştirilmiş çift akış yapısı.</li>
                    <li><strong>Gerçek Zamanlı DM &amp; Bildirimler:</strong> Firestore'un gerçek zamanlı dinleyicileri (listeners) sayesinde anlık mesajlaşma ve anında bildirim akışı.</li>
                    <li><strong>Güvenlik ve Dağıtım:</strong> Firebase Security Rules entegrasyonu sayesinde kullanıcı bazlı veri erişim kontrolü sağlanmış ve Firebase App Hosting üzerinde CI/CD ile dağıtılmıştır.</li>
                </ul>
            `,
            en: `
                <p><strong>STTFL</strong> is a modern social forum and discussion platform built with <strong>Next.js 15 and TypeScript</strong> for my high school alma mater (Siirt Türk Telekom Science High School) alumni and students, inspired by popular Turkish forums like Ekşi Sözlük.</p>
                <p>Adopts a unique <strong>Liquid Glass</strong> design system, blending frosted glass visual cards, gradient surfaces, and smooth morphing animations to deliver a premium interface.</p>
                <h4>Key Integrations:</h4>
                <ul>
                    <li><strong>Google Genkit & Gemini AI:</strong> Orchestrates LLM flows for automatic categorization, related content suggestion, and sentiment analysis on user entries.</li>
                    <li><strong>Dual Home Feed:</strong> Supports separate feeds allowing users to view general public topics or filter by authors they follow.</li>
                    <li><strong>Real-time Messaging (DM):</strong> Leverages Cloud Firestore live listeners to process peer-to-peer messages and notifications instantly.</li>
                    <li><strong>App Hosting Deployment:</strong> Deployed via Firebase App Hosting utilizing automated Git-integrated CI/CD pipelines.</li>
                </ul>
            `
        }
    },
    yazareser: {
        title: "YazarEser",
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
        tags: ["Kotlin", "Jetpack Compose", "Room DB v3", "Firebase Auth", "WorkManager", "Python"],
        links: [
            { textKey: "modal.code_review", url: "https://github.com/dilovantprk/yazareser", icon: "github" }
        ],
        description: {
            tr: `
                <p><strong>YazarEser</strong>, Türk edebiyatı sınavlarına (AYT Edebiyat) hazırlanan öğrenciler için geliştirilmiş, **flash kart tabanlı akıllı bir Android çalışma uygulamasıdır**.</p>
                <p>2018–2025 yılları arasında çıkmış tüm yazar ve eserleri kapsayan **1.799 doğrulanmış kart** içermektedir. Çevrimdışı öncelikli (offline-first) çalışmayı destekleyen Room DB mimarisi ve bulut senkronizasyonu için Firestore entegrasyonuna sahiptir.</p>
                <h4>Öne Çıkan Özellikler:</h4>
                <ul>
                    <li><strong>Eser &rarr; Yazar Yönlendirmeli Kartlar:</strong> Bire-çok ilişkilerde (bir yazarın onlarca eseri olması) kafa karışıklığını gidermek için bilinçli olarak tasarlanmış Eser &rarr; Yazar yönü ve kart çevirme animasyonu.</li>
                    <li><strong>Spaced Repetition (Leitner Sistemi):</strong> Bilimsel Leitner algoritmasıyla öğrencinin zorlandığı kartları daha sık, bildiği kartları daha seyrek karşısına çıkaran akıllı çalışma modu.</li>
                    <li><strong>Gravity &amp; Eşleştirme Oyunları:</strong> Oyunlaştırma (gamification) ögeleri içeren, öğrenmeyi eğlenceli kılan interaktif eşleştirme oyunları ve sınav simülasyonları.</li>
                    <li><strong>Python Otomasyon Araçları:</strong> 1.799 kartlık devasa MEB müfredatı verisini parse eden, temizleyen ve Firestore/Room veritabanına otomatik enjekte eden Python otomasyon scriptleri.</li>
                </ul>
            `,
            en: `
                <p><strong>YazarEser</strong> is an offline-first **flashcard Android application** built in native Kotlin to help students study for literature exams.</p>
                <p>Includes **1,799 verified cards** compiled from AYT national exam history (2018-2025). Leverages Room Database v3 for offline work and Firebase for cloud backup.</p>
                <h4>Engineering & UX Highlights:</h4>
                <ul>
                    <li><strong>Eser &rarr; Yazar Direction:</strong> Designed to flip from Eser to Yazar (Work to Author) to resolve answer ambiguity inherent in one-to-many relationships.</li>
                    <li><strong>Spaced Repetition:</strong> Employs the scientific Leitner system to increase learning efficiency by repeating difficult cards more frequently.</li>
                    <li><strong>Gamified Learning:</strong> Features matching game, sorting drills, and Gravity mode to improve student engagement.</li>
                    <li><strong>Data Automation:</strong> Custom Python scripts parsed MEB curriculum data, cleaned it, and automatically populated Room DB and Firestore databases.</li>
                </ul>
            `
        }
    }
};

/* ==========================================================================
   INITIALIZATION & FEATHER ICONS
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
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
});

/* ==========================================================================
   LANGUAGE ENGINE (TR / EN)
   ========================================================================== */
let currentLanguage = "tr";

function initLanguage() {
    const langToggleBtn = document.getElementById("lang-toggle");
    const langText = document.getElementById("lang-text");
    
    // Get saved language or default to "tr"
    const savedLang = localStorage.getItem("lang");
    if (savedLang) {
        currentLanguage = savedLang;
    }
    
    updateLanguageDOM();
    updateLanguageToggleUI();

    langToggleBtn.addEventListener("click", () => {
        currentLanguage = currentLanguage === "tr" ? "en" : "tr";
        localStorage.setItem("lang", currentLanguage);
        
        updateLanguageDOM();
        updateLanguageToggleUI();
        
        // Re-replace icons because some translations might have new icon placeholders
        if (typeof feather !== "undefined") {
            feather.replace();
        }
    });
}

function updateLanguageToggleUI() {
    const langText = document.getElementById("lang-text");
    if (langText) {
        langText.textContent = currentLanguage === "tr" ? "EN" : "TR";
    }
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
    
    // Get saved theme or match media
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme) {
        htmlElement.className = savedTheme;
    } else {
        htmlElement.className = systemPrefersDark ? "dark" : "light";
    }
    
    updateThemeIcon();

    // Toggle click event
    themeToggleBtn.addEventListener("click", () => {
        if (htmlElement.classList.contains("dark")) {
            htmlElement.className = "light";
            localStorage.setItem("theme", "light");
        } else {
            htmlElement.className = "dark";
            localStorage.setItem("theme", "dark");
        }
        updateThemeIcon();
    });
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
    
    // Scroll Shrink effect
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
        
        // Active Section tracking
        trackActiveSection();
    });

    // Mobile menu toggle
    mobileMenuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        
        // Toggle mobile hamburger/close icon display
        const menuIcon = mobileMenuToggle.querySelector(".menu-icon");
        const closeIcon = mobileMenuToggle.querySelector(".close-icon");
        if (navMenu.classList.contains("active")) {
            menuIcon.style.display = "none";
            closeIcon.style.display = "block";
        } else {
            menuIcon.style.display = "block";
            closeIcon.style.display = "none";
        }
    });

    // Close mobile menu on nav link click
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            const menuIcon = mobileMenuToggle.querySelector(".menu-icon");
            const closeIcon = mobileMenuToggle.querySelector(".close-icon");
            if (menuIcon && closeIcon) {
                menuIcon.style.display = "block";
                closeIcon.style.display = "none";
            }
        });
    });

    // Smooth scroll for logo click
    const logoLink = document.getElementById("logo-link");
    logoLink.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// Track active section and highlight nav link
function trackActiveSection() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");
    let currentSectionId = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
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
}

/* ==========================================================================
   SCROLL REVEAL MODULE (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollReveal() {
    // Animate elements on initial load
    const fadeElements = document.querySelectorAll(".animate-fade");
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
                renderModalContent(project);
                openModal();
            }
        });
    });

    // Close actions
    modalClose.addEventListener("click", closeModal);
    modalBackdrop.addEventListener("click", closeModal);
    
    // Escape key press close
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            closeModal();
        }
    });

    function openModal() {
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden"; // Prevent background scroll
    }

    function closeModal() {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = ""; // Restore scroll
    }

    function renderModalContent(project) {
        // Translate labels
        const labelAbout = translations[currentLanguage]["modal.about"];
        const labelRole = translations[currentLanguage]["modal.role"];
        const labelDuration = translations[currentLanguage]["modal.duration"];
        const labelTech = translations[currentLanguage]["modal.tech"];

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

        modalBody.innerHTML = `
            <div class="modal-project-header">
                <span class="modal-project-cat">${project.category}</span>
                <h3 class="modal-project-title">${project.title}</h3>
            </div>
            
            <div class="modal-project-banner ${project.bannerClass}">
                <div class="modal-banner-icon">
                    <i data-feather="${project.icon}"></i>
                </div>
            </div>
            
            <div class="modal-project-content">
                <div class="modal-text-section">
                    <h4>${labelAbout}</h4>
                    ${project.description[currentLanguage]}
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
        
        // Replace Feather Icons in newly injected markup
        if (typeof feather !== "undefined") {
            feather.replace();
        }
    }
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
