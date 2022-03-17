import profile from './profile.js';
import CareerView from './Career.js';
import EducationView from './Education.js';
import LanguageView from './Language.js';
import TechnicalView from './Technical.js';
import About from './Contact.js';
import { useAuth } from './context.js'
import { Navigate } from 'react-router-dom'

function Profile(props) {
  return (<About profile={props.profile}/>)
}

function Career(props) {
  return (<>
    <div className="mb-4">
      <CareerView items={props.profile.careers}/>
    </div>
    <div className="mb-4">
      <EducationView items={props.profile.educations}/>
    </div>
    <div className="mb-4">
      <LanguageView items={props.profile.languages}/>
    </div>
    <div className="mb-4">
      <TechnicalView items={props.profile.hardskills}/>
    </div>
  </>)
}

function Resume() {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated()) {
    return <Navigate to="/signin"/>
  }
  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col-3">
          <Profile profile={profile}/>
        </div>
        <div className="col-9">
          <Career profile={profile}/>
        </div>
      </div>
    </div>
  );
}

export default Resume;
