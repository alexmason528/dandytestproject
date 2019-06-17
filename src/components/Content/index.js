import React, { Component } from 'react'
import Sidebar from 'components/Sidebar'
import QuestSection from 'components/QuestSection'
import './style.scss'

export default class Content extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeProfile: 'human',
    }
  }

  handleProfileChange = profile => {
    this.setState({ activeProfile: profile })
  }

  render() {
    const { activeProfile } = this.state

    return (
      <div className="content">
        <div>
          <Sidebar profile={activeProfile} />
        </div>
        <div>
          <QuestSection onProfileChange={this.handleProfileChange} />
        </div>
      </div>
    )
  }
}
