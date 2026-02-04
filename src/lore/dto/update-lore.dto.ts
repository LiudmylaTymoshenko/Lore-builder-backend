import { IsOptional, IsString, IsArray } from 'class-validator';

export class UpdateLoreDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

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
  @IsArray()
  nodes?: any[];
}
