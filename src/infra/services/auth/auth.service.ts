import { JwtTokenErrors } from '@domain/constants/enum/jwtTokenErrors.enum';
import { IJwtAuthPayload } from '@domain/interfaces/auth/auth.interface';
import { IAuthService } from '@domain/services/auth/auth.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { REFRESH_TOKEN_MAX_COUNT } from 'src/domain/constants/jwt.constant';

@Injectable()
export class AuthService implements IAuthService {
  private ONE_DAY_IN_SECONDS = 60 * 60 * 24;

  constructor(private readonly jwtService: JwtService) {}

  sign<T extends object | Buffer>(input: T): string {
    return this.jwtService.sign(input);
  }

  decode<T extends string | object | Buffer>(token: string): T {
    const validateResult = this.validate(token);
    if (validateResult !== true) {
      return null;
    }

    return this.jwtService.decode(token) as T;
  }

  async compare(input: string, hash: string): Promise<boolean> {
    try {
      return await compare(input, hash);
    } catch (error) {
      return false;
    }
  }

  async hash(input: string): Promise<string> {
    try {
      const saltOrRounds = 10;
      return await hash(input, saltOrRounds);
    } catch (error) {
      return null;
    }
  }

  validate(token: string): boolean | JwtTokenErrors {
    try {
      this.jwtService.verify(token);
      return true;
    } catch (error) {
      return error.message as JwtTokenErrors;
    }
  }

  refreshToken(token: string): string {
    const isValid = this.validate(token);
    if (isValid === true) {
      return token;
    }

    if (isValid !== JwtTokenErrors.Expired) {
      return null;
    }

    const decodedToken = this.jwtService.decode(token) as IJwtAuthPayload;
    const isExpiredMoreThanOneDay =
      decodedToken.exp < new Date().getTime() / 1000 - this.ONE_DAY_IN_SECONDS;

    if (
      isExpiredMoreThanOneDay ||
      decodedToken.refreshCount >= REFRESH_TOKEN_MAX_COUNT
    ) {
      return null;
    }

    return this.sign({
      id: decodedToken.id,
      name: decodedToken.name,
      email: decodedToken.email,
      refreshCount: decodedToken.refreshCount + 1,
    });
  }
}
