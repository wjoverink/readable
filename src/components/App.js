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
import Page404 from './Page404.js';
import DetailPost from './DetailPost.js';
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
    loading:true,
  }

  componentWillReceiveProps(props){
    //TODO: better loading also posts etc
    if (props.categories.length>0){
      this.setState({
        loading: false
      })
    }
  }

  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    const {categories} = this.props
    return (
      <div className="app">
        <div className="loading-area">
          {this.state.loading && (
            <LinearProgress className="loading-area__progress-bar--transparent"  />
          )}

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
            {
              categories.map(category => (
                <Button key={category.path} component={NavLink} to={`/${category.path}`}  activeClassName="main-Nav__item--selected" className="main-Nav__item">
                  {category.name}
                </Button>
              ))}
          </Toolbar>
        </nav>


        <Route exact path="/" component={Posts} />
        {/* <Route exact path="/:category" component={Posts} /> */}
        <Route exact path="/:category" render={({match}) => {
          if (!this.props.categories ||
            this.props.categories.length==0 ||
            (match.params.category && this.props.categories.find(cat => cat.path === match.params.category))){
              return <Posts match={match}/>
            } else {
              return <Page404/>
            }
        }
        } />
        <Switch>
          <Route exact path="/post/new" component={EditPost} />
          <Route exact path="/post/edit/:postId" component={EditPost} />
          <Route path="/:category/:postId" component={DetailPost} />
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
