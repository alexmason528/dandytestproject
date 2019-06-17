import React, { Component } from 'react'
import PropTypes from 'prop-types'
import className from 'classnames'
import './style.scss'

class Sidebar extends Component {
  static propTypes = {
    profile: PropTypes.string,
  }

  render() {
    const { profile } = this.props

    const navItems = [
      { key: 'human', title: 'Human Profile' },
      { key: 'pet', title: 'Pet Profile' },
      { key: 'detail', title: 'Details' },
    ]

    return (
      <div className="sidebar p-5">
        <span>EXIT</span>

        <h1 className="mt-5">This is a fun headline.</h1>
        <h5 className="mt-4">Intro copy that will help users navigate this experience</h5>

        <div className="sidebar-nav mt-5 ml-4">
          {navItems.map(({ key, title }) => (
            <div key={key} className={className('sidebar-nav-item', { active: key === profile })}>
              {title}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Sidebar
