import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Header,
} from '@nestjs/common';
import { LoreService } from './lore.service';
import { CreateLoreDto } from './dto/create-lore.dto';
import { UpdateLoreDto } from './dto/update-lore.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { JwtUser } from '../auth/types/jwt-user.type';
import { ImportLoreDto } from './dto/import-lore.dto';

@Controller('lores')
@UseGuards(JwtAuthGuard)
export class LoreController {
  constructor(private readonly loreService: LoreService) {}

  @Post('import')
  importLore(@CurrentUser() user: JwtUser, @Body() dto: ImportLoreDto) {
    return this.loreService.importLore(user.id, dto);
  }

  @Post()
  create(@CurrentUser() user: JwtUser, @Body() dto: CreateLoreDto) {
    return this.loreService.create(user.id, dto);
  }

  @Get()
  findAll(@CurrentUser() user: JwtUser) {
    return this.loreService.findAll(user.id);
  }

  @Get(':id')
  @Header('Cache-Control', 'no-store')
  findOne(@Param('id') id: string, @CurrentUser() user: JwtUser) {
    return this.loreService.findOne(id, user.id);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: JwtUser,
    @Param('id') id: string,
    @Body() dto: UpdateLoreDto,
  ) {
    return this.loreService.update(user.id, id, dto);
  }

  @Delete(':id')
  remove(@CurrentUser() user: JwtUser, @Param('id') id: string) {
    return this.loreService.remove(user.id, id);
  }
}
