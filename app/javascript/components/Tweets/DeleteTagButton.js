import React, { Component } from 'react'
import axios from 'axios'

class DeleteTagButton extends React.Component {

  handleDelete = event => {
    event.preventDefault();

    this.props.handleTaggingDelete(this.props.tagging_id)
  }

  render(){
    return (
      <React.Fragment>
        <button className='btn' type='submit' onClick={this.handleDelete}>
          (xxx)
        </button>
      </React.Fragment>
    )
  }
}

export default DeleteTagButton
