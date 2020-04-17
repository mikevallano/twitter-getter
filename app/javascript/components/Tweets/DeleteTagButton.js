import React, { Component } from 'react'
import axios from 'axios'

class DeleteTagButton extends React.Component {

  // handleDelete = event => {
  //   event.preventDefault();
  //
  //   axios
  //     .delete(`/api/v1/taggings/${this.props.tagging_id}.json`)
  //     .then(res => {
  //       console.log('got deleted')
  //       console.log('this.props.tagging_id ', this.props.tagging_id)
  //       this.props.passTester
  //       })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }

  render(){
    return (
      <React.Fragment>
        <button className='btn' type='submit' value={this.props.tagging_id} onClick={this.props.handleTaggingDelete}>
          (xxx)
        </button>
      </React.Fragment>
    )
  }
}

export default DeleteTagButton
