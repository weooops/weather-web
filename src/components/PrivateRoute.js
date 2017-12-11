import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({ place, component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    place ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/location',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

PrivateRoute.propTypes = {
  place: PropTypes.object
}

PrivateRoute.defaultProps = {
  place: null
}

export default connect(
  ({place}) => ({
    place
  })
)(PrivateRoute)