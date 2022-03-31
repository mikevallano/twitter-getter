import React from 'react'

const DeleteTweet = (props) => {

  const handleClick = () => {
    props.deleteTweet(props.likedTweetId)
  }

  return <p onClick={handleClick} className='delete-tweet-btn clicky'>(x)</p>
}

export default DeleteTweet
