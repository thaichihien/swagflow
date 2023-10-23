import { IRepository } from "src/database/repository.inteface";
import { Cart } from "../schemas/cart.schema";
import { Model } from "mongoose";
import { CartEntity } from "../enities/cart.enity";


export class MongoCartRepository implements IRepository<CartEntity>{

    constructor(
        private readonly cartModel: Model<Cart>
    ){}

    async create(dto: any): Promise<CartEntity> {
        const created = await this.cartModel.create(dto)

        const responseDto : CartEntity = {
            id: created.id,
            customerId: created.customerId,
            totalPrice: created.totalPrice,
            items: created.items
        }
        return responseDto
    }
    async findById(id: string): Promise<CartEntity> {
        const one = await this.cartModel.findById(id)

        const responseDto : CartEntity = {
            id: one.id,
            customerId: one.customerId,
            totalPrice: one.totalPrice,
            items: one.items
        }
        return responseDto
    }
    async findOne(option: any): Promise<CartEntity> {
        const one = await this.cartModel.findOne(option)
        
        const responseDto : CartEntity = {
            id: one.id,
            customerId: one.customerId,
            totalPrice: one.totalPrice,
            items: one.items
        }
        return responseDto
    }
    async findAll(option?: any): Promise<CartEntity[]> {
        const all = await this.cartModel.find(option)
        const responseDto : CartEntity[] = all.map(one => ({
            id: one.id,
            customerId: one.customerId,
            totalPrice: one.totalPrice,
            items: one.items
        }))
        return responseDto
       
    }
    async update(id: string, dto: Partial<Cart>): Promise<CartEntity> {
        const updated = await this.cartModel.findByIdAndUpdate(id,dto,{
            new : true
        });

         const responseDto : CartEntity = {
            id: updated.id,
            customerId: updated.customerId,
            totalPrice: updated.totalPrice,
            items: updated.items
        }
        return responseDto
    }
    async delete(id: string): Promise<boolean> {
        // - CLEAR CART
        await this.cartModel.findByIdAndDelete(id)
        return true;
    }

}