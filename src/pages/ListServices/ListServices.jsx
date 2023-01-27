import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import {
  Container,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";

//My
import ListBuyServices from "./ListBuyServices";
import Activations from "./Activations";
const ListServices = props => {

    //meta title
    document.title="store24h | Lista de Serviços";

    return (
        <React.Fragment>
          <ListBuyServices />
          <Activations />
        </React.Fragment>
    );
};

ListServices.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(ListServices);