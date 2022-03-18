import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import CareerView from './Career.js';
import EducationView from './Education.js';
import LanguageView from './Language.js';
import TechnicalView from './Technical.js';
import { Nav } from './commons.js';
import About from './Contact.js';
import { useAuth } from './context.js'
import { getProfile } from './api.js'

function Profile(props) {
  return (<About profile={props.profile}/>)
}

function Career(props) {
  return (<>
    <div className="mb-4">
      <CareerView items={props.profile.careers || []}/>
    </div>
    <div className="mb-4">
      <EducationView items={props.profile.educations || []}/>
    </div>
    <div className="mb-4">
      <LanguageView items={props.profile.languages || []}/>
    </div>
    <div className="mb-4">
      <TechnicalView items={props.profile.technicals || []}/>
    </div>
  </>)
}

const defaultProfile = {
  id: 0,
  first_name: '',
  last_name: '',
  about: '',
  position: '',
  email: '',
  phone: '',
  address: {},
  networkds: [],
  careers: [],
  educations: [],
  technicals: []
}

function Resume() {
  const [profile, setProfile] = useState(defaultProfile)
  const { user, token, isAuthenticated } = useAuth()

  useEffect(async () => {
    const refresh = async () => {
      const body = await getProfile(user.id, token)
      setProfile(body)
    }
    refresh()
  }, [user.id])

  if (!isAuthenticated()) {
    return <Navigate to="/signin"/>
  }
  if (!profile) {
    return ""
  }
  return (<>
    <Nav />
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
  </>)
}

export default Resume;
