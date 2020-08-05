import React, { Component } from 'react'
import Tweet from './Tweet'
import TagFilter from './TagFilter'
import FetchRecentTweetsButton from './FetchRecentTweetsButton'
import TagCloud from './TagCloud'
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
      loading: false,
      tagsInCloud: []
    }
  }

  createTagging = (tagging) => {
    axios.post('/api/v1/taggings.json', {tagging})
    .then(res => {
      let addedTags = tagging.tag_names.split(', ')
      let newTags = [... new Set(this.state.tagsInCloud.concat(addedTags))]
      this.setState({tagsInCloud: newTags})
      this.fetchTweet(tagging.liked_tweet_id)
    })
  }

  fetchRecentTweets = () => {
    axios.post('/api/v1/tweets.json', {user_id: this.state.userId})
    .then(res => {
      this.setState({
        page: 1,
        filteredTagName: null,
        loading: true,
        likedTweets: []
      }, this.fetchTweets)
    })
  }

  filterByTagName = (tagName) => {
    window.scrollTo(0, 0);
    this.setState({
      page: 1,
      filteredTagName: tagName,
      loading: true,
      likedTweets: []
    }, this.fetchTweets)
  }

  clearTagFilter = () => {
    this.setState({
      page: 1,
      filteredTagName: null,
      loading: true,
      likedTweets: []
    }, this.fetchTweets)
  }

  deleteTagging = (tagging) => {
    axios
      .delete(`/api/v1/taggings/${tagging.id}.json`)
      .then(res => {
        this.fetchTweet(tagging.liked_tweet_id)
      })
      .catch(err => {
        console.log(err)
      })
  }

  deleteTweet = (tweetId) => {
    axios
    .delete(`/api/v1/tweets/${tweetId}.json`)
    .then(res => {
      const updatedTweets = [...this.state.likedTweets].filter(likedTweet => {
        return likedTweet.id !== tweetId
      })
      this.setState({likedTweets: updatedTweets})
    })
    .catch(err => {
      console.log(err)
    })
  }

  fetchTweet = (tweetId) => {
    axios.get(`/api/v1/tweets/${tweetId}.json`)
    .then(res => {
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

  fetchTweets = () => {
    const {likedTweets, page, totalPages, filteredTagName} = this.state
    let url = filteredTagName ? `/api/v1/tweets.json?tag=${filteredTagName}&page=${page}` : `/api/v1/tweets.json?page=${page}`
    axios.get(url)
    .then(res => {
      this.setState({
        likedTweets: [...likedTweets, ...res.data.data],
        totalPages: res.data.total_pages,
        loading: false
      })
    })
    .catch(res => {
      console.log('error in fetchTweets')
    })
  }

  fetchTags = () => {
    axios.get('/api/v1/tag_counts.json', { user_id: this.state.userId }) // or whatever url
    .then(res => {
      this.setState({
        tagsInCloud: res.data.data
      })
    })
    .catch(res => {
      console.log('error in fetchTags')
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
    this.fetchTags()
    this.scrollListener = window.addEventListener('scroll', (e) => {
      this.handleScroll(e)
    })
  }

  render(){
    const tweets = this.state.likedTweets.map((likedTweet) => {
      return(
        <Tweet
          likedTweetId={likedTweet.id}
          tweetId={likedTweet.attributes.tweet_id}
          key={likedTweet.attributes.tweet_id}
          userId={this.state.userId}
          tags={likedTweet.attributes.tags}
          taggings={likedTweet.attributes.taggings}
          createTagging={this.createTagging}
          deleteTagging={this.deleteTagging}
          deleteTweet={this.deleteTweet}
          filterByTagName={this.filterByTagName}
        />
      )
    })

    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <FetchRecentTweetsButton fetchRecentTweets={this.fetchRecentTweets}/>
              { this.state.filteredTagName ?
                <TagFilter filteredTagName={this.state.filteredTagName} clearTagFilter={this.clearTagFilter}/>
                : ''
              }
              {tweets}
            </div>
            <div className="col-sm-6 tag-column">
              <TagCloud
                tagsInCloud={this.state.tagsInCloud}
                filterByTagName={this.filterByTagName}
              />
            </div>
          </div>
        </div>
        <span id="page-bottom"></span>
      </React.Fragment>
    )
  }
}


export default Tweets
