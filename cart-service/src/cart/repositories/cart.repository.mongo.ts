import { IRepository } from "src/database/repository.inteface";
import { Cart } from "../schemas/cart.schema";
import { Model } from "mongoose";
import { on } from "events";


export class MongoCartRepository implements IRepository<Cart>{

    constructor(
        private readonly cartModel: Model<Cart>
    ){}

    async create(dto: any): Promise<Cart> {
        const created = await this.cartModel.create(dto)
        return created
    }
    async findById(id: string): Promise<Cart> {
        const one = await this.cartModel.findById(id)
        return one
    }
    async findOne(option: any): Promise<Cart> {
        const one = await this.cartModel.findOne(option)
        return one
    }
    async findAll(option?: any): Promise<Cart[]> {
        const all = await this.cartModel.find()
        return all
    }
    async update(id: string, dto: Partial<Cart>): Promise<Cart> {
        const updated = await this.cartModel.findByIdAndUpdate(id,dto);
        return updated;
    }
    async delete(id: string): Promise<boolean> {
        // - CLEAR CART
        return true;
    }

}