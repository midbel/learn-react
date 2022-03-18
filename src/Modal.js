import {useLayoutEffect} from 'react'

function Modal(props) {
  useLayoutEffect(() => {
    const el = document.getElementById("modal")
    const modal = window.bootstrap.Modal.getOrCreateInstance(el)
    modal.show()
    return () => {
      modal.hide()
    }
  }, [])
  return (<div className="modal" tabIndex="-1" id="modal">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{props.title}</h5>
          <button onClick={props.onClose}
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div className="modal-body">
          {props.children}
        </div>
        <div className="modal-footer">
          <button onClick={props.onClose}
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal">Close</button>
          <button type="button" className="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>)
}

export default Modal
