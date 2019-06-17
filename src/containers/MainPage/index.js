import React from 'react'
import Header from 'components/Header'
import Content from 'components/Content'

const MainPage = ({ children }) => (
  <div className="main-app">
    <Header />
    <Content>{children}</Content>
  </div>
)

export default MainPage
