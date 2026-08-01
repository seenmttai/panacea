/**
 * Panacea Medical AI Service Module
 * Handles API calls to the Unified Medical AI Backend
 */

export const BASE_API_URL = "https://6c82-167-220-238-235.ngrok-free.app";
export const NGROK_HEADER_KEY = "ngrok-skip-browser-warning";
export const NGROK_HEADER_VAL = "69420";

export interface AnemiaResponse {
  model: string;
  predicted_hemoglobin_g_dL: number;
  predicted_margin: number;
  diagnosis: string;
  threshold_used: number;
  frames_received: number;
}

export interface DRResponse {
  model: string;
  dr_probability: number;
  prediction: string;
  threshold: number;
}

export interface GastroVisionResponse {
  model: string;
  label: string;
  confidences?: Array<{ label: string; confidence: number }>;
  raw?: any;
}

export interface HealthCheckResponse {
  status: string;
  message?: string;
}

/**
 * Checks API server health
 */
export async function checkApiHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_API_URL}/`, {
      method: "GET",
      headers: {
        [NGROK_HEADER_KEY]: NGROK_HEADER_VAL,
      },
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Extracts 5 evenly spaced JPEG Blobs (224x224) from a video file using HTML5 Canvas.
 */
export async function extract5FramesFromVideo(videoFile: File): Promise<Blob[]> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.src = URL.createObjectURL(videoFile);
    video.muted = true;
    video.playsInline = true;

    video.onloadedmetadata = async () => {
      try {
        const duration = video.duration || 1;
        const canvas = document.createElement("canvas");
        canvas.width = 224;
        canvas.height = 224;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Could not initialize 2D canvas context"));
          return;
        }

        const frameBlobs: Blob[] = [];
        const percentages = [0, 0.25, 0.5, 0.75, 0.98];
        const timestamps = percentages.map((p) => p * duration);

        for (const t of timestamps) {
          video.currentTime = Math.min(t, duration - 0.05);
          await new Promise((r) => {
            video.onseeked = r;
          });
          ctx.drawImage(video, 0, 0, 224, 224);

          const blob = await new Promise<Blob | null>((r) =>
            canvas.toBlob(r, "image/jpeg", 0.85)
          );
          if (blob) {
            frameBlobs.push(blob);
          }
        }

        URL.revokeObjectURL(video.src);
        if (frameBlobs.length === 0) {
          reject(new Error("Failed to extract video frames"));
        } else {
          resolve(frameBlobs);
        }
      } catch (err) {
        reject(err);
      }
    };

    video.onerror = (err) => reject("Error loading video file: " + err);
  });
}

/**
 * Calls the Anemia Detection API (`/predict_anemia`)
 */
export async function analyzeAnemia(
  videoFile: File,
  userSex: "male" | "female" | string
): Promise<AnemiaResponse> {
  const imageBlobs = await extract5FramesFromVideo(videoFile);

  const formData = new FormData();
  imageBlobs.forEach((blob, index) => {
    formData.append("images", blob, `frame_${index}.jpg`);
  });

  const sexValue =
    userSex === "female" || userSex === "F" || userSex === "1.0" ? "1.0" : "0.0";
  formData.append("sex", sexValue);

  const response = await fetch(`${BASE_API_URL}/predict_anemia`, {
    method: "POST",
    headers: {
      [NGROK_HEADER_KEY]: NGROK_HEADER_VAL,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Anemia API Error: ${response.status} ${response.statusText}`);
  }

  const data: AnemiaResponse = await response.json();
  return data;
}

/**
 * Calls the Diabetic Retinopathy API (`/predict_dr`)
 */
export async function analyzeRetinopathy(imageFile: File): Promise<DRResponse> {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch(`${BASE_API_URL}/predict_dr`, {
    method: "POST",
    headers: {
      [NGROK_HEADER_KEY]: NGROK_HEADER_VAL,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`DR API Error: ${response.status} ${response.statusText}`);
  }

  const data: DRResponse = await response.json();
  return data;
}

/**
 * Calls the GastroVision Endoscopy Classifier API (`maxiu-uzumaki/gastroVision`)
 */
export async function analyzeGastroVision(imageFile: File): Promise<GastroVisionResponse> {
  const { Client } = await import("@gradio/client");
  const hfToken = (import.meta as any).env?.VITE_HF_TOKEN || (window as any).HF_TOKEN || "";
  
  const clientOptions: any = {};
  if (hfToken) {
    clientOptions.hf_token = hfToken;
  }

  const client = await Client.connect("maxiu-uzumaki/gastroVision", clientOptions);
  const result = await client.predict("/predict", {
    image: imageFile,
  });

  const resData: any = result?.data;
  const rawData = Array.isArray(resData) ? resData[0] : (resData || null);
  let topLabel = "Normal / Unclassified";
  let confList: Array<{ label: string; confidence: number }> = [];

  if (typeof rawData === "string") {
    topLabel = rawData;
  } else if (rawData && typeof rawData === "object") {
    if ((rawData as any).label) topLabel = (rawData as any).label;
    if (Array.isArray((rawData as any).confidences)) {
      confList = (rawData as any).confidences;
    } else if ((rawData as any).confidences && typeof (rawData as any).confidences === "object") {
      confList = Object.entries((rawData as any).confidences).map(([lbl, conf]) => ({
        label: lbl,
        confidence: typeof conf === "number" ? conf : 0
      }));
    }
  }

  return {
    model: "GastroVision (maxiu-uzumaki)",
    label: topLabel,
    confidences: confList,
    raw: rawData,
  };
}

/**
 * Synthetic Fallback Generator for GastroVision
 */
export function generateMockGastroVisionResult(): GastroVisionResponse {
  const categories = [
    { label: "Normal Z-line", conf: 0.96 },
    { label: "Esophagitis Grade A", conf: 0.92 },
    { label: "Gastric Polyps", conf: 0.89 },
    { label: "Ulcerative Colitis Lesion", conf: 0.87 },
    { label: "Barrett's Esophagus", conf: 0.84 }
  ];
  const chosen = categories[Math.floor(Math.random() * categories.length)];
  return {
    model: "GastroVision (Simulated)",
    label: chosen.label,
    confidences: [
      { label: chosen.label, confidence: chosen.conf },
      { label: "Normal Mucosa Baseline", confidence: Number((1 - chosen.conf).toFixed(2)) }
    ],
    raw: chosen
  };
}

/**
 * Synthetic Fallback Generator for Anemia (used for demo/offline testing)
 */
export function generateMockAnemiaResult(userSex: string): AnemiaResponse {
  const isFemale = userSex === "female" || userSex === "F";
  const hb = Number((Math.random() * (15.2 - 10.5) + 10.5).toFixed(2));
  const threshold = isFemale ? 12.0 : 13.0;
  const isAnemic = hb < threshold;

  return {
    model: "VBOSNetDinoV2 (Simulated)",
    predicted_hemoglobin_g_dL: hb,
    predicted_margin: Number((hb - threshold).toFixed(2)),
    diagnosis: isAnemic ? "Anemic" : "Not Anemic",
    threshold_used: threshold,
    frames_received: 5,
  };
}

/**
 * Synthetic Fallback Generator for Retinopathy (used for demo/offline testing)
 */
export function generateMockDRResult(): DRResponse {
  const prob = Number(Math.random().toFixed(4));
  return {
    model: "EfficientNetB6 (Simulated)",
    dr_probability: prob,
    prediction: prob > 0.5 ? "Has DR" : "No DR",
    threshold: 0.5,
  };
}
