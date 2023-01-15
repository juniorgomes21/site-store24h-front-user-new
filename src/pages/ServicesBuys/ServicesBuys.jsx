import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import {
  Container,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";
//My
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
//Pagination
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { async } from 'regenerator-runtime';
import { formatarDataDia } from '../../Validation&Formatation/formatation';
import apiAxios from "../../services/axiosApi";

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

const ServicesBuys = props => {

    //meta title
    document.title="store24h - Agente | Dashboard";
    const [listServicos, setListServicos] = useState([]);
    //Pagination
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);

    useEffect(() => {
        getListCompras();
    }, [page])

    function handleChange(_event, value) {
        setPage(value);
    };

    async function getListCompras() {
        try {
            const response = await apiAxios.get(`/apiServicos/getComprasFeitas?page=${page > 0 ? page - 1 : page}`);
            setListServicos(response.data.content);
            setTotalPages(response.data.totalPages);

        } catch(e) {
            console.log("error getListCompras", e);
        }
    }


    return (
        <React.Fragment>
        <div className="page-content">
            <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs
                title={props.t("Dashboard")}
                breadcrumbItem={props.t("Dashboard")}
            />
                <p>Aqui estão todas suas compras.</p>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 1300 }} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Seriço comprado</StyledTableCell>
                            <StyledTableCell align="center">Dia/Hora da compra</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {listServicos.map((row, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell align="center">{row.servico}</StyledTableCell>
                                <StyledTableCell align="center">{formatarDataDia(row.localDateTime)}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Stack spacing={2}>
                        <Pagination count={totalPages} color="primary" page={page == 0 ? 1 : page} onChange={handleChange}/>
                    </Stack>
                </div>
            </Container>
        </div>
        </React.Fragment>
    );
};

ServicesBuys.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(ServicesBuys);