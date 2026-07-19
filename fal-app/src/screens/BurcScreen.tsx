import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { fortuneApi } from '../services/api';

const BURCLAR = [
  { isim: 'Koç', sembol: '♈', tarihler: '21 Mar - 19 Nis' },
  { isim: 'Boğa', sembol: '♉', tarihler: '20 Nis - 20 May' },
  { isim: 'İkizler', sembol: '♊', tarihler: '21 May - 20 Haz' },
  { isim: 'Yengeç', sembol: '♋', tarihler: '21 Haz - 22 Tem' },
  { isim: 'Aslan', sembol: '♌', tarihler: '23 Tem - 22 Ağu' },
  { isim: 'Başak', sembol: '♍', tarihler: '23 Ağu - 22 Eyl' },
  { isim: 'Terazi', sembol: '♎', tarihler: '23 Eyl - 22 Eki' },
  { isim: 'Akrep', sembol: '♏', tarihler: '23 Eki - 21 Kas' },
  { isim: 'Yay', sembol: '♐', tarihler: '22 Kas - 21 Ara' },
  { isim: 'Oğlak', sembol: '♑', tarihler: '22 Ara - 19 Oca' },
  { isim: 'Kova', sembol: '♒', tarihler: '20 Oca - 18 Şub' },
  { isim: 'Balık', sembol: '♓', tarihler: '19 Şub - 20 Mar' },
];

export default function BurcScreen() {
  const [secilenBurc, setSecilenBurc] = useState<string | null>(null);
  const [dogumTarihi, setDogumTarihi] = useState('');
  const [soru, setSoru] = useState('');
  const [yorum, setYorum] = useState('');
  const [yukleniyor, setYukleniyor] = useState(false);

  const falBak = async () => {
    if (!secilenBurc) {
      Alert.alert('Burç seç', 'Lütfen burcunu seç');
      return;
    }
    setYukleniyor(true);
    try {
      const sonuc = await fortuneApi.burcFali(dogumTarihi, secilenBurc, soru);
      setYorum(sonuc.yorum);
    } catch {
      Alert.alert('Hata', 'Burç yorumu alınamadı');
    } finally {
      setYukleniyor(false);
    }
  };

  return (
    <LinearGradient colors={['#0D0D1A', '#1A1A0D']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.baslik}>⭐ Burç Yorumu</Text>
        <Text style={styles.altyazi}>Yıldızlar sana ne söylüyor?</Text>

        <Text style={styles.label}>Burcunu seç</Text>
        <View style={styles.burcGrid}>
          {BURCLAR.map((burc) => {
            const secili = secilenBurc === burc.isim;
            return (
              <TouchableOpacity
                key={burc.isim}
                onPress={() => { setSecilenBurc(burc.isim); setYorum(''); }}
                style={[styles.burcKart, secili && styles.burcKartSecili]}
                activeOpacity={0.8}
              >
                <Text style={styles.burcSembol}>{burc.sembol}</Text>
                <Text style={[styles.burcIsim, secili && styles.burcIsimSecili]}>{burc.isim}</Text>
                <Text style={styles.burcTarih}>{burc.tarihler}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.soruContainer}>
          <Text style={styles.label}>Doğum tarihin (isteğe bağlı)</Text>
          <TextInput
            style={styles.input}
            placeholder="Örn: 15 Mart 1995"
            placeholderTextColor="#6B6B3A"
            value={dogumTarihi}
            onChangeText={setDogumTarihi}
          />
        </View>

        <View style={styles.soruContainer}>
          <Text style={styles.label}>Soru sor (isteğe bağlı)</Text>
          <TextInput
            style={[styles.input, styles.inputMulti]}
            placeholder="Örn: Bu ay aşk hayatım nasıl olacak?"
            placeholderTextColor="#6B6B3A"
            value={soru}
            onChangeText={setSoru}
            multiline
          />
        </View>

        <TouchableOpacity onPress={falBak} disabled={yukleniyor || !secilenBurc} activeOpacity={0.85}>
          <LinearGradient
            colors={yukleniyor || !secilenBurc ? ['#2A2A1A', '#2A2A1A'] : ['#7A7A1A', '#BFBF00']}
            style={styles.falBtn}
          >
            {yukleniyor ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.falBtnText}>🔮 Burç Yorumuna Bak</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        {yorum ? (
          <View style={styles.yorumContainer}>
            <Text style={styles.yorumBaslik}>
              {BURCLAR.find((b) => b.isim === secilenBurc)?.sembol} {secilenBurc} Yorumun
            </Text>
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
  label: { color: '#9B8DB0', fontSize: 13, marginBottom: 10 },
  burcGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 24, justifyContent: 'space-between' },
  burcKart: { width: '30%', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 10, alignItems: 'center', borderWidth: 1, borderColor: '#3A3A1A' },
  burcKartSecili: { backgroundColor: 'rgba(191,191,0,0.15)', borderColor: '#BFBF00' },
  burcSembol: { fontSize: 22, marginBottom: 2 },
  burcIsim: { color: '#AAA', fontSize: 12, fontWeight: '600' },
  burcIsimSecili: { color: '#FFFF66' },
  burcTarih: { color: '#666', fontSize: 9, textAlign: 'center', marginTop: 2 },
  soruContainer: { marginBottom: 16 },
  input: { backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: 14, color: '#E8D5FF', fontSize: 14, borderWidth: 1, borderColor: '#3A3A1A' },
  inputMulti: { minHeight: 80, textAlignVertical: 'top' },
  falBtn: { borderRadius: 16, padding: 18, alignItems: 'center', marginBottom: 24, marginTop: 8 },
  falBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  yorumContainer: { backgroundColor: 'rgba(191,191,0,0.08)', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#7A7A1A' },
  yorumBaslik: { fontSize: 18, fontWeight: 'bold', color: '#E8D5FF', marginBottom: 12 },
  yorumMetin: { color: '#D4C5E2', fontSize: 15, lineHeight: 24 },
});
