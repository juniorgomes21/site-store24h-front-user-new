import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
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

//i18n
import { withTranslation } from "react-i18next";

//My
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AuthContext from "../../Context/auth";

const Dashboard = props => {
  const { logado } = useContext(AuthContext);
  const [hora, setHora] = useState('');
  const [operadora, setOperadora] = useState('');
  const [value, setValue] = useState(null);

  const handleChange = (event) => {
    setHora(event.target.value);
  };

  useEffect(() => {
    console.log("Dashboard", logado);
   }, [])

  //meta title
  document.title="Dashboard | apcodes - Vite React Admin & Dashboard Template";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Dashboardsxx")}
            breadcrumbItem={props.t("Dashboard")}
          />
            <div style={{ marginBottom: '2%'}}>
            <p>Bem-vindo à store24h conta pessoal da plataforma </p>
            <p>Para estar ciente do trabalho da plataforma e das notícias recentes do desenvolvimento, inscreva-se no canal privado de notícias onde publicamos informações sobre as principais atualizações e notícias que afetam diretamente os usuários.</p>
            </div>
            <div>
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
            </div>
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
        </Container>
      </div>
    </React.Fragment>
  );
};

Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Dashboard);


