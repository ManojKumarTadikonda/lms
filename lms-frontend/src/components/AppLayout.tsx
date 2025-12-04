import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  BookOpen,
  Users,
  LayoutDashboard,
  BookMarked,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { LoginCard } from '../components/LoginCard';
import { SignupCard } from '../components/SignupCard';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const handleLogout = () => {
    logout();
    // After logout, send user to a public page (no /login route needed now)
    navigate('/books');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, requiresAuth: true },
    { path: '/books', label: 'Books', icon: BookOpen, requiresAuth: false },
    { path: '/authors', label: 'Authors', icon: Users, requiresAuth: false },
    { path: '/borrowed', label: 'My Borrowed Books', icon: BookMarked, requiresAuth: true },
  ];

  const adminNavItems = [
    { path: '/admin/books', label: 'Manage Books', icon: BookOpen },
    { path: '/admin/authors', label: 'Manage Authors', icon: Users },
  ];

  const filteredNavItems = navItems.filter((item) => !item.requiresAuth || user);

  const openLoginCard = () => {
    setAuthMode('login');
    setIsAuthOpen(true);
  };

  const openSignupCard = () => {
    setAuthMode('signup');
    setIsAuthOpen(true);
  };

  const handleAuthSuccess = () => {
    setIsAuthOpen(false);
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* SIDEBAR */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-white border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
              <BookOpen className="w-7 h-7" />
              Library
            </h1>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {filteredNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${
                      isActive(item.path)
                        ? 'bg-primary text-white'
                        : 'text-black hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}

            {user?.role === 'ADMIN' && (
              <>
                <div className="pt-4 pb-2">
                  <div className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Admin
                  </div>
                </div>
                {adminNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                        ${
                          isActive(item.path)
                            ? 'bg-primary text-white'
                            : 'text-black hover:bg-gray-100'
                        }
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </>
            )}
          </nav>

          {/* FOOTER / USER SECTION */}
          <div className="p-4 border-t border-gray-200">
            {user ? (
              <>
                <div className="mb-3 px-2">
                  <div className="text-sm font-medium text-black">{user.name}</div>
                  <div className="text-xs text-gray-600">{user.email}</div>
                  <div className="text-xs font-semibold text-primary mt-1">
                    {user.role}
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-black hover:bg-gray-100 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </>
            ) : (
              <button
                onClick={openLoginCard}
                className="w-full flex items-center justify-center gap-3 px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Login
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* MOBILE SIDEBAR BACKDROP */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden bg-white border-b border-gray-200 p-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-primary"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </header>

        <main className="flex-1 overflow-auto">{children}</main>
      </div>

      {/* AUTH MODAL (LOGIN / SIGNUP CARDS) */}
      {isAuthOpen && (
        // CHANGED: Added 'p-4' for mobile padding and 'backdrop-blur-sm' for style
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          
          {/* CHANGED: Added 'w-full' and 'max-w-2xl' to allow the child card to expand */}
          <div className="relative w-full max-w-2xl">
            <button
              onClick={() => setIsAuthOpen(false)}
              className="absolute -top-4 -right-2 sm:-right-4 bg-white text-gray-700 hover:text-red-500 rounded-full w-8 h-8 flex items-center justify-center shadow-lg transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {authMode === 'login' ? (
              <LoginCard
                onSuccess={handleAuthSuccess}
                onSwitchToSignup={openSignupCard}
              />
            ) : (
              <SignupCard
                onSuccess={handleAuthSuccess}
                onSwitchToLogin={openLoginCard}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};