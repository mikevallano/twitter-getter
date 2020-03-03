import React, { Component } from 'react'

class TagForm extends React.Component {
  render(){
    return (
      <React.Fragment>
        <div className="form-group tag-form">
          <form action="" className="tag-tester">
            <input type="text" name="tacos" className="form-control" placeholder="add tags" />
            <input type="hidden" name="tweet_id" value={this.props.tweet_id} />
            <input type="hidden" name="user_id" value={this.props.user_id} />
          </form>
        </div>
      </React.Fragment>
    )
  }
}

export default TagForm
