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
    console.log({tagging})
    axios.post('/api/v1/taggings.json', {tagging})
    .then(res => {
      this.fetchTweet(tagging.liked_tweet_id)
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

  deleteTagging = (tagging) => {
    console.log({tagging})
    axios
      .delete(`/api/v1/taggings/${tagging.id}.json`)
      .then(res => {
        this.fetchTweet(tagging.liked_tweet_id)
      })
      .catch(err => {
        console.log(err)
      })
  }

  fetchTweet = (tweetId) => {
    axios.get(`/api/v1/tweets/${tweetId}.json`)
    .then(res => {
      console.log({res})
      const updatedTweets = [...this.state.likedTweets].map(likedTweet => {
        if (res.data.data.id == likedTweet.id) {
          return res.data.data
        } else {
          return likedTweet
        }
      })
      this.setState({likedTweets: updatedTweets})
    })
  }

  fetchTweets = (tagName) => {
    const {likedTweets, page, totalPages} = this.state
    console.log(`likedTweets.length: ${likedTweets.length}`)
    let url = tagName ? `/api/v1/tweets.json?tag=${tagName}&page=${page}` : `/api/v1/tweets.json?page=${page}`
    axios.get(url)
    .then(res => {
      console.log(`likedTweets.map(lt => lt.id): ${likedTweets.map(lt => lt.id)}`)
      console.log(`res.data.data.map(lt => lt.id): ${res.data.data.map(lt => lt.id)}`)
      let sameTweets = res.data.data.every((tweet, index) => {
        console.log(`tweet.id: ${tweet.id}, likedTweets[index] && likedTweets[index].id: ${likedTweets[index] && likedTweets[index].id}`)
        console.log(`tweet.id == likedTweets[index] && likedTweets[index].id: ${tweet.id == likedTweets[index] && likedTweets[index].id}`)
        return likedTweets[index] && tweet.id == likedTweets[index].id
      })
      console.log(`sameTweets?: ${sameTweets}`)

      this.setState({
        likedTweets: sameTweets ? res.data.data : [...likedTweets, ...res.data.data],
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
