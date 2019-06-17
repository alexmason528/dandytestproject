import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FiArrowRightCircle } from 'react-icons/fi'
import { find, get, take } from 'lodash'
import SweetAlert from 'sweetalert2-react'
import TextQuest from 'components/Quests/Text'
import SingleSelectQuest from 'components/Quests/SingleSelect'
import NotificationQuest from 'components/Quests/Notification'
import ImageQuest from 'components/Quests/Image'
import MultiSelect from 'components/Quests/MultiSelect'
import { allQuests } from 'config/base'
import './style.scss'

class QuestSection extends Component {
  static propTypes = {
    onProfileChange: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = this.getInitialState()
  }

  componentDidUpdate() {
    const sectionMain = document.getElementById('quest-section-main')
    sectionMain.scrollTop = sectionMain.scrollHeight
  }

  getInitialState = () => {
    return {
      quests: allQuests,
      currentInput: '',
      questInd: 0,
      showFinishModal: false,
      submitted: false,
    }
  }

  resetState = () => {
    this.setState(this.getInitialState())
    this.props.onProfileChange('human')
  }

  handleUpdateAnswer = answer => {
    const { quests, questInd } = this.state

    const currentQuest = allQuests[questInd]

    if (currentQuest.type === 'singleSelect' && answer) {
      this.setState({
        quests: quests.map((quest, ind) => (ind === questInd ? { ...quest, answer } : quest)),
      })
    } else if (currentQuest.type === 'multiSelect' && answer) {
      this.setState({
        quests: quests.map((quest, ind) => {
          if (ind !== questInd) {
            return quest
          }

          const prevIndex = quest.answer.indexOf(answer)

          if (prevIndex === -1) {
            return { ...quest, answer: [...quest.answer, answer] }
          }

          let newSelection = [...quest.answer]
          newSelection.splice(prevIndex, 1)

          return { ...quest, answer: newSelection }
        }),
      })
    }
  }

  handleInputChange = evt => {
    this.setState({ currentInput: evt.target.value })
  }

  handleNextStep = () => {
    const { quests, questInd, currentInput } = this.state

    if (!this.nextQuestInd && this.currentQuestAnswer) {
      this.setState({ showFinishModal: true })
      return
    }

    if (this.currentQuestType === 'text' && !currentInput) {
      return
    }

    if (
      (this.currentQuestType === 'singleSelect' || this.currentQuestType === 'multiSelect') &&
      (!this.currentQuestAnswer || this.currentQuestAnswer.length === 0)
    ) {
      return
    }

    this.setState(
      Object.assign(
        { ...this.state, currentInput: '', questInd: this.nextQuestInd },
        this.currentQuestType === 'text' && {
          quests: quests.map((quest, ind) => (ind === questInd ? { ...quest, answer: currentInput } : quest)),
        },
      ),
    )

    this.props.onProfileChange(this.nextQuestProfile)
  }

  handleInputKeyPress = evt => {
    const { currentInput } = this.state
    if (evt.key === 'Enter' && currentInput) {
      this.handleNextStep()
    }
  }

  get currentQuestType() {
    const { quests, questInd } = this.state

    return quests[questInd].type
  }

  get currentQuestId() {
    const { quests, questInd } = this.state

    return quests[questInd].id
  }

  get currentQuestAnswer() {
    const { quests, questInd } = this.state

    return quests[questInd].answer
  }

  get nextQuestInd() {
    const { quests, questInd } = this.state

    if (questInd === quests.length - 1) {
      return null
    }

    let nextInd = questInd + 1

    while (true) {
      const nextQuest = quests[nextInd]
      const { type } = nextQuest

      if (['text', 'multiSelect', 'singleSelect'].indexOf(type) !== -1) {
        break
      }

      nextInd++
    }

    return nextInd
  }

  get nextQuestProfile() {
    const { quests } = this.state

    return quests[this.nextQuestInd].profile
  }

  render() {
    const { quests, questInd, currentInput, showFinishModal } = this.state

    const selectedQuests = take(quests, questInd + 1)

    return (
      <div className="quest-section">
        <div className="quest-section-main" id="quest-section-main">
          {selectedQuests.map(({ id, type, text, url, options, answer, referQuestForText }) => {
            const referAnswer = get(find(quests, { id: referQuestForText }), 'answer', '')

            if (type === 'text') {
              return <TextQuest key={id} question={text(referAnswer)} answer={answer} />
            }

            if (type === 'singleSelect') {
              return (
                <SingleSelectQuest
                  key={id}
                  question={text(referAnswer)}
                  options={options}
                  answer={answer}
                  enabled={id === this.currentQuestId}
                  onSelectAnswer={this.handleUpdateAnswer}
                />
              )
            }

            if (type === 'multiSelect') {
              return (
                <MultiSelect
                  key={id}
                  question={text(referAnswer)}
                  options={options}
                  answer={answer}
                  enabled={id === this.currentQuestId}
                  onSelectAnswer={this.handleUpdateAnswer}
                />
              )
            }

            if (type === 'image') {
              return <ImageQuest key={id} url={url} />
            }

            return <NotificationQuest key={id} question={text(referAnswer)} />
          })}
        </div>
        <div className="quest-section-input">
          <input
            value={currentInput}
            disabled={this.currentQuestType !== 'text'}
            onChange={this.handleInputChange}
            onKeyPress={this.handleInputKeyPress}
          />
          <FiArrowRightCircle className="quest-section-send-btn" onClick={this.handleNextStep} />
          <SweetAlert
            show={showFinishModal}
            title="Thank You"
            text="Successfully stored information for you and your pet!"
            onConfirm={this.resetState}
          />
        </div>
      </div>
    )
  }
}

export default QuestSection
