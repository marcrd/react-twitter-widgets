import React from 'react'
import PropTypes from 'prop-types'
import isEqual from 'lodash.isequal'
import cloneDeep from 'lodash.clonedeep'
import AbstractWidget from './AbstractWidget'

export default class Follow extends React.Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    options: PropTypes.object,
    onLoad: PropTypes.func,
  };

  static defaultProps = {
    options: {},
    onLoad: () => {},
  };

  shouldComponentUpdate(nextProps) {
    const changed = (name) => !isEqual(this.props[name], nextProps[name])
    return changed('username') || changed('options')
  }

  ready = (tw, element, done) => {
    const { username, options, onLoad } = this.props

    // Options must be cloned since Twitter Widgets modifies it directly
    tw.widgets.createFollowButton(username, element, cloneDeep(options))
    .then(() => {
      // Widget is loaded
      done()
      onLoad()
    })
  }

  render() {
    return <AbstractWidget ready={this.ready} />
  }
}
