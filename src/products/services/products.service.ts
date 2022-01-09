import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "../../entities/product.entity";
import { ProductDTO } from "../dto/product.dto";

@Injectable()
export class ProductsService {
    
    constructor(@InjectRepository(Product) private productsRepository: Repository<Product>) {}

    async all(): Promise<ProductDTO[]> {
        const products = await this.productsRepository.find();
        const productsDTO = products.map(product => { return new ProductDTO(product.id, product.title, product.ref, product.price) });
        return productsDTO;
    }

    async create(product: ProductDTO): Promise<ProductDTO> {
        var newProduct = new Product(product.ref, product.title, product.price);
        const createdProduct = await this.productsRepository.save(newProduct);
        product.id = createdProduct.id;
        return product;
    }

    // * Only for reference
    async specific(id: number): Promise<Product> {
        return this.productsRepository.findOne(id);
    }
    
    async delete(id: number): Promise<Product> {
        const product = await this.specific(id);
        this.productsRepository.delete(id);
        return product
    }
}