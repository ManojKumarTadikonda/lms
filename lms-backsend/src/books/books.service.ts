import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { GetBooksFilterDto } from './dto/get-books-filter.dto';

@Injectable()
export class BooksService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createBookDto: CreateBookDto) {
        const initialcount = createBookDto.availablecount ?? 1;
        // Will throw if authorId does not exist when DB constraint is hit
        return this.prisma.book.create({
            data: {
                title: createBookDto.title,
                description: createBookDto.description,
                publishedYear: createBookDto.publishedYear,
                isbn: createBookDto.isbn,
                authorId: createBookDto.authorId,
                availablecount: initialcount,
                isBorrowed: initialcount == 0,
            },
            include: {
                author: true,
            },
        });
    }

    async findAll(filters: GetBooksFilterDto) {
        const { authorId, isBorrowed, search } = filters;

        const where: any = {};

        if (authorId !== undefined) {
            where.authorId = authorId;
        }

        if (isBorrowed !== undefined) {
            if (isBorrowed === 'true') {
                where.availableCount = 0;
            } else {
                where.availableCount = { gt: 0 };
            }
        }

        if (search) {
            where.title = {
                contains: search,
                mode: 'insensitive',
            };
        }

        return this.prisma.book.findMany({
            where,
            include: {
                author: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async findOne(id: number) {
        const book = await this.prisma.book.findUnique({
            where: { id },
            include: {
                author: true,
                borrows: true,
            },
        });

        if (!book) {
            throw new NotFoundException(`Book with id ${id} not found`);
        }

        return book;
    }

    async update(id: number, updateBookDto: UpdateBookDto) {
        // Ensure it exists
        const existing = await this.findOne(id);
        const nextAvailableCount = updateBookDto.availablecount !== undefined ? updateBookDto.availablecount : existing.availablecount;
        return this.prisma.book.update({
            where: { id },
            data: {
                ...updateBookDto,
                availablecount: nextAvailableCount,
                isBorrowed: nextAvailableCount == 0,
            },
            include: {
                author: true,
            },
        });
    }

    async remove(id: number) {
        // Ensure exists
        await this.findOne(id);

        return this.prisma.book.delete({
            where: { id },
        });
    }
}
