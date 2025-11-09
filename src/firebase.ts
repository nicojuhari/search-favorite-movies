// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {  
  collection, 
  getFirestore, 
  doc, 
  getDoc, 
  updateDoc, 
  setDoc, 
  increment, 
  getDocs,
  query,
  where
} from "firebase/firestore";
import type { Movie, TrendingMovie } from "../types";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpO52-feXsrBkIkIQKyHaR43WHshsIhFM",
  authDomain: "search-favorite-movies.firebaseapp.com",
  projectId: "search-favorite-movies",
  storageBucket: "search-favorite-movies.firebasestorage.app",
  messagingSenderId: "791875108493",
  appId: "1:791875108493:web:5f033872d86befe6d8ecc4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export const addTrendingMovie = async (movie: Movie) => {
  try {
    // get a document from DB where movie ID matches
        const moviesCollection = collection(db, 'trending-movies');
        const querySnapshot = await getDocs(query(moviesCollection, where('movie_id', '==', movie.id)));
        
        let movieRef;
        if (!querySnapshot.empty) {
        // Use existing document
        movieRef = querySnapshot.docs[0].ref;
        } else {
        // Create new document reference
        movieRef = doc(moviesCollection);
        }
    const movieSnap = await getDoc(movieRef);

    //if so, update count field
    if (movieSnap.exists()) {
      await updateDoc(movieRef, {
        count: increment(1)
      });
    } else {
      //else, add new document
      await setDoc(movieRef, {
        movie_id: movie.id,
        poster_url: movie.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` : '/default-poster.webp',
        title: movie.title,
        count: 1,
      });
    }

  } catch (error) {
    console.error('Error adding movie:', error);
  }
};

export const getTrendingMovies = async (): Promise<TrendingMovie[]> => {
  try {
    const moviesCollection = collection(db, 'trending-movies');
    const querySnapshot = await getDocs(moviesCollection);
    const trendingMovies = querySnapshot.docs
      .map(doc => doc.data() as TrendingMovie)
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Get top 10 trending movies
    return trendingMovies;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};