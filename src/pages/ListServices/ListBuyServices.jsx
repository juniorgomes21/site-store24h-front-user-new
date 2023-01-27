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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { CircularProgress } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import apiAxios from "../../services/axiosApi";
import AuthContext from "../../Context/auth";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ListBuyServices = props => {

    //meta title
    document.title="store24h | Lista de Serviços";
    const [expanded, setExpanded] = useState(false);

    const { token } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingServices, setLoadingServices] = useState(true);
    const [serviceList, setServiceList] = useState([]);
    const [itemPer, setItemPer] = useState({});
    //error api
    const [errorApi, setErrorApi] = useState(false);
    const [errorMsg, setErrorMsg] = useState('Ops, algo deu errado tente novamente!');
    //Pagination
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);
    //SnackBar
    const [state, setState] = useState({
      openSnackBar: false,
      vertical: 'top',
      horizontal: 'center',
    });

    const { vertical, horizontal, openSnackBar } = state;

    useEffect(() => {
        getService();
    }, [page])
    
    async function getService() {
        try {
          const response = await apiAxios.get(`/user/apiServicos/getAllServices?page=${page > 0 ? page - 1 : page}`);
          setServiceList(response.data.content);
          setTotalPages(response.data.totalPages);
          setLoadingServices(false);
        } catch(e) {
          console.log("getServices", e);
          setLoadingServices(false);
        }
    }
    
    function handleChange(_event, value) {
        setPage(value);
    };
    
    function handleClickOpen(item) {
        setItemPer(item);
        setOpen(true);
    }
    
    function handleClose() {
        setOpen(false);
    }
    
    async function compraServico(id, serviceName) {
      try {
          setLoading(true);
          setErrorApi(false);
          const response = await apiAxios.post(`/user/apiServicos/comprarServico/${id}`, { "serviceName": serviceName }, { headers: { 'Authorization' : `Bearer ${token}`}});
          if(response.data == "NO_NUMBERS" || response.data == "NO_BALANCE") {
            if(response.data == "NO_NUMBERS") {
              setErrorMsg("Não tem números disponíveis para este serviço no momento!");
            }
            setErrorApi(true);
            handleClickSnackBar({vertical: 'top', horizontal: 'center' });
            setLoading(false);
            return;
          }
          setOpen(false);
          handleClickSnackBar({vertical: 'top', horizontal: 'center' });
          setLoading(false);
    
        } catch(e) {
          console.log("compraServico", e);
          setErrorApi(true);
          handleClickSnackBar({vertical: 'top', horizontal: 'center' });
          setLoading(false);
        }
    }
    
    function handleClickSnackBar(newState) {
        setState({ openSnackBar: true, ...newState });
    };
    
    function handleCloseSnackBar() {
        setState({ ...state, openSnackBar: false });
    };

    function formatPrice(price) {
      let priceString = 'R$ ' + price?.toFixed(2);

      return priceString;
    }

    function getImg(name) {
       return `/img/servicesImg/${name}0.png`;
    }

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    return (
        <React.Fragment>
        <div className="page-content">
            <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs
                title={props.t("Lista de Serviços")}
                breadcrumbItem={props.t("Lista de Serviços")}
            />
            {
                loadingServices ?
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '3rem', marginBottom: '3rem' }}>
                  <CircularProgress />
                </div>
                :
                <div style={{ display: 'grid', justifyItems: 'center', width: '100%' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', width: '95%'}}>
                    {serviceList.map((item, index) => (
                        <div
                            key={index}
                            style={{ display: 'flex', width: '20rem', height: '4rem', background: '#d3d3d3', marginLeft: '2rem', marginBottom: '2rem', alignItems: 'center' }}
                            onClick={() => handleClickOpen(item)}
                        >
                            <div style={{ marginLeft: '1rem'}}>
                            <img src={getImg(item.alias)} alt="naadad" style={{ width: '2rem', height: '2rem'}}/>
                            </div>
                            <div style={{ display: 'flex', marginLeft: '1rem', alignItems: 'center'}}>
                            <p style={{ fontWeight: 'bold', margin: 0 }}>{item.alias} -</p><p style={{ marginLeft: '0.3rem', margin: 0}}> {item.name}</p>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            }
            {
                !serviceList == 0 && 
                  <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Stack spacing={2}>
                        <Pagination count={totalPages} color="primary" page={page == 0 ? 1 : page} onChange={handleChange}/>
                    </Stack>
                  </div>
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
          <Alert onClose={handleCloseSnackBar} severity={errorApi ? "error" : "success"} sx={{ width: '100%' }}>
            { errorApi ? errorMsg : `Sua compra foi Realizada com Sucesso!`}
          </Alert>
        </Snackbar>
        <div>
            <Dialog
              open={open}
              onClose={handleClose}
              maxWidth={false}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Serviço"}{" "}{itemPer.nomeServico}
              </DialogTitle>
              <DialogContent style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ display: 'flex' }}>
                    <div >
                      <TextField
                        id="standard-basic"
                        label="País"
                        value="Brasil"
                        variant="standard"
                        disabled
                      />
                    </div>
                    <div style={{ marginLeft: '2rem' }}>
                      <TextField
                        id="standard-basic"
                        label="preço do serviço"
                        value={formatPrice(itemPer.price)}
                        variant="standard"
                      />
                    </div>
                  </div>
                  <div style={{ marginLeft: '2rem' }}>
                    {
                      loading ?
                        <Button
                          sx={{ ml: '1.3rem', mr: '1.3rem' }}
                        >
                          <CircularProgress size={35} />
                        </Button>
                      :
                        <Button
                          variant="contained"
                          color='success'
                          onClick={() => {compraServico(itemPer.id, itemPer.alias)}}
                        >
                          Comprar
                        </Button>
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

ListBuyServices.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(ListBuyServices);