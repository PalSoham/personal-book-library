import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import BookCard from '../components/BookCard';
import BookForm from '../components/BookForm';
import { FaPlus, FaBook, FaCheckCircle, FaInbox } from 'react-icons/fa';

const DEFAULT_BOOKS = [
  {
    id: 'book-1',
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Self Help',
    rating: 5,
    status: 'Read',
    description: 'A practical guide to building good habits and breaking bad ones. It offers actionable strategies to make minor adjustments yield remarkable results.',
  },
  {
    id: 'book-2',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fiction',
    rating: 5,
    status: 'Read',
    description: 'A classic fantasy novel following the quest of Bilbo Baggins to win a share of the treasure guarded by Smaug the dragon.',
  },
  {
    id: 'book-3',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    genre: 'Science',
    rating: 4,
    status: 'Unread',
    description: 'An exploration of the history of human evolution, tracing our species from the Stone Age up to the political and technological revolutions of the 21st century.',
  },
  {
    id: 'book-4',
    title: 'Elon Musk',
    author: 'Walter Isaacson',
    genre: 'Biography',
    rating: 4,
    status: 'Read',
    description: 'An intimate, deep-dive biography of the controversial, ambitious, and visionary innovator Elon Musk, written by the author of Steve Jobs.',
  },
  {
    id: 'book-5',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    genre: 'Technology',
    rating: 5,
    status: 'Read',
    description: 'A handbook of agile software craftsmanship that teaches developers how to write clean, maintainable, and highly readable code with real-world refactoring examples.',
  },
];

export default function Home() {
  const [search, setSearch] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [editingBook, setEditingBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch all books from Express server on mount
  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/books');
      if (!response.ok) {
        throw new Error('Failed to fetch books from server');
      }
      const data = await response.json();
      setBooks(data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Server connection error. Please make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Real-time Search and Filtering (Title or Author)
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  // Stats calculation
  const totalCount = books.length;
  const readCount = books.filter((b) => b.status === 'Read').length;
  const unreadCount = totalCount - readCount;

  const handleOpenCreate = () => {
    setEditingBook(null);
    setShowModal(true);
  };

  const handleOpenEdit = (book) => {
    setEditingBook(book);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to remove this book from your library?')) return;
    try {
      const response = await fetch(`http://localhost:5000/api/books/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete the book');
      }
      setBooks((prevBooks) => prevBooks.filter((book) => (book._id || book.id) !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSave = async (formData) => {
    setSaving(true);
    try {
      let response;
      if (editingBook) {
        // Edit flow
        response = await fetch(`http://localhost:5000/api/books/${editingBook._id || editingBook.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } else {
        // Add flow
        response = await fetch('http://localhost:5000/api/books', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to save the book details');
      }

      if (editingBook) {
        setBooks((prevBooks) =>
          prevBooks.map((book) => ((book._id || book.id) === (editingBook._id || editingBook.id) ? data : book))
        );
      } else {
        setBooks((prevBooks) => [data, ...prevBooks]);
      }
      
      setShowModal(false);
      setEditingBook(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen pb-12" style={{ backgroundColor: 'var(--bg-main)' }}>
      {/* Navigation Bar */}
      <Navbar search={search} onSearchChange={setSearch} totalBooks={filteredBooks.length} />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Header Statistics Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-xl font-bold text-gray-800 tracking-tight">Library Dashboard</h1>
            <p className="text-sm text-gray-400">
              {search ? `Found ${filteredBooks.length} search results` : 'Manage and track your reading journey'}
            </p>
          </div>

          {/* Stat Pills */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-violet-50 text-violet-700 border border-violet-100 rounded-xl">
              <FaBook className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold">{totalCount} Total Books</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-xl">
              <FaCheckCircle className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold">{readCount} Read</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-600 border border-amber-100 rounded-xl">
              <FaInbox className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold">{unreadCount} Unread</span>
            </div>

            <button
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-semibold transition-all shadow-md shadow-violet-100 ml-0 md:ml-4 active:scale-95 cursor-pointer"
            >
              <FaPlus className="w-3 h-3" />
              Add Book
            </button>
          </div>
        </div>

        {/* Library Inventory Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-12 h-12 rounded-full border-4 border-violet-100 border-t-violet-600 animate-spin mb-4" />
            <p className="text-gray-400 text-sm font-semibold tracking-wide">Syncing library shelf...</p>
          </div>
        ) : error ? (
          <div className="bg-rose-50 border border-rose-100 rounded-3xl p-8 text-center max-w-md mx-auto shadow-sm animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-2xl bg-pastel-rose text-rose-600 flex items-center justify-center mx-auto text-2xl mb-4">⚠️</div>
            <h3 className="font-bold text-gray-800 text-base mb-2">Connection Problem</h3>
            <p className="text-gray-500 text-xs leading-relaxed mb-6">{error}</p>
            <button
              onClick={fetchBooks}
              className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-violet-100 cursor-pointer"
            >
              Retry Connection
            </button>
          </div>
        ) : filteredBooks.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-20 px-6 flex flex-col items-center justify-center text-center max-w-xl mx-auto">
            <div className="w-20 h-20 rounded-3xl bg-pastel-lavender flex items-center justify-center mb-6 text-violet-600 shadow-inner">
              <FaBook className="text-3xl" />
            </div>
            <h3 className="font-bold text-gray-800 text-lg mb-2">
              {search ? 'No Match Found' : 'Your Library is Empty'}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-8">
              {search
                ? `We couldn't find any books matching "${search}". Try checking for spelling errors or searching a different term.`
                : 'Start tracking your personal reading collection. Add details, status, ratings, and thoughts for your favorite books.'}
            </p>
            {search ? (
              <button
                onClick={() => setSearch('')}
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl transition-all"
              >
                Clear Search Filter
              </button>
            ) : (
              <button
                onClick={handleOpenCreate}
                className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-violet-100"
              >
                + Add Your First Book
              </button>
            )}
          </div>
        ) : (
          /* Book Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
            {filteredBooks.map((book) => (
              <BookCard
                key={book._id || book.id}
                book={book}
                onEdit={handleOpenEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      {/* Book Form Modal */}
      {showModal && (
        <BookForm
          book={editingBook}
          onClose={() => {
            setShowModal(false);
            setEditingBook(null);
          }}
          onSave={handleSave}
          loading={saving}
        />
      )}
    </div>
  );
}
