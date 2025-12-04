import { IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class UpdateBookDto {
    @IsOptional()
    @IsString()
    @MinLength(1)
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsInt()
    publishedYear?: number;

    @IsOptional()
    @IsString()
    isbn?: string;

    @IsOptional()
    @IsInt()
    authorId?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    availablecount?: number;
}
