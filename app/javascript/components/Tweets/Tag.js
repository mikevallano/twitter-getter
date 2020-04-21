import React, { Component } from 'react'
import DeleteTagButton from './DeleteTagButton'

class Tag extends React.Component {
  handleClick = event => {
    event.preventDefault();
    this.props.filterByTagName(this.props.name)
  }

  render() {
    return (
      <React.Fragment>
        <span className="tag-container">
          <span className='clicky' onClick={this.handleClick}>{this.props.name}</span>
          <DeleteTagButton taggingId={this.props.taggingId} deleteTagging={this.props.deleteTagging} />
        </span>
      </React.Fragment>
    )
  }
}

export default Tag
