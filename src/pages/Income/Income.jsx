import PropTypes from "prop-types";
import React,  { useEffect, useState } from "react";
import {
  Container,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";

//My
import Button from '@mui/material/Button';

//Slider
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import apiAxios from "../../services/axiosApi";

const Income = props => {

    //meta title
    document.title="store24h - Agente | Renda";
    
    const [renda, setRenda] = useState(1.5);
    const [rendax, setRendax] = useState(1.5);
    const [modelo, setModelo] = useState('');
    const [minGanhos, setMinGanhos] = useState(0.5);
    const [maxGanhos, setMaxGanhos] = useState(2.25);
    const [services, setListServices] = useState([]);
    const [valorSolicitado, setValorSolicitado] = useState(0);

    useEffect(() => {
        getAllServices();

    }, []);

    async function getAllServices() {
        try {
            const response = await apiAxios.get("/apiServicos/getAllServicesX");
            setListServices(response.data);
        } catch(e) {
            console.log("getAllServices", e);
        }
    }

    const handleChange = (event, newValue) => {
        setRenda(newValue)
        event.target.value = () => renda
    };

    async function editService(id) {
        try {
            await apiAxios.post(`/apiServicos/editService/${id}`, { "price" : valorSolicitado });
            setValorSolicitado(0);

        } catch(e) { 
            console.log("editService", e);
        }
    }
    

    return (
        <React.Fragment>
        <div className="page-content">
            <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs
                title={props.t("Renda")}
                breadcrumbItem={props.t("Renda")}
            />
                <div style={{ marginBottom: '2%'}}>
                    <p>Ajuste os preços de acordo com suas preferências</p>
                    <p>Escolha os serviços de seu interesse:</p>
                </div>
                { services.map((service, index) => (
                    <div key={index} style={{ marginTop: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'start'}}>
                            <p>Valor do Serviço: R${service.price.toFixed(2)}</p>
                            <p style={{ marginLeft: '4rem' }}>renda máxima possível é de R$ {Math.round(service.maxPrice*3).toFixed(2)}.</p>
                        </div>
                        <Box width={300}>
                            <Slider
                                aria-label="Small steps"
                                defaultValue={service.price}
                                valueLabelDisplay="auto"
                                onChange={handleChange}
                                onChangeCommitted={ (e) => {
                                    // console.log(e.target);
                                    var lol = e.target.firstChild.value;
                                    // console.log("e.target.firstChildX\n", lol);
                                    setValorSolicitado(Number(lol));
                                }}
                                step={0.1}
                                min={minGanhos}
                                max={Number(Math.round(service.maxPrice.toFixed(2))*3)}
                                />
                            <Button variant="contained" color="success" style={{ marginLeft: '0.5%', marginTop: '2rem' }} onClick={() => {editService(service.id)}}>Salvar</Button>
                        </Box>
                    </div>
                ))}
            </Container>
        </div>
        </React.Fragment>
    );
};

Income.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Income);