import profile from './profile.js';
import CareerView from './Career.js';
import EducationView from './Education.js';
import LanguageView from './Language.js';
import TechnicalView from './Technical.js';
import About from './Contact.js';
import { useAuth } from './context.js'
import { Navigate } from 'react-router-dom'

function Resume() {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated()) {
    return <Navigate to="/signin"/>
  }
  return (
    <div className="App container-fluid mt-5">
      <div className="row">
        <div className="col-3">
          <About profile={profile}/>
        </div>
        <div className="col-9">
          <div className="mb-4">
            <CareerView items={profile.careers}/>
          </div>
          <div className="mb-4">
            <EducationView items={profile.educations}/>
          </div>
          <div className="mb-4">
            <LanguageView items={profile.languages}/>
          </div>
          <div className="mb-4">
            <TechnicalView items={profile.hardskills}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resume;
