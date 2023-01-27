import React, { useEffect, useState } from "react"
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap"
import SimpleBar from "simplebar-react"

//Import images
import avatar3 from "../../../assets/images/users/avatar-3.jpg"
import avatar4 from "../../../assets/images/users/avatar-4.jpg"

//i18n
import { withTranslation } from "react-i18next"
import { CircularProgress } from "@mui/material"
import { maskCell } from "../../../Validation&Formatation/formatation"

const NotificationDropdown = props => {
  // Declare a new state variable, which we'll call "menu"
  const smsList = props.smsList;
  const loading = props.loading;

  const [menu, setMenu] = useState(false);

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="dropdown d-inline-block"
        tag="li"
      >
        <DropdownToggle
          className="btn header-item noti-icon position-relative"
          tag="button"
          id="page-header-notifications-dropdown"
        >
          <i className="bx bx-bell bx-tada" />
          {
            !(smsList.length == 0) && <span className="badge bg-danger rounded-pill">{smsList.length}</span>
          }
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu dropdown-menu-lg p-0 dropdown-menu-end">
          <div className="p-3">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0"> {props.t("Notificações")} </h6>
              </Col>
            </Row>
          </div>

          <SimpleBar style={{ height: "230px" }}>
            {
              loading ?
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                  <CircularProgress />
                </div>
              :
              smsList.length == 0 ?
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                Você ainda não possue ativações!
              </div>
              :
              smsList.map((smsDTO, index) => (
                <Link key={index} to="/app/store24h/messages" className="text-reset notification-item">
                  <div className="d-flex">
                    <div className="avatar-xs me-3">
                      <span className="avatar-title bg-primary rounded-circle font-size-16">
                        <img style={{ width: '3rem', height: '2rem' }} src={`/img/servicesImg/${smsDTO.aliasService}0.png`} alt="..." />
                      </span>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mt-0 mb-1">
                        {props.t(smsDTO.nameService)}
                      </h6>
                      <div className="font-size-12 text-muted">
                        <p className="mb-1">
                          {props.t("Você tem uma Ativação " + maskCell(smsDTO.numberActivation))}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            }
            {/* <Link to="" className="text-reset notification-item">
              <div className="d-flex">
                <div className="avatar-xs me-3">
                  <span className="avatar-title bg-primary rounded-circle font-size-16">
                    <img style={{ width: '3rem', height: '2rem' }} src={'/img/servicesImg/wa0.png'} alt="..." />
                  </span>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mt-0 mb-1">
                    {props.t("WhatsApp")}
                  </h6>
                  <div className="font-size-12 text-muted">
                    <p className="mb-1">
                      {props.t("Uma nova ativação")}
                    </p>
                    <p className="mb-0">
                      <i className="mdi mdi-clock-outline" />{" "}
                      {props.t("3 min ago")}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </Link> */}
            {/* <Link to="" className="text-reset notification-item">
              <div className="d-flex">
                <div className="avatar-xs me-3">
                  <span className="avatar-title bg-primary rounded-circle font-size-16">
                    <img style={{ width: '3rem', height: '2rem' }} src={'/img/servicesImg/nf0.png'} alt="..." />
                  </span>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mt-0 mb-1">Netflix</h6>
                  <div className="font-size-12 text-muted">
                    <p className="mb-1">
                      {props.t("Uma nova ativação") + "."}
                    </p>
                    <p className="mb-0">
                      <i className="mdi mdi-clock-outline" />
                      {props.t("1 hours ago")}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="" className="text-reset notification-item">
              <div className="d-flex">
                <div className="avatar-xs me-3">
                  <span className="avatar-title bg-primary rounded-circle font-size-16">
                    <img style={{ width: '3rem', height: '2rem' }} src={'/img/servicesImg/tg0.png'} alt="..." />
                  </span>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mt-0 mb-1">
                    {props.t("Telegram")}
                  </h6>
                  <div className="font-size-12 text-muted">
                    <p className="mb-1">
                      {props.t("Uma nova ativação")}
                    </p>
                    <p className="mb-0">
                      <i className="mdi mdi-clock-outline" />{" "}
                      {props.t("3 min ago")}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="" className="text-reset notification-item">
              <div className="d-flex">
                <div className="avatar-xs me-3">
                  <span className="avatar-title bg-primary rounded-circle font-size-16">
                    <img style={{ width: '3rem', height: '2rem' }} src={'/img/servicesImg/my0.png'} alt="..." />
                  </span>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mt-0 mb-1">Caixa</h6>
                  <div className="font-size-12 text-muted">
                    <p className="mb-1">
                      {props.t(
                        "Uma nova ativação"
                      ) + "."}
                    </p>
                    <p className="mb-0">
                      <i className="mdi mdi-clock-outline" />
                      {props.t("1 hours ago")}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </Link> */}
          </SimpleBar>

          <div className="p-2 border-top d-grid">
            <Link
              className="btn btn-sm btn-link font-size-14 btn-block text-center"
              to="/app/store24h/messages"
            >
              <i className="mdi mdi-arrow-right-circle me-1"></i>
              {" "}
              {props.t("Ver todos")}{" "}
            </Link>
          </div>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

export default withTranslation()(NotificationDropdown)

NotificationDropdown.propTypes = {
  t: PropTypes.any
}