import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({ 
      data: {
        email: dto.email,
        password: dto.password,
        firstName: dto.firstName,
        lastName: dto.lastName,        
      }
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    await this.findOne(id);
    return this.prisma.user.update({
      where: { id },
      data: { ...dto },
    });
  }

  async remove(id: string): Promise<User> {
    await this.findOne(id);
    return this.prisma.user.delete({ where: { id } });
  }
}