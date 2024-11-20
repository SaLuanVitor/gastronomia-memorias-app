import { Tabs } from "expo-router";
import { RecipesProvider } from "../context/RecipesContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Layout() {
    return (
        <RecipesProvider>
            <Tabs
            
                screenOptions={{
                    tabBarStyle: { backgroundColor: "#FFA07A" }, // Fundo das tabs
                    tabBarActiveTintColor: "#FFFFFF", // Cor do ícone ativo
                    tabBarInactiveTintColor: "#FFDAB9", // Cor do ícone inativo
                    headerShown: false, // Desativa o cabeçalho
                    tabBarLabelStyle: {
                        fontSize: 12, // Reduz tamanho da fonte
                        fontWeight: "bold", // Deixa em negrito para melhor leitura
                    },
                }}
            >
                {/* Aba Minhas Receitas */}
                <Tabs.Screen
                    name="screens/Receitas"
                    options={{
                        title: "Minhas Receitas",
                        tabBarIcon: ({ focused, color, size }) => (
                            <MaterialCommunityIcons
                                name={focused ? "book-open-page-variant" : "book-outline"}
                                color={color}
                                size={size}
                            />
                        ),
                    }}
                />

                {/* Aba Nova Receita */}
                <Tabs.Screen
                    name="screens/Nova"
                    options={{
                        title: "Nova Receita",
                        tabBarIcon: ({ focused, color, size }) => (
                            <MaterialCommunityIcons
                                name={focused ? "plus-box" : "plus-box-outline"}
                                color={color}
                                size={size}
                            />
                        ),
                    }}
                />

                {/* Aba Alterar Dados */}
                <Tabs.Screen
                    name="screens/Usuario"
                    options={{
                        title: "Alterar Dados",
                        tabBarIcon: ({ focused, color, size }) => (
                            <MaterialCommunityIcons
                                name={focused ? "account-edit" : "account-outline"}
                                color={color}
                                size={size}
                            />
                        ),
                    }}
                />

                {/* Aba Sair */}
                <Tabs.Screen
                    name="screens/Sair"
                    options={{
                        title: "Sair",
                        tabBarIcon: ({ focused, color, size }) => (
                            <MaterialCommunityIcons
                                name={focused ? "logout" : "logout-variant"}
                                color={color}
                                size={size}
                            />
                        ),
                    }}
                />
            </Tabs>
        </RecipesProvider>
    );
}
