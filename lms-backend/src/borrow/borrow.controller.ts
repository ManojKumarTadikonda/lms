import {
    Controller,
    Post,
    Body,
    UseGuards,
    Req,
    Get,
    Param,
    ParseIntPipe,
} from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { BorrowBookDto } from './dto/borrow-book.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('borrow')
export class BorrowController {
    constructor(private readonly borrowService: BorrowService) { }

    // POST /borrow - borrow a book (current user)
    @UseGuards(JwtAuthGuard) 
    @Post()
    async borrow(@Req() req: any, @Body() dto: BorrowBookDto) {
        const userId = req.user.userId; // from JwtStrategy.validate
        return this.borrowService.borrowBook(userId, dto);
    }

    // POST /borrow/return - return a book (current user)
    @UseGuards(JwtAuthGuard) 
    @Post('return')
    async return(@Req() req: any, @Body() dto: BorrowBookDto) {
        const userId = req.user.userId;
        return this.borrowService.returnBook(userId, dto);
    }

    // GET /borrow/me - active borrowed books for current user
    @UseGuards(JwtAuthGuard) 
    @Get('me')
    async getMyActiveBorrows(@Req() req: any) {
        const userId = req.user.userId;
        return this.borrowService.getActiveBorrowedByUser(userId);
    }

    // GET /borrow/user/:userId - view another user's borrowed books
    @UseGuards(JwtAuthGuard,RolesGuard) 
    @Roles('ADMIN')
    @Get('user/:userId')
    async getActiveBorrowsForUser(@Param('userId', ParseIntPipe) userId: number) {
        return this.borrowService.getActiveBorrowedByUser(userId);
    }

    // GET /borrow/user/:userId/history - full history
    @Get('user/:userId/history')
    async getBorrowHistoryForUser(
        @Param('userId', ParseIntPipe) userId: number,
    ) {
        return this.borrowService.getBorrowHistoryByUser(userId);
    }
}
