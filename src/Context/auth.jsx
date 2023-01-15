import 'regenerator-runtime/runtime'
import React, { createContext, useState, useEffect } from "react";
import isValidToken, { getApiKeyAsyncStorage, getTokenAsyncStorage, removeDateAsyncSotorage, setApiKeyAsyncStorage, setTokenAsyncStorage } from "../isValidToken/isValidToken";
import apiAxios from '../services/axiosApi';

const AuthContext = createContext(AuthProvider);

export function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [logado, setLogado] = useState(false);
    const [loadingLogin, setLoadingLogin] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [token, setToken] = useState('');
    const [apiKey, setApiKey] = useState('');

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
          console.log("dsdsdsd");
          setLogado(true);
          const tokenAsync = await getTokenAsyncStorage();
          const apiKey = await getApiKeyAsyncStorage();
          setApiKey(apiKey);
          setToken(String(tokenAsync));
          console.log("logadoxxxx");
  
        } else {
          console.log("não logadoxxxx");
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
          setToken(response.data.token);
          setTokenAsyncStorage(response.data.token);
          const responseApiKey = await apiAxios.get("/getApiKey", { headers: { 'Authorization' : `Bearer ${response.data.token}`}});
          console.log(responseApiKey.data.apiKey);
          setApiKey(responseApiKey.data.apiKey);
          await setApiKeyAsyncStorage(responseApiKey.data.apiKey);
          setLogado(true);
          setLoadingLogin(false);
          window.location.href = "/app/store24h/services";
          console.log("logado");
  
        } catch (e) {
          setLoginError(true);
          setLoadingLogin(false);
          console.log("user não foi logado");
        }
    }

    return (
        <AuthContext.Provider value={{ logado, apiKey, loading, token, loadingLogin, loginError, handleLogin, handleLogout, auxLogin }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;