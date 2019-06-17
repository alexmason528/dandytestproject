import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

const ImageQuest = ({ url }) => (
  <div className="quest image-quest">
    <div className="image-quest-source">
      <img src={url} alt="" />
    </div>
  </div>
)

ImageQuest.propTypes = {
  url: PropTypes.string,
}

export default ImageQuest
