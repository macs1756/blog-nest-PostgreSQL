import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export default class MyMiddleware implements NestMiddleware {
  

  constructor(
    private readonly envService: ConfigService
  ) { }

  async use(req: Request, res: Response, next: NextFunction) {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
      try {
        
        const decodedToken = await jwt.verify(token, this.envService.get<string>('JWT_SICRET'));
        next(decodedToken);

      } catch (error) {
        return res.status(403).json({ message: 'Forbidden' });
      }
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  }
}
