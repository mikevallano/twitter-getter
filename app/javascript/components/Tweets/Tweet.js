import React, { Component } from 'react'
import EmbededTweet from './EmbededTweet'
import TagForm from './TagForm'
import Tags from './Tags'

class Tweet extends React.Component {
  constructor() {
    super()
    this.state = {
      showTagButton: true,
      hasTags: true
    }
  }

  render(){
    return (
      <React.Fragment>
        <EmbededTweet tweet_id={this.props.tweet_id}/>
        <Tags taggings={this.props.taggings} />
        <TagForm tweet_id={this.props.tweet_id} user_id={this.props.user_id} tags={this.props.tags} taggings={this.props.taggings}/>
      </React.Fragment>
    )
  }
}

export default Tweet
