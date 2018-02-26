import React, {Component} from 'react'
import {IconButton} from 'material-ui'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import ArrowDownward from 'material-ui-icons/ArrowDownward'
import ArrowUpward from 'material-ui-icons/ArrowUpward'
import Menu, {MenuItem} from 'material-ui/Menu'
import PropTypes from 'prop-types'
import { ListItemIcon, ListItemText } from 'material-ui/List';
import './SortMenu.css';

/**
* @description Represents a SortMenu
* sortItems array of object {name:sort name, value:sort value}
* @constructor
*/
class Sortmenu extends Component {
  static propTypes = {
    caption: PropTypes.string,
    sortItems: PropTypes.array,
    selected: PropTypes.string,
    asc: PropTypes.bool,
    onSortChanged: PropTypes.func,
    className:PropTypes.string
  }

  state = {
    anchorEl: null,
  }

  /**
  * @description set state to open the menu
  * @param {object} event - event
  */
  openSortMenu = event => {
    this.setState({anchorEl: event.currentTarget})
  }

  /**
  * @description set state to close the menu
  */
  handleSortMenuClose = () => {
    this.setState({anchorEl: null})
  }

  /**
  * @description event a sortitem is selected
  * @param {object} sort - the sort object
  * @param {wasSelected} bool - if this object was selected before
  */
  handleSortClick = (s, wasSelected) => {
    this.handleSortMenuClose()
    if (this.props.onSortChanged) {

      this.props.onSortChanged(s.value, wasSelected ? !this.props.asc : this.props.asc)
    }
  }

  /**
  * @description return the right arrow based on if it was selected before
  * @param {isSelected} bool - if this object was selected before
  * @return control - up or down arrow
  */
  getarrow = (isSelected) =>{
    if (isSelected && !this.props.asc){
      return <ArrowUpward />
    }
    return <ArrowDownward />
  }

  render() {
    const {caption="Sort", sortItems,selected, className} = this.props
    const {anchorEl} = this.state;

    return (
      <div className={`sort-menu ${className}`}>
        <IconButton className="sort-menu__button" onClick={this.openSortMenu} aria-owns={anchorEl
          ? 'simple-menu'
          : null} aria-haspopup="true" aria-label="Show Sorting">
          {caption}
          <ExpandMoreIcon/>
        </IconButton>

        <Menu id="sort-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleSortMenuClose}>
          {sortItems.map(item => (
            <MenuItem key={item.value} selected={item.value === selected} onClick={(e) => this.handleSortClick(item, item.value === selected)}>
              <ListItemIcon>
                {this.getarrow(item.value === selected)}
              </ListItemIcon>
              <ListItemText inset primary={item.name} />
            </MenuItem>
          ))}
        </Menu>
      </div>

    );
  }
}

export default Sortmenu;
