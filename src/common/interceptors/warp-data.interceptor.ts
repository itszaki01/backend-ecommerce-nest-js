import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class WarpDataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data)=>{
      if(Array.isArray(data)){
        return {results:data.length,data}
      }else{
        return {
          data
        }
      }
    }));
  }
}
