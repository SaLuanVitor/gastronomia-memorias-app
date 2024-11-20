import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { auth } from "../../scripts/firebase-config"; // Importe a configuração do Firebase
import SystemModal from "../../components/SystemModal"; // Certifique-se de importar o SystemModal
import { updateEmail, updatePassword } from "firebase/auth";

export default function Usuario() {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState({
        title: "",
        message: "",
        type: "info",
    });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Carregar dados do usuário logado
        const user = auth.currentUser;
        if (user) {
            setEmail(user.email); // Define o email atual
        }
    }, []);

    const handleUpdate = async () => {
        if (!newEmail && !newPassword) {
            setModalContent({
                title: "Erro",
                message: "Por favor, insira um novo email ou senha.",
                type: "error",
            });
            setModalVisible(true);
            return;
        }

        setLoading(true);

        try {
            const user = auth.currentUser;

            // Atualizar o email se um novo email for fornecido
            if (newEmail) {
                await updateEmail(user,newEmail); // Atualiza o email no Firebase
                setEmail(newEmail); // Atualiza o email no estado local
            }

            // Atualizar a senha se uma nova senha for fornecida
            if (newPassword) {
                await updatePassword(user,newPassword); // Atualiza a senha no Firebase
            }

            setModalContent({
                title: "Sucesso",
                message: "Dados atualizados com sucesso!",
                type: "success",
            });
            setModalVisible(true);

            // Limpa os campos após atualização
            setNewEmail("");
            setNewPassword("");

        } catch (error) {
            setModalContent({
                title: "Erro",
                message: `Erro ao atualizar os dados: ${error.message}`,
                type: "error",
            });
            setModalVisible(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Usuário</Text>

            <Text style={styles.label}>Email Atual:</Text>
            <TextInput
                style={styles.input}
                value={email}
                editable={false}
            />

            <Text style={styles.label}>Novo Email:</Text>
            <TextInput
                style={styles.input}
                value={newEmail}
                onChangeText={setNewEmail}
                placeholder="Digite o novo email"
            />

            <Text style={styles.label}>Nova Senha:</Text>
            <TextInput
                style={styles.input}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Digite a nova senha"
                secureTextEntry
            />

            <TouchableOpacity
                style={styles.button}
                onPress={handleUpdate}
                disabled={loading}
            >
                <Text style={styles.buttonText}>Alterar Dados</Text>
            </TouchableOpacity>

            {/* Modal de feedback */}
            <SystemModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                title={modalContent.title}
                message={modalContent.message}
                type={modalContent.type}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        alignSelf: "flex-start",
        marginLeft: 16,
    },
    input: {
        width: "100%",
        backgroundColor: "#F2F2F2",
        borderRadius: 5,
        padding: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    button: {
        width: "100%",
        backgroundColor: "#FF7043",
        padding: 14,
        borderRadius: 5,
        marginBottom: 16,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
