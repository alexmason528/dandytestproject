import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './style.scss'

export default class SingleSelectQuest extends Component {
  static propTypes = {
    question: PropTypes.string,
    options: PropTypes.array,
    answer: PropTypes.string,
    enabled: PropTypes.bool,
    onSelectAnswer: PropTypes.func,
  }

  handleSelectAnswer = answer => {
    const { enabled } = this.props

    if (enabled) {
      this.props.onSelectAnswer(answer)
    }
  }

  render() {
    const { question, options, answer } = this.props

    return (
      <div className="quest single-select-quest">
        <div className="quest-text single-select-quest-text" dangerouslySetInnerHTML={{ __html: question }} />
        <div className="single-select-quest-content">
          {options.map(({ key, title, description }) => (
            <div
              key={key}
              className={classNames('single-select-quest-elem', { active: key === answer })}
              onClick={() => this.handleSelectAnswer(key)}
            >
              <div className="single-select-quest-elem-title">{title}</div>
              {description && <div className="single-select-quest-elem-description">{description} </div>}
            </div>
          ))}
        </div>
      </div>
    )
  }
}
