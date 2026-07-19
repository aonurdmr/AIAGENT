const API_BASE_URL = 'http://localhost:8001/api';

export interface FortuneResponse {
  yorum: string;
  mesaj: string;
  semboller?: string[];
}

export const fortuneApi = {
  async kahveFali(imageBase64: string, soru?: string): Promise<FortuneResponse> {
    const response = await fetch(`${API_BASE_URL}/fal/kahve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image_base64: imageBase64, soru }),
    });
    if (!response.ok) throw new Error('Kahve falı alınamadı');
    return response.json();
  },

  async elFali(imageBase64: string, soru?: string): Promise<FortuneResponse> {
    const response = await fetch(`${API_BASE_URL}/fal/el`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image_base64: imageBase64, soru }),
    });
    if (!response.ok) throw new Error('El falı alınamadı');
    return response.json();
  },

  async tarotFali(secilen_kartlar: string[], soru?: string): Promise<FortuneResponse> {
    const response = await fetch(`${API_BASE_URL}/fal/tarot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secilen_kartlar, soru }),
    });
    if (!response.ok) throw new Error('Tarot falı alınamadı');
    return response.json();
  },

  async burcFali(dogum_tarihi: string, burc: string, soru?: string): Promise<FortuneResponse> {
    const response = await fetch(`${API_BASE_URL}/fal/burc`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dogum_tarihi, burc, soru }),
    });
    if (!response.ok) throw new Error('Burç yorumu alınamadı');
    return response.json();
  },
};
