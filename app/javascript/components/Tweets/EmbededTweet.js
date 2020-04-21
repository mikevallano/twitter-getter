import React, { Component } from 'react'
import { TwitterTweetEmbed } from 'react-twitter-embed'

class EmbededTweet extends React.Component {
  render(){
    return (
      <React.Fragment>
        <TwitterTweetEmbed
          tweetId={this.props.tweetId}
          options={{}}
        />
      </React.Fragment>
    )
  }
}

export default EmbededTweet
