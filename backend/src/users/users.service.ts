import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

export type SanitizedUser = Omit<User, 'password'>;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  private get userSanitizedSelect() {
    return {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      isActive: true,
      isOnboarded: true,
      companyName: true,
      industry: true,
      createdAt: true,
      updatedAt: true,
    };
  }

  async create(dto: CreateUserDto): Promise<SanitizedUser> {
    return this.prisma.user.create({ 
      data: {
        email: dto.email,
        password: dto.password,
        firstName: dto.firstName,
        lastName: dto.lastName,
        isOnboarded: false, // 🔒 Default strict fallback state
      },
      select: this.userSanitizedSelect,
    });
  }

  async findAll(): Promise<SanitizedUser[]> {
    return this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: this.userSanitizedSelect,
    });
  }

  async findOne(id: string): Promise<SanitizedUser> {
    const user = await this.prisma.user.findUnique({ 
      where: { id },
      select: this.userSanitizedSelect,
    });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<SanitizedUser | null> {
    return this.prisma.user.findUnique({ 
      where: { email },
      select: this.userSanitizedSelect,
    });
  }

  /**
   * 🔒 Secure Internal Backchannel Method
   * Reserved strictly for AuthService credential verification layers during login checks.
   */
  async findInternalWithPassword(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: string, dto: UpdateUserDto): Promise<SanitizedUser> {
    await this.findOne(id);

    return this.prisma.user.update({
      where: { id },
      data: {
        email: dto.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
      },
      select: this.userSanitizedSelect,
    });
  }

  async remove(id: string): Promise<SanitizedUser> {
    await this.findOne(id);
    
    return this.prisma.user.delete({ 
      where: { id },
      select: this.userSanitizedSelect,
    });
  }
}