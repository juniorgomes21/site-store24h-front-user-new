import AsyncStorage from '@react-native-async-storage/async-storage';
import apiAxios from '../services/axiosApi';

//Token
export async function setTokenAsyncStorage(token) {
    try {
        await AsyncStorage.setItem('@TokenAuthentication', token);
    } catch (e) {
        console.log(e);
    }
}

export async function getTokenAsyncStorage() {
    try {
        const response = await AsyncStorage.getItem('@TokenAuthentication');
        return response;

    } catch (e) {
        console.log(e);
        return 'deu errado no get';
    }
}

export async function removeDateAsyncSotorage() {
    try {
        await AsyncStorage.removeItem('@TokenAuthentication');
        console.log("deu certo async");
        
    } catch (e) {
        console.log("deu error async");

    }
}

//ApiKey
export async function setApiKeyAsyncStorage(token) {
    try {
        await AsyncStorage.setItem('@ApiKey', token);
    } catch (e) {
        console.log(e);
    }
}

export async function getApiKeyAsyncStorage() {
    try {
        const response = await AsyncStorage.getItem('@ApiKey');
        return response;

    } catch (e) {
        console.log(e);
        return 'deu errado no get';
    }
}

export async function removeApiKeyAsyncSotorage() {
    try {
        await AsyncStorage.removeItem('@ApiKey');
        console.log("deu certo async");
        
    } catch (e) {
        console.log("deu error async");

    }
}

// isValidToken
export default async function isValidToken() {
    let isValid = false;
    const token = await AsyncStorage.getItem('@TokenAuthentication');

    try {
        await apiAxios.get('/testartoken', { headers: {'Authorization' : `Bearer ${token}`}});
        // await AsyncStorage.setItem('@Logado', JSON.stringify(response.data));
        return true;

    } catch(e) {
        // console.log("isValidToken", isValid);
        //  await AsyncStorage.setItem('@Logado', JSON.stringify(false));
        return false;
    }
    
}