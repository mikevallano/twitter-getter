import React, { Component } from 'react'

class FetchRecentTweetsButton extends React.Component {
  handleClick = event => {
    event.preventDefault()
    this.props.fetchRecentTweets()
  }
  render(){
    return (
      <React.Fragment>
        <button className='btn btn-primary' onClick={this.handleClick}>Fetch Recent Tweets</button>
      </React.Fragment>
    )
  }
}

export default FetchRecentTweetsButton
