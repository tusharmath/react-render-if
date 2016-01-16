# react-render-if

### Usage

```javascript
import {renderIf} from 'react-render-if'
import {Component} from 'react'

@renderIf(x => x.state !== null, x => x.state.list.length > 0)
class UserList extends Component {
  componentWillMount () {
    this.setState({list: []})
    
    setInterval(x => {
      const list = this.state.list.slice()
      list.push(new Date())
      this.setState({list})
    }, 1000)
    
  }
  render () {
    return (
      <ul>
      {this.state.list.map(x => x)}
      </ul>
    )
  }
}

```
