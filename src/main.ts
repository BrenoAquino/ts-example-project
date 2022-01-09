import { ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ERROR_DEFAULT } from './config/errors_messages';
import { ValidationException } from './exceptions/validation.exception';
import { DefaultExceptionsFilter } from './filters/default.filter';
import { ValidationFilter } from './filters/validation.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    
    // Filters
    app.useGlobalFilters(new DefaultExceptionsFilter());
    app.useGlobalFilters(new ValidationFilter());

    // Pipes
    app.useGlobalPipes(new ValidationPipe({ 
        exceptionFactory: (errors: ValidationError[]) => {
            const messages = errors.map((error) => {
                return {
                    error: `${error.property} has wrong value ${error.value}.`,
                    message: error.constraints[0] || ERROR_DEFAULT.UNKNOWN,
                }
            })
            return new ValidationException(messages);
        },
        transform: true
    }));

    await app.listen(3000);
}
bootstrap();
