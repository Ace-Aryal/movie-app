import { View, ScrollView, Image, Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useFetch } from "@/services/useFetch";
import { fetchMovieDetails } from "@/services/api";
import { Movie } from "../(tabs)";
import { icons } from "@/constants/icons";
import { Ionicons } from "@expo/vector-icons";

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams();
  const {
    data: movie,
    isLoading,
    error,
  } = useFetch<Movie>(() => fetchMovieDetails(id as string));
  useEffect(() => {
    console.log(movie, "movie");
  }, [movie]);
  const router = useRouter();
  return (
    <View className="bg-primary flex-1">
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80,
        }}
      >
        {isLoading ? (
          <Text className="text-white">Loading...</Text>
        ) : error || !movie ? (
          <Text className="text-white">Error</Text>
        ) : (
          <>
            <View>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                }}
                className="flex-1 z-0  w-full h-[550px]"
                resizeMode="stretch"
              />
            </View>
            <View className="flex flex-col items-start justify-center mt-3 px-5">
              <Text className="text-white font-bold text-xl">
                {movie?.title}
              </Text>
              <View className="flex flex-row items-center gap-x-1 mt-2">
                <Text className="text-light-200 text-sm">
                  {movie?.release_date?.split("-")[0]}
                </Text>
                <Text className="text-light-200 text-sm">
                  {movie?.runtime}m
                </Text>
              </View>
              <View className="flex-row  items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
                <Image
                  source={icons.star}
                  className="w-4 h-4"
                  resizeMode="contain"
                />
                <Text className="text-white text-sm font-bold">
                  {Math.round(movie?.vote_average || 0)}/10
                </Text>
                <Text className="text-light-200 text-sm">
                  ({movie?.vote_count})
                </Text>
              </View>
              <View className="mt-6">
                <Text className="text-base font-semibold text-gray-500">
                  Overview
                </Text>
                <Text className="mt-2 leading-1.6 font-bold text-violet-200">
                  {movie?.overview}
                </Text>
              </View>
              <View className="mt-6">
                <Text className="text-base font-semibold text-gray-500">
                  Genres
                </Text>
                <Text className="mt-2 leading-1.6 font-bold text-violet-200">
                  {movie?.genres?.map((genre) => genre.name).join(" - ")}
                </Text>
              </View>
              <View className="flex flex-row mt-6">
                <View className="flex-1">
                  <Text className="text-base font-semibold text-gray-500">
                    Budget
                  </Text>
                  <Text className="mt-2 leading-1.6 font-bold text-violet-200">
                    {(movie?.budget / 1000000).toFixed(0)} million
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold text-gray-500">
                    Revenue
                  </Text>
                  <Text className="mt-2 leading-1.6 font-bold text-violet-200">
                    {(movie?.revenue / 1000000).toFixed(0)} million
                  </Text>
                </View>
              </View>
              <View className="mt-6">
                <Text className="text-base font-semibold text-gray-500">
                  Production Companies
                </Text>
                <Text className="mt-2 leading-1.6 font-bold text-violet-200">
                  {movie?.production_companies
                    ?.map((company) => company.name)
                    .join(", ")}
                </Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>
      <View className="absolute bottom-2 w-full px-10">
        <Pressable
          onPress={() => router.back()}
          className=" flex-row items-center justify-center w-full rounded-xl bg-accent py-4  gap-x-1 mt-3 px-5"
        >
          <Ionicons name="arrow-back" size={18} color="white" />
          <Text className="text-white text-lg"> Go Back</Text>
        </Pressable>
      </View>
    </View>
  );
}
