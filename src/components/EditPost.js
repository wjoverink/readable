import React, {Component} from 'react';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {CardHeader} from 'material-ui/Card';
import './EditPost.css';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import FaceIcon from 'material-ui-icons/Face';
import {Link} from 'react-router-dom'
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Save';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPost} from '../actions/PostsActions'
import {initialPost} from '../reducers/PostsReducer'

class EditPost extends Component {

  static propTypes = {
    post: PropTypes.object,
    categories: PropTypes.array,
  };

  state = {
    author: "",
    body: "",
    category: "",
    title: "",
  }

  componentWillReceiveProps(props){
    if (props.post){

      this.setState({
        author: props.post.author,
        body: props.post.body,
        category: props.post.category,
        title: props.post.title,
      })
    }
  }

  componentDidMount() {
    const { postId } = this.props.match.params;
    if (postId){
      this.props.getPost(postId);
    }
  }

  handleSave = () => {

  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {

    const {category, title, body, author} = this.state
    const {categories} = this.props

    return (
      <main className="editPost main-content main-content--defWidth">
        <header>
          <div className="post__category">
            <Typography className="category__label" align="left">
              Category:
            </Typography>
            <Select onChange={this.handleChange('category')} className="category__select"
              value={category}
            >
              {categories.map(cat => (
                <MenuItem className="select--firstUppercase" key={cat.path} value={cat.path}>{cat.name}</MenuItem>
              ))}

            </Select>
          </div>
          <Divider />
          <CardHeader
            className="cardHeader"
            title={<TextField className="response__author" value={this.state.author}  onChange={this.handleChange('author')} required label="Name"/>}
            avatar={<Avatar aria-label="Author" ><FaceIcon/></Avatar>}>
          </CardHeader>
          <TextField className="response__author" value={this.state.title}  onChange={this.handleChange('title')} required label="Title"/>
        </header>

        <article>
          <TextField
            className="response__textField"
            multiline={true}
            rowsMax={40}
            autoFocus={true}
            rows={3}
            label="Tell you story"
            margin="normal"
            onChange={this.handleChange('body')}
            value={body}
          />
        </article>
        <footer className='footer footer--alignRight'>
          <Button onClick={this.handleSave} color="primary" className="showShadow" variant="fab" aria-label="Save post">
            <AddIcon/>
          </Button>
        </footer>
      </main>);
  }
}

function mapStateToProps({categories, posts}, { match }) {
  return {
    categories,
    post: posts.find(post=> post.id === match.params.postId)
  };
}

export default connect(mapStateToProps, {
  getPost
})(EditPost);
