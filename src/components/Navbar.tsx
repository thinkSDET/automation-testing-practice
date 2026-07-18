import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const LINKS = [
  { to: '/dashboard', label: 'Dashboard', testId: 'nav-dashboard' },
  { to: '/form', label: 'Form', testId: 'nav-form' },
  { to: '/table', label: 'Orders', testId: 'nav-table' },
  { to: '/elements', label: 'Elements', testId: 'nav-elements' },
  { to: '/users', label: 'Users', testId: 'nav-users' },
  { to: '/alerts', label: 'Alerts', testId: 'nav-alerts' },
  { to: '/drag-drop', label: 'Drag & Drop', testId: 'nav-dragdrop' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar" data-testid="navbar">
      <div className="navbar__brand">
        <span className="navbar__mark">QA</span>
        <span>Sandbox</span>
      </div>

      <button
        className="navbar__toggle"
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
        data-testid="nav-toggle"
        onClick={() => setMenuOpen((v) => !v)}
      >
        ☰
      </button>

      <nav className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
        {LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            data-testid={link.testId}
            className={({ isActive }) => 'navbar__link' + (isActive ? ' navbar__link--active' : '')}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="navbar__user">
        {user && (
          <>
            <span className="navbar__username" data-testid="current-user-name">
              {user.name}
            </span>
            <button className="btn btn--ghost" data-testid="logout-button" onClick={logout}>
              Log out
            </button>
          </>
        )}
      </div>
    </header>
  );
}
