// app/screens/HomeScreen.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo ao Gastronomia & Memórias</Text>
            
            <Link href="/screens/RecipesScreen" style={styles.button}>
                <Text style={styles.buttonText}>Ver Receitas</Text>
            </Link>
            
            <Link href="/screens/FavoritesScreen" style={styles.button}>
                <Text style={styles.buttonText}>Favoritos</Text>
            </Link>
            
            <Link href="/screens/CategoriesScreen" style={styles.button}>
                <Text style={styles.buttonText}>Categorias</Text>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", backgroundColor: "#FFF9C4", paddingTop: 30 },
    title: { fontSize: 24, fontWeight: "bold", color: "#D76B30", marginBottom: 24 },
    button: {
        backgroundColor: "#FF7043",
        padding: 16,
        borderRadius: 10,
        marginVertical: 8,
        width: "80%",
        alignItems: "center",
    },
    buttonText: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
});
