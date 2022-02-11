import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, UnauthorizedException } from "@nestjs/common";
import { AbstractHttpAdapter, HttpAdapterHost } from "@nestjs/core";
import { ValidationException } from "src/common/exceptions/validation.exception";
import { ERROR_CODE } from "../errors/errors_code";
import { ErrorDTO } from "../errors/error_dto";

@Catch(UnauthorizedException)
export class UnauthorizedFilter implements ExceptionFilter {
    
    private httpAdapter: AbstractHttpAdapter;

    constructor(adapterHost: HttpAdapterHost) {
        this.httpAdapter = adapterHost.httpAdapter;
    }

    catch(exception: UnauthorizedException, host: ArgumentsHost) : any {
        const context = host.switchToHttp();
        const response = context.getResponse();
        const status = HttpStatus.UNAUTHORIZED;
        const message = exception.message;

        const error = new ErrorDTO(status, ERROR_CODE.UNAUTHORIZED, message)
        this.httpAdapter.reply(response, error, status);
    }
}