import React, { Component } from 'react'
import Tweet from './Tweet'
import TagForm from './TagForm'

class Tweets extends React.Component {
  constructor() {
    super()
    this.state = {
      tweets: [],
      current_user_id: []
    }
  }
  componentDidMount() {
    this.setState({
      tweets:
      [{tweet_id: '1233544464783814657'}, {tweet_id: '1234452353996161028'}, {tweet_id: '1232613076630953984'}, {tweet_id: '1231208173597548546'}],
      current_user_id: 1,
    })
  }

  render(){
  const tweets = this.state.tweets.map(tweet => {
    return(
      <React.Fragment>
        <Tweet tweet_id={tweet.tweet_id} key={tweet.tweet_id}/>
        <TagForm tweet_id={tweet.tweet_id} user_id={this.state.current_user_id}/>
      </React.Fragment>
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
