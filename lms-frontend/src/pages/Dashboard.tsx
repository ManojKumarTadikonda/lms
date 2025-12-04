import { useEffect, useState } from 'react';
import { booksApi, authorsApi, borrowApi } from '../services/api';
import { BookOpen, Users, BookMarked } from 'lucide-react';

export const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalAuthors: 0,
    borrowedBooks: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [books, authors, borrowed] = await Promise.all([
          booksApi.getAll(),
          authorsApi.getAll(),
          borrowApi.getMyBorrowedBooks(),
        ]);

        setStats({
          totalBooks: books.length,
          totalAuthors: authors.length,
          borrowedBooks: borrowed.length,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      label: 'Total Books',
      value: stats.totalBooks,
      icon: BookOpen,
      color: 'text-primary',
    },
    {
      label: 'Total Authors',
      value: stats.totalAuthors,
      icon: Users,
      color: 'text-primary',
    },
    {
      label: 'My Borrowed Books',
      value: stats.borrowedBooks,
      icon: BookMarked,
      color: 'text-primary',
    },
  ];

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to your library overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-primary bg-opacity-10`}>
                  <Icon className={`w-6 h-6 ${card.color}`} />
                </div>
              </div>
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">{card.label}</p>
                <p className="text-3xl font-bold text-black">{card.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
