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


//Activation e Number cell
export async function setActivationsNumbersAsyncStorage(accessList) {
    try {
        await AsyncStorage.setItem('@ActivationsNumbers', JSON.stringify(accessList));
    } catch (e) {
        console.log(e);
    }
}

export async function getActivationsNumbersAsyncStorage() {
    try {
        const activationsNumbersAsync= await AsyncStorage.getItem('@ActivationsNumbers');
        if (activationsNumbersAsync) {

            const activationsNumbers = JSON.parse(activationsNumbersAsync);

            return activationsNumbers;
        }

        return null;

    } catch (e) {
        console.log(e);
        return 'deu errado no get';
    }
}

export async function removeActivationsNumbersAsyncStorage() {
    try {
        await AsyncStorage.removeItem('@ActivationsNumbers');
        console.log("deu certo async");
        
    } catch (e) {
        console.log("deu error async");

    }
}

//Lista de serviços comprados
export async function setListBuyServicesAsyncStorage(accessList) {
    try {
        await AsyncStorage.setItem('@ListBuyServices', JSON.stringify(accessList));
    } catch (e) {
        console.log(e);
    }
}

export async function getListBuyServicesAsyncStorage() {
    try {
        const ListBuyServicesAsync = await AsyncStorage.getItem('@ListBuyServices');
        if (ListBuyServicesAsync) {

            const ListBuyServices = JSON.parse(ListBuyServicesAsync);

            return ListBuyServices;
        }

        return null;

    } catch (e) {
        console.log(e);
        return 'deu errado no get';
    }
}

export async function removeListBuyServicesAsyncStorage() {
    try {
        await AsyncStorage.removeItem('@ListBuyServices');
        console.log("deu certo async");
        
    } catch (e) {
        console.log("deu error async");

    }
}

//User
export async function setUserAsyncStorage(user) {
    try {
        await AsyncStorage.setItem('@User', JSON.stringify(user));
    } catch(e) {
        console.log("setUserAsyncStorage", e);
    }
}

export async function getUserAsyncStorage() {
    try {
        
        const userAsync = await AsyncStorage.getItem('@User');

        if (userAsync) {

            const user = JSON.parse(userAsync);

            return user
        }

        return null;

    } catch (e) {
        console.log(e);
        return 'deu errado no getUserAsyncStorage';
    }
}

//User
export async function setUserNameAsyncStorage(userName) {
    try {
        await AsyncStorage.setItem('@UserName', userName);
    } catch (e) {
        console.log(e);
    }
}

export async function getUserNameAsyncStorage() {
    try {
        const response = await AsyncStorage.getItem('@UserName');
        return response;

    } catch (e) {
        console.log(e);
        return 'deu errado no get';
    }
}

export async function removeUserNameAsyncSotorage() {
    try {
        await AsyncStorage.removeItem('@UserName');
        console.log("deu certo async");
        
    } catch (e) {
        console.log("deu error async");

    }
}

//ApiKey
export async function setApiKeySystemAsyncStorage(token) {
    try {
        await AsyncStorage.setItem('@ApiKeySystem', token);
    } catch (e) {
        console.log(e);
    }
}

export async function getApiKeySystemAsyncStorage() {
    try {
        const response = await AsyncStorage.getItem('@ApiKeySystem');
        return response;

    } catch (e) {
        console.log(e);
        return 'deu errado no get';
    }
}

export async function removeApiKeySystemAsyncSotorage() {
    try {
        await AsyncStorage.removeItem('@ApiKeySystem');
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
        await apiAxios.get('/user/testartoken', { headers: {'Authorization' : `Bearer ${token}`}});
        // await AsyncStorage.setItem('@Logado', JSON.stringify(response.data));
        return true;

    } catch(e) {
        // console.log("isValidToken", isValid);
        //  await AsyncStorage.setItem('@Logado', JSON.stringify(false));
        return false;
    }
    
}