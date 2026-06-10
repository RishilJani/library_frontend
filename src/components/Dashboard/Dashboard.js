import {
  BookOpen,
  Users,
  Clock,
  Library,
  LayoutDashboard,
  Book,
  UserCheck,
  LogOut,
  SquareLibrary,
  User
} from 'lucide-react';
import StatCard from './StatCard';
import './Dashboard.css';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const stats = [
    { icon: Book, value: '4,231', label: 'Total Books' },
    { icon: Users, value: '1,284', label: 'Active Members' },
    { icon: UserCheck, value: '342', label: 'Books Borrowed' },
    { icon: Clock, value: '56', label: 'Overdue Books' },
  ];

  const recentActivity = [
    { id: 1, user: 'Arnav Singh', book: 'The Great Gatsby', status: 'Borrowed', time: '2 hours ago' },
    { id: 2, user: 'Ishita Roy', book: 'Clean Code', status: 'Returned', time: '4 hours ago' },
    { id: 3, user: 'Siddharth Jain', book: 'Atomic Habits', status: 'Borrowed', time: 'Yesterday' },
    { id: 4, user: 'Ananya Gupta', book: 'Physics Vol 1', status: 'Returned', time: '2 days ago' },
  ];

  return (
    <div className="dashboard-container">
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>

      <div className="dashboard-layout">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-logo">
            <Library size={32} />
            <span>LibVibe</span>
          </div>

          <nav className="nav-links">
            <Link to="/" className="nav-item active">
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
            <Link to="/catalog" className="nav-item">
              <BookOpen size={20} />
              <span>Books</span>
            </Link>
            <Link to="/members" className="nav-item">
              <Users size={20} />
              <span>Members</span>
            </Link>
            <Link to="/lending" className="nav-item">
              <SquareLibrary size={20} />
              <span>Explore Library</span>
            </Link>
            <div style={{ marginTop: 'auto' }}></div>
            <Link to="/logout" className="nav-item">
              <LogOut size={20} />
              <span>Logout</span>
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <main className="main-content">
          <header className="dashboard-header">
            <div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 700, margin: 0 }}>Dashboard</h1>
              <p style={{ color: 'rgba(255,255,255,0.6)', margin: '0.25rem 0 0 0' }}>Welcome back, userName!</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div className="user-profile" style={{ cursor: 'pointer' }}>
                <User />
                <span style={{ fontWeight: 500 }}>Admin</span>
              </div>
            </div>
          </header>

          {/* Stats Grid */}
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          {/* Content Grid */}
          <div className="content-grid">
            <div className="glass-card">
              <h2 className="section-title">Recent Activity</h2>
              <div className="activity-list">
                {recentActivity.map(item => (
                  <div key={item.id} className="activity-item">
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <UserCheck size={20} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600 }}>{item.user}</div>
                      <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
                        {item.status} <span style={{ color: '#818cf8' }}>{item.book}</span>
                      </div>
                    </div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>{item.time}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card">
              <h2 className="section-title">Popular Categories</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {['Fiction', 'Computer Science', 'Physics', 'History'].map((cat, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'rgba(255,255,255,0.8)' }}>{cat}</span>
                    <div style={{ width: '60%', height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3 }}>
                      <div style={{ width: `${85 - i * 15}%`, height: '100%', background: 'var(--primary-color)', borderRadius: 3 }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
