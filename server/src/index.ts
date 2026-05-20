import App from "@/app/app.js";
import routes from "@/app/routes/index.js";

const server = new App(routes);

export default server.getApp();

if (!process.env.VERCEL) {
  server.listen();
}
