import React, { Component } from 'react'
import EmbededTweet from './EmbededTweet'
import TagForm from './TagForm'

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
        <div className="tags-container" >
          Tags:
          <span className="tag-container">tag one (x)</span>
          <span className="tag-container">tag two (x)</span>
        </div>
        <TagForm tweet_id={this.props.tweet_id} user_id={this.props.user_id}/>
      </React.Fragment>
    )
  }
}

export default Tweet
