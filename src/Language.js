// import React from 'react'
import { Header, Star } from './commons.js'

function LanguageEntry(props) {
  return (<tr>
    <td width="15%">{props.curr.name}</td>
    <td>{props.curr.desc}</td>
    <td width="10%" className="text-center">
      {props.curr.mother ? <i className="bi bi-check-square"></i> : <i className="bi bi-square"></i>}
    </td>
    <td width="20%">
      <Star level={props.curr.level} />
    </td>
  </tr>)
}

function LanguageView(props) {
  const list = props.items.map((i) => <LanguageEntry key={i.name} curr={i}/>)
  return (<section>
    <Header title="languages"/>
    <table className="table">
      <tbody>
        {list}
      </tbody>
    </table>
  </section>)
}

export default LanguageView
