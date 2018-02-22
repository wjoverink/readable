import React, {Component} from 'react'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import {CardHeader} from 'material-ui/Card'
import GridList, { GridListTile } from 'material-ui/GridList'
import './DetailPost.css'
import Response, { ResponseCard } from './controls/ResponseControl'
import VoteActions from './controls/VoteActionsControl'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPost, deletePost, votePost} from '../actions/PostsActions'
import { fetchComments, voteComments, addNewComment, changeComment} from '../actions/CommentsActions'
import PropTypes from 'prop-types'
import {initialPost} from '../reducers/PostsReducer'
import {prepareVoteForAPI} from '../utils/helper'
import sortBy from 'sort-by'
import { v4 } from 'uuid';

class Posts extends Component {
  static propTypes = {
    post: PropTypes.object,
    getPost: PropTypes.func.isRequired,
    comments: PropTypes.array
  };

  state ={
    isLoading:true
  }

  handleNewComment = (author, body)=>{
    this.props.addNewComment({
        id: v4(),
        parentId: this.props.post.id,
        timestamp: Date.now(),
        author: author,
        body: body
      })
  }
  handleEditComment = (comment, author, body)=>{
    this.props.changeComment({
        ...comment,
        timestamp: Date.now(),
        author: author,
        body: body
      })
  }


  handleVoteChangeClick = (votes) =>{
    this.props.votePost(this.props.post.id, prepareVoteForAPI(votes.difference))
  }

  handleCommentVoteChangeClick = (id, votes) =>{
    this.props.voteComments(id, prepareVoteForAPI(votes.difference))
  }

  handleEditClick = () => {
    this.props.history.push('/post/edit/'+this.props.post.id);
  }

  handleDeleteClick = () => {
    this.props.deletePost(this.props.post);
    this.props.history.push('/')
  }

  componentDidMount() {
    const { postId } = this.props.match.params;
    this.props.getPost(postId);
    this.props.fetchComments(postId);
  }

  componentWillReceiveProps(props){
    this.setState({isLoading:false})
  }

  render() {
    const showNoteFound = !this.props.post && !this.state.isLoading

    const post= this.props.post ||
      (showNoteFound ? {...initialPost, title:"Ooooops something went wrong", body:"Article can't be found"} : initialPost)

    const firstLetter = post.author ? post.author.substring(0,1).toUpperCase() : ""
    const dateTime = post.timestamp ? new Date(post.timestamp).toLocaleString() : ""

    return (
      <main className="post main-content main-content--defWidth">


        <header>
          {!showNoteFound && (
            <CardHeader
              className="cardHeader response__header"
              title={post.author}
              subheader={`${dateTime}`}
              avatar={<Avatar aria-label="Author" >{firstLetter}</Avatar>}>
            </CardHeader>
          )}

          <Typography variant="title" gutterBottom  align="left">
            {post.title}
          </Typography>
        </header>

        <article>
          <Typography>
            {post.body}
          </Typography>
        </article>

        {!showNoteFound && (
          <section className="postInfo">
            <Divider />
            <VoteActions onVoteChange={this.handleVoteChangeClick} onDeleteClick={this.handleDeleteClick} onEditClick={this.handleEditClick} className="postInfo__actions" votes={post.voteScore} />

            <Divider />
          </section>
        )}

        {!showNoteFound && (
          <section className="writeResponse">
            <Response onChange={this.handleNewComment} hasEditMode={true} isSimpleEditControl={true} title={this.props.comments.length>0 ? "Write a response..." : "Be the first to write a response"}></Response>
          </section>
        )}

        {!showNoteFound && (
          <section className="responses">
            <Typography variant="subheading">
              {this.props.comments.length>0 ? `Conversation about "${post.title}":` : ""}
            </Typography>
            <GridList cellHeight='auto'  spacing={16} className="comments" cols={1}>
              {this.props.comments.map(comment => (
                <GridListTile key={comment.id}>
                  <ResponseCard
                    onChange={(author, body)=>this.handleEditComment(comment,author, body)}
                    hasEditMode={true}
                    author={comment.author}
                    votes={comment.voteScore}
                    date={new Date(comment.timestamp)}
                    onVoteChange={(votes) => this.handleCommentVoteChangeClick(comment.id, votes)}
                    message={comment.body} />
                </GridListTile>
              ))}
            </GridList>
          </section>
        )}
      </main>);
  }
}

function mapStateToProps({posts, comments}, { match }) {
  const commentsArray =  comments ? comments[match.params.postId] || [] : []
  return {
    post: posts.find(post=> post.id === match.params.postId),
    comments : commentsArray.sort(sortBy('-timestamp'))
  };
}

export default withRouter(connect(mapStateToProps, {
  getPost,
  deletePost,
  votePost,
  fetchComments,
  voteComments,
  addNewComment,
  changeComment
})(Posts));
