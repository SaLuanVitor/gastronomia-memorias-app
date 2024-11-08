import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { auth, db } from "../scripts/firebase-config";
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';

export default function CreateUser() {
    const router = useRouter();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorCreateUser, setErrorCreateUser] = useState("");

    const validarCampos = () => {
        if (nome === "") {
            setErrorCreateUser("Informe um Nome.");
        } else if (email === "") {
            setErrorCreateUser("Informe um E-Mail");
        } else if (password === "") {
            setErrorCreateUser("Informe uma Senha");
        } else {
            setErrorCreateUser("");
        }
    }

    const createUser = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                set(ref(db, 'user/' + user.uid), {
                    nome: nome,
                    email: email
                });
                router.push('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorCreateUser(errorMessage);
            });
    }

    return (
        <View style={styles.background}>
            <Image
                source={require('../assets/images/bgGifRecipeCreate.gif')}
                style={styles.gifBackground}
                resizeMode="cover"
            />
            <View style={styles.container}>
                {errorCreateUser !== "" && (
                    <Text style={styles.alert}>{errorCreateUser}</Text>
                )}
                <Text style={styles.titulo}>Cadastrar Usuário</Text>

                <TextInput
                    style={styles.input}
                    placeholder='Nome'
                    placeholderTextColor={"#AFAFAF"}
                    value={nome}
                    onChangeText={setNome}
                />

                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor={"#AFAFAF"}
                    value={email}
                    onChangeText={setEmail}
                />

                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder='Senha'
                    placeholderTextColor={"#AFAFAF"}
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={validarCampos}
                    onPressIn={createUser}
                >
                    <Text style={styles.textButton}>Criar usuário</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center'
    },
    gifBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
    },
    titulo: {
        color: "#D76B30", // Cor do título
        fontSize: 36, // Tamanho do título
        marginBottom: 40, // Espaço abaixo do título
        textAlign: 'center',
        fontWeight: 'bold', // Negrito
    },
    container: {
        backgroundColor: "#FFF9C4", // Fundo pastel
        padding: 30,
        borderRadius: 10, // Bordas arredondadas
        alignItems: 'center', // Centraliza o conteúdo do container
        opacity: 0.9, // Opacidade para visualizar o fundo
    },
    alert: {
        fontSize: 18,
        textAlign: 'center',
        color: '#FF6347', // Cor da mensagem de erro
        marginBottom: 20,
    },
    input: {
        fontSize: 18,
        borderRadius: 10,
        backgroundColor: '#ffffff', // Cor do fundo dos inputs
        padding: 15,
        marginBottom: 20,
        width: '100%',
        borderWidth: 1,
        borderColor: '#A8E6CF', // Cor da borda do input
        color: '#333', // Cor do texto
    },
    button: {
        backgroundColor: '#FFD700', // Cor do botão
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        width: '100%',
    },
    textButton: {
        fontSize: 24,
        textAlign: 'center',
        color: '#4B0082', // Cor do texto do botão
    }
});
