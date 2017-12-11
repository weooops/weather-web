import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './SearchInput.css'

class SearchInput extends Component {
  constructor(props) {
    super(props)

    this.state = { term: '' }
  }

  onInputChange(term) {
    this.setState({ term })
    this.props.onSearchTermChange(term)
  }

  render() {
    return (
      <input
        className="SearchInput tab-item"
        autoFocus
        autoComplete="off"
        type="text"
        maxLength="20"
        value={this.state.term}
        onChange={event => this.onInputChange(event.target.value)}
      />
    )
  }
}

SearchInput.propTypes = {
  onSearchTermChange: PropTypes.func,
  onInputKeyDown: PropTypes.func
}

SearchInput.defaultProps = {
  onSearchTermChange: () => console.error('onSearchTermChange is not defined'),
  onInputKeyDown: () => console.error('onInputKeyDown is not defined')
}

export default SearchInput