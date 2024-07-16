import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import './Dashboard.css';

const Dashboard = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://192.168.88.28:3000/api/get-alltours'); 
        const result = await response.json();
        const fetchedMovies = result.data.tours.map(tour => ({
          title: tour.nameOfTheMovie,
          location: tour.location[0].address,
          description: tour.location[0].description,
        }));
        setMovies(fetchedMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="dashboard">
      <div className="header">
        <h1>Movie Filming Locations</h1>
        <div className="auth-buttons">
          <button className="btn" onClick={() => navigate('/login')}>Login</button>
          <button className="btn register" onClick={() => navigate('/register')}>Register</button>
        </div>
      </div>
      <div className="movie-cards">
        {movies.map((movie, index) => (
          <div key={index} className="movie-card">
            <h2>{movie.title}</h2>
            <p className="movie-location"><strong>Location:</strong> {movie.location}</p>
            <p className="movie-description">{movie.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
