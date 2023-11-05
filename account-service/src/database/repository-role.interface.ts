import { Role } from "src/role/entities/role.entity";
import { IRepository } from "./repository.interface";
import { RoleWithUsers } from "src/role/entities/role-users";

export interface IRoleRepository extends IRepository<Role> {
    findRoleWithUsers(id: string): Promise<RoleWithUsers>;
    findRoleByNameWithUsers(name: string): Promise<RoleWithUsers>;
}