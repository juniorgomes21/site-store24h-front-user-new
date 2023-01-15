import PropTypes from "prop-types";
import React from "react";
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
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

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
  
function createData(idKey, soma) {
    return { idKey, soma };
}
  
  
const rows = [
    createData('1172379452', '+2161,59 R$'),
    createData('1172379363', '+3120,00 R$'),
    createData('1172379254', '+4.228,58 R$'),
];

const Identification = props => {

    //meta title
    document.title="store24h - Agente | Identificação";

    return (
        <React.Fragment>
        <div className="page-content">
            <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs
                title={props.t("Identificação")}
                breadcrumbItem={props.t("Identificação")}
            />
                <p>Congelamos o trabalho das chaves de API. Todo o dinheiro deles foi transferido para o seu saldo.</p>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 1300 }} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">A chave de identificação</StyledTableCell>
                            <StyledTableCell align="center">Soma</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.idKey}>
                                <StyledTableCell align="center">{row.idKey}</StyledTableCell>
                                <StyledTableCell align="center">{row.soma}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
        </React.Fragment>
    );
};

Identification.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Identification);