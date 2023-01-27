import PropTypes from "prop-types";
import React, { useEffect, useState} from "react";
import {
  Container,
} from "reactstrap";
    function getImg(name) {
       return `/img/servicesImg/${name}0.png`;
    }

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";

//My
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';
import { getTokenAsyncStorage } from "../../isValidToken/isValidToken";
import apiAxios from "../../services/axiosApi";

const Messages = props => {

    //meta title
    document.title="store24h - Agente | Mensagens";
    
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [loadingServices, setLoadingServices] = useState(true);
    const [serviceList, setServiceList] = useState([]);
    const [itemPer, setItemPer] = useState({});
    
    useEffect(() => {
        getMessages();
        setInterval(getMessages, 15000);
    }, [])

    async function getMessages() {
        try {
            const token = await getTokenAsyncStorage();
            const response = await apiAxios.get("/user/apiServicos/smsuser", { headers: { 'Authorization' : `Bearer ${token}`}});
            const smsList = response.data;
            if(smsList.length > 0) {
              setServiceList(smsList);
            }
            setLoadingServices(false);

        } catch(e) {
            console.log("error getMessages", e);
            setLoadingServices(false);
        }
    }

    function handleClickOpen(item) {
        setItemPer(item);
        setOpen(true);
    }

    function handleClickOpen(item) {
        setItemPer(item);
        setOpen(true);
    }
    
    function handleClose() {
        setOpen(false);
    }

    function getImg(name) {
       return `/img/servicesImg/${name}0.png`;
    }

    return (
        <React.Fragment>
        <div className="page-content">
            <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs
                title={props.t("Mensagens")}
                breadcrumbItem={props.t("Mensagens")}
            />
            <p>Aqui estão todas suas mensagens enviados pelo serviços que vc comprou.</p>
            {
                loadingServices ?
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '3rem', marginBottom: '3rem' }}>
                  <CircularProgress />
                </div>
                : serviceList.length != 0 ?
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '3rem'}}>
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', width: '95%'}}>
                    { serviceList.map((item, index) => (
                        <div
                            key={index}
                            style={{ display: 'flex', width: '20rem', height: '4rem', background: '#d3d3d3', marginLeft: '2rem', marginBottom: '2rem', alignItems: 'center' }}
                            onClick={() => handleClickOpen(item)}
                        >
                            <div style={{ marginLeft: '1rem'}}>
                            <img src={getImg(item.aliasService)} alt="naadad" style={{ width: '2rem', height: '2rem'}}/>
                            </div>
                            <div style={{ display: 'flex', marginLeft: '1rem', alignItems: 'center'}}>
                              <p style={{ fontWeight: 'bold', margin: 0 }}>{item.aliasService} -</p><p style={{ marginLeft: '0.3rem', margin: 0}}> {item.nameService}</p>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
                : 
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem'}}>
                  <p style={{ fontSize: '20px' }}>Você ainda não recebeu nenhum sms!</p>
                </div>
            }
            </Container>
        </div>
        <div>
            <Dialog
              open={open}
              onClose={handleClose}
              maxWidth={false}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <DialogTitle id="alert-dialog-title">
                {"Mensagem de " + itemPer.nameService}{" "}
              </DialogTitle>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={getImg(itemPer.aliasService)} alt="naadad" style={{ width: '2rem', height: '2rem', marginRight: '1rem'}}/>
              </div>
            </div>
              <DialogContent style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ display: 'flex' }}>
                    {
                        itemPer.smsList == "" ?

                        "Você ainda não recebeu mensagem desse serviço, aguarde por favor!"
                        :
                        itemPer.smsList
                    }
                  </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} autoFocus>
                  Fechar
                </Button>
              </DialogActions>
            </Dialog>
        </div>
        </React.Fragment>
    );
};

Messages.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Messages);