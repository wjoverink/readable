import React, {Component} from 'react'
import AddIcon from 'material-ui-icons/Add';
import {Link} from 'react-router-dom'
import Button from 'material-ui/Button';

class PostButton extends Component {
  render() {
    return (<footer className='footer footer--alignRight'>
      <Button component={Link} to="/post/new" className="showShadow footer__button" variant="fab" color="secondary" aria-label="Write post">
        <AddIcon/>
      </Button>
    </footer>);
  }
}

export default PostButton;
