import React, { useState, useEffect } from 'react'
import Tweet from './Tweet'
import TagFilter from './TagFilter'
import FetchRecentTweetsButton from './FetchRecentTweetsButton'
import TagCloud from './TagCloud'
import axios from 'axios'

const Tweets = () => {
  const [likedTweets, setLikedTweets] = useState([])
  const [userId, setUserId] = useState(null)
  const [filteredTagName, setFilteredTagName] = useState(null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [infiniteSrollFetch, setInfiniteScrollFetch] = useState(false)
  const [tagsInCloud, setTagsInCloud] = useState([])
  const [totalPages, setTotalPages] = useState(1)

  const createTagging = (tagging) => {
    axios.post('/api/v1/taggings.json', {tagging})
    .then(() => {
      let addedTags = tagging.tag_names.split(', ')
      let newTags = [... new Set(tagsInCloud.concat(addedTags))]
      setTagsInCloud(newTags)
      fetchTweet(tagging.liked_tweet_id)
    })
  }

  const fetchRecentTweets = () => {
    axios.post('/api/v1/tweets.json', {user_id: userId})
    .then(() => {
      setPage(1)
      setFilteredTagName(null)
      setLoading(true)
      // setLikedTweets([])
    })
  }

  const filterByTagName = (tagName) => {
    console.log(`tagName: ${tagName}`)
    window.scrollTo(0, 0);
    setPage(1)
    setFilteredTagName(tagName)
    setLoading(true)
    // setLikedTweets([])
  }

  const clearTagFilter = () => {
    setPage(1)
    setFilteredTagName(null)
    setLoading(true)
    // setLikedTweets([])
  }

  const deleteTagging = (tagging) => {
    axios
      .delete(`/api/v1/taggings/${tagging.id}.json`)
      .then(() => {
        fetchTweet(tagging.liked_tweet_id)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const deleteTweet = (tweetId) => {
    axios
    .delete(`/api/v1/tweets/${tweetId}.json`)
    .then(() => {
      const updatedTweets = [...likedTweets].filter(likedTweet => {
        return likedTweet.id !== tweetId
      })
      setLikedTweets(updatedTweets)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const fetchTweet = (tweetId) => {
    axios.get(`/api/v1/tweets/${tweetId}.json`)
    .then(res => {
      const updatedTweets = [...likedTweets].map(likedTweet => {
        if (res.data.data.id === likedTweet.id) {
          return res.data.data
        } else {
          return likedTweet
        }
      })
      setLikedTweets(updatedTweets)
    })
  }

  const fetchFilteredTweets = () => {
    const url = `/api/v1/tweets.json?tag=${filteredTagName}&page=${page}`
    axios.get(url)
      .then(res => {
        setLikedTweets([...res.data.data])
        setTotalPages(res.data.total_pages)
        setLoading(false)
        // setInfiniteScrollFetch(false)
      })
      .catch(() => {
        console.log('error in fetchTweets')
      })
  }

  const fetchTweets = () => {
    console.log(`page: ${page}`)
    console.log(`likedTweets.length in fetchTweets: ${likedTweets.length}`)
    let url = filteredTagName ?
      `/api/v1/tweets.json?tag=${filteredTagName}&page=${page}` :
      `/api/v1/tweets.json?page=${page}`
    axios.get(url)
    .then(res => {
      setLikedTweets([...likedTweets, ...res.data.data])
      setTotalPages(res.data.total_pages)
      setLoading(false)
      // setInfiniteScrollFetch(false)
    })
    .catch(() => {
      console.log('error in fetchTweets')
    })
  }

  const fetchTags = () => {
    axios.get('/api/v1/tag_counts.json', { user_id: userId })
    .then(res => {
      setTagsInCloud(res.data.data)
    })
    .catch(() => {
      console.log('error in fetchTags')
    })
  }

  const handleScroll = () => {
    if (loading) return
    if (page > totalPages) return
    const pageBottom = document.getElementById('page-bottom')
    const pageBottomOffset = pageBottom.offsetTop + pageBottom.clientHeight
    const pageOffset = window.pageYOffset + window.innerHeight
    const bottomBuffer = 50 // in px. buffer to prevent having to scroll to very bottom
    if (pageOffset > pageBottomOffset - bottomBuffer) {
      loadMore()
    }
  }

  const loadMore = () => {
    setPage((page + 1))
    setLoading(true)
    setInfiniteScrollFetch(true)
  }

  useEffect(() => {
    console.log('in main useEffect')
    // fetchTweets()
    fetchTags()
    window.addEventListener('scroll', (event) => {
      handleScroll(event)
    })
  }, [])

  // When filteredTagName is updated, fetch tweets
  useEffect(() => {
    console.log('filteredTagName in specific useEffect: ', filteredTagName)
    if (filteredTagName === null) {
      // setLikedTweets([])
      fetchTweets()
    } else {
      fetchFilteredTweets()
    }
  }, [filteredTagName, infiniteSrollFetch])

  const tweets = likedTweets.map((likedTweet) => {
    return(
      <Tweet
        likedTweetId={likedTweet.id}
        tweetId={likedTweet.attributes.tweet_id}
        key={likedTweet.attributes.tweet_id}
        userId={userId}
        tags={likedTweet.attributes.tags}
        taggings={likedTweet.attributes.taggings}
        createTagging={createTagging}
        deleteTagging={deleteTagging}
        deleteTweet={deleteTweet}
        filterByTagName={filterByTagName}
      />
    )
  })

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <FetchRecentTweetsButton fetchRecentTweets={fetchRecentTweets}/>
            { filteredTagName ?
              <TagFilter filteredTagName={filteredTagName} clearTagFilter={clearTagFilter}/>
              : ''
            }
            {tweets}
          </div>
          <div className="col-sm-6 tag-column">
            <TagCloud
              tagsInCloud={tagsInCloud}
              filterByTagName={filterByTagName}
            />
          </div>
        </div>
      </div>
      <span id="page-bottom"></span>
    </>
  )
}


export default Tweets
