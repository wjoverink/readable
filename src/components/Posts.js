import React, {Component} from 'react';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import ThumbDown from 'material-ui-icons/ThumbDown';
import ThumbUp from 'material-ui-icons/ThumbUp';
import Divider from 'material-ui/Divider';
import GridList, {GridListTile} from 'material-ui/GridList';
import Card, {CardHeader, CardMedia, CardContent, CardActions} from 'material-ui/Card';
import {MenuItem} from 'material-ui/Menu';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';


class Posts extends Component {
  render() {
    return (<main className="main-content main-content--defWidth">
      <header>
        <Typography variant="title" align="left" gutterBottom="gutterBottom">
          Category 1
        </Typography>
        <Typography gutterBottom="gutterBottom" align="left">
          Related topics: Category 1
        </Typography>
        <Divider className="divider--bigMargin"/>
      </header>

      <section>
        <GridList spacing="14" className="posts" cellHeight={160} cols={2}>
          <GridListTile >
            <Card>
              <CardHeader
                title="Word of the Day"
                subheader="Willem-Jan Overink - Sep 14, 2016 - Comments: 3"
                avatar={<Avatar aria-label = "Author" > R </Avatar>}>
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
          <GridListTile>
            <Card>
              <CardHeader
                title="Word of the Day"
                subheader="Willem-Jan Overink - Sep 14, 2016 - Comments: 3"
                avatar={<Avatar aria-label = "Author" > R </Avatar>}>
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
          <GridListTile>
            <Card>
              <CardHeader
                title="Word of the Day"
                subheader="Willem-Jan Overink - Sep 14, 2016 - Comments: 3"
                avatar={<Avatar aria-label = "Author" > R </Avatar>}>
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
