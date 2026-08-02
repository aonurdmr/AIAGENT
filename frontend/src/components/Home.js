import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const COND_ICON = { 'Açık': '☀️', 'Parçalı bulutlu': '⛅', 'Bulutlu': '☁️', 'Hafif yağmur': '🌦️' };
const SCORE_COLOR = s => s >= 75 ? '#34d399' : s >= 50 ? '#fbbf24' : '#f87171';

const ACTIONS = [
  { icon: '🔍', label: 'AI Tanımla', sub: 'Fotoğrafla tür bul', path: '/tani',       accent: '#22c55e' },
  { icon: '🤖', label: 'AI Ajanlar', sub: '11 uzman ajan',       path: '/ajanlar',    accent: '#c084fc' },
  { icon: '🗺️', label: 'Planlama',   sub: 'Seyahat planla',      path: '/planlama',   accent: '#06b6d4' },
  { icon: '📋', label: 'Aktivite',   sub: 'Kayıt tut',           path: '/aktivite',   accent: '#fbbf24' },
];

const TOOLS = [
  { icon: '📖', label: 'Tür Ansiklopedisi', sub: '12+ tür detayı',      path: '/turler',    accent: '#22c55e' },
  { icon: '🧠', label: 'NLP Araçları',      sub: 'Metin analizi',        path: '/nlp',       accent: '#f59e0b' },
  { icon: '🎨', label: 'Görsel Oluştur',    sub: 'AI ile doğa görseli',  path: '/gorsel',    accent: '#ec4899' },
  { icon: '🎒', label: 'Ekipman Takibi',    sub: 'Gear yönetimi',        path: '/ekipman',   accent: '#06b6d4' },
  { icon: '🏆', label: 'Liderboard',        sub: 'Topluluk sıralaması',  path: '/liderboard',accent: '#fbbf24' },
  { icon: '🔍', label: 'Global Arama',      sub: 'Tüm içerikte ara',     path: '/arama',     accent: '#a855f7' },
  { icon: '🌡️', label: 'Hava Durumu',       sub: 'Aktivite bazlı skor',  path: '/hava',      accent: '#38bdf8' },
  { icon: '📊', label: 'Analizler',         sub: 'Kişisel istatistikler', path: '/analiz',    accent: '#34d399' },
  { icon: '🏅', label: 'Başarılar',         sub: '12 başarı rozeti',       path: '/basarilar', accent: '#fbbf24' },
  { icon: '📅', label: 'Sezon Takvimi',     sub: 'Av ve balık sezonu',     path: '/takvim',    accent: '#f97316' },
  { icon: '📓', label: 'Hızlı Notlar',      sub: 'Saha gözlem notları',    path: '/notlar',    accent: '#a78bfa' },
  { icon: '⚙️', label: 'Ayarlar',           sub: 'Tercihler ve hesap',     path: '/ayarlar',   accent: '#94a3b8' },
  { icon: '🤖', label: 'AI Öneri',          sub: 'Bugün nereye gideyim?',  path: '/oneri',     accent: '#22c55e' },
  { icon: '✅', label: 'Kontrol Listesi',   sub: 'Seyahat hazırlığı',      path: '/kontrol',   accent: '#34d399' },
  { icon: '📄', label: 'Seyahat Raporu',   sub: 'AI ile trip özeti',       path: '/rapor',     accent: '#c084fc' },
  { icon: '🏆', label: 'Kupa Dolabı',      sub: 'Kişisel balık rekortları', path: '/kupalar',   accent: '#fbbf24' },
  { icon: '⚖️', label: 'Kilo Hesabı',     sub: 'Boy → ağırlık tahmini',    path: '/hesap',     accent: '#38bdf8' },
  { icon: '🪱', label: 'Yem Rehberi',     sub: 'Tür bazlı yem önerileri',  path: '/yem',       accent: '#84cc16' },
  { icon: '🌕', label: 'Ay Takvimi',      sub: 'Balıkçılık aktivite skoru', path: '/ay',        accent: '#fbbf24' },
  { icon: '🪢', label: 'Düğüm Rehberi',  sub: '9 temel balıkçı düğümü',   path: '/dugum',     accent: '#f97316' },
  { icon: '🍳', label: 'Balık Tarifleri', sub: 'Avını en güzel pişir',      path: '/tarifler',  accent: '#ef4444' },
  { icon: '⚔️', label: 'Tür Karşılaştır', sub: '8 türü yan yana karşılaştır', path: '/karsilastir', accent: '#a855f7' },
  { icon: '⚖️', label: 'Mevzuat',         sub: 'Boy limitleri ve yasal kurallar', path: '/kanun',    accent: '#94a3b8' },
  { icon: '🎣', label: 'Ekipman Seçici',  sub: 'Türe göre optimal setup',         path: '/setup',    accent: '#22c55e' },
  { icon: '📰', label: 'Günlük Brifing', sub: 'AI sabah balıkçılık raporu',       path: '/brifing',  accent: '#38bdf8' },
  { icon: '🏹', label: 'Av Takvimi',    sub: '8 av türü sezon ve kuralları',     path: '/av-takvim', accent: '#84cc16' },
  { icon: '⛺', label: 'Kamp Rehberi', sub: '10 kamp yeri + ekipman listesi',   path: '/kamp',      accent: '#22c55e' },
  { icon: '🥾', label: 'Doğa Yolları', sub: '10 yürüyüş rotası, filtreli',     path: '/rotalar',   accent: '#84cc16' },
  { icon: '🦅', label: 'Kuş Gözlemi', sub: '12 tür, 6 gözlem noktası',       path: '/kuslar',    accent: '#38bdf8' },
  { icon: '🌿', label: 'Bitki Rehberi', sub: 'Yenilebilir & zehirli bitkiler', path: '/bitkiler',  accent: '#22c55e' },
  { icon: '🚨', label: 'Acil Durum',   sub: 'İlk yardım, SOS ve hayatta kalma', path: '/acil',   accent: '#ef4444' },
  { icon: '🌊', label: 'Su Sporları',  sub: '8 dal · Türkiye\'nin en iyi noktaları', path: '/su-sporlari', accent: '#06b6d4' },
  { icon: '📈', label: 'Hava Trendleri', sub: 'Aylık ortalama ve balıkçılık skoru', path: '/trend',      accent: '#38bdf8' },
  { icon: '📓', label: 'Doğa Günlüğü', sub: 'Kişisel tür gözlem kayıtları',      path: '/gunluk',     accent: '#a855f7' },
  { icon: '🗺️', label: 'Favori Noktalar', sub: 'Balık, av ve kamp noktalarım',  path: '/noktalar',   accent: '#3b82f6' },
  { icon: '🧭', label: 'Sezon Pusulası', sub: '12 balık türü mevsim takvimi',  path: '/sezon',      accent: '#06b6d4' },
  { icon: '🎣', label: 'Olta Hesap',    sub: 'İğne, misina ve kurşun önerisi', path: '/olta',       accent: '#22c55e' },
  { icon: '🏹', label: 'Av Ekipmanı',  sub: 'Silah, fişek ve güvenlik bilgisi', path: '/av-ekipman', accent: '#f59e0b' },
  { icon: '✏️', label: 'Saha Notları', sub: 'Hızlı kayıt + AI özeti',           path: '/saha',       accent: '#a855f7' },
  { icon: '🔊', label: 'Doğa Sesleri', sub: '10 tür · ses tanıma rehberi',     path: '/sesler',     accent: '#06b6d4' },
  { icon: '🌊', label: 'Gelgit Takvimi', sub: 'Med-cezir saatleri ve balıkçılık skoru', path: '/gelgit', accent: '#06b6d4' },
  { icon: '🌡️', label: 'Hava İstasyonu', sub: 'Canlı hava verisi ve aktivite skoru', path: '/istasyon', accent: '#3b82f6' },
  { icon: '🐟', label: 'Balık Veritabanı', sub: 'FishWatch · besin değeri & sürdürülebilirlik', path: '/balik-db', accent: '#06b6d4' },
  { icon: '☀️', label: 'Güneş Takibi', sub: 'Doğuş · batış · altın balıkçılık saatleri', path: '/gun', accent: '#f59e0b' },
  { icon: '🏹', label: 'Av Bölgeleri', sub: '8 onaylı av sahası · sezon & izin bilgisi', path: '/av-bolge', accent: '#f59e0b' },
  { icon: '🎣', label: 'Balıkçılık Noktaları', sub: '8 elit nokta · tür, yöntem & sezon', path: '/balik-nokta', accent: '#06b6d4' },
  { icon: '📅', label: '7 Günlük Tahmin', sub: 'Open-Meteo · hava & balıkçılık skoru', path: '/tahmin', accent: '#3b82f6' },
  { icon: '🪝', label: 'Sahte Yem Rehberi', sub: '8 kategori · teknik, tür ve sezon', path: '/sahte-yem', accent: '#22c55e' },
  { icon: '🧠', label: 'Doğa Testi', sub: '10 soruluk bilgi yarışması', path: '/quiz', accent: '#a855f7' },
  { icon: '🏆', label: 'Turnuva', sub: 'Canlı zamanlayıcı & sıralama', path: '/turnuva', accent: '#f59e0b' },
  { icon: '🌿', label: 'Milli Parklar', sub: '8 park · aktivite & yaban hayatı', path: '/milli-park', accent: '#22c55e' },
  { icon: '🩺', label: 'İlk Yardım', sub: '8 senaryo · adım adım müdahale', path: '/ilk-yardim', accent: '#ef4444' },
  { icon: '⛺', label: 'Kamp Listesi', sub: '30 madde · kişiselleştirilebilir', path: '/kamp-liste', accent: '#22c55e' },
  { icon: '📏', label: 'Boy Kılavuzu', sub: '12 tür · yasal minimum & ölçüm', path: '/boy-kilavuz', accent: '#06b6d4' },
  { icon: '🦶', label: 'Hayvan İzleri', sub: '8 tür · iz tanıma rehberi', path: '/izler', accent: '#92400e' },
  { icon: '🍄', label: 'Mantar Rehberi', sub: '8 tür · yenilebilir ve zehirli', path: '/mantar', accent: '#84cc16' },
  { icon: '⭐', label: 'Yıldız Haritası', sub: '6 takımyıldız · gece navigasyonu', path: '/yildizlar', accent: '#818cf8' },
  { icon: '🐍', label: 'Yılan Rehberi', sub: '6 tür · zehirli / zararsız tanıma', path: '/surungen', accent: '#ef4444' },
  { icon: '💧', label: 'Su Kalitesi', sub: '5 parametre · balıkçılık kalite skoru', path: '/su-kalite', accent: '#06b6d4' },
  { icon: '⚖️', label: 'Av Mevzuatı', sub: '4915 sayılı Kanun · izinler ve cezalar', path: '/av-kanun', accent: '#60a5fa' },
  { icon: '🌍', label: 'Hava Karşılaştırma', sub: '6 şehir · anlık hava & balıkçılık skoru', path: '/hava-karsi', accent: '#38bdf8' },
  { icon: '📔', label: 'Balıkçılık Günlüğü', sub: 'Seans kaydı · kişisel istatistikler', path: '/balik-gunluk', accent: '#22c55e' },
  { icon: '📊', label: 'Popülasyon Takibi', sub: '8 tür · aylık aktivite & stok durumu', path: '/populasyon', accent: '#3b82f6' },
  { icon: '🎣', label: 'Balıkçılık Tahmin', sub: '7 gün · hava + ay + UV kombinasyonu', path: '/balik-tahmin', accent: '#22c55e' },
  { icon: '🏕️', label: 'Kamp Noktaları', sub: '8 kamp yeri · tesis ve aktivite bilgisi', path: '/kamp-harita', accent: '#84cc16' },
  { icon: '🪲', label: 'Böcek Rehberi', sub: '8 tür · yararlı, zararlı ve tehlikeli', path: '/bocekler', accent: '#f59e0b' },
  { icon: '📅', label: 'Sezon Uyarıları', sub: '10 tür · av ve balık sezonu takibi', path: '/sezon-uyari', accent: '#3b82f6' },
  { icon: '⚖️', label: 'Kilo Hesaplama', sub: 'Boy + çevre → ağırlık tahmini', path: '/kilo', accent: '#06b6d4' },
  { icon: '🏔️', label: 'Hayatta Kalma', sub: '8 senaryo · doğada hayatta kalma', path: '/hayatta-kal', accent: '#ef4444' },
  { icon: '🏪', label: 'Yem Dükkanı Bul', sub: '8 dükkan · Türkiye\'nin önde gelen balıkçı malzemeleri', path: '/yem-bul', accent: '#22c55e' },
  { icon: '📸', label: 'Av Fotoğraf Albümü', sub: 'Kişisel av kaydı ve fotoğraf koleksiyonu', path: '/foto-album', accent: '#a855f7' },
  { icon: '🌊', label: 'Deniz Hava Durumu', sub: '6 konum · dalga, sıcaklık & balıkçılık skoru', path: '/deniz-hava', accent: '#06b6d4' },
  { icon: '🔭', label: 'Doğa Gözlemleri', sub: 'iNaturalist · Türkiye gerçek tür gözlemleri', path: '/gozlemler', accent: '#22c55e' },
  { icon: '🧬', label: 'GBIF Tür Arama', sub: '60M+ kayıt · taksonomik sınıflandırma', path: '/gbif', accent: '#a855f7' },
  { icon: '💨', label: 'Hava Kalitesi', sub: '6 şehir · PM2.5, ozon ve aktivite skoru', path: '/hava-kalite', accent: '#06b6d4' },
  { icon: '🚀', label: 'NASA Günün Görseli', sub: 'APOD · her gün bir evren fotoğrafı', path: '/nasa-apod', accent: '#818cf8' },
  { icon: '⛰️', label: 'Yükseklik Haritası', sub: 'Open-Elevation · koordinat yükseklik sorgula', path: '/yukseklik', accent: '#60a5fa' },
  { icon: '🌍', label: 'Deprem Takibi', sub: 'USGS · Türkiye gerçek zamanlı depremler', path: '/deprem', accent: '#ef4444' },
  { icon: '🌅', label: 'Altın Saat Rehberi', sub: '8 fotoğraf noktası · gün batımı saatleri', path: '/altin-saat', accent: '#f59e0b' },
  { icon: '🏞️', label: 'Akarsu Takibi', sub: '6 nehir · seviye, berraklık & balıkçılık', path: '/nehir', accent: '#06b6d4' },
  { icon: '🔫', label: 'Av Silahları Rehberi', sub: 'Tüfek, fişek & Türkiye mevzuatı', path: '/silah', accent: '#f59e0b' },
  { icon: '🍳', label: 'Balık Tarifleri', sub: '6 tarif · malzeme, yapılış & besin değeri', path: '/balik-tarif', accent: '#ef4444' },
  { icon: '⛺', label: 'Kamp Yemekleri', sub: '6 tarif · közde, mangal & tencere yemekleri', path: '/kamp-yemek', accent: '#84cc16' },
  { icon: '📷', label: 'Doğa Fotoğrafçılığı', sub: '4 bölüm · ekipman, teknik, kompozisyon', path: '/dogal-fotograf', accent: '#818cf8' },
  { icon: '🧭', label: 'GPS Araçları', sub: 'DD↔DMS dönüştürücü · mesafe & yön hesabı', path: '/gps', accent: '#22c55e' },
  { icon: '🚨', label: 'Hava Uyarıları', sub: '6 şehir · saatlik tehlike skoru & balıkçılık', path: '/hava-uyari', accent: '#ef4444' },
  { icon: '🎣', label: 'Aylık İpuçları', sub: '5 tür · aylık taktik, yem ve derinlik rehberi', path: '/ipuclari', accent: '#06b6d4' },
  { icon: '⏱️', label: 'Sezon Geri Sayımı', sub: '7 av türü · canlı sezon sayacı', path: '/geri-sayim', accent: '#f59e0b' },
  { icon: '🎒', label: 'Paket Rehberi', sub: '6 kategori · ağırlık takibi & kontrol listesi', path: '/paket', accent: '#3b82f6' },
  { icon: '🏅', label: 'Kişisel Rekorlar', sub: 'En büyük balığını kaydet & Türkiye rekorları', path: '/rekor', accent: '#f59e0b' },
  { icon: '💨', label: 'Rüzgar Tahmini', sub: '6 nokta · Beaufort skalası & aktivite skoru', path: '/ruzgar', accent: '#60a5fa' },
  { icon: '🦢', label: 'Kuş Göç Takvimi', sub: '8 tür · göç dönemi, rota & gözlem defteri', path: '/goc', accent: '#22c55e' },
  { icon: '⚖️', label: 'Bölgesel Mevzuat', sub: '5 bölge · boy limitleri, ruhsat & ceza', path: '/mevzuat2', accent: '#94a3b8' },
  { icon: '🔥', label: 'Ateş Rehberi', sub: '4 tip · yangın güvenliği & risk hesabı', path: '/ates', accent: '#f97316' },
  { icon: '🚨', label: 'İstilacı Türler', sub: '6 tür · tehdit seviyesi & bildirim merkezi', path: '/istilaci', accent: '#ef4444' },
  { icon: '🌌', label: 'Yıldız Gözlemi', sub: '8 karanlık nokta · bulut skoru & Bortle', path: '/gozlem', accent: '#4f46e5' },
  { icon: '🌿', label: 'Günün Türü', sub: '8 tür · her gün farklı tür ansiklopedisi', path: '/gunun-turu', accent: '#22c55e' },
  { icon: '🐕', label: 'Av Köpekleri', sub: '6 ırk · eğitim rehberi & av uyumu', path: '/av-kopek', accent: '#f59e0b' },
  { icon: '🌡️', label: 'Su Sıcaklığı', sub: '6 bölge · balık aktivite tahmini', path: '/su-sicak', accent: '#0ea5e9' },
  { icon: '🐝', label: 'Tozlaşıcı Rehberi', sub: '7 tür · arı, kelebek & bitki uyumu', path: '/tozlasici', accent: '#84cc16' },
  { icon: '📋', label: 'Balıkçı Ruhsatı', sub: '4 ruhsat türü · başvuru & ceza tablosu', path: '/ruhsat', accent: '#3b82f6' },
  { icon: '📓', label: 'Doğa Günlüğüm', sub: 'Kişisel doğa günlüğü · etiket & arama', path: '/gunlugum', accent: '#22c55e' },
  { icon: '🥾', label: 'Parkur Durumu', sub: '6 yürüyüş rotası · canlı durum bildirimi', path: '/parkur-durum', accent: '#84cc16' },
  { icon: '🪰', label: 'Sinek Balıkçılığı', sub: '4 sinek tipi · Türkiye noktaları & düğümler', path: '/sinek-av', accent: '#06b6d4' },
  { icon: '🐗', label: 'Yaban Domuzu', sub: '5 bölge yoğunluk · 4 taktik & güvenlik', path: '/yaban-domuz', accent: '#f97316' },
  { icon: '♨️', label: 'Termal Noktalar', sub: '6 kaplıca · kamp & balık kombinasyonu', path: '/termal', accent: '#60a5fa' },
  { icon: '🎣', label: 'Balıkçılık Havası', sub: '6 konum · saatlik skor & en iyi saat', path: '/balik-hava', accent: '#06b6d4' },
  { icon: '🤿', label: 'Zıpkın Balıkçılığı', sub: '5 hedef tür · teknikler & yasal çerçeve', path: '/zipkin', accent: '#06b6d4' },
  { icon: '🌙', label: 'Gece Balıkçılığı', sub: '4 tür · ekipman, teknik & güvenlik', path: '/gece-av', accent: '#4f46e5' },
  { icon: '🔬', label: 'Balık Anatomisi', sub: '4 tür · yüzgeç, yaşam döngüsü & biyoloji', path: '/balik-anatomi', accent: '#3b82f6' },
  { icon: '📊', label: 'Hava Desenleri', sub: '6 desen · basınç sistemi & balıkçılık etkisi', path: '/hava-desen', accent: '#38bdf8' },
  { icon: '🌿', label: 'Fenoloji Takvimi', sub: '14 doğa olayı · ay ay Türkiye doğası', path: '/fenoloji', accent: '#22c55e' },
  { icon: '🐟', label: 'Sazan Balıkçılığı', sub: '4 teknik · yemler & Türkiye baraj noktaları', path: '/sazan', accent: '#22c55e' },
  { icon: '🌿', label: 'Şifalı Bitkiler', sub: '8 bitki · tıbbi kullanım & zehirli uyarılar', path: '/sifali', accent: '#84cc16' },
  { icon: '🌊', label: 'Irmak Balıkçılığı', sub: '6 ırmak · teknikler & akıntı rehberi', path: '/irmak', accent: '#06b6d4' },
  { icon: '🍳', label: 'Kamp Pişirme', sub: '5 yöntem · ateş, dutch oven & tarifler', path: '/kamp-pisir', accent: '#ef4444' },
  { icon: '⚖️', label: 'Av Etiği', sub: '6 ilke · sürdürülebilir av & sorumluluk', path: '/av-etik', accent: '#22c55e' },
  { icon: '🔭', label: 'Optik Rehberi', sub: '4 tip · dürbün, dürbün tüfeği & lazer', path: '/optik', accent: '#818cf8' },
  { icon: '☀️', label: 'UV Rehberi', sub: 'Saatlik UV indeks · cilt & göz koruma', path: '/uv-rehber', accent: '#f59e0b' },
  { icon: '🍳', label: 'Balık Pişirme', sub: '5 teknik · temizleme, fileto & tarifler', path: '/balik-pis', accent: '#ef4444' },
  { icon: '🐻', label: 'Ayı ile Karşılaşma', sub: '3 tür · güvenlik, ürpertici & spray', path: '/ayi-karsi', accent: '#92400e' },
  { icon: '🐺', label: 'Kurt Rehberi', sub: 'Türkiye popülasyonu · iz takibi & çatışma', path: '/kurt', accent: '#6b7280' },
  { icon: '🏹', label: 'Tüy Av Rehberi', sub: 'Keklik · bıldırcın · su kuşu · 5 bölge', path: '/tuy-av', accent: '#84cc16' },
  { icon: '🦪', label: 'Kabuklu Deniz Ürünleri', sub: 'Midye · istiridye · tarak · güvenlik', path: '/kabuklu', accent: '#06b6d4' },
  { icon: '🔥', label: 'Kamp Ateşi Güvenliği', sub: '4 ateş tipi · söndürme & yangın riski', path: '/kamp-ates', accent: '#f97316' },
  { icon: '🌌', label: 'Gece Gökyüzü', sub: 'Takımyıldızlar · gezegenler · karanlık noktalar', path: '/gece-gokyuzu', accent: '#4f46e5' },
  { icon: '🐟', label: 'Deniz Balıkları DB', sub: '6 tür · habitat, teknik & rekor bilgisi', path: '/deniz-balik', accent: '#3b82f6' },
  { icon: '🥾', label: 'Yürüyüş Ekipmanı', sub: '5 kategori · seçim rehberi & ağırlık', path: '/yuruyus-gear', accent: '#84cc16' },
  { icon: '🪢', label: 'Balıkçı Düğümleri', sub: '6 düğüm · adım adım & güç karşılaştırması', path: '/dugumler', accent: '#22c55e' },
  { icon: '⚠️', label: 'Doğada Güvenlik', sub: '5 tehlikeli tür · önleme & ilk yardım', path: '/dogada-guvenlik', accent: '#ef4444' },
  { icon: '🦌', label: 'Geyik Rehberi', sub: 'Karaca · alageyik · kızıl geyik · iz takibi', path: '/geyik', accent: '#f59e0b' },
  { icon: '🌩️', label: 'Hava Tehlikeleri', sub: 'Yıldırım · hipotermi · sel · sıcak çarpması', path: '/hava-tehlike', accent: '#fbbf24' },
  { icon: '🪷', label: 'Su Bitkileri', sub: '5 tür · balıkçılık habitatı & ekoloji', path: '/su-bitkileri', accent: '#ec4899' },
  { icon: '📸', label: 'Fotoğraf Noktaları', sub: '6 konum · yaban hayatı & manzara', path: '/foto-noktalar', accent: '#818cf8' },
  { icon: '🦋', label: 'Kelebek Rehberi', sub: '6 tür · habitat, sezon & fotoğrafçılık', path: '/kelebek', accent: '#a78bfa' },
  { icon: '🧗', label: 'Kaya Tırmanışı', sub: '4 saha · güzergah, derece & güvenlik', path: '/kaya-tirmanis', accent: '#ef4444' },
  { icon: '🌸', label: 'Yabani Çiçekler', sub: '6 tür · sezon, bölge & fotoğraf rehberi', path: '/yabani-cicek', accent: '#ec4899' },
  { icon: '🌲', label: 'Orman Banyosu', sub: 'Shinrin-yoku · 4 orman & faydalar', path: '/orman-banyo', accent: '#22c55e' },
  { icon: '🦇', label: 'Mağara Rehberi', sub: '5 mağara · speleoloji & ekipman', path: '/magara', accent: '#06b6d4' },
  { icon: '❄️', label: 'Kar Güvenliği', sub: 'Çığ · tipi · buz · donma tehlikeleri', path: '/kar-guvenlik', accent: '#3b82f6' },
  { icon: '🫐', label: 'Yabani Gıda', sub: '6 tür · doğadan yenilebilir bitki & mantar', path: '/yabani-gida', accent: '#22c55e' },
  { icon: '🛶', label: 'Kano & Kayak', sub: '4 rota · teknikler & su güvenliği', path: '/kayak', accent: '#06b6d4' },
  { icon: '🔭', label: 'Dürbün Rehberi', sub: '4 sınıf · teknik karşılaştırma & kullanım', path: '/durbun', accent: '#f59e0b' },
  { icon: '🗺️', label: 'Türkiye Doğa Atlası', sub: '5 bölge · flora, fauna & av rehberi', path: '/turkiye-doga', accent: '#22c55e' },
  { icon: '🏞️', label: 'Göl Balıkçılığı', sub: '5 göl · tür, teknik & rekor bilgisi', path: '/gol-balik', accent: '#06b6d4' },
  { icon: '⚙️', label: 'Olta Kurulumları', sub: '5 rig · adım adım montaj & kullanım', path: '/rig-kurulum', accent: '#22c55e' },
  { icon: '📅', label: 'Av Sezonu Rehberi', sub: '5 tür · açılış tarihi, limit & mevzuat', path: '/av-sezon', accent: '#f97316' },
  { icon: '🍽️', label: 'Mevsim Tarifleri', sub: '5 tarif · av ve balık pişirme', path: '/mevsim-tarif', accent: '#f97316' },
  { icon: '🎵', label: 'Kuş Sesleri', sub: '6 tür · ötüş, habitat & tanımlama', path: '/kus-sesleri', accent: '#22c55e' },
  { icon: '🌊', label: 'Deniz Canlıları', sub: '6 tür · habitat, avlanma & koruma', path: '/deniz-canlı', accent: '#06b6d4' },
  { icon: '🍂', label: 'Doğa Takvimi', sub: '12 ay · doğa olayları & sezon rehberi', path: '/doga-takvim', accent: '#22c55e' },
  { icon: '🌍', label: 'Zemin & Su Okuma', sub: '4 zemin tipi · balıkçılık & av işareti', path: '/zemin', accent: '#92400e' },
  { icon: '💨', label: 'Rüzgar & Hava Okuma', sub: 'Beaufort skalası · yön & işaret okuma', path: '/ruzgar-oku', accent: '#3b82f6' },
  { icon: '🏔️', label: 'Dağ Güvenliği', sub: '4 tehlike · önleme & acil eylem rehberi', path: '/dag-guvenlik', accent: '#a78bfa' },
  { icon: '🐟', label: 'Balık Davranışı', sub: '5 model · beslenme, göç & su sıcaklığı', path: '/balik-davranis', accent: '#06b6d4' },
  { icon: '🐕', label: 'Av Köpeği Bakımı', sub: '4 ırk · antrenman, bakım & sağlık', path: '/av-kopek-bakim', accent: '#f59e0b' },
  { icon: '🧵', label: 'Olta İpliği Rehberi', sub: '4 ip türü · mono, fluoro, braid, tel', path: '/misina', accent: '#fbbf24' },
  { icon: '⛺', label: 'Kamp Yeri Seçimi', sub: '4 kriter · arazi, su, vahşi hayat & sığınak', path: '/kamp-yer', accent: '#22c55e' },
  { icon: '🐦', label: 'Kuş Göçü Haritası', sub: '4 güzergah · Türkiye geçiş koridorları', path: '/goc-harita', accent: '#22c55e' },
  { icon: '⭐', label: 'Yıldız Navigasyon', sub: '4 yıldız · gece yön bulma & teknikler', path: '/yildiz-nav', accent: '#6366f1' },
  { icon: '📔', label: 'Balıkçı Günlüğü Pro', sub: 'Av kayıt & istatistik — localStorage', path: '/gunluk-pro', accent: '#06b6d4' },
  { icon: '🪤', label: 'Av Tuzak Teknikleri', sub: '4 tuzak · kamera, koku, iz & ses', path: '/tuzak', accent: '#f59e0b' },
  { icon: '📸', label: 'Doğa Fotoğrafı Teknik', sub: '4 teknik · ışık, kuş, makro, yaban', path: '/foto-teknik', accent: '#f59e0b' },
  { icon: '🏞️', label: 'Nehir Rehberi', sub: '5 nehir · balıkçılık, rafting & nehir okuma', path: '/nehir-harita', accent: '#3b82f6' },
  { icon: '🍳', label: 'Mevsimsel Kamp Yemekleri', sub: '4 mevsim · doğal malzeme & tarifler', path: '/mevsim-kamp', accent: '#22c55e' },
  { icon: '🌤️', label: 'Hava Durumu Okuma', sub: '5 bulut tipi · basınç & halk tahmini', path: '/hava-oku', accent: '#38bdf8' },
  { icon: '🌊', label: 'Deniz Balıkçılığı', sub: '4 yöntem · surf, jig, trolling, dip avı', path: '/deniz-av', accent: '#06b6d4' },
  { icon: '🔫', label: 'Av Silahı Bakımı', sub: '3 silah tipi · temizlik & güvenlik kuralları', path: '/silah-bakim', accent: '#f97316' },
  { icon: '🦅', label: 'Yırtıcı Kuşlar', sub: '5 tür · kartal, doğan, atmaca, kerkenez, akbaba', path: '/yirtici-kuslar', accent: '#f59e0b' },
  { icon: '🌱', label: 'Bitki Tanıma', sub: '4 kategori · yenilebilir, tıbbi, zehirli, gösterge', path: '/bitki-tanima', accent: '#22c55e' },
  { icon: '🐻', label: 'Yırtıcılarla Karşılaşma', sub: '4 tür · ayı, kurt, domuz, çakal — protokol', path: '/yirtici-karsi', accent: '#92400e' },
  { icon: '🤿', label: 'Dalış Rehberi', sub: 'Şnorkel · serbest dalış · tüplü — güvenlik', path: '/dalis', accent: '#06b6d4' },
  { icon: '🧭', label: 'Harita & Pusula', sub: 'İzohips · koordinat · triangülasyon', path: '/harita-oku', accent: '#a78bfa' },
  { icon: '🌲', label: 'Orman Tipi Rehberi', sub: 'Çam · meşe · kayın · karışık — av ipuçları', path: '/orman-tipi', accent: '#22c55e' },
  { icon: '🌊', label: 'Akıntı & Dalga', sub: '4 akıntı tipi · dip çekimi & kaçış teknikleri', path: '/akinti', accent: '#06b6d4' },
  { icon: '🦌', label: 'Büyük Av Rehberi', sub: 'Geyik · karaca · dağ keçisi · domuz', path: '/buyuk-av', accent: '#f59e0b' },
  { icon: '📡', label: 'Acil Haberleşme', sub: 'Telsiz · uydu · PLB · optik sinyal & Morse', path: '/acil-haberlesme', accent: '#22c55e' },
  { icon: '🌿', label: 'Doğa Kokuları', sub: 'Hayvan · bitki · su kokuları & avcı koku kontrolü', path: '/doga-koku', accent: '#22c55e' },
  { icon: '🧊', label: 'Buz Balıkçılığı', sub: 'Delik açma · jig · tip-up · güvenlik', path: '/buz-balik', accent: '#60a5fa' },
  { icon: '🫐', label: 'Yabani Meyveler', sub: 'Güvenli · zehirli · fındık — tanıma rehberi', path: '/yabani-meyve', accent: '#a78bfa' },
  { icon: '🎵', label: 'Kuş Sesi Rehberi', sub: 'Alarm · aktivite · mevsim & av çağrıları', path: '/kus-sesi-rehber', accent: '#f59e0b' },
  { icon: '🐾', label: 'İz Takip Rehberi', sub: '5 tür · domuz, geyik, kurt, ayı, tavşan', path: '/iz-takip', accent: '#f97316' },
  { icon: '🔥', label: 'Ateş Yakma', sub: 'Sürtünme · kıvılcım · mercek · pil — hayatta kalma', path: '/hayatta-ates', accent: '#ef4444' },
  { icon: '💧', label: 'Su Arıtma Rehberi', sub: 'Kaynatma · süzme · güneş · kimyasal', path: '/su-aritma', accent: '#06b6d4' },
  { icon: '🪢', label: 'Kamp Düğümleri', sub: '6 temel düğüm · adım adım bağlama rehberi', path: '/kamp-dugum', accent: '#22c55e' },
  { icon: '🌙', label: 'Gece Av Teknikleri', sub: 'Spotlight · termal · gece görüş · kamera tuzak', path: '/gece-av-teknik', accent: '#6366f1' },
  { icon: '📅', label: 'Avcı Takvimi', sub: 'Sezona göre tür · açık-kapalı dönemler', path: '/avci-takvim', accent: '#f97316' },
  { icon: '🪱', label: 'Yem & Suni Yem', sub: 'Sinek · yapay yem · canlı yem · boilie', path: '/yem-rehber', accent: '#f59e0b' },
  { icon: '🌊', label: 'Gelgit Rehberi', sub: 'Yükselen-alçalan su · balık aktivitesi & spot', path: '/gelgit', accent: '#06b6d4' },
  { icon: '🔊', label: 'Yaban Hayatı Sesleri', sub: 'Tehlike · aktivite · gece sesleri', path: '/yaban-ses', accent: '#6366f1' },
  { icon: '🍳', label: 'Kamp Mutfağı', sub: 'Ateş · ocak · hayatta kalma tarifi', path: '/kamp-yemek', accent: '#f97316' },
  { icon: '🪨', label: 'Balık Yapı Rehberi', sub: 'Su altı yapı · bitki · akıntı · mevsimsel', path: '/balik-yapi', accent: '#a78bfa' },
  { icon: '🏕️', label: 'Sığınak Yapımı', sub: 'Lean-to · debris · branda · kar sığınağı', path: '/siginak-yap', accent: '#22c55e' },
  { icon: '🥾', label: 'Doğa Yürüyüşü', sub: 'Günübirlik · çok günlü · navigasyon · acil', path: '/yuruyus', accent: '#22c55e' },
  { icon: '🎯', label: 'Mermi Rehberi', sub: 'Av tüfeği · tüfek kalibre · yasal çerçeve', path: '/mermi-rehber', accent: '#ef4444' },
  { icon: '📅', label: 'Mevsimlik Balık', sub: 'İlkbahar · yaz · sonbahar · kış stratejisi', path: '/mevsim-balik', accent: '#06b6d4' },
  { icon: '🌿', label: 'Kamuflaj Rehberi', sub: 'Orman · açık alan · ghillie · koku kontrolü', path: '/kamuflaj', accent: '#22c55e' },
  { icon: '🚑', label: 'Doğada İlk Yardım', sub: 'Yara · kırık · hipotermi · yılan ısırığı', path: '/doga-ilk-yardim', accent: '#ef4444' },
  { icon: '🎣', label: 'Sinek Atış Teknikleri', sub: 'Üst atış · rulo · spey · sinek tipleri', path: '/sinek-casting', accent: '#06b6d4' },
  { icon: '📷', label: 'Yaban Hayatı Fotoğrafı', sub: 'Yaklaşma · ışık · kamera ayarı · etik', path: '/yaban-foto', accent: '#f59e0b' },
  { icon: '⛵', label: 'Tekne Balıkçılığı', sub: 'Troll · jiging · demirli av', path: '/tekne-balik', accent: '#06b6d4' },
  { icon: '🏔️', label: 'Dağ Avı', sub: 'Dağ keçisi · domuz · geyik — strateji', path: '/dag-avi', accent: '#a78bfa' },
  { icon: '🏹', label: 'Ok Avcılığı', sub: 'Yay tipi · atış tekniği · etik mesafe', path: '/ok-avcilik', accent: '#f59e0b' },
  { icon: '🦆', label: 'Sulak Alan Kuşları', sub: 'Ördek · kaz · suçuluk · balıkçıl', path: '/sulak-kus', accent: '#06b6d4' },
  { icon: '🌲', label: 'Pusu Rehberi', sub: 'Tırmanma pususu · yer pusası · zamanlama', path: '/pusu-rehber', accent: '#22c55e' },
  { icon: '🌿', label: 'Yabani Besinler', sub: 'Yeşillikler · kökler · meyveler — güvenli', path: '/yabani-besin', accent: '#22c55e' },
  { icon: '🐟', label: 'Sazan Kurulumu', sub: 'Hair rig · method feeder · chod · spod', path: '/sazan-rig', accent: '#f59e0b' },
  { icon: '🎒', label: 'Sırt Çantası Ekipmanı', sub: 'Barınak · giysi · su-yemek · navigasyon', path: '/sirt-cantasi', accent: '#06b6d4' },
  { icon: '🦊', label: 'Tilki Avı', sub: 'Çağrı · pusu · köpekle av · gece teknikleri', path: '/tilki-av', accent: '#f97316' },
  { icon: '🐇', label: 'Yaban Tavşanı Avı', sub: 'Yürüyerek · beagle · tuzak · akşam pusası', path: '/tavsan-av', accent: '#a78bfa' },
  { icon: '🐟', label: 'Balık Tütsüleme', sub: 'Sıcak · soğuk · tuzlama · kurutma', path: '/balik-tutsule', accent: '#f97316' },
  { icon: '🦆', label: 'Ördek Tuzak Heykeli', sub: 'Kurulum desenleri · çağrı teknikleri', path: '/ordek-heykel', accent: '#06b6d4' },
  { icon: '🛶', label: 'Kano Rehberi', sub: 'Kürek darbesi · manevralar · güvenlik', path: '/kano-rehber', accent: '#06b6d4' },
  { icon: '🦅', label: 'Kuş Tanımlama', sub: 'Yırtıcı · su kuşu · ötücü · av kuşu', path: '/kus-tanimi', accent: '#f97316' },
  { icon: '🌾', label: 'Sazlık Balıkçılığı', sub: 'Kenar avı · sazlık delme · yapay yem', path: '/sazlik-balik', accent: '#22c55e' },
  { icon: '👃', label: 'Koku Kontrolü', sub: 'Vücut · kıyafet · rüzgar · çekici', path: '/koku-kontrol', accent: '#22c55e' },
  { icon: '🌊', label: 'Kıyı Balıkçılığı', sub: 'Surf casting · kayalık · iskele · suya girerek', path: '/kiyi-balik', accent: '#06b6d4' },
  { icon: '🌀', label: 'Spinner ve Yapay Yem', sub: 'Spinner · kaşık · jig · crankbait', path: '/spinner-balik', accent: '#f59e0b' },
  { icon: '🦜', label: 'Sülün Avı', sub: 'Köpekle · drive · yürüyerek tarama', path: '/sulun-av', accent: '#f97316' },
  { icon: '🐦', label: 'Bıldırcın Avı ve Çağrı', sub: 'Islık çağrı · sürü toplama · habitat', path: '/buldircin-av', accent: '#f59e0b' },
  { icon: '🦌', label: 'Geyik Scouting', sub: 'İz okuma · rub · nada · yatak bulma', path: '/geyik-scout', accent: '#a78bfa' },
  { icon: '⛵', label: 'Trol Balıkçılığı', sub: 'Temel trol · downrigger · planer · deniz', path: '/trol-balik', accent: '#06b6d4' },
  { icon: '🚀', label: 'Balık Çekici Sistemleri', sub: 'Spod · bait boat · PVA · method feeder', path: '/balik-cekici', accent: '#f97316' },
  { icon: '🦉', label: 'Gece Kuşları', sub: 'Baykuş · çobanaldatan · gece balıkçıl', path: '/gece-kuslar', accent: '#a78bfa' },
  { icon: '📷', label: 'Kamera Tuzak Rehberi', sub: 'Yerleştirme · ayarlar · güç · analiz', path: '/kamera-tuzak', accent: '#f97316' },
  { icon: '🌿', label: 'Sulak Alan Rehberi', sub: 'Bataklık · kıyı · delta · turbalık', path: '/sulak-alan', accent: '#22c55e' },
  { icon: '🐗', label: 'Yaban Domuzu Mutfağı', sub: 'Güveç · şiş · sucuk · parçalama', path: '/domuz-yemek', accent: '#f97316' },
  { icon: '🧭', label: 'Hayatta Kalma Navigasyonu', sub: 'Güneş · yıldız · doğal işaret · sinyal', path: '/hayatta-nav', accent: '#f59e0b' },
  { icon: '❄️', label: 'Kış Avı Stratejileri', sub: 'Kar üstü iz · soğuk · kış ekipmanı', path: '/kis-av', accent: '#60a5fa' },
  { icon: '🦞', label: 'Kerevit Avı Rehberi', sub: 'Tuzak · elle yakalama · pişirme', path: '/kerevit', accent: '#f97316' },
  { icon: '🏕️', label: 'Av Pusu İnşası', sub: 'Yer pusası · hub · platform · doğal', path: '/av-pusu', accent: '#22c55e' },
  { icon: '🌊', label: 'Akdeniz Balıkları', sub: 'Çipura · levrek · kefal · sinarit', path: '/akdeniz-balik', accent: '#06b6d4' },
  { icon: '🧂', label: 'Tuzluk Kurulumu', sub: 'Mineral blok · granül · yerleştirme', path: '/tuzluk', accent: '#f59e0b' },
  { icon: '🌊', label: 'Nehir Okuma', sub: 'Aktı · havuz · ters akıntı · oyuk kıyı', path: '/nehir-oku', accent: '#06b6d4' },
  { icon: '🎣', label: 'Yakala-Bırak Teknikleri', sub: 'Doğru tutma · kanca · canlandırma', path: '/yakala-birak', accent: '#22c55e' },
  { icon: '🥾', label: 'Yürüyüşte Beslenme', sub: 'Kalori · yiyecek · hidrasyon · zamanlama', path: '/yuruyus-beslen', accent: '#f97316' },
  { icon: '🏕️', label: 'Kamp Hijyeni', sub: 'Kişisel · yemek · atık · LNT prensipleri', path: '/kamp-hijyen', accent: '#22c55e' },
  { icon: '🏔️', label: 'Yüksek Dağ Rehberi', sub: 'İklim kuşakları · güvenlik · alp ekipman', path: '/alp-rehber', accent: '#60a5fa' },
  { icon: '🦇', label: 'Yarasa Gözlemi', sub: 'Türler · dedektör · gözlem teknikleri', path: '/yarasa-gozlem', accent: '#6366f1' },
  { icon: '🪸', label: 'Yapay Resif Balıkçılığı', sub: 'Resif türleri · hedef balıklar · jig', path: '/yapay-resif', accent: '#06b6d4' },
  { icon: '🌾', label: 'Bozkir Kuşları', sub: 'Keklik · bıldırcın · bozkirlak · kerkenez', path: '/bozkir-kuslar', accent: '#f59e0b' },
  { icon: '🐟', label: 'Alabalık Avcılığı', sub: 'Habitat · yemler · sezon · kurallar', path: '/alabalik-av', accent: '#06b6d4' },
  { icon: '📸', label: 'Foto Pusu', sub: 'Pusu türleri · kurulum · ekipman · etik', path: '/foto-pusu', accent: '#22c55e' },
  { icon: '🌳', label: 'Ağaç Tanıma', sub: 'Türkiye orman ağaçları · tanıma teknikleri', path: '/agac-tanimi', accent: '#22c55e' },
  { icon: '🎭', label: 'Doğal Kamuflaj', sub: 'Siluet · malzeme · hareket tekniği', path: '/dogal-kamuflaj', accent: '#22c55e' },
  { icon: '🏡', label: 'Kuş Evi Yapımı', sub: 'Tür boyutları · konum · bakım', path: '/kus-evi-yap', accent: '#a78bfa' },
  { icon: '🐝', label: 'Arı Güvenliği', sub: 'Önleme · sting tedavisi · türler', path: '/ari-guvenlik', accent: '#f59e0b' },
  { icon: '🏃', label: 'Doğa Koşusu', sub: 'Ekipman · teknik · beslenme · güvenlik', path: '/doga-kos', accent: '#f97316' },
  { icon: '🌊', label: 'Göl Ekolojisi', sub: 'Bölgeler · balık türleri · mevsimsel', path: '/gol-ekoloji', accent: '#06b6d4' },
  { icon: '🐟', label: 'Göç Eden Balıklar', sub: 'Lüfer · palamut · torik · alabalık', path: '/goc-balik', accent: '#06b6d4' },
  { icon: '🏕️', label: 'Vahşi Doğa Kampı', sub: 'Yer seçimi · çadır kurulumu · LNT', path: '/vahsi-kamp', accent: '#22c55e' },
  { icon: '🦅', label: 'Deniz Kuşları', sub: 'Karabatak · martı · dalgıç · şeytan kuşu', path: '/deniz-kuslar', accent: '#06b6d4' },
  { icon: '⚖️', label: 'Avcılık Etiği', sub: 'Fair chase · sorumluluk · koruma', path: '/av-etik-ileri', accent: '#f97316' },
  { icon: '🦜', label: 'Mevsimsel Kuş Gözlemi', sub: 'İlkbahar · yaz · sonbahar · kış', path: '/mevsim-kus', accent: '#22c55e' },
  { icon: '🎣', label: 'Boilies Rehberi', sub: 'Tarif · teknik · saklama', path: '/boilies', accent: '#f59e0b' },
  { icon: '🦢', label: 'Su Kuşları', sub: 'Balıkçıl · batagan · kazlar · turna', path: '/su-kuslar', accent: '#06b6d4' },
  { icon: '🪶', label: 'Tüy Tanıma', sub: 'Tüy tipleri · tanıma ipuçları', path: '/tuy-tanimi', accent: '#a78bfa' },
  { icon: '🐗', label: 'Domuz Av Koku Kontrolu', sub: 'Koku yönetimi · domuz davranışı', path: '/domuz-koku', accent: '#f97316' },
  { icon: '🏖️', label: 'Kıyıdan Balıkçılık', sub: 'Noktalar · donanım · gelgit zamanı', path: '/kiyi-olta', accent: '#06b6d4' },
  { icon: '🦉', label: 'Baykuş Rehberi', sub: 'Türkiye baykuşları · habitat · gece gözlemi', path: '/baykus-rehber', accent: '#a78bfa' },
  { icon: '🏞️', label: 'Nehir Ekolojisi', sub: 'Bölgeler · canlılar · sağlık göstergeleri', path: '/nehir-ekoloji', accent: '#06b6d4' },
  { icon: '🐸', label: 'Amfibi Rehberi', sub: 'Kurbagalar · semenderler · habitat', path: '/amfibi', accent: '#22c55e' },
  { icon: '🐕', label: 'Av Köpeği Eğitimi', sub: 'Irklar · temel eğitim · saha bakımı', path: '/kopek-egitim', accent: '#f97316' },
  { icon: '🛶', label: 'Deniz Kayangu', sub: 'Ekipman · teknikler · güvenlik', path: '/deniz-kayak', accent: '#06b6d4' },
  { icon: '🍄', label: 'Mantar Güvenliği', sub: 'Zehirliler · güvenlik kuralları · yenilebilir', path: '/mantar-guvenlik', accent: '#f97316' },
  { icon: '⛵', label: 'Açık Deniz Rehberi', sub: 'Güvenlik · balıkçılık · navigasyon', path: '/acik-deniz', accent: '#06b6d4' },
  { icon: '🌾', label: 'Bataklık Rehberi', sub: 'Sazlık yaban hayatı · gözlem', path: '/bataklık', accent: '#22c55e' },
  { icon: '🔬', label: 'Balıkçılık Fiziği', sub: 'Atış mekaniği · su fiziği · algı', path: '/balik-fizik', accent: '#06b6d4' },
  { icon: '🦎', label: 'Kertenkele Rehberi', sub: 'Türkiye türleri · habitat · gözlem', path: '/kertenkele', accent: '#22c55e' },
  { icon: '🗺️', label: 'Biyoçeşitlilik Noktaları', sub: 'Türkiye en zengin doğa alanları', path: '/biyocesitlilik', accent: '#22c55e' },
  { icon: '🐗', label: 'Yaban Domuzu Avı', sub: 'Davranış · taktikler · güvenlik', path: '/yaban-domuz-av', accent: '#f97316' },
  { icon: '🌌', label: 'Kampta Gökyüzü', sub: 'Yıldız gözlemi · meteor · Samanyolu', path: '/kamp-gokyuzu', accent: '#818cf8' },
  { icon: '🎣', label: 'Tuzlu Su Sinek Casting', sub: 'Ekipman · hedef türler · teknikler', path: '/tuzlu-sinek', accent: '#06b6d4' },
  { icon: '❄️', label: 'Kış Kampı', sub: 'Barınak · ısı yönetimi · güvenlik', path: '/kis-kamp', accent: '#60a5fa' },
  { icon: '🌲', label: 'Orman Toplama', sub: 'Yenilebilir bitkiler · güvenlik · mevsim', path: '/orman-toplama', accent: '#22c55e' },
  { icon: '🐙', label: 'Ahtapot Avı', sub: 'Yöntemler · ipuçları · temizleme', path: '/ahtapot-av', accent: '#f97316' },
  { icon: '🦌', label: 'Geyik Çağrısı', sub: 'Çağrı türleri · zamanlama · teknik', path: '/geyik-cagri', accent: '#f59e0b' },
  { icon: '🛥️', label: 'Tekne Bakımı', sub: 'Motor · gövde · güvenlik ekipmanı', path: '/tekne-bakim', accent: '#f97316' },
  { icon: '🐠', label: 'Yayın Balığı', sub: 'Habitat · yemler · donanım', path: '/yayin-balik', accent: '#06b6d4' },
  { icon: '🐝', label: 'Doğal Arıcılık', sub: 'Kovan · bal hasadı · arılık yeri', path: '/dogal-aricilik', accent: '#f59e0b' },
  { icon: '🐍', label: 'Yılan Balığı Avı', sub: 'Habitat · yem · teknik · pişirme', path: '/yilan-balik', accent: '#06b6d4' },
  { icon: '☁️', label: 'Bulut Okuma', sub: 'Doğa meteorolojisi · hava işaretleri', path: '/bulut-oku', accent: '#60a5fa' },
  { icon: '🦅', label: 'Yırtıcı Kuş Gözlemi', sub: 'Türler · tanıma · termal süzülme', path: '/sahi-kus', accent: '#f59e0b' },
  { icon: '🌿', label: 'Yosun Rehberi', sub: 'Yön bulma · nem işareti · doğa okuması', path: '/yosun-rehber', accent: '#22c55e' },
  { icon: '🐸', label: 'Kurbağa Yem Teknikleri', sub: 'Yüzey yemi · kanca · çekme tekniği', path: '/kurbaga-yem', accent: '#22c55e' },
  { icon: '🐟', label: 'Orkinos & Palamut Avı', sub: 'Türler · troll · jigging · açık deniz', path: '/orkinos-av', accent: '#06b6d4' },
  { icon: '🦪', label: 'İstiridye Toplama', sub: 'Habitat · toplama · açma · pişirme', path: '/istiridye', accent: '#06b6d4' },
  { icon: '🪱', label: 'Solucan Yetiştirme', sub: 'Kutu kurulumu · besleme · yem hasadı', path: '/solucan-yetistir', accent: '#22c55e' },
  { icon: '🐗', label: 'Domuz İzi Okuma', sub: 'Yaban domuzu takibi · iz tipleri', path: '/domuz-iz', accent: '#f97316' },
  { icon: '🏊', label: 'Nehirde Güvenli Yüzme', sub: 'Riskler · güvenlik · teknikler', path: '/nehir-yuzme', accent: '#06b6d4' },
  { icon: '🍯', label: 'Yabani Bal Arama', sub: 'Kovan bulma · güvenli toplama · türler', path: '/yabani-bal', accent: '#f59e0b' },
  { icon: '🕷️', label: 'Zehirli Örümcekler', sub: 'Karakurt · korunma · ilk yardım', path: '/orumcek-guvenlik', accent: '#a78bfa' },
  { icon: '🛶', label: 'Kayaktan Balıkçılık', sub: 'Kayak kurulumu · teknikler · güvenlik', path: '/kayak-balik', accent: '#06b6d4' },
  { icon: '🌊', label: 'Kıyı Yenilebilir Toplama', sub: 'Deniz yiyecekleri · güvenlik · mevsim', path: '/kiyi-toplama', accent: '#06b6d4' },
  { icon: '🧭', label: 'Arazi Navigasyonu', sub: 'Pusula · topografik harita · doğal yön', path: '/arazi-nav', accent: '#f59e0b' },
  { icon: '🍃', label: 'Mevsimlik Yabani Besinler', sub: 'İlkbahar · yaz · sonbahar · toplama', path: '/mevsim-besin', accent: '#22c55e' },
  { icon: '🐦', label: 'Kuş Yuvası Rehberi', sub: 'Yuva tipleri · gözlem etiği · koruma', path: '/kus-yuvasi', accent: '#22c55e' },
  { icon: '🧵', label: 'Misina Seçimi & Düğümler', sub: 'Misina tipleri · düğüm teknikleri', path: '/misina-secimi', accent: '#3b82f6' },
  { icon: '🌡️', label: 'Termal Akımlar & Avcılık', sub: 'Hava dinamikleri · kuş takibi · rüzgar', path: '/termal-av', accent: '#f97316' },
  { icon: '🎨', label: 'El Yapımı Sahte Yem', sub: 'Streamer · teneke kaşık · jig yapımı', path: '/sahte-yem-yap', accent: '#f97316' },
  { icon: '🦃', label: 'Yabani Hindi Avı', sub: 'Çağrı türleri · zamanlama · teknikler', path: '/yabani-hindi', accent: '#f59e0b' },
  { icon: '🐚', label: 'Deniz Salyangozları', sub: 'Türler · toplama · pişirme rehberi', path: '/deniz-salyangozu', accent: '#06b6d4' },
  { icon: '🦀', label: 'Yengec Avcilik', sub: 'Yöntemler · türler · haşlama', path: '/yengec-av', accent: '#f97316' },
  { icon: '🌙', label: 'Gece Yürüyüsü', sub: 'Güvenlik · aydınlatma · ekipman', path: '/gece-yuruyus', accent: '#6366f1' },
  { icon: '🦑', label: 'Kalamar Avı', sub: 'Egi jig · ekipman · pişirme', path: '/kalamar-av', accent: '#a78bfa' },
  { icon: '🌪️', label: 'Kum Fırtınası Güvenlik', sub: 'İşaretler · korunma · ekipman', path: '/toz-firtinasi', accent: '#f59e0b' },
  { icon: '⛺', label: 'Kamp Tarpı Rehberi', sub: 'Kurulum · gergi · tarp türleri', path: '/kamp-tarp', accent: '#22c55e' },
  { icon: '🦢', label: 'Yabani Kaz Avı', sub: 'Çağrı · heykel · mevsim', path: '/yabani-kaz', accent: '#60a5fa' },
  { icon: '🪢', label: 'Denizci Düğüm Rehberi', sub: 'Temel düğümler · güvenlik', path: '/denizci-dugum', accent: '#06b6d4' },
  { icon: '🐟', label: 'Zargana Avı', sub: 'Habitat · yöntemler · pişirme', path: '/zargana', accent: '#22c55e' },
  { icon: '🦔', label: 'Deniz Kirpisi Toplama', sub: 'Toplama · açma · pişirme', path: '/deniz-kirpisi', accent: '#06b6d4' },
  { icon: '⛷️', label: 'Arazi Kayakçılığı', sub: 'Ekipman · tırmanış · lawina güvenliği', path: '/arazi-kayak', accent: '#60a5fa' },
  { icon: '🦟', label: 'Sivrisinek Güvenliği', sub: 'Korunma · hastalık · önlemler', path: '/sivrisinek-guvenlik', accent: '#22c55e' },
  { icon: '🦚', label: 'Sülün Pişirme', sub: 'Temizleme · yumuşatma · pişirme', path: '/sulun-pisirme', accent: '#f59e0b' },
  { icon: '🌊', label: 'Sahil Casting', sub: 'Atış tekniği · donanım · surf fishing', path: '/sahil-casting', accent: '#06b6d4' },
  { icon: '🐍', label: 'Su Yılanları', sub: 'Türler · tanıma · güvenlik', path: '/su-yilani', accent: '#22c55e' },
  { icon: '🐡', label: 'Vatoz & Torpil Rehberi', sub: 'Türler · güvenlik · pişirme', path: '/vatoz-rehber', accent: '#06b6d4' },
  { icon: '🏮', label: 'Kamp Feneri Rehberi', sub: 'Fener türleri · kullanım · ışık', path: '/kamp-fener', accent: '#f59e0b' },
  { icon: '🏹', label: 'Avcılık Etiği İlkeleri', sub: 'Temiz atış · saygı · gelenek', path: '/av-etik-ilkeler', accent: '#f97316' },
  { icon: '🌊', label: 'Kayalık Havuz Rehberi', sub: 'Canlılar · gözlem · etik', path: '/kayalik-havuz', accent: '#06b6d4' },
  { icon: '🐠', label: 'Çipura & Sargo Avı', sub: 'Türler · yemler · teknikler', path: '/cipura-av', accent: '#06b6d4' },
  { icon: '🐐', label: 'Yaban Keçisi Gözlemi', sub: 'Habitat · gözlem · türler', path: '/yaban-keci', accent: '#a78bfa' },
  { icon: '🌊', label: 'Gelgit Havuzu Güvenliği', sub: 'Güvenlik · ekipman · gözlem', path: '/gelgit-guvenlik', accent: '#06b6d4' },
  { icon: '🏹', label: 'Yay Avcılığı', sub: 'Yay türleri · teknik · taktikler', path: '/yay-avciligi', accent: '#f59e0b' },
  { icon: '🌿', label: 'Deniz Yosunu Rehberi', sub: 'Türler · yenilebilir · kullanım', path: '/deniz-yosunu', accent: '#22c55e' },
  { icon: '🏊', label: 'Gölde Güvenli Yüzme', sub: 'Güvenlik · alg · ipuçları', path: '/gol-yuzme', accent: '#3b82f6' },
  { icon: '🦋', label: 'Yusufcuk Rehberi', sub: 'Türler · habitat · gözlem', path: '/yusufcuk', accent: '#06b6d4' },
  { icon: '🌊', label: 'Tuzlu Su Balıkçılığı', sub: 'Alanlar · teknikler · donanım', path: '/tuzlu-su-balik', accent: '#06b6d4' },
  { icon: '🍳', label: 'Kamp Yemek Planlaması', sub: 'Planlama · depolama · tarifler', path: '/kamp-yemek-plan', accent: '#22c55e' },
  { icon: '🌙', label: 'Gece Kampı Rehberi', sub: 'Hazırlık · konfor · güvenlik', path: '/gece-kamp', accent: '#818cf8' },
  { icon: '🐦', label: 'Orman Kuşları Rehberi', sub: 'Türler · katmanlar · gözlem', path: '/orman-kuslari', accent: '#22c55e' },
  { icon: '🌙', label: 'Gece Görüş Cihazları', sub: 'Teknoloji · seçim · kullanım', path: '/gece-gorus', accent: '#6366f1' },
  { icon: '🦆', label: 'Ördek Pişirme', sub: 'Temizleme · marinasyon · pişirme', path: '/ordek-pisirme', accent: '#f59e0b' },
  { icon: '🦈', label: 'Köpekbalığı Rehberi', sub: 'Türler · davranış · güvenlik', path: '/kopekbaligi', accent: '#3b82f6' },
  { icon: '🏔️', label: 'Kanyon Yürüyüşü', sub: 'Güvenlik · sel riski · ekipman', path: '/kanyon-yuruyus', accent: '#f97316' },
  { icon: '🦤', label: 'Keklik Avı', sub: 'Yöntemler · alan · mevsim', path: '/keklik-av', accent: '#f97316' },
  { icon: '🪸', label: 'Mercan Rehberi', sub: 'Gözlem · koruma · snorkel', path: '/mercan-rehber', accent: '#f97316' },
  { icon: '🥗', label: 'Yabani Salata Bitkileri', sub: 'Bitkiler · toplama · güvenlik', path: '/yabani-salata', accent: '#22c55e' },
  { icon: '⛽', label: 'Kamp Yakıt Rehberi', sub: 'Yakıt türleri · güvenlik · seçim', path: '/kamp-yakit', accent: '#f97316' },
  { icon: '🌸', label: 'Yabani Çiçek Tanıma', sub: 'İlkbahar · yaz · alan türleri', path: '/yabani-cicek-id', accent: '#ec4899' },
  { icon: '☀️', label: 'Yaz Kampı Rehberi', sub: 'İpuçları · sıcak hava · ekipman', path: '/yaz-kamp', accent: '#f59e0b' },
  { icon: '🐟', label: 'Turna Balığı Avı', sub: 'Teknikler · habitat · mevsim', path: '/turna-balik', accent: '#22c55e' },
  { icon: '🌧️', label: 'Yağmurda Balıkçılık', sub: 'İpuçları · ekipman · teknik', path: '/yagmurda-balikcilik', accent: '#3b82f6' },
  { icon: '🥜', label: 'Yürüyüş Atıştırmalıkları', sub: 'Enerji · paketleme · tarifler', path: '/yuruyus-atistirmalik', accent: '#f59e0b' },
  { icon: '🐚', label: 'Sahil Toplama', sub: 'Ne bulunur · ipuçları', path: '/sahil-toplama', accent: '#06b6d4' },
  { icon: '🐦', label: 'Karabatak Rehberi', sub: 'Türler · habitat · gözlem', path: '/karabatak', accent: '#06b6d4' },
  { icon: '🦌', label: 'Geyik Çağrısı Teknikleri', sub: 'Çağrı türleri · zamanlama', path: '/geyik-sesleri', accent: '#f59e0b' },
  { icon: '🌿', label: 'Eğreltiotu Rehberi', sub: 'Türler · habitat · ekoloji', path: '/egrelti', accent: '#22c55e' },
  { icon: '💨', label: 'Balık Tütsüleme', sub: 'Hazırlık · tuzlama · yöntemler', path: '/balik-tutsuleme2', accent: '#f97316' },
  { icon: '🐦', label: 'Nehir Kuşları', sub: 'Türler · habitat · gözlem', path: '/nehir-kuslari', accent: '#06b6d4' },
  { icon: '🌙', label: 'Gece Yüzme', sub: 'Güvenlik · biyolüminesans', path: '/gece-yuzme', accent: '#818cf8' },
  { icon: '🌸', label: 'İlkbahar Balıkçılığı', sub: 'Noktalar · teknikler · mevsim', path: '/ilkbahar-balik', accent: '#34d399' },
  { icon: '🟤', label: 'Çamurlu Su Balıkçılığı', sub: 'Teknik · noktalar · yem', path: '/camurlu-su', accent: '#a16207' },
  { icon: '🦉', label: 'Baykuş Gözlemi', sub: 'Türler · habitat · gece', path: '/baykus-gozlem', accent: '#7c3aed' },
  { icon: '🐗', label: 'Yaban Domuzu Takibi', sub: 'İzler · davranış · güvenlik', path: '/yaban-domuzu', accent: '#f97316' },
  { icon: '🐟', label: 'Levrek Avı', sub: 'Teknik · noktalar · yem', path: '/levrek-av', accent: '#2563eb' },
  { icon: '❄️', label: 'Kış Kampçılığı', sub: 'Barınak · ısı · hayatta kalma', path: '/kis-kamp', accent: '#60a5fa' },
  { icon: '🍄', label: 'Yabani Mantar Tanıma', sub: 'Yenilebilir · tehlikeli', path: '/yabani-mantar', accent: '#f59e0b' },
  { icon: '🎣', label: 'Fly Fishing Rehberi', sub: 'Teknik · sinekler · alabalık', path: '/fly-fishing', accent: '#0ea5e9' },
  { icon: '🐻', label: 'Ayı Güvenliği', sub: 'Önleme · karşılaşma · spray', path: '/ayi-guvenligi', accent: '#f59e0b' },
  { icon: '🐟', label: 'Alabalık Pişirme', sub: 'Temizleme · pişirme · tarifler', path: '/alabalik-pisirme', accent: '#16a34a' },
  { icon: '🦅', label: 'Göçmen Kuşlar', sub: 'Türler · rota · mevsim', path: '/gocmen-kuslar', accent: '#0284c7' },
  { icon: '🪨', label: 'Kayalık Olta', sub: 'Teknik · güvenlik · ekipman', path: '/kayalik-olta', accent: '#0891b2' },
  { icon: '🔥', label: 'Kamp Ateşi Yemekleri', sub: 'Hazırlık · tarifler · kamp', path: '/kamp-atesi-yemek', accent: '#f97316' },
  { icon: '🐺', label: 'Kurt Takibi', sub: 'İzler · davranış · güvenlik', path: '/kurt-takibi', accent: '#6b7280' },
  { icon: '🌕', label: 'Ay Etkili Balıkçılık', sub: 'Ay fazları · gel-git · gece', path: '/ay-balikcilik', accent: '#4338ca' },
  { icon: '🌿', label: 'Dağ Bitkileri Kullanımı', sub: 'Bitkiler · toplama · kullanım', path: '/dag-bitkileri', accent: '#22c55e' },
  { icon: '🦃', label: 'Yaban Hindi Pişirme', sub: 'Hazırlık · marinasyon · pişirme', path: '/yaban-hindi-pis', accent: '#b45309' },
  { icon: '🕳️', label: 'Mağara Keşfi', sub: 'Güvenlik · doğa · ekipman', path: '/magara-kesfi', accent: '#8b5cf6' },
  { icon: '💧', label: 'Su Arıtma', sub: 'Yöntemler · kaynaklar · güvenli', path: '/su-aritma', accent: '#0369a1' },
  { icon: '🌊', label: 'Gel-Git Balıkçılığı', sub: 'Zamanlama · teknik · takvim', path: '/gelgit-balik', accent: '#0284c7' },
  { icon: '🌄', label: 'Gündoğumu Yürüyüşü', sub: 'Planlama · gece yürüyüş · deneyim', path: '/gundogumu-yuruyus', accent: '#ea580c' },
  { icon: '🚣', label: 'Deniz Kaykı', sub: 'Teknik · güvenlik · açık deniz', path: '/deniz-kayak', accent: '#0369a1' },
  { icon: '🦌', label: 'Karaca Takibi', sub: 'İzler · davranış · habitat', path: '/karaca-takibi', accent: '#78350f' },
  { icon: '🍂', label: 'Sonbahar Kuş Gözlemi', sub: 'Türler · göç · gözlem noktası', path: '/sonbahar-kus', accent: '#b45309' },
  { icon: '🦞', label: 'Istakoz Rehberi', sub: 'Yakalama · yasal · pişirme', path: '/istakoz', accent: '#dc2626' },
  { icon: '🐟', label: 'Hamsi Avcılığı', sub: 'Teknik · sürü · pişirme', path: '/hamsi-av', accent: '#0284c7' },
  { icon: '🧼', label: 'Kamp Hijyeni 2', sub: 'Kişisel · kamp · LNT', path: '/kamp-hijyeni', accent: '#0e7490' },
  { icon: '🐗', label: 'Yaban Domuzu Pişirme', sub: 'Hazırlık · marinasyon · pişirme', path: '/yaban-dom-pisir', accent: '#f59e0b' },
  { icon: '🐢', label: 'Kaplumbağa Gözlemi', sub: 'Türler · yuvalama · gözlem', path: '/kaplumbaga-gozlem', accent: '#15803d' },
  { icon: '🧊', label: 'Buz Yürüyüşü', sub: 'Ekipman · güvenlik · buz testi', path: '/buz-yuruyu', accent: '#60a5fa' },
  { icon: '🦆', label: 'Su Kuşu Yem Kurulumu', sub: 'Kurulum · çağrı · teknik', path: '/su-kusu-yem', accent: '#1d4ed8' },
  { icon: '🌿', label: 'Yosun Biyoçeşitliliği', sub: 'Türler · ekoloji · habitat', path: '/yosun-ekosistem', accent: '#166534' },
  { icon: '🌊', label: 'Kanal Balıkçılığı', sub: 'Teknik · noktalar · akıntı', path: '/kanal-balikcilik', accent: '#155e75' },
  { icon: '🏔️', label: 'Yüksek İrtifa Yürüyüşü', sub: 'Aklimatizasyon · ekipman · AMS', path: '/yuksek-irtifa', accent: '#4338ca' },
  { icon: '🐟', label: 'Uskumru Avcılığı', sub: 'Teknik · sürü · pişirme', path: '/uskumru-av', accent: '#0369a1' },
  { icon: '🧗', label: 'Bouldering Rehberi', sub: 'Teknik · güvenlik · kaya', path: '/bouldering', accent: '#9333ea' },
  { icon: '🌿', label: 'Yabani Otlar & Baharatlar', sub: 'Baharatlar · toplama · saklama', path: '/yabani-otlar', accent: '#22c55e' },
  { icon: '🐟', label: 'Çipura Avı', sub: 'Teknik · noktalar · yem', path: '/cipura-av2', accent: '#0369a1' },
  { icon: '🐝', label: 'Arı Güvenliği', sub: 'Türler · ilk yardım · anafilaksi', path: '/ari-guvenligi', accent: '#b45309' },
  { icon: '🌊', label: 'Nehir Geçişi', sub: 'Değerlendirme · teknik · güvenlik', path: '/nehir-gecisi', accent: '#06b6d4' },
  { icon: '🪨', label: 'Liken Rehberi', sub: 'Türler · ekoloji · biyoindikatör', path: '/liken-rehberi', accent: '#65a30d' },
  { icon: '🦅', label: 'Yırtıcı Kuş Gözlemi', sub: 'Türler · gözlem · habitat', path: '/yirtici-kus-gozlem', accent: '#b45309' },
  { icon: '🦪', label: 'Midye Pişirme', sub: 'Toplama · pişirme · güvenlik', path: '/midye-pisirme', accent: '#0e7490' },
  { icon: '🥾', label: 'Kar Ayakkabısı', sub: 'Teknik · ekipman · güzergah', path: '/kar-ayakkabisi', accent: '#1d4ed8' },
  { icon: '🦆', label: 'Sulak Alan Kuşları', sub: 'Türler · gözlem · mevsim', path: '/sulak-alan-kuslari', accent: '#0e7490' },
  { icon: '🌿', label: 'Yabani Umbel Bitkiler', sub: 'Yenilebilir · zehirli · teşhis', path: '/yabani-umbel', accent: '#f59e0b' },
  { icon: '🪂', label: 'Yamaç Paraşütü', sub: 'Ekipman · güvenlik · hava', path: '/yamac-parasut', accent: '#0284c7' },
  { icon: '🦦', label: 'Vizon Takibi', sub: 'İzler · davranış · habitat', path: '/vizon-takibi', accent: '#818cf8' },
  { icon: '🐢', label: 'Deniz Kaplumbağası', sub: 'Türler · dalış · koruma', path: '/deniz-kaplum-dalisi', accent: '#2dd4bf' },
  { icon: '🍵', label: 'Yabani Çay Rehberi', sub: 'Bitkiler · toplama · demleme', path: '/yabani-cay', accent: '#4ade80' },
  { icon: '🍄', label: 'Orman Mantarları', sub: 'Yenilebilir · zehirli · teşhis', path: '/orman-mantarlari', accent: '#d97706' },
  { icon: '🦂', label: 'Akrep Rehberi', sub: 'Tanımlama · güvenlik · ilk yardım', path: '/akrep-rehberi', accent: '#f59e0b' },
  { icon: '🌸', label: 'Alpin Çiçekler', sub: 'Türler · mevsim · koruma', path: '/alpin-cicekler', accent: '#a78bfa' },
  { icon: '🏞️', label: 'Nehir Av Haritası', sub: 'Noktalar · sezon · akıntı', path: '/nehir-av-haritasi', accent: '#34d399' },
  { icon: '🌌', label: 'Gece Gökyüzü', sub: 'Takımyıldız · gözlem · konum', path: '/gece-gokyuzu', accent: '#818cf8' },
  { icon: '🐍', label: 'Yılan Rehberi', sub: 'Tanımlama · davranış · ilk yardım', path: '/yilan-rehberi', accent: '#16a34a' },
  { icon: '🦑', label: 'Kalamari Avı', sub: 'Egi · gece · pişirme', path: '/kalamari-av', accent: '#c4b5fd' },
  { icon: '🦉', label: 'Baykuş Yuvalama', sub: 'Türler · gözlem · ses', path: '/baykus-yuvalama', accent: '#d1d5db' },
  { icon: '🧊', label: 'Buz Tırmanışı', sub: 'Ekipman · teknik · güvenlik', path: '/buz-tirmanis', accent: '#38bdf8' },
  { icon: '🐗', label: 'Domuz Eti Tarifleri', sub: 'Hazırlık · marine · pişirme', path: '/domuz-tarifleri', accent: '#fbbf24' },
  { icon: '🦟', label: 'Sivrisinek Rehberi', sub: 'Tanımlama · korunma · hastalık', path: '/sivrisinek-rehberi', accent: '#dc2626' },
  { icon: '🦞', label: 'Tatlısu Yengeci', sub: 'Habitat · ekoloji · koruma', path: '/tatlisuyu-yengeci', accent: '#4ade80' },
  { icon: '🤿', label: 'Mağara Dalışı', sub: 'Ekipman · güvenlik · noktalar', path: '/magara-dalisi', accent: '#38bdf8' },
  { icon: '🍂', label: 'Sonbahar Hasatı', sub: 'Toplama · saklama · tarifler', path: '/sonbahar-hasati', accent: '#fb923c' },
  { icon: '🏖️', label: 'Kumul Ekolojisi', sub: 'Ekoloji · fauna · aktivite', path: '/kumul-ekoloji', accent: '#fde047' },
  { icon: '🐺', label: 'Kurt Davranışı', sub: 'İzler · ekoloji · güvenlik', path: '/kurt-davranisi', accent: '#9ca3af' },
  { icon: '🐟', label: 'Alabalık Rehberi', sub: 'Doğal av · sezon · pişirme', path: '/alabalik-rehberi', accent: '#2dd4bf' },
  { icon: '🌿', label: 'Yosun Tanımlama', sub: 'Türler · ekoloji · kılavuz', path: '/yosun-tanimlama', accent: '#86efac' },
  { icon: '🕷️', label: 'Örümcek Rehberi', sub: 'Tanımlama · ekoloji · güvenlik', path: '/orumcek-rehberi', accent: '#a78bfa' },
  { icon: '🐬', label: 'Yunus Gözlemi', sub: 'Türler · gözlem · etik', path: '/yunus-gozlem', accent: '#38bdf8' },
  { icon: '🧄', label: 'Yabani Sarımsak', sub: 'Toplama · tanımlama · pişirme', path: '/yabani-sarimsak', accent: '#a3e635' },
  { icon: '🐟', label: 'Kefal Avı', sub: 'Teknik · yem · pişirme', path: '/kefal-avi', accent: '#93c5fd' },
  { icon: '🐱', label: 'Vaşak Takibi', sub: 'İzler · ekoloji · gözlem', path: '/vasak-takibi', accent: '#d97706' },
  { icon: '🦐', label: 'Karides Avı', sub: 'Yöntem · nokta · pişirme', path: '/karides-avi', accent: '#fb7185' },
  { icon: '🪨', label: 'Jeoloji Yürüyüşü', sub: 'Kayaçlar · fosil · formasyon', path: '/jeoloji-yuruyus', accent: '#d6d3d1' },
  { icon: '🐍', label: 'Yılan Balığı Avı', sub: 'Teknik · gece · pişirme', path: '/yilan-baligi', accent: '#4ade80' },
  { icon: '🎵', label: 'Kuş Sesi Rehberi', sub: 'Sesler · tanımlama · etik', path: '/kus-sesi', accent: '#7dd3fc' },
  { icon: '🍓', label: 'Yabani Meyveler', sub: 'Toplama · tanımlama · kullanım', path: '/yabani-meyvecik', accent: '#f9a8d4' },
  { icon: '🐠', label: 'Çipura Avı', sub: 'Teknik · nokta · pişirme', path: '/cipura-avi', accent: '#7dd3fc' },
  { icon: '🐟', label: 'Somon Rehberi', sub: 'Habitat · göç · gözlem', path: '/somon-rehberi', accent: '#fda4af' },
  { icon: '🍄', label: 'Trüf Avı', sub: 'Bulma · mevsim · kullanım', path: '/truf-avi', accent: '#d97706' },
  { icon: '🐦', label: 'Martı Gözlemi', sub: 'Türler · davranış · fotoğraf', path: '/marti-gozlem', accent: '#22d3ee' },
  { icon: '🦇', label: 'Yarasa Gözlemi', sub: 'Türler · gözlem · koruma', path: '/yarasa-gozlem', accent: '#c4b5fd' },
  { icon: '🐙', label: 'Ahtapot Avı', sub: 'Yöntem · tuzak · pişirme', path: '/ahtapot-avi', accent: '#d8b4fe' },
  { icon: '🏔️', label: 'Yayla Ekolojisi', sub: 'Ekoloji · bitki · yürüyüş', path: '/yayla-ekoloji', accent: '#86efac' },
  { icon: '🦢', label: 'Pelikan Gözlemi', sub: 'Türler · gözlem · koruma', path: '/pelikan-gozlem', accent: '#7dd3fc' },
  { icon: '🐗', label: 'Domuz Ekolojisi', sub: 'Ekoloji · davranış · izler', path: '/domuz-ekoloji', accent: '#fdba74' },
  { icon: '🐸', label: 'Kurbağa Rehberi', sub: 'Türler · ekoloji · ses', path: '/kurbaga-rehberi', accent: '#4ade80' },
  { icon: '🐟', label: 'Turna Avı', sub: 'Teknik · nokta · pişirme', path: '/turna-avi', accent: '#bef264' },
  { icon: '🦞', label: 'Akdeniz Deniz Ürünleri', sub: 'Ürünler · av · pişirme', path: '/akdeniz-deniz', accent: '#0e7490' },
  { icon: '🌾', label: 'Çayır Ekolojisi', sub: 'Bitkiler · fauna · koruma', path: '/cayir-ekoloji', accent: '#6ee7b7' },
  { icon: '🦅', label: 'Leylek Göçü', sub: 'Göç · gözlem · rotalar', path: '/leylek-gocu', accent: '#4d7c0f' },
  { icon: '🦔', label: 'Deniz Kestanesi', sub: 'Bulma · pişirme · mevsim', path: '/deniz-kestanesi', accent: '#9333ea' },
  { icon: '🦌', label: 'Kızıl Geyik Bağırması', sub: 'Bağırma · gözlem · dönem', path: '/kizil-geyik', accent: '#d97706' },
  { icon: '🦉', label: 'Puhu Baykuşu', sub: 'Habitat · gözlem · ses', path: '/puhu-baykus', accent: '#b45309' },
  { icon: '🌿', label: 'Yabani Kekik', sub: 'Toplama · kullanım · kurutma', path: '/yabani-kekik', accent: '#65a30d' },
  { icon: '🐦', label: 'Karabatak Gözlemi', sub: 'Biyoloji · gözlem · göç', path: '/karabatak', accent: '#0369a1' },
  { icon: '🐟', label: 'Sazan Avcılığı', sub: 'Teknik · yem · pişirme', path: '/sazan-avi', accent: '#0e7490' },
  { icon: '🦊', label: 'Tilki İz Takibi', sub: 'İz · gözlem · habitat', path: '/tilki-iz', accent: '#c2410c' },
  { icon: '🌱', label: 'Isırgan Otu', sub: 'Hasat · pişirme · şifa', path: '/isirgan-otu', accent: '#15803d' },
  { icon: '🌿', label: 'Yabani Adaçayı', sub: 'Toplama · kullanım · tıp', path: '/adacayi', accent: '#7c3aed' },
  { icon: '🌰', label: 'Fındık Hasadı', sub: 'Hasat · kurutma · kullanım', path: '/findik-hasadi', accent: '#92400e' },
  { icon: '🕊️', label: 'Göçmen Kuşlar', sub: 'İlkbahar · sonbahar · güzergah', path: '/gocmen-kuslar', accent: '#059669' },
  { icon: '🍄', label: 'Yabani Mantar', sub: 'Tanıma · pişirme · güvenlik', path: '/yabani-mantar', accent: '#854d0e' },
  { icon: '🦢', label: 'Kelaynak Gözlemi', sub: 'Biyoloji · koruma · Birecik', path: '/kelaynak', accent: '#be185d' },
  { icon: '🌾', label: 'Bataklık Avcılığı', sub: 'Teknik · türler · sazlık', path: '/bataklık-avi', accent: '#0f766e' },
  { icon: '🏔️', label: 'Alpin Yürüyüş', sub: 'Rotalar · güvenlik · ekipman', path: '/alpin-yurus', accent: '#1d4ed8' },
  { icon: '🐟', label: 'Levrek Rehberi', sub: 'Avcılık · pişirme · mevsim', path: '/levrek-rehberi', accent: '#0284c7' },
  { icon: '🫐', label: 'Yabani Meyveler', sub: 'Toplama · tanıma · kullanım', path: '/yabani-meyveler', accent: '#7c3aed' },
  { icon: '🔥', label: 'Kamp Ateşi Yemekleri', sub: 'Ateş · tarifler · teknik', path: '/kamp-yemekleri', accent: '#ea580c' },
  { icon: '🌹', label: 'Kuşburnu', sub: 'Hasat · çay · vitamin C', path: '/kusburnu', accent: '#be123c' },
  { icon: '🌲', label: 'Karaçam Rehberi', sub: 'Ekoloji · yararlanma · koruma', path: '/karacam', accent: '#166534' },
  { icon: '🐗', label: 'Yaban Domuzu İzleme', sub: 'İz · güvenlik · habitat', path: '/yaban-domuzu-iz', accent: '#78350f' },
  { icon: '🌊', label: 'Deniz Ekolojisi', sub: 'Yaşam · koruma · tehditler', path: '/deniz-ekoloji', accent: '#0891b2' },
  { icon: '🌷', label: 'Bahar Çiçekleri', sub: 'Tanıma · gözlem · koruma', path: '/bahar-cicekleri', accent: '#db2777' },
  { icon: '🦃', label: 'Sülün Avı', sub: 'Yöntem · köpek · pişirme', path: '/sulun-avi2', accent: '#7c2d12' },
  { icon: '🌳', label: 'Meşe Ormanı', sub: 'Ekoloji · yararlanma · odun', path: '/mese-ormani', accent: '#713f12' },
  { icon: '🦅', label: 'Kızıl Şahin', sub: 'Biyoloji · gözlem · koruma', path: '/kizil-sahin', accent: '#a16207' },
  { icon: '🌸', label: 'Yabani Orkide', sub: 'Tanıma · gözlem · sezon', path: '/yabani-orkide', accent: '#7e22ce' },
  { icon: '🐟', label: 'Alabalık Rehberi', sub: 'Avcılık · pişirme · akarsu', path: '/alabalik-rehberi', accent: '#0369a1' },
  { icon: '🐿️', label: 'Sincap Gözlemi', sub: 'Biyoloji · habitat · fotoğraf', path: '/sincap-gozu', accent: '#b45309' },
  { icon: '🐗', label: 'Yaban Domuzu Avı', sub: 'Avcılık · silah · pişirme', path: '/yaban-domuzu-av', accent: '#7f1d1d' },
  { icon: '💜', label: 'Yabani Lavanta', sub: 'Toplama · kullanım · aromaterapi', path: '/yabani-lavanta', accent: '#7c3aed' },
  { icon: '🦔', label: 'Kirpi Rehberi', sub: 'Biyoloji · gözlem · koruma', path: '/kirpi-rehberi', accent: '#92400e' },
  { icon: '🐟', label: 'Hamsi Rehberi', sub: 'Avcılık · pişirme · sezon', path: '/hamsi-rehberi', accent: '#0e7490' },
  { icon: '🌊', label: 'Karadeniz Balıkları', sub: 'Türler · avcılık · sezon', path: '/karadeniz-balık', accent: '#1e3a5f' },
  { icon: '🌲', label: 'Orman Hayatta Kalma', sub: 'Beceriler · acil durum · su', path: '/orman-hayatta', accent: '#166534' },
  { icon: '🐐', label: 'Yaban Keçisi Gözlemi', sub: 'Biyoloji · habitat · koruma', path: '/yaban-kecisi', accent: '#374151' },
  { icon: '🌿', label: 'Yabani Biberiye', sub: 'Toplama · kullanım · aromaterapi', path: '/yabani-biberiye', accent: '#166534' },
  { icon: '🤿', label: 'Deniz Dalışı', sub: 'Teknikler · lokasyonlar · güvenlik', path: '/deniz-dalisi', accent: '#0c4a6e' },
  { icon: '🌊', label: 'Ege Balıkları', sub: 'Türler · avcılık · kota', path: '/ege-baliklari', accent: '#0369a1' },
  { icon: '🌿', label: 'Yabani Nane', sub: 'Toplama · çay · tıbbi kullanım', path: '/yabani-nane', accent: '#059669' },
  { icon: '🍵', label: 'Doğal Çaylar', sub: 'Bitkiler · demleme · şifa', path: '/dogal-caylar', accent: '#be123c' },
  { icon: '🏖️', label: 'Sahil Kampı', sub: 'Kurulum · aktiviteler · gelgit', path: '/sahil-kampi', accent: '#0891b2' },
  { icon: '🌿', label: 'Yabani Maydanoz', sub: 'Tanıma · toplama · mutfak', path: '/yabani-maydanoz', accent: '#15803d' },
  { icon: '🐻', label: 'Boz Ayı', sub: 'Habitat · davranış · güvenlik', path: '/boz-ayi', accent: '#78350f' },
  { icon: '🌻', label: 'Ayçiçeği Hasadı', sub: 'Hasat · tohum · yağ', path: '/aycicegi-hasadi', accent: '#ca8a04' },
  { icon: '🌼', label: 'Papatya Toplama', sub: 'Tanıma · çay · tıbbi', path: '/papatya-toplama', accent: '#d97706' },
  { icon: '🐟', label: 'İstavrit Rehberi', sub: 'Avcılık · pişirme · mevsim', path: '/istavrit-rehberi', accent: '#0369a1' },
  { icon: '🍄', label: 'Trüf Avı', sub: 'Bulma · köpek · pişirme', path: '/truffle-avi', accent: '#92400e' },
  { icon: '🌿', label: 'Yabani Kuşkonmaz', sub: 'Toplama · tarif · mevsim', path: '/yabani-kuskonmaz', accent: '#4d7c0f' },
  { icon: '🐚', label: 'Salyangoz Rehberi', sub: 'Toplama · pişirme · mevsim', path: '/salyangozu-rehberi', accent: '#0e7490' },
  { icon: '🌲', label: 'Çam Böceği', sub: 'Tanıma · zarar · kontrol', path: '/cam-bocegi', accent: '#78350f' },
  { icon: '🍐', label: 'Yabani Armut', sub: 'Hasat · reçel · sirke', path: '/yabani-armut', accent: '#854d0e' },
  { icon: '🐱', label: 'Vaşak Gözlemi', sub: 'Habitat · iz · koruma', path: '/vasak-gozu', accent: '#b45309' },
  { icon: '🍑', label: 'Yabani Erik', sub: 'Hasat · reçel · koruk', path: '/yabani-erik', accent: '#7c3aed' },
  { icon: '🐦', label: 'Kumkuşu Gözlemi', sub: 'Göç · türler · lokasyon', path: '/kumkusu-gozu', accent: '#0369a1' },
  { icon: '🌰', label: 'Kestane Rehberi', sub: 'Hasat · közleme · tatlı', path: '/kestane-rehberi', accent: '#78350f' },
  { icon: '🦦', label: 'Su Samuru', sub: 'Habitat · koruma · iz', path: '/su-samuru', accent: '#0369a1' },
  { icon: '🌊', label: 'Deniz Çayırları', sub: 'Ekoloji · dalış · koruma', path: '/deniz-cayiri', accent: '#059669' },
  { icon: '🐦', label: 'Bıldırcın Avı', sub: 'Av · köpek · pişirme', path: '/bildircin-avi', accent: '#ca8a04' },
  { icon: '🎵', label: 'Karatavuk', sub: 'Tanıma · ötüş · kayıt', path: '/karatavuk', accent: '#1d4ed8' },
  { icon: '🌿', label: 'Yabani Kişniş', sub: 'Toplama · baharat · tarif', path: '/yabani-kisnis', accent: '#166534' },
  { icon: '🐦', label: 'Saz Bülbülü', sub: 'Tanıma · ötüş · türler', path: '/saz-bulbulu', accent: '#65a30d' },
  { icon: '💧', label: 'Su Teresi', sub: 'Toplama · salata · çay', path: '/su-teresi', accent: '#0891b2' },
  { icon: '🌿', label: 'Akdeniz Bitkiler', sub: 'Kekik · biberiye · lavanta', path: '/akdeniz-bitkiler', accent: '#b45309' },
  { icon: '🍈', label: 'Yabani İncir', sub: 'Hasat · reçel · kurutma', path: '/yabani-incir', accent: '#92400e' },
  { icon: '🌹', label: 'Yabani Nar', sub: 'Hasat · nar ekşisi · şurup', path: '/yabani-nar', accent: '#be123c' },
  { icon: '🦅', label: 'Saz Delicesi', sub: 'Tanıma · habitat · sezon', path: '/saz-delicesi', accent: '#92400e' },
  { icon: '🫒', label: 'Yabani Zeytin', sub: 'Hasat · salamura · yağ', path: '/yabani-zeytin', accent: '#4d7c0f' },
  { icon: '🌿', label: 'Yabani Anason', sub: 'Tohum · rakı · çay', path: '/yabani-anason', accent: '#7c3aed' },
  { icon: '🐠', label: 'İskorpit Rehberi', sub: 'Avcılık · güvenlik · tarif', path: '/iskorpit-rehberi', accent: '#c2410c' },
  { icon: '🍇', label: 'Mürver', sub: 'Çiçek · meyve · şurup', path: '/murver', accent: '#7e22ce' },
  { icon: '🐝', label: 'Yabani Arı', sub: 'Gözlem · bal · kovan', path: '/yabani-ari', accent: '#d97706' },
];

