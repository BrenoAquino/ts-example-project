import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "../../entities/product.entity";
import { PostProductDTO } from "../dto/post_product.dto";

@Injectable()
export class ProductsService {
    
    constructor(@InjectRepository(Product) private productsRepository: Repository<Product>) {}

    async all(): Promise<Product[]> {
        return this.productsRepository.find();
    }

    async create(product: PostProductDTO): Promise<PostProductDTO> {
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