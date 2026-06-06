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
        "hero.desc": "Anlam ve form arasında bir yerlerde çalışıyorum. Düşünce sistemlerini arayüzlere, soyut modelleri çalışan ürünlere dönüştürüyorum. Bıraktığım şeyin estetik olması gerektiğine inanıyorum.",
        "hero.cta_projects": "Projelerimi Gör",
        "hero.cta_contact": "İletişime Geç",
        
        "projects.tag": "Neler Ürettim?",
        "projects.title": "Seçilmiş Projeler",
        "projects.desc": "Ayinesi iştir kişinin, lafa bakılmaz. Üçü de gerçek bir yerden doğdu.",
        "projects.more_details": "Detayları Gör",
        
        "projects.aura.pill": "Somatik Denge",
        "projects.aura.category": "Wellness / Web App",
        "projects.aura.summary": "Bir dönem her şey üstüme geliyor gibiydi. Nefes almayı yeniden öğrenmem gerekiyordu... Araştırdım, denedim, işe yarayanları bir forma koydum. Arkadaşlarımla paylaşmak isteyince de proje oldu.",
        
        "projects.sosyal.category": "Social / Web App",
        "projects.sosyal.summary": "Bir lise öğrencisi için okul neredeyse tüm dünyadır. STTFL o dünyanın hafızası — kuşaktan kuşağa aktarılan bir okul kültürü arşivi. Envai çeşit sosyal medya platformu varken STTFL farklı bir şey yapıyor: herkese eşit söz hakkı tanıyor. Öğrenci de mezun da öğretmen de. Okuldaki güç ilişkilerini sözlük formatıyla ters yüz ediyor — öğrencilere kurtarılmış bir bölge açıyor.",
        
        "projects.yazareser.pill": "1.799 Kart",
        "projects.yazareser.category": "Education / Mobile App",
        "projects.yazareser.summary": "Sınava hazırlanıyordum ama aradığımı bulamıyordum — her kaynak eksik, her liste yarım. Ben de kendim yaptım. Topladım, düzenledim; 1.799 kart ortaya çıktı. Gerisi uygulama.",
        
        "timeline.tag": "Zaman Tüneli",
        "timeline.title": "Eğitim & Deneyim",
        "timeline.desc": "Şimdiye kadar durduğum yerler.",
        
        "timeline.boun.title": "Felsefe Lisansı",
        "timeline.boun.org": "Boğaziçi Üniversitesi",
        "timeline.boun.loc": "İstanbul, Türkiye (Devam Ediyor)",
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
        
        "skills.tag": "Neler Yapabilirim?",
        "skills.title": "Yetenekler & Araçlar",
        "skills.desc": "Gözüm harmoniyi arıyor; kararlarımı teknik bilgimden çok şeylerin bana hissettirdikleri yönlendiriyor. Mükemmeli arıyorum — ve mükemmel, bir üründe sandığımızdan çok daha erişilebilir.",
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
        "contact.desc": "Deneysel projeler ya da sivil toplum alanında birlikte bir şey üretmek istiyorsan konuşalım. İnsan odaklı işler beni heyecanlandırıyor.",
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
        "footer.design": "",
        
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
        "hero.desc": "I work somewhere between meaning and form. I translate thought systems into interfaces and abstract models into working products. I believe whatever I leave behind should be beautiful.",
        "hero.cta_projects": "View My Work",
        "hero.cta_contact": "Get In Touch",
        
        "projects.tag": "What I've Built",
        "projects.title": "Selected Projects",
        "projects.desc": "Work tells you more about a person than any introduction. Here's mine.",
        "projects.more_details": "View Details",
        
        "projects.aura.pill": "Somatic Balance",
        "projects.aura.category": "Wellness / Web App",
        "projects.aura.summary": "For a while, everything felt like it was closing in on me. I needed to relearn how to breathe... I researched, experimented, and put what worked into a form. When I wanted to share it with friends, it became a project.",
        
        "projects.sosyal.category": "Social / Web App",
        "projects.sosyal.summary": "For a high school student, school is almost the whole world. STTFL is that world's memory — an archive of school culture passed from generation to generation. With countless social media platforms out there, STTFL does something different: it gives everyone an equal voice. Student, alumni, teacher alike. It turns the school's power dynamics upside down with the sözlük format — opening a liberated space for students.",
        
        "projects.yazareser.pill": "1,799 Cards",
        "projects.yazareser.category": "Education / Mobile App",
        "projects.yazareser.summary": "I was studying for the exam but couldn't find what I needed — every source incomplete, every list half-finished. So I built it myself. Gathered, organized; 1,799 cards emerged. The app came after.",
        
        "timeline.tag": "Timeline",
        "timeline.title": "Education & Experience",
        "timeline.desc": "The places I've passed through.",
        
        "timeline.boun.title": "B.A. in Philosophy",
        "timeline.boun.org": "Boğaziçi University",
        "timeline.boun.loc": "Istanbul, Turkey (Ongoing)",
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
        
        "skills.tag": "What I Can Do",
        "skills.title": "Skills & Tools",
        "skills.desc": "My eye looks for harmony; what things make me feel guides my decisions more than technical knowledge. I pursue perfection — and perfection, in a product, is far more attainable than we think.",
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
        "contact.desc": "If you're working on an experimental project or something in the civil society space, let's talk. Human-centered work is what excites me.",
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
        "footer.design": "",
        
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
                <p>Beyin nöroplastik — ama her deneyim doğrudan değişime yol açmıyor. Değişim için farkındalık ve uygun koşullar gerekiyor. Çoğu wellness uygulaması sana "nefes al" der; Aura önce nerede olduğunu gösterir, sonra ne yapabileceğini.</p>

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
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
        trackActiveSection();
    });

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

// Track active section and highlight nav link + side-nav wheel
function trackActiveSection() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");
    const sideNavItems = document.querySelectorAll(".side-nav-item");
    const sideNavWheel = document.getElementById("side-nav-wheel");
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

    // Rotation degrees mapped to each section (to center the active dot at 0deg)
    const rotationMap = {
        'home': 70,        // Giriş dot is at -70deg, so rotate wheel +70deg to center it
        'projects': 35,    // Projeler dot is at -35deg, so rotate wheel +35deg
        'experience': 0,   // Özgeçmiş is at 0deg, so rotate wheel 0deg
        'skills': -35,     // Beceriler is at 35deg, so rotate wheel -35deg
        'contact': -70     // İletişim is at 70deg, so rotate wheel -70deg
    };

    sideNavItems.forEach(item => {
        item.classList.remove("active");
        if (item.getAttribute("data-section") === currentSectionId) {
            item.classList.add("active");
        }
    });

    if (sideNavWheel && currentSectionId && rotationMap[currentSectionId] !== undefined) {
        const rot = rotationMap[currentSectionId];
        sideNavWheel.style.transform = `rotate(${rot}deg)`;
        sideNavWheel.style.setProperty('--wheel-rotation', `${rot}deg`);
    }
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
