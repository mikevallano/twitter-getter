import React from 'react'

const TagFilter = (props) => {
  const handleClick = event => {
    event.preventDefault()
    props.clearTagFilter()
  }

  return (
    <>
      <p>Filtered by tag: {props.filteredTagName}
        <span className='clicky' onClick={handleClick}>(x)</span>
      </p>
    </>
  )
}

export default TagFilter
