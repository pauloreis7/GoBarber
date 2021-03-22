import React, { useRef } from 'react';
import { Image, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'

import Input from '../../components/Input'
import Button from '../../components/Button'

import logoImg from '../../assets/logo.png'

import { 
    Container,
    Title,
    BackToSignIn,
    BackToSignInText 
} from './styles';

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const navigation = useNavigation();

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined }
                enabled
            >
                <ScrollView
                    contentContainerStyle={{ flex: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <Container>
                        <Image source={logoImg} />

                        <View>
                            <Title>Crie sua conta</Title>
                        </View>

                        <Form ref={formRef} onSubmit={() => {}}>

                            <Input name="name" icon="mail" placeholder="Nome" />
                            
                            <Input name="email" icon="mail" placeholder="E-mail" />

                            <Input name="password" icon="lock" placeholder="Senha" />

                            <Button onPress={() => formRef.current?.submitForm()}>Criar</Button>

                        </Form>

                    </Container>
                </ScrollView>    
            </KeyboardAvoidingView>

            <BackToSignIn onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={20} color="#fff" />
                <BackToSignInText>Voltar para login</BackToSignInText>
            </BackToSignIn>
        </>
    );
}

export default SignUp;