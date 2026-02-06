import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useMemo, useState, useRef, useEffect, useTransition, useReducer } from "react";
import Modal from "../components/ModalModule";
import Button from "../components/Button";
import Input from "../components/Input";
import { fakeAPIRequest } from "./FakeAPIRequest.js";
import { initialState, reducer, actions } from "./FormState.js";
import { PageWrapper, Container, ModalActions, Form, FormRow, FormColumn, Label, AttachmentBox, AttachmentSubtext, AttachmentText, ModalText, ErrorText, SpanText, HeaderBox, ModalContent, ModalTitle, SubmitRow, SelectContainer, StyledSelect, Title, FileInput } from "./ContactUsStyles";
function memoize(fn) {
    // A Map is used for the cache because it can handle a variety of key types.
    const cache = new Map();
    return function (...args) {
        console.log("Before", cache);
        // A key is generated from the function arguments.
        // JSON.stringify works for simple arguments (primitives, simple arrays),
        // but a more robust key generation strategy might be needed for complex objects.
        const key = JSON.stringify(args);
        // If the result is already in the cache, return it immediately.
        if (cache.has(key)) {
            console.log("Read from cache");
            return cache.get(key);
        }
        console.log("Running the code");
        // Otherwise, execute the original function and store the result in the cache.
        const result = fn.apply(this, args);
        cache.set(key, result);
        console.log("After", cache);
        return result;
    };
}
function fibonacci(num) {
    if (num <= 1) {
        return num;
    }
    return fibonacci(num - 1) + fibonacci(num - 2);
}
const memoized = memoize(fibonacci);
const resultOne = memoized(2);
const resultTwo = memoized(3);
const resultThree = memoized(4);
const resultFour = memoized(4);
const resultFive = memoized(4);
console.log(resultOne, resultTwo, resultThree, resultFour, resultFive);
function ContactFormV2() {
    // const [state, setState] = useState(initialState);
    const [showConfirm, setShowConfirm] = useState(false);
    const selectRef = useRef(null);
    const [isPending, startTransition] = useTransition();
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        selectRef.current?.focus();
    }, []);
    const formIsValid = useMemo(() => {
        return ["inquiry", "name", "email", "message"].every((key) => state[key].isValid);
    }, [state]);
    const handleFocus = (e) => {
        const name = e.target.name;
        dispatch({
            type: actions.TOUCH_FIELD,
            payload: {
                key: name,
            }
        });
        /* setState((prevState) => ({
             ...prevState,
             [name]: {
                 ...prevState[name],
                 isTouched: true,
             },
         }));

         */
    };
    const shouldShowError = (fieldName) => {
        const field = state[fieldName];
        if (!field.validationRules)
            return false;
        return field.isTouched && !field.isValid;
    };
    const getErrorMessage = (fieldName) => {
        const field = state[fieldName];
        const rules = field.validationRules;
        if (!rules)
            return "";
        const og = field.value ?? "";
        const value = typeof og === "string" ? og.trim() : og;
        if (rules.required && value === "") {
            if (fieldName === "inquiry")
                return "Please select a type of inquiry.";
            return "This field is required.";
        }
        if (typeof value === "string") {
            if (rules.min != null && value.length < rules.min) {
                return `Enter at least ${rules.min} characters please.`;
            }
            if (rules.max != null && value.length > rules.max) {
                return `Enter no more than ${rules.max} characters please.`;
            }
        }
        if (rules.email) {
            return "Enter a valid email address.";
        }
        return "Invalid input.";
    };
    const handleChange = (e) => {
        const name = e.target.name;
        const value = name === "attachment" ? e.target.files?.[0] ?? null : e.target.value;
        dispatch({
            type: actions.UPDATE_FIELD,
            payload: {
                key: name,
                value: value,
            }
        });
        /* setState((prevState) => {
             const field = prevState[name];
             let isValid = field.isValid;
             if (field.validationRules) {
                 isValid = validateValue(value, field.validationRules);
             }
             return {
                 ...prevState,
                 [name]: {
                     ...field,
                     value: value,
                     isValid: isValid,
                 },
             };
         });

         */
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formIsValid)
            return;
        setShowConfirm(true);
    };
    const confirmSubmit = async () => {
        const form = document.querySelector("form");
        const attachment = form?.attachment.files[0] || null;
        await fakeAPIRequest(3000);
        console.log("Form submitted values:");
        console.log(state, { attachment });
        startTransition(() => {
            // setState(initialState);
            dispatch({
                type: actions.RESET,
            });
            if (form) {
                form.attachment.value = null;
            }
            setShowConfirm(false);
        });
        //     setState(initialState);
        //     if (form) {
        //         form.attachment.value = null;
        //     }
        //     setShowConfirm(false);
        // };
    };
    return (_jsx(PageWrapper, { children: _jsxs(Container, { children: [_jsx(HeaderBox, { children: _jsx(Title, { children: "Contact Us" }) }), _jsxs(Form, { onSubmit: handleSubmit, children: [_jsxs(FormRow, { children: [_jsxs(SelectContainer, { children: [_jsxs(Label, { htmlFor: "inquiry", children: ["Inquiry Type", _jsx(SpanText, { children: "*" })] }), _jsxs(StyledSelect, { id: "inquiry", name: "inquiry", required: true, value: state.inquiry.value, onChange: handleChange, onFocus: handleFocus, ref: selectRef, "$invalid": shouldShowError("inquiry"), children: [_jsx("option", { value: "", children: "Please select" }), _jsx("option", { value: "general", children: "General Info" }), _jsx("option", { value: "support", children: "Support" }), _jsx("option", { value: "feedback", children: "Feedback" })] }), shouldShowError("inquiry") && (_jsx(ErrorText, { children: getErrorMessage("inquiry") }))] }), _jsx(Input, { label: "Name", name: "name", placeholder: "Name", required: true, value: state.name.value, onChange: handleChange, onFocus: handleFocus, isInvalid: shouldShowError("name"), errorMessage: shouldShowError("name") ? getErrorMessage("name") : "" })] }), _jsx(FormColumn, { children: _jsx(Input, { label: "Email", name: "email", type: "email", placeholder: "Email", required: true, value: state.email.value, onChange: handleChange, onFocus: handleFocus, isInvalid: shouldShowError("email"), errorMessage: shouldShowError("email") ? getErrorMessage("email") : "" }) }), _jsx(FormColumn, { children: _jsx(Input, { label: "Message", name: "message", placeholder: "Message", required: true, isTextarea: true, value: state.message.value, onChange: handleChange, onFocus: handleFocus, isInvalid: shouldShowError("message"), errorMessage: shouldShowError("message") ? getErrorMessage("message") : "" }) }), _jsxs(FormColumn, { children: [_jsx(Label, { children: "Attachments" }), _jsxs(AttachmentBox, { children: [_jsx(AttachmentText, { children: "Choose file or drag here" }), _jsx(AttachmentSubtext, { children: "Supported: JPG, JPEG, PNG, GIF, PDF" }), _jsx("label", { htmlFor: "file-upload", children: _jsx(Button, { type: "button", onClick: () => document.getElementById("file-upload").click(), children: "Browse file" }) }), _jsx(FileInput, { type: "file", id: "file-upload", name: "attachment", accept: ".jpg,.jpeg,.png,.gif,.pdf", onChange: handleChange })] })] }), _jsx(SubmitRow, { children: _jsx(Button, { type: "submit", disabled: !formIsValid, children: "Submit" }) }), _jsx(Modal, { isOpen: showConfirm, onClose: () => setShowConfirm(false), children: _jsxs(ModalContent, { children: [_jsx(ModalTitle, { children: "Confirm Submission" }), _jsx(ModalText, { children: "Are you sure that you want to submit this form?" }), _jsxs(ModalActions, { children: [_jsx(Button, { onClick: () => setShowConfirm(false), disabled: isPending, children: "No" }), _jsx(Button, { onClick: confirmSubmit, disabled: isPending, children: isPending ? "Submitting pls wait..." : "Yes" })] })] }) })] })] }) }));
}
export default ContactFormV2;
//# sourceMappingURL=ContactFormV2.js.map
//# sourceMappingURL=ContactFormV2.js.map