import React, {Component} from 'react'
import {CardActions} from 'material-ui/Card'
import {ListItemIcon, ListItemText} from 'material-ui/List';
import Dialog, {DialogActions, DialogContent, withMobileDialog, DialogTitle} from 'material-ui/Dialog' //DialogContentText
import PropTypes from 'prop-types'
import {ThumbDown, ThumbUp} from 'material-ui-icons'
import DeleteIcon from 'material-ui-icons/Delete'
import Create from 'material-ui-icons/Create'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Menu, {MenuItem} from 'material-ui/Menu';
import Button from 'material-ui/Button';
import './VoteActionsControl.css'

/**
* @description Represents a control with vote actions and a edit/delete actions
* @constructor
*/
class VoteActions extends Component {
  static propTypes = {
    votes: PropTypes.number,
    discardText: PropTypes.string,
    onVoteChange: PropTypes.func,
    onEditClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
    disabled:PropTypes.bool
  }

  state = {
    anchorEl: null,
    open: false
  }

  /**
  * @description event vote changes
  * @param {number} vote - added votes
  * @param {object} e - event
  */
  onVoteChange = (vote, e) => {
    if (this.props.onVoteChange) {
      this.props.onVoteChange({votes:this.props.votes, difference:vote}, e.target.value)
    }
  }

  /**
  * @description event up vote
  * @param {object} e - event
  */
  onVoteUp = (e) => {
    this.onVoteChange(+1, e);
  }

  /**
  * @description event up down
  * @param {object} e - event
  */
  onVoteDown = (e) => {
    this.onVoteChange(-1, e);
  }

  /**
  * @description opens edit/delete menu
  * @param {object} event - event
  */
  openMenu = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  /**
  * @description closes edit/delete menu
  * @param {object} event - event
  */
  handleMenuClose = () => {
    this.setState({anchorEl: null});
  };

  /**
  * @description event edit menu click
  * @param {object} e - event
  */
  handleEdit = (e) => {
    this.handleMenuClose();
    if (this.props.onEditClick) {
      this.props.onEditClick(this.mainControl)
    }
  };

  /**
  * @description event delete menu click
  * @param {object} e - event
  */
  handleDelete = (e) => {
    this.handleDialogClose();
    if (this.props.onDeleteClick) {
      this.props.onDeleteClick(e.target)
    }
  };

  /**
  * @description opens delete question dialog
  */
  handleDialogClickOpen = () => {
    this.handleMenuClose();
    this.setState({open: true});
  };

  /**
  * @description closes delete question dialog
  */
  handleDialogClose = () => {
    this.setState({open: false});
  };

  render() {
    const {
      discardText = "Discard item?",
      className,
      fullScreen,
      onVoteChange,
      onEditClick,
      onDeleteClick,
      disabled = false,
      ...props
    } = this.props;
    const {anchorEl} = this.state;

    return (<CardActions className={`voteActions ${className}`} {...props}>
      <IconButton disabled={disabled} onClick={this.onVoteUp} aria-label="Vote positiv">
        <ThumbUp className="button__thumbUp"/>
      </IconButton>
      <Typography color={this.props.votes >= 0
        ? "default"
        : "secondary"} className="voteActions__votes" component="span">
        {this.props.votes}
      </Typography>
      <IconButton disabled={disabled} onClick={this.onVoteDown} aria-label="Vote negativ">
        <ThumbDown className="button__thumbDown"/>
      </IconButton>
      <IconButton disabled={disabled} onClick={this.openMenu} aria-owns={anchorEl
        ? 'simple-menu'
        : null} aria-haspopup="true" aria-label="Show Actions">
        <ExpandMoreIcon/>
      </IconButton>
      <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleMenuClose}>
        <MenuItem onClick={this.handleEdit}>
          <ListItemIcon>
            <Create/>
          </ListItemIcon>
          <ListItemText inset={true} primary="Edit"/>
        </MenuItem>
        <MenuItem onClick={this.handleDialogClickOpen}>
          <ListItemIcon >
            <DeleteIcon/>
          </ListItemIcon>
          <ListItemText inset={true} primary="Delete"/>
        </MenuItem>
      </Menu>
      <Dialog className="voteActions__deleteDialog" open={this.state.open} onClose={this.handleDialogClose} aria-labelledby="delete-dialog-text">
        <DialogContent>
          <DialogTitle id="alert-dialog-title">{discardText}</DialogTitle>
        </DialogContent>
        <DialogActions className="dialog__actions">
          <Button onClick={this.handleDialogClose} variant="raised" color="primary" autoFocus="autoFocus">
            Cancel
          </Button>
          <Button onClick={this.handleDelete} className="button--cancel" color="secondary">
            Discard
          </Button>
        </DialogActions>
      </Dialog>
    </CardActions>);
  }
}

export default withMobileDialog()(VoteActions);
