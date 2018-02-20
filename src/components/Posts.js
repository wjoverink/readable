import React, {Component} from 'react';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Divider from 'material-ui/Divider';
import GridList, {GridListTile} from 'material-ui/GridList';
import { PostCard } from './controls/ResponseControl'
import './Posts.css';


class Posts extends Component {
  render() {
    return (<main className="postsMain main-content main-content--defWidth">
      <header className="relativ">
        <Typography variant="title" align="left">
          Category 1
        </Typography>
        <Typography align="left">
          Related topics: Category 1
        </Typography>
        <IconButton className="header__action" aria-label="Show Actions">
          Sort
          <ExpandMoreIcon/>
        </IconButton>
        <Divider className="divider--bigMargin"/>
      </header>

      <section>
        <GridList spacing={14} className="posts" cellHeight='auto' cols={2}>
          <GridListTile >
            <PostCard title={"Word of the Day"} date={new Date("September 14 2016")} comments={3} votes={0} name={"Willem-Jan Overink"} message={"This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."}/>
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

export default Posts;