const CATS = [
  { icon: '🎣', label: 'Balık',  q: 'fishing' },
  { icon: '🏹', label: 'Av',     q: 'hunting' },
  { icon: '⛺', label: 'Kamp',   q: 'camping' },
  { icon: '🦋', label: 'Doğa',   q: 'wildlife' },
];

function WeatherScore({ score }) {
  const color = SCORE_COLOR(score);
  return (
    <div style={{
      width: 64, height: 64, borderRadius: '50%', flexShrink: 0,
      border: `3px solid ${color}`,
      background: color + '12',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      boxShadow: `0 0 16px ${color}33`,
    }}>
      <span style={{ fontWeight: 800, fontSize: 20, color, lineHeight: 1 }}>{score}</span>
      <span style={{ fontSize: 9, color: 'var(--t-mute)', letterSpacing: '.04em' }}>SKOR</span>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [stats,   setStats]   = useState(null);
  const [weather, setWeather] = useState(null);
  const [posts,   setPosts]   = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get(`${API}/stats`).then(r => setStats(r.data)).catch(() => {}),
      axios.post(`${API}/weather`, { lat: 41.0, lng: 29.0, activity: 'fishing' }).then(r => setWeather(r.data)).catch(() => {}),
      axios.get(`${API}/posts?limit=3`).then(r => setPosts(r.data)).catch(() => {}),
    ]);
  }, []);

  return (
    <div className="page fade-in">

      {/* ── Hero ─────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(160deg, #051205 0%, #0a1a0a 55%, #0d1f0d 100%)',
        padding: '54px 20px 22px',
        borderBottom: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="hero-mesh" />

        {/* App identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18, position: 'relative' }}>
          <div style={{
            width: 52, height: 52, borderRadius: 15,
            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 60%, #15803d 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26,
            boxShadow: '0 4px 20px rgba(34,197,94,.4), 0 1px 0 rgba(255,255,255,.15) inset',
          }}>🎣</div>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: '-.03em', lineHeight: 1 }}>
              DoğaAI
            </h1>
            <div style={{ fontSize: 12, color: 'var(--a-light)', opacity: .7, marginTop: 2 }}>
              Akıllı Outdoor Platformu
            </div>
          </div>
          {/* Live indicator */}
          <div style={{
            marginLeft: 'auto',
            display: 'flex', alignItems: 'center', gap: 5,
            background: 'rgba(34,197,94,.1)', border: '1px solid rgba(34,197,94,.2)',
            borderRadius: 20, padding: '4px 10px',
          }}>
            <div style={{
              width: 6, height: 6, borderRadius: '50%', background: '#22c55e',
              boxShadow: '0 0 6px #22c55e',
              animation: 'fadeIn 1s ease infinite alternate',
            }} />
            <span style={{ fontSize: 10, color: '#86efac', fontWeight: 600 }}>CANLI</span>
          </div>
        </div>

        {/* Quick action grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, position: 'relative' }}>
          {ACTIONS.map(a => (
            <button key={a.path} onClick={() => navigate(a.path)} style={{
              background: 'rgba(18,34,18,.7)',
              backdropFilter: 'blur(12px)',
              border: `1px solid ${a.accent}22`,
              borderRadius: 16, padding: '14px 12px',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
              transition: 'all .2s',
              textAlign: 'left',
            }}>
              <div style={{
                width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                background: a.accent + '18',
                border: `1px solid ${a.accent}25`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20,
              }}>{a.icon}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '-.01em' }}>{a.label}</div>
                <div style={{ fontSize: 11, color: 'var(--t-mute)', marginTop: 1 }}>{a.sub}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '14px 16px 0' }}>

        {/* ── Stats ──────────────────────────────────────── */}
        {stats && (
          <div className="stat-grid" style={{ marginBottom: 14 }}>
            <div className="stat-card">
              <div className="num">{stats.total_spots}</div>
              <div className="label">Nokta</div>
            </div>
            <div className="stat-card">
              <div className="num">{(stats.species_identified / 1000).toFixed(1)}K</div>
              <div className="label">Tür Tanındı</div>
            </div>
            <div className="stat-card">
              <div className="num">{(stats.active_users / 1000).toFixed(1)}K</div>
              <div className="label">Kullanıcı</div>
            </div>
          </div>
        )}

        {/* ── Weather ────────────────────────────────────── */}
        {weather && (
          <div className="card" style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 10, color: 'var(--t-mute)', fontWeight: 700, letterSpacing: '.08em', marginBottom: 3 }}>
                  ⛅ BUGÜN HAVA
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#fff', letterSpacing: '-.02em', lineHeight: 1 }}>
                  {COND_ICON[weather.conditions] || '🌡️'} {weather.temperature}°C
                </div>
                <div style={{ fontSize: 12, color: 'var(--a-light)', marginTop: 4 }}>
                  {weather.conditions} · 💨 {weather.wind_speed} km/s · 🌙 {weather.moon_phase}
                </div>
              </div>
              <WeatherScore score={weather.activity_score} />
            </div>
            {weather.tips?.[0] && (
              <div style={{
                background: 'var(--s1)', border: '1px solid var(--border)',
                borderRadius: 10, padding: '8px 12px',
                fontSize: 12, color: 'var(--t-mid)', display: 'flex', gap: 6, alignItems: 'flex-start',
              }}>
                <span>💡</span><span style={{ lineHeight: 1.5 }}>{weather.tips[0]}</span>
              </div>
            )}
            {weather.warning && (
              <div style={{
                background: 'rgba(251,191,36,.08)', border: '1px solid rgba(251,191,36,.2)',
                borderRadius: 10, padding: '6px 10px', marginTop: 6,
                fontSize: 12, color: '#fde68a', display: 'flex', gap: 6,
              }}>
                <span>⚠️</span>{weather.warning}
              </div>
            )}
            <button className="btn-ghost" style={{ marginTop: 10, width: '100%', justifyContent: 'center', fontSize: 12 }}
              onClick={() => navigate('/harita')}>
              Harita ve Noktaları Gör →
            </button>
          </div>
        )}

        {/* ── Phase 4 Tools ──────────────────────────────── */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--t-mute)', letterSpacing: '.08em', marginBottom: 10 }}>
            AI ARAÇLARI
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {TOOLS.map(t => (
              <button key={t.path} onClick={() => navigate(t.path)} style={{
                background: 'var(--s2)', border: `1px solid ${t.accent}18`,
                borderRadius: 14, padding: '12px 14px',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
                textAlign: 'left', transition: 'all .2s',
              }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                  background: t.accent + '18', border: `1px solid ${t.accent}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                }}>{t.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{t.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--t-mute)', marginTop: 1 }}>{t.sub}</div>
                </div>
                <span style={{ color: t.accent, fontSize: 16, opacity: .6 }}>→</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Category grid ──────────────────────────────── */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--t-mute)', letterSpacing: '.08em', marginBottom: 10 }}>
            KATEGORİ SEÇ
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
            {CATS.map(c => (
              <button key={c.q} onClick={() => navigate(`/harita?type=${c.q}`)} style={{
                background: 'var(--s2)', border: '1px solid var(--border)',
                borderRadius: 14, padding: '14px 6px',
                cursor: 'pointer', textAlign: 'center', transition: 'all .2s',
              }}>
                <div style={{ fontSize: 24, lineHeight: 1 }}>{c.icon}</div>
                <div style={{ fontSize: 10, color: 'var(--a-light)', marginTop: 5, fontWeight: 700, letterSpacing: '.04em' }}>
                  {c.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── Community preview ──────────────────────────── */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--t-mute)', letterSpacing: '.08em' }}>
              TOPLULUKTAN
            </div>
            <button className="btn-ghost" style={{ fontSize: 11, padding: '3px 10px' }}
              onClick={() => navigate('/topluluk')}>Tümü →</button>
          </div>
          {posts.slice(0, 2).map(post => (
            <div key={post.id} className="post-card" style={{ marginBottom: 8, padding: 14 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div className="post-avatar" style={{ background: post.avatar_color }}>
                  {post.username[0]}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>
                    {post.title}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--t-mute)', marginBottom: 4 }}>
                    @{post.username}{post.location && ` · 📍 ${post.location}`}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--t-mid)', lineHeight: 1.5 }}>
                    {post.content.length > 90 ? post.content.slice(0, 90) + '…' : post.content}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--t-mute)', marginTop: 6 }}>❤️ {post.likes}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── AI Asistan promo ────────────────────────────── */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(15,12,40,.9), rgba(20,10,35,.9))',
          border: '1px solid rgba(192,132,252,.2)',
          borderRadius: 18, padding: 18, marginBottom: 14,
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -20, right: -20,
            width: 100, height: 100, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(192,132,252,.12), transparent 70%)',
          }} />
          <div style={{ fontSize: 24, marginBottom: 8, position: 'relative' }}>🤖</div>
          <div style={{ fontWeight: 800, fontSize: 15, color: '#e9d5ff', marginBottom: 5, position: 'relative' }}>
            DoğaAI Asistanı
          </div>
          <div style={{ fontSize: 12, color: 'rgba(192,132,252,.7)', lineHeight: 1.6, marginBottom: 14, position: 'relative' }}>
            Balık türleri, av mevsimleri, kamp yerleri ve ekipman tavsiyeleri için GPT-4o destekli asistanınız.
          </div>
          <button
            className="btn-primary"
            style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', position: 'relative' }}
            onClick={() => navigate('/ai-asistan')}
          >
            AI ile Konuş →
          </button>
        </div>

      </div>
    </div>
  );
}
