import React, { Component } from 'react'
import DeleteTagButton from './DeleteTagButton'

class Tag extends React.Component {
  render() {
    return (
      <React.Fragment>
        <span className="tag-container">
          {this.props.name} <DeleteTagButton tagging_id={this.props.tagging_id} handleTaggingDelete={this.props.handleTaggingDelete} />
        </span>
      </React.Fragment>
    )
  }
}

export default Tag
