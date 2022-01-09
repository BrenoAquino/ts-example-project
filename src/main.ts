import { ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ERROR_DEFAULT } from './common/errors/errors_messages';
import { ValidationException } from './common/exceptions/validation.exception';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    
    // Pipes
    app.useGlobalPipes(new ValidationPipe({ 
        exceptionFactory: (errors: ValidationError[]) => {
            const messages = errors.map((error) => {
                const errorsMessages = Object.values(error.constraints);
                return errorsMessages.length > 0 ? errorsMessages[0] : ERROR_DEFAULT.UNKNOWN;
            })
            return new ValidationException(messages);
        },
        transform: true
    }));

    await app.listen(3000);
}
bootstrap();
