import apiFetch from "@/lib/api/index";

interface ImageKitAuth {
  token: string;
  expire: number;
  signature: string;
}

const IMAGEKIT_PUBLIC_KEY = "public_LYz2uBDz4nwuSmqp8ydV6+Qc1pc=";
const IMAGEKIT_UPLOAD_URL = "https://upload.imagekit.io/api/v1/files/upload";

export const getImageKitAuth = () =>
  apiFetch<{ data: ImageKitAuth }>("/media/imagekit-auth");

export const uploadToImageKit = async (file: File): Promise<string> => {
  const authRes = await getImageKitAuth();
  const { token, expire, signature } = (authRes as any).data;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", file.name);
  formData.append("publicKey", IMAGEKIT_PUBLIC_KEY);
  formData.append("token", token);
  formData.append("expire", String(expire));
  formData.append("signature", signature);

  const res = await fetch(IMAGEKIT_UPLOAD_URL, { method: "POST", body: formData });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Upload failed: ${text}`);
  }

  const data = await res.json();
  return data.url as string;
};
