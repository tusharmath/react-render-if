# react-render-if

A decorator that can take any number of functions as predicates. The predicates are called with the current instance of the component as the first parameter. If the return value of all the params is truthty only then the component is rendered.

### Before

```javascript
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
    if(this.state === null || this.state.list.length === 0){
      return null
    }
  
    return (
      <ul>
      {this.state.list.map(x => x)}
      </ul>
    )
  }
}

```


### Usage

```javascript
import {renderIf} from 'react-render-if'
import {Component} from 'react'

// Takes in n number of predicates
@renderIf(  
  x => x.state !== null, 
  x => x.state.list.length > 0
)
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

## Even Better

```javascript
import {curry} from 'lodash'
const isntEmpty = curry((path, i) => _.get(i, path).length > 0)

@renderIf(
  isntEmpty('state.list')
)
class UserList extends Component {
  ...
}
```
