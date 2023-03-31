import 'regenerator-runtime/runtime'
import React, { createContext, useState, useEffect, useContext } from "react";
import isValidToken, { getApiKeySystemAsyncStorage, getTokenAsyncStorage, removeDateAsyncSotorage, setApiKeySystemAsyncStorage, setTokenAsyncStorage, getUserAsyncStorage, setUserAsyncStorage } from "../isValidToken/isValidToken";
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
          const user = await getUserAsyncStorage();
          setUser(user);
          const tokenAsync = await getTokenAsyncStorage();
          const apiKeySystem = await getApiKeySystemAsyncStorage();
          setUserName(user.nome);
          setApiKeySystem(apiKeySystem);
          setToken(tokenAsync);
  
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
          const response = await apiAxios.post('/user/auth/login/user', {"email": email, "senha": senha});
          setTokenAsyncStorage(response.data.token);
          const responseUser = await apiAxios.get("/user/userDetails", { headers: { 'Authorization' : `Bearer ${response.data.token}`}});
          const responseApiKeySystem = await apiAxios.get('/adm/getapikeysystem', { headers: { 'Authorization' : `Bearer ${response.data.token}`}});
          setApiKeySystemAsyncStorage(responseApiKeySystem.data);
          setUserAsyncStorage(responseUser.data);
          setLogado(true);
          setLoadingLogin(false);
          window.location = "/app/store24h/services";
  
        } catch (e) {
          console.log(e);
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