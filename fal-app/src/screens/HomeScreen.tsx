import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const falTurleri = [
  {
    id: 'kahve',
    baslik: 'Kahve Falı',
    ikon: '☕',
    aciklama: 'Fincan fotoğrafını yükle, geleceğini öğren',
    renkler: ['#4A1A2C', '#8B2252'] as const,
    ekran: 'Kahve',
  },
  {
    id: 'tarot',
    baslik: 'Tarot',
    ikon: '🃏',
    aciklama: 'Kartlar sana ne söylemek istiyor?',
    renkler: ['#1A1A4A', '#2E2E8B'] as const,
    ekran: 'Tarot',
  },
  {
    id: 'el',
    baslik: 'El Falı',
    ikon: '🤚',
    aciklama: 'Elinin çizgilerinde yazılı kaderine bak',
    renkler: ['#1A3A2C', '#2E7B52'] as const,
    ekran: 'El',
  },
  {
    id: 'burc',
    baslik: 'Burç Yorumu',
    ikon: '⭐',
    aciklama: 'Yıldızlar bugün sana ne diyor?',
    renkler: ['#3A2A1A', '#7B5A2E'] as const,
    ekran: 'Burc',
  },
];

export default function HomeScreen({ navigation }: any) {
  return (
    <LinearGradient colors={['#0D0D1A', '#1A0D2E']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.baslikEmoji}>🔮</Text>
          <Text style={styles.baslik}>Mistik Fal</Text>
          <Text style={styles.altyazi}>Geleceğinin sırlarını keşfet</Text>
        </View>

        <View style={styles.kartlar}>
          {falTurleri.map((fal) => (
            <TouchableOpacity
              key={fal.id}
              onPress={() => navigation.navigate(fal.ekran)}
              activeOpacity={0.85}
              style={styles.kartWrapper}
            >
              <LinearGradient
                colors={fal.renkler}
                style={styles.kart}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.kartIkon}>{fal.ikon}</Text>
                <Text style={styles.kartBaslik}>{fal.baslik}</Text>
                <Text style={styles.kartAciklama}>{fal.aciklama}</Text>
                <View style={styles.baslaBadge}>
                  <Text style={styles.baslaText}>Bak →</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.altYazi}>
          ✨ Yapay zeka destekli fal yorumları
        </Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
  },
  baslikEmoji: {
    fontSize: 60,
    marginBottom: 8,
  },
  baslik: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#E8D5FF',
    letterSpacing: 2,
  },
  altyazi: {
    fontSize: 14,
    color: '#9B8DB0',
    marginTop: 6,
    letterSpacing: 1,
  },
  kartlar: {
    paddingHorizontal: 20,
  },
  kartWrapper: {
    marginBottom: 16,
    borderRadius: 20,
    shadowColor: '#7B2FBE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  kart: {
    borderRadius: 20,
    padding: 24,
    minHeight: 140,
  },
  kartIkon: {
    fontSize: 36,
    marginBottom: 8,
  },
  kartBaslik: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  kartAciklama: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 18,
  },
  baslaBadge: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  baslaText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
  altYazi: {
    textAlign: 'center',
    color: '#5A4E6A',
    fontSize: 12,
    marginVertical: 30,
  },
});
