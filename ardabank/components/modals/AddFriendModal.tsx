'use client';

import React, { useState, useRef } from 'react';
import { useAppStore } from '@/lib/store';
import { QRCodeCard } from '@/components/ui/QRCodeCard';
import { PhonebookSyncModal } from '@/components/modals/PhonebookSyncModal';
import { Contact } from '@/types';
import { 
  X, 
  UserPlus, 
  AlertCircle, 
  QrCode, 
  Camera, 
  Search, 
  Copy, 
  Check, 
  Share2, 
  Sparkles,
  Upload,
  Send,
  Hash,
  Smartphone,
  Plus,
  UserCheck
} from 'lucide-react';

export const AddFriendModal: React.FC = () => {
  const { 
    currentUser, 
    isAddFriendModalOpen, 
    closeAddFriendModal, 
    addFriend,
    sendFriendRequest,
    contacts,
    isPhonebookConnected,
    addFriendFromContact,
    sendInvite
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<'qr-code' | 'scan-qr' | 'tag-request' | 'phonebook'>('tag-request');
  
  // Tag state
  const [tagInput, setTagInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Scanner state
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Phonebook Sync Modal state inside modal
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);

  // Contact form state
  const [showAddContactForm, setShowAddContactForm] = useState(false);
  const [contactSearch, setContactSearch] = useState('');
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');

  if (!isAddFriendModalOpen) return null;

  const userTag = currentUser.tag || '#1453';

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(contactSearch.toLowerCase()) ||
      c.phone.includes(contactSearch)
  );

  const handleCopyInviteLink = () => {
    const inviteUrl = `${currentUser.username}${userTag}`;
    navigator.clipboard.writeText(inviteUrl);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSharePass = () => {
    const inviteText = `AradaPay'de harcama bölüşmek için beni ekle! Tag'im: ${currentUser.username}${userTag}`;

    if (navigator.share) {
      navigator.share({ title: 'AradaPay Tag', text: inviteText }).catch(() => {});
    } else {
      handleCopyInviteLink();
    }
  };

  const handleSendRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!tagInput.trim()) {
      setError('Lütfen kullanıcı adı ve 4 haneli #tag girin. Örn: arda#1453');
      return;
    }

    const res = sendFriendRequest(tagInput.trim());
    if (!res.success) {
      setError(res.error || 'Arkadaş isteği gönderilirken hata oluştu.');
    } else {
      setSuccessMsg(res.message || 'Arkadaş isteği başarıyla gönderildi! 🎉');
      setTagInput('');
      setTimeout(() => {
        setSuccessMsg(null);
        closeAddFriendModal();
      }, 1500);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setSuccessMsg('QR Görseli başarıyla tarandı!');

    setTimeout(() => {
      addFriend({ email_or_username: 'ahmet_yilmaz', full_name: 'Ahmet Yılmaz' });
      setSuccessMsg('QR Kod okundu! Ahmet Yılmaz arkadaş listenize eklendi! 🎉');
      setTimeout(() => {
        setSuccessMsg(null);
        closeAddFriendModal();
      }, 1500);
    }, 1000);
  };

  const handleSimulateCameraScan = () => {
    setIsScanning(true);
    setError(null);
    setSuccessMsg(null);

    setTimeout(() => {
      setIsScanning(false);
      addFriend({ email_or_username: 'canan_kaya', full_name: 'Canan Kaya' });
      setSuccessMsg('QR Kod Okundu! Canan Kaya arkadaş listenize eklendi! 🎉');
      setTimeout(() => {
        setSuccessMsg(null);
        closeAddFriendModal();
      }, 1500);
    }, 1500);
  };

  const handleAddManualContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContactName.trim() || !newContactPhone.trim()) return;

    const newContact: Contact = {
      id: `cnt-${Date.now()}`,
      name: newContactName.trim(),
      phone: newContactPhone.trim(),
      isRegistered: true,
    };

    addFriendFromContact(newContact);
    setNewContactName('');
    setNewContactPhone('');
    setShowAddContactForm(false);
    setSuccessMsg(`${newContact.name} rehbere eklendi ve arkadaş listenize dahil edildi! 🎉`);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleSendInviteContact = (contact: Contact) => {
    const res = sendInvite(contact.id);
    const text = `Merhaba ${contact.name}! AradaPay uygulamasında harcama bölüşümü yapmak için seni davet ediyorum. Link: ${res.inviteUrl}`;

    if (navigator.share) {
      navigator.share({ title: 'AradaPay Daveti', text, url: res.inviteUrl }).catch(() => {});
    } else {
      const cleanPhone = contact.phone.replace(/[^0-9]/g, '');
      const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank');
    }

    setSuccessMsg(`${contact.name} kişisine davet bağlantısı gönderildi!`);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in font-apple">
      {/* Real Phonebook Sync Modal */}
      <PhonebookSyncModal isOpen={isSyncModalOpen} onClose={() => setIsSyncModalOpen(false)} />

      <div className="apple-glass w-full max-w-md rounded-t-[32px] sm:rounded-[36px] border border-white/20 shadow-2xl p-6 text-zinc-100 space-y-4 max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* iOS Pull Indicator */}
        <div className="w-10 h-1 bg-white/20 rounded-full mx-auto sm:hidden" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">Arkadaş Ekle</h2>
              <p className="text-[11px] text-zinc-400 font-medium">Tag, QR Pass, Tara veya Rehber</p>
            </div>
          </div>
          <button
            onClick={closeAddFriendModal}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 transition-colors apple-press"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Segmented Control Tabs */}
        <div className="grid grid-cols-4 gap-1 bg-black/40 p-1 rounded-2xl border border-white/10 text-[11px] font-extrabold">
          <button
            onClick={() => setActiveTab('tag-request')}
            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1 apple-press ${
              activeTab === 'tag-request' ? 'bg-emerald-500 text-black shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Hash className="w-3.5 h-3.5" />
            <span>Tag</span>
          </button>

          <button
            onClick={() => setActiveTab('qr-code')}
            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1 apple-press ${
              activeTab === 'qr-code' ? 'bg-emerald-500 text-black shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>QR Pass</span>
          </button>

          <button
            onClick={() => setActiveTab('scan-qr')}
            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1 apple-press ${
              activeTab === 'scan-qr' ? 'bg-emerald-500 text-black shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Tara</span>
          </button>

          <button
            onClick={() => setActiveTab('phonebook')}
            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1 apple-press ${
              activeTab === 'phonebook' ? 'bg-emerald-500 text-black shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Rehber</span>
          </button>
        </div>

        {/* Feedback Notices */}
        {error && (
          <div className="p-3 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 font-medium animate-bounce">
            <Sparkles className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* TAB 1: TAG REQUEST */}
        {activeTab === 'tag-request' && (
          <form onSubmit={handleSendRequestSubmit} className="space-y-4 animate-fade-in">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1">
              <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest block">SİZİN TAG'İNİZ</span>
              <p className="text-sm font-mono font-extrabold text-white">
                @{currentUser.username}<span className="text-emerald-400">{userTag}</span>
              </p>
              <p className="text-[10px] text-zinc-400 font-medium">Arkadaşlarınızın sizi eklemesi için bu etiketi paylaşabilirsiniz.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Arkadaşınızın Kullanıcı Adı ve Tag'i
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-xs font-mono text-emerald-400">@</span>
                <input
                  type="text"
                  required
                  placeholder="arda#1453 veya dilovan#9824"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-2xl pl-8 pr-4 py-3 text-xs text-white font-mono placeholder-zinc-500 focus:outline-none focus:border-emerald-400 transition-all"
                  autoFocus
                />
              </div>
              <p className="text-[10px] text-zinc-400 mt-1 font-medium">
                Format: <b>kullaniciadi#1234</b>
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 text-xs font-extrabold text-black bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 hover:from-emerald-300 hover:to-teal-300 rounded-2xl shadow-lg shadow-emerald-500/20 transition-all apple-press flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Arkadaş İsteği Gönder</span>
            </button>
          </form>
        )}

        {/* TAB 2: MY QR CODE PASS */}
        {activeTab === 'qr-code' && (
          <div className="space-y-4 animate-fade-in">
            <QRCodeCard
              username={`${currentUser.username}${userTag}`}
              fullName={currentUser.full_name}
              avatarUrl={currentUser.avatar_url}
            />

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyInviteLink}
                className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/15 rounded-2xl text-xs font-extrabold transition-all apple-press flex items-center justify-center gap-2"
              >
                {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCode ? 'Tag Kopyalandı' : 'Tag’i Kopyala'}</span>
              </button>

              <button
                onClick={handleSharePass}
                className="py-3 px-4 bg-gradient-to-r from-emerald-400 to-teal-400 text-black rounded-2xl text-xs font-extrabold transition-all apple-press flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20"
              >
                <Share2 className="w-4 h-4" />
                <span>Paylaş</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: CAMERA QR SCANNER */}
        {activeTab === 'scan-qr' && (
          <div className="space-y-4 animate-fade-in text-center">
            <div className="relative w-full aspect-square max-w-[240px] mx-auto bg-black rounded-3xl border-2 border-emerald-400/50 flex flex-col items-center justify-center overflow-hidden shadow-2xl">
              {isScanning ? (
                <div className="space-y-3 flex flex-col items-center justify-center p-4">
                  <div className="w-10 h-10 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
                  <span className="text-xs font-bold text-emerald-400">QR Kod Taranıyor...</span>
                </div>
              ) : (
                <div className="space-y-3 flex flex-col items-center justify-center p-4">
                  <Camera className="w-10 h-10 text-emerald-400" />
                  <p className="text-xs font-bold text-white">Arkadaşınızın QR Kodunu Çerçeveye Hizalayın</p>
                </div>
              )}

              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse top-1/2" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleSimulateCameraScan}
                disabled={isScanning}
                className="py-3 bg-gradient-to-r from-emerald-400 to-teal-400 text-black text-xs font-extrabold rounded-2xl transition-all apple-press flex items-center justify-center gap-1.5 shadow-md"
              >
                <Camera className="w-4 h-4" />
                <span>Kamera Aç & Tara</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="py-3 bg-white/10 hover:bg-white/20 text-white border border-white/15 text-xs font-extrabold rounded-2xl transition-all apple-press flex items-center justify-center gap-1.5"
              >
                <Upload className="w-4 h-4" />
                <span>Görsel Yükle</span>
              </button>

              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>
        )}

        {/* TAB 4: REHBER & DAVET (PHONEBOOK) */}
        {activeTab === 'phonebook' && (
          <div className="space-y-3 animate-fade-in">
            {/* Sync Action Header */}
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <Smartphone className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">Rehber Eşleştirme</h4>
                  <p className="text-[10px] text-zinc-400 truncate">
                    {isPhonebookConnected ? 'Rehberiniz bağlandı' : 'Cihaz rehberini bağlayın'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => setIsSyncModalOpen(true)}
                  className="px-3 py-1 bg-gradient-to-r from-emerald-400 to-teal-400 text-black font-extrabold text-[10px] rounded-xl transition-all apple-press"
                >
                  {isPhonebookConnected ? 'Senkronize' : 'Bağla'}
                </button>
                <button
                  onClick={() => setShowAddContactForm(!showAddContactForm)}
                  className="p-1 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[10px] font-bold"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Manual Add Contact Form */}
            {showAddContactForm && (
              <form onSubmit={handleAddManualContact} className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-2 animate-fade-in">
                <h5 className="text-[11px] font-extrabold text-emerald-300">Özel Kişi Ekle</h5>
                <div className="grid grid-cols-2 gap-1.5">
                  <input
                    type="text"
                    required
                    placeholder="Kişi Adı"
                    value={newContactName}
                    onChange={(e) => setNewContactName(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-2.5 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Telefon"
                    value={newContactPhone}
                    onChange={(e) => setNewContactPhone(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-2.5 py-1.5 text-xs text-white font-mono placeholder-zinc-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-1.5 text-[11px] font-extrabold text-black bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl transition-all apple-press flex items-center justify-center gap-1"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Kişiyi Ekle</span>
                </button>
              </form>
            )}

            {/* Search Bar */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="İsim veya telefon ara..."
                value={contactSearch}
                onChange={(e) => setContactSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400"
              />
            </div>

            {/* Contacts List */}
            <div className="divide-y divide-white/10 max-h-48 overflow-y-auto no-scrollbar border-t border-b border-white/10">
              {filteredContacts.length === 0 ? (
                <div className="text-center py-4 text-zinc-500 text-[11px]">
                  Rehberde kişi bulunamadı.
                </div>
              ) : (
                filteredContacts.map((contact) => (
                  <div key={contact.id} className="py-2 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-white/10 text-white flex items-center justify-center text-[11px] font-bold shrink-0">
                        {contact.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <h5 className="text-xs font-bold text-white truncate">{contact.name}</h5>
                        <p className="text-[9px] text-zinc-400 font-mono truncate">{contact.phone}</p>
                      </div>
                    </div>

                    {contact.isRegistered ? (
                      <button
                        onClick={() => {
                          addFriendFromContact(contact);
                          setSuccessMsg(`${contact.name} arkadaş listenize eklendi! 🎉`);
                          setTimeout(() => setSuccessMsg(null), 3000);
                        }}
                        className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-xl text-[10px] font-bold"
                      >
                        Ekle
                      </button>
                    ) : (
                      <button
                        onClick={() => handleSendInviteContact(contact)}
                        className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-zinc-300 rounded-xl text-[10px] font-bold flex items-center gap-1"
                      >
                        <Send className="w-3 h-3 text-teal-400" />
                        <span>Davet Et</span>
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
