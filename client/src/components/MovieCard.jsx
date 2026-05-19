function MovieCard({ movie, onToggle, onDelete }) {
    return (
        <div className="movie-card">

      {/* Show Cloudinary poster or a placeholder */}
            {movie.posterUrl ? (
                <img src={movie.posterUrl} alt={movie.title} className="poster" />
            ) : (
                <div className="poster-placeholder">🎬</div>
            )}

            <div className="card-body">
                <h3>{movie.title}</h3>

                <div className="meta">
                    <span className="genre">{movie.genre}</span>
                    <span>{movie.releaseYear}</span>
                </div>

                <div className="rating">⭐ {movie.rating}/10</div>

                <div className="actions">
                    <button
                        className={`btn-watch ${movie.watched ? 'watched' : ''}`}
                        onClick={() => onToggle(movie._id, !movie.watched)}
                    >
                        {movie.watched ? '✅ Watched' : '⏳ Mark Watched'}
                    </button>

                    <button
                        className="btn-delete"
                        onClick={() => onDelete(movie._id)}
                    >
                        🗑️
                    </button>
                </div>
            </div>
        </div>
    );
}
export default MovieCard;