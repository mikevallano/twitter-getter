import React, { Component } from 'react'
import DeleteTagButton from './DeleteTagButton'

class Tag extends React.Component {
  handleClick = event => {
    event.preventDefault();
    this.props.handleTagClick(this.props.name)
  }

  render() {
    return (
      <React.Fragment>
        <span className="tag-container">
          <span className='clicky' onClick={this.handleClick}>{this.props.name}</span>
          <DeleteTagButton taggingId={this.props.taggingId} handleTaggingDelete={this.props.handleTaggingDelete} />
        </span>
      </React.Fragment>
    )
  }
}

export default Tag
