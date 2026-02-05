// dto/import-lore.dto.ts
import { IsString, IsOptional, IsArray } from 'class-validator';

export class ImportLoreDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsOptional()
  imageUrl?: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  events?: any[];

  @IsOptional()
  @IsArray()
  characters?: any[];

  @IsOptional()
  @IsArray()
  connections?: any[];

  @IsOptional()
  nodes?: any[];

  @IsOptional()
  edges?: any[];
}
