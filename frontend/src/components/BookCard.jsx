import { FaStar, FaEdit, FaTrash, FaCheckCircle, FaBookOpen } from 'react-icons/fa';

const GENRE_COLORS = {
  'Self Help': 'chip-lavender',
  'Fiction': 'chip-rose',
  'Science': 'chip-sky',
  'Biography': 'chip-peach',
  'Technology': 'chip-mint',
};

export default function BookCard({ book, onEdit, onDelete }) {
  const genreClass = GENRE_COLORS[book.genre] || 'chip-cream';
  
  // Render Rating Stars
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`w-3.5 h-3.5 ${
            i <= rating ? 'text-amber-400' : 'text-gray-200'
          }`}
        />
      );
    }
    return <div className="flex items-center gap-0.5">{stars}</div>;
  };

  return (
    <div className="card-hover bg-white rounded-2xl p-5 flex flex-col justify-between border border-gray-100 shadow-sm relative overflow-hidden group">
      {/* Visual Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-400 via-indigo-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div>
        {/* Top Header: Genre & Status */}
        <div className="flex items-center justify-between mb-4">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${genreClass}`}>
            {book.genre}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
              book.status === 'Read'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                : 'bg-amber-50 text-amber-700 border-amber-100'
            }`}
          >
            {book.status === 'Read' ? (
              <FaCheckCircle className="w-3 h-3 text-emerald-500" />
            ) : (
              <FaBookOpen className="w-3 h-3 text-amber-500" />
            )}
            {book.status}
          </span>
        </div>

        {/* Title & Author */}
        <div className="mb-2">
          <h3 className="font-bold text-gray-800 text-base leading-tight mb-1 group-hover:text-violet-600 transition-colors line-clamp-1">
            {book.title}
          </h3>
          <p className="text-gray-500 text-xs font-medium italic">by {book.author}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          {renderStars(book.rating)}
          <span className="text-[11px] font-semibold text-gray-400 font-mono">({book.rating}/5)</span>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-xs leading-relaxed mb-5 line-clamp-3 min-h-[4.5rem]">
          {book.description || 'No description provided.'}
        </p>
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between pt-3.5 border-t border-gray-50">
        <span className="text-[10px] text-gray-400 font-mono">
          ID: {(book.id || book._id) ? (book.id || book._id).substring(0, 8) : ''}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(book)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-violet-50 text-violet-600 hover:bg-violet-100 transition-colors text-xs font-semibold"
          >
            <FaEdit className="w-3 h-3" />
            Edit
          </button>
          <button
            onClick={() => onDelete(book.id || book._id)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors text-xs font-semibold"
          >
            <FaTrash className="w-3 h-3" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
