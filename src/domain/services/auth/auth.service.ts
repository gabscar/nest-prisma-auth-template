import { JwtTokenErrors } from '@domain/constants/enum/jwtTokenErrors.enum';

export abstract class IAuthService {
  sign: <T extends object | Buffer>(input: T) => string;
  decode: <T extends string | object | Buffer>(input: string) => T;
  compare: (input: string, hash: string) => Promise<boolean>;
  hash: (input: string) => Promise<string>;
  validate: (token: string) => boolean | JwtTokenErrors;
  refreshToken: (token: string) => string;
}
