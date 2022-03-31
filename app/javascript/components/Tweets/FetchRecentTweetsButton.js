import React from 'react'

const FetchRecentTweetsButton = (props) => {
  const handleClick = event => {
    event.preventDefault()
    props.fetchRecentTweets()
  }

  return (
    <button className='btn btn-primary' onClick={handleClick}>Fetch Recent Tweets</button>
  )
}

export default FetchRecentTweetsButton
