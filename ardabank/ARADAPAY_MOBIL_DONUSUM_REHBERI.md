# AradaPay (ArdaBank) - Mobil Uygulama Dönüşüm ve Özellik Dokümantasyonu

> **Amaç:** Bu belge, mevcut Next.js 14 (Web) uygulamasındaki tüm özellikleri, veri yapılarını, iş mantıklarını, algoritmaları, ekranları ve güvenlik kurallarını **iOS / Android (React Native, Flutter, Swift, Kotlin)** mobil uygulama dönüşümü için eksiksiz biçimde tanımlar.

---

## 1. Uygulama Genel Bakış (Executive Summary)

**AradaPay (ArdaBank)**, sosyal harcama bölüşümü, borç takibi ve otomatik mahsuplaşma platformudur. Kullanıcıların arkadaş gruplarıyla veya bireysel olarak yaptıkları harcamaları eşit, yüzdesel veya kesin tutarlarla bölüşmelerini, karmaşık borç ağlarını zincirleme/çapraz algoritmalarla sadeleştirmelerini sağlar.

### Öne Çıkan Ana Değer Önergeleri:
1. **Çapraz Borç Dengelemesi (Cross Settlement DFS Algorithm):** A → B, B → C, C → A şeklindeki borç döngülerini otomatik tespit edip 3 tarafın da borcunu tek tıkla sıfırlama.
2. **2FA Finansal PIN & Gizlilik Şifrelemesi:** Ekranda görünen bakiye ve borç tutarlarını 4 haneli PIN ile kilitleme/maskeleme.
3. **Sosyal Etiket & QR Pass:** `@kullaniciadi#1453` formatında 4 haneli ayırt edici tag ve kişisel QR Kod ile arkadaş ekleme.
4. **Çoklu Bölüşüm ve Para Birimi:** Eşit (`equal`), Yüzde (`percentage`), Kesin Tutar (`exact`) yöntemleri; ₺ TRY, $ USD, € EUR desteği.
5. **Dürtme (Nudge) & Akıllı Bildirimler:** Borç ödeme hatırlatmaları ve canlı bildirim akışı.
6. **KVKK m.11 Uyumlu:** Veri silme/unutulma hakkı, KVKK onay mekanizması.

---

## 2. Mimari ve Teknoloji Yığını (Tech Stack & Architecture)

| Bileşen | Web Teknolojisi (Mevcut) | Mobil Karşılığı (Tavsiye Edilen) |
| :--- | :--- | :--- |
| **Framework** | Next.js 14 (App Router) + React 18 | React Native (Expo) / Flutter |
| **State Management** | Zustand (`persist` middleware ile LocalStorage) | Zustand / Redux Toolkit / Riverpod + AsyncStore / MMKV |
| **Kimlik Doğrulama** | Firebase Auth (SMS OTP, Email/Şifre, Google OAuth) | Firebase Auth SDK (Native Phone Auth, Google Sign-In) |
| **Veritabanı** | Firebase Firestore | Firebase Firestore Native SDK |
| **Tasarım / UI** | Tailwind CSS + Framer Motion (Apple Dark Glassmorphism) | NativeWind / RNElements / Custom Styles |
| **Kamera & QR** | HTML5 Camera Stream & File Upload | `expo-camera` / `mobile_scanner` |
| **Cihaz Rehberi** | Web Contacts API (`navigator.contacts`) | `expo-contacts` / `flutter_contacts` |
| **Biometrics / PIN** | Local Hash (SHA-256 esinli PIN kontrolü) | LocalAuthentication (FaceID / TouchID / Biometrics) |

---

## 3. Veri Modelleri ve Tipler (Data Schemas)

Mobil veritabanı (Firestore / SQLite / Realm) ve durum yönetimi için kullanılan veri yapıları:

### 3.1. Kullanıcı (`User`)
```typescript
interface User {
  id: string; // Firebase Auth UID
  email: string;
  username: string; // Örn: 'arda'
  full_name: string;
  avatar_url: string;
  phone?: string; // Örn: '+905320001122'
  iban?: string; // Örn: 'TR64 0006 2000 0000 1122 3344 55'
  tag?: string; // Örn: '#1453'
  default_currency: 'TRY' | 'USD' | 'EUR';
  created_at: string;
}
```

