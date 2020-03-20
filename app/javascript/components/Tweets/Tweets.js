import React, { Component } from 'react'
import Tweet from './Tweet'
import TagForm from './TagForm'
import axios from 'axios'

class Tweets extends React.Component {
  constructor() {
    super()
    this.state = {
      tweets: [],
      tweet_ids: [],
      current_user_id: []
    }
  }

  componentDidMount() {
    // Internal api requet to get users' favorites. Return paginated or infinite scroll, along with user_id.
    axios.get('/api/v1/tweets.json')
    .then(res => {
      this.setState({
        tweet_ids: res.data.map(tweet => `${tweet.tweet_id}`), // should do this on the backend
        current_user_id: 1
      })
    })
    .catch(res => {
      console.log('error: ', res.error)
    })
  }

  render(){
    console.log('tweet_ids: ', this.state.tweet_ids)
  const tweets = this.state.tweet_ids.map((tweet_id, index) => {
    return(
      <React.Fragment>
        <Tweet tweet_id={tweet_id} key={`${tweet_id}_${index}`} user_id={this.state.current_user_id}/>
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
