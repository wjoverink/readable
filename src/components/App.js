import React, { Component } from 'react';
import './App.css';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui-icons/Search';
import AddIcon from 'material-ui-icons/Add';
import { LinearProgress } from 'material-ui/Progress';
import { Link } from 'react-router-dom';

import logo from '../logo.svg';
import Posts from './Posts.js';
import Post from './Post.js';
import EditPost from './EditPost.js';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="loading-area">
          <LinearProgress value={90}   variant="determinate" className="loading-area__progress-bar--transparent"  />
        </div>
        <AppBar className="appBar appBar--transparent appBar--defWidth" position="static" color="default">
          <Toolbar className="toolbar" disableGutters={true}>
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
          <Toolbar disableGutters={true}>
            <Button className="main-Nav__item main-Nav__item--selected" component={Link} to="/" >
              Home
            </Button>
            <Button className="main-Nav__item">
              Category 1
            </Button>
            <Button className="main-Nav__item">
              Category 2
            </Button>
            <Button className="main-Nav__item">
              Category 3
            </Button>
          </Toolbar>
        </nav>

        {/* <Posts></Posts>*/}

        {/* <Post></Post> */}
        <EditPost></EditPost>

        <footer className='footer footer--alignRight'>
          <Button className="showShadow" variant="fab" color="secondary" aria-label="add post">
            <AddIcon />
          </Button>
        </footer>
      </div>
    );
  }
}

export default App;
