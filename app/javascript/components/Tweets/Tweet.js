import React, { Component } from 'react'
import EmbededTweet from './EmbededTweet'
import TagForm from './TagForm'
import Tags from './Tags'
import axios from 'axios'

class Tweet extends React.Component {
  constructor() {
    super()
    this.state = {
      formTagNames: '',
      taggings: []
    }
  }


  fetchTaggingsList = () => {
    console.log('fetchTaggingsList called')
    axios.get(`/api/v1/taggings?tweet_id=${this.props.tweet_id}`)
      .then(res => {
        // console.log('res: ', res)
        let fetchedTaggings = res.data.data.map(d => d.attributes)
        console.log('fetchedTaggings: ', fetchedTaggings)
        this.setState({
          taggings: fetchedTaggings
        })
      })
  }

  handleFormChange = event => {
    this.setState({ formTagNames: event.target.value });
  }

  handleTagSubmit = event => {
    event.preventDefault();

    const tagging = {
      tag_names: this.state.formTagNames,
      liked_tweet_id: this.props.tweet_id
    }

    // axios.post('/api/v1/taggings', {tagging})
    //   .then(res => {
    //     console.log('res.data.data', res.data.data)
    //     var currentTaggings = this.props.taggings
    //     this.setState({
    //       taggings: res.data.data.forEach(obj => {
    //         currentTaggings.push(obj.attributes)
    //       })
    //     })
    //   })
    axios.post('/api/v1/taggings', {tagging})
      .then(res => {
        this.fetchTaggingsList()
        // let newTaggings = res.data.data.forEach(obj => {
        //   return this.props.taggings.push(obj.attributes)
        // })
        // console.log('res.data.data', res.data.data)
        // console.log('newTaggings: ', newTaggings)
        // var currentTaggings = this.props.taggings
        // this.setState({
        //   taggings: newTaggings
        //   // taggings: res.data.data.forEach(obj => {
        //   //   this.props.taggings.push(obj.attributes)
        //   // })
        // })
      })
  }

  handleTaggingDelete = event => {
    event.preventDefault()
    let tagging_id = event.target.value
    let taggingsBeforeDelete = this.props.taggings
    console.log('taggingsBeforeDelete: ', taggingsBeforeDelete)
    let newTaggingz = taggingsBeforeDelete.filter(tagging => tagging.id != tagging_id)
    console.log('newTaggings: ', newTaggingz)
    axios
      .delete(`/api/v1/taggings/${tagging_id}.json`)
      .then(res => {
        this.setState({
            taggings: newTaggingz
          })
        })
      .catch(err => {
        console.log(err)
      })
  }

  render(){
    return (
      <React.Fragment>
        <EmbededTweet tweet_id={this.props.tweet_id}/>
        <Tags taggings={this.props.taggings} handleTaggingDelete={this.handleTaggingDelete.bind(this)} />
        <TagForm tweet_id={this.props.tweet_id} user_id={this.props.user_id} tags={this.props.tags} taggings={this.props.taggings} handleTagSubmit={this.handleTagSubmit.bind(this)} handleFormChange={this.handleFormChange.bind(this)} />
      </React.Fragment>
    )
  }
}

export default Tweet
