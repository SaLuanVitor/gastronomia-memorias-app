// src/screens/FavoritesScreen.js
import React from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";

const favoriteRecipes = [
    { id: "1", name: "Pizza Margherita"/*, image: require('../assets/images/pizza.jpg')*/ },
    // Adicione mais favoritos conforme necessário
];

export default function FavoritesScreen() {
    return (
        <View style={styles.container}>
            <FlatList
                data={favoriteRecipes}
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
