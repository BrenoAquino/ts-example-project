import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsModule } from './modules/products/products.module';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { DefaultExceptionsFilter } from './common/filters/default.filter';
import { ValidationFilter } from './common/filters/validation.filter';
import { ResponseInterceptor } from './common/response/response.interceptor';
import { AuthModule } from './modules/auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'mariadb',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            synchronize: true,
            entities: [Product],
        }),
        ProductsModule,
        AuthModule
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: DefaultExceptionsFilter
        },
        {
            provide: APP_FILTER,
            useClass: ValidationFilter
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ClassSerializerInterceptor
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseInterceptor
        }
    ],
})
export class AppModule { }