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

  function createData(id, email, direitos, acoes, alerta) {
    return { id, email, direitos, acoes, alerta };
  }

  const rows = [
    createData('1', 'conta11@gmail.com', 'Funciona', 'ações', '0'),
    createData('2', 'conta11@gmail.com', 'Funciona', 'ações', '0'),
    createData('3', 'conta11@gmail.com', 'Funciona', 'ações', '0'),
    createData('4', 'conta11@gmail.com', 'Funciona', 'ações', '0'),
    createData('5', 'conta11@gmail.com', 'Funciona', 'ações', '0'),
    createData('6', 'conta11@gmail.com', 'Funciona', 'ações', '0'),
    createData('7', 'conta11@gmail.com', 'Funciona', 'ações', '0'),
    createData('8', 'conta11@gmail.com', 'Funciona', 'ações', '0'),
  ];

const Dashboard = props => {

    //meta title
    document.title="store24h - Agente | Dashboard";

    return (
        <React.Fragment>
        <div className="page-content">
            <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs
                title={props.t("Dashboard")}
                breadcrumbItem={props.t("Dashboard")}
            />
                <div style={{ marginBottom: '2%'}}>
                    <p>Para gerenciar o software, você deve criar uma conta de operador.</p>
                    <p>Os operadores são seus funcionários, se você não tiver funcionários, precisará de uma conta para trabalhar com o software e o complexo de hardware.</p>
                </div>
                <Button variant="outlined" style={{ marginLeft: '0.5%' }} >Criar um novo Operador</Button>
                <TableContainer component={Paper} sx={{ mt: '2rem' }}>
                    <Table sx={{ minWidth: 1300 }} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Id</StyledTableCell>
                            <StyledTableCell align="center">Email</StyledTableCell>
                            <StyledTableCell align="center">Direitos</StyledTableCell>
                            <StyledTableCell align="center">Ação</StyledTableCell>
                            <StyledTableCell align="center">Alerta</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell align="center">{row.id}</StyledTableCell>
                                <StyledTableCell align="center">{row.email}</StyledTableCell>
                                <StyledTableCell align="center">{row.direitos}</StyledTableCell>
                                <StyledTableCell align="center">{row.acoes}</StyledTableCell>
                                <StyledTableCell align="center">{row.alerta}</StyledTableCell>
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

Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Dashboard);
