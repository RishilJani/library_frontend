import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  SquareLibrary,
  LogOut,
  Library
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/books', icon: BookOpen, label: 'Books' },
    { path: '/members', icon: Users, label: 'Members' },
    { path: '/library', icon: SquareLibrary, label: 'Explore Library' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <Library size={32} />
        <span>LibVibe</span>
      </div>

      <nav className="nav-links">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        ))}

        <Link to="/logout" className="nav-item">
          <LogOut size={20} />
          <span>Logout</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
