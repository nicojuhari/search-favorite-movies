import { useEffect, useState } from 'react';
import {getTrendingMovies} from '../firebase';
import type { TrendingMovie } from '../../types';
const TrendingMovies = () => {

    const [trendingMovies, setTrendingMovies] = useState<TrendingMovie[]>([]);

    useEffect(()=>{
        const fetchTrending = async () => {
            const movies = await getTrendingMovies();
            setTrendingMovies(movies);
        };
        fetchTrending();
    }, [])

    return ( 
        <div>
            <h2 className="text-xl mb-2 mt-8">Trending Movies</h2>
            {trendingMovies.length > 0 && ( 
            <ul className="flex overflow-x-auto gap-6">
                {trendingMovies.map((movie: TrendingMovie, index: number) => (
                    <li key={movie.movie_id} className="w-36 shrink-0">
                        <img src={movie.poster_url} alt={movie.title} className='w-36 object-cover aspect-video rounded-md'/>
                        <h3 className="mt-1 flex items-center gap-2 text-sm font-medium">
                            <span className="bg-orange-300 text-gray-900 rounded-full h-4 w-4 flex shrink-0 justify-center items-center">{index + 1}</span> 
                            <span className="line-clamp-1">{movie.title}</span>
                        </h3>
                    </li>
                ))}
            </ul>
            )}
            { trendingMovies.length === 0 && (
                <p className="text-gray-500 py-10 text-center bg-gray-50/5 rounded-md">No trending movies available.</p>
            )}
        </div>
    );
}
 
export default TrendingMovies;