import React, { Component } from 'react'
import EmbededTweet from './EmbededTweet'
import TagForm from './TagForm'
import Tags from './Tags'
import axios from 'axios'

class Tweet extends React.Component {
  render(){
    return (
      <React.Fragment>
        <EmbededTweet tweetId={this.props.tweetId}/>
        <Tags
          taggings={this.props.taggings}
          handleTaggingDelete={this.props.handleTaggingDelete}
          handleTagClick={this.props.handleTagClick}
        />
        <TagForm
          tweet_id={this.props.tweetId}
          user_id={this.props.userId}
          tags={this.props.tags}
          taggings={this.props.taggings}
          handleTagSubmit={this.props.handleTagSubmit}
        />
      </React.Fragment>
    )
  }
}

export default Tweet
