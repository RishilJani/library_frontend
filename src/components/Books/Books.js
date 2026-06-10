import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Hash, User as UserIcon, CheckCircle, XCircle, Info, Library } from 'lucide-react';
import Layout from '../Layout/Layout';
import './Books.css';

const Books = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const books = [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      isbn: '978-0743273565',
      category: 'Fiction',
      copies: [
        { id: 'C001', status: 'Available', location: 'Shelf A1' },
        { id: 'C002', status: 'Issued', dueDate: '2026-06-15' },
        { id: 'C003', status: 'Available', location: 'Shelf A1' },
      ]
    },
    {
      id: 2,
      title: 'Clean Code',
      author: 'Robert C. Martin',
      isbn: '978-0132350884',
      category: 'Computer Science',
      copies: [
        { id: 'C101', status: 'Issued', dueDate: '2026-06-12' },
        { id: 'C102', status: 'Available', location: 'Shelf B3' },
      ]
    },
    {
      id: 3,
      title: 'Atomic Habits',
      author: 'James Clear',
      isbn: '978-0735211292',
      category: 'Self-Help',
      copies: [
        { id: 'C201', status: 'Available', location: 'Shelf C2' },
      ]
    },
    {
      id: 4,
      title: 'Physics Vol 1',
      author: 'Resnick & Halliday',
      isbn: '978-0471320579',
      category: 'Science',
      copies: [
        { id: 'C301', status: 'Damaged', location: 'Lab' },
        { id: 'C302', status: 'Available', location: 'Shelf D1' },
      ]
    }
  ];

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.isbn.includes(searchQuery)
  );

  const toggleAccordion = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Layout>
      <header className="books-header">
        <div>
          <h1 className="page-title">Book Catalog</h1>
          <p className="page-subtitle">Manage and explore library inventory</p>
        </div>

        <div className="search-container">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search by title, author or ISBN..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <div className="books-list">
        {filteredBooks.map((book) => (
          <div key={book.id} className={`book-accordion ${expandedId === book.id ? 'expanded' : ''}`}>
            <div className="accordion-header" onClick={() => toggleAccordion(book.id)}>
              <div className="book-main-info">
                <div className="book-icon-wrapper">
                  <Library size={24} />
                </div>
                <div>
                  <h3 className="book-title">{book.title}</h3>
                  <div className="book-meta">
                    <span className="book-author"><UserIcon size={14} /> {book.author}</span>
                    <span className="book-category">{book.category}</span>
                  </div>
                </div>
              </div>
              <div className="accordion-controls">
                <span className="copies-count">{book.copies.length} Copies</span>
                {expandedId === book.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </div>

            {expandedId === book.id && (
              <div className="accordion-content">
                <div className="book-details">
                  <div className="detail-item">
                    <Hash size={16} />
                    <span>ISBN: {book.isbn}</span>
                  </div>
                </div>

                <div className="copies-table-container">
                  <table className="copies-table">
                    <thead>
                      <tr>
                        <th>Copy ID</th>
                        <th>Location / Info</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {book.copies.map(copy => (
                        <tr key={copy.id}>
                          <td>{copy.id}</td>
                          <td>{copy.location || `Due: ${copy.dueDate}`}</td>
                          <td className="status-cell">
                            <span className={`status-badge ${copy.status.toLowerCase()}`}>
                              {copy.status === 'Available' ? <CheckCircle size={14} /> :
                                copy.status === 'Issued' ? <Info size={14} /> :
                                  <XCircle size={14} />}
                              {copy.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ))}

        {filteredBooks.length === 0 && (
          <div className="no-results glass-card">
            <Info size={48} />
            <h2>No books found</h2>
            <p>Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Books;
