import React, {Component} from 'react'
import {Typography, Divider} from 'material-ui'
import GridList, {GridListTile} from 'material-ui/GridList'
import { PostCard } from './controls/ResponseControl'
import './Posts.css';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import {findCategoryAndRelated, reduceBodyLength, reduceAuthorLength, prepareVoteForAPI} from '../utils/helper'
import {fetchPosts, deletePost, votePost} from '../actions/PostsActions'
import {sortAction} from '../actions/SortActions'
import sortBy from 'sort-by'
import { VOTE_ORDER, TIMESTAMP_ORDER } from '../utils/config'
import Page404 from './Page404.js';
import typewriter from '../images/typewriter.svg';
import {Link} from 'react-router-dom'
import PostButton from './controls/PostButton'
import Sortmenu from './controls/SortMenu'

class Posts extends Component {
  static propTypes = {
    categories: PropTypes.array,
    posts: PropTypes.array,
    sort: PropTypes.object,
    isLoading: PropTypes.bool.isRequired
  };

  state = {
    loading:true,
  }

  handleSortChanged= (sort, asc) => {
       this.props.sortAction(sort,asc)
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

    const categoryAndRelated = findCategoryAndRelated(categories, this.props.match.params.category)

    const postList = !isCategory ? posts : posts.filter(post => post.category === this.props.match.params.category);

    const isEmpty = postList.length===0 && !isLoading;

    return (<main className="posts main-content main-content--defWidth">
      <header className="relativ">
        {isCategory && !isEmpty && (
          <Typography variant="display1" className="text--firstUppercase" gutterBottom align="left">
            {categoryAndRelated.category.name}
          </Typography>)
        }
        {isCategory && !isEmpty && (
          <Typography align="left">

            <span> Related topics: </span>  <Link className='link posts__link text--firstUppercase' to={categoryAndRelated.related.path}>{categoryAndRelated.related.name}</Link>
          </Typography>)
        }
        <Sortmenu
          className="posts__sortmenu"
          caption="Sort"
          sortItems={[{value:TIMESTAMP_ORDER, name:'Date'}, {value:VOTE_ORDER, name:'Votes'}]}
          onSortChanged={this.handleSortChanged}
          selected={this.props.sort.name}
          asc={this.props.sort.asc}
        />
        <Divider className="divider--bigMargin"/>
      </header>

      {isEmpty &&(
        <Page404
          header="First!"
          subHeader={`Be the first one to write a ${isCategory || ""} article.`}
          body="Here you go:"
          image={typewriter}
          links={[{to:`/post/new/${categoryAndRelated.category.path}`, caption:'Write a new article'}]}
        />
      )}

      <section>
        <GridList spacing={14} className="posts__gridlist gridlist" cellHeight='auto' cols={isCategory ? 1 : 2}>
          { postList.map(post => (
            <GridListTile className="gridlist__tile" key={post.id}>
              <PostCard
                onHeaderClick={() => this.handleHeaderClick(post.id, post.category)}
                onEditClick={() => this.handleEditClick(post.id)}
                onDeleteClick={() => this.handleDeleteClick(post)}
                onVoteChange={(votes) => this.handleVoteChangeClick(votes,post)}
                title={post.title}
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
        <PostButton className="post-button post-button--alignRight" category={isCategory ? categoryAndRelated.category.path : ""}/>
      )}
    </main>);
  }
}

function mapStateToProps({categories, posts, sort, loadingBar}, { match }) {
  return {
    categories,
    sort,
    posts:posts.filter(post => !post.deleted).sort(sortBy(`${sort.asc?'-':''}${sort.name}`)),
    isLoading: loadingBar.default > 0
  };
}

export default connect(mapStateToProps, {
  fetchPosts,
  deletePost,
  votePost,
  sortAction
})(Posts);
