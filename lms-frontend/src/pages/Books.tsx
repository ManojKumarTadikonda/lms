import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { booksApi, borrowApi } from "../services/api";
import type { Book } from "../types";
import { Settings } from "lucide-react";

export const Books = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await booksApi.getAll();
      setBooks(data);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBorrow = async (bookId: number) => {
    setActionLoading(bookId);
    try {
      await borrowApi.borrow({ bookId });
      await fetchBooks();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to borrow book");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReturn = async (bookId: number) => {
    setActionLoading(bookId);
    try {
      await borrowApi.return({ bookId });
      await fetchBooks();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to return book");
    } finally {
      setActionLoading(null);
    }
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="text-lg">Loading books...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black mb-2">Books</h1>
          <p className="text-gray-600">Browse our collection</p>
        </div>
        {user?.role === "ADMIN" && (
          <Link
            to="/admin/books"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
          >
            <Settings className="w-4 h-4" />
            Manage Books
          </Link>
        )}
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search books by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-bold text-black mb-2">{book.title}</h3>
            <p className="text-primary text-sm font-medium mb-3">
              {book.author.name}
            </p>

            {book.description && (
              <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                {book.description}
              </p>
            )}

            <div className="text-sm text-gray-500 mb-4">
              <p>Published: {book.publishedYear}</p>
              {book.isbn && <p>ISBN: {book.isbn}</p>}
            </div>

            <div className="flex items-center justify-between">
              <span
                className={`text-sm font-medium ${
                  book.isBorrowed ? "text-red-500" : "text-green-600"
                }`}
              >
                {book.isBorrowed ? "Currently not Available" : "Available"}
              </span>

              {user && (
                <div>
                  {!book.isBorrowed && (
                    <button
                      onClick={() => handleBorrow(book.id)}
                      disabled={actionLoading === book.id}
                      className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50"
                    >
                      {actionLoading === book.id ? "Processing..." : "Borrow"}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12 text-gray-500">No books found.</div>
      )}
    </div>
  );
};
