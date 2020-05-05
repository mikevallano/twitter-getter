import React, { Component } from 'react'
import Tag from './Tag'

class Tags extends React.Component {
  render(){
    const tags = this.props.taggings.map((tagging) => {
      return(
        <Tag
          name={tagging.tag_name}
          key={tagging.id}
          id={tagging.id}
          taggingId={tagging.id}
          tagging={tagging}
          likedTweetId={tagging.liked_tweet_id}
          deleteTagging={this.props.deleteTagging}
          filterByTagName={this.props.filterByTagName}
        />
      )
    })

    return (
      <React.Fragment>
        <div className="tags-container">
          Tags: {tags}
        </div>
      </React.Fragment>
    )
  }
}

export default Tags
