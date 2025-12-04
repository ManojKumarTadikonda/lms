import type {
  AuthResponse,
  LoginRequest,
  SignupRequest,
  User,
  Author,
  CreateAuthorRequest,
  UpdateAuthorRequest,
  Book,
  CreateBookRequest,
  UpdateBookRequest,
  BorrowRequest,
  BorrowRecord,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

const getHeaders = (includeAuth = false): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const authApi = {
  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse<AuthResponse>(response);
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse<AuthResponse>(response);
  },

  getMe: async (): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: getHeaders(true),
    });
    return handleResponse<User>(response);
  },
};

export const authorsApi = {
  getAll: async (): Promise<Author[]> => {
    const response = await fetch(`${API_BASE_URL}/authors`, {
      headers: getHeaders(),
    });
    return handleResponse<Author[]>(response);
  },

  getById: async (id: number): Promise<Author> => {
    const response = await fetch(`${API_BASE_URL}/authors/${id}`, {
      headers: getHeaders(),
    });
    return handleResponse<Author>(response);
  },

  create: async (data: CreateAuthorRequest): Promise<Author> => {
    const response = await fetch(`${API_BASE_URL}/authors`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    });
    return handleResponse<Author>(response);
  },

  update: async (id: number, data: UpdateAuthorRequest): Promise<Author> => {
    const response = await fetch(`${API_BASE_URL}/authors/${id}`, {
      method: 'PATCH',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    });
    return handleResponse<Author>(response);
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/authors/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }
  },
};

export const booksApi = {
  getAll: async (params?: {
    authorId?: number;
    isBorrowed?: boolean;
    search?: string;
  }): Promise<Book[]> => {
    const searchParams = new URLSearchParams();
    if (params?.authorId) searchParams.append('authorId', params.authorId.toString());
    if (params?.isBorrowed !== undefined) searchParams.append('isBorrowed', params.isBorrowed.toString());
    if (params?.search) searchParams.append('search', params.search);

    const url = searchParams.toString()
      ? `${API_BASE_URL}/books?${searchParams}`
      : `${API_BASE_URL}/books`;

    const response = await fetch(url, {
      headers: getHeaders(),
    });
    return handleResponse<Book[]>(response);
  },

  getById: async (id: number): Promise<Book> => {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      headers: getHeaders(),
    });
    return handleResponse<Book>(response);
  },

  create: async (data: CreateBookRequest): Promise<Book> => {
    const response = await fetch(`${API_BASE_URL}/books`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    });
    return handleResponse<Book>(response);
  },

  update: async (id: number, data: UpdateBookRequest): Promise<Book> => {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: 'PATCH',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    });
    return handleResponse<Book>(response);
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }
  },
};

export const borrowApi = {
  borrow: async (data: BorrowRequest): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/borrow`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    });
    return handleResponse<{ message: string }>(response);
  },

  return: async (data: BorrowRequest): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/borrow/return`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    });
    return handleResponse<{ message: string }>(response);
  },

  getMyBorrowedBooks: async (): Promise<BorrowRecord[]> => {
    const response = await fetch(`${API_BASE_URL}/borrow/me`, {
      headers: getHeaders(true),
    });
    return handleResponse<BorrowRecord[]>(response);
  },
};
