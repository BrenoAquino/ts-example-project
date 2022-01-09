import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { ERROR_DEFAULT } from 'src/common/errors/errors_messages';
import { ERROR_CODE } from '../errors/errors_code';
import { ErrorDTO } from "../errors/error_dto";

@Catch()
export class DefaultExceptionsFilter implements ExceptionFilter {
    
    catch(exception: unknown, host: ArgumentsHost): void {
        const context = host.switchToHttp();
        const response = context.getResponse();
        const status = HttpStatus.INTERNAL_SERVER_ERROR;
        const message = ERROR_DEFAULT.UNKNOWN;

        return response
            .status(status)
            .json(new ErrorDTO(
                status, 
                ERROR_CODE.UNKNOWN,
                message
            ));
    }
}