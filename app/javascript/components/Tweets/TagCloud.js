import React, { Component } from 'react'
import TagInCloud from './TagInCloud'

class TagCloud extends React.Component {
  render() {
    const tags = this.props.tagsInCloud.map((tagName) => {
      return (
        <TagInCloud
          name={tagName}
          key={tagName}
          filterByTagName={this.props.filterByTagName}
        />
      )
    })

    return (
      <React.Fragment>
        <div className="tags-in-cloud">
          Tags Cloud: {tags}
        </div>
      </React.Fragment>
    )
  }
}

export default TagCloud