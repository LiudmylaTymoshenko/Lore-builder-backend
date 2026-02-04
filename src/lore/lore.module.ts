import { Module } from '@nestjs/common';
import { LoreController } from './lore.controller';
import { LoreService } from './lore.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LoreController],
  providers: [LoreService],
  exports: [LoreService],
})
export class LoreModule {}
