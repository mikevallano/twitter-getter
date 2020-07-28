import React, { Component } from 'react'

class TagInCloud extends React.Component {
  handleClick = event => {
    event.preventDefault();
    this.props.filterByTagName(this.props.name)
  }

  render() {
    return (
      <React.Fragment>
        <span className='tag-container clicky' onClick={this.handleClick}>{this.props.name}</span>
      </React.Fragment>
    )
  }
}

export default TagInCloud