import React, {Component} from 'react'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import {CardHeader} from 'material-ui/Card'
import GridList, { GridListTile } from 'material-ui/GridList'
import './DetailPost.css'
import Response from './controls/ResponseControl'
import { ResponseCard } from './controls/ReadableCardControl'
import VoteActions from './controls/VoteActionsControl'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPost, deletePost, votePost} from '../actions/PostsActions'
import { fetchComments, voteComments, addNewComment, changeComment, removeComment} from '../actions/CommentsActions'
import PropTypes from 'prop-types'
import {initialPost} from '../reducers/PostsReducer'
import {prepareVoteForAPI, getColorForName} from '../utils/helper'
import sortBy from 'sort-by'
import { v4 } from 'uuid'
import moment from 'moment'
import {Link} from 'react-router-dom'

/**
* @description Represents the detail article page
* @constructor
*/
class Posts extends Component {
  static propTypes = {
    post: PropTypes.object,
    getPost: PropTypes.func.isRequired,
    comments: PropTypes.array,
    isLoading: PropTypes.bool.isRequired,
  };

  /**
  * @description event new comment
  * adds new comment to the redux-state
  * @param {string} author - the author
  * @param {string} body - the comment
  */
  handleNewComment = (author, body)=>{
    this.props.addNewComment({
        id: v4(),
        parentId: this.props.post.id,
        timestamp: Date.now(),
        author: author,
        body: body
      })
  }

  /**
  * @description event change comment
  * changes a comment in the redux-state
  * @param {object} comment - the old comment
  * @param {string} author - the author
  * @param {string} body - the comment
  */
  handleEditComment = (comment, author, body)=>{
    this.props.changeComment({
        ...comment,
        timestamp: Date.now(),
        author: author,
        body: body
      })
  }

  /**
  * @description event delete comment
  * deletes a comment from the redux-state
  * @param {object} comment - the comment
  */
  handleDeleteComment = (comment)=>{
    this.props.removeComment(comment)
  }

  /**
  * @description event changes votes for a article
  * changes votes for a article in the redux-state
  * @param {object} votes - the vote
  */
  handleVoteChangeClick = (votes) =>{
    this.props.votePost(this.props.post.id, prepareVoteForAPI(votes.difference))
  }

  /**
  * @description event changes votes for a comment
  * changes votes for a comment in the redux-state
  * @param {string} id - the id of the comment
  * @param {object} votes - the vote
  */
  handleCommentVoteChangeClick = (id, votes) =>{
    this.props.voteComments(id, prepareVoteForAPI(votes.difference))
  }

  /**
  * @description event changed the page to edit a article
  */
  handleEditClick = () => {
    this.props.history.push('/post/edit/'+this.props.post.id);
  }

  /**
  * @description event the article
  * deletes this article from the redux-state
  */
  handleDeleteClick = () => {
    this.props.deletePost(this.props.post);
    this.props.history.push('/')
  }

  /**
  * @description react lifecycle
  * fetch the post and comments for this post
  */
  componentDidMount() {
    const { postId } = this.props.match.params;
    this.props.getPost(postId);
    this.props.fetchComments(postId);
  }

  render() {
    const post= this.props.post ||  {...initialPost, title:"Ooops something went wrong", body:"Article can't be found.", timestamp:new Date()};
    const hasPost = Boolean(this.props.post)

    const firstLetter = hasPost ? post.author.substring(0,1).toUpperCase() : "?"
    const avatarColor = hasPost ? getColorForName(post.author) : "#f44336";

    const mDate = moment(post.timestamp);
    const dateTime = mDate.format(`MMM D ${moment().year !== mDate.year ? "YYYY" : ""}, h:mm:ss`)

    return (
      <main className="article main-content main-content--defWidth">
        <header>
          <CardHeader
            className={`article__header card__header}`}
            title={post.author}
            subheader={`${dateTime}`}
            avatar={<Avatar  style={{backgroundColor:avatarColor}} aria-label="Author" >{firstLetter}</Avatar>}>
          </CardHeader>

          <Typography variant="display1" gutterBottom  align="left">
            {post.title}
          </Typography>
        </header>

        <article className="article__content">
          <Typography>
            {post.body}
          </Typography>
          {!hasPost && (
            <div>
              <br />
                <Typography>Here are some helpfull links instead:</Typography>
                <Link className='link page404__link' to="/">Home</Link>
              </div>
              )}
        </article>

        <section className="article__actions">
          <Divider className="article__divider" />

          <VoteActions disabled={!hasPost} onVoteChange={this.handleVoteChangeClick}
            onDeleteClick={this.handleDeleteClick}
            onEditClick={this.handleEditClick}
            discardText="Discard article?"
            className="article__voteActions"
            votes={post.voteScore} />

          <Divider className="article__divider"  />
        </section>

        <section className={`article__write-response-section ${!hasPost ? "article__write-response-section--hidden" : ""}`}>
          <Response disabled={!hasPost} className="article__write-response" onChange={this.handleNewComment} hasEditMode={true} isSimpleEditControl={true} title={this.props.comments.length>0 ? "Write a response..." : "Be the first to write a response"}></Response>
        </section>

        <section className={`article__responses-section ${!hasPost ? "article__responses-section--hidden" : ""}`}>
          <Typography variant="subheading">
            {this.props.comments.length>0 ? `Conversation about "${post.title}":` : ""}
          </Typography>
          <GridList cellHeight='auto'  spacing={16} className="article__responses" cols={1}>
            {this.props.comments.map(comment => (
              <GridListTile id={`comment${comment.id}`} key={comment.id}>
                <ResponseCard
                  onChange={(author, body)=>this.handleEditComment(comment,author, body)}
                  hasEditMode={true}
                  author={comment.author}
                  avatarColor={getColorForName(comment.author)}
                  votes={comment.voteScore}
                  date={new Date(comment.timestamp)}
                  onDeleteClick={()=>this.handleDeleteComment(comment)}
                  onVoteChange={(votes) => this.handleCommentVoteChangeClick(comment.id, votes)}
                  message={comment.body} />
              </GridListTile>
            ))}
          </GridList>
        </section>
      </main>)
  }
}

function mapStateToProps({posts, comments, loadingBar}, { match }) {
  const commentsArray =  comments ? comments[match.params.postId] || [] : []
  return {
    post: posts.find(post=> post.id === match.params.postId),
    comments : commentsArray.sort(sortBy('-timestamp')),
    isLoading: loadingBar.default > 0
  }
}

export default withRouter(connect(mapStateToProps, {
  getPost,
  deletePost,
  votePost,
  fetchComments,
  voteComments,
  addNewComment,
  changeComment,
  removeComment
})(Posts));
