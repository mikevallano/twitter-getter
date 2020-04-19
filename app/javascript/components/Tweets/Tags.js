import React, { Component } from 'react'
import Tag from './Tag'

class Tags extends React.Component {
  constructor() {
    super()
    this.state = {
      tags: []
    }
  }

  render(){
    const tags = this.props.taggings.map((tagging) => {
      return(
        <Tag name={tagging.tag_name} key={tagging.id} id={tagging.id} tagging_id={tagging.id} handleTaggingDelete={this.props.handleTaggingDelete}/>
      )
    })

    return (
      <React.Fragment>
        <div className="tags-container">
          Tags: {tags}
        </div>
      </React.Fragment>
    )
  }
}

export default Tags