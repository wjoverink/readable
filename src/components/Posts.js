import React, {Component} from 'react'
import {Typography, IconButton, Divider} from 'material-ui'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import GridList, {GridListTile} from 'material-ui/GridList'
import { PostCard } from './controls/ResponseControl'
import './Posts.css';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import {findCategoryAndRelated, reduceTitleLength, reduceBodyLength, reduceAuthorLength, prepareVoteForAPI, getColorForName} from '../utils/helper'
import {fetchPosts, deletePost, votePost} from '../actions/PostsActions'
import {sortAction} from '../actions/SortActions'
import sortBy from 'sort-by'
import { VOTE_ORDER, TIMESTAMP_ORDER } from '../utils/config'
import Menu, {MenuItem} from 'material-ui/Menu'
import Page404 from './Page404.js';
import typewriter from '../images/typewriter.svg';
import {Link} from 'react-router-dom'
import PostButton from './PostButton'

class Posts extends Component {
  static propTypes = {
    categories: PropTypes.array,
    posts: PropTypes.array,
    sort: PropTypes.string,
    isLoading: PropTypes.bool.isRequired
  };

  state = {
    anchorEl: null,
    loading:true,
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
    const {categories, posts, isLoading} = this.props
    const {anchorEl} = this.state;
    const categoryAndRelated = findCategoryAndRelated(categories, this.props.match.params.category)

    const postList = !isCategory ? posts : posts.filter(post => post.category === this.props.match.params.category);

    const isEmpty = postList.length===0 && !isLoading;

    return (<main className="postsMain main-content main-content--defWidth">
      <header className="relativ">
        {isCategory && !isEmpty && (
          <Typography variant="display1" className="text--firstUppercase" gutterBottom align="left">
            {categoryAndRelated.category.name}
          </Typography>)
        }
        {isCategory && !isEmpty && (
          <Typography align="left">

            <span> Related topics: </span>  <Link className='link postsMain__link text--firstUppercase' to={categoryAndRelated.related.path}>{categoryAndRelated.related.name}</Link>
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

      {isEmpty &&(
        <Page404
          header="Nice!"
          subHeader={`Be the first one to write a ${isCategory || ""} article.`}
          body="Here you go:"
          image={typewriter}
          links={[{to:`/post/new/${categoryAndRelated.category.path}`, caption:'Write a new article'}]}
        />
      )}

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
      {!isEmpty &&(
        <PostButton category={isCategory ? categoryAndRelated.category.path : ""}/>
      )}
    </main>);
  }
}

function mapStateToProps({categories, posts, sort, loadingBar}, { match }) {
  return {
    categories,
    sort,
    posts:posts.filter(post => !post.deleted).sort(sortBy(sort)),
    isLoading: loadingBar.default > 0
  };
}

export default connect(mapStateToProps, {
  fetchPosts,
  deletePost,
  votePost,
  sortAction
})(Posts);
