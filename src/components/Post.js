import React, {Component} from 'react';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import ThumbDown from 'material-ui-icons/ThumbDown';
import ThumbUp from 'material-ui-icons/ThumbUp';
import Divider from 'material-ui/Divider';
import Select from 'material-ui/Select';
import Avatar from 'material-ui/Avatar';
import Card, {CardHeader, CardMedia, CardContent, CardActions} from 'material-ui/Card';
import GridList, { GridListTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import FaceIcon from 'material-ui-icons/Face';

class Posts extends Component {
  render() {
    return (<main className="main-content main-content--defWidth">
      <header>
        <CardHeader
          title="Word of the Day"
          subheader="Willem-Jan Overink - Sep 14, 2016"
          avatar={<Avatar aria-label = "Author" > R </Avatar>}>
        </CardHeader>
        <Typography variant="title" align="left" gutterBottom="gutterBottom">
          Word of the Day
        </Typography>
        <Divider className="divider--bigMargin"/>
      </header>

      <section>
        <Typography>
          This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
      </section>
      <Divider className="divider--bigMargin"/>
      <section>
        <Typography variant="subheading" gutterBottom>
          Responses
        </Typography>
        <Card>
          <CardHeader
            title="write a response..."

            avatar={<Avatar aria-label = "Author" > <FaceIcon /></Avatar>}>
          </CardHeader>
        </Card>
      </section>
      <Typography variant="subheading" gutterBottom>
        Be the first to write a response
      </Typography>
      <section>
        <Typography variant="subheading" gutterBottom>
          Conversation about "Word of the Day":
        </Typography>
        <GridList spacing="14" className="posts" cellHeight={160} cols={1}>

          <GridListTile>
            <Card>
              <CardHeader
                title="Willem-Jan Overink"
                subheader="Sep 14, 2016"
                avatar={<Avatar aria-label = "Author" > W </Avatar>}>
              </CardHeader>
              <CardContent>
                <Typography component="p">
                  This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.
                </Typography>
              </CardContent>
              <CardActions className="test" disableActionSpacing="disableActionSpacing">
                <IconButton aria-label="Show Actions">
                  <ThumbUp/>
                </IconButton>
                <Typography component="span">
                  5
                </Typography>
                <IconButton aria-label="Show Actions">
                  <ThumbDown/>
                </IconButton>
                <IconButton className="card__action--toRight" aria-label="Show Actions">
                  <ExpandMoreIcon/>
                </IconButton>
              </CardActions>
            </Card>
          </GridListTile>

        </GridList>
      </section>
    </main>);
  }
}

export default Posts;
