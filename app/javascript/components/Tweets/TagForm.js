import React, { Component } from 'react'
import axios from 'axios'

class TagForm extends React.Component {
  constructor() {
    super()
    this.state = {
      formTagNames: ''
    }
  }

  submitForm = event => {
    event.preventDefault()

    const tagging = {
      tag_names: this.state.formTagNames,
      liked_tweet_id: this.props.tweet_id
    }

    this.props.handleTagSubmit(tagging)
    this.setState({ formTagNames: ''})
  }

  formChange = event => {
    this.setState({ formTagNames: event.target.value });
  }

  render(){
    return (
      <React.Fragment>
        <div className="form-group tag-form">
          <form onSubmit={this.submitForm} className="tag-tester">
            <input type="text" name="tag_names" value={this.state.formTagNames} className="form-control" placeholder="add tags" onChange={this.formChange} />
            <input type="hidden" name="tweet_id" value={this.props.tweet_id} />
            <input type="hidden" name="user_id" value={this.props.user_id} />
          </form>
        </div>
      </React.Fragment>
    )
  }
}

export default TagForm
