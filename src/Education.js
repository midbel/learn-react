// import React from 'react'
import {Link} from 'react-router-dom'
import { Header, YearDate } from './commons.js'

function EducationEntry(props) {
  return (
    <tr>
      <td width="15%">
        <YearDate date={props.curr.dtstart}/>
      </td>
      <td width="15%">
        {props.curr.dtend && <YearDate date={props.curr.dtend}/>}
      </td>
      <td className="text-capitalize">{props.curr.school}</td>
      <td className="text-capitalize">{props.curr.location}</td>
      <td>{props.curr.degree}</td>
      <td width="5%" className="text-end">
        <Link to={`/educations/${props.curr.id}`} className="btn btn-outline-secondary btn-sm">
          <i className="bi bi-pencil"></i>
        </Link>
      </td>
    </tr>)
}

function EducationView(props) {
  const list = props.items.map((i) => <EducationEntry key={i.school} curr={i}/>)
  return (<section>
    <Header title="education"/>
    <table className="table">
      <tbody>
        {list}
      </tbody>
    </table>
  </section>)
}

export default EducationView
