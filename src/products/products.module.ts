import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductsController } from "./controller/products.controller";
import { Product } from "../entities/product.entity";
import { ProductsService } from "./services/products.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Product])
    ],
    controllers: [
        ProductsController
    ],
    providers: [
        ProductsService
    ],
})
export class ProductsModule { }
