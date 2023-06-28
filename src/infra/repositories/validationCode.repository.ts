import { Injectable } from '@nestjs/common';

import { IValidationCodeCreateParams } from '@domain/interfaces/validationCode/create.interface';
import { IValidationCodeRepositoryDatabase } from '@domain/repositories/validationCode.repository';
import { PrismaService } from '@infra/database/prisma.service';
import { ValidationCodeEntity } from '@domain/entities/validationCode.entity';

@Injectable()
export class ValidationCodeRepositoryDatabase
  implements IValidationCodeRepositoryDatabase
{
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<ValidationCodeEntity> {
    const validationCode = await this.prisma.validationCode.findFirst({
      where: { id: id },
    });
    if (!validationCode) return null;

    return new ValidationCodeEntity(validationCode as ValidationCodeEntity);
  }

  async create(
    payload: IValidationCodeCreateParams,
  ): Promise<ValidationCodeEntity> {
    const validationCode = await this.prisma.validationCode.create({
      data: payload,
    });

    return new ValidationCodeEntity(validationCode as ValidationCodeEntity);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.validationCode.delete({
      where: { id },
    });
  }
}
