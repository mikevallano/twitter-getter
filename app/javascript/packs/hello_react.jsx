// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Tweet from '../components/Tweets/Tweet'
import { TwitterTweetEmbed } from 'react-twitter-embed'


const Hello = props => (
  <div className='container'>Hello {props.name}!</div>
)

Hello.defaultProps = {
  name: 'David'
}

Hello.propTypes = {
  name: PropTypes.string
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    // <Hello name="React" />,
    <Tweet tweet_id={'1232613076630953984'} user_id={1}/>,
    document.body.appendChild(document.createElement('div')),
    // to use twttr.widgets, the twitter JS needs to be included in layout or somewhere:  
    // <script sync src="https://platform.twitter.com/widgets.js"></script>
    // twttr.widgets.createTweet(
    //   '1232613076630953984',
    //   document.getElementById('twits'),
    //   {
    //     theme: 'dark'
    //   }
    // )
  )
})
