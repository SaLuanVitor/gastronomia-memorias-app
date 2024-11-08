import { auth } from '@/scripts/firebase-config';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from "react-native";

export default function Index() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorLogin, setErrorLogin] = useState("");

    const validarCampos = () => {
        if (email === "") {
            setErrorLogin("Informe seu e-mail.");
        } else if (password === "") {
            setErrorLogin("Informe sua senha");
        } else {
            setErrorLogin("");
            login();
        }
    }

    const login = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setEmail("");
                setPassword("");
                setErrorLogin("");
                router.push("/internas/tasks");
            })
            .catch((error) => {
                const errorMessage = error.message;
                setErrorLogin(errorMessage);
            });
    }

    return (
        <View style={styles.background}>
            <Image
                source={require('../assets/images/bgGifRecipe.gif')}
                style={styles.gifBackground}
                resizeMode="cover"
            />

            <View style={styles.container}>
                <Text style={styles.titleArc}>Gastronomia & Memórias</Text>
                <Image style={styles.logo} source={require('../assets/images/recipe-icon.png')} />
                <Text style={styles.title}>Bem-vindo ao Seu Livro de Receitas</Text>

                {errorLogin && (
                    <Text style={styles.alert}>{errorLogin}</Text>
                )}

                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    value={email}
                    onChangeText={setEmail}
                />

                <TextInput
                    style={styles.input}
                    placeholder='Senha'
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity style={styles.button} onPress={validarCampos}>
                    <Text style={styles.textButton}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonCreate}
                    onPress={() => router.push('/user_create')}
                >
                    <Text style={styles.buttonCreateText}>Criar Usuário</Text>
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
    container: {
        backgroundColor: "#FFF9C4", // Bege Claro
        padding: 30,
        borderRadius: 10,
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.95,
    },
    logo: {
        marginBottom: 20,
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#D76B30',
        marginBottom: 20,
        textAlign: 'center',
        textShadowColor: '#fff',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    alert: {
        fontSize: 16,
        color: '#C62828',
        textAlign: 'center',
        marginBottom: 20,
        textShadowColor: '#fff',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    input: {
        fontSize: 18,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        padding: 15,
        marginBottom: 20,
        width: '100%',
        borderWidth: 1,
        borderColor: '#A8E6CF', // Verde Claro
    },
    button: {
        backgroundColor: '#FF7043', // Laranja vibrante
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        width: '100%',
    },
    textButton: {
        fontSize: 24,
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold',
    },
    buttonCreate: {
        padding: 15,
        backgroundColor: '#42A5F5', // Azul vibrante
        borderWidth: 1,
        borderColor: '#42A5F5', // Mantém a borda azul
        borderRadius: 10,
        marginBottom: 20,
        width: '100%',
    },
    buttonCreateText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold',
    },
    titleArc: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#D76B30',
        marginBottom: 10,
        textAlign: 'center',
        textShadowColor: '#fff',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
});
