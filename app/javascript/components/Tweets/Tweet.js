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
          deleteTagging={this.props.deleteTagging}
          filterByTagName={this.props.filterByTagName}
        />
        <TagForm
          tweet_id={this.props.tweetId}
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
