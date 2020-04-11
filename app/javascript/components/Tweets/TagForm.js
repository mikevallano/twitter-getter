import React, { Component } from 'react'
import axios from 'axios'

class TagForm extends React.Component {
  constructor() {
    super()
    this.state = {
      tweet_id: '',
      tags: [],
      tag_names: '',
      taggings: []
    }
  }

  handleChange = event => {
    // console.log('event.target: ', event.target)
    // console.log('event.target.parent: ', event.target.parent)
    this.setState({ tag_names: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const tagging = {
      tag_names: this.state.tag_names,
      liked_tweet_id: this.props.tweet_id
    }

    console.log('tagging: ', tagging)

    axios.post('/api/v1/taggings', {tagging})
      .then(res => {
        var currentTaggings = this.props.taggings
        this.setState({
          taggings: res.data.data.forEach(obj => {
            currentTaggings.push(obj.attributes)
          })
        })
      })
  }

  render(){
    // https://alligator.io/react/axios-react/
    return (
      <React.Fragment>
        <div className="form-group tag-form">
          <form onSubmit={this.handleSubmit} className="tag-tester">
            <input type="text" name="tag_names" className="form-control" placeholder="add tags" onChange={this.handleChange} />
            <input type="hidden" name="tweet_id" value={this.props.tweet_id} />
            <input type="hidden" name="user_id" value={this.props.user_id} />
          </form>
        </div>
      </React.Fragment>
    )
  }
}

export default TagForm
