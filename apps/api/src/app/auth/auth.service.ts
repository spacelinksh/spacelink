import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/infra/prisma/prisma.service';

import { SignInInput } from './dto/sign-in-input.dto';
import { UserService } from '../routes/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private async comparePassword(password: string, hashPassword: string) {
    const compare = await bcrypt.compare(password, hashPassword);

    return compare;
  }

  async generateToken(user: any) {
    const emailNormalized = user.email.toLowerCase().trim();

    const payload = {
      email: emailNormalized,
      userId: user.id,
    };

    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: '1d',
      }),
    };
  }

  async signIn(signInInput: SignInInput) {
    const { email, normalizedPassword } = signInInput;

    const normalizedEmail = email.toLowerCase().trim();
    const user = await this.userService.getByEmail(normalizedEmail);

    if (!user) {
      throw new Error('User not exists!');
    }

    const { password } = user;

    const passwordValidate = await this.comparePassword(
      normalizedPassword,
      password,
    );

    if (!passwordValidate) {
      throw new Error('Password incorrect!');
    }

    const { accessToken } = await this.generateToken(user);

    return {
      accessToken,
      user,
    };
  }
}
