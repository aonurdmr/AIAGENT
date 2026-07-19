import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { fortuneApi } from '../services/api';

const { width } = Dimensions.get('window');

const TAROT_KARTLARI = [
  { id: '0', isim: 'Deli', sembol: '🤹' },
  { id: '1', isim: 'Büyücü', sembol: '🧙' },
  { id: '2', isim: 'Yüce Rahibe', sembol: '👸' },
  { id: '3', isim: 'İmparatoriçe', sembol: '👑' },
  { id: '4', isim: 'İmparator', sembol: '🏰' },
  { id: '5', isim: 'Papa', sembol: '⛪' },
  { id: '6', isim: 'Âşıklar', sembol: '💑' },
  { id: '7', isim: 'Savaş Arabası', sembol: '⚔️' },
  { id: '8', isim: 'Güç', sembol: '🦁' },
  { id: '9', isim: 'Münzevi', sembol: '🕯️' },
  { id: '10', isim: 'Kader Çarkı', sembol: '☸️' },
  { id: '11', isim: 'Adalet', sembol: '⚖️' },
  { id: '12', isim: 'Asılan Adam', sembol: '🙃' },
  { id: '13', isim: 'Ölüm', sembol: '💀' },
  { id: '14', isim: 'Denge', sembol: '♾️' },
  { id: '15', isim: 'Şeytan', sembol: '😈' },
  { id: '16', isim: 'Kule', sembol: '🗼' },
  { id: '17', isim: 'Yıldız', sembol: '⭐' },
  { id: '18', isim: 'Ay', sembol: '🌙' },
  { id: '19', isim: 'Güneş', sembol: '☀️' },
  { id: '20', isim: 'Yargı', sembol: '📯' },
  { id: '21', isim: 'Dünya', sembol: '🌍' },
];

export default function TarotScreen() {
  const [secilen, setSecilen] = useState<string[]>([]);
  const [soru, setSoru] = useState('');
  const [yorum, setYorum] = useState('');
  const [yukleniyor, setYukleniyor] = useState(false);
  const [karistirildi, setKaristirildi] = useState(false);

  const MAX_SECIM = 3;

  const kartSec = (id: string) => {
    if (secilen.includes(id)) {
      setSecilen(secilen.filter((k) => k !== id));
    } else if (secilen.length < MAX_SECIM) {
      setSecilen([...secilen, id]);
    }
  };

  const karistir = () => {
    setSecilen([]);
    setYorum('');
    setKaristirildi(true);
  };

  const falBak = async () => {
    if (secilen.length < 1) {
      Alert.alert('Kart seç', 'Lütfen en az 1 kart seç');
      return;
    }
    const secilenIsimler = secilen.map(
      (id) => TAROT_KARTLARI.find((k) => k.id === id)?.isim || id
    );
    setYukleniyor(true);
    try {
      const sonuc = await fortuneApi.tarotFali(secilenIsimler, soru);
      setYorum(sonuc.yorum);
    } catch {
      Alert.alert('Hata', 'Tarot yorumu alınamadı');
    } finally {
      setYukleniyor(false);
    }
  };

  return (
    <LinearGradient colors={['#0D0D1A', '#0A0A2E']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.baslik}>🃏 Tarot</Text>
        <Text style={styles.altyazi}>3 kart seç, kaderine bak</Text>

        <TouchableOpacity onPress={karistir} style={styles.karistirBtn}>
          <Text style={styles.karistirText}>🔀 Kartları Karıştır</Text>
        </TouchableOpacity>

        {karistirildi && (
          <Text style={styles.secimSayac}>
            {secilen.length}/{MAX_SECIM} kart seçildi
          </Text>
        )}

        {karistirildi && (
          <View style={styles.kartGrid}>
            {TAROT_KARTLARI.map((kart) => {
              const secili = secilen.includes(kart.id);
              return (
                <TouchableOpacity
                  key={kart.id}
                  onPress={() => kartSec(kart.id)}
                  style={[styles.tarotKart, secili && styles.tarotKartSecili]}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={secili ? ['#2E2E8B', '#4040BB'] : ['#1A1A3A', '#1A1A4A']}
                    style={styles.tarotKartIc}
                  >
                    <Text style={styles.tarotKartSembol}>{kart.sembol}</Text>
                    <Text style={styles.tarotKartIsim}>{kart.isim}</Text>
                    {secili && (
                      <View style={styles.seciliBadge}>
                        <Text style={styles.seciliBadgeText}>
                          {secilen.indexOf(kart.id) + 1}
                        </Text>
                      </View>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {secilen.length > 0 && (
          <TouchableOpacity onPress={falBak} disabled={yukleniyor} activeOpacity={0.85}>
            <LinearGradient
              colors={['#2E2E8B', '#4040CC']}
              style={styles.falBtn}
            >
              {yukleniyor ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.falBtnText}>🔮 Kartları Yorumla</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        )}

        {yorum ? (
          <View style={styles.yorumContainer}>
            <Text style={styles.yorumBaslik}>✨ Tarot Yorumun</Text>
            <View style={styles.secilenKartlar}>
              {secilen.map((id) => {
                const kart = TAROT_KARTLARI.find((k) => k.id === id);
                return kart ? (
                  <View key={id} style={styles.secilenKartBadge}>
                    <Text style={styles.secilenKartText}>{kart.sembol} {kart.isim}</Text>
                  </View>
                ) : null;
              })}
            </View>
            <Text style={styles.yorumMetin}>{yorum}</Text>
          </View>
        ) : null}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 20, paddingTop: 50, paddingBottom: 40 },
  baslik: { fontSize: 28, fontWeight: 'bold', color: '#E8D5FF', textAlign: 'center' },
  altyazi: { fontSize: 13, color: '#9B8DB0', textAlign: 'center', marginBottom: 20, marginTop: 4 },
  karistirBtn: { backgroundColor: 'rgba(46,46,139,0.4)', borderRadius: 16, padding: 14, alignItems: 'center', marginBottom: 12, borderWidth: 1, borderColor: '#2E2E8B' },
  karistirText: { color: '#A0A0FF', fontWeight: '600', fontSize: 15 },
  secimSayac: { textAlign: 'center', color: '#7B7BBB', fontSize: 13, marginBottom: 16 },
  kartGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20, justifyContent: 'center' },
  tarotKart: { width: (width - 60) / 3, borderRadius: 12, overflow: 'hidden' },
  tarotKartSecili: { shadowColor: '#4040CC', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.6, shadowRadius: 8, elevation: 8 },
  tarotKartIc: { padding: 10, alignItems: 'center', minHeight: 80, justifyContent: 'center' },
  tarotKartSembol: { fontSize: 24, marginBottom: 4 },
  tarotKartIsim: { fontSize: 10, color: '#C0C0E0', textAlign: 'center' },
  seciliBadge: { position: 'absolute', top: 4, right: 4, backgroundColor: '#4040CC', width: 18, height: 18, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  seciliBadgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  falBtn: { borderRadius: 16, padding: 18, alignItems: 'center', marginBottom: 24 },
  falBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  yorumContainer: { backgroundColor: 'rgba(46,46,139,0.15)', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#2E2E8B' },
  yorumBaslik: { fontSize: 18, fontWeight: 'bold', color: '#E8D5FF', marginBottom: 12 },
  secilenKartlar: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  secilenKartBadge: { backgroundColor: 'rgba(64,64,204,0.3)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, borderWidth: 1, borderColor: '#4040CC' },
  secilenKartText: { color: '#A0A0FF', fontSize: 12 },
  yorumMetin: { color: '#D4C5E2', fontSize: 15, lineHeight: 24 },
});
