import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Product } from '../../entities/product.entity';
import { ProductDTO } from '../dto/product.dto';
import { ProductsService } from '../services/products.service';

@Controller('products')
export class ProductsController {
    
    constructor(private productsService: ProductsService) {}

    @Get() 
    async all(): Promise<ProductDTO[]> {
        return this.productsService.all();
    }

    @Post()
    async create(@Body() product: ProductDTO): Promise<ProductDTO> {
        return this.productsService.create(product);
    }

    // * Only for reference
    @Get(':id')
    async specific(@Param() params): Promise<Product> {
        return this.productsService.specific(params.id);
    }

    @Delete(':id')
    async delete(@Param() params): Promise<Product> {
        return this.productsService.delete(params.id);
    }
}