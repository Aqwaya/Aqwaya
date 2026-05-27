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

    // 🔒 The updated usersService.create returns a SanitizedUser (password already stripped)
    const userWithoutPassword = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });

    return userWithoutPassword;
  }

  async login(email: string, pass: string) {
    // 🔒 Use internal secure gateway method to fetch full record context with password hash
    const user = await this.usersService.findInternalWithPassword(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Secure verification layer
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { 
      sub: user.id, 
      email: user.email,
      role: user.role,
      isOnboarded: user.isOnboarded 
    };

    // Strip password column cleanly before compiling the response payload to the client
    const { password, ...userWithoutPassword } = user;

    return {
      access_token: this.jwtService.sign(payload),
      user: userWithoutPassword,
    };
  }
}