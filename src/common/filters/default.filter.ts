import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from "@nestjs/core";
import { ERROR_CODE } from '../errors/errors_code';
import { ERROR_MESSAGE } from '../errors/errors_messages';
import { ErrorDTO } from "../errors/error_dto";

@Catch()
export class DefaultExceptionsFilter implements ExceptionFilter {
    
    private httpAdapter: AbstractHttpAdapter;

    constructor(adapterHost: HttpAdapterHost) {
        this.httpAdapter = adapterHost.httpAdapter;
    }

    catch(exception: unknown, host: ArgumentsHost): void {
        const context = host.switchToHttp();
        const response = context.getResponse();
        const status = HttpStatus.INTERNAL_SERVER_ERROR;
        const message = ERROR_MESSAGE.UNKNOWN;

        const error = new ErrorDTO(status, ERROR_CODE.UNKNOWN, message)
        this.httpAdapter.reply(response, error, status);
    }
}