import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { ValidationException } from "src/common/exceptions/validation.exception";
import { ERROR_CODE } from "../errors/errors_code";
import { ErrorDTO } from "../errors/error_dto";

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
    
    catch(exception: ValidationException, host: ArgumentsHost) : any {
        const context = host.switchToHttp();
        const response = context.getResponse();
        const status = HttpStatus.BAD_REQUEST;
        const message = exception.validationErrors.length > 0 ? exception.validationErrors[0] : exception.message;

        return response
            .status(status)
            .json(new ErrorDTO(
                status, 
                ERROR_CODE.INVALID_PARAMS, 
                message
            ));
    }
}