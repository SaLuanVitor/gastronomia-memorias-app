import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, Image, ActivityIndicator, ScrollView } from "react-native";
import { auth, db } from "../../scripts/firebase-config"; // Importando auth e db do seu arquivo de configuração
import { ref, query, orderByChild, equalTo, onValue } from "firebase/database";

export default function Receitas() {
    const [search, setSearch] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);  // Estado para gerenciar erros

    useEffect(() => {
        const fetchUserRecipes = async () => {
            const user = auth.currentUser;

            if (user) {
                const userId = user.uid;

                // Referência à coleção "recipes" no database
                const recipesRef = ref(db, "recipes");

                // Consulta para buscar receitas onde "userId" corresponde ao usuário logado
                const userRecipesQuery = query(recipesRef, orderByChild("userId"), equalTo(userId));

                // Escuta em tempo real
                onValue(userRecipesQuery, (snapshot) => {
                    if (snapshot.exists()) {
                        const fetchedRecipes = Object.entries(snapshot.val()).map(([key, value]) => ({
                            id: key,
                            ...value,
                        }));
                        setRecipes(fetchedRecipes);
                    } else {
                        setRecipes([]);
                    }
                    setLoading(false);
                }, (errorObject) => {
                    // Tratando erro da consulta
                    setError(errorObject.message);
                    setLoading(false);
                });
            } else {
                setLoading(false);
                setRecipes([]);
            }
        };

        fetchUserRecipes();
    }, []);

    const filteredRecipes = recipes
        .filter((recipe) => recipe.title.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => a.title.localeCompare(b.title));

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FF7043" />
                <Text style={styles.loadingText}>Carregando receitas...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Erro ao carregar receitas: {error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.mainContainer}>
            {/* Barra de navegação fixa, acima da lista de receitas */}
            <View style={styles.tabsContainer}>
                <Text style={styles.tabsText}>Minhas Receitas</Text>
            </View>

            {/* Conteúdo rolável */}
            <ScrollView contentContainerStyle={styles.scrollableContent} showsVerticalScrollIndicator={false}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar receitas..."
                    value={search}
                    onChangeText={setSearch}
                />
                <FlatList
                    data={filteredRecipes}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.recipeCard}>
                            <Image
                                source={
                                    item.image && item.image !== "" // Verificando se a URL não está vazia
                                        ? { uri: item.image } // Caso tenha uma URL válida, exibe a imagem do Firebase
                                        : require("../../assets/images/recipe-icon.png") // Imagem padrão
                                }
                                style={styles.recipeImage}
                            />
                            <View style={styles.recipeDetails}>
                                <Text style={styles.recipeTitle}>{item.title}</Text>
                                <Text style={styles.recipeDescription} numberOfLines={2}>
                                    {item.description || "Sem descrição."}
                                </Text>
                                <View style={styles.recipeInfo}>
                                    <Text style={styles.recipeInfoText}>
                                        Porção: {item.portion || "N/A"}
                                    </Text>
                                    <Text style={styles.recipeInfoText}>
                                        Tempo: {item.prepTime || "N/A"}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.ratingContainer}>
                                <Text style={styles.ratingText}>{item.rating || "N/A"}⭐</Text>
                            </View>
                        </View>
                    )}
                    ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma receita encontrada.</Text>}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#FFF9C4"
    },
    tabsContainer: {
        height: 60,
        backgroundColor: "#FF7043",
        justifyContent: "center",
        alignItems: "center",
    },
    tabsText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFF",
    },
    scrollableContent: {
        padding: 16,
        paddingBottom: 60, // Adiciona padding inferior para garantir que o conteúdo não fique "escondido" atrás da barra de navegação
    },
    searchInput: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        padding: 10,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#FF7043"
    },
    recipeCard: {
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        marginBottom: 16,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    recipeImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        resizeMode: "cover",
    },
    recipeDetails: {
        flex: 1,
        marginLeft: 10,
    },
    recipeTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#FF7043",
        marginBottom: 4,
    },
    recipeDescription: {
        fontSize: 14,
        color: "#666",
        marginBottom: 8,
    },
    recipeInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    recipeInfoText: {
        fontSize: 12,
        color: "#999",
    },
    ratingContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    ratingText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#FF7043",
    },
    emptyText: { textAlign: "center", color: "#D76B30", marginTop: 20 },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF9C4",
    },
    loadingText: {
        marginTop: 10,
        color: "#FF7043",
        fontSize: 16,
        fontWeight: "bold",
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF9C4",
    },
    errorText: {
        color: "#FF7043",
        fontSize: 16,
        fontWeight: "bold",
    },
});
