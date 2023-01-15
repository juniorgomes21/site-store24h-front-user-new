import PropTypes from "prop-types"
import React, { useContext, useEffect } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import { logoutUser } from "../../store/actions"

//redux
import { useDispatch } from "react-redux"
import AuthContext from "../../Context/auth"

const Logout = props => {
  const dispatch = useDispatch()
  const { handleLogout } = useContext(AuthContext);
  useEffect(() => {
    handleLogout();
    // dispatch(logoutUser(props.history))
  }, [dispatch])

  return <></>
}

Logout.propTypes = {
  history: PropTypes.object,
}

export default withRouter(Logout)
