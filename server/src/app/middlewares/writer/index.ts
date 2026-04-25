import IsWriterMiddleware from "@/app/middlewares/writer/is-writer.js";

const IsWriter = new IsWriterMiddleware();

const WriterMiddleWares = { IsWriter };

export default WriterMiddleWares;
