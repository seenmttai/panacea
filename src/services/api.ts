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

export interface UltrasoundResponse {
  model: string;
  summaryHtml: string;
  detailedHtml: string;
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

export interface ContactFormData {
  name: string;
  email: string;
  organization?: string;
  inquiryType: string;
  message: string;
}

/**
 * Transmits contact inquiries via Resend REST API using RESEND_KEY secret
 */
export async function sendResendContactEmail(formData: ContactFormData): Promise<{ success: boolean; message?: string }> {
  const resendKey = (import.meta as any).env?.VITE_RESEND_KEY || 
                    (import.meta as any).env?.RESEND_KEY || 
                    (window as any).RESEND_KEY || "";

  if (!resendKey) {
    console.warn("RESEND_KEY secret not found in environment. Fallback simulated submission active.");
    return { success: true, message: "Simulated submission fallback (RESEND_KEY secret missing)." };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Panacea AI <onboarding@resend.dev>",
        to: ["delivered@resend.dev"],
        subject: `[Panacea Clinical Inquiry] ${formData.inquiryType} - ${formData.name}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #0F172A;">
            <h2 style="color: #0284C7;">Panacea Medical AI - New Clinical Contact</h2>
            <p><strong>Full Name:</strong> ${formData.name}</p>
            <p><strong>Professional Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
            <p><strong>Institution / Network:</strong> ${formData.organization || "Not Specified"}</p>
            <p><strong>Inquiry Category:</strong> ${formData.inquiryType}</p>
            <hr style="border: none; border-top: 1px solid #E2E8F0; margin: 20px 0;" />
            <p><strong>Project Scope & Requirements:</strong></p>
            <p style="background: #F8FAFC; padding: 15px; border-radius: 8px;">${formData.message.replace(/\n/g, "<br/>")}</p>
          </div>
        `
      })
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn("Resend API HTTP Error:", res.status, errText);
      return { success: false, message: `Resend API Error: ${res.status}` };
    }

    return { success: true };
  } catch (err: any) {
    console.error("Resend API Exception:", err);
    return { success: false, message: err.message || "Failed to transmit via Resend API" };
  }
}

/**
 * Calls the Ultrasound Analysis AI API (`ProximAditya/Ultrasound-Analysis`)
 */
export async function analyzeUltrasound(imageFile: File): Promise<UltrasoundResponse> {
  const { Client } = await import("@gradio/client");
  const hfToken = (import.meta as any).env?.VITE_HF_TOKEN || (window as any).HF_TOKEN || "";
  
  const clientOptions: any = {};
  if (hfToken) {
    clientOptions.hf_token = hfToken;
  }

  const client = await Client.connect("ProximAditya/Ultrasound-Analysis", clientOptions);
  const result = await client.predict("/predict_ultrasound", {
    image: imageFile,
  });

  const resData: any = result?.data;
  let summaryHtml = "Ultrasound Analysis Completed Successfully.";
  let detailedHtml = "";

  if (Array.isArray(resData)) {
    summaryHtml = typeof resData[0] === "string" ? resData[0] : JSON.stringify(resData[0]);
    detailedHtml = typeof resData[1] === "string" ? resData[1] : JSON.stringify(resData[1]);
  } else if (typeof resData === "string") {
    summaryHtml = resData;
  }

  return {
    model: "Ultrasound-Analysis (ProximAditya)",
    summaryHtml,
    detailedHtml,
    raw: resData,
  };
}

/**
 * Synthetic Fallback Generator for Ultrasound Analysis
 */
export function generateMockUltrasoundResult(): UltrasoundResponse {
  return {
    model: "Ultrasound-Analysis (Simulated)",
    summaryHtml: `<div class="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800 text-cyan-200 space-y-2">
      <h4 class="font-bold text-sm text-cyan-300">Ultrasonic Tissue Boundary Scan Result</h4>
      <p class="text-xs leading-relaxed">Echogenicity distribution: <strong class="text-emerald-400">Normal Homogeneous Parenchyma</strong>. No focal hypoechoic acoustic shadow detected across acoustic windows.</p>
    </div>`,
    detailedHtml: `<div class="space-y-3 text-xs text-slate-300">
      <div class="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
        <p><strong>Acoustic Impedance Index:</strong> <span class="font-mono text-cyan-400">1.48 MRayl (Optimal)</span></p>
        <p><strong>Lesion Detection Score:</strong> <span class="font-mono text-emerald-400">0.04 (Negative for abnormal cystic or solid masses)</span></p>
        <p><strong>Speckle Noise Reduction:</strong> <span class="font-mono text-slate-400">99.1% Adaptive Filtering</span></p>
      </div>
    </div>`,
  };
}
