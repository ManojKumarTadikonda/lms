import { useState, FormEvent } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { authApi } from '../services/api';
// Added ChevronDown for the dropdown styling
import { BookOpen, ChevronDown } from 'lucide-react';

type SignupCardProps = {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
};

// Define the role type for type safety
type UserRole = 'USER' | 'ADMIN';

export const SignupCard = ({ onSuccess, onSwitchToLogin }: SignupCardProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // 1. New State for Role (Defaulting to USER)
  const [role, setRole] = useState<UserRole>('USER');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // 2. Updated API call to include role
      const response = await authApi.signup({ name, email, password, role });
      login(response.accessToken, response.user);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8 sm:p-12 mx-auto">
      
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-primary mb-4">
          <BookOpen className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
        <p className="text-gray-500 text-base">Join our library community today</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3.5 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3.5 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            placeholder="you@example.com"
          />
        </div>

        {/* 3. New Role Dropdown UI */}
        <div>
          <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
            Select Role
          </label>
          <div className="relative">
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="w-full px-4 py-3.5 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 appearance-none bg-white cursor-pointer"
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
            {/* Custom arrow icon for better styling consistency */}
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-4 py-3.5 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            placeholder="At least 6 characters"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-white py-3.5 px-4 rounded-xl font-bold text-lg hover:bg-opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
        >
          {isLoading ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-primary font-bold hover:underline"
        >
          Sign in
        </button>
      </p>
    </div>
  );
};