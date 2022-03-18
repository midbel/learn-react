import { IconText} from './commons.js'

function Thumbnail(props) {
  return (<div className="text-center mb-5">
    <img alt="profile" src="https://via.placeholder.com/200" className="img-thumbnail rounded-circle"/>
  </div>)
}

function Who(props) {
  return (<header className="text-center mb-4 text-capitalize">
    <h1 className="h4">{props.firstname} {props.lastname}</h1>
    <h2 className="h5">{props.position}</h2>
  </header>)
}

function Contact(props) {
  const addr = props.profile.address.street + ', ' + props.profile.address.city
  return (<section className="mb-3">
    <h3 className="h5">Contact</h3>
    <IconText icon="phone" value={props.profile.phone}/>
    <IconText icon="envelope" value={props.profile.email}/>
    <IconText icon="house" value={addr}/>
  </section>)
}

function SocialNetworks(props) {
  return (<section className="mb-3">
    <h3 className="h5">Social Networks</h3>
    <IconText icon="globe" value={props.web}/>
    <IconText icon="github" value={props.github}/>
    <IconText icon="linkedin" value={props.linkedin}/>
    <IconText icon="twitter" value={props.twitter}/>
    <IconText icon="facebook" value={props.facebook}/>
  </section>)
}

function Summary(props) {
  return (<section className="mb-3">
    <h3 className="h5">About</h3>
    <p className="text-justify">{props.about}</p>
  </section>)
}

function About(props) {
  const who = {
    firstname: props.profile.first_name,
    lastname: props.profile.last_name,
    position: props.profile.position
  }
  return (<div>
    <Thumbnail/>
    <Who {...who}/>
    <Summary about={props.profile.about}/>
    <Contact profile={props.profile}/>
    <SocialNetworks {...props.profile.networks}/>
  </div>)
}

export default About
