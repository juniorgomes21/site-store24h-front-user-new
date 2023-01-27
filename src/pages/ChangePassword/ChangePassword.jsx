import PropTypes from "prop-types";
import React, { useState, useEffect, useContext } from "react";
import {
  Container,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";

//My
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
//Text Input
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AuthContext from '../../Context/auth';
//Button
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { CircularProgress } from "@mui/material";
import apiAxios from "../../services/axiosApi";
import { getApiKeySystemAsyncStorage, getUserAsyncStorage, setApiKeySystemAsyncStorage } from "../../isValidToken/isValidToken";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ChangePassword = props => {
    
    //meta title
    document.title="store24h - Agente | Configuração ApiKey";
    const { token, user } = useContext(AuthContext);
    const [apiKeySystem, setApiKeySystem] = useState('Carregando...')
    const [loadingPage, setLoadingPage] = useState(true); 
    const [loading, setLoading] = useState(false);
    const [textFieldApiKey, setTextFieldApiKey] = useState('');
    //error
    const [errorApi, setErrorApi] = useState(false);
    //Snackbar
    const [open, setOpen] = useState(false);
    const [textSnackbar, setTextSnackbar] = useState('');

    

    useEffect(() => {
        if(user.role != 'ADMINISTRADOR') {
            window.location.href = '/app/store24h/services';
        } else {
            getApiKeySystem();
            setLoadingPage(false);
        }
    }, [])

    async function getApiKeySystem() {
        const apiKeySystemAsync = await getApiKeySystemAsyncStorage();
        setApiKeySystem(apiKeySystemAsync ? apiKeySystemAsync : 'Você ainda não registrou uma ApiKey.');
    }

    async function apiSetApiKeySystem() {
        try {
            setLoading(true);
            setErrorApi(false);
            const response = await apiAxios.post("/adm/setapikeysystem", { "apiKeySystem": textFieldApiKey }, { headers: { 'Authorization' : `Bearer ${token}`}});
            setTextSnackbar("chave " + response.data + " salva!");
            setApiKeySystemAsyncStorage(response.data);
            setOpen(true);
            setLoading(false);

        } catch(e) {
            // setTextSnackbar(e);
            setErrorApi(true);
            setOpen(true);
            setLoading(false);
            setTextSnackbar(e.response.data);
        }
    }

    function validClick() {
        if(textFieldApiKey) {
            apiSetApiKeySystem();
        }
    }

    return (
            loadingPage ?
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <CircularProgress />
                </div>
            :

            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                    {/* Render Breadcrumb */}
                    <Breadcrumbs
                        title={props.t("Configuração ApiKey")}
                        breadcrumbItem={props.t("Configuração ApiKey")}
                    />
                        <p>Para melhorar a segurança, você pode ativar a autenticação de dois fatores instalando o aplicativo Google Authenticator gratuito. Você pode baixá-lo para o seu telefone para as plataformas Google Android e iOS. Depois de ativar a autenticação de dois fatores, você precisará inserir um código sempre que fizer login na sua conta e alterar as configurações no site. </p>
                        <h2>Cole sua ApiKey aqui:</h2>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '40ch' },
                                display: 'flex',
                                flexDirection: 'row',
    
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                id="outlined-basic"
                                size='small'
                                defaultValue={apiKeySystem ? apiKeySystem : textFieldApiKey}
                                label="apiKey"
                                variant="standard"
                                type='text'
                                onChange={e => setTextFieldApiKey(e.target.value)}
                            />
                            <Stack spacing={2} direction="row">
                                {
                                    loading ?
                                        <div>
                                            <CircularProgress />
                                        </div>
                                    :
                                        <Button variant="contained" onClick={validClick}>Salvar</Button>
                                }
                            </Stack>
                        </Box>
                        <Snackbar
                            open={open}
                            onClose={() => setOpen(false)}
                            autoHideDuration={3000}
                        >
                            <Alert severity={errorApi ? "error" : "success"} sx={{ width: '100%' }}>
                                {textSnackbar}
                            </Alert>
                        </Snackbar>
                    </Container>
                </div>
            </React.Fragment>

    );
};

ChangePassword.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(ChangePassword);