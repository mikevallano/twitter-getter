import React, {useState} from 'react'

const TagForm = (props) => {
  const [formTagNames, setFormTagNames] = useState('')

  const submitForm = event => {
    event.preventDefault()

    const tagging = {
      tag_names: formTagNames,
      liked_tweet_id: props.likedTweetId,
      tweet_id: props.tweet_id
    }

    props.createTagging(tagging)
    setFormTagNames('')
  }

  const formChange = event => {
    setFormTagNames(event.target.value)
  }

  return (
    <>
      <div className="form-group tag-form">
        <form onSubmit={submitForm} className="tag-tester">
          <input type="text" value={formTagNames} className="form-control" placeholder="add tags" onChange={formChange} />
        </form>
      </div>
    </>
  )
}

export default TagForm
