import { Link } from 'react-router-dom'

function Header(props) {
  return (<header className="border-bottom">
    <h1 className="h4 text-capitalize">{props.title}</h1>
  </header>)
}

function Star(props) {
  const full = parseInt(props.level/2)
  const half = full !== props.level/2
  const rest = 5 - full - (half ? 1 : 0)

  const fill = Array(full).fill(0).map((_, i) => <i key={'fill-'+i} className="bi bi-star-fill"></i>)
  const empty = Array(rest).fill(0).map((_, i) => <i key={'empty-'+i} className="bi bi-star"></i>)

  return (<div className="text-end">
    {fill}
    {half ? <i className="bi bi-star-half"></i> : ''}
    {empty}
  </div>)
}

function IconText(props) {
  const list = ['bi', 'bi-'+props.icon]
  return (<div className="mb-2">
    <i className={list.join(' ')}></i>
    <span className="ms-2">{props.value}</span>
  </div>)
}

function YearDate(props) {
  const millis = Date.parse(props.date)
  const when = new Date(millis)
  return (<span>{when.getFullYear()}</span>)
}

function Nav() {
  return (<nav className="navbar navbar-light bg-light border-bottom">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">Resume</a>
      <div className="">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/signout" className="nav-link">
              <i className="bi bi-box-arrow-right"></i>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>)
}

export {Header, Star, IconText, YearDate, Nav}
