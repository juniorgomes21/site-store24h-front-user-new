import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  Container,
  Col,
  Card,
  CardBody,
  Nav,
  NavItem, 
  NavLink,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { StatisticsApplicationsChart } from '../DashboardJob/JobCharts';
//i18n
import { withTranslation } from "react-i18next";

//My
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { Dayjs } from 'dayjs';
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

function createData(telefone, prazoOn, status, porta, merecido, servico) {
    return { telefone, prazoOn, status, porta, merecido, servico };
}

const rows = [
    createData('5585996118120', '2022-09-08 17:20:59', 'status', '152', '9,88 esfregar.', 'wp'),
    createData('5585996193632', '2022-09-08 17:20:59', 'status', '142', '0,50 esfregar.', 'za'),
    createData('5585996115702', '2022-09-08 17:20:59', 'status', '612', '0,50 esfregar.', 'if'),
    createData('5585999903315', '2022-09-08 17:20:59', 'status', '182', '0,50 esfregar.', 'yt'),
    createData('5585996115702', '2022-09-08 17:20:59', 'status', '722', '3,00 esfregar.', 'if'),
    createData('5585999903315', '2022-09-08 17:20:59', 'status', '102', '9,88 esfregar.', 'if'),
    createData('5585996193632', '2022-09-08 17:20:59', 'status', '512', '3,00 esfregar.', 'if'),
    createData('5585996118120', '2022-09-08 17:20:59', 'status', '262', '9,88 esfregar.', 'if'),
];

const CardSim = props => {

    //meta title
    document.title="store24h - Agente | CardSim";

    const [valueInicial, setValueInicial] = useState(null);
    const [valueFinal, setValueFinal] = useState(null);
    const [hora, setHora] = useState('');
    const [operadora, setOperadora] = useState('');
    const [modelo, setModelo] = useState('');

    const handleChangeHora = (event) => {
        setHora(event.target.value);
    };

    const handleChangeOperadora = (event) => {
        setOperadora(event.target.value);
    };

    const handleChangeModelo = (event) => {
        setModelo(event.target.value);
    };

    return (
        <React.Fragment>
        <div className="page-content">
            <Container fluid>
            {/* Render Breadcrumb */}
                <Breadcrumbs
                    title={props.t("Cartão Sim")}
                    breadcrumbItem={props.t("Cartão_Sim")}
                />
                <div style={{ marginBottom: '2%'}}>
                    <p>Defina o período para obter todos os cartões SIM:</p>
                </div>
                <Col lg={12}>
                    <Card>
                        <CardBody>
                            <div className="d-sm-flex flex-wrap">
                                <h4 className="card-title mb-4">Cartões Sim</h4>
                                <div className="ms-auto">
                                    <Nav pills>
                                        <NavItem>
                                            <NavLink href="#">Week</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="#">Month</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className="active" href="#">Year</NavLink>
                                        </NavItem>
                                    </Nav>
                                </div>
                            </div>
                            <StatisticsApplicationsChart dataColors='["--bs-primary", "--bs-success", "--bs-warning", "--bs-info"]'  dir="ltr" />
                        </CardBody>
                    </Card>
                </Col>
                <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-label">Hora(h)</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={hora}
                        label="Hora(h)"
                        onChange={handleChangeHora}
                        >
                        <MenuItem value={10}>6 horas</MenuItem>
                        <MenuItem value={20}>12 horas</MenuItem>
                        <MenuItem value={30}>1 dia</MenuItem>
                        <MenuItem value={40}>2 dias</MenuItem>
                        <MenuItem value={50}>4 dias</MenuItem>
                        <MenuItem value={60}>1 semana</MenuItem>
                        <MenuItem value={70}>10 dias</MenuItem>
                        <MenuItem value={80}>2 semanas</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-label">Operadora</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={operadora}
                        label="operadora"
                        onChange={handleChangeOperadora}
                        >
                        <MenuItem value={10}>oi</MenuItem>
                        <MenuItem value={20}>Tim</MenuItem>
                        <MenuItem value={30}>Vivo</MenuItem>
                        <MenuItem value={40}>Claro</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-label">Ativação</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={modelo}
                        label="Modelo"
                        onChange={handleChangeModelo}
                        >
                            <MenuItem value={10}>Ativação</MenuItem>
                            <MenuItem value={10}>Ativação + integral</MenuItem>
                            <MenuItem value={20}>aluguel integral</MenuItem>
                        </Select>
                    </FormControl>
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ m: 1 }}>
                        <DatePicker
                            label="Início do período"
                            value={valueInicial}
                            onChange={(newValue) => {
                            setValueInicial(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        </LocalizationProvider>
                    </div>
                    <div style={{ marginLeft: '0.5%' }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Fim do período"
                            value={valueFinal}
                            onChange={(newValue) => {
                            setValueFinal(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        </LocalizationProvider>
                    </div>
                    <Button variant="outlined" style={{ marginLeft: '0.5%' }} >Solicitar</Button>
                </div>
                <div style={{ marginBottom: '2%', marginTop: '2%'}}>
                    <p>Defina o período para obter todos os cartões SIM:</p>
                    <p>Renda média de um cartão SIM no último dia - R$ 37,431572.</p>
                    <p>Uma renda máxima de cartão SIM para o último dia - R$ 178,25.</p>
                    <p>Os usuários ocasionalmente recusam números por diferentes motivos.</p>
                    <p>O store24h inicialmente tenta vender o mesmo serviço até 4 vezes. Depois disso, marcamos como indisponível para venda</p>
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 1300 }} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Número</StyledTableCell>
                            <StyledTableCell align="center">Prazo on-line</StyledTableCell>
                            <StyledTableCell align="center">Starus</StyledTableCell>
                            <StyledTableCell align="center">Porta</StyledTableCell>
                            <StyledTableCell align="center">Merecido</StyledTableCell>
                            <StyledTableCell align="center">Serviços</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.porta}>
                                <StyledTableCell align="center">{row.telefone}</StyledTableCell>
                                <StyledTableCell align="center">{row.prazoOn}</StyledTableCell>
                                <StyledTableCell align="center">{row.status}</StyledTableCell>
                                <StyledTableCell align="center">{row.porta}</StyledTableCell>
                                <StyledTableCell align="center">{row.merecido}</StyledTableCell>
                                <StyledTableCell align="center">{row.servico}</StyledTableCell>
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

CardSim.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(CardSim);
