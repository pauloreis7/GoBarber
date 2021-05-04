import React, { useRef, useCallback } from 'react';
import { 
    Image, 
    View, 
    ScrollView, 
    KeyboardAvoidingView, 
    Platform, 
    TextInput, 
    Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import * as Yup from 'yup'

import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'

import getValidationErrors from '../../utils/getValidationErrors'

import api from '../../services/api'

import Input from '../../components/Input'
import Button from '../../components/Button'

import logoImg from '../../assets/logo.png'

import { 
    Container,
    Title,
    BackToSignIn,
    BackToSignInText 
} from './styles';

interface SingUpFormData {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);

    const navigation = useNavigation();

    const handleSignUp = useCallback(async (data: SingUpFormData) => {

        try {
          formRef.current?.setErrors({})
    
          const schema = Yup.object().shape({
            email: Yup.string()
              .email('E-mail inválido')
              .required('E-mail obrigatório'),
            password: Yup.string().required('Senha obrigatória'),
          });
    
          await schema.validate(data, {
            abortEarly: false,
          });

          await api.post('/users', data);

          Alert.alert(
            'Cadastro realizado com suceso!', 
            'Você já pode fazer login no GoBarber'
          );
          
          navigation.goBack();
        } catch (err) {
    
          if(err instanceof Yup.ValidationError) {
    
            const errors = getValidationErrors(err)
    
            formRef.current?.setErrors(errors)
    
            return;
          }

          Alert.alert(
            'Erro no Cadastro', 
            'Houve um erro ao fazer cadastro, tente novamente'
          );
        }
      }, [navigation]);

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

              <Form ref={formRef} onSubmit={handleSignUp}>

                <Input
                  autoCapitalize="words"
                  name="name" 
                  icon="mail" 
                  placeholder="Nome"
                  returnKeyType="next"
                  onSubmitEditing={() => emailInputRef.current?.focus()}
                />
                
                <Input
                  keyboardType="email-address"
                  autoCorrect={false}
                  autoCapitalize="none"
                  name="email"
                  icon="mail"
                  placeholder="E-mail"
                  returnKeyType="next"
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                />

                <Input 
                  secureTextEntry
                  name="password" 
                  icon="lock" 
                  placeholder="Senha" 
                  textContentType="newPassword"
                  returnKeyType="send"
                  onSubmitEditing={() => formRef.current?.submitForm()}
                />

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