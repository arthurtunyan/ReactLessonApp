import {createPortal} from "react-dom"
import classes from "./Modal.module.css"

function Modal({isOpen, onClose, children}) {
    console.log(classes)
    if(!isOpen) {
        return null;
    }
    return createPortal(
        <div className={classes.modal}>
            <div className={classes["modal-content"]} style = {{borderRadius:"20px",padding:"20px",fontWeight:600}}>
                {children}
                <button onClick={onClose}>Close</button>
            </div>
        </div>, document.body
    );
}
export default Modal;
