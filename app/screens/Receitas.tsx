import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    FlatList,
    StyleSheet,
    Image,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
    Modal,
    Button, // Para botão de salvar
} from "react-native";
import { auth, db } from "../../scripts/firebase-config";
import { ref, query, orderByChild, equalTo, onValue, update } from "firebase/database";
import { launchImageLibrary } from 'react-native-image-picker';
import { TextInputMask } from 'react-native-masked-text';
import {Picker} from '@react-native-picker/picker';

export default function Receitas() {
    const [search, setSearch] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(""); // Categoria selecionada
    const [modalVisible, setModalVisible] = useState(false); // Controle de visibilidade do modal
    const [selectedRecipe, setSelectedRecipe] = useState(null); // Receita selecionada para edição

    const handleChangeImage = () => {
        launchImageLibrary(
            { mediaType: 'photo', includeBase64: false },
            (response) => {
                if (response.didCancel) {
                    console.log('Imagem selecionada cancelada');
                } else if (response.errorCode) {
                    console.log('Erro ao selecionar imagem: ', response.errorMessage);
                } else {
                    const imageUri = response.assets[0].uri;
                    setSelectedRecipe((prevRecipe) => ({
                        ...prevRecipe,
                        image: imageUri,
                    }));
                }
            }
        );
    };

    useEffect(() => {
        const fetchUserRecipes = async () => {
            const user = auth.currentUser;

            if (user) {
                const userId = user.uid;
                const recipesRef = ref(db, "recipes");
                const userRecipesQuery = query(recipesRef, orderByChild("userId"), equalTo(userId));

                onValue(
                    userRecipesQuery,
                    (snapshot) => {
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
                    },
                    (errorObject) => {
                        setError(errorObject.message);
                        setLoading(false);
                    }
                );
            } else {
                setLoading(false);
                setRecipes([]);
            }
        };

        fetchUserRecipes();
    }, []);

    const filteredRecipes = recipes
        .filter(
            (recipe) =>
                recipe.title.toLowerCase().includes(search.toLowerCase()) &&
                (selectedCategory === "" || recipe.category === selectedCategory)
        )
        .sort((a, b) => a.title.localeCompare(b.title));

    const categories = ["Café", "Almoço", "Jantar", "Lanche"];

    const handleEditRecipe = (recipe) => {
        setSelectedRecipe(recipe);  // Define a receita selecionada para edição
        setModalVisible(true); // Abre o modal
    };

    const handleSaveChanges = async () => {
        if (selectedRecipe) {
            const recipeRef = ref(db, "recipes/" + selectedRecipe.id);
            await update(recipeRef, {
                title: selectedRecipe.title,
                description: selectedRecipe.description,
                portion: selectedRecipe.portion,
                prepTime: selectedRecipe.prepTime,
                category: selectedRecipe.category,
                image: selectedRecipe.image,
            });
            setModalVisible(false); // Fecha o modal após salvar
        }
    };

    const handleInputChange = (field, value) => {
        setSelectedRecipe((prevRecipe) => ({
            ...prevRecipe,
            [field]: value,
        }));
    };

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
        <ImageBackground
            source={
                selectedCategory === "Café"
                    ? require("../../assets/images/cafe.gif")
                    : selectedCategory === "Almoço"
                    ? require("../../assets/images/almoco.gif")
                    : selectedCategory === "Jantar"
                    ? require("../../assets/images/jantar.gif")
                    : selectedCategory === "Lanche"
                    ? require("../../assets/images/lanche.gif")
                    : null
            }
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <View style={styles.mainContainer}>
                <View style={styles.tabsContainer}>
                    <Text style={styles.tabsText}>Minhas Receitas</Text>
                </View>
                <ScrollView
                    contentContainerStyle={styles.scrollableContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.categoryPanel}>
                        {categories.map((category) => (
                            <TouchableOpacity
                                key={category}
                                style={[styles.categoryCard, selectedCategory === category && styles.selectedCategoryCard]}
                                onPress={() =>
                                    setSelectedCategory(selectedCategory === category ? "" : category)
                                }
                            >
                                <Text style={[styles.categoryCardText, selectedCategory === category && styles.selectedCategoryText]}>
                                    {category}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

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
                            <TouchableOpacity onPress={() => handleEditRecipe(item)}>
                                <View style={styles.recipeCard}>
                                    <Image
                                        source={item.image && item.image !== "" ? { uri: item.image } : require("../../assets/images/recipe-icon.png")}
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
                                        <Text style={styles.recipeCategory}>
                                            {item.category || "Não especificada"}
                                        </Text>
                                    </View>
                                    <View style={styles.ratingContainer}>
                                        <Text style={styles.ratingText}>{item.rating || "N/A"}⭐</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma receita encontrada.</Text>}
                    />
                </ScrollView>
            </View>

            {/* Modal de Edição */}
            <Modal
    visible={modalVisible}
    animationType="slide"
    transparent={true}
    onRequestClose={() => setModalVisible(false)}
>
    <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
            <TextInput
                style={styles.modalInput}
                placeholder="Título"
                value={selectedRecipe?.title}
                onChangeText={(text) => handleInputChange("title", text)}
            />
            <TextInput
                style={styles.modalInput}
                placeholder="Descrição"
                value={selectedRecipe?.description}
                onChangeText={(text) => handleInputChange("description", text)}
            />
            <TextInputMask
                style={styles.modalInput}
                type={'custom'}
                placeholder="Porção"
                value={selectedRecipe?.portion}
                onChangeText={(text) => handleInputChange("portion", text)}
                keyboardType="numeric"
                options={{ mask: '9999' }} // Máscara para a porção
            />
            <TextInputMask
                style={styles.modalInput}
                type={'custom'}
                placeholder="Tempo de preparo"
                value={selectedRecipe?.prepTime}
                onChangeText={(text) => handleInputChange("prepTime", text)}
                keyboardType="numeric"
                options={{ mask: '99:99' }} // Máscara para tempo (HH:mm)
            />

            {/* Substituindo TextInput por Picker para Categoria */}
            <Picker
                selectedValue={selectedRecipe?.category}
                style={styles.picker}
                onValueChange={(itemValue) => handleInputChange("category", itemValue)}
            >
                <Picker.Item label="Selecione uma categoria" value="" />
                <Picker.Item label="Café" value="Café" />
                <Picker.Item label="Almoço" value="Almoço" />
                <Picker.Item label="Lanche" value="Lanche" />
                <Picker.Item label="Janta" value="Janta" />
            </Picker>

            {/* Botão para alterar imagem */}
            <TouchableOpacity 
                style={styles.changeImageButton} 
                onPress={handleChangeImage}
            >
                <Text style={styles.changeImageButtonText}>Alterar Imagem</Text>
            </TouchableOpacity>

            {/* Exibir a imagem atual */}
            {selectedRecipe?.image ? (
                <Image
                    source={{ uri: selectedRecipe.image }}
                    style={styles.imagePreview}
                />
            ) : (
                <Text style={styles.noImageText}>Nenhuma imagem selecionada</Text>
            )}

            <View style={styles.modalButtons}>
                <Button  title="Cancelar" onPress={() => setModalVisible(false)}  />
                <Button title="Salvar" onPress={handleSaveChanges} />
            </View>
        </View>
    </View>
</Modal>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo semi-transparente
    },
    modalContent: {
        width: "80%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
    },
    modalInput: {
        height: 40,
        borderColor: "#FF7043",
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
        borderRadius: 5,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    editButton: {
        color: "#FF7043",
        fontSize: 16,
        marginTop: 10,
    },
    backgroundImage: {
        flex: 1, // Faz com que a imagem ocupe toda a tela
        justifyContent: 'center', // Centraliza o conteúdo verticalmente
        alignItems: 'center', // Centraliza o conteúdo horizontalmente
        height: "100%"
    },
    mainContainer: {
        flex: 1,
        backgroundColor: "rgba(255, 255, 255, 0.9)", // Cor de fundo translúcida sobre a imagem
        width: '100%', // Garante que o container ocupe toda a largura da tela
    },
    cafeBackground: {
        backgroundColor: "#D7CCC8", // Fundo para Café
    },
    almocoBackground: {
        backgroundColor: "#FFECB3", // Fundo para Almoço (amarelo claro)
    },
    jantarBackground: {
        backgroundColor: "#C5E1A5", // Fundo para Jantar (verde claro)
    },
    lancheBackground: {
        backgroundColor: "#FFCCBC", // Fundo para Lanche (laranja claro)
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
    categoryIconContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    categoryIcon: {
        width: 24,
        height: 24,
        resizeMode: "contain",
    },
    recipeCategory: {
        fontSize: 14,
        fontWeight: "600",
        color: "#555", // Cor neutra
        marginTop: 8,  // Espaçamento do restante do conteúdo
    },
    categoryPanel: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    categoryCard: {
        width: "48%", // Define o tamanho para 2 cartões por linha
        padding: 10,
        backgroundColor: "#FFF",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#FF7043",
        alignItems: "center", // Centraliza o texto
        marginBottom: 10, // Espaço entre linhas
    },
    selectedCategoryCard: {
        backgroundColor: "#FF7043",
    },
    categoryCardText: {
        fontSize: 14,
        color: "#FF7043",
    },
    selectedCategoryText: {
        color: "#FFF",
    },
    changeImageButton: {
        backgroundColor: "#FF7043",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginBottom: 12,
    },
    
    changeImageButtonText: {
        color: "#FFF",
        fontSize: 16,
    },
    
    imagePreview: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 12,
    },
    
    noImageText: {
        color: "#999",
        fontSize: 14,
        marginBottom: 12,
    },
    picker: {
        backgroundColor: "#FFFFFF", // Cor de fundo
        borderRadius: 10,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#FF7043",
        padding: 10,
    },
});