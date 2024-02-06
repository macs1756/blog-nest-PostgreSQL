import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export default class MyMiddleware implements NestMiddleware {
  constructor(
    private readonly envService: ConfigService
  ) { }


  use(req: Request, res: Response, next: NextFunction) {
    
    const token = (req.headers.authorization || '').replace(/Bearer\s?/,'')

    if(token){

      try {

        const decoded = jwt.verify(token, this.envService.get<string>('JWT_SICRET'))
        
        console.log(decoded);
         
        next()

      } catch (error) {

        console.log('this case');

        return res.json({
          messange: '403 Forbidden'
        })

      }
    }else{

      

      return res.json({
        messange: '403 Forbidden'
      })

    }

    next(); 
  }
}