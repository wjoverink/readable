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
import {fetchPosts, deletePost, votePost} from '../actions/PostsActions'
import {sortAction} from '../actions/SortActions'
import sortBy from 'sort-by'
import { VOTE_ORDER, TIMESTAMP_ORDER } from '../utils/config';
import Menu, {MenuItem} from 'material-ui/Menu'

class Posts extends Component {
  static propTypes = {
    categories: PropTypes.array,
    posts: PropTypes.array,
    sort: PropTypes.string,
  };

  state = {
    anchorEl: null,
  }

  openSortMenu = event => {
    this.setState({anchorEl: event.currentTarget})
  }

  handleSortMenuClose = () => {
    this.setState({anchorEl: null})
  }

  handleSortClick = (s,event) => {
    this.handleSortMenuClose()
    this.props.sortAction(s)
  }

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
    const {anchorEl} = this.state;
    const categoryAndRelated = findCategoryAndRelated(categories, this.props.match.params.category)

    let postList = this.props.posts;
    if (isCategory){
      postList = postList.filter(post => post.category === this.props.match.params.category)
    }

    return (<main className="postsMain main-content main-content--defWidth">
      <header className="relativ">
        {isCategory && (
          <Typography variant="display1" className="text--firstUppercase" gutterBottom align="left">
            {categoryAndRelated.category}
          </Typography>)
        }
        {isCategory && (
          <Typography align="left">
            <span> Related topics: </span><span className="text--firstUppercase">{categoryAndRelated.related}</span>
          </Typography>)
        }
        <IconButton className="header__action" onClick={this.openSortMenu} aria-owns={anchorEl
          ? 'simple-menu'
          : null} aria-haspopup="true" aria-label="Show Sorting">
          Sort
          <ExpandMoreIcon/>
        </IconButton>
        <Menu id="sort-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleSortMenuClose}>
          <MenuItem selected={this.props.sort === TIMESTAMP_ORDER} onClick={() => this.handleSortClick(TIMESTAMP_ORDER)}>
            Date
          </MenuItem>
          <MenuItem selected={this.props.sort === VOTE_ORDER} onClick={() => this.handleSortClick(VOTE_ORDER)}>
            Votes
          </MenuItem>
        </Menu>
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

function mapStateToProps({categories, posts, sort}, { match }) {
  return {
    categories,
    sort,
    posts:posts.filter(post => !post.deleted).sort(sortBy(sort))
  };
}

export default connect(mapStateToProps, {
  fetchPosts,
  deletePost,
  votePost,
  sortAction
})(Posts);