### 3.2. Harcama (`Expense`) & Bölüşüm (`ExpenseSplit`)
```typescript
type SplitMethod = 'equal' | 'exact' | 'percentage';
type ExpenseCategory = 'dining' | 'groceries' | 'travel' | 'housing' | 'entertainment' | 'utilities' | 'shopping' | 'other';
type ApprovalStatus = 'pending' | 'approved' | 'rejected';

interface ExpenseSplit {
  id: string;
  expense_id: string;
  user_id: string;
  amount_owed: number; // Borçlanılan net tutar
  percentage?: number; // Yüzde bölüşüm varsa
  status: ApprovalStatus; // 'approved' | 'pending' | 'rejected'
  approved_at?: string;
}

interface Expense {
  id: string;
  group_id?: string | null;
  paid_by: string; // Harcamayı ödeyen kullanıcı ID
  amount: number; // Toplam tutar
  currency: 'TRY' | 'USD' | 'EUR';
  description: string; // Harcama adı / açıklaması
  category: ExpenseCategory;
  split_method: SplitMethod;
  due_date?: string; // Son ödeme tarihi (Opsiyonel)
  status: ApprovalStatus;
  created_at: string;
  date?: string;
  splits: ExpenseSplit[];
}
```

### 3.3. Ödeme & Hesap Kapatma (`Settlement`)
```typescript
interface Settlement {
  id: string;
  payer_id: string; // Ödemeyi yapan (borçlu)
  receiver_id: string; // Ödemeyi alan (alacaklı)
  amount: number;
  currency: 'TRY' | 'USD' | 'EUR';
  created_at: string;
  status: ApprovalStatus; // 'pending' | 'approved' | 'rejected'
  note?: string; // Dekont / Açıklama notu
}
```

### 3.4. Çapraz Borç Dengeleme Önerisi (`CrossSettlementOffer`)
```typescript
interface CrossSettlementStep {
  fromUserId: string;
  fromUserName: string;
  toUserId: string;
  toUserName: string;
  amount: number;
}

interface CrossSettlementOffer {
  id: string;
  cycleAmount: number; // Sıfırlanacak ortak borç tutarı
  participants: { id: string; name: string; avatar: string; username: string }[];
  steps: CrossSettlementStep[];
  approvals: Record<string, boolean>; // Her kullanıcının onay durumu (userId -> boolean)
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}
```

### 3.5. Dürtme & Hatırlatma (`Nudge`)
```typescript
interface Nudge {
  id: string;
  from_user_id: string;
  to_user_id: string;
  expense_id?: string;
  message: string;
  created_at: string;
  isRead?: boolean;
}
```

---

## 4. Ekran Haritası ve Mobil Navigasyon Akışı

Uygulama **5 Ana Sekme (Bottom Tab Bar)** ve modallardan oluşur:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             ARADAPAY MOBİL AKIŞI                            │
├─────────────┬─────────────┬─────────────┬─────────────┬─────────────────────┤
│   DASHBOARD │ BİLDİRİMLER │ ARDAŞLARIM  │ HAERKETLER  │       PROFİL        │
│   (Ana Sayfa)│ (Notifications) (Friends)   │ (Activity)  │      (Profile)      │
└──────┬──────┴──────┬──────┴──────┬──────┴──────┬──────┴──────────┬──────────┘
       │             │             │             │                 │
       ▼             ▼             ▼             ▼                 ▼
  • Canlı Bakiye • Dengeleme  • Tag ile Ara • Akış Filtre • Profil Düzenle
  • Alacak/Borç   Tarama      • QR Pass     • Onay Verme  • Ayarlar & 2FA
  • Dürt Kartı   • Çapraz Borç• Rehber Bağla             • KVKK & Hesap Sil
  • Bekleyenler  • SMS/App Push
