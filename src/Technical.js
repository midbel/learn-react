// import React from 'react'
import { Header, Star } from './commons.js'


function SkillEntry(props) {
  return (<tr>
    {props.index === 0 &&
      <th width="15%" className="align-middle" rowSpan={props.size}>{props.category}</th>}
    <td width="15%">{props.curr.name}</td>
    <td>{props.curr.desc}</td>
    <td width="10%" className="text-center">{props.curr.seniority}</td>
    <td width="20%">
      <Star level={props.curr.level}/>
    </td>
  </tr>)
}

function Skill(props) {
  const list = props.item.skills.map((i, j) => <SkillEntry key={j} curr={i} index={j} size={props.item.skills.length} category={props.item.category}/>)
  return (<tbody>
    {list}
  </tbody>)
}

function TechnicalView(props) {
  const list = props.items.map((i, j) => <Skill key={j} item={i}/>)
  return (<section>
    <Header title="technical skills"/>
    <table className="table">
      {list}
    </table>
  </section>)
}

export default TechnicalView
