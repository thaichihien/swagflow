


export class User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  refreshToken: string
  roles: {
    roleId: string;
  }[];
}
