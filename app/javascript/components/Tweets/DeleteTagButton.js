import React, { Component } from 'react'
import axios from 'axios'

class DeleteTagButton extends React.Component {

  handleDelete = event => {
    event.preventDefault();
    this.props.deleteTagging(this.props.tagging)
  }

  render(){
    return (
      <React.Fragment>
        <span className='clicky' onClick={this.handleDelete}>
          (x)
        </span>
      </React.Fragment>
    )
  }
}

export default DeleteTagButton
