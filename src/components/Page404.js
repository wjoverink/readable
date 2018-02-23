import React, {Component} from 'react'
import Typography from 'material-ui/Typography'
import {Link} from 'react-router-dom'
import Button from 'material-ui/Button';
import PropTypes from 'prop-types'
import page404 from '../images/Page404.svg';
import './Page404.css';

class Page404 extends Component {
  static page404Classnames = "main-content main-content--defWidth"
  static propTypes = {
    header: PropTypes.string,
    subHeader: PropTypes.string,
    body: PropTypes.string,
    links: PropTypes.array,
    image: PropTypes.object
  };

  render() {


    const {
      header = "Oops!",
      subHeader = "We can't seem to find the  page you're looking for.",
      body = "Here are some helpfull links instead:",
      links = [{to:'/', caption:'Back to Homepage'}, {to:'/post/new', caption:'Write new article'}],
      image = page404,
    } = this.props

    return (<main className={`page404 ${!this.props ? this.page404Classnames : ""}`} style={{
        background: `transparent url(${image}) no-repeat bottom right`,
        backgroundSize: '26%'
    }}>

      <header>
        <Typography variant="display4" gutterBottom="gutterBottom" align="left">
          {header}
        </Typography>
      </header>

      <article>
        <Typography variant="display1">
          {subHeader}
        </Typography>
        <br/>
        <Typography>
          {body}
        </Typography>
        {links.map(link=> (
          <Link className='link page404__link' to={link.to}>{link.caption}</Link>
        ))}
      </article>
    </main>)
  }
}

export default Page404