```

---

## 5. Ekran Bazlı Detaylı Özellik Özellik Listesi

### 5.1. Kimlik Doğrulama Ekranı (`AuthScreen`)
- **Giriş Yöntemleri:**
  1. **SMS OTP ile Telefon Girişi:** +90 10 haneli cep telefonu numarası girilir. Firebase Recaptcha / Native SMS OTP kodu gönderilir.
  2. **E-Posta & Şifre:** Giriş Yap / Kayıt Ol sekmeleri. Şifremi Unuttum bağlantısı. Doğrulama e-postası.
  3. **Google OAuth ile Tek Tık Giriş:** Google Sign-In pop-up / native entegrasyonu.
- **KVKK Onay Kutusu:** Kayıt olurken zorunlu onay kutusu ve KVKK Aydınlatma Metni Modal açılışı.

### 5.2. Dashboard (Ana Sayfa) (`DashboardHero`, `NudgeWidget`, `PendingApprovalsWidget`)
- **Canlı Bakiye (Net Balance):** Tüm onaylanmış harcama ve ödemelerden hesaplanan toplam net bakiye (Pozitif ise Yeşil `+₺`, Negatif ise Kırmızı `-₺`).
- **Finansal Sağlık Metrikleri:**
  - **Alacakların (`totalReceivable`):** Arkadaşların size olan toplam borçlarının toplamı.
  - **Borçların (`totalPayable`):** Sizin arkadaşlara olan toplam borçlarınızın toplamı.
- **Kilitli Finansal Veri Maskeleme:** 2FA PIN etkinse tutarlar `•••• TL` şeklinde kilitlenir. Kilit ikonuna basılarak PIN girildiğinde açılır.
- **Hızlı Eylem Butonları:**
  - `+ Harcama Ekle`: Harcama oluşturma modalını açar.
  - `↗ Hesap Kapat`: Hesap kapatma modalını açar.
- **Dürtme Widget'ı (`NudgeWidget`):** Başka bir kullanıcı borç hatırlattıysa en üstte uyarı kartı çıkar. "Öde" veya "Kapat" butonları içerir.
- **Onay Bekleyenler Widget'ı (`PendingApprovalsWidget`):** Sizin onayınızı bekleyen harcama payları veya ödeme bildirimleri listelenir (Onayla / Reddet).

### 5.3. Harcama / Borç Ekleme Ekranı (`AddExpenseModal`)
- **Ödeyen Kişi:** Giriş yapmış kullanıcı olarak sabitlenmiştir.
- **Zorunlu Alan:** Tutar (`amount`) - Borç miktarı (Büyük yazı fontu ile).
- **Opsiyonel Alanlar:** Harcama açıklaması, Kategori seçimi, Son ödeme tarihi (`due_date`).
- **3 Bölüşüm Yöntemi:**
  1. **Eşit (`equal`):** Katılımcı sayısına göre eşit böler. Kuruş yuvarlama kalıntılarını ödeyen kullanıcıya/ilk kişiye ekler.
  2. **Yüzde (`percentage`):** Katılımcılara özel yüzde girilir. Toplamın %100 olması zorunludur.
  3. **Kesin Tutar (`exact`):** Her katılımcıya net tutar girilir. Girilen tutarlar toplamının harcama tutarına eşitliği kontrol edilir.
- **Katılımcı Seçimi:** Arkadaşlar listesinden çoklu seçim yapılır.

### 5.4. Hesap Kapat & Ödeme Bildirme Ekranı (`SettleUpModal`)
- **Alacaklı Arkadaş Seçimi:** Seçilen arkadaşla olan pairwise net bakiye anında hesaplanır.
- **Alıcı IBAN Gösterimi:** Seçilen kullanıcının kayıtlı IBAN adresi kopyalama butonu ile görüntülenir.
- **Ödeme Seçenekleri:**
  1. **Tüm Borcu Kapat:** Net borç tutarını otomatik doldurur.
  2. **Kısmi Ödeme Yap:** Ortak harcamalar listelenir, belirli bir harcamaya ait pay seçilebilir veya özel tutar girilebilir.
- **Kutlama Efekti (Confetti):** Ödeme onaylandığında/bildirildiğinde konfeti efekti patlar.

### 5.5. Arkadaşlarım & Sosyal Ekranı (`FriendsView`, `AddFriendModal`)
- **Arama & Canlı Tag Taraması:** Kullanıcı adı veya `#tag` (Örn: `arda#1453`) girildiğinde anında arkadaş isteği gönderme.
- **Arkadaş Listesi Kartları:**
  - Net borç/alacak durumu ("Sana Borçlu", "Borçlusun", "Dengede").
  - Alacaklı olunan durumda **"Dürt" (Nudge)** butonu.
  - Borçlu olunan durumda **"Öde"** (Settle Up) butonu.
  - Kart tıklandığında kullanıcı profil detay modalı (`UserProfileModal`) açılır.
