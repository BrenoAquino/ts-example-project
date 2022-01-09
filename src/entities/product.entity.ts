import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    ref: string;

    @Column()
    title: string;

    @Column()
    price: number;

    constructor(ref: string, title: string, price: number) {
        this.ref = ref;
        this.title = title;
        this.price = price;
    }
}