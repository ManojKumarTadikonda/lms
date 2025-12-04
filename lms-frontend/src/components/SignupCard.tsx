import { useState, FormEvent } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { authApi } from '../services/api';
import { BookOpen } from 'lucide-react';

type SignupCardProps = {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
};

export const SignupCard = ({ onSuccess, onSwitchToLogin }: SignupCardProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await authApi.signup({ name, email, password });
      login(response.accessToken, response.user);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // CHANGED: Matching LoginCard dimensions (max-w-2xl, p-8 sm:p-12, rounded-3xl)
    <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8 sm:p-12 mx-auto">
      
      {/* CHANGED: Increased bottom margin */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-primary mb-4">
          {/* CHANGED: Larger icon */}
          <BookOpen className="w-12 h-12" />
        </div>
        {/* CHANGED: Larger text */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
        <p className="text-gray-500 text-base">Join our library community today</p>
      </div>

      {/* CHANGED: Increased spacing between form items */}
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
            // CHANGED: Taller input (py-3.5), rounded-xl
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
            // CHANGED: Taller input (py-3.5), rounded-xl
            className="w-full px-4 py-3.5 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            placeholder="you@example.com"
          />
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
            // CHANGED: Taller input (py-3.5), rounded-xl
            className="w-full px-4 py-3.5 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            placeholder="At least 6 characters"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          // CHANGED: Taller button, bold text, shadow
          className="w-full bg-primary text-white py-3.5 px-4 rounded-xl font-bold text-lg hover:bg-opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
        >
          {isLoading ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>

      {/* CHANGED: Increased top margin */}
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