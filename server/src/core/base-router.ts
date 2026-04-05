import { Router } from 'express';

export abstract class BaseRouter {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  // Extending classes must implement this and call it inside their constructor
  protected abstract registerRoutes(): void;
}
