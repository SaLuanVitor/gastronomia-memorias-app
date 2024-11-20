import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { auth } from "../../scripts/firebase-config";
import { router } from "expo-router";

export default function Sair() {
    const handleLogout = async () => {
        try {
            await auth.signOut();
            console.log("Usuário desconectado.");
            router.push("../../"); // Altere o caminho caso necessário
        } catch (error) {
            console.error("Erro ao sair:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Deseja realmente sair?</Text>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF9C4",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FF7043",
        marginBottom: 16,
    },
    button: {
        backgroundColor: "#FF7043",
        padding: 16,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "bold",
    },
});
