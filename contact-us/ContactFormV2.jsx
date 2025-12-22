import React, {useMemo, useState} from "react"; //memo baiscally
// useMemo remembers a value so React doesn’t recompute it on every render.
import {createRoot} from "react-dom/client";
import "./contactStyles.css";
import {validateValue} from "./validationFunctions";
import Modal from "./ModalModule";

const initialState = {
    inquiry: {
        isTouched: false,
        validationRules: {
            required: true,
            min: 1,
            max: 20,
            email: false,
        },
        isValid: false,
        value: ""
    },
    name: {
        isTouched: false,
        validationRules: {
            required: true,
            min: 6,
            max: 20,
            email: false,
        },
        isValid: false,
        value: ""
    },
    email: {
        isTouched: false,
        validationRules: {
            required: true,
            min: 5,
            max: 50,
            email: true,
        },
        isValid: false,
        value: ""
    },
    message: {
        validationRules: {
            required: true,
            min: 10,
            max: 500,
            email: false,
        },
        isValid: false,
        isTouched: false, //todo should be for eveyr field
        value: ""
    },
    attachment: {
        value: null
    }
};

function ContactForm() {
    const [state, setState] = useState(initialState);

    const [focused, setFocused] = useState({}); //tracks which field is focused for example todo i dont need focus state at all
    //it can say {name: true, email: false}
    const [touched, setTouched] = useState({}); //tracks if user left the field at least once todo i dont need this either
//prevents showing errors immediatley while theyre still typing
    const [showConfirm, setShowConfirm] = useState(false); //controls confirm modal
//controls hwether <Modal is viisible>
    const formIsValid = useMemo(() => {
        return ["inquiry", "name", "email", "message"].every((key) => state[key].isValid);
    }, [state]); //checks if all required fields are valid
//checks if all required fields are valid. If react re-renders for anotehr reason, this avoids recaclutating it unless
    //the state actually changes
    const handleFocus = (e) => {
        const name = e.target.name;
        setState(prevState => {
            return {
                ...prevState,
                [name]: {
                    ...prevState[name],
                    isTouched: true
                }
            }
        })
        setFocused((prev) => ({...prev, [name]: true}));
    }; //marks field as focused
    //

    //todo you dont need to have seperate touched or focused its overcomplicated like that


    const shouldShowInvalidOutline = (fieldName) => {
        const field = state[fieldName];
        if (!field.validationRules)
            return false;
        // return (focused[fieldName] || touched[fieldName]) && !field.isValid; not ncessary
        return field.isTouched && !field.isValid;
    }; //red outline only on focus or after blur if invalid

    const shouldShowErrorMessage = (fieldName) => {
        const field = state[fieldName];
        if (!field.validationRules) return false;
        return touched[fieldName] && !field.isValid;
    }; //error message only after blur if invalid

    const getErrorMessage = (fieldName) => {
        const field = state[fieldName];
        const rules = field.validationRules;
        if (!rules)
            return "";

        const og = field.value ?? "";//use the left value unless it is null or undefined
        //prevents errors like trying to do a trim on null or undefined
        const value = typeof og === "string" ? og.trim() : og;

        if (rules.required) {
            const empty = value === "";
            if (empty) {
                if (fieldName === "inquiry")
                    return "Please select a type of inquiry.";
                return "This is required.";
            }
        }
        if (typeof value === "string") {
            if (rules.min != null && value.length < rules.min) {
                return `Enter at least ${rules.min} characters pleaseee`;
            }
            if (rules.max != null && value.length > rules.max) {
                return `Enter no more than ${rules.max} characters pleaseee!`;
            }
        }
        if (rules.email) {
            return "Enter a valid email address";
        }
        return "Invalid input.";
    }; //simple messages for each validation rule

    const handleChange = (e) => {
        const name = e.target.name;
        const value = name === "attachment" ? (e.target.files[0] || null) : e.target.value;
        setState((prevState) => {
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
                    isValid: isValid
                }
            };
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formIsValid) return;
        setShowConfirm(true);
    }; //opens confirm modal instead of submitting right away
    const confirmSubmit = (form) => {
        const attachment = form.attachment.files[0] || null;
        console.log("form submitted values:");
        console.log(state, {attachment});

        setState(initialState);
        setFocused({});
        setTouched({});

        form.attachment.value = null;
        setShowConfirm(false);
    }; //submits only after clicking yes

    return (
        <main className="contact-container">
            <header>
                <h1 className="contact-title">Contact Us</h1>
            </header>

            <form
                action="AboutMe.html"
                method="get"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
            >
                <section className="formRow">
                    <div className="inquiry">
                        <label htmlFor="inquiry" className="required">Inquiry Type</label>
                        <select
                            id="inquiry"
                            name="inquiry"
                            required
                            value={state.inquiry.value}
                            onChange={handleChange}
                            onFocus={handleFocus} //tracks focus
                            className={shouldShowInvalidOutline("inquiry") ? "invalid" : ""} //outline only when needed
                        >
                            <option value="">Please select</option>
                            <option value="general">General Info</option>
                            <option value="support">Support</option>
                            <option value="feedback">Feedback</option>
                        </select>
                        {shouldShowErrorMessage("inquiry") && (
                            <p className="errorText">{getErrorMessage("inquiry")}</p> //message under field
                        )}
                    </div>

                    <div className="name-field">
                        <label htmlFor="name" className="required">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Name"
                            required
                            value={state.name.value}
                            onChange={handleChange}
                            onFocus={handleFocus} //tracks focus
                            className={shouldShowInvalidOutline("name") ? "invalid" : ""} //outline only when needed
                        />
                        {shouldShowErrorMessage("name") && (
                            <p className="errorText">{getErrorMessage("name")}</p> //message under field
                        )}
                    </div>
                </section>

                <section className="formRow">
                    <div className="email-field">
                        <label htmlFor="email" className="required">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            required
                            value={state.email.value}
                            onChange={handleChange}
                            onFocus={handleFocus} //tracks focus
                            className={shouldShowInvalidOutline("email") ? "invalid" : ""} //outline only when needed
                        />
                        {shouldShowErrorMessage("email") && (
                            <p className="errorText">{getErrorMessage("email")}</p> //message under field
                        )}
                    </div>
                </section>

                <section className="formRow">
                    <div className="messageBox">
                        <label htmlFor="message" className="required">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            placeholder="Message"
                            required
                            value={state.message.value}
                            onChange={handleChange}
                            onFocus={handleFocus} //tracks focus
                            className={shouldShowInvalidOutline("message") ? "invalid" : ""} //outline only when needed
                        ></textarea>
                        {shouldShowErrorMessage("message") && (
                            <p className="errorText">{getErrorMessage("message")}</p> //message under field
                        )}
                    </div>
                </section>

                <aside className="formRow">
                    <div className="attachments-field">
                        <label>Attachments</label>
                        <div className="attachmentBox">
                            <p>Choose file or drag here</p>
                            <p id="bgAttachments">Supported: JPG, JPEG, PNG, GIF, PDF</p>

                            <label htmlFor="file-upload" className="submitButton">
                                Browse file
                            </label>

                            <input
                                type="file"
                                id="file-upload"
                                name="attachment"
                                accept=".jpg,.jpeg,.png,.gif,.pdf"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </aside>

                <footer className="formRow">
                    <button
                        type="submit"
                        className="submitButton"
                        disabled={!formIsValid} //disabled until form is valid
                    >
                        Submit
                    </button>
                </footer>

                <Modal isOpen={showConfirm} onClose={() => setShowConfirm(false)}>
                    <h2>Confirm Submission</h2>
                    <p>Are you sure that you want to submit this form?</p>

                    <div className="modalActions">
                        <button
                            type="button"
                            className="submitButton"
                            onClick={() => setShowConfirm(false)}
                        >
                            No
                        </button>

                        <button
                            type="button"
                            className="submitButton"
                            onClick={() => confirmSubmit(document.querySelector("form"))}
                            //this basically calls hte submit functiijn and the document query selector part grabs
                            //the <form> element so you can read form.attachment.files
                            //i researched that you can do useRef instead because it is a cleaner version
                        >
                            Yes
                        </button>
                    </div>
                </Modal>
            </form>
        </main>
    );
}

createRoot(document.getElementById("root")).render(
    <>
        <ContactForm/>
    </>
);