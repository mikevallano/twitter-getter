import React from 'react'
import EmbededTweet from './EmbededTweet'
import DeleteTweet from './DeleteTweet'
import TagForm from './TagForm'
import Tags from './Tags'

const Tweet = (props) => {
  return (
    <>
      <DeleteTweet
        likedTweetId={props.likedTweetId}
        deleteTweet={props.deleteTweet}
      />
      <EmbededTweet tweetId={props.tweetId}/>
      { props.taggings.length > 0 ?
        <Tags
          taggings={props.taggings}
          deleteTagging={props.deleteTagging}
          filterByTagName={props.filterByTagName}
        />
        : ''
      }
      <TagForm
        tweet_id={props.tweetId}
        likedTweetId={props.likedTweetId}
        user_id={props.userId}
        tags={props.tags}
        taggings={props.taggings}
        createTagging={props.createTagging}
      />
    </>
  )
}

export default Tweet
