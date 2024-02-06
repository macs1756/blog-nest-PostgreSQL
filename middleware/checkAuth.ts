import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export default class MyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    
    const authHeader = req.headers.authorization.replace('Bearer ', '');

    console.log('Authorization Header:', authHeader);

    next(); 
  }
}