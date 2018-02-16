import React, { Component } from 'react';
import './App.css';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui-icons/Search';
import AddIcon from 'material-ui-icons/Add';
import ArrowDownward from 'material-ui-icons/ArrowDownward';
import ArrowUpward from 'material-ui-icons/ArrowUpward';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import ThumbDown from 'material-ui-icons/ThumbDown';
import ThumbUp from 'material-ui-icons/ThumbUp';
import Divider from 'material-ui/Divider';
import GridList, { GridListTile } from 'material-ui/GridList';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { LinearProgress } from 'material-ui/Progress';
import { Link } from 'react-router-dom';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import logo from '../logo.svg';
import Posts from './Posts.js';
import Post from './Post.js';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="loading-area">
          <LinearProgress value="90"   variant="determinate" className="loading-area__progress-bar--transparent"  />
        </div>
        <AppBar className="appBar appBar--transparent appBar--defWidth" position="static" color="default">
          <Toolbar className="toolbar" disableGutters="true">
            <img src={logo} className="appBar__App-logo" alt="logo" />
            <Typography variant="display1" color="inherit">
              READABLE
            </Typography>
            <IconButton className="toolbar__search--toRight">
              <Search />
            </IconButton>
          </Toolbar>
        </AppBar>

        <nav className="main-Nav main-Nav--defWidth">
          <Toolbar  disableGutters="true">
            <Button className="main-Nav__item main-Nav__item--selected" component={Link} to="/" >
              Home
            </Button>
            <Button className="main-Nav__item" color="gray" >
              Category 1
            </Button>
            <Button className="main-Nav__item" color="gray" >
              Category 2
            </Button>
            <Button className="main-Nav__item" color="gray" >
              Category 3
            </Button>
            <Select
              className="main-Nav__item"
              value={10}>
              <MenuItem dense="true" disabled value={10}>
                Sort
              </MenuItem>

              <MenuItem dense="true" value={20}>
                <ListItemIcon>
                  <ArrowDownward />
                </ListItemIcon>
                <ListItemText primary="Asc" />
              </MenuItem>
              <MenuItem dense="true" value={30}>
                <ListItemIcon>
                  <ArrowUpward />
                </ListItemIcon>
                <ListItemText primary="Desc" /></MenuItem>
              <Divider />
              <MenuItem dense="true" value={20}>Votes</MenuItem>
              <MenuItem dense="true" value={30}>Time</MenuItem>
            </Select>
          </Toolbar>
        </nav>

        {1==2 ? <Posts></Posts> : <Post></Post> }


        <footer className='footer footer--alignRight'>
          <Button variant="fab" color="secondary" aria-label="add post">
            <AddIcon />
          </Button>
        </footer>
      </div>
    );
  }
}

export default App;
