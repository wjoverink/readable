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

class EditPost extends Component {
  state = {
    name :"Willem-Jan Overink",
    title :"Word of the Day",
    message :"This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
  }

  handleSave = () => {

  }

  render() {
    const { title, name, message} = this.state
    return (
      <main className="editPost main-content main-content--defWidth">
        <header>
          <div className="post__category">
            <Typography className="category__label" align="left">
              Category:
            </Typography>
            <Select className="category__select"
              value={10}
            >

              <MenuItem value={10}>Home</MenuItem>
              <MenuItem value={20}>Category 1</MenuItem>
              <MenuItem value={30}>Category 2</MenuItem>
              <MenuItem value={40}>Category 3</MenuItem>
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
            multiline="multiline"
            rowsMax="40"
            autoFocus="true"
            rows="3"
            label="Tell you story"
            margin="normal"
            defaultValue={message}
          />
        </article>
        <footer className='footer footer--alignRight'>
          <Button onClick={this.handleSave} className="showShadow" variant="fab" color="primary" aria-label="Save post">
            <AddIcon/>
          </Button>
        </footer>
      </main>);
  }
}

export default EditPost;
