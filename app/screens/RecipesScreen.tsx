// src/screens/RecipesScreen.js
import React from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";

const recipes = [
    { id: "1", name: "Bolo de Chocolate"/*, image: require('../assets/images/bolo.jpg') */},
    { id: "2", name: "Sopa de Tomate"/*, image: require('../assets/images/sopa.jpg')*/ },
    // Adicione mais receitas conforme necessário
];

export default function RecipesScreen() {
    return (
        <View style={styles.container}>
            <FlatList
                data={recipes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card}>
                        {/* <Image source={item.image} style={styles.image} /> */}
                        <Text style={styles.recipeName}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: "#FFF9C4" },
    card: {
        backgroundColor: "#FFF",
        borderRadius: 10,
        marginBottom: 16,
        padding: 16,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    image: { width: 100, height: 100, borderRadius: 10, marginBottom: 10 },
    recipeName: { fontSize: 18, fontWeight: "bold", color: "#D76B30" },
});
