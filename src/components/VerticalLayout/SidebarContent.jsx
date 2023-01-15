import PropTypes from "prop-types"
import React, { useEffect, useRef } from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"

//My
import KeyIcon from '@mui/icons-material/Key';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AccountBox from '@mui/icons-material/AccountBox';
import Article from '@mui/icons-material/Article';
import Sms from '@mui/icons-material/Sms';
import Settings from '@mui/icons-material/Settings';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import SimCard from '@mui/icons-material/SimCard';
import Man from '@mui/icons-material/Man';
import Payments from '@mui/icons-material/Payments';
import AttachMoney from '@mui/icons-material/AttachMoney';
import ImportExport from '@mui/icons-material/ImportExport';
import PersonAdd from '@mui/icons-material/PersonAdd';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import Notes from '@mui/icons-material/Notes';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const SidebarContent = props => {
  const ref = useRef()
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname

    const initMenu = () => {
      new MetisMenu("#side-menu")
      let matchingMenuItem = null
      const ul = document.getElementById("side-menu")
      const items = ul.getElementsByTagName("a")
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem)
      }
    }
    initMenu()
  }, [props.location.pathname])

  useEffect(() => {
    ref.current.recalculate()
  })

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false
    }
    scrollElement(item);
    return false
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref} style={{ background: '#0703ad' }}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>
            <li>
              <Link to="/app/store24h/services">
                <i className="bx bx-home-circle"></i>
                <span>{props.t("Lista de Serviços")}</span>
              </Link>
            </li>

            <li>
              <Link to="/app/store24h/servicesBuys" className="">
                <AccountBox sx={{ marginRight: '8px' }}/>
                <span>{props.t("Serviços Comprados")}</span>
              </Link>
            </li>
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))
