import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createPortal } from "react-dom";
import classes from "./Modal.module.css";
function Modal({ isOpen, onClose, children }) {
    console.log(classes);
    if (!isOpen) {
        return null;
    }
    return createPortal(_jsx("div", { className: classes.modal, children: _jsxs("div", { className: classes["modal-content"], style: { borderRadius: "20px", padding: "20px", fontWeight: 600 }, children: [children, _jsx("button", { onClick: onClose, children: "Close" })] }) }), document.body);
}
export default Modal;
//# sourceMappingURL=ModalModule.js.map
//# sourceMappingURL=ModalModule.js.map