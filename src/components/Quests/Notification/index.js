import React from 'react'
import PropTypes from 'prop-types'

const NotificationQuest = ({ question }) => (
  <div className="quest notification-quest">
    <div className="quest-text notification-quest-text" dangerouslySetInnerHTML={{ __html: question }} />
  </div>
)

NotificationQuest.propTypes = {
  question: PropTypes.string,
}

export default NotificationQuest
