import React, { Component } from 'react'
import { TwitterTweetEmbed } from 'react-twitter-embed'

class Tweet extends React.Component {
  render(){
    return (
      <React.Fragment>
        <TwitterTweetEmbed
          tweetId={this.props.tweet_id}
          options={{}}
        />
      </React.Fragment>
    )
  }
}

export default Tweet
