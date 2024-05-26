import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { View, Linking } from "react-native";
import Header from "../components/Header";
import MovieList from "../components/MovieList";
import LoadingIndicator from "../components/LoadingIndicator";
import { TMDB_API_KEY } from "../../env";

type Movie = {
  rank: number;
  title: string;
  description: string;
  image: string;
  big_image: string;
  genre: string[];
  thumbnail: string;
  rating: string;
  id: string;
  year: number;
  imdbid: string;
  imdb_link: string;
};

const HomeScreen: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredMoviesed, setFilteredMoviesed] = useState<Movie[]>([]);

  const fetchMovies = useCallback(
    async (
      year: number | null,
      direction: "next" | "previous" | "initial",
      search: string = ""
    ) => {
      if (!year && direction !== "initial") return;

      setIsFetchingMore(true);

      const options = {
        method: "GET",
        url: "https://imdb-top-100-movies.p.rapidapi.com/",
        headers: {
          "X-RapidAPI-Key": TMDB_API_KEY,
          "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        const fetchedMovies = response.data;

        const filtered = fetchedMovies.filter((movie: Movie) =>
          movie.title.toLowerCase().includes(search.toLowerCase())
        );

        if (direction === "initial") {
          setMovies(fetchedMovies);
          setFilteredMoviesed(filtered);
        } else if (direction === "next") {
          setMovies((prevMovies) => [
            ...prevMovies,
            ...fetchedMovies.filter((movie: Movie) => movie.year > year!),
          ]);
        } else if (direction === "previous") {
          setMovies((prevMovies) => [
            ...fetchedMovies.filter((movie: Movie) => movie.year < year!),
            ...prevMovies,
          ]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      } finally {
        setIsFetchingMore(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchMovies(null, "initial", searchQuery);
  }, [fetchMovies, searchQuery]);

  const getGenres = () => {
    const allGenres = movies.flatMap((movie) => movie.genre);
    return Array.from(new Set(allGenres));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = movies.filter((movie: Movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMoviesed(filtered);
  };

  const filteredMovies = selectedGenre
    ? movies.filter((movie) => movie.genre.includes(selectedGenre))
    : movies;
  const sortedMovies = filteredMovies.sort(
    (a, b) => parseFloat(b.rating) - parseFloat(a.rating)
  );

  const groupedMovies = sortedMovies.reduce(
    (groups: Record<number, Movie[]>, movie) => {
      const year = movie.year;
      if (!groups[year]) {
        groups[year] = [];
      }
      groups[year].push(movie);
      return groups;
    },
    {}
  );

  const serachedMovies = filteredMoviesed.reduce(
    (groups: Record<number, Movie[]>, movie) => {
      const year = movie.year;
      if (!groups[year]) {
        groups[year] = [];
      }
      groups[year].push(movie);
      return groups;
    },
    {}
  );

  const handleMoviePress = (imdbLink: string) => {
    Linking.openURL(imdbLink).catch((err) =>
      console.error("Failed to open IMDb page:", err)
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#28282B" }}>
      <Header
        genres={getGenres()}
        onTabPress={setSelectedGenre}
        selectedTab={selectedGenre}
        onSearch={handleSearch}
      />
      {loading ? (
        <LoadingIndicator />
      ) : (
        <MovieList
          searchQuery={searchQuery}
          searchedMovies={serachedMovies}
          groupedMovies={groupedMovies}
          isFetchingMore={isFetchingMore}
          handleMoviePress={handleMoviePress}
        />
      )}
    </View>
  );
};

export default HomeScreen;
