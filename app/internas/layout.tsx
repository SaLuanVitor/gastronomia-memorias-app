import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import RecipesScreen from "../screens/RecipesScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import CategoriesScreen from "../screens/CategoriesScreen";

export default function Layout() {
    return (
        <Tabs
            screenOptions={{
                headerStyle: { backgroundColor: "#FFF0E1" },
                tabBarStyle: { backgroundColor: "#070A52" },
                headerTitleAlign: 'center',
                headerTintColor: '#FFF',
                tabBarActiveTintColor: "#FFD700",
                tabBarInactiveTintColor: "#AFAFAF"
            }}
        >
            <Tabs.Screen
                name="home"
                component={HomeScreen}
                options={{
                    headerTitle: "Menu Principal",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="home-outline"
                            color={color}
                            size={32}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="recipes"
                component={RecipesScreen}
                options={{
                    headerTitle: "Receitas",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="chef-hat"
                            color={color}
                            size={32}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="favorites"
                component={FavoritesScreen}
                options={{
                    headerTitle: "Favoritos",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="heart-outline"
                            color={color}
                            size={32}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="categories"
                component={CategoriesScreen}
                options={{
                    headerTitle: "Categorias",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="folder-outline"
                            color={color}
                            size={32}
                        />
                    )
                }}
            />
        </Tabs>
    );
}
