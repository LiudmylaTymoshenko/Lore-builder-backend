import { Type } from 'class-transformer';
import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { SourceDto } from './create-lore.dto';

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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SourceDto)
  sources: SourceDto[];
}
