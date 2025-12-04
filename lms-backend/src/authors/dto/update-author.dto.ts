import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateAuthorDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @IsOptional()
  @IsString()
  bio?: string;
}
