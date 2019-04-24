import React, { useState } from 'react';
import './Rules.scss'
import JSONInput from 'react-json-editor-ajrm';
import locale    from 'react-json-editor-ajrm/locale/fr';
import uuid from 'uuid/v4'

export default function Rules ({ rules }) {
  rules = rules || []
  return (
    <div className="rjre__rules">
      {rules.map((rule) => (<Rule rule={rule}/>))}
    </div>
  )
}

function Rule ({ rule }) {
  let { conditions, event } = rule
  return (
    <div className="rjre__rule">
      <Conditions conditions={conditions}/>
      <Event event={event} />
    </div>
  )
}

function Conditions ({ conditions }) {
  let type = ''
  if (conditions.any) {
    conditions = conditions.any
    type = 'any'
  } else if (conditions.all) {
    conditions = conditions.all
    type = 'all'
  }
  return type ?  allConditions(): oneCondition()

  function allConditions () {
    return (
      <div className="rjre__condition rjre__conditions" data-type={type}>
        {conditions.map((condition) => (<Condition condition={condition}/>))}
      </div>
    )
  }
  function oneCondition () {
    return (<Condition condition={conditions} />)
  }

}

function Condition ({ condition }) {
  if (condition.all || condition.any) {
    return (< Conditions conditions={condition} />)
  }
  return (
    <fieldset className="rjre__condition">
      <legend>Quand</legend>
      <input type="text" name="fact" value={condition.fact} />
      <OperatorInput operator={condition.operator} />
      <input type="text" name="value" value={condition.value} />

    </fieldset>
  )
}

function OperatorInput({ operator }) {
  return (
    <select name="operator" className="rjre__operator">
      <option value="equal">Égal à</option>
      <option value="notEqual">Différent de</option>
      <option value="lessThan">Strictement inférieur à</option>
      <option value="lessThanInclusive">Inférieur ou égal à</option>
      <option value="greater">Strictement supérieur à</option>
      <option value="greaterThanInclusive">Supérieur ou égal à</option>
      <option value="in">Présent dans</option>
      <option value="notIn">Absent dans</option>
      <option value="contains">Contient</option>
      <option value="doesNotContain">Ne contient pas</option>
    </select>
  )
}

function Event ({ event }) {
  const [id] = useState(uuid())
  return (
    <fieldset className="rjre__event">
      <legend>Alors</legend>
      <span class="event-name">
        <input type="text" className="type" placeholder="Nom du resultat" value={event.type} />
      </span>
      <span className="got-value">Aura pour valeur</span>
      <span className="event-value">
        <code>{ JSON.stringify(event.params) }</code>
      </span>
    </fieldset>
  )
}

        //<JSONInput
          //id          = { id }
          //placeholder = { event.params }
          //locale      = { locale }
          //height      = '7em'
        ///>
