import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authorsApi } from '../services/api';
import type { Author } from '../types';
import { Settings } from 'lucide-react';

export const Authors = () => {
  const { user } = useAuth();
  const [authors, setAuthors] = useState<Author[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const data = await authorsApi.getAll();
      setAuthors(data);
    } catch (error) {
      console.error('Failed to fetch authors:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="text-lg">Loading authors...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black mb-2">Authors</h1>
          <p className="text-gray-600">Explore our collection of authors</p>
        </div>
        {user?.role === 'ADMIN' && (
          <Link
            to="/admin/authors"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
          >
            <Settings className="w-4 h-4" />
            Manage Authors
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {authors.map((author) => (
          <div
            key={author.id}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-bold text-black mb-2">{author.name}</h3>
            {author.bio && (
              <p className="text-gray-600 text-sm">{author.bio}</p>
            )}
          </div>
        ))}
      </div>

      {authors.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No authors found.
        </div>
      )}
    </div>
  );
};
