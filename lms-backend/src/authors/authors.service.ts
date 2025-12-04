import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAuthorDto: CreateAuthorDto) {
    return this.prisma.author.create({
      data: {
        name: createAuthorDto.name,
        bio: createAuthorDto.bio,
      },
    });
  }

  async findAll() {
    return this.prisma.author.findMany({
      include: {
        books: true, // you can remove this if you don't want books here
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const author = await this.prisma.author.findUnique({
      where: { id },
      include: {
        books: true,
      },
    });

    if (!author) {
      throw new NotFoundException(`Author with id ${id} not found`);
    }

    return author;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    // ensure exists
    await this.findOne(id);

    return this.prisma.author.update({
      where: { id },
      data: {
        ...updateAuthorDto,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Find author with their books
      const author = await tx.author.findUnique({
        where: { id },   // 👈 id is a real number here
        include: { books: true },
      });

      if (!author) {
        throw new NotFoundException(`Author with id ${id} not found`);
      }

      const bookIds = author.books.map((b) => b.id);

      // 2. Delete borrows tied to those books
      if (bookIds.length > 0) {
        await tx.borrow.deleteMany({
          where: {
            bookId: { in: bookIds },
          },
        });

        // 3. Delete the books themselves
        await tx.book.deleteMany({
          where: {
            id: { in: bookIds },
          },
        });
      }

      // 4. Finally delete the author
      const deletedAuthor = await tx.author.delete({
        where: { id },
      });

      return {
        message:
          'Author and related books (and their borrow records) deleted successfully',
        author: deletedAuthor,
        deletedBookCount: bookIds.length,
      };
    });
  }
}
