import React from 'react'
import ReactDOM from 'react-dom'
import Tweets from '../components/Tweets/Tweets'
import 'bootstrap/dist/css/bootstrap.min.css'


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Tweets />,
    document.getElementById('tweets').appendChild(document.createElement('div')),
  )
})