- **Arkadaş Ekleme Modalı (4 Tab):**
  1. **Tag:** Kendi tag'ini görme/kopyalama ve başkasının tag'ine istek gönderme.
  2. **QR Pass:** Kişisel QR kodu gösterme, kopyalama ve sistem paylaşım menüsüyle (`Share`) gönderme.
  3. **Tara:** Kamera ile QR okutma veya galeriden QR görseli yükleme.
  4. **Rehber:** Cihaz rehberindeki kişileri eşleştirme, AradaPay kullananları ekleme, kullanmayanlara WhatsApp/SMS davet linki gönderme.

### 5.6. Bildirimler & Çapraz Dengeleme Ekranı (`NotificationsView`)
- **Çapraz Borç Dengelemesi Kartı (En Önemli Algoritma):**
  - Döngüsel borç (A → B → C → A) tespit edildiğinde özel parıltılı kart gösterilir.
  - Katılımcı ortaklar ve onay sayıları (`2/3 Ortak Onayladı`) görüntülenir.
  - Döngü adımları görselleştirilir (Örn: Ahmet → Mehmet: 250 TL).
  - Tüm ortaklar onayladığında sistem otomatik olarak borçları düşen tutar kadar sıfırlar (`Settlement` üretir).
- **Manuel Tarama Butonu ("Dengeleme Tara"):** Tıklandığında `scanForCrossSettlements()` çalışarak anında döngüleri tarar.
- **Standart Bildirimler:** Gelen harcama onayları, ödeme bildirimleri ve borç dürtmeleri listelenir.

### 5.7. Hareket Akışı Ekranı (`ActivityView` / `ActivityFeed`)
- Tüm harcama ve ödemelerin kronolojik akışı.
- **Filtreleme Hapları:** `Tümü`, `Bekleyenler`, `Harcama`, `Ödeme`.
- Satır içi onay/reddet butonları.

### 5.8. Profil & Ayarlar Ekranı (`ProfileView`)
- **Profil Tamamlama Sihirbazı (% Progress Bar):** Ad Soyad, E-Posta, IBAN, Telefon eksiklerini tamamlama yönlendirmesi.
- **Profil Düzenleme Ekranı:** Avatar seçici (Hazır avatarlar), Ad Soyad, Kullanıcı adı, Özel #Tag değiştirme, IBAN ve Telefon güncelleme.
- **Banka & IBAN Yönetimi:** IBAN kopyalama.
- **Uygulama & Hesap Ayarları:**
  - **Para Birimi Seçimi:** TRY (₺), USD ($), EUR (€).
  - **2FA Finansal PIN Kilidi:** 4 haneli PIN belirleme ve kaldırma.
  - **Rehberde Telefon Gizleme:** Gizlilik şalteri.
  - **KVKK Politikası Okuyucu:** Aydınlatma metni modalı.
  - **Hesabımı ve Verilerimi Sil (DANGER ZONE):** KVKK m.11 uyarınca hesabı ve tüm verileri kalıcı olarak silme.

---

## 6. İş Mantığı & Algoritmalar (Business Logic Specification)

