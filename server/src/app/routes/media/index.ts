import ImageKitAuthRoute from "@/app/routes/media/imagekit-auth-route.js";

const PATH = "/media";

const ImageKitAuth = new ImageKitAuthRoute(PATH);

const MediaRoutes = {
  ImageKitAuth,
};

export default MediaRoutes;
