import 'regenerator-runtime/runtime'
import React, { createContext, useState, useEffect } from "react";
import isValidToken, { getApiKeyAsyncStorage, getTokenAsyncStorage, getUserNameAsyncStorage, setUserNameAsyncStorage, removeDateAsyncSotorage, setApiKeyAsyncStorage, setTokenAsyncStorage } from "../isValidToken/isValidToken";
import apiAxios from '../services/axiosApi';

const AuthContext = createContext(AuthProvider);

export function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [logado, setLogado] = useState(false);
    const [loadingLogin, setLoadingLogin] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [token, setToken] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [userName, setUserName] = useState('store24h');


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
          const apiKey = await getApiKeyAsyncStorage();
          const userName = await getUserNameAsyncStorage();
          setUserName(userName);
          setApiKey(apiKey);
          setToken(String(tokenAsync));
  
        } else {
            handleLogout();
            setLoading(false);
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
          const response = await apiAxios.post('/auth/login/user', {"email": email, "senha": senha});
          setTokenAsyncStorage(response.data.token);
          const responseUser = await apiAxios.get("/userDetails", { headers: { 'Authorization' : `Bearer ${response.data.token}`}});
          setUserNameAsyncStorage(responseUser.data.nome);
          await setApiKeyAsyncStorage(responseUser.data.apiKey);
          setLogado(true);
          setLoadingLogin(false);
          window.location.href = "/app/store24h/services";
  
        } catch (e) {
          setLoginError(true);
          setLoadingLogin(false);
        }
    }

    return (
        <AuthContext.Provider value={{ logado, apiKey, userName, loading, token, loadingLogin, loginError, handleLogin, handleLogout, auxLogin }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;