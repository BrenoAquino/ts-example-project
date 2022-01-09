import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ERROR_DEFAULT } from 'src/config/errors_messages';

@Catch()
export class DefaultExceptionsFilter implements ExceptionFilter {
    
    catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = HttpStatus.INTERNAL_SERVER_ERROR;

        response
            .status(status)
            .json({ 
                statusCode: status,
                message: ERROR_DEFAULT.UNKNOWN,
            });

        // FIXME: Use reply with http adpter
    }
}