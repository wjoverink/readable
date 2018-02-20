import React, {Component} from 'react'
import AddIcon from 'material-ui-icons/Add';
import {Link} from 'react-router-dom'
import Button from 'material-ui/Button';

class PostButton extends Component {
  render() {
    return (
      <Button component={Link} to="/post/new" className="showShadow" variant="fab" color="secondary" aria-label="Write post">
        <AddIcon />
      </Button>);
  }
}

export default PostButton;
