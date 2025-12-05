export type UserRole = 'USER' | 'ADMIN';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface Author {
  id: number;
  name: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Book {
  id: number;
  title: string;
  description?: string;
  publishedYear: number;
  isbn?: string;
  authorId: number;
  isBorrowed: boolean;
  availablecount: number;
  author: {
    id: number;
    name: string;
  };
}

export interface BorrowRecord {
  id: number;
  userId: number;
  bookId: number;
  status: 'BORROWED' | 'RETURNED';
  borrowedAt: string;
  returnedAt: string | null;
  book: {
    id: number;
    title: string;
    author: {
      id: number;
      name: string;
    };
  };
}

export interface AuthResponse {
  message: string;
  accessToken: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  role :string;
}

export interface CreateAuthorRequest {
  name: string;
  bio?: string;
}

export interface UpdateAuthorRequest {
  name?: string;
  bio?: string;
}

export interface CreateBookRequest {
  title: string;
  description?: string;
  publishedYear: number;
  isbn?: string;
  authorId: number;
}

export interface UpdateBookRequest {
  title?: string;
  description?: string;
  publishedYear?: number;
  isbn?: string;
  authorId?: number;
}

export interface BorrowRequest {
  bookId: number;
}
