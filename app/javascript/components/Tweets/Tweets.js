import React, { Component } from 'react'
import Tweet from './Tweet'

class Tweets extends React.Component {
  constructor() {
    super()
    this.state = {
      tweets: []
    }
  }
  componentDidMount() {
    this.setState({
      tweets:
      [{tweet_id: '1233544464783814657'}, {tweet_id: '1233383123666325504'}, {tweet_id: '1233164166149570561'}, {tweet_id: '1233060015839305728'}, {tweet_id: '1232810191587954690'}, {tweet_id: '1232753644589780994'}, {tweet_id: '1232727363626029056'}]
    })
  }

  render(){
  const tweets = this.state.tweets.map(tweet => {
    return(
      <Tweet tweet_id={tweet.tweet_id} key={tweet.tweet_id}/>
    )
  })

  return (
    <React.Fragment>
      <div className="container" >
        <h1>Tweets!</h1>
        {tweets}
      </div>
    </React.Fragment>
  )
}
}

export default Tweets
