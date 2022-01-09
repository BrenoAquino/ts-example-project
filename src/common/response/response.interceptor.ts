import { NestInterceptor, Injectable, ExecutionContext, CallHandler } from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponsePattern } from './response_pattern';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {

    private httpAdapter: AbstractHttpAdapter;

    constructor(adapterHost: HttpAdapterHost) {
        this.httpAdapter = adapterHost.httpAdapter;
    }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next
            .handle()
            .pipe(
                map( (response: any) => {
                    if (response instanceof ResponsePattern) {
                        const httpContext = context.switchToHttp();
                        const httpResponse = httpContext.getResponse();
                        const { headers, status, body } = response;

                        this.httpAdapter.status(httpResponse, status);
                        Object.entries(headers).forEach(([key, value]) => {
                            this.httpAdapter.setHeader(httpResponse, key, value as any);
                        });
                        
                        return body;
                    }
                    return response;
                })
            );
    }
}