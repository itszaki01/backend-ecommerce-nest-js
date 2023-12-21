import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const req = host.switchToHttp().getRequest<Request>()
    const res = host.switchToHttp().getResponse<Response>()
    const status = exception.getStatus()
    const exceptionResponse = exception.getResponse() as object

    res.status(status).json({
      ...exceptionResponse,
      path:req.path,
      timestemp: new Date,
      stack:exception.stack
    })
  }
}
