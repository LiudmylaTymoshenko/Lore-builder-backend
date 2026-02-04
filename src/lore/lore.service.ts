import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLoreDto } from './dto/create-lore.dto';
import { UpdateLoreDto } from './dto/update-lore.dto';

@Injectable()
export class LoreService {
  constructor(private readonly prisma: PrismaService) {}

  create(ownerId: string, dto: CreateLoreDto) {
    const { sources, ...rest } = dto;

    return this.prisma.lore.create({
      data: {
        ...rest,
        ownerId,
        sources: {
          create: sources,
        },
      },
    });
  }

  findAll(ownerId: string) {
    return this.prisma.lore.findMany({
      where: { ownerId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        type: true,
        imageUrl: true,
        createdAt: true,
      },
    });
  }

  async findOne(loreId: string, ownerId: string) {
    const lore = await this.prisma.lore.findFirst({
      where: {
        id: loreId,
        ownerId,
      },
      include: {
        sources: true,
      },
    });

    if (!lore) {
      throw new NotFoundException('Lore not found');
    }

    return lore;
  }
  async update(userId: string, id: string, dto: UpdateLoreDto) {
    const lore = await this.prisma.lore.findFirst({
      where: { id, ownerId: userId },
    });

    if (!lore) {
      throw new NotFoundException('Lore not found');
    }

    return this.prisma.lore.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  async remove(ownerId: string, loreId: string) {
    const result = await this.prisma.lore.deleteMany({
      where: {
        id: loreId,
        ownerId,
      },
    });

    if (result.count === 0) {
      throw new NotFoundException('Lore not found');
    }

    return { success: true };
  }
}
