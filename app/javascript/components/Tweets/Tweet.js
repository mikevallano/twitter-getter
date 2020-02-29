import React, { Component } from 'react'
import { TwitterTweetEmbed } from 'react-twitter-embed'

class Tweet extends React.Component {
  render(){
    return (
      <TwitterTweetEmbed
        tweetId={this.props.tweet_id}
        options={{}}
      />
    )
  }
}

export default Tweet
