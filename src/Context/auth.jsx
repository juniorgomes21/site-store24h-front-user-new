import 'regenerator-runtime/runtime'
import React, { createContext, useState, useEffect } from "react";
import isValidToken, { getApiKeyAsyncStorage, getTokenAsyncStorage, getUserNameAsyncStorage, setUserNameAsyncStorage, removeDateAsyncSotorage, setApiKeyAsyncStorage, setTokenAsyncStorage, getUserAsyncStorage, setUserAsyncStorage, removeApiKeyAsyncSotorage } from "../isValidToken/isValidToken";
import apiAxios from '../services/axiosApi';

const AuthContext = createContext(AuthProvider);

export function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [logado, setLogado] = useState(false);
    const [loadingLogin, setLoadingLogin] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [token, setToken] = useState('');
    const [apiKeySystem, setApiKeySystem] = useState('');
    const [userName, setUserName] = useState('');
    const [user, setUser] = useState({});

    // Auxiliares
    function auxLogin() {
      setLogado(true);
    };

    useEffect(() => {
        isInvalid();
    }, []);

    async function isInvalid() {
        if(window.location.href.includes("/login")) {
          return;
        }
        const response =  await isValidToken();
        if (response) {
          setLogado(true);
          const tokenAsync = await getTokenAsyncStorage();
          const user = await getUserAsyncStorage();
          setUser(user);
          const apiKeySystem = await getApiKeyAsyncStorage();
          setUserName(user.nome);
          setApiKeySystem(apiKeySystem);
          setToken(String(tokenAsync));
  
        } else {
            handleLogout();
            setLoading(false);
        }
    }

    async function apiKeySistem(token) {
        try {
            const response = await apiAxios.get('/adm/getapikeysistem', { headers: { 'Authorization' : `Bearer ${token}`}});
            console.log(response.data);
            setApiKeyAsyncStorage(response.data);

        } catch(e) {
            console.log("error apiKeySistem", e);
        }
    }
    
    function handleLogout() {
        setToken('');
        setLogado(false);
        removeDateAsyncSotorage();
        window.location.href = '/login';
    }

    async function handleLogin(email, senha) {
      try {
          setLoadingLogin(true);
          const response = await apiAxios.post('/user/auth/login/user', {"email": email, "senha": senha});
          setTokenAsyncStorage(response.data.token);
          const responseUser = await apiAxios.get("/user/userDetails", { headers: { 'Authorization' : `Bearer ${response.data.token}`}});
          if(responseUser.data.role == 'ADMINISTRADOR') {
            await apiKeySistem(response.data.token);
          } 
          setUserAsyncStorage(responseUser.data);
          // setUserNameAsyncStorage(responseUser.data.nome);
          // await setApiKeyAsyncStorage(responseUser.data.apiKey);
          setLogado(true);
          setLoadingLogin(false);
          window.location.href = "/app/store24h/services";
  
        } catch (e) {
          setLoginError(true);
          setLoadingLogin(false);
        }
    }

    return (
        <AuthContext.Provider value={{ logado, apiKeySystem, user, userName, loading, token, loadingLogin, loginError, handleLogin, handleLogout, auxLogin }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;