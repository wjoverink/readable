import React, {Component} from 'react'
import AddIcon from 'material-ui-icons/Add'
import {Link} from 'react-router-dom'
import Button from 'material-ui/Button'
import PropTypes from 'prop-types'

/**
* @description Represents a footer with a button that links to a new post
* @constructor
*/
class PostButton extends Component {
  static propTypes = {
    category: PropTypes.string,
    className:PropTypes.string
  };

  render() {
    const {category, className} = this.props
    const to = `/post/new${category ? "/"+category : ""}`
    return (<footer className={`footer ${className}`}>
      <Button component={Link} to={to} className="button--showShadow footer__button" variant="fab" color="secondary" aria-label="Write post">
        <AddIcon/>
      </Button>
    </footer>);
  }
}

export default PostButton;
