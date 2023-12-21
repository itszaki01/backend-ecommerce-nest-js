import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { User } from '../schema/users.schema';

@Injectable()
export class ExcludePasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data:User)=>{
      
      // Exclude Password
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {password,passwordChangedAt,...rest} = data['_doc']
      return rest
    }));
  }
}
