import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLoreDto } from './dto/create-lore.dto';
import { UpdateLoreDto } from './dto/update-lore.dto';
import { ImportLoreDto } from './dto/import-lore.dto';
import { Prisma } from 'src/generated/client/client';

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
        tag: true,
        sources: true,
        characters: true,
        places: true,
        events: true,
        nodes: true,
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

    const mergeJsonArray = <T extends Record<string, unknown>>(
      existing: T[],
      incoming: T[],
      key: keyof T = 'id' as keyof T,
    ): T[] => {
      const updated = existing.map((item) => {
        const changed = incoming.find((i) => i[key] === item[key]);
        return changed ? { ...item, ...changed } : item;
      });
      const newItems = incoming.filter(
        (i) => !existing.find((e) => e[key] === i[key]),
      );
      return [...updated, ...newItems];
    };

    const toArray = (val: unknown): Record<string, unknown>[] =>
      Array.isArray(val) ? (val as Record<string, unknown>[]) : [];

    const asJson = (val: unknown): Prisma.InputJsonValue =>
      val as Prisma.InputJsonValue;

    return this.prisma.lore.update({
      where: { id },
      data: {
        ...(dto.name && { name: dto.name }),
        ...(dto.description && { description: dto.description }),
        ...(dto.type && { type: dto.type }),
        ...(dto.imageUrl !== undefined && { imageUrl: dto.imageUrl }),
        ...(dto.characters && {
          characters: asJson(
            mergeJsonArray(
              toArray(lore.characters),
              dto.characters as Record<string, unknown>[],
            ),
          ),
        }),
        ...(dto.events && {
          events: asJson(
            mergeJsonArray(
              toArray(lore.events),
              dto.events as Record<string, unknown>[],
            ),
          ),
        }),
        ...(dto.places && {
          places: asJson(
            mergeJsonArray(
              toArray(lore.places),
              dto.places as Record<string, unknown>[],
            ),
          ),
        }),
        ...(dto.nodes && {
          nodes: asJson(
            mergeJsonArray(
              toArray(lore.nodes),
              dto.nodes as Record<string, unknown>[],
            ),
          ),
        }),
        ...(dto.connections !== undefined && {
          connections: asJson(dto.connections),
        }),
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

  async importLore(ownerId: string, dto: ImportLoreDto) {
    return this.prisma.lore.create({
      data: {
        name: dto.name,
        type: dto.type,
        description: dto.description ?? 'Imported from JSON',
        tag: dto.tag,
        ownerId,
        imageUrl: dto.imageUrl ?? '',
        nodes: dto.nodes ?? [],
        edges: dto.edges ?? [],
        sources: {
          create: dto.sources.map((s) => ({
            title: s.title,
            type: s.type,
            canon: s.canon ?? 'official',
          })),
        },
        events: dto.events ?? [],
        characters: dto.characters ?? [],
        connections: dto.connections ?? [],
      },
    });
  }
}
