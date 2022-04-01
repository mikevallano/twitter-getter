import React from 'react'
import DeleteTagButton from './DeleteTagButton'

const Tag = (props) => {
  const handleClick = event => {
    event.preventDefault();
    props.filterByTagName(props.name)
  }
  return (
    <>
      <span className="tag-container">
        <span className='clicky' onClick={handleClick}>{props.name}</span>
        <DeleteTagButton tagging={props.tagging} deleteTagging={props.deleteTagging} />
      </span>
    </>
  )
}

export default Tag
