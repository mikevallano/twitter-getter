import React from 'react'

const TagInCloud = ({name, filterByTagName}) => {
  const handleClick = (event) => {
    event.preventDefault();
    filterByTagName(name)
  }

  return <span className='tag-container clicky' onClick={handleClick}>{name}</span>
}

export default TagInCloud
