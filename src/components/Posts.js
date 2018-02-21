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
import {findCategoryAndRelated} from '../utils/helper'


class Posts extends Component {
  static propTypes = {
    categories: PropTypes.array,
    posts: PropTypes.array,
  };

  handleEditClick = (id, e) => {
      this.props.history.push('/post/edit/'+id);
  }

  handleHeaderClick = (id) => {
      this.props.history.push('/category/'+id);
  }



  render() {
    const isCategory = this.props.match.params.category || false
    const {categories} = this.props

    const categoryAndRelated = findCategoryAndRelated(categories, this.props.match.params.category)

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
          <GridListTile >
            <PostCard onHeaderClick={() => this.handleHeaderClick(isCategory)} onEditClick={(e) => this.handleEditClick(isCategory,e)} title={"Word of the Day"} date={new Date("September 14 2016")} comments={3} votes={0} name={"Willem-Jan Overink"} message={"This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."}/>
          </GridListTile>
          <GridListTile>
            <PostCard title={"Word of the Day"} date={new Date("September 14 2016")} comments={3} votes={0} name={"Willem-Jan Overink"} message={"This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."}/>
          </GridListTile>
          <GridListTile>
            <PostCard title={"Word of the Day"} date={new Date("September 14 2016")} comments={3} votes={0} name={"Willem-Jan Overink"} message={"This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."}/>
          </GridListTile>
        </GridList>
      </section>

    </main>);
  }
}

function mapStateToProps({categories }, { match }) {
  return {
    categories
  };
}

export default connect(mapStateToProps)(Posts);
