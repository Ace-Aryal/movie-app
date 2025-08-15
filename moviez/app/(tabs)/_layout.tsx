import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ImageBackground, Text } from "react-native";
import { images } from "@/constants/images";
import { IconProps } from "@expo/vector-icons/build/createIconSet";

function TabComponent ({tabName,iconName}:{
  tabName:string,
  iconName:string
}){
  return   (<ImageBackground
              className="flex mt-3 flex-row justify-center items-center gap-1 min-w-[112px] min-h-12 rounded-full overflow-hidden "
              source={images.highlight}
            >
              <Ionicons size={18} name={iconName} />
              <Text className="text-lg">{tabName}</Text>
            </ImageBackground>)
}
export default function TabsLoayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarShowLabel: false,

          tabBarIcon: ({ focused }) => (
          
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{ headerShown: false, title: "Search" }}
      />
      <Tabs.Screen
        name="saved"
        options={{ headerShown: false, title: "Saved" }}
      />
      <Tabs.Screen
        name="profile"
        options={{ headerShown: false, title: "Profile" }}
      />
    </Tabs>
  );
}
