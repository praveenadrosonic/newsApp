import React, { Component } from 'react'
import NewsItemComponent from './NewsItemComponent.tsx'

export default class NewsComponent extends Component {
  render() {
    return (
      <div>
        <NewsItemComponent/>
        <NewsItemComponent/>
        <NewsItemComponent/>
        <NewsItemComponent/>
        <NewsItemComponent/>
        

      </div>
    )
  }
}
