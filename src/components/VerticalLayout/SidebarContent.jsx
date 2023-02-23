import PropTypes from "prop-types"
import React, { useEffect, useRef, useContext, useState } from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"

//My
import AccountBox from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import apiAxios from "../../services/axiosApi";
import Button from "@mui/material/Button";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AuthContext from "../../Context/auth";
import { CircularProgress } from "@mui/material"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SidebarContent = props => {
  const { user } = useContext(AuthContext);
  const ref = useRef();

  const [serviceList, setServiceList] = useState([]);
  const [indexClick, setIndexClick] = useState(-1);
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [loadingServices, setLoadingServices] = useState(true);
  const [itemPer, setItemPer] = useState({});
  //Search
  const [searchText, setSearchText] = useState('');
  const [serviceFilter, setServiceFilter] = useState([]);
  //error api
  const [errorApi, setErrorApi] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Ops, algo deu errado tente novamente!');
  //Pagination
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  //SnackBar
  const [state, setState] = useState({
    openSnackBar: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, openSnackBar } = state;

  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    getService();
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
    searchService(searchText);
  }, [searchText])

  useEffect(() => {
    ref.current.recalculate()
  })

  async function getService() {
    try {
      const response = await apiAxios.get(`/user/apiServicos/getAllServicesNoActivity`);
      setServiceList(response.data);
    } catch(e) {
      setLoadingServices(false);
    }
  }

  async function compraServico(id, serviceName) {
    try {
        setLoading(true);
        setErrorApi(false);
        const response = await apiAxios.post(`/user/apiServicos/comprarServico/${id}`, { "serviceName": serviceName }, { headers: { 'Authorization' : `Bearer ${token}`}});
        const badResponse = ["NO_NUMBERS", "NO_BALANCE", "BAD_KEY"];
        if(badResponse.includes(response.data)) {
          if(response.data == "NO_NUMBERS") {
            setErrorMsg("Não tem números disponíveis para este serviço no momento!");
          } else if(response.data == "NO_BALANCE") {
            setErrorMsg("Sua conta não tem mais crédito!");
          } else {
            setErrorMsg("Sua chave de api esta errada!");
          }
          setErrorApi(true);
          handleClickSnackBar({vertical: 'top', horizontal: 'center' });
          setLoading(false);
          return;
        }
        handleClickSnackBar({vertical: 'top', horizontal: 'center' });
        setLoading(false);
  
      } catch(e) {
        console.log("compraServico", e);
        setErrorApi(true);
        handleClickSnackBar({vertical: 'top', horizontal: 'center' });
        setLoading(false);
      }
  }

  function searchService(textoDigitado) {
      const serviceFilter = serviceList.filter( e => e.name.toLowerCase().includes(textoDigitado.toLowerCase()));
      setServiceFilter(serviceFilter);
  }

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

  function formatPrice(price) {
    let priceString = 'R$ ' + price?.toFixed(2);

    return priceString;
  }

  function getImg(name) {
    return `/img/servicesImg/${name}0.png`;
  }

  function handleClickSnackBar(newState) {
    setState({ openSnackBar: true, ...newState });
  };

  function handleCloseSnackBar() {
    setState({ ...state, openSnackBar: false });
  };

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref} style={{ background: '#0703ad' }}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>
            <li>
              <Link to="/app/store24h/services">
                <i className="bx bx-home-circle"></i>
                <span>{props.t("Ativações")}</span>
              </Link>
            </li>
            <li>
              <Link to="/app/store24h/servicesBuys" className="">
                <AccountBox sx={{ marginRight: '8px' }}/>
                <span>{props.t("Serviços Comprados")}</span>
              </Link>
            </li>
            {
              user.role == 'ADMINISTRADOR' &&
              <li>
                <Link to="/app/store24h/apiConfig" className="">
                  <SettingsIcon sx={{ marginRight: '8px' }}/>
                  <span>{props.t("Configuração API")}</span>
                </Link>
              </li>
            }
          </ul>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
          Lista de Serviços
        </div>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '29ch' },
          }}
          noValidate
          autoComplete="off"
        >
            <TextField
              id="outlined-basic"
              label=""
              placeholder="Pesquisar"
              variant="outlined"
              size="small"
              onChange={e => setSearchText(e.target.value)}
              sx={{
                backgroundColor: '#fff',
                borderRadius: '5px',
                '& label.Mui-focused': {
                  color: '#000',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#000',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#000',
                  },
                  '&:hover fieldset': {
                    borderColor: '#000',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#000',
                  },
                },
              }}
            />
        </Box>
        {
          searchText.length > 0 ?
            serviceFilter.map((item, index) => (
              <div
                key={index}
                style={{ display: 'flex', width: '14.7rem', height: '3.3rem', background: '#d3d3d3', marginLeft: '0.5rem', marginBottom: '0.5rem', alignItems: 'center', borderRadius: '10px', cursor: 'pointer' }}
              >
                <div style={{ marginLeft: '1rem'}}>
                  <img src={getImg(item.alias)} alt="naadad" style={{ width: '1.5rem', height: '1.5rem'}}/>
                </div>
                <div
                  style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'space-between', alignContent: 'center', marginLeft: '0.5rem', alignItems: 'center'}}
                  onClick={() => 
                    setIndexClick(index)
                  }
                >
                  <p style={{ margin: 0, color: 'black'}}> {item.name}</p>
                  {
                    indexClick == index ?
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          mr: 1,
                          fontSize: '12px'
                        }}
                        onClick={() => 
                          compraServico(item.id, item.alias)
                        }
                      >
                        {
                          loading ?
                            <CircularProgress
                              size={23}
                            />
                          :
                            'Comprar'
                        }
                      </Button>
                    :
                      <p style={{ marginRight: '0.5rem', marginBottom: 0, color: 'black'}}> {formatPrice(item.price)}</p>
                  }
                </div>
              </div>
            ))
          :
            serviceList.map((item, index) => (
              <div
                key={index}
                style={{ display: 'flex', width: '14.7rem', height: '3.3rem', background: '#d3d3d3', marginLeft: '0.5rem', marginBottom: '0.5rem', alignItems: 'center', borderRadius: '10px', cursor: 'pointer' }}
              >
                <div style={{ marginLeft: '1rem'}}>
                  <img src={getImg(item.alias)} alt="naadad" style={{ width: '1.5rem', height: '1.5rem'}}/>
                </div>
                <div
                  style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'space-between', alignContent: 'center', marginLeft: '0.5rem', alignItems: 'center'}}
                  onClick={() => 
                    setIndexClick(index)
                  }
                >
                  <p style={{ margin: 0, color: 'black'}}> {item.name}</p>
                  {
                    indexClick == index ?
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          mr: 1,
                          fontSize: '12px'
                        }}
                        onClick={() => 
                          compraServico(item.id, item.alias)
                        }
                      >
                        {
                          loading ?
                            <CircularProgress
                              size={23}
                            />
                          :
                            'Comprar'
                        }
                      </Button>
                    :
                      <p style={{ marginRight: '0.5rem', marginBottom: 0, color: 'black'}}> {formatPrice(item.price)}</p>
                  }
                </div>
              </div>
            ))
        }
      </SimpleBar>
      <Snackbar
          open={openSnackBar}
          autoHideDuration={6000}
          onClose={handleCloseSnackBar}
          anchorOrigin={{ vertical, horizontal }}
          key={vertical + horizontal}
      >
          <Alert onClose={handleCloseSnackBar} severity={errorApi ? "error" : "success"} sx={{ width: '100%' }}>
            { errorApi ? errorMsg : `Sua compra foi Realizada com Sucesso!`}
          </Alert>
      </Snackbar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))
