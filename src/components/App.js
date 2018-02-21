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
import {Route, Link, Switch, NavLink} from 'react-router-dom'
import PostButton from './PostButton'
import logo from '../logo.svg';
import Posts from './Posts.js';
import Post from './Post.js';
import EditPost from './EditPost.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import {fetchCategories} from '../actions/CategoriesActions';
import { withRouter } from 'react-router-dom';

class App extends Component {
  static propTypes = {
    fetchCategories: PropTypes.func.isRequired,
    categories: PropTypes.array,
  }

  state = {

  }

  componentDidMount() {
    // this.props.fetchCategories();
  }

  render() {
    return (
      <div className="app">
        <div className="loading-area">
          <LinearProgress value={90}   variant="determinate" className="loading-area__progress-bar--transparent"  />
        </div>
        <AppBar className="appBar appBar--transparent appBar--defWidth" position="static" color="default">
          <Toolbar className="toolbar" disableGutters={true}>
            <Link to="/"><img src={logo} className="appBar__App-logo" alt="logo" /></Link>
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
            <Button className="main-Nav__item" activeClassName="main-Nav__item--selected" exact component={NavLink} to="/" >
              Home
            </Button>
            <Button component={NavLink} to={`/${"Category 1"}`}  activeClassName="main-Nav__item--selected" className="main-Nav__item">
              Category 1
            </Button>
            <Button component={NavLink} to={`/${"Category 2"}`}  activeClassName="main-Nav__item--selected" className="main-Nav__item">
              Category 2
            </Button>
            <Button  component={NavLink} to={`/${"Category 3"}`} activeClassName="main-Nav__item--selected" className="main-Nav__item">
              Category 3
            </Button>
          </Toolbar>
        </nav>

        <Route exact path="/" component={Posts} />
        <Route exact path="/:category" component={Posts} />
        <Switch>
          <Route path="/post/new" component={EditPost} />
          <Route path="/post/edit/:postId" component={EditPost} />
          <Route path="/:category/:postId" component={Post} />
        </Switch>

        <footer className='footer footer--alignRight'>
          <Route exact path="/" component={PostButton} />
          <Route exact path="/:category" component={PostButton} />
          {/* <Route path="/:category/:postId" component={PostButton} /> */}
        </footer>
      </div>
    );
  }
}

function mapStateToProps({ categories}) {
  return {
    categories,
  };
}

export default withRouter(connect(mapStateToProps, {
  fetchCategories,
})(App));
