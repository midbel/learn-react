// import React from 'react'
import { Header, YearDate } from './commons.js'

function CareerEntry(props) {
  return (<tr>
    <td width="15%">
      <YearDate date={props.curr.dtstart}/>
    </td>
    <td width="15%">
      {props.curr.dtend && <YearDate date={props.curr.dtend}/>}
    </td>
    <td>{props.curr.employer}</td>
    <td>{props.curr.location}</td>
    <td>{props.curr.position}</td>
  </tr>)
}

function CareerView(props) {
  const list = props.items.map((i) => <CareerEntry key={i.employer} curr={i}/>)
  return (<section>
    <Header title="careers"/>
    <table className="table">
      <tbody>
        {list}
      </tbody>
    </table>
  </section>)
}

export default CareerView
