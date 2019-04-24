import React, { useState } from 'react'
import logo from './logo.svg'
import Rules from './Rules'
import './App.css'

export function App () {
  const [rules, setRules] = useState(INITIAL)
  return (
    <div className="App">
      <Rules rules={rules}/>
    </div>
  )
}

const INITIAL = [{
  conditions: {
    any: [{
      all: [{
        fact: 'gameDuration',
        operator: 'equal',
        value: 40
      }, {
        fact: 'personalFoulCount',
        operator: 'greaterThanInclusive',
        value: 5
      }]
    }, {
      all: [{
        fact: 'gameDuration',
        operator: 'equal',
        value: 48
      }, {
        fact: 'personalFoulCount',
        operator: 'greaterThanInclusive',
        value: 6
      }]
    }]
  },
  event: {  // define the event to fire when the conditions evaluate truthy
    type: 'fouledOut',
    params: {
      message: 'Player has fouled out!'
    }
  }
}]

export default App