### 6.1. Net Bakiye ve Borç Hesaplama (`calculateUserNetBalance`)
- Sadece `status === 'approved'` olan harcama payları ve ödemeler aktif bakiyeye dahil edilir. `pending` veya `rejected` işlemler bakiyeyi değiştirmez.
- Borçlu ve alacaklı ikili ilişkileri matris üzerinde hesaplanır (`getPairwiseBalance`).

### 6.2. Çapraz Borç Dengeleme Algoritması (`detectCrossSettlementCycles`)
- **Mantık:** Yönlü Graf (Directed Graph) üzerinde DFS (Depth-First Search) algoritması kullanarak yönlü döngüleri (Cycles) bulur.
- **Çalışma Şekli:**
  1. İkili net borçlardan `matrix[i][j]` oluşturulur (Kullanıcı i, Kullanıcı j'ye ne kadar borçlu).
  2. 2'li, 3'lü, 4'lü (L uzunluğunda) tüm kapalı borç döngüleri tespit edilir (`A -> B -> C -> A`).
  3. Döngüdeki minimum borç tutarı `cycleAmount = min(matrix[u][v])` hesaplanır (Darboğaz kapasitesi).
  4. Tüm katılımcılara onay kartı gönderilir. Herkes onayladığında borçlar düşürülür.

### 6.3. Borç Sadeleştirme Algoritması (`simplifyDebts`)
- Çoklu grup harcamalarında açgözlü akış (Greedy Flow) algoritması ile toplam işlem sayısını minimize eder. En çok borcu olan ile en çok alacağı olanı eşleştirir.

---

## 7. Güvenlik, Veritabanı ve KVKK Kuralları

### 7.1. Firestore Güvenlik Kuralları (`firestore.rules`)
- **Kullanıcılar (`/users/{userId}`):** Sadece kendi UID'sine sahip kullanıcı okuyabilir ve yazabilir.
- **Harcamalar (`/expenses/{expenseId}`):** Oturum açmış kullanıcılar okuyabilir; sadece `paid_by == auth.uid` olan kullanıcı oluşturabilir ve güncelleyebilir.
- **Ödemeler (`/settlements/{settlementId}`):** Sadece borçlu (`payer_id`) veya alacaklı (`receiver_id`) olan kullanıcılar erişebilir ve güncelleyebilir.

### 7.2. Finansal 2FA Şifreleme (`security.ts`)
- PIN kodları ham metin olarak saklanmaz. SHA-256 tabanlı hash formatında saklanır (`hashPinCode`).
- PIN kilitliyken `maskFinancialData()` fonksiyonu tüm tutarları `•••• TL` ve açıklamaları `••••••••` şeklinde maskeler.

---

## 8. Mobil Dönüşüm Checklist & Gereksinimler

Mobil uygulamayı geliştirirken aşağıdaki yerel (native) yeteneklerin entegre edilmesi gerekir:

- [ ] **Push Notifications (Firebase Cloud Messaging - FCM):**
  - Borç eklendiğinde onay bildirimi.
  - Ödeme yapıldığında bildirim.
  - "Dürtme" yapıldığında anlık sesli bildirim.
  - Çapraz borç denkliği bulunduğunda bildirim.
- [ ] **Kamera ve QR Okuyucu (`Expo Camera` / `CameraKit`):**
  - Arkadaş ekleme ekranında canlı kamerayla QR tarama.
- [ ] **Biyometrik Doğrulama (`FaceID` / `TouchID` / `Biometrics`):**
  - 2FA PIN yerine cihazın FaceID/Fingerprint entegrasyonu.
- [ ] **Cihaz Rehberi Eşleştirme (`Contacts` API):**
  - Telefon rehberini okuyup AradaPay kullanıcılarını otomatik listeleme.
- [ ] **Paylaşım Menüsü Entegrasyonu (`ShareSheet`):**
  - Davet bağlantısını WhatsApp, Telegram, SMS veya Instagram Story olarak paylaşma.
- [ ] **Offline Persistence (Çevrimdışı Destek):**
  - İnternet yokken eklenen harcamaların kuyruğa alınıp online olunca Firestore'a senkronize edilmesi.

---
*Doküman Son Kodu: ARADAPAY-MOB-SPEC-V1.0*
