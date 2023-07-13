import { Module } from '@nestjs/common';
import { ControllerModule } from '@app/controllers/controller.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@infra/guards/jwt.guard';
import { MailConfigModule } from '@app/services/queue/mailConfig.module';
import { BullConfigModule } from '@app/services/queue/bullConfig.module';
import { UserRolesGuard } from '@infra/guards/userRoles.guard';

@Module({
  imports: [ControllerModule, MailConfigModule, BullConfigModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: UserRolesGuard,
    },
  ],
})
export class AppModule {}
