import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  Container,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";

//My
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// Table
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

function createData(id, servico,  telefone, preco, recompensa, status, encontro, operador, idSim, porta) {
    return { id, servico,  telefone, preco, recompensa, status, encontro, operador, idSim, porta };
}


const rows = [
    createData('1172379452', 'wp', '5585996118120', 'R$ 22,00', '9,88 esfregar.', 'status', '2022-09-08 17:20:59', 'conta7@gmail.com', '89550320000016412281', '152'),
    createData('1172379363', 'za', '5585996193632', 'R$ 33,30', '0,50 esfregar.', 'status', '2022-09-08 17:20:59', 'conta1@gmail.com', '89550320000016412281', '143'),
    createData('1172379254', 'if', '5585996115702', 'R$ 12,50', '0,50 esfregar.', 'status', '2022-09-08 17:20:59', 'conta7@gmail.com', '89550320000016412281', '123'),
    createData('1172379246', 'yt', '5585999903315', 'R$ 33,30', '0,50 esfregar.', 'status', '2022-09-08 17:20:59', 'conta3@gmail.com', '89550320000016412281', '111'),
    createData('1172378975', 'if', '5585996115702', 'R$ 33,30', '9,88 esfregar.', 'status', '2022-09-08 17:20:59', 'conta6@gmail.com', '89550320000016412281', '100'),
    createData('1172377439', 'if', '5585999903315', 'R$ 12,50', '3,00 esfregar.', 'status', '2022-09-08 17:20:59', 'conta5@gmail.com', '89550320000016412281', '152'),
    createData('1172378283', 'if', '5585996193632', 'R$ 22,00', '3,00 esfregar.', 'status', '2022-09-08 17:20:59', 'conta8@gmail.com', '89550320000016412281', '122'),
    createData('1172378033', 'if', '5585996118120', 'R$ 33,30', '9,88 esfregar.', 'status', '2022-09-08 17:20:59', 'conta7@gmail.com', '89550320000016412281', '152'),
];

const HistoricRent = props => {

    //meta title
    document.title="store24h - Agente | Histórico de aluguel";
    const [value, setValue] = useState(null);

    return (
        <React.Fragment>
        <div className="page-content">
            <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs
                title={props.t("Histórico de aluguel")}
                breadcrumbItem={props.t("Histórico_De_aluguel")}
            />
                <div>Defina o período para obter todas as ativações:</div>
                <div style={{ display:'flex', alignItems: 'center', marginTop: '2rem' }}>
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ m: 1 }}>
                        <DatePicker
                            label="Início do período"
                            value={value}
                            onChange={(newValue) => {
                            setValue(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        </LocalizationProvider>
                    </div>
                    <div style={{ marginLeft: '0.5%' }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Fim do período"
                            value={value}
                            onChange={(newValue) => {
                            setValue(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        </LocalizationProvider>
                    </div>
                    <div style={{ marginLeft: '0.5%' }}>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Apenas encaminhamento de chamadas" />
                    </div>
                    <Button variant="outlined" style={{ marginLeft: '0.5%' }} >Solicitar</Button>
                </div>
                <TableContainer component={Paper} sx={{ mt: '2rem' }}>
                    <Table sx={{ minWidth: 1300 }} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">id</StyledTableCell>
                            <StyledTableCell align="center">Serviço</StyledTableCell>
                            <StyledTableCell align="center">Telefone</StyledTableCell>
                            <StyledTableCell align="center">Preço</StyledTableCell>
                            <StyledTableCell align="center">Recompensa</StyledTableCell>
                            <StyledTableCell align="center">Status</StyledTableCell>
                            <StyledTableCell align="center">Encontro</StyledTableCell>
                            <StyledTableCell align="center">Operador</StyledTableCell>
                            <StyledTableCell align="center">Id SIM</StyledTableCell>
                            <StyledTableCell align="center">Porta</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell align="center">{row.id}</StyledTableCell>
                                <StyledTableCell align="center">{row.servico}</StyledTableCell>
                                <StyledTableCell align="center">{row.telefone}</StyledTableCell>
                                <StyledTableCell align="center">{row.preco}</StyledTableCell>
                                <StyledTableCell align="center">{row.recompensa}</StyledTableCell>
                                <StyledTableCell align="center">{row.status}</StyledTableCell>
                                <StyledTableCell align="center">{row.encontro}</StyledTableCell>
                                <StyledTableCell align="center">{row.operador}</StyledTableCell>
                                <StyledTableCell align="center">{row.idSim}</StyledTableCell>
                                <StyledTableCell align="center">{row.porta}</StyledTableCell>
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

HistoricRent.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(HistoricRent);
