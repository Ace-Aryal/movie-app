import SearchBar from "@/components/search-bar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { useFetch } from "@/services/useFetch";
import { fetchMovies, TMBD_CONFIG } from "@/services/api";
import { Ionicons } from "@expo/vector-icons";
export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string; // ISO date string
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export default function Index() {
  const router = useRouter();
  const {
    data: movies,
    error,
    isLoading,
  } = useFetch<null | Movie[]>(() => fetchMovies({ query: "" }));

  return (
    <View
      style={{
        flex: 1,
      }}
      className="bg-primary"
    >
      <Image source={images.bg} className="flex-1 z-0 absolute " />

      <View className="flex-1 px-5 w-full">
        <Image source={icons.logo} className="mx-auto mt-12 w-12 h-10 " />
        <View className="mt-10">
          <SearchBar
            onPress={() => router.push("/search")}
            placeholder="Search movie..."
          />
        </View>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={"white"}
            className="mt-10 self-center"
          />
        ) : error ? (
          <Text className="text-gray-50">{error.message} </Text>
        ) : (
          <>
            <Text className="text-gray-50 mt-2 text-lg">Latest Movies</Text>
            <FlatList
              data={movies}
              keyExtractor={(item) => String(item.id)}
              className="mt-2 pb-32"
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 20,
                marginTop: 10,
                marginRight: 10,
              }}
              renderItem={({ item }) => {
                console.log(item);
                return (
                  <View className="flex-1 mb-8">
                    <Image
                      id="image"
                      className="rounded-lg"
                      style={{ width: "100%", aspectRatio: 3 / 4 }}
                      source={{
                        uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                      }}
                    />
                    <Text className="text-white font-semibold mt-1">
                      {item.title}
                    </Text>
                    <View className="flex flex-1 flex-row my-1 gap-2">
                      <Ionicons name="star" size={12} color={"yellow"} />
                      <Text className="text-white">
                        {Math.floor(item.vote_average / 2)}
                      </Text>
                    </View>
                    <View className="flex flex-row justify-between">
                      <Text className="text-gray-400">
                        {item.release_date.slice(0, 4)}
                      </Text>
                      <Text className="text-gray-400">
                        {item.original_language.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          </>
        )}
      </View>
    </View>
  );
}
