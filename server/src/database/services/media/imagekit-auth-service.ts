import BaseService from "@/database/system/base-service.js";
import crypto from "crypto";

export type ImageKitAuthResponse = {
  token: string;
  expire: number;
  signature: string;
};

class ImageKitAuthService extends BaseService<void, ImageKitAuthResponse> {
  protected async transaction(): Promise<ImageKitAuthResponse> {
    const token = crypto.randomUUID();
    const expire = Math.floor(Date.now() / 1000) + 60 * 30; // Expires in 30 minutes
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY || "";

    const signature = crypto
      .createHmac("sha1", privateKey)
      .update(token + expire.toString())
      .digest("hex");

    return {
      token,
      expire,
      signature,
    };
  }
}

export default ImageKitAuthService;
