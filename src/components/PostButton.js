import React, {Component} from 'react'
import AddIcon from 'material-ui-icons/Add'
import {Link} from 'react-router-dom'
import Button from 'material-ui/Button'
import PropTypes from 'prop-types'

class PostButton extends Component {
  static propTypes = {
    category: PropTypes.string,
  };

  render() {
    const {category} = this.props
    const to = `/post/new${category ? "/"+category : ""}`
    return (<footer className='footer footer--alignRight'>
      <Button component={Link} to={to} className="showShadow footer__button" variant="fab" color="secondary" aria-label="Write post">
        <AddIcon/>
      </Button>
    </footer>);
  }
}

export default PostButton;
