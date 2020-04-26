import React, { Component } from 'react'
import Tweet from './Tweet'
import TagForm from './TagForm'
import TagFilter from './TagFilter'
import FetchRecentTweetsButton from './FetchRecentTweetsButton'
import axios from 'axios'

class Tweets extends React.Component {
  constructor() {
    super()
    this.state = {
      likedTweets: [],
      userId: null,
      filteredTagName: null
    }
  }

  createTagging = (tagging) => {
    axios.post('/api/v1/taggings.json', {tagging})
    .then(res => {
      this.fetchTweets()
    })
  }

  fetchRecentTweets = () => {
    axios.post('/api/v1/tweets.json', {user_id: this.state.userId})
    .then(res => {
      this.fetchTweets()
    })
  }

  filterByTagName = (tagName) => {
    this.fetchTweets(tagName)
    this.state.filteredTagName = tagName
    window.scrollTo(0, 0);
  }

  clearTagFilter = () => {
    this.fetchTweets()
    this.state.filteredTagName = null
  }

  deleteTagging = (tagging_id) => {
    axios
      .delete(`/api/v1/taggings/${tagging_id}.json`)
      .then(res => {
        this.fetchTweets()
      })
      .catch(err => {
        console.log(err)
      })
  }

  fetchTweets = (tagName) => {
    const limit = 25
    let url = tagName ? `/api/v1/tweets.json?tag=${tagName}&limit=${limit}` : `/api/v1/tweets.json?limit=${limit}`
    axios.get(url)
    .then(res => {
      this.setState({
        likedTweets: res.data.data,
        userId: res.data.data[0].attributes.user_id // dont think this is needed
      })
    })
    .catch(res => {
      console.log('error: ', res.error)
    })
  }

  componentDidMount() {
    this.fetchTweets()
  }

  render(){
    const tweets = this.state.likedTweets.map((likedTweet) => {
      return(
        <Tweet tweetId={likedTweet.attributes.tweet_id} key={likedTweet.attributes.tweet_id} userId={this.state.userId} tags={likedTweet.attributes.tags} taggings={likedTweet.attributes.taggings} createTagging={this.createTagging} deleteTagging={this.deleteTagging} filterByTagName={this.filterByTagName}/>
      )
    })

    return (
      <React.Fragment>
        <div className="container" >
          <h1>Tweets!</h1>
          <FetchRecentTweetsButton fetchRecentTweets={this.fetchRecentTweets}/>
          { this.state.filteredTagName ?
            <TagFilter filteredTagName={this.state.filteredTagName} clearTagFilter={this.clearTagFilter}/>
            : ''
          }
          {tweets}
        </div>
      </React.Fragment>
    )
  }
}


export default Tweets
