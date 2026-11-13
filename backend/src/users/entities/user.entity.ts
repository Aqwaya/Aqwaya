import { Role } from '@prisma/client';

export class User {
  id!: string;
  email!: string;
  firstName!: string;
  lastName!: string;
  password?: string;
  role!: Role;
  isOnboarded!: boolean;
  companyName?: string | null;
  industry?: string | null;
  createdAt!: Date;
  updatedAt!: Date;
}
