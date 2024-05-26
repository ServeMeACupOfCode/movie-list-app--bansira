import React from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";

interface Movie {
  id: string;
  title: string;
  description: string;
  image: string;
  imdb_link: string;
  year: number;
}

interface MovieListProps {
  searchQuery: string;
  searchedMovies: Record<number, Movie[]>;
  groupedMovies: Record<number, Movie[]>;
  isFetchingMore: boolean;
  handleMoviePress: (imdbLink: string) => void;
}

const MovieList: React.FC<MovieListProps> = ({
  searchQuery,
  searchedMovies,
  groupedMovies,
  isFetchingMore,
  handleMoviePress,
}) => {
  const movieData = searchQuery.length > 0 ? searchedMovies : groupedMovies;

  return (
    <ScrollView
      contentContainerStyle={{ padding: 20 }}
      scrollEventThrottle={16}
    >
      {Object.entries(movieData).map(([year, movies], index) => (
        <View key={`year-${year}-${index}`}>
          <Text style={{ color: "white", fontSize: 24, marginVertical: 10 }}>
            {year}
          </Text>
          {movies.map((movie, movieIndex) => (
            <TouchableOpacity
              key={`${year}-${movie.id}-${movieIndex}`}
              onPress={() => handleMoviePress(movie.imdb_link)}
              style={{ marginBottom: 20 }}
            >
              <Image
                source={{ uri: movie.image }}
                style={{ width: "100%", height: 200, borderRadius: 10 }}
              />
              <Text style={{ color: "white", fontSize: 18, marginTop: 10 }}>
                {movie.title}
              </Text>
              <Text style={{ color: "grey", marginTop: 5 }}>
                {movie.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
      {isFetchingMore && <ActivityIndicator size="large" color="#FF4433" />}
    </ScrollView>
  );
};

export default MovieList;
