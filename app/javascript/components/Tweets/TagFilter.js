import React, { Component } from 'react'

class TagFilter extends React.Component {
  handleClick = event => {
    event.preventDefault()
    this.props.clearTagFilter()
  }

  render(){
    return (
      <React.Fragment>
        <p>Filtered by tag: {this.props.filteredTagName} <span className='clicky' onClick={this.handleClick}>(x)</span></p>
      </React.Fragment>
    )
  }
}

export default TagFilter
