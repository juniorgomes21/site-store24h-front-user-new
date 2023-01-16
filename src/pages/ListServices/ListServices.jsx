import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
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
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { CircularProgress } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import apiAxios from "../../services/axiosApi";


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ListServices = props => {

    //meta title
    document.title="store24h | Lista de Serviços";

    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loadingServices, setLoadingServices] = useState(true);
    const [serviceList, setServiceList] = useState([]);
    const [itemPer, setItemPer] = useState({});
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
    
    async function compraServico(id) {
        setLoading(true)
        try {
    
          await apiAxios.post(`/user/apiServicos/comprarServico/${id}`, {});
    
          setTimeout(() => {
            setOpen(false);
            handleClickSnackBar({vertical: 'top', horizontal: 'center' });
            setLoading(false);
          }, 2000)
    
        } catch(e) {
    
          setLoading(false);
        }
    }
    
    function handleClickSnackBar(newState) {
        setState({ openSnackBar: true, ...newState });
    };
    
    function handleCloseSnackBar() {
        setState({ ...state, openSnackBar: false });
    };

    function DialogPersonalizado() {

        const item = itemPer;
    
        function formatPrice(price) {
    
          let priceString = 'R$ ' + price?.toFixed(2);
    
          return priceString;
        }
    
        return (
          <div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Serviço"}{" "}{item.nomeServico}
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
                        value={formatPrice(item.price)}
                        variant="standard"
                      />
                    </div>
                  </div>
                  <div style={{ marginLeft: '2rem' }}>
                    {
                      loading ? 
                        <CircularProgress />
                      :
                        <Button
                          variant="contained"
                          color='success'
                          onClick={() => {compraServico(item.id)}}
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
        )
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
                title={props.t("Lista de Serviços")}
                breadcrumbItem={props.t("Lista_de_Serviços")}
            />
            {
                loadingServices ?
                <CircularProgress />
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
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Stack spacing={2}>
                <Pagination count={totalPages} color="primary" page={page == 0 ? 1 : page} onChange={handleChange}/>
            </Stack>
        </div>
            </Container>
        </div>
        <Snackbar
            open={openSnackBar}
            autoHideDuration={6000}
            onClose={handleCloseSnackBar}
            anchorOrigin={{ vertical, horizontal }}
            key={vertical + horizontal}
        >
        <Alert onClose={handleCloseSnackBar} severity="success" sx={{ width: '100%' }}>
          Sua compra foi Realizada com Sucesso! visite a Página "Seriços Comprado" para mais informações!
        </Alert>
        </Snackbar>
        <DialogPersonalizado />
        </React.Fragment>
    );
};

ListServices.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(ListServices);