import PropTypes from "prop-types";
import React, { useEffect, useState }from "react";
import {
  Container,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";
import apiAxios from "../../services/axiosApi";
//My
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Snackbar from '@mui/material/Snackbar';
import Button from "@mui/material/Button";
import MuiAlert from '@mui/material/Alert';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
    border: 0,
    },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ActivityService = props => {

    //meta title
    document.title="store24h - Agente | ActivityService";
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [serviceList, setServiceList] = useState([]);
    const [serviceModify, setServiceModify] = useState([]);
    const [loadingServices, setLoadingServices] = useState(true);
    //SnackBar
    const [state, setState] = useState({
        openSnackBar: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const { vertical, horizontal, openSnackBar } = state;

    useEffect(() => {
        getService();
    }, [])

    async function getService() {
        try {
          const response = await apiAxios.get(`/user/apiServicos/getAllServices`);
          setServiceList(response.data);
          

        } catch(e) {
          setLoadingServices(false);
        }
    }

    async function apiSetActivity() {
        try {
            if(serviceModify.length > 0) {
                await apiAxios.post('/user/apiServicos/setActivity/services', {aliasServices: serviceModify});
                window.location.reload();
            }
        } catch(e) {
            handleClickSnackBar({vertical: 'top', horizontal: 'center' });
            console.log("apiSetActivity", e);
        }
    }

    function setAlias(alias) {
        const index = serviceModify.indexOf(alias);

        if (index !== -1) {
            // Remove o alias existente
            serviceModify.splice(index, 1);
        } else {
            // Adiciona o alias à lista
            serviceModify.push(alias);
        }

        console.log(serviceModify);
    }

    function getImg(name) {
        return `/img/servicesImg/${name}0.png`;
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
                title={props.t("ActivityService")}
                breadcrumbItem={props.t("ActivityService")}
            />
                <div style={{ display: 'flex', justifyContent: 'end', width: '100%', marginBottom: '2rem' }}>
                    <Button
                        variant="contained"
                        onClick={apiSetActivity}
                    >
                        Salvar Todos
                    </Button>
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell align="center"></StyledTableCell>
                            <StyledTableCell align="center">Nome</StyledTableCell>
                            <StyledTableCell align="center">Alias</StyledTableCell>
                            <StyledTableCell align="center">Ativo</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                serviceList.map((row, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell align="center">
                                            <img src={getImg(row.alias)} alt="..." style={{ width: '1.5rem', height: '1.5rem'}}/>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{row.name}</StyledTableCell>
                                        <StyledTableCell align="center">{row.alias}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Checkbox
                                                {...label}
                                                defaultChecked={row.activity}
                                                onClick={() => setAlias(row.alias)}
                                            />
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
        <Snackbar
            open={openSnackBar}
            autoHideDuration={6000}
            onClose={handleCloseSnackBar}
            anchorOrigin={{ vertical, horizontal }}
            key={vertical + horizontal}
        >
            <Alert onClose={handleCloseSnackBar} severity="error" sx={{ width: '100%' }}>
                { "error"}
            </Alert>
        </Snackbar>
        </React.Fragment>
    );
};

ActivityService.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(ActivityService);