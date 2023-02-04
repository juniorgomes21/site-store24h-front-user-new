import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import {
  Container,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";

//My
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { getTokenAsyncStorage } from "../../isValidToken/isValidToken";
import apiAxios from "../../services/axiosApi";
import { maskCell } from "../../Validation&Formatation/formatation";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Activations = props => {

    //meta title
    document.title="store24h | Lista de Serviços";
    const [smsList, setSmsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lengthList, setLengthList] = useState(0);
    //Cancel
    const [indexCancel, setIndexCancel] = useState(-1);
    const [errorMsgCancel, setErrorMsgCancel] = useState('Ops, algo deu errado tente novamente!');
    const [loadingCancel, setLoadingCancel] = useState(false);
    const [errorApiCancel, setErrorApiCancel] = useState(false);
    
    //SnackBar
    const [state, setState] = useState({
        openSnackBar: false,
        vertical: 'bottom',
        horizontal: 'left',
    });

    const { vertical, horizontal, openSnackBar } = state;


    useEffect(() => {
      user();
      setInterval(user, 15000);
    }, [])
  
    async function user() {
        try {
            const token = await getTokenAsyncStorage();
            const response = await apiAxios.post('/user/apiServicos/activation', { "quantityActivation": smsList.length }, { headers: { 'Authorization' : `Bearer ${token}`}});
            const listActivations = response.data;
            if(listActivations.length == 0) {
                setSmsList([]);
                setLoading(false);
            } else {
                if(listActivations.length > smsList.length) {
                setSmsList(listActivations);
                setLengthList(lengthList + 1);
                }
                setLoading(false);
            }
        } catch(e) {
            console.log(e);
            setLoading(false);
        }
    }

    async function cancelActivation(id, index) {
        try {
            setIndexCancel(index);
            setLoadingCancel(true);
            setErrorApiCancel(false);
            const token = await getTokenAsyncStorage();
            await apiAxios.post(`/user/apiServicos/cancel/activation/${id}`, {}, { headers: { 'Authorization' : `Bearer ${token}`}});
            await user();
            setLoadingCancel(false);
            handleClickSnackBar({vertical: 'bottom', horizontal: 'left'});

        } catch(e) {
            setErrorApiCancel(true);
            setLoadingCancel(false);
            handleClickSnackBar({vertical: 'bottom', horizontal: 'left' });
        }
    }

    function handleClickSnackBar(newState) {
        setState({ openSnackBar: true, ...newState });
    };
    
    function handleCloseSnackBar() {
        setState({ ...state, openSnackBar: false });
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                {/* Render Breadcrumb */}
                <Breadcrumbs
                    title={props.t("Suas Ativações")}
                    breadcrumbItem={props.t("Suas Ativações")}
                />
                {
                    loading ?
                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '3rem', marginBottom: '3rem' }}>
                            <CircularProgress />
                        </div>
                    :
                        smsList.length == 0 ?
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                            Você ainda não possue ativações!
                        </div>
                    :
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 500 }} aria-label="caption table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">ID</TableCell>
                                    <TableCell align="center">Serviço</TableCell>
                                    <TableCell align="center">Número</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">Código SMS</TableCell>
                                    <TableCell align="center">Tempo</TableCell>
                                    <TableCell align="center">Ação</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {smsList.map((smsDTO, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="center">
                                            {
                                                smsDTO.idActivation
                                            }
                                        </TableCell>
                                        <TableCell align="center">
                                            <img style={{ width: '2rem', height: '2rem' }} src={`/img/servicesImg/${smsDTO.aliasService}0.png`} alt="..." />
                                        </TableCell>
                                        <TableCell align="center">
                                            {
                                                maskCell(smsDTO.numberActivation)
                                            }
                                        </TableCell>
                                        <TableCell align="center">
                                            {
                                                smsDTO.status
                                            }
                                        </TableCell>
                                        <TableCell align="center">
                                            {
                                                smsDTO.smsList.length == 0 ?
                                                    <CircularProgress size={30}/>
                                                :
                                                    smsDTO.smsList[0]
                                            }
                                        </TableCell>
                                        <TableCell align="center">
                                            {
                                                smsDTO.min == -1 ? "Concluído" : smsDTO.min + " min"
                                            }
                                        </TableCell>
                                        <TableCell align="center">
                                            {
                                                smsDTO.smsList.length == 0 ?
                                                    loadingCancel && index == indexCancel ?
                                                        <CircularProgress size={30} color="error"/>
                                                    :
                                                        <Button
                                                            variant="contained"
                                                            color="error"
                                                            onClick={() => cancelActivation(smsDTO.idActivation, index)}
                                                        >
                                                            <CloseIcon />
                                                        </Button>
                                                :
                                                    <>
                                                    <Button
                                                        variant="contained"
                                                        color="success"
                                                        sx={{ ml: 1, mt: 1 }}
                                                    >
                                                        <CheckIcon />
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        sx={{ ml: 1, mt: 1 }}
                                                    >
                                                        <ReplayIcon />
                                                    </Button>
                                                    </>
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            </Table>
                        </TableContainer>
                }
                </Container>
            </div>
            <Snackbar
                open={openSnackBar}
                autoHideDuration={6000}
                onClose={handleCloseSnackBar}
                anchorOrigin={{ vertical, horizontal }}
                key={vertical + horizontal}
            >
                <Alert onClose={handleCloseSnackBar} severity={errorApiCancel ? "error" : "success"} sx={{ width: '100%' }}>
                    { errorApiCancel ? errorMsgCancel : `Cancelamento efetuado com sucesso!`}
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
};

Activations.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Activations);