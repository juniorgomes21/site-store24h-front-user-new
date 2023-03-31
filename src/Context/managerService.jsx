import 'regenerator-runtime/runtime'
import React, { createContext, useState, useEffect } from "react";
import isValidToken, { getApiKeySystemAsyncStorage, getTokenAsyncStorage, removeDateAsyncSotorage, setApiKeySystemAsyncStorage, setTokenAsyncStorage, getUserAsyncStorage, setUserAsyncStorage } from "../isValidToken/isValidToken";
import apiAxios from '../services/axiosApi';
import Button from "@mui/material/Button";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ManagerServiceContext = createContext(ManagerServiceProvider);

export function ManagerServiceProvider({ children }) {

    const [smsList, setSmsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lengthList, setLengthList] = useState(0);
    //Lateral esquerda serviços
    // const [loading, setLoading] = useState(true);
    const [serviceList, setServiceList] = useState([]);
    const [loadingServices, setLoadingServices] = useState(true);
    //error api
    const [errorApi, setErrorApi] = useState(false);
    const [errorMsg, setErrorMsg] = useState('Ops, algo deu errado tente novamente!');
    //SnackBar
    const [state, setState] = useState({
        openSnackBar: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const { vertical, horizontal, openSnackBar } = state;

    useEffect(() => {
        user();
        getService();
        setInterval(user, 10000);
    }, []);

    async function user() {
        try {
            const token = await getTokenAsyncStorage();
            const response = await apiAxios.post('/user/apiServicos/activation', { "quantityActivation": smsList.length }, { headers: { 'Authorization' : `Bearer ${token}`}});
            setSmsList(response.data);
            setLoading(false);
        } catch(e) {
            setLoading(false);
        }
    }

    //Lateral esquerda serviços
    async function getService() {
        try {
        //   const list = await getUserAsyncStorage()
        //   setServiceList(list);
          const response = await apiAxios.get(`/user/apiServicos/getAllServicesNoActivity`);
          setServiceList(response.data);
          setUserAsyncStorage(response.data)
        } catch(e) {
          setLoadingServices(false);
        }
      }
    
      async function compraServico(serviceName) {
        try {
            setErrorApi(false);
            const token = await getTokenAsyncStorage();
            const response = await apiAxios.post(`/user/apiServicos/comprarServico`, { "aliasService": serviceName }, { headers: { 'Authorization' : `Bearer ${token}`}});
            const badResponse = ["NO_NUMBERS", "NO_BALANCE", "BAD_KEY"];
            if(badResponse.includes(response.data)) {
              if(response.data == "NO_NUMBERS") {
                setErrorMsg("Não tem números disponíveis para este serviço no momento!");
              } else if(response.data == "NO_BALANCE") {
                setErrorMsg("Sua conta não tem mais crédito!");
              } else {
                setErrorMsg("Sua chave de api esta errada!");
              }
              setErrorApi(true);
              handleClickSnackBar({vertical: 'top', horizontal: 'center' });
              return;
            }
            
            if(window.location.href != "https://digitalapc.xyz/app/store24h/services") {
              window.location = "https://digitalapc.xyz/app/store24h/services";
            }
            getService();
            await user();
            handleClickSnackBar({vertical: 'top', horizontal: 'center' });
      
        } catch(e) {
            setErrorApi(true);
            handleClickSnackBar({vertical: 'top', horizontal: 'center' });
        }
    }

    function handleClickSnackBar(newState) {
        setState({ openSnackBar: true, ...newState });
    };

    function handleCloseSnackBar() {
        setState({ ...state, openSnackBar: false });
    };
    
    return (
        <ManagerServiceContext.Provider value={{ serviceList, smsList, compraServico, user, getService }}>
            {children}
            <Snackbar
                open={openSnackBar}
                autoHideDuration={6000}
                onClose={handleCloseSnackBar}
                anchorOrigin={{ vertical, horizontal }}
                key={vertical + horizontal}
            >
                <Alert onClose={handleCloseSnackBar} severity={errorApi ? "error" : "success"} sx={{ width: '100%' }}>
                    { errorApi ? errorMsg : `Sua compra foi Realizada com Sucesso!`}
                </Alert>
            </Snackbar>
        </ManagerServiceContext.Provider>
    )
}

export default ManagerServiceContext;