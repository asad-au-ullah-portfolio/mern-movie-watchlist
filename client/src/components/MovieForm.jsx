import { useState } from 'react';
import axios from 'axios';

function MovieForm({ onAdd, onClose }) {
    const [formData, setFormData] = useState({
        title: '', genre: 'Action', releaseYear: '',
        rating: 5, watched: false, description: '',
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [uploading, setUploading] = useState(false);

    // Called when user selects an image file
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file)); // show local preview
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        let posterUrl = '';
        let posterPublicId = '';

        // Step 1: If user selected an image, upload to Cloudinary first
        if (imageFile) {
            const data = new FormData();
            data.append('poster', imageFile);  // 'poster' must match upload route

            const uploadRes = await axios.post('/api/upload', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            posterUrl = uploadRes.data.url;
            posterPublicId = uploadRes.data.publicId;
        }

        // Step 2: Save the movie with the Cloudinary URL
        await onAdd({ ...formData, posterUrl, posterPublicId });
        setUploading(false);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>🎬 Add New Movie</h2>
                <button className="close-btn" onClick={onClose}>✕</button>

                <form onSubmit={handleSubmit}>

                    <input name="title" value={formData.title}
                        onChange={handleChange} placeholder="Movie Title" required />

                    <select name="genre" value={formData.genre} onChange={handleChange}>
                        {['Action', 'Drama', 'Sci-Fi', 'Comedy', 'Horror', 'Romance', 'Thriller'].map(g => (
                            <option key={g} value={g}>{g}</option>
                        ))}
                    </select>

                    <input name="releaseYear" type="number"
                        value={formData.releaseYear} onChange={handleChange} placeholder="Year" />

                    <input name="rating" type="number" min="1" max="10"
                        value={formData.rating} onChange={handleChange} placeholder="Rating 1-10" />

          {/* Poster Upload Input */}
                    <div className="upload-area">
                        <label>🖼️ Movie Poster (uploaded to Cloudinary)</label>
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                        {imagePreview && (
                            <img src={imagePreview} alt="Preview" className="img-preview" />
                        )}
                    </div>

                    <label>
                        <input type="checkbox" name="watched"
                            checked={formData.watched} onChange={handleChange} />
                        Already watched
                    </label>

                    <button type="submit" disabled={uploading}>
                        {uploading ? '☁️ Uploading...' : '🎬 Save Movie'}
                    </button>

                </form>
            </div>
        </div>
    );
}
export default MovieForm;