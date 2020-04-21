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
      tweet_ids: [],
      liked_tweets: [],
      user_id: null,
      formTagNames: '',
      filteredTagName: null
    }
  }

  handleTagSubmit = (tagging) => {
    axios.post('/api/v1/taggings.json', {tagging})
    .then(res => {
      this.fetchTweets()
    })
  }

  handleFetchRecentTweets = () => {
    console.log('handleFetchRecentTweets called')
    axios.post('/api/v1/tweets.json', {user_id: this.state.user_id})
    .then(res => {
      this.fetchTweets()
    })
  }

  handleTagClick = (tagName) => {
    this.fetchTweets(tagName)
    this.state.filteredTagName = tagName
    window.scrollTo(0, 0);
  }

  handleTagFilterClear = () => {
    this.fetchTweets()
    this.state.filteredTagName = null
  }

  handleTaggingDelete = (tagging_id) => {
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
    console.log('fetchTweets called')
    // Internal api requet to get users' favorites. Return paginated or infinite scroll, along with user_id.
    let url = tagName ? `/api/v1/tweets.json?tag=${tagName}` : '/api/v1/tweets.json'
    axios.get(url)
    .then(res => {
      this.setState({
        // tweet_ids: [
        //   '1234452353996161028',
        //   '1233544464783814657'
        // ],
        tweet_ids: res.data.data.map(obj => {
          return obj.attributes.tweet_id
        }),
        liked_tweets: res.data.data,
        user_id: res.data.data[0].attributes.user_id // dont think this is needed
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
    const tweets = this.state.liked_tweets.map((liked_tweet) => {
      return(
        <Tweet tweet_id={liked_tweet.attributes.tweet_id} key={liked_tweet.attributes.tweet_id} user_id={this.state.user_id} tags={liked_tweet.attributes.tags} taggings={liked_tweet.attributes.taggings} handleTagSubmit={this.handleTagSubmit} handleTaggingDelete={this.handleTaggingDelete} handleTagClick={this.handleTagClick}/>
      )
    })

    return (
      <React.Fragment>
        <div className="container" >
          <h1>Tweets!</h1>
          <FetchRecentTweetsButton handleFetchRecentTweets={this.handleFetchRecentTweets}/>
          { this.state.filteredTagName ?
            <TagFilter filteredTagName={this.state.filteredTagName} handleTagFilterClear={this.handleTagFilterClear}/>
            : ''
          }
          {tweets}
        </div>
      </React.Fragment>
    )
  }
}


export default Tweets
