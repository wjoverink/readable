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

class VoteActions extends Component {
  static propTypes = {
    votes: PropTypes.number,
    discardText: PropTypes.string,
    onVoteChange: PropTypes.func,
    onEditClick: PropTypes.func,
    onDeleteClick: PropTypes.func
  }

  state = {
    votes: 0,
    anchorEl: null,
    open: false
  }

  componentWillReceiveProps(props){
    this.setState({
      votes: props.votes
    })
  }

  onVoteChange = (vote, e) => {
    this.setState(state => ({
      votes: state.votes + vote
    }))
    if (this.props.onVoteChange) {
      this.props.onVoteChange({votes:this.state.votes, difference:vote}, e.target.value)
    }
  }

  onVoteUp = (e) => {
    this.onVoteChange(+1, e);
  }
  onVoteDown = (e) => {
    this.onVoteChange(-1, e);
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
      this.props.onEditClick(this.mainControl)
    }
  };

  handleDelete = (e) => {
    this.handleDialogClose();
    if (this.props.onDeleteClick) {
      this.props.onDeleteClick(e.target)
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
          <ListItemText inset={true} primary="Edit"/>
        </MenuItem>
        <MenuItem onClick={this.handleDialogClickOpen}>
          <ListItemIcon >
            <DeleteIcon/>
          </ListItemIcon>
          <ListItemText inset={true} primary="Delete"/>
        </MenuItem>
      </Menu>
      <Dialog className="deleteDialog" open={this.state.open} onClose={this.handleDialogClose} aria-labelledby="delete-dialog-text">
        <DialogContent>
          <DialogTitle id="alert-dialog-title">{discardText}</DialogTitle>
          {/* <DialogContentText id="delete-dialog-text">
            {discardText}
          </DialogContentText> */}
        </DialogContent>
        <DialogActions className="deleteDialog__actions">
          <Button onClick={this.handleDialogClose} variant="raised" color="primary" autoFocus="autoFocus">
            Cancel
          </Button>
          <Button onClick={this.handleDelete} className="actions__cancel" color="secondary">
            Discard
          </Button>
        </DialogActions>
      </Dialog>
    </CardActions>);
  }
}

export default withMobileDialog()(VoteActions);
