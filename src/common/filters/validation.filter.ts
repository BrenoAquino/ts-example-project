import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { ValidationException } from "src/common/exceptions/validation.exception";

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
    catch(exception: ValidationException, host: ArgumentsHost) : any {
        const context = host.switchToHttp();
        const response = context.getResponse();

        return response.status(400).json({
            statusCode: 400,
            createdBy: 'ValidationFilter',
            validationErrors: exception.validationErrors
        })
    }
}