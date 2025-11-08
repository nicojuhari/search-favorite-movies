export type Movie = {
    id: number;
    title: string;
    backdrop_path: string;
    poster_path: string;
    vote_average: number;
    original_language: string;
    release_date: string;
    overview: string;
};

export type TrendingMovie = {
    movie_id: string;
    title: string;
    poster_url: string;
    count: number;
};