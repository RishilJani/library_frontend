import { useState, useEffect } from 'react';
import { Search, User as UserIcon, Mail, Shield, Calendar, XCircle, ChevronRight, UserCheck, X } from 'lucide-react';
import Layout from '../Layout/Layout';
import './Members.css';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('http://localhost:8080/users');
        if (!response.ok) {
          throw new Error('Failed to fetch members');
        }
        const res = await response.json();
        setMembers(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const filteredMembers = members.filter(member =>
    member.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openMemberDetails = (member) => {
    setSelectedMember(member);
  };

  const closeMemberDetails = () => {
    setSelectedMember(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="status-container glass-card">
          <div className="loader"></div>
          <h2>Loading Members...</h2>
          <p>Connecting to user database</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="status-container glass-card error">
          <XCircle size={48} color="#ef4444" />
          <h2>Connection Error</h2>
          <p>{error}</p>
          <button className="retry-button" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <header className="members-header">
        <div className='left-header'>
          <h1 className="page-title">Library Members</h1>
          <p className="page-subtitle">Manage and view registered users</p>
        </div>

        <div className="search-container">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <div className="members-list">
        {filteredMembers.map((member) => (
          <div 
            key={member.email} // Using email as key since userId is removed and emails are unique
            className="member-card"
            onClick={() => openMemberDetails(member)}
          >
            <div className="member-card-content">
              <div className="member-main-info">
                <div className="member-icon-wrapper">
                  <UserCheck size={24} />
                </div>
                <div>
                  <h3 className="member-name">{member.userName}</h3>
                  <div className="member-meta">
                    <span className="member-email"><Mail size={14} /> {member.email}</span>
                    <span className={`member-role role-${member.role.toLowerCase()}`}>{member.role}</span>
                  </div>
                </div>
              </div>
              <div className="card-action">
                <ChevronRight size={20} />
              </div>
            </div>
          </div>
        ))}

        {filteredMembers.length === 0 && (
          <div className="no-results glass-card">
            <UserIcon size={48} />
            <h2>No members found</h2>
            <p>Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Member Details Dialog */}
      {selectedMember && (
        <div className="modal-overlay" onClick={closeMemberDetails}>
          <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeMemberDetails}>
              <X size={24} />
            </button>
            
            <div className="modal-header">
              <div className="modal-avatar">
                <UserCheck size={40} />
              </div>
              <h2 className="modal-title">{selectedMember.userName}</h2>
              <span className={`modal-role-badge role-${selectedMember.role.toLowerCase()}`}>
                {selectedMember.role}
              </span>
            </div>

            <div className="modal-body">
              <div className="detail-item">
                <Mail className="detail-icon" size={20} />
                <div className="detail-info">
                  <label>Email Address</label>
                  <span>{selectedMember.email}</span>
                </div>
              </div>

              <div className="detail-item">
                <Shield className="detail-icon" size={20} />
                <div className="detail-info">
                  <label>Account Role</label>
                  <span>{selectedMember.role}</span>
                </div>
              </div>

              <div className="detail-item">
                <Calendar className="detail-icon" size={20} />
                <div className="detail-info">
                  <label>Joined On</label>
                  <span>{formatDate(selectedMember.createdAt)}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </Layout>
  );
};

export default Members;
