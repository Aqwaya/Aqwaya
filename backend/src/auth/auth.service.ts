import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: CreateUserDto) {
    const userExists = await this.usersService.findOneByEmail(registerDto.email);
    if (userExists) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    return this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });
  }

  async login(email: string, pass: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    
    const payload = { 
      sub: user.id, 
      email: user.email,
      role: user.role // 
    };

    const { password, ...userWithoutPassword } = user;

    return {
      access_token: this.jwtService.sign(payload),
      user: userWithoutPassword,
    };
  }
}