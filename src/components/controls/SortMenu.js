import React, {Component} from 'react'
import {IconButton} from 'material-ui'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import ArrowDownward from 'material-ui-icons/ArrowDownward'
import ArrowUpward from 'material-ui-icons/ArrowUpward'
import Menu, {MenuItem} from 'material-ui/Menu'
import PropTypes from 'prop-types'
import { ListItemIcon, ListItemText } from 'material-ui/List';

class Sortmenu extends Component {
  static propTypes = {
    caption: PropTypes.string,
    sortItems: PropTypes.array,
    selected: PropTypes.string,
    onSortChanged: PropTypes.func
  }

  state = {
    anchorEl: null,
  }

  openSortMenus = event => {
    this.setState({anchorEl: event.currentTarget})
    console.log("openSortMenu",this.state.anchorEl)
  }

  handleSortMenuClose = () => {
    this.setState({anchorEl: null})
    console.log("handleSortMenuClose",this.state.anchorEl)
  }

  handleSortClick = (s) => {
    console.log("handleSortClick")
    this.handleSortMenuClose()
    if (this.props.onSortChanged) {
      this.props.onSortChanged(s)
    }
  }

  getarrow = (item) =>{
    if (item.direction === 0){
      return <ArrowUpward />
    } else if (item.direction === 1){
      return <ArrowDownward />
    }

  }

  render() {
    const {caption="Sort", sortItems,selected} = this.props
    const {anchorEl} = this.state;
  console.log("Boolean(anchorEl)",Boolean(anchorEl))

    return (
      <div>
        <IconButton className="header__action" onClick={this.openSortMenus} aria-owns={anchorEl
          ? 'simple-menu'
          : null} aria-haspopup="true" aria-label="Show Sorting">
          {caption}
          <ExpandMoreIcon/>

        </IconButton>
        <Menu id="sort-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleSortMenuClose}>
          {sortItems.map(item => (
            <MenuItem key={item.value} selected={item.value === selected} onClick={() => this.handleSortClick(item.value)}>

              <ListItemText primary={item.name} />
            </MenuItem>
          ))}
        </Menu>
      </div>

    );
  }
}

export default Sortmenu;
