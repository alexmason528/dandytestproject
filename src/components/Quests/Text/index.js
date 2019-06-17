import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

const TextQuest = ({ question, answer }) => (
  <div className="quest text-quest">
    <div className="quest-text text-quest-text" dangerouslySetInnerHTML={{ __html: question }} />
    {answer && (
      <div className="quest-answer text-quest-answer">
        <div>{answer}</div>
      </div>
    )}
  </div>
)

TextQuest.propTypes = {
  question: PropTypes.string,
  answer: PropTypes.string,
}

export default TextQuest
