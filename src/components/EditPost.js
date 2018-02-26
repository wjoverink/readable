import React, {Component} from 'react'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import {CardHeader} from 'material-ui/Card'
import './EditPost.css';
import { MenuItem } from 'material-ui/Menu'
import Select from 'material-ui/Select'
import TextField from 'material-ui/TextField'
import FaceIcon from 'material-ui-icons/Face'
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Save'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPost, editPost, addPost} from '../actions/PostsActions'
import { v4 } from 'uuid';

/**
* @description Represents the edit article page
* @constructor
*/
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

  /**
  * @description react lifecycle
  * sets the state of this page from the article to edit
  * @param {object} props - the props
  */
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

  /**
  * @description react lifecycle
  * gets the article to edit
  */
  componentDidMount() {
    const { postId } = this.props.match.params;
    if (postId){
      this.props.getPost(postId)
    }
  }

  /**
  * @description event handles the save button click
  * updates or adds (new) a article in the redux-sate
  */
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
      this.props.editPost({...this.props.post, ...post})
    } else {
      this.props.addPost(post)
    }
    this.props.history.push(`/${post.category}/${post.id}`)
  }

  /**
  * @description event handles changes from the category/title/content controls
  * @param {string} name - property that changes
  * @param {object} event - event
  */
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
      <main className="article-edit main-content main-content--defWidth">
        <header>
          <div className="article-edit__category">
            <Typography className="category__label" align="left">
              Category:
            </Typography>
            <Select onChange={this.handleChange('category')} className="category__select select"
              value={category}
            >
              {categories.map(cat => (
                <MenuItem className="select__item select__item--firstUppercase" key={cat.path} value={cat.path}>{cat.name}</MenuItem>
              ))}

            </Select>
          </div>
          <Divider className="article-edit__divider"/>
          <CardHeader
            className="cardHeader"
            title={<TextField
              className="card__headerField"
              value={author}
              autoFocus={true}
              onChange={this.handleChange('author')}
              required
              label="Name"
                   />}
            avatar={<Avatar aria-label="Author" ><FaceIcon/></Avatar>}>
          </CardHeader>
          <TextField className="card__headerField" fullWidth value={title}  onChange={this.handleChange('title')} required label="Title"/>
        </header>

        <article>
          <TextField
            className="card__ContentField"
            multiline={true}
            rowsMax={12}
            // /autoFocus={isNew}
            rows={3}
            label="Tell you story"
            margin="normal"
            onChange={this.handleChange('body')}
            value={body}
          />
        </article>
        <section className='article-edit__footer article-edit__footer--alignRight'>
          <Button disabled={!hasChanges} onClick={this.handleSave} color="primary" className="footer__button button--showShadow" variant="fab" aria-label="Save post">
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
  }
}

export default connect(mapStateToProps, {
  getPost,
  editPost,
  addPost
})(EditPost)
