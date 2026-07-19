import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { fortuneApi } from '../services/api';

export default function KahveScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [soru, setSoru] = useState('');
  const [yorum, setYorum] = useState('');
  const [yukleniyor, setYukleniyor] = useState(false);

  const fotografSec = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('İzin gerekli', 'Fotoğraf galeriye erişim izni gerekli');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
      base64: true,
    });
    if (!result.canceled && result.assets[0]) {
      setImage(result.assets[0].uri);
      setImageBase64(result.assets[0].base64 || null);
      setYorum('');
    }
  };

  const kameraAc = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('İzin gerekli', 'Kamera erişim izni gerekli');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
      base64: true,
    });
    if (!result.canceled && result.assets[0]) {
      setImage(result.assets[0].uri);
      setImageBase64(result.assets[0].base64 || null);
      setYorum('');
    }
  };

  const falBak = async () => {
    if (!imageBase64) {
      Alert.alert('Fotoğraf gerekli', 'Lütfen önce fincan fotoğrafı yükle');
      return;
    }
    setYukleniyor(true);
    try {
      const sonuc = await fortuneApi.kahveFali(imageBase64, soru);
      setYorum(sonuc.yorum);
    } catch (err) {
      Alert.alert('Hata', 'Fal yorumu alınamadı. Sunucu çalışıyor mu?');
    } finally {
      setYukleniyor(false);
    }
  };

  return (
    <LinearGradient colors={['#0D0D1A', '#2C0A1E']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.baslik}>☕ Kahve Falı</Text>
        <Text style={styles.altyazi}>Fincanını çevir, fotoğrafını çek</Text>

        {image ? (
          <View style={styles.fotografContainer}>
            <Image source={{ uri: image }} style={styles.fotograf} />
            <TouchableOpacity onPress={() => { setImage(null); setImageBase64(null); setYorum(''); }} style={styles.sifirlaBtn}>
              <Text style={styles.sifirlaText}>✕ Değiştir</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.fotografSecici}>
            <Text style={styles.fotografSeciciIkon}>📷</Text>
            <Text style={styles.fotografSeciciText}>Fincan fotoğrafı yükle</Text>
            <View style={styles.fotografBtnRow}>
              <TouchableOpacity onPress={kameraAc} style={styles.fotografBtn}>
                <Text style={styles.fotografBtnText}>📸 Kamera</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={fotografSec} style={styles.fotografBtn}>
                <Text style={styles.fotografBtnText}>🖼️ Galeri</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.soruContainer}>
          <Text style={styles.soruLabel}>Sormak istediğin bir şey var mı? (isteğe bağlı)</Text>
          <TextInput
            style={styles.soruInput}
            placeholder="Örn: Aşk hayatım hakkında ne düşünüyorsun?"
            placeholderTextColor="#6B5E7A"
            value={soru}
            onChangeText={setSoru}
            multiline
          />
        </View>

        <TouchableOpacity onPress={falBak} disabled={yukleniyor || !image} activeOpacity={0.85}>
          <LinearGradient
            colors={yukleniyor || !image ? ['#3A2A3A', '#3A2A3A'] : ['#8B1A4A', '#C2185B']}
            style={styles.falBtn}
          >
            {yukleniyor ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.falBtnText}>🔮 Fala Bak</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        {yorum ? (
          <View style={styles.yorumContainer}>
            <Text style={styles.yorumBaslik}>✨ Falın</Text>
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
  altyazi: { fontSize: 13, color: '#9B8DB0', textAlign: 'center', marginBottom: 24, marginTop: 4 },
  fotografContainer: { alignItems: 'center', marginBottom: 20 },
  fotograf: { width: 260, height: 260, borderRadius: 20, borderWidth: 2, borderColor: '#8B1A4A' },
  sifirlaBtn: { marginTop: 10, backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20 },
  sifirlaText: { color: '#CCC', fontSize: 13 },
  fotografSecici: { borderWidth: 2, borderColor: '#3A2A4A', borderStyle: 'dashed', borderRadius: 20, padding: 30, alignItems: 'center', marginBottom: 20 },
  fotografSeciciIkon: { fontSize: 48, marginBottom: 8 },
  fotografSeciciText: { color: '#9B8DB0', fontSize: 14, marginBottom: 16 },
  fotografBtnRow: { flexDirection: 'row', gap: 12 },
  fotografBtn: { backgroundColor: 'rgba(139,26,74,0.3)', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, borderWidth: 1, borderColor: '#8B1A4A' },
  fotografBtnText: { color: '#E8D5FF', fontSize: 14 },
  soruContainer: { marginBottom: 20 },
  soruLabel: { color: '#9B8DB0', fontSize: 13, marginBottom: 8 },
  soruInput: { backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: 14, color: '#E8D5FF', fontSize: 14, minHeight: 80, textAlignVertical: 'top', borderWidth: 1, borderColor: '#3A2A4A' },
  falBtn: { borderRadius: 16, padding: 18, alignItems: 'center', marginBottom: 24 },
  falBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  yorumContainer: { backgroundColor: 'rgba(139,26,74,0.15)', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#8B1A4A' },
  yorumBaslik: { fontSize: 18, fontWeight: 'bold', color: '#E8D5FF', marginBottom: 12 },
  yorumMetin: { color: '#D4C5E2', fontSize: 15, lineHeight: 24 },
});
