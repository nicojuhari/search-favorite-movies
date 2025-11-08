import { type Movie } from "../../types";

const MovieCard = ({ movie: { id, title, original_language, release_date, poster_path, vote_average } }: { movie: Movie }) => {
    return (
        <div key={id} className="p-4 bg-gray-50/5 border border-gray-50/10 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
            <img src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : '/default-poster.webp'} alt={title} className="rounded"/>
            <h3 className="font-medium mt-2 line-clamp-1">{title}</h3>
            <div className="mt-2 flex items-center gap-1 text-sm">
                <img src="/star.svg" alt="Star Icon" className="inline-block w-4 h-4"/>
                <p className="font-semibold">{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
                <span className="text-gray-600">·</span>
                <p className="capitalize text-gray-300">{original_language}</p>
                <span className="text-gray-600">·</span>
                <p className="text-gray-300">{release_date ? release_date.split("-")[0] : "N/A"}</p>
            </div>
        </div>
    );
}

export default MovieCard;