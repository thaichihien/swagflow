import { Injectable } from '@nestjs/common';
import { Role } from '../constants/role.enum';

// ! NOT USING FOR NOW
@Injectable()
export class AccessControlService {
  private hierialchies: Map<string, number>[] = [];

  /**
   * Set up role hierialchy
   *
   */
  constructor() {
    this.buildHierialchy([Role.Staff, Role.Admin]);
  }

  /**
   * Add role hierialchy
   *
   * The role priority should be from the lowest to the highest
   *
   * @param roles
   */
  private buildHierialchy(roles: Role[]) {
    const hierialchy: Map<string, number> = new Map<string, number>();
    let priority = 0;
    roles.forEach((role) => {
      hierialchy.set(role, priority);
      priority += 1;
    });
    this.hierialchies.push(hierialchy);
  }

  /**
   *
   * @param currentRole
   * @param requiredRole
   * @returns true if the current role is higher or equal to the required role,
   * else return false
   */
  authorize(currentRole: string, requiredRole: string): boolean {
    for (const hierialchy of this.hierialchies) {
      const priority = hierialchy.get(currentRole);
      const requiredPriority = hierialchy.get(requiredRole);

      if (priority && requiredPriority && priority >= requiredPriority) {
        return true;
      }
    }

    return false;
  }
}
