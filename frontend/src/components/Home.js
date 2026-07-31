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
