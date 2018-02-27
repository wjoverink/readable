import React, { Component } from 'react';
import './App.css';
import {Button, AppBar, Toolbar, Typography, IconButton} from 'material-ui';
import Search from 'material-ui-icons/Search';
import LoadingBar from 'react-redux-loading-bar'
import {Route, Link, Switch, NavLink} from 'react-router-dom'
import logo from '../images/logo.svg';
import Posts from './Posts.js';
import Page404 from './Page404.js';
import DetailPost from './DetailPost.js';
import EditPost from './EditPost.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import {fetchCategories} from '../actions/CategoriesActions';
import {removeNotificationAction} from '../actions/NotificationActions'
import { withRouter } from 'react-router-dom';
import MessageBar from './controls/MessageBar'


/**
* @description Represents a the main readable page
* @constructor
*/
class App extends Component {
  static propTypes = {
    fetchCategories: PropTypes.func.isRequired,
    categories: PropTypes.array,
    removeNotificationAction: PropTypes.func,
    notifications: PropTypes.array
  }

  handleNotificationClose = () => {
    this.props.removeNotificationAction(0)
  };

  /**
  * @description react lifecycle
  * fetch all Categories
  */
  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    const {categories, notifications} = this.props

    return (
      <div className="app">
        <MessageBar onClose={this.handleNotificationClose} messages={notifications}/>
        <div className="loading-area">
          <LoadingBar showFastActions  style={{ top:"0px", left:"0px", backgroundColor: '#ff5722' }} />
        </div>
        <AppBar className="app_header appBar app_header--transparent app_header--defWidth" position="static" color="default">
          <Toolbar className="appBar__toolbar" disableGutters={true}>
            <Link to="/"><img src={logo} className="app__logo" alt="logo" /></Link>
            <Typography className="app__name" variant="display1" color="inherit">
              READABLE
            </Typography>
            <IconButton className="app__search--right">
              <Search />
            </IconButton>
          </Toolbar>
        </AppBar>

        <nav className="navigation app__navigation app__navigation--defWidth">
          <Toolbar disableGutters={true}>
            <Button className="navigation__item" activeClassName="navigation__item--selected" exact component={NavLink} to="/" >
              Home
            </Button>
            {
              categories.map(category => (
                <Button key={category.path} component={NavLink} to={`/${category.path}`}  activeClassName="navigation__item--selected" className="navigation__item">
                  {category.name}
                </Button>
              ))}
          </Toolbar>
        </nav>

        <Route exact path="/" component={Posts} />
        {/* <Route exact path="/:category" component={Posts} /> */}
        <Route exact path="/:category" render={({match, history}) => {
          if (!this.props.categories ||
            this.props.categories.length===0 ||
            (match.params.category && this.props.categories.find(cat => cat.path === match.params.category))){
              return <Posts match={match} history={history}/>
            } else {
              return <Page404/>
            }
        }
        } />
        <Switch>
          <Route exact path="/post/new" component={EditPost} />
          <Route exact path="/post/new/:category" component={EditPost} />
          <Route exact path="/post/edit/:postId" component={EditPost} />
          <Route path="/:category/:postId" component={DetailPost} />
        </Switch>

      </div>
    );
  }
}

function mapStateToProps({ categories, notifications}) {
  return {
    categories,
    notifications
  };
}

export default withRouter(connect(mapStateToProps, {
  fetchCategories,
  removeNotificationAction
})(App));
