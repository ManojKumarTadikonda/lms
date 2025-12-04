import { useEffect, useState } from 'react';
import { borrowApi } from '../services/api';
import type { BorrowRecord } from '../types';

export const BorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  const fetchBorrowedBooks = async () => {
    try {
      const data = await borrowApi.getMyBorrowedBooks();
      setBorrowedBooks(data);
    } catch (error) {
      console.error('Failed to fetch borrowed books:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReturn = async (bookId: number) => {
    setActionLoading(bookId);
    try {
      await borrowApi.return({ bookId });
      await fetchBorrowedBooks();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to return book');
    } finally {
      setActionLoading(null);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="text-lg">Loading borrowed books...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">My Borrowed Books</h1>
        <p className="text-gray-600">Books currently borrowed by you</p>
      </div>

      {borrowedBooks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">You haven't borrowed any books yet.</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Book Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Borrowed Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {borrowedBooks.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-black">{record.book.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{record.book.author.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">
                        {new Date(record.borrowedAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleReturn(record.bookId)}
                        disabled={actionLoading === record.bookId}
                        className="text-primary hover:text-opacity-80 font-medium text-sm disabled:opacity-50"
                      >
                        {actionLoading === record.bookId ? 'Processing...' : 'Return'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
