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


const Market = props => {

    //meta title
    document.title="store24h - Agente | Mercado";

    return (
        <React.Fragment>
        <div className="page-content">
            <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs
                title={props.t("Mercado")}
                breadcrumbItem={props.t("Mercado")}
            />
                <h2>Mercado hstock.org</h2>
                <p>Caros colegas, queremos apresentar-vos uma nova plataforma para a venda de quaisquer bens relacionados com a nossa esfera.</p>
                <p>hStock é um mercado onde você pode encontrar tudo o que precisa para trabalhar na rede.</p>
                <p>Cartões SIM , modems , proxies, contas para mensageiros e redes sociais, software para automatização e por aí vai!</p>
                <p>Nenhuma verificação adicional é necessária para se registrar como vendedor! Basta preencher as informações e enviar seus produtos para moderação</p>
                <p>O serviço foi lançado e o principal objetivo é preenchê-lo com vendedores em diversas áreas.</p>
                <p>Esteja entre os primeiros! Junte a <a>hstock.org</a></p>
            </Container>
        </div>
        </React.Fragment>
    );
};

Market.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Market);