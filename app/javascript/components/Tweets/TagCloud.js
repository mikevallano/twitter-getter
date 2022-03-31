import React from 'react'
import TagInCloud from './TagInCloud'

const TagCloud = (props) => {
  const tags = props.tagsInCloud.map((tagName) => {
    return (
      <TagInCloud
        name={tagName}
        key={tagName}
        filterByTagName={props.filterByTagName}
      />
    )
  })

  return <>{tags}</>
}

export default TagCloud
