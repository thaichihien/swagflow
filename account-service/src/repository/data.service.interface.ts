import { Address, Customer } from "@prisma/client";
import { IRepository } from "./repository.interface";

/**
 * Define all repository here
 */
export abstract class IDataServices {
    abstract customer : IRepository<Customer>
    abstract address : IRepository<Address>
}