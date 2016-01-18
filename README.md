# react-render-if [![Build Status](https://travis-ci.org/tusharmath/react-render-if.svg?branch=master)](https://travis-ci.org/tusharmath/react-render-if) [![npm](https://img.shields.io/npm/v/react-announce-fetch.svg)]()
A decorator that can take any number of functions as predicates. The predicates are called with the current instance of the component as the first parameter. If the return value of all the params is truthy only then the component is rendered.

**When to render** a component is primarly a property of the component. We often implement this behaviour in the `render()` function which mixes up with its primary responsiblity of — **how to render**. This makes the code difficult to read at the same time the logic becomes local to that particular render function and thus becomes non-reusable.
This decorator helps alleviate that and follow [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)

## Installation

```
npm i react-render-if --save
```

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
    // Complex logic inside the render function about "when to render" the component.
    // Interferes with the "how to render" which should be it primary responsibility.
    if(this.state === null || this.state.list.length === 0){
      return null
    }
  
    return (
      <ul>
        {this.state.list.map((x, i) => <li key={i}>{x}</li>)}
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
        {this.state.list.map((x, i) => <li key={i}>{x}</li>)}
      </ul>
    )
  }
}

```

## Even Better

```javascript
import {renderIf, itsGT} from 'react-render-if'
import {Component} from 'react'
 
// itsGT() is a helper that makes sure that the component is only rendered if state.list.length is greater than 0
@renderIf(itsGT('state.list.length', 0))
class UserList extends Component {
  ...
}
```
