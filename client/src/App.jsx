import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieForm from './components/MovieForm';
import MovieGrid from './components/MovieGrid';
import './App.css';

const API = import.meta.env.VITE_API_URL || '/api/movies';

function App() {
  const [movies, setMovies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all' | 'watched' | 'unwatched'

  
  const fetchMovies = async () => {
    const res = await axios.get(API);
    setMovies(res.data);
  };
  
  useEffect(() => { fetchMovies(); }, []);
  
  const addMovie = async (movieData) => {
    const res = await axios.post(API, movieData);
    setMovies([res.data, ...movies]);
  };

  const toggleWatched = async (id, watched) => {
    const res = await axios.put(`${API}/${id}`, { watched });
    setMovies(movies.map((m) => (m._id === id ? res.data : m)));
  };

  const deleteMovie = async (id) => {
    await axios.delete(`${API}/${id}`); // also deletes from Cloudinary
    setMovies(movies.filter((m) => m._id !== id));
  };

  // Filter movies based on selected tab
  const filtered = movies.filter((m) => {
    if (filter === 'watched') return m.watched === true;
    if (filter === 'unwatched') return m.watched === false;
    return true;
  });

  return (
    <div className="app">

      <header>
        <h1>🎬 My Movie Watchlist</h1>
        <button onClick={() => setShowForm(true)}>+ Add Movie</button>
      </header>

      <div className="filters">
        {['all', 'watched', 'unwatched'].map((f) => (
          <button key={f}
            className={filter === f ? 'active' : ''}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'All' : f === 'watched' ? '✅ Watched' : '⏳ Unwatched'}
          </button>
        ))}
      </div>

      <MovieGrid
        movies={filtered}
        onToggle={toggleWatched}
        onDelete={deleteMovie}
      />

      {showForm && (
        <MovieForm
          onAdd={addMovie}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default App;