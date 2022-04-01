import React from 'react'

const DeleteTagButton = (props) => {

  const handleDelete = event => {
    event.preventDefault();
    props.deleteTagging(props.tagging)
  }

  return (
    <>
      <span className='clicky' onClick={handleDelete}>
        (x)
      </span>
    </>
  )
}

export default DeleteTagButton
