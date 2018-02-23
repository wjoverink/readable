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
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Save';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPost, editPost, addPost} from '../actions/PostsActions'
import { v4 } from 'uuid';

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
    hasChanges:false
  }



  componentWillReceiveProps(props){
    if (props.post){
      this.setState({
        author: props.post.author,
        body: props.post.body,
        category: props.post.category,
        title: props.post.title,
        hasChanges:false
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
    const { postId } = this.props.match.params;
    const post = {
        author: this.state.author,
        body: this.state.body,
        title: this.state.title,
        category: this.state.category || this.props.categories[0].path,
        id:postId || v4(),
        timestamp: Date.now()
      }
    if (postId){
      this.props.editPost({...this.props.post, ...post});
    } else {
      this.props.addPost(post);
    }
    this.props.history.push(`/${post.category}/${post.id}`);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      hasChanges : true
    });
  };

  render() {

    const {title, body, author, hasChanges} = this.state
    const {categories} = this.props


    let category= !this.state.category ? categories.length>0 ? categories[0].path : "" : this.state.category
    if (!this.props.match.params.postId && this.props.match.params.category){
      category = this.props.match.params.category
    }
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
            title={<TextField
              className="response__author"
              value={author}
              autoFocus={true}
              onChange={this.handleChange('author')}
              required
              label="Name"
                   />}
            avatar={<Avatar aria-label="Author" ><FaceIcon/></Avatar>}>
          </CardHeader>
          <TextField className="response__author" fullWidth value={title}  onChange={this.handleChange('title')} required label="Title"/>
        </header>

        <article>
          <TextField
            className="response__textField"
            multiline={true}
            rowsMax={40}
            // /autoFocus={isNew}
            rows={3}
            label="Tell you story"
            margin="normal"
            onChange={this.handleChange('body')}
            value={body}
          />
        </article>
        <section className='footer footer--alignRight'>
          <Button disabled={!hasChanges} onClick={this.handleSave} color="primary" className="footer__button showShadow" variant="fab" aria-label="Save post">
            <AddIcon/>
          </Button>
        </section>
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
  getPost,
  editPost,
  addPost
})(EditPost);
