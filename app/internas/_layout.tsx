import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

export default function Layout() {
    return (
        <Tabs
            screenOptions={{
                // Cor do cabeçalho
                headerStyle: { backgroundColor: "#FFF0E1" }, // Fundo pastel
                // Cor da tab bar
                tabBarStyle: { backgroundColor: "#070A52" },
                // Centraliza o título no cabeçalho
                headerTitleAlign: 'center',
                // Cor do texto do cabeçalho
                headerTintColor: '#FFF',
                // Define a cor do menu ativo na tab bar
                tabBarActiveTintColor: "#FFD700", // Ouro
                // Cor do ícone inativo na tab bar
                tabBarInactiveTintColor: "#AFAFAF" // Cinza claro
            }}
        >
            <Tabs.Screen
                name="tasks"
                options={{
                    headerTitle: "Tarefas",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="check-circle-outline"
                            color={color}
                            size={32}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="user"
                options={{
                    headerTitle: "Dados do Usuário",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="account"
                            color={color}
                            size={32}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="about"
                options={{
                    headerTitle: "Sobre o aplicativo",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="information-outline"
                            color={color}
                            size={32}
                        />
                    )
                }}
            />
        </Tabs>
    );
}