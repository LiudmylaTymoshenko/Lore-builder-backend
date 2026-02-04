import { Type } from 'class-transformer';
import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';

export class SourceDto {
  @IsString()
  title: string;

  @IsString()
  type: string;

  @IsString()
  canon: string;
}

export class CreateLoreDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsString()
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Type(() => SourceDto)
  sources: SourceDto[];

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
