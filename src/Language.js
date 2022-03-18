// import React from 'react'
import { Link } from 'react-router-dom'
import { Header, Star } from './commons.js'

function LanguageEntry(props) {
  return (<tr>
    <td width="15%">{props.curr.lang}</td>
    <td>{props.curr.desc}</td>
    <td width="10%" className="text-center">
      {props.curr.mother ? <i className="bi bi-check-square"></i> : <i className="bi bi-square"></i>}
    </td>
    <td width="20%">
      <Star level={props.curr.level} />
    </td>
    <td width="5%" className="text-end">
      <Link to={`/languages/${props.curr.id}`} className="btn btn-outline-secondary btn-sm">
        <i className="bi bi-pencil"></i>
      </Link>
    </td>
  </tr>)
}

function LanguageView(props) {
  const list = props.items.map((i) => <LanguageEntry key={i.lang} curr={i}/>)
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
