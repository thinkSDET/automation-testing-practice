import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import FormPage from './pages/FormPage';
import TablePage from './pages/TablePage';
import ElementsPage from './pages/ElementsPage';
import UserManagementPage from './pages/UserManagementPage';
import AlertsPage from './pages/AlertsPage';
import DragDropPage from './pages/DragDropPage';
import './App.css';

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">{children}</main>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedLayout>
            <DashboardPage />
          </ProtectedLayout>
        }
      />
      <Route
        path="/form"
        element={
          <ProtectedLayout>
            <FormPage />
          </ProtectedLayout>
        }
      />
      <Route
        path="/table"
        element={
          <ProtectedLayout>
            <TablePage />
          </ProtectedLayout>
        }
      />
      <Route
        path="/elements"
        element={
          <ProtectedLayout>
            <ElementsPage />
          </ProtectedLayout>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedLayout>
            <UserManagementPage />
          </ProtectedLayout>
        }
      />
      <Route
        path="/alerts"
        element={
          <ProtectedLayout>
            <AlertsPage />
          </ProtectedLayout>
        }
      />
      <Route
        path="/drag-drop"
        element={
          <ProtectedLayout>
            <DragDropPage />
          </ProtectedLayout>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function NotFound() {
  return (
    <div className="app-shell">
      <main className="app-main">
        <div className="card" data-testid="not-found">
          <h2>404 — Page not found</h2>
          <p>There is no route matching that URL in this practice app.</p>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
