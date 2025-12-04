import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    ParseIntPipe,
    Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { GetBooksFilterDto } from './dto/get-books-filter.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
// If you're using roles like for authors, you can also import Roles & RolesGuard here.

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) { }

    // Create book - protected by JWT (and optionally ADMIN role)
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles('ADMIN')
    @Post()
    create(@Body() createBookDto: CreateBookDto) {
        return this.booksService.create(createBookDto);
    }

    // List books - public
    // Supports: ?authorId=1&isBorrowed=false&search=harry
    @Get()
    findAll(@Query() filters: GetBooksFilterDto) {
        return this.booksService.findAll(filters);
    }

    // Get single book - public
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.booksService.findOne(id);
    }

    // Update book - protected
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles('ADMIN')
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateBookDto: UpdateBookDto,
    ) {
        return this.booksService.update(id, updateBookDto);
    }

    // Delete book - protected
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles('ADMIN')
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.booksService.remove(id);
    }
}
