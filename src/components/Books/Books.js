import { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, Hash, User as UserIcon, CheckCircle, XCircle, Info, Library, Plus, Edit2 } from 'lucide-react';
import BookModal from './BookModal';
import Layout from '../Layout/Layout';
import './Books.css';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedBook, setSelectedBook] = useState(null);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:8080/books');
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const res = await response.json();
      setBooks(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.isbn.includes(searchQuery)
  );

  const toggleAccordion = (bookId) => {
    setExpandedId(expandedId === bookId ? null : bookId);
  };

  const handleOpenAddModal = () => {
    setModalMode('add');
    setSelectedBook(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (e, book) => {
    e.stopPropagation();
    setModalMode('edit');
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleSaveBook = async (bookData) => {
    try {
      const url = modalMode === 'add'
        ? 'http://localhost:8080/books'
        : `http://localhost:8080/books/${bookData.bookId}`;
      const method = modalMode === 'add' ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData)
      });

      if (response.ok) {
        setIsModalOpen(false);
        fetchBooks();
      } else {
        alert(`Failed to ${modalMode} book`);
      }
    } catch (err) {
      console.error(err);
      alert(`Error ${modalMode}ing book`);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="status-container glass-card">
          <div className="loader"></div>
          <h2>Loading Books...</h2>
          <p>Connecting to library database</p>
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
      <header className="books-header">
        <div className='left-header'>
          <div className='header-top'>
            <h1 className="page-title">Book Catalog</h1>
            <button className="add-book-btn" onClick={handleOpenAddModal}>
              <Plus size={18} /> Add Book
            </button>
          </div>
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
          <div key={book.bookId} className={`book-accordion ${expandedId === book.bookId ? 'expanded' : ''}`}>
            <div className="accordion-header" onClick={() => toggleAccordion(book.bookId)}>
              <div className="book-main-info">
                <div className="book-icon-wrapper">
                  <Library size={24} />
                </div>
                <div>
                  <h3 className="book-title">{book.title}</h3>
                  <div className="book-meta">
                    <span className="book-author"><UserIcon size={14} /> {book.authorName}</span>
                    <span className="book-category">{book.category}</span>
                  </div>
                </div>
              </div>
              <div className="accordion-controls">
                <button className="edit-btn" onClick={(e) => handleOpenEditModal(e, book)}>
                  <Edit2 size={18} />
                </button>
                <span className="copies-count">{book.bookCopies ? book.bookCopies.length : 0} Copies</span>
                {expandedId === book.bookId ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </div>

            {expandedId === book.bookId && (
              <div className="accordion-content">
                <div className="book-details">
                  <div className="detail-item">
                    <Hash size={16} />
                    <span>ISBN: {book.isbn}</span>
                  </div>
                  <div className="detail-item">
                    <Info size={16} />
                    <span>{book.description}</span>
                  </div>
                </div>

                <div className="copies-table-container">
                  <table className="copies-table">
                    <thead>
                      <tr>
                        <th>Copy ID</th>
                        <th>Location</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {book.bookCopies && book.bookCopies.map(copy => (
                        <tr key={copy.bookCopyId}>
                          <td>{copy.bookCopyId}</td>
                          <td>{copy.shelfLocation}</td>
                          <td className="status-cell">
                            <span className={`status-badge ${copy.status.toLowerCase()}`}>
                              {copy.status === 'AVAILABLE' ? <CheckCircle size={14} /> :
                                copy.status === 'ISSUED' ? <Info size={14} /> :
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
      <BookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveBook}
        initialData={selectedBook}
        mode={modalMode}
      />
    </Layout>
  );
};

export default Books;
