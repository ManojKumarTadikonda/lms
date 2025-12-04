import { IsBooleanString, IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class GetBooksFilterDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  authorId?: number;

  @IsOptional()
  @IsBooleanString()
  isBorrowed?: string;

  @IsOptional()
  @IsString()
  search?: string;
}
