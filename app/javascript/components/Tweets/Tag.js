import React, { Component } from 'react'
import DeleteTagButton from './DeleteTagButton'

class Tag extends React.Component {
  handleClick = event => {
    console.log('handleClick called')
    console.log('tag name: ', this.props.name)
    event.preventDefault();

  this.props.handleTagClick(this.props.name)
  }

  render() {
    return (
      <React.Fragment>
        <span className="tag-container">
          <span className='clicky' onClick={this.handleClick}>{this.props.name}</span>
          <DeleteTagButton tagging_id={this.props.tagging_id} handleTaggingDelete={this.props.handleTaggingDelete} />
        </span>
      </React.Fragment>
    )
  }
}

export default Tag
