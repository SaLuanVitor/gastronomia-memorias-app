// app/components/SystemModal.tsx
import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";

interface SystemModalProps {
    visible: boolean;
    onClose: () => void;
    title: string;
    message: string;
    buttonText?: string;
    type?: "success" | "error" | "info"; // Para alterar o estilo baseado no tipo
}

export default function SystemModal({
    visible,
    onClose,
    title,
    message,
    buttonText = "Ok",
    type = "info",
}: SystemModalProps) {
    const getModalStyle = () => {
        switch (type) {
            case "success":
                return styles.successBackground;
            case "error":
                return styles.errorBackground;
            case "info":
            default:
                return styles.infoBackground;
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={[styles.modalContainer, getModalStyle()]}>
                    <Text style={styles.modalTitle}>{title}</Text>
                    <Text style={styles.modalMessage}>{message}</Text>
                    <TouchableOpacity style={styles.button} onPress={onClose}>
                        <Text style={styles.buttonText}>{buttonText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo semitransparente
    },
    modalContainer: {
        width: "80%",
        padding: 20,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFF",
        marginBottom: 10,
        textAlign: "center",
    },
    modalMessage: {
        fontSize: 16,
        color: "#FFF",
        textAlign: "center",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#FFF",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 16,
        color: "#FF7043",
        fontWeight: "bold",
    },
    // Estilos dinâmicos baseados no tipo do modal
    successBackground: { backgroundColor: "#4CAF50" },
    errorBackground: { backgroundColor: "#F44336" },
    infoBackground: { backgroundColor: "#2196F3" },
});
