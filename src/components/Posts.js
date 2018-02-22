import React, {Component} from 'react';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Divider from 'material-ui/Divider';
import GridList, {GridListTile} from 'material-ui/GridList';
import { PostCard } from './controls/ResponseControl'
import './Posts.css';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import {findCategoryAndRelated, reduceTitleLength, reduceBodyLength, reduceAuthorLength, prepareVoteForAPI} from '../utils/helper'
import {fetchPosts, deletePost, votePost} from '../actions/PostsActions';

class Posts extends Component {
  static propTypes = {
    categories: PropTypes.array,
    posts: PropTypes.array,
  };

  handleEditClick = (id) => {
      this.props.history.push('/post/edit/'+id);
  }

  handleHeaderClick = (id,category) => {
      this.props.history.push(`/${category}/${id}`);
  }

  handleVoteChangeClick = (votes,post) =>{
    this.props.votePost(post.id, prepareVoteForAPI(votes.difference))
  }

  handleDeleteClick = (post) => {
    this.props.deletePost(post);
  }

  componentDidMount() {
    this.props.fetchPosts();
  }


  render() {
    const isCategory = this.props.match.params.category
    const {categories} = this.props
    const categoryAndRelated = findCategoryAndRelated(categories, this.props.match.params.category)

    let postList = this.props.posts;
    if (isCategory){
      postList = postList.filter(post => post.category === this.props.match.params.category)
    }

    return (<main className="postsMain main-content main-content--defWidth">
      <header className="relativ">
        {isCategory && (
          <Typography variant="title" className="text--firstUppercase" gutterBottom align="left">
            {categoryAndRelated.category}
          </Typography>)
        }
        {isCategory && (
          <Typography align="left">
            <span> Related topics: </span><span className="text--firstUppercase">{categoryAndRelated.related}</span>
          </Typography>)
        }
        <IconButton className="header__action" aria-label="Show Actions">
          Sort
          <ExpandMoreIcon/>
        </IconButton>
        <Divider className="divider--bigMargin"/>
      </header>

      <section>
        <GridList spacing={14} className="posts" cellHeight='auto' cols={isCategory ? 1 : 2}>
          { postList.map(post => (
            <GridListTile key={post.id}>
              <PostCard
                onHeaderClick={() => this.handleHeaderClick(post.id, post.category)}
                onEditClick={() => this.handleEditClick(post.id)}
                onDeleteClick={() => this.handleDeleteClick(post)}
                onVoteChange={(votes) => this.handleVoteChangeClick(votes,post)}
                title={reduceTitleLength(post.title)}
                date={new Date(post.timestamp)}
                comments={post.commentCount}
                votes={post.voteScore}
                name={reduceAuthorLength(post.author)}
                message={reduceBodyLength(post.body)}/>
            </GridListTile>
          ))}
        </GridList>
      </section>

    </main>);
  }
}

function mapStateToProps({categories, posts }, { match }) {
  return {
    categories,
    posts:posts.filter(post => !post.deleted)
  };
}

export default connect(mapStateToProps, {
  fetchPosts,
  deletePost,
  votePost
})(Posts);
