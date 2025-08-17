import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ImageBackground, Pressable, Text, View } from "react-native";
import { images } from "@/constants/images";

function TabComponent({
  focused,
  tabName,
  icon,
}: {
  focused: boolean;
  tabName: string;
  icon: React.ReactNode;
}) {
  if (!focused) {
    return (
      <View className="flex flex-row items-center  mt-3 gap-1">{icon}</View>
    );
  }
  return (
    <ImageBackground
      className={`flex  mt-3 flex-row justify-center items-center gap-1 min-w-[80px] min-h-12 rounded-full overflow-hidden `}
      source={images.highlight}
    >
      {icon}
      <Text className="text-lg">{tabName}</Text>
    </ImageBackground>
  );
}
export default function TabsLoayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarButton: ({ onPress, style, children }) => (
          <Pressable
            onPress={onPress}
            style={style}
            android_ripple={{ color: "transparent" }} // removes ripple
          >
            {children}
          </Pressable>
        ),
        sceneStyle: {
          backgroundColor: "black",
        },
        tabBarStyle: {
          marginHorizontal: 10,
          borderRadius: 50,
          backgroundColor: "white",
          marginBottom: 10,
          height: 50,
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",

          tabBarIcon: ({ focused }) => (
            <TabComponent
              focused={focused}
              tabName="Home"
              icon={
                <Ionicons
                  name="home"
                  size={20}
                  color={focused ? "black" : "black"}
                />
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <TabComponent
              focused={focused}
              icon={
                <Ionicons
                  name="search"
                  size={20}
                  color={focused ? "black" : "black"}
                />
              }
              tabName="Search"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          headerShown: false,
          title: "Saved",
          tabBarIcon: ({ focused }) => (
            <TabComponent
              focused={focused}
              icon={
                <Ionicons
                  name="bookmark"
                  size={20}
                  color={focused ? "black" : "black"}
                />
              }
              tabName="Saved"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabComponent
              focused={focused}
              icon={
                <Ionicons
                  size={20}
                  name="person"
                  color={focused ? "black" : "black"}
                />
              }
              tabName="Profile"
            />
          ),
        }}
      />
    </Tabs>
  );
}
