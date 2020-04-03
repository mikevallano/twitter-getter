import React, { Component } from 'react'
import Tweet from './Tweet'
import TagForm from './TagForm'
import axios from 'axios'

class Tweets extends React.Component {
  constructor() {
    super()
    this.state = {
      tweet_ids: [],
      user_id: null
    }
  }

  componentDidMount() {
    // Internal api requet to get users' favorites. Return paginated or infinite scroll, along with user_id.
    axios.get('/api/v1/tweets.json')
    .then(res => {
      this.setState({
        // tweet_ids: [
        //   '1234452353996161028',
        //   '1233544464783814657'
        // ],
        tweet_ids: res.data.data.map(obj => {
          return obj.attributes.tweet_id
        }),
        user_id: res.data.data[0].user_id // dont think this is needed
      })
    })
    .catch(res => {
      console.log('error: ', res.error)
    })
  }

  render(){
    console.log('tweet_ids: ', this.state.tweet_ids)
    console.log('user_id: ', this.state.user_id)
    const tweets = this.state.tweet_ids.map((tweet_id) => {
      return(
        <Tweet tweet_id={tweet_id} key={tweet_id} user_id={this.state.user_id}/>
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
