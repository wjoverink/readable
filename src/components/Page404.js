import React, {Component} from 'react'
import Typography from 'material-ui/Typography'
import './DetailPost.css'


class Page404 extends Component {

  render() {
    return (
      <main className="post main-content main-content--defWidth">

        <header>
          <Typography variant="title" gutterBottom  align="left">
            Ooops something went wrong
          </Typography>
        </header>

        <article>
          <Typography>
            We can't seem to find the page you're looking for.
          </Typography>
        </article>

      </main>)
  }
}

export default Page404
