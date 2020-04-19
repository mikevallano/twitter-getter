import React, { Component } from 'react'
import EmbededTweet from './EmbededTweet'
import TagForm from './TagForm'
import Tags from './Tags'
import axios from 'axios'

class Tweet extends React.Component {
  constructor() {
    super()
    this.state = {
      formTagNames: '',
      taggings: []
    }
  }

  render(){
    return (
      <React.Fragment>
        <EmbededTweet tweet_id={this.props.tweet_id}/>
        <Tags taggings={this.props.taggings} handleTaggingDelete={this.props.handleTaggingDelete} />
        <TagForm tweet_id={this.props.tweet_id} user_id={this.props.user_id} tags={this.props.tags} taggings={this.props.taggings} handleTagSubmit={this.props.handleTagSubmit} />
      </React.Fragment>
    )
  }
}

export default Tweet
