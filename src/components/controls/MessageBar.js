import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Snackbar from 'material-ui/Snackbar';

/**
* @description Represents a messageBar that will notify the user on messages
* @constructor
*/
class MessageBar extends Component {
  static propTypes = {
    messages: PropTypes.array,
    onClose: PropTypes.func
  };

  state = {
    openMessage: false,
  };

  /**
  * @description event closes the message and raises the onClose event
  */
  handleMessageClose = () => {
    this.setState({ openMessage: false });
    if (this.props.onClose){
      this.props.onClose();
    }
  };

  /**
  * @description react lifecycle
  * set the  openMessage state to true if there are new messages
  */
  componentWillReceiveProps(props){
    if (props.messages.length>0){
      this.setState({
        openMessage:true
      })
    }
  }

  render() {
    const {messages} = this.props

    return (
      <Snackbar
        className="message-bar app__message-bar"
        anchorOrigin={{ vertical:'top', horizontal:'center' }}
        open={this.state.openMessage}
        onClose={this.handleMessageClose}
        autoHideDuration={1400}
        SnackbarContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span className="message-bar__text" id="message-id">{messages.length>0 ? messages[0] : ""}</span>}
              />);
  }
}

export default MessageBar;
