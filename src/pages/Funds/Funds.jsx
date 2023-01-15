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
import Button from '@mui/material/Button';

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

function createData(id, sistemaPagamento, bolsa, soma, encontro, status) {
    return { id, sistemaPagamento, bolsa, soma, encontro, status };
}

const rows = [
    createData('1', 'chip', '56450', 'R$ 3192,00', '2022-09-08 17:30:03', 'com sucesso'),
    createData('2', 'chip', '56450', 'R$ 14187,00', '2022-09-08 17:30:03', 'com sucesso'),
    createData('3', 'chip', '56450', 'R$ 11.458,00', '2022-09-08 17:30:03', 'com sucesso'),
    createData('4', 'chip', '56450', 'R$ 20788,00', '2022-09-08 17:30:03', 'com sucesso'),
    createData('5', 'chip', '56450', 'R$ 3.294,00', '2022-09-08 17:30:03', 'com sucesso'),
    createData('6', 'chip', '56450', 'R$ 6597,00', '2022-09-08 17:30:03', 'com sucesso'),
    createData('7', 'chip', '56450', 'R$ 5406,00', '2022-09-08 17:30:03', 'com sucesso'),
    createData('8', 'chip', '56450', 'R$ 29494,00', '2022-09-08 17:30:03', 'com sucesso'),
];

const Funds = props => {

    //meta title
    document.title="store24h - Agente | Fundos";

    return (
        <React.Fragment>
        <div className="page-content">
            <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs
                title={props.t("Fundos")}
                breadcrumbItem={props.t("Fundos")}
            />
                <div style={{ marginBottom: '2%'}}>
                    <p>Nesta página, você pode solicitar a retirada de fundos em USD a qualquer momento conveniente.</p>
                    <p>Os pagamentos são processados ​​em 24 horas</p>
                    <a>O valor atualmente disponível para pagamentos é de 0,00 $.</a>
                </div>
                <div>
                    <Button variant="outlined" style={{ marginLeft: '0.5%' }}>Solicitar saque de Dinheiro</Button>
                </div>
                <TableContainer component={Paper} sx={{ mt: '2rem' }}>
                    <Table sx={{ minWidth: 1300 }} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Id</StyledTableCell>
                            <StyledTableCell align="center">Sistema de Pagamento</StyledTableCell>
                            <StyledTableCell align="center">Bolsa</StyledTableCell>
                            <StyledTableCell align="center">Soma</StyledTableCell>
                            <StyledTableCell align="center">Encontro</StyledTableCell>
                            <StyledTableCell align="center">Status</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell align="center">{row.id}</StyledTableCell>
                                <StyledTableCell align="center">{row.sistemaPagamento}</StyledTableCell>
                                <StyledTableCell align="center">{row.bolsa}</StyledTableCell>
                                <StyledTableCell align="center">{row.soma}</StyledTableCell>
                                <StyledTableCell align="center">{row.encontro}</StyledTableCell>
                                <StyledTableCell align="center">{row.status}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Stack spacing={2} style={{ width: '100%', marginTop: '2%', alignItems: 'center' }}>
                    <Pagination count={10} color="primary" />
                </Stack>
            </Container>
        </div>
        </React.Fragment>
    );
};

Funds.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Funds);
