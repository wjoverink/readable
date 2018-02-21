import React, {Component} from 'react'
import {CardActions} from 'material-ui/Card'
import {ListItemIcon, ListItemText} from 'material-ui/List';
import Dialog, {DialogActions, DialogContent, DialogContentText, withMobileDialog} from 'material-ui/Dialog';
import PropTypes from 'prop-types'
import ThumbDown from 'material-ui-icons/ThumbDown'
import ThumbUp from 'material-ui-icons/ThumbUp'
import DeleteIcon from 'material-ui-icons/Delete'
import Create from 'material-ui-icons/Create'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Menu, {MenuItem} from 'material-ui/Menu';
import Button from 'material-ui/Button';
import './VoteActionsControl.css'

class VoteActions extends Component {
  static propTypes = {
    votes: PropTypes.number,
    discardText: PropTypes.string,
    onVoteChange: PropTypes.func,
    onEditClick: PropTypes.func,
    onDeleteClick: PropTypes.func
  }

  state = {
    votes: this.props.votes || 0,
    anchorEl: null,
    open: false
  }

  onVoteChange = (e) => {
    if (this.props.onVoteChange) {
      this.props.onVoteChange(this.state.votes, e.target.value)
    }
  }

  onVoteUp = (e) => {
    this.setState(state => ({
      votes: state.votes + 1
    }))
  }
  onVoteDown = (e) => {
    this.setState(state => ({
      votes: state.votes - 1
    }))
  }

  openMenu = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleMenuClose = () => {
    this.setState({anchorEl: null});
  };

  handleEdit = (e) => {
    this.handleMenuClose();
    if (this.props.onEditClick) {
      this.props.onEditClick(e.target.value)
    }
  };

  handleDelete = (e) => {
    this.handleDialogClose();
    if (this.props.onDeleteClick) {
      this.props.onDeleteClick(e.target.value)
    }
  };

  handleDialogClickOpen = () => {
    this.handleMenuClose();
    this.setState({open: true});
  };

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
      ...props
    } = this.props;
    const {anchorEl} = this.state;

    return (<CardActions className={`voteActions ${className}`} {...props}>
      <IconButton onClick={this.onVoteUp} aria-label="Vote positiv">
        <ThumbUp/>
      </IconButton>
      <Typography color={this.state.votes >= 0
        ? "default"
        : "secondary"} component="span">
        {this.state.votes}
      </Typography>
      <IconButton onClick={this.onVoteDown} aria-label="Vote negativ">
        <ThumbDown/>
      </IconButton>
      <IconButton onClick={this.openMenu} aria-owns={anchorEl
        ? 'simple-menu'
        : null} aria-haspopup="true" aria-label="Show Actions">
        <ExpandMoreIcon/>
      </IconButton>
      <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleMenuClose}>
        <MenuItem onClick={this.handleEdit}>
          <ListItemIcon>
            <Create/>
          </ListItemIcon>
          <ListItemText inset="inset" primary="Edit"/>
        </MenuItem>
        <MenuItem onClick={this.handleDialogClickOpen}>
          <ListItemIcon >
            <DeleteIcon/>
          </ListItemIcon>
          <ListItemText inset="inset" primary="Delete"/>
        </MenuItem>
      </Menu>
      <Dialog className="deleteDialog" open={this.state.open} onClose={this.handleDialogClose} aria-labelledby="delete-dialog-text">
        <DialogContent>
          <DialogContentText id="delete-dialog-text">
            {discardText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleDialogClose} variant="raised" color="primary" autoFocus="autoFocus">
            Cancel
          </Button>
          <Button onClick={this.handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </CardActions>);
  }
}

export default withMobileDialog()(VoteActions);
