import { View, Image, TextInput } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

const SearchBar = ({
  placeholder = "Search...",
  onPress,
}: {
  placeholder?: string;
  onPress: () => void;
}) => {
  return (
    <View className="flex flex-row items-center bg-dark-200 rounded-full px-5 py-4 gap-4">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor={"#ab8bff"}
      />
      <TextInput
        onPress={onPress}
        placeholderTextColor={"#a8b5db"}
        placeholder={placeholder}
        className="h-10 flex-1 text-gray-50 text-base"
      />
    </View>
  );
};

export default SearchBar;
