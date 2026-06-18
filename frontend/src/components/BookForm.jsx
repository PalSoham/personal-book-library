import { useState, useEffect } from 'react';
import { FaTimes, FaStar } from 'react-icons/fa';

const PREDEFINED_GENRES = [
  'Self Help',
  'Fiction',
  'Science',
  'Biography',
  'Technology',
];

export default function BookForm({ book, onClose, onSave, loading }) {
  const isEditing = !!book;
  
  const [form, setForm] = useState({
    title: '',
    author: '',
    genre: 'Fiction',
    customGenre: '',
    rating: 5,
    status: 'Unread',
    description: '',
  });

  const [showCustomGenre, setShowCustomGenre] = useState(false);

  useEffect(() => {
    if (book) {
      const isPredefined = PREDEFINED_GENRES.includes(book.genre);
      setForm({
        title: book.title || '',
        author: book.author || '',
        genre: isPredefined ? book.genre : 'Other',
        customGenre: isPredefined ? '' : book.genre,
        rating: book.rating || 5,
        status: book.status || 'Unread',
        description: book.description || '',
      });
      setShowCustomGenre(!isPredefined);
    } else {
      setForm({
        title: '',
        author: '',
        genre: 'Fiction',
        customGenre: '',
        rating: 5,
        status: 'Unread',
        description: '',
      });
      setShowCustomGenre(false);
    }
  }, [book]);

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'genre') {
      if (value === 'Other') {
        setShowCustomGenre(true);
      } else {
        setShowCustomGenre(false);
      }
    }
    
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingSelect = (val) => {
    setForm((prev) => ({
      ...prev,
      rating: val,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.author.trim()) return;

    const finalGenre = form.genre === 'Other' ? form.customGenre.trim() || 'General' : form.genre;
    
    onSave({
      title: form.title.trim(),
      author: form.author.trim(),
      genre: finalGenre,
      rating: Number(form.rating),
      status: form.status,
      description: form.description.trim(),
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(109, 40, 217, 0.15)', backdropFilter: 'blur(6px)' }}
      onClick={handleBackdrop}
    >
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all duration-300 animate-in fade-in zoom-in-95">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50 bg-gradient-to-r from-gray-50 to-white">
          <div>
            <h2 className="font-bold text-gray-800 text-lg">
              {isEditing ? 'Edit Book Details' : 'Add New Book'}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {isEditing ? 'Modify your book\'s information below' : 'Fill in the details to add to your collection'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 w-8 h-8 flex items-center justify-center rounded-xl transition-all"
          >
            <FaTimes />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Book Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Atomic Habits"
              required
              className="input-focus w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 transition-all"
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Author Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="author"
              value={form.author}
              onChange={handleChange}
              placeholder="e.g. James Clear"
              required
              className="input-focus w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 transition-all"
            />
          </div>

          {/* Genre Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Genre
              </label>
              <select
                name="genre"
                value={form.genre}
                onChange={handleChange}
                className="input-focus w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 transition-all"
              >
                {PREDEFINED_GENRES.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
                <option value="Other">Other / Custom</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Reading Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="input-focus w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 transition-all"
              >
                <option value="Read">Read</option>
                <option value="Unread">Unread</option>
              </select>
            </div>
          </div>

          {/* Custom Genre Field (if Other selected) */}
          {showCustomGenre && (
            <div className="animate-in slide-in-from-top-2 duration-200">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Specify Custom Genre <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="customGenre"
                value={form.customGenre}
                onChange={handleChange}
                placeholder="e.g. History, Thriller"
                required={showCustomGenre}
                className="input-focus w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 transition-all"
              />
            </div>
          )}

          {/* Rating (Visual Stars) */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Rating
            </label>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-4 py-2.5 rounded-xl w-fit">
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handleRatingSelect(val)}
                    className="text-xl focus:outline-none transition-transform active:scale-95"
                  >
                    <FaStar
                      className={`${
                        val <= form.rating ? 'text-amber-400' : 'text-gray-200'
                      } hover:text-amber-300 transition-colors`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-xs text-gray-400 font-semibold ml-2 font-mono">
                {form.rating} out of 5
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Description / Notes
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Write a brief overview of the book, favorite quotes, or thoughts..."
              rows={4}
              className="input-focus w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 resize-none transition-all"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl text-sm font-semibold text-gray-500 border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-xl text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 transition-all shadow-md shadow-violet-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : isEditing ? 'Update Book' : 'Add Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
