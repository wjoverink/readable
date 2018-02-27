import React, {Component} from 'react';
import moment from 'moment'
import Response from './ResponseControl'
import PropTypes from 'prop-types'

/**
* @description Represents a comment card
* @constructor
*/
class ResponseCard extends Response {
  static propTypes = {
    author: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    message: PropTypes.string.isRequired,
    votes: PropTypes.number,
    onVoteChange: PropTypes.func,
    onEditClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
    backgroundColor: PropTypes.string,
    avatarColor: PropTypes.string,
  }

  render() {
    const {
      author,
      date,
      ...props
    } = this.props
    const firstLetter = author.substring(0, 1).toUpperCase()
    const mDate = moment(date);
    const formatedDate = mDate.format(`MMM D ${moment().year !== mDate.year ? "YYYY" : ""}, h:mm:ss`)
    return (<Response discardText="Discard comment?" title={author} className="ResponseCard" subTitle={`${formatedDate}`} icon={firstLetter} {...props}/>);
  }
}

/**
* @description Represents a Article card
* @constructor
*/
class PostCard extends Response {
  static propTypes = {
    title: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    name: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    comments: PropTypes.number,
    votes: PropTypes.number,
    onVoteChange: PropTypes.func,
    onEditClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
    avatarColor: PropTypes.string,
  }
  render() {
    const {
      title,
      date,
      comments = 0,
      name,
      ...props
    } = this.props

    const mDate = moment(date);
    const formatedDate = mDate.format(`MMM D ${moment().year() !== mDate.year() ? "YYYY" : ""}`)

    const firstLetter = title.substring(0, 1).toUpperCase()
    return (<Response discardText="Discard article?" title={title} className="postCard" subTitle={`${name} - ${formatedDate} - Comments: ${comments}`} icon={firstLetter} {...props}/>);
  }
}

export {
  PostCard,
  ResponseCard
}
