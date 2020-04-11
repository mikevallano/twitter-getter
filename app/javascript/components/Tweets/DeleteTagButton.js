import React, { Component } from 'react'
import axios from 'axios'

class DeleteTagButton extends React.Component {

  handleDelete = event => {
    event.preventDefault();

    axios
      .delete(`/api/v1/taggings/${this.props.tagging_id}`)
      .then(res => {
        console.log(res)
        })
      .catch(err => {
        console.log(err)
      })
  }

  render(){
    return (
      <React.Fragment>
        <button className='btn' type='submit' onClick={this.handleDelete}>
          (x)
        </button>
      </React.Fragment>
    )
  }
}

export default DeleteTagButton
