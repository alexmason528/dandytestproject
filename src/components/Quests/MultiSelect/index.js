import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Row, Col } from 'reactstrap'
import { IoIosSunny } from 'react-icons/io'
import './style.scss'

const MultiSelectQuest = ({ question, options, answer, onSelectAnswer }) => (
  <div className="quest multi-select-quest">
    <div className="quest-text multi-select-quest-text" dangerouslySetInnerHTML={{ __html: question }} />
    <div className="multi-select-quest-content">
      <Row>
        {options.map(({ key, title }, ind) => (
          <Col
            key={ind}
            md={2}
            className={classNames('multi-select-quest-elem', { active: answer.indexOf(key) !== -1 })}
            onClick={() => onSelectAnswer(key)}
          >
            <div className="multi-select-quest-elem-icon">
              <IoIosSunny style={{ fontSize: '2rem' }} />
            </div>
            {title}
          </Col>
        ))}
      </Row>
    </div>
  </div>
)

MultiSelectQuest.propTypes = {
  question: PropTypes.string,
  options: PropTypes.array,
  answer: PropTypes.array,
  onSelectAnswer: PropTypes.func,
}

export default MultiSelectQuest
