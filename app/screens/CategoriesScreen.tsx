// src/screens/CategoriesScreen.js
import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";

const categories = [
    { id: "1", name: "Doces" },
    { id: "2", name: "Salgados" },
    { id: "3", name: "Vegetariano" },
    // Adicione mais categorias conforme necessário
];

export default function CategoriesScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Categorias</Text>
            <FlatList
                data={categories}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.categoryButton}>
                        <Text style={styles.categoryName}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: "#FFF9C4" },
    title: { fontSize: 24, fontWeight: "bold", color: "#D76B30", marginBottom: 16 },
    categoryButton: {
        backgroundColor: "#FFF",
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    categoryName: { fontSize: 18, fontWeight: "bold", color: "#070A52" },
});
