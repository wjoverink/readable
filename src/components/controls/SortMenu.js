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
    asc: PropTypes.bool,
    onSortChanged: PropTypes.func
  }

  state = {
    anchorEl: null,
  }

  openSortMenu = event => {
    this.setState({anchorEl: event.currentTarget})
  }

  handleSortMenuClose = () => {
    this.setState({anchorEl: null})  }

  handleSortClick = (s, wasSelected) => {
    this.handleSortMenuClose()
    if (this.props.onSortChanged) {

      this.props.onSortChanged(s.value, wasSelected ? !this.props.asc : this.props.asc)
    }
  }

  getarrow = (isSelected) =>{
    if (isSelected && !this.props.asc){
      return <ArrowUpward />
    }
    return <ArrowDownward />
  }

  render() {
    const {caption="Sort", sortItems,selected} = this.props
    const {anchorEl} = this.state;

    return (
      <div>
        <IconButton className="header__action" onClick={this.openSortMenu} aria-owns={anchorEl
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
