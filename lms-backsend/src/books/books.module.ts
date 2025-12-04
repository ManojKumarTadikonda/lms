import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Prisma } from 'generated/prisma/browser';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BooksController],
  providers: [BooksService]
  
})
export class BooksModule {}
