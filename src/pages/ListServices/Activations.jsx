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

const Activations = props => {

    //meta title
    document.title="store24h | Lista de Serviços";
    const [smsList, setSmsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lengthList, setLengthList] = useState(0);
    //Messagens
    const [loadingServices, setLoadingServices] = useState(true);
    const [serviceList, setServiceList] = useState([]);
    const [itemPer, setItemPer] = useState({});

    useEffect(() => {
      user();
      getMessages();
      setInterval(user, 15000);
      setInterval(getMessages, 15000);
    }, [])
  
    async function user() {
        try {
          const token = await getTokenAsyncStorage();
          const response = await apiAxios.post('/user/apiServicos/activation', { "quantityActivation": smsList.length }, { headers: { 'Authorization' : `Bearer ${token}`}});
          const listActivations = response.data;
          if(listActivations.length == 0) {
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

    //Messagens

    async function getMessages() {
        console.log("chamou");
        try {
            const token = await getTokenAsyncStorage();
            const response = await apiAxios.get("/user/apiServicos/smsuser", { headers: { 'Authorization' : `Bearer ${token}`}});
            console.log("response.data", response.data);
            const smsListX = response.data;
            if(smsListX.length > 0) {
              setServiceList(smsListX);
            }
            setLoadingServices(false);

        } catch(e) {
            console.log("error getMessages", e);
            setLoadingServices(false);
        }
    }

    function getMsg(index) {
        const sms = serviceList[index];
        console.log(serviceList.length);
        console.log("index", index);
        console.log(sms);
        if(sms == undefined) {
            return "Você ainda não recebeu mensagem desse serviço, aguarde por favor!";
        } else {
            return sms.smsList;
        }
    }

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
                            <caption>A basic table example with a caption</caption>
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
                                                    smsDTO.smsList
                                            }
                                        </TableCell>
                                        <TableCell align="center">
                                            Time
                                        </TableCell>
                                        <TableCell align="center">
                                            {
                                                smsDTO.smsList.length == 0 ?
                                                    <Button
                                                        variant="contained"
                                                        color="error"
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
        </React.Fragment>
    );
};

Activations.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Activations);