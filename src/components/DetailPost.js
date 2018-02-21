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
import { getPost} from '../actions/PostsActions'
import PropTypes from 'prop-types'
import {initialPost} from '../reducers/PostsReducer'

class Posts extends Component {
  static propTypes = {
    post: PropTypes.object,
    getPost: PropTypes.func.isRequired,
  };


  handleEditClick = () => {
      this.props.history.push('/post/edit/'+this.props.post.id);
  }

  componentDidMount() {
    const { postId } = this.props.match.params;
    this.props.getPost(postId);
  }

  render() {

    const post= this.props.post || initialPost
    const firstLetter = post.author ? post.author.substring(0,1).toUpperCase() : ""

    return (<main className="post main-content main-content--defWidth">
      <header>
        <CardHeader
          className="cardHeader"
          title={post.title}
          subheader={`${post.author} - ${new Date(post.timestamp).toLocaleString()}`}
          avatar={<Avatar aria-label="Author" >{firstLetter}</Avatar>}>
        </CardHeader>
        <Typography variant="title" gutterBottom  align="left">
          {post.title}
        </Typography>
      </header>

      <article>
        <Typography>
          {post.body}
        </Typography>
      </article>

      <section className="postInfo">
        <Divider />
        <VoteActions onEditClick={this.handleEditClick} className="postInfo__actions" votes={post.voteScore} />

        <Divider />
      </section>

      {/* <Divider className="divider--bigMargin"/> */}

      <section className="writeResponse">
        <Response hasEditMode={true} isSimpleEditControl={true} title={1===1 ? "Write a response..." : "Be the first to write a response"}></Response>
      </section>

      <section className="responses">
        <Typography variant="subheading">
          Conversation about "Word of the Day":
        </Typography>
        <GridList cellHeight='auto'  spacing={16} className="posts" cols={1}>
          <GridListTile>
            <ResponseCard
              hasEditMode={true}
              author={"Willem-Jan Overink"}
              votes={15}
              date={new Date("September 14 2016")}
              message={"This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."} />
          </GridListTile>
          <GridListTile>
            <ResponseCard
              hasEditMode={true}
              author={"Willem-Jan Overink"}
              date={new Date("September 14 2016")}
              message={"This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."} />
          </GridListTile>
          <GridListTile>
            <ResponseCard
              hasEditMode={true}
              author={"Willem-Jan Overink"}
              date={new Date("September 14 2016")}
              message={"This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."} />
          </GridListTile>
        </GridList>
      </section>

    </main>);
  }
}

function mapStateToProps({posts}, { match }) {
  return {
    post: posts.find(post=> post.id === match.params.postId)
  };
}

export default withRouter(connect(mapStateToProps, {
  getPost
})(Posts));
