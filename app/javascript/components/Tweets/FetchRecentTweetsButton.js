import React, { Component } from 'react'

class FetchRecentTweetsButton extends React.Component {
  handleClick = event => {
    event.preventDefault()
    this.props.handleFetchRecentTweets()
  }
  render(){
    return (
      <React.Fragment>
        <p onClick={this.handleClick}>FetchRecentTweetsButton</p>
      </React.Fragment>
    )
  }
}

export default FetchRecentTweetsButton
