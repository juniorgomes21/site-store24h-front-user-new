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
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';

// Date
import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControlLabel from '@mui/material/FormControlLabel';

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

function createData(id, operador, soma, modelo, encontro, descricao) {
    return { id, operador, soma, modelo, encontro, descricao };
}

const rows = [
    createData('1', 'conta8@gmail.com ', 'R$  +0,50', 'Ativação#0230342', '2022-09-08 17:30:03', '5585996117290 nf'),
    createData('2', 'conta8@gmail.com ', 'R$  +0,50', 'Ativação#0230342', '2022-09-08 17:30:03', '5519971636069 ub'),
    createData('3', 'conta8@gmail.com ', 'R$  +0,50', 'Ativação#0230342', '2022-09-08 17:30:03', '5512981953927 wb'),
    createData('4', 'conta8@gmail.com ', 'R$  +0,50', 'Ativação#0230342', '2022-09-08 17:30:03', '5512982485385 fb'),
    createData('5', 'conta8@gmail.com ', 'R$  +0,50', 'Ativação#0230342', '2022-09-08 17:30:03', '5585996531094 fb'),
    createData('6', 'conta8@gmail.com ', 'R$  +0,50', 'Ativação#0230342', '2022-09-08 17:30:03', '5519999696583 fb'),
    createData('7', 'conta8@gmail.com ', 'R$  +0,50', 'Ativação#0230342', '2022-09-08 17:30:03', '5521996188219 d'),
    createData('8', 'conta8@gmail.com ', 'R$  +0,50', 'Ativação#0230342', '2022-09-08 17:30:03', '5567999888741 o'),
];

const Transactions = props => {

    //meta title
    document.title="store24h - Agente | Transações";
    const [value, setValue] = useState(null);
    const [modelo, setModelo] = useState('');

    function handleChangeModelo(event) {
        setModelo(event.target.value);
    };

    return (
        <React.Fragment>
        <div className="page-content">
            <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs
                title={props.t("Transações")}
                breadcrumbItem={props.t("Transações")}
            />
                <div style={{ marginBottom: '2%'}}>
                    <p>Defina o período para obter todas as transações.</p>
                </div>
                <div style={{ display:'flex', alignItems: 'center' }}>
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
                        <Button variant="outlined" style={{ marginLeft: '0.5%' }} >Solicitar</Button>
                    </div>
                </div>
                <FormControl sx={{ m: 1, minWidth: 180 }}>
                    <InputLabel id="demo-simple-select-label">Escolha um filtro</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={modelo}
                    label="Escolha um filtro"
                    onChange={handleChangeModelo}
                    >
                        <MenuItem value={10}>Ativações</MenuItem>
                        <MenuItem value={10}>de saldo</MenuItem>
                        <MenuItem value={20}>Pagamentos</MenuItem>
                        <MenuItem value={20}>Transações API</MenuItem>
                        <MenuItem value={20}>referência</MenuItem>
                        <MenuItem value={20}>comissão de</MenuItem>
                        <MenuItem value={20}>conta4@gmail.com</MenuItem>
                    </Select>
                </FormControl>
                <p>Total ganho para o período - R$ 11.042,500000000002.</p>
                <p>antonio.digital.company@gmail.com - RUB 98,79</p>
                <p>conta2@gmail.com - R$ 2471,84</p>
                <p>conta3@gmail.com - R$ 1471,84</p>
                <p>conta4@gmail.com - R$ 2471,84</p>
                <p>conta5@gmail.com - R$ 1171,84</p>
                <p>conta6@gmail.com - R$ 2471,84</p>
                <p>conta7@gmail.com - R$ 871,84</p>
                <p>conta8@gmail.com - R$ 5671,84</p>
                <p>Total retirado para o período - 0 esfregar.</p>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 1300 }} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Id</StyledTableCell>
                            <StyledTableCell align="center">Operador</StyledTableCell>
                            <StyledTableCell align="center">Soma</StyledTableCell>
                            <StyledTableCell align="center">Modelo</StyledTableCell>
                            <StyledTableCell align="center">Encontro</StyledTableCell>
                            <StyledTableCell align="center">Descrição</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell align="center">{row.id}</StyledTableCell>
                                <StyledTableCell align="center">{row.operador}</StyledTableCell>
                                <StyledTableCell align="center">{row.soma}</StyledTableCell>
                                <StyledTableCell align="center">{row.modelo}</StyledTableCell>
                                <StyledTableCell align="center">{row.encontro}</StyledTableCell>
                                <StyledTableCell align="center">{row.descricao}</StyledTableCell>
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

Transactions.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Transactions);
