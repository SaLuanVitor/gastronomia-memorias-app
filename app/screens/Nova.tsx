import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, ScrollView } from "react-native";
import { TextInputMask } from 'react-native-masked-text'; 
import SystemModal from "../../components/SystemModal";
import { auth, db } from "../../scripts/firebase-config"; 
import { ref, set } from "firebase/database";
import { launchImageLibrary } from "react-native-image-picker";
import {Picker} from '@react-native-picker/picker';

export default function Nova() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [portion, setPortion] = useState(""); 
    const [prepTime, setPrepTime] = useState(""); 
    const [rating, setRating] = useState(""); 
    const [category, setcategory] = useState(""); 
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState({
        title: "",
        message: "",
        type: "info", 
    });
    const [image, setImage] = useState(null);

    const handleImageSelection = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                quality: 0.5,
                includeBase64: true,
            },
            (response) => {
                if (response.didCancel) {
                    console.log("Imagem não selecionada");
                } else if (response.errorMessage) {
                    console.log("Erro ao selecionar imagem: ", response.errorMessage);
                } else {
                    setImage(response.assets[0].uri);
                }
            }
        );
    };

    const handleSubmit = () => {
        if (!title) {
            setModalContent({
                title: "Erro",
                message: "Por favor, insira o título da receita.",
                type: "error",
            });
            setModalVisible(true);
            return;
        }
    
        if (!category) {
            setModalContent({
                title: "Erro",
                message: "Por favor, selecione uma categorya.",
                type: "error",
            });
            setModalVisible(true);
            return;
        }
    
        const portionValue = parseInt(portion, 10);
        if (isNaN(portionValue)) {
            setModalContent({
                title: "Erro",
                message: "Por favor, insira uma porção válida.",
                type: "error",
            });
            setModalVisible(true);
            return;
        }
    
        const ratingValue = parseFloat(rating);
        if (isNaN(ratingValue) || ratingValue < 0 || ratingValue > 5) {
            setModalContent({
                title: "Erro",
                message: "Por favor, insira uma classificação entre 0 a 5.",
                type: "error",
            });
            setModalVisible(true);
            return;
        }
    
        const timeRegex = /^([0-9]{1,2}):([0-9]{2})$/;
        if (!prepTime.match(timeRegex)) {
            setModalContent({
                title: "Erro",
                message: "Por favor, insira o tempo de preparo no formato HH:mm.",
                type: "error",
            });
            setModalVisible(true);
            return;
        }
    
        const user = auth.currentUser;
    
        if (!user) {
            setModalContent({
                title: "Erro",
                message: "Usuário não está autenticado.",
                type: "error",
            });
            setModalVisible(true);
            return;
        }
    
        const newRecipe = {
            title: title,
            description: description,
            portion: portionValue,  
            rating: ratingValue,    
            prepTime: prepTime,         
            userId: user.uid,  
            category: category,
            createdAt: Date.now(), 
            image: image,
        };
    
        const newRecipeRef = ref(db, "recipes/" + Date.now().toString());
    
        set(newRecipeRef, newRecipe)
            .then(() => {
                setModalContent({
                    title: "Sucesso",
                    message: "Receita adicionada com sucesso!",
                    type: "success",
                });
                setModalVisible(true);
                setTitle("");  
                setPortion(""); 
                setRating(""); 
                setPrepTime(""); 
                setcategory(""); 
                setDescription("");
                setImage(null);
            })
            .catch((error) => {
                setModalContent({
                    title: "Erro",
                    message: `Erro ao salvar receita: ${error.message}`,
                    type: "error",
                });
                setModalVisible(true);
            });
    };
    

    return (
        <View style={styles.mainContainer}>
                <View style={styles.tabsContainer}>
                    <Text style={styles.tabsText}>Novas Receitas</Text>
                </View>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                
                <TextInput
                    style={styles.input}
                    placeholder="Título"
                    value={title}
                    onChangeText={setTitle}
                />
                <Picker
    selectedValue={category}
    style={styles.picker}
    onValueChange={(itemValue) => setcategory(itemValue)}
>
    <Picker.Item label="Selecione uma categoria" value="" />
    <Picker.Item label="Café" value="Café" />
    <Picker.Item label="Almoço" value="Almoço" />
    <Picker.Item label="Lanche" value="Lanche" />
    <Picker.Item label="Janta" value="Janta" />
</Picker>

                <TextInput 
                    style={styles.inputLong}
                    placeholder="Descrição"
                    value={description}
                    onChangeText={setDescription}
                    multiline={true}
                    numberOfLines={5}
                    textAlignVertical="top"
                />
                <TextInputMask
                    style={styles.input}
                    type={'custom'}
                    placeholder="Porções"
                    value={portion}
                    onChangeText={setPortion}
                    keyboardType="numeric"
                    options={{ mask: '9999' }}
                />
                <TextInputMask
                    style={styles.input}
                    type={'custom'}
                    placeholder="Tempo de Preparo"
                    value={prepTime}
                    onChangeText={setPrepTime}
                    keyboardType="numeric"
                    options={{ mask: '99:99' }}
                />
                <TextInputMask
                    style={styles.input}
                    type={'custom'}
                    placeholder="Classificação (0 a 5)"
                    value={rating}
                    onChangeText={setRating}
                    keyboardType="numeric"
                    options={{ mask: '9.9' }}
                />
                
                {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
                
                <TouchableOpacity style={styles.button} onPress={handleImageSelection}>
    <View style={styles.buttonContent}>
        <Text style={styles.buttonText}>Selecionar Imagem </Text>
        <Image source={require('../../assets/images/upload.png')} style={styles.icon} />
    </View>
</TouchableOpacity>



                
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Salvar Receita</Text>
                </TouchableOpacity>

                <SystemModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    title={modalContent.title}
                    message={modalContent.message}
                    type={modalContent.type}
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
    container: {
        padding: 16,
        backgroundColor: "#FFF9C4",
    },
    header: {
        paddingVertical: 16,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: "#FF7043",
        marginBottom: 16,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "#FF7043",
    },
    input: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        padding: 10,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#FF7043",
    },
    inputLong: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        padding: 10,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#FF7043",
        minHeight: 150,
    },
    button: {
        backgroundColor: "#FF7043",
        padding: 16,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 16,
    },
    buttonContent: {
        flexDirection: 'row', // Alinha o ícone e o texto na horizontal
        alignItems: 'center', // Alinha o ícone e o texto verticalmente
    },
    icon: {
        width: 25, // Ajuste o tamanho do ícone conforme necessário
        height: 25,
        marginRight: 10, // Espaçamento entre o ícone e o texto
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "bold",
    },
    imagePreview: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginBottom: 16,
    },
    tabsContainer: {
        width: '100%', // Faz o container ocupar a largura máxima
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
    picker: {
        backgroundColor: "#FFFFFF", // Cor de fundo
        borderRadius: 10,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#FF7043",
        padding: 10,
    },
    
});
