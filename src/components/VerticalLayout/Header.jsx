import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// Import menuDropdown
import LanguageDropdown from "../CommonForBoth/TopbarDropdown/LanguageDropdown";
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";
import logo from "../../assets/images/logo.svg";
import logoLightSvg from "../../assets/images/logo-light.svg";

//i18n
import { withTranslation } from "react-i18next";

// Redux Store
import {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
} from "../../store/actions";
import { getTokenAsyncStorage } from '../../isValidToken/isValidToken';
import apiAxios, { apiAxiosHub } from '../../services/axiosApi';
import AuthContext from '../../Context/auth';

const Header = props => {
  // const { token } = useContext(AuthContext);
  const [search, setsearch] = useState(false);
  const [megaMenu, setmegaMenu] = useState(false);
  const [socialDrp, setsocialDrp] = useState(false);
  const [smsList, setSmsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lengthList, setLengthList] = useState(0);

  useEffect(() => {
    user();
    setInterval(user, 15000);
  }, [])

  async function user() {
      try {
        const token = await getTokenAsyncStorage();
        const response = await apiAxios.post('/user/apiServicos/activation', { "quantityActivation": smsList.length }, { headers: { 'Authorization' : `Bearer ${token}`}});
        const listActivations = response.data;
        if(listActivations.length == 0) {
          setLoading(false);
        } else {
          if(listActivations.length > smsList.length) {
            setSmsList(listActivations);
            setLengthList(lengthList + 1);
          }
          setLoading(false);
        }
      } catch(e) {
        console.log(e);
        setLoading(false);
      }
  }

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">

            <div className="navbar-brand-box d-lg-none d-md-block">
              <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logo} alt="" height="22" />
                </span>
              </Link>

              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logoLightSvg} alt="" height="22" />
                </span>
              </Link>
            </div>

          </div>
          <div className="d-flex">

            <LanguageDropdown />

            <ProfileMenu />
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

Header.propTypes = {
  changeSidebarType: PropTypes.func,
  leftMenu: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func
};

const mapStatetoProps = state => {
  const {
    layoutType,
    showRightSidebar,
    leftMenu,
    leftSideBarType,
  } = state.Layout;
  return { layoutType, showRightSidebar, leftMenu, leftSideBarType };
};

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
})(withTranslation()(Header));
