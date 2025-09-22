export type RecommendRequest = {
  message: string;
  languageCode: string;
  latitude: number;
  longitude: number;
};

export type RecommendResponse = {
  response?: string;
  recommendation?: string;
  error?: string;
};

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL?.toString() ||
  "https://kisan-mitra-backend-eo7m.onrender.com/api/recommend";

export async function postRecommend(payload: RecommendRequest): Promise<RecommendResponse> {
  const res = await fetch(BACKEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Backend error ${res.status}: ${text}`);
  }
  return res.json();
}


