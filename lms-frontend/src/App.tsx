import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AppLayout } from './components/AppLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminRoute } from './components/AdminRoute';
import { Dashboard } from './pages/Dashboard';
import { Books } from './pages/Books';
import { Authors } from './pages/Authors';
import { BorrowedBooks } from './pages/BorrowedBooks';
import { ManageBooks } from './pages/admin/ManageBooks';
import { ManageAuthors } from './pages/admin/ManageAuthors';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<AppLayout><Books /></AppLayout>} />
          <Route path="/books" element={<AppLayout><Books /></AppLayout>} />
          <Route path="/authors" element={<AppLayout><Authors /></AppLayout>} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/borrowed"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <BorrowedBooks />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/books"
            element={
              <AdminRoute>
                <AppLayout>
                  <ManageBooks />
                </AppLayout>
              </AdminRoute>
            }
          />

          <Route
            path="/admin/authors"
            element={
              <AdminRoute>
                <AppLayout>
                  <ManageAuthors />
                </AppLayout>
              </AdminRoute>
            }
          />

          <Route path="*" element={<Navigate to="/books" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
