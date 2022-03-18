import { useNavigate } from 'react-router'
import Modal from './Modal.js'

function Edit() {
  const navigate = useNavigate()
  const params = {
    title: 'Edit Technical Skill',
    onClose: () => { navigate('/') }
  }
  return (<Modal {...params}>
      <p>Modal body text goes here.</p>
    </Modal>)
}

export default Edit
