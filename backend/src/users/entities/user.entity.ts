export class User {
  id: string;
  email: string;
  username: string;
  password?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}