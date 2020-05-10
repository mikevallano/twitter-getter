import React, { Component } from 'react'

class DeleteTweet extends React.Component {

  handleClick = (e) => {
    this.props.deleteTweet(this.props.likedTweetId)
  }

  render(){
    return (
        <p onClick={this.handleClick} className='delete-tweet-btn clicky'>(x)</p>
    )
  }
}

export default DeleteTweet
