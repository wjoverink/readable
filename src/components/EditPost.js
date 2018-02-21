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
import { connect } from 'react-redux';

class EditPost extends Component {

  static propTypes = {
    categories: PropTypes.array,
  };

  state = {
    name :"Willem-Jan Overink",
    title :"Word of the Day",
    message :"This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
    category : "react"
  }

  handleSave = () => {

  }

  handleSelectChange = (event) => {
    this.setState({ category: event.target.value });
  }

  render() {
  // this.props.match.params.postId
    const { title, name, message, category} = this.state
    const {categories} = this.props

    return (
      <main className="editPost main-content main-content--defWidth">
        <header>
          <div className="post__category">
            <Typography className="category__label" align="left">
              Category:
            </Typography>
            <Select  onChange={this.handleSelectChange} className="category__select"
              value={category}
            >
              {categories.map(category => (
                <MenuItem className="select--firstUppercase" key={category.path} value={category.path}>{category.name}</MenuItem>
              ))}

            </Select>
          </div>
          <Divider />
          <CardHeader
            className="cardHeader"
            title={<TextField className="response__author" defaultValue={name} required label="Name"/>}
            avatar={<Avatar aria-label="Author" ><FaceIcon/></Avatar>}>
          </CardHeader>
          <TextField className="response__author" defaultValue={title} required label="Title"/>
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
            defaultValue={message}
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

function mapStateToProps({categories }, { match }) {
  return {
    categories
  };
}

export default connect(mapStateToProps)(EditPost);
