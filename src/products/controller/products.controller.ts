import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
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

    @Get(':id')
    async specific(@Param() params): Promise<ProductDTO> {
        return this.productsService.specific(params.id);
    }

    @Delete(':id')
    async delete(@Param() params): Promise<ProductDTO> {
        return this.productsService.delete(params.id);
    }
}