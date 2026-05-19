import MovieCard from './MovieCard';

function MovieGrid({ movies, onToggle, onDelete }) {
    if (movies.length === 0) {
        return <p className="empty">No movies yet. Add your first! 🎬</p>;
    }
    return (
        <div className="movie-grid">
            {movies.map((movie) => (
                <MovieCard
                    key={movie._id}
                    movie={movie}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}
export default MovieGrid;