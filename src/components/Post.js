import React, {Component} from 'react';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {CardHeader} from 'material-ui/Card';
import GridList, { GridListTile } from 'material-ui/GridList';
import './Post.css';
import Response, { ResponseCard } from './controls/ResponseControl'
import VoteActions from './controls/VoteActionsControl'
import { withRouter } from 'react-router-dom';

class Posts extends Component {
  handleEditClick = () => {
      this.props.history.push('/post/edit/1');
  }

  render() {
    return (<main className="post main-content main-content--defWidth">
      <header>
        <CardHeader
          className="cardHeader"
          title="Willem-Jan Overink"
          subheader="Sep 14, 2016"
          avatar={<Avatar aria-label="Author" > W </Avatar>}>
        </CardHeader>
        <Typography variant="title" gutterBottom  align="left">
          Word of the Day
        </Typography>
      </header>

      <article>
        <Typography>
          This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
      </article>

      <section className="postInfo">
        <Divider />
        <VoteActions onEditClick={this.handleEditClick} className="postInfo__actions" votes={0} />

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

export default withRouter(Posts);
