import SearchBar from "@/components/search-bar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Image, ScrollView, View } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
      }}
      className="bg-primary"
    >
      <Image source={images.bg} className="flex-1 z-0 absolute" />
      <ScrollView
        className="flex-1 px-5 w-full"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >
        <Image source={icons.logo} className="mx-auto mt-12 w-12 h-10 " />
        <View className="mt-10">
          <SearchBar
            onPress={() => router.push("/search")}
            placeholder="Search movie..."
          />
        </View>
      </ScrollView>
    </View>
  );
}
