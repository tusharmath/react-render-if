# react-render-if [![Build Status](https://travis-ci.org/tusharmath/react-render-if.svg?branch=master)](https://travis-ci.org/tusharmath/react-render-if) [![npm](https://img.shields.io/npm/v/react-render-if.svg)]() [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Using `if` and `else` in your react components goes against the [open close principle](http://www.oodesign.com/open-close-principle.html).
> Software entities like classes, modules and functions should be open for extension but closed for modifications.

Also, **when to render** a component is primarly a property of the component. We often implement this behaviour in the `render()` function which mixes up with its primary responsiblity of — **how to render**. This makes the code difficult to read at the same time the logic becomes local to that particular render function.

## Installation

```
npm i react-render-if --save
```

### Before

```javascript
class Header extends Component {
  render () {
    // Complex logic inside the render function about "when to render" the component.
    // Interferes with the "how to render", which should be render() function's primary responsibility.
    
    if(this.props.loggedIn){
      return (
        <div>Welcome!</div>
      )
    } else {
      return <div><a href="/#/login">Login</a></div>
    }
  }
}
```


### After

```javascript
import {renderIf, itsTrue, itsFalse} from 'react-render-if'
import {Component} from 'react'


class Header extends Component {
  render () {
    const loggedIn = this.props.loggedIn
    return (
      <HeaderLoggedIn loggedIn={loggedIn} />
      <HeaderLoggedOut loggedIn={loggedIn} />
    )
  }
}

@renderIf(itsTrue('props.loggedIn'))
class HeaderLoggedIn extends Component {
  render () {
    return (<div>Welcome!</div>)
  }
}

@renderIf(itsFalse('props.loggedIn'))
class HeaderLoggedOut extends Component {
  render () {
    return (<div><a href="/#/login">Login</a></div>)
  }
}

```



## API Helpers
Some useful helper functions are added as a part of this library so that you don't have to write anon arrow functions.

- `itHas(<path>)`: renders if the path exists on a component. Eg. 'state.list.length'  

- `itsTrue(<path>)`: renders if `true` is set at the path.

- `itsFalse(<path>)`: renders if `false` is set at the path.

- `itsOk(<path>)`: renders if path has a truthy value. 

- `itsNotOk(<path>)`: renders if path has a falsey value. 

- `itsGT(<path>, <value>)`: renders if the value at path is greater than the value passed as the second param. Other versions of this comparisons are —  `itsGTE`, `itsLTE` & `itsLT`. All of which take in <path> as the first param and <value> as the second.

- `itsEqual(<path>, <value>)`: renders if the value at the given path is equal to what is being passed as the second param. 

- `itsNotEqual(<path>, <value>)`: renders if the value at the given path is NOT equal to what is being passed as the second param.


---

Uses [lodash custom build](https://lodash.com/custom-builds)
```
lodash include=has,get,curry,toArray -d
```
