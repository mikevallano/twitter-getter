import React from 'react'
import Tag from './Tag'

const Tags = (props) => {
  const tags = props.taggings.map((tagging) => {
    return(
      <Tag
        name={tagging.tag_name}
        key={tagging.id}
        id={tagging.id}
        taggingId={tagging.id}
        tagging={tagging}
        likedTweetId={tagging.liked_tweet_id}
        deleteTagging={props.deleteTagging}
        filterByTagName={props.filterByTagName}
      />
    )
  })
  return (
    <>
      <div className="tags-container">
        Tags: {tags}
      </div>
    </>
  )
}

export default Tags
