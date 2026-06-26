import { useState, useEffect } from 'react';
import './BookModal.css';

const BookModal = ({ isOpen, onClose, onSave, initialData, mode }) => {
  const [formData, setFormData] = useState({
    isbn: '',
    title: '',
    authorName: '',
    category: '',
    description: '',
    publication: ''
  });

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        isbn: '',
        title: '',
        authorName: '',
        category: '',
        description: '',
        publication: ''
      });
    }
  }, [mode, initialData, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{mode === 'add' ? 'Add New Book' : 'Edit Book'}</h2>
        </div>
        <form className="add-book-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Author Name</label>
              <input type="text" name="authorName" value={formData.authorName} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>ISBN</label>
              <input type="text" name="isbn" value={formData.isbn} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Category</label>
              <input type="text" name="category" value={formData.category} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Publication</label>
              <input type="text" name="publication" value={formData.publication} onChange={handleInputChange} required />
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" required></textarea>
          </div>
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="save-btn">{mode === 'add' ? 'Save Book' : 'Update Book'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookModal;
