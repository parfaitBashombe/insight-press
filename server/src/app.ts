import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config';

// Import Routers
import { AuthRouter } from './routes/auth.router';
import { UserRouter } from './routes/user.router';
import { PostRouter } from './routes/post.router';
import { AdminRouter } from './routes/admin.router';
import { WriterRouter } from './routes/writer.router';

// Import Middlewares
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    this.app.use(helmet());
    this.app.use(cors({
      origin: env.clientOrigin,
      credentials: true,
    }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    if (env.nodeEnv === 'development') {
      this.app.use(morgan('dev'));
    }
  }

  private initializeRoutes(): void {
    const authRouter = new AuthRouter();
    const userRouter = new UserRouter();
    const postRouter = new PostRouter();
    const adminRouter = new AdminRouter();
    const writerRouter = new WriterRouter();

    // API Routes
    this.app.use('/api/auth', authRouter.router);
    this.app.use('/api/users', userRouter.router);
    this.app.use('/api/posts', postRouter.router);
    this.app.use('/api/admin', adminRouter.router);
    this.app.use('/api/writers', writerRouter.router);

    // Health check
    this.app.get('/health', (req, res) => {
      res.status(200).json({ status: 'OK', timestamp: new Date() });
    });
  }

  private initializeErrorHandling(): void {
    this.app.use(notFoundHandler);
    this.app.use(errorHandler);
  }

  public listen(): void {
    this.app.listen(env.port, () => {
      console.log(`🚀 Server is running on port ${env.port}`);
      console.log(`🔗 Health check: http://localhost:${env.port}/health`);
    });
  }
}

// Boot the server
const server = new App();
server.listen();
