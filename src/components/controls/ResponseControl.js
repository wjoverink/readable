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

/**
* @description Represents a content card
* card contains of a header with avatar, vote actions and a edit/delete actions
*
* if editMode then on edit click the title and message can be inline edited
*
* if isSimpleEditControl then its just an inputfield with an avatar
* @constructor
*/
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
    editMode: PropTypes.bool,
    hasEditMode: PropTypes.bool,
    isSimpleEditControl: PropTypes.bool,
    avatarColor: PropTypes.string,
    discardText: PropTypes.string,
    disabled: PropTypes.bool
  }

  state = {
    editMode: this.props.editMode && this.props.hasEditMode
  }

  /**
  * @description event, Vote changes
  * @param {object} votes
  * @param {object} e - control
  */
  onVoteChange = (votes, e) => {
    if (this.props.onVoteChange) {
      this.props.onVoteChange(votes, e)
    }
  }

  /**
  * @description event, Edit button click
  * Updates the editMode state so it sets the controls in editmode
  * @param {object} e - control
  */
  onEditClick = (e) => {
    if (this.props.hasEditMode) {
      this.setState({editMode: true})
    }
    if (this.props.onEditClick) {
      this.props.onEditClick(e)
    }
  }

  /**
  * @description event, Edit button click in simpleEditMode
  * or click on the header
  * @param {object} e - control
  */
  onSimpleEditClick = (e) => {
    if (!this.props.disabled) {
      if (this.props.isSimpleEditControl) {
        this.onEditClick(e);
      }
      if (this.props.onHeaderClick) {
        this.props.onHeaderClick(e)
      }
    }
  }

  /**
    * @description Updates the editMode state so it stops the edit mode
    */
  stopEditMode = () => {
    this.setState({editMode: false})
  }

  /**
  * @description event, Delete button click
  * @param {object} e - control
  */
  onDeleteClick = (e) => {
    if (this.props.onDeleteClick) {
      this.props.onDeleteClick(e)
    }
  }

  /**
  * @description event on form submit
  * @param {object} e - control
  */
  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.props.disabled) {
      this.stopEditMode();
      if (this.props.onChange) {
        this.props.onChange(this.headerTextField.value, this.bodyTextField.value)
      }
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
      avatarColor = '#bdbdbd',
      onChange,
      discardText,
      disabled = false,
      ...props
    } = this.props
    const firstLetter = icon || title.substring(0, 1).toUpperCase()

    return (<Card {...props}>

      <form onSubmit={this.handleSubmit} className={isSimpleEditControl
        ? "card__form--simple"
        : "card__form"} autoComplete="off">
        {
          !this.state.editMode && (<CardHeader onClick={this.onSimpleEditClick} className="card__header" title={title} subheader={subTitle}
            avatar={<Avatar style={{backgroundColor:avatarColor}} aria-label={isSimpleEditControl? "Face Icon": "First letter of title"}> {isSimpleEditControl? <FaceIcon/>: firstLetter}</Avatar>}>
          </CardHeader>)
        }

        {
          this.state.editMode && (<CardHeader
            title={<TextField disabled={disabled} inputRef={el => this.headerTextField = el} className="card__headerField" defaultValue={isSimpleEditControl ? "" : title} required label="Name" />}
            avatar={<Avatar className="card__headerLabel" role="button" aria-label="Face Icon" > <FaceIcon/></Avatar>}>
          </CardHeader>)
        }

        {
          !this.state.editMode && !isSimpleEditControl && (<CardContent className="card__content">
            <Typography component="p">
              {message}
            </Typography>
          </CardContent>)
        }

        {
          this.state.editMode && (<CardContent>
            <TextField disabled={disabled} inputRef={el => this.bodyTextField = el} className="card__ContentField" multiline={true} rowsMax={40} autoFocus={true} rows={3} margin="normal" defaultValue={message}/>
          </CardContent>)
        }

        {!this.state.editMode && !isSimpleEditControl && (<VoteActions disabled={disabled} discardText={discardText} onVoteChange={this.onVoteChange} onEditClick={this.onEditClick} onDeleteClick={this.onDeleteClick} className="card__actions" votes={votes}/>)}

        {
          this.state.editMode && (<CardActions className="cardActions card__saveActions">
            <Button type="submit" className="cardActions__save" variant="raised" color="primary">
              Save
            </Button>
            <Button onClick={this.stopEditMode} className="button--cancel cardAction__cancel" color="secondary">
              Cancel
            </Button>
          </CardActions>)
        }

      </form>

    </Card>);
  }
}

export default Response;
