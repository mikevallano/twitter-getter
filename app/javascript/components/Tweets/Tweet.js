import React, { Component } from 'react'
import EmbededTweet from './EmbededTweet'
import DeleteTweet from './DeleteTweet'
import TagForm from './TagForm'
import Tags from './Tags'

class Tweet extends React.Component {
  render(){
    return (
      <React.Fragment>
        <DeleteTweet
          likedTweetId={this.props.likedTweetId}
          deleteTweet={this.props.deleteTweet}
        />
        <EmbededTweet tweetId={this.props.tweetId}/>
        { this.props.taggings.length > 0 ?
          <Tags
            taggings={this.props.taggings}
            deleteTagging={this.props.deleteTagging}
            filterByTagName={this.props.filterByTagName}
          />
          : ''
        }
        <TagForm
          tweet_id={this.props.tweetId}
          likedTweetId={this.props.likedTweetId}
          user_id={this.props.userId}
          tags={this.props.tags}
          taggings={this.props.taggings}
          createTagging={this.props.createTagging}
        />
      </React.Fragment>
    )
  }
}

export default Tweet
