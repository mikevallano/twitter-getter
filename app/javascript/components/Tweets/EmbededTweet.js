import React from 'react'
import { TwitterTweetEmbed } from 'react-twitter-embed'

const EmbededTweet = (props) => {
  return (
    <>
      <TwitterTweetEmbed
        tweetId={props.tweetId}
        options={{}}
      />
    </>
  )
}

export default EmbededTweet
