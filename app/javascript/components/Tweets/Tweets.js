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
      filteredTagName: null,
      page: 1,
      totalPages: null,
      loading: false
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
    this.state.filteredTagName = tagName // should be setState ?
    window.scrollTo(0, 0);
  }

  clearTagFilter = () => {
    this.fetchTweets()
    this.state.filteredTagName = null // should be setState ?
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
    const {likedTweets, page, totalPages} = this.state
    let url = tagName ? `/api/v1/tweets.json?tag=${tagName}&page=${page}` : `/api/v1/tweets.json?page=${page}`
    axios.get(url)
    .then(res => {
      this.setState({
        likedTweets: [...likedTweets, ...res.data.data],
        totalPages: res.data.total_pages,
        userId: res.data.data[0].attributes.user_id, // dont think this is needed
        loading: false
      })
    })
    .catch(res => {
      console.log('error: ', res.error)
    })
  }

  handleScroll = (e) => {
    const {loading, page, totalPages} = this.state
    if (loading) return
    if (page > totalPages) return
    const pageBottom = document.getElementById('page-bottom')
    const pageBottomOffset = pageBottom.offsetTop + pageBottom.clientHeight
    const pageOffset = window.pageYOffset + window.innerHeight
    const bottomBuffer = 50 // in px. buffer to prevent having to scroll to very bottom
    if (pageOffset > pageBottomOffset - bottomBuffer) {
      this.loadMore()
    }
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      loading: true
    }), this.fetchTweets)
  }

  componentDidMount() {
    this.fetchTweets()
    this.scrollListener = window.addEventListener('scroll', (e) => {
      this.handleScroll(e)
    })
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
        <span id="page-bottom"></span>
      </React.Fragment>
    )
  }
}


export default Tweets
