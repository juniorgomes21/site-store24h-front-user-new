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
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const GraphicsOperator = props => {

    //meta title
    document.title="store24h - Agente | Gráficos&Operadoras ";
    const [hora, setHora] = useState('');
    const [operadora, setOperadora] = useState('');
    const [value, setValue] = useState(null);
  
    const handleChange = (event) => {
      setHora(event.target.value);
    };

    return (
        <React.Fragment>
        <div className="page-content">
            <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs
                title={props.t("Gráficos&Operadoras")}
                breadcrumbItem={props.t("Gráficos_Operadoras")}
            />
                <p>Dois gráficos são apresentados nesta página. A primeira mostra a soma que os operadores escolhidos ganharam. O segundo mostra o número de ativações bem-sucedidas. As estatísticas estão disponíveis desde 14.10.2020.</p>
                <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-label">Hora(h)</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={hora}
                        label="hora"
                        onChange={handleChange}
                        >
                        <MenuItem value={10}>6 horas</MenuItem>
                        <MenuItem value={20}>12 horas</MenuItem>
                        <MenuItem value={30}>1 dia</MenuItem>
                        <MenuItem value={30}>2 dias</MenuItem>
                        <MenuItem value={30}>4 dias</MenuItem>
                        <MenuItem value={30}>1 semana</MenuItem>
                        <MenuItem value={30}>10 dias</MenuItem>
                        <MenuItem value={30}>2 semanas</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-label">Operadora</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={operadora}
                        label="operadora"
                        onChange={handleChange}
                        >
                        <MenuItem value={10}>oi</MenuItem>
                        <MenuItem value={10}>Tim</MenuItem>
                        <MenuItem value={20}>Vivo</MenuItem>
                        <MenuItem value={30}>Claro</MenuItem>
                        </Select>
                    </FormControl>
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
                    <Button variant="outlined" style={{ marginLeft: '0.5%' }} >Solicitar</Button>
                </div>
                <Col lg={12}>
                    <Card>
                        <CardBody>
                            <div className="d-sm-flex flex-wrap">
                                <h4 className="card-title mb-4">Statistics Applications</h4>
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
                <div style={{ display: 'flex', width: '100%', alignItems: 'center', flexDirection: 'column'}}>
                    <p>Número de ativações bem-sucedidas</p>
                    <p>Average number of activations per day</p>
                </div>
                <Col lg={12}>
                    <Card>
                        <CardBody>
                            <div className="d-sm-flex flex-wrap">
                                <h4 className="card-title mb-4">Statistics Applications</h4>
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
            </Container>
        </div>
        </React.Fragment>
    );
};

GraphicsOperator.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(GraphicsOperator);