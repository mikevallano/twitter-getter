import React, { Component } from 'react'
import axios from 'axios'

class TagForm extends React.Component {
  constructor() {
    super()
  }

  render(){
    return (
      <React.Fragment>
        <div className="form-group tag-form">
          <form onSubmit={this.props.handleTagSubmit} className="tag-tester">
            <input type="text" name="tag_names" className="form-control" placeholder="add tags" onChange={this.props.handleFormChange} />
            <input type="hidden" name="tweet_id" value={this.props.tweet_id} />
            <input type="hidden" name="user_id" value={this.props.user_id} />
          </form>
        </div>
      </React.Fragment>
    )
  }
}

export default TagForm
