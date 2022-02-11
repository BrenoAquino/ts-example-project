import { Exclude } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ERROR_MESSAGE } from "src/common/errors/errors_messages";

export class ProductDTO {
    
    @Exclude({ toClassOnly: true })
    id: string;

    @IsNotEmpty({ message: ERROR_MESSAGE.PRODUCT.EMPTY_TITLE })
    @IsString({ message: ERROR_MESSAGE.PRODUCT.INVALID_TITLE })
    title: string;

    @IsNotEmpty({ message: ERROR_MESSAGE.PRODUCT.EMPTY_REF })
    @IsString({ message: ERROR_MESSAGE.PRODUCT.INVALID_REF })
    ref: string;

    @IsNumber({
        allowInfinity: false,
        allowNaN: false,
    }, { message: ERROR_MESSAGE.PRODUCT.INVALID_PRICE })
    price: number;

    constructor(id: string, title: string, ref: string, price: number) {
        this.id = id;
        this.title = title;
        this.ref = ref;
        this.price = price;
    }
}