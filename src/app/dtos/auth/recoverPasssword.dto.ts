import {
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsNotEmpty,
} from 'class-validator';
import { IAuthRecoverPasswordParams } from '@domain/interfaces/auth/recoverPassword.interface';

export class AuthRecoverPasswordDto implements IAuthRecoverPasswordParams {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  validationCodeId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  code: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(255)
  @Matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&.:;<>\-_])[A-Za-z\d@$!%*#?&.:;<>\-_]{8,}$/,
  )
  newPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(255)
  @Matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&.:;<>\-_])[A-Za-z\d@$!%*#?&.:;<>\-_]{8,}$/,
  )
  confirmationPassword: string;
}
