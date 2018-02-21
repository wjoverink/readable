import React, {Component} from 'react';
import Avatar from 'material-ui/Avatar';
import Card, {CardHeader, CardContent, CardActions} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types'
import Button from 'material-ui/Button';
import FaceIcon from 'material-ui-icons/Face';
import Typography from 'material-ui/Typography';
import VoteActions from './VoteActionsControl'
import './ResponseControl.css';
import Collapse from 'material-ui/transitions/Collapse';

class Response extends Component {
  static propTypes = {
    title: PropTypes.string,
    subTitle: PropTypes.string,
    message: PropTypes.string,
    votes: PropTypes.number,
    icon: PropTypes.string,
    onVoteChange: PropTypes.func,
    onEditClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
    onHeaderClick: PropTypes.func,
    onChange: PropTypes.func,
    editMode:PropTypes.bool,
    hasEditMode:PropTypes.bool,
    isSimpleEditControl:PropTypes.bool
  }

  state = {
    editMode: this.props.editMode && this.props.hasEditMode,
  }

  onVoteChange = (votes, e) => {
    if (this.props.onVoteChange) {
      this.props.onVoteChange(votes, e)
    }
  }

  onEditClick = (e) => {
    if (this.props.hasEditMode){
      this.setState({editMode:true})
    }
    if (this.props.onEditClick) {
      this.props.onEditClick(e)
    }
  }

  onSimpleEditClick = (e) => {
    if (this.props.isSimpleEditControl){
      this.onEditClick(e);
    }
    if (this.props.onHeaderClick) {
      this.props.onHeaderClick(e)
    }
  }

  stopEditMode = () => {
      this.setState({editMode:false})
  }

  onDeleteClick = (e) => {
    if (this.props.onDeleteClick) {
      this.props.onDeleteClick(e)
    }
  }

  handleSubmit = (e) => {
      this.setState({editMode:false})
      if (this.props.onChange) {
        this.props.onChange(e)
      }
  }

  render() {
    const {
      title,
      subTitle,
      votes = 0,
      message = "",
      icon,
      isSimpleEditControl = false,
      editMode,
      hasEditMode = false,
      onVoteChange,
      onEditClick,
      onDeleteClick,
      onHeaderClick,
      onChange,
      ...props
    } = this.props
    const firstLetter = icon || title.substring(0, 1).toUpperCase()

    return (
      <Card {...props}>

        <form onSubmit={this.handleSubmit} className={isSimpleEditControl ? "simpleForm" : "form" } autoComplete="off">

          {!this.state.editMode && (
            <CardHeader onClick={this.onSimpleEditClick} className="response__header" title={title} subheader={subTitle} avatar={
              <Avatar aria-label={isSimpleEditControl? "Face Icon" : "First letter of title"} > {
                isSimpleEditControl ? <FaceIcon/> : firstLetter
              }
              </Avatar>}>
            </CardHeader>
          )}

          {this.state.editMode && (
            <CardHeader
              title={<TextField className="response__author" defaultValue={isSimpleEditControl ? "" : title} required label="Name"/>}
              avatar={<Avatar className="response__label" role="button" aria-label="Face Icon"><FaceIcon/></Avatar>}></CardHeader>
          )}

          {!this.state.editMode &&!isSimpleEditControl && (
            <CardContent className="response__content">
              <Typography component="p">
                {message}
              </Typography>
            </CardContent>
          )}

          {this.state.editMode && (
            <CardContent>
              <TextField
                className="response__textField"
                multiline={true}
                rowsMax={40}
                autoFocus={true}
                rows={3}
                margin="normal"
                defaultValue={message}
              />
            </CardContent>
          )}

          {!this.state.editMode && !isSimpleEditControl && (
            <VoteActions onVoteChange={this.onVoteChange} onEditClick={this.onEditClick} onDeleteClick={this.onDeleteClick} className="response__actions" votes={votes}/>
          )}

          {this.state.editMode && (
            <CardActions className="writeResponse__actions">
              <Button type="submit" variant="raised" color="primary" >
                Save
              </Button>
              <Button onClick={this.stopEditMode} color="secondary">
                Cancel
              </Button>
            </CardActions>
          )}

        </form>

      </Card>
    );
  }
}

class ResponseCard extends Response {
  static propTypes = {
    author: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    message: PropTypes.string.isRequired,
    votes: PropTypes.number,
    onVoteChange: PropTypes.func,
    onEditClick: PropTypes.func,
    onDeleteClick: PropTypes.func
  }

  render() {
    const {
      author,
      date,
      ...props
    } = this.props
    const firstLetter = author.substring(0, 1).toUpperCase()
    const formatedDate = date.toLocaleString() //TODO: "September 14 2016"
    return (<Response title={author} className="ResponseCard" subTitle={`${formatedDate}`} icon={firstLetter} {...props}/>);
  }
}

class PostCard extends Response {
  static propTypes = {
    title: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    name: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    comments: PropTypes.number,
    votes: PropTypes.number,
    onVoteChange: PropTypes.func,
    onEditClick: PropTypes.func,
    onDeleteClick: PropTypes.func
  }
  render() {
    const {
      title,
      date,
      comments = 0,
      name,
      ...props
    } = this.props
    const formatedDate = date.toLocaleString() //TODO: "September 14 2016"
    const firstLetter = title.substring(0, 1).toUpperCase()
    return (<Response title={title} className="PostCard" subTitle={`${name} - ${formatedDate} - Comments: ${comments}`} icon={firstLetter} {...props}/>);
  }
}

export default Response;
export {
  PostCard,
  ResponseCard
}
