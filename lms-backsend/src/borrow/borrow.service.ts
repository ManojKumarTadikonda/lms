import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BorrowBookDto } from './dto/borrow-book.dto';

@Injectable()
export class BorrowService {
    constructor(private readonly prisma: PrismaService) { }

    // Borrow a book
    async borrowBook(userId: number, dto: BorrowBookDto) {
        const { bookId } = dto;

        const book = await this.prisma.book.findUnique({
            where: { id: bookId },
        });

        if (!book) {
            throw new NotFoundException(`Book with id ${bookId} not found`);
        }

        if (book.availablecount <= 0) {
            throw new BadRequestException('Book is out of stock');
        }
        const newAvailable = book.availablecount - 1;


        // Use a transaction: create borrow record + update book
        const [borrow] = await this.prisma.$transaction([
            this.prisma.borrow.create({
                data: {
                    userId,
                    bookId,
                    status: 'BORROWED',
                },
                include: {
                    book: true,
                },
            }),
            this.prisma.book.update({
                where: { id: bookId },
                data: {
                    availablecount: newAvailable,
                    isBorrowed: newAvailable === 0, // out of stock if no copies left
                },
            }),
        ]);

        return {
            message: 'Book borrowed successfully',
            borrow,
        };
    }

    // Return a book
    async returnBook(userId: number, dto: BorrowBookDto) {
        const { bookId } = dto;

        const book = await this.prisma.book.findUnique({
            where: { id: bookId },
        });

        if (!book) {
            throw new NotFoundException(`Book with id ${bookId} not found`);
        }
        // Find active borrow record
        const activeBorrow = await this.prisma.borrow.findFirst({
            where: {
                userId,
                bookId,
                status: 'BORROWED',
            },
        });

        if (!activeBorrow) {
            throw new BadRequestException(
                'You do not have an active borrow for this book',
            );
        }
        const newAvailable = book.availablecount + 1;

        // Transaction: mark borrow as returned + update book status
        const [updatedBorrow] = await this.prisma.$transaction([
            this.prisma.borrow.update({
                where: { id: activeBorrow.id },
                data: {
                    status: 'RETURNED',
                    returnedAt: new Date(),
                },
            }),
            this.prisma.book.update({
                where: { id: bookId },
                data: {
                    availablecount: newAvailable,
                    isBorrowed: newAvailable === 0,
                },
            }),
        ]);

        return {
            message: 'Book returned successfully',
            borrow: updatedBorrow,
        };
    }

    // All active borrowed books for a specific user
    async getActiveBorrowedByUser(userId: number) {
        return this.prisma.borrow.findMany({
            where: {
                userId,
                status: 'BORROWED',
            },
            include: {
                book: {
                    include: {
                        author: true, // 👈 THIS RETURNS author object
                    },
                },
            },
            orderBy: {
                borrowedAt: 'desc',
            },
        });
    }


    // (Optional) full borrow history for a user
    async getBorrowHistoryByUser(userId: number) {
        return this.prisma.borrow.findMany({
            where: { userId },
            include: {
                book: true,
            },
            orderBy: {
                borrowedAt: 'desc',
            },
        });
    }
}
