import React, {Component} from 'react'
import Typography from 'material-ui/Typography'
import {Link} from 'react-router-dom'
import Button from 'material-ui/Button';
import page404 from './Page404.svg';
import './Page404.css';

class Page404 extends Component {

  render() {
    return (
      <main className="page404 main-content main-content--defWidth" style={{
        background: `transparent url(${page404}) no-repeat bottom right`,
        backgroundSize: '26%'
      }}>

        <header>
          <Typography variant="display4" gutterBottom  align="left">
            Oops!
          </Typography>
        </header>

        <article>
          <Typography variant="display1">
            We can't seem to find the  page you're looking for.
          </Typography>
          <br/>
          <Typography>
            Here are some helpfull links instead:
          </Typography>
          <Link className='link page404__link' to='/'>Back to Homepage</Link>
          <Link className='link page404__link' to='/post/new'>Write new article</Link>
          {/* <img src={page404} className="appBar__App-logo" alt="logo" /> */}
        </article>
      </main>)
  }
}

export default Page404
