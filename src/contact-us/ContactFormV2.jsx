import React, {useMemo, useState} from "react";
import {validateValue} from "./validationFunctions";
import Modal from "./ModalModule";
import Button from "./Button";
import Input from "./Input";

function GlobalStyles() {
    return (
        <style>
            {`
        body {
          font-family: Arial, sans-serif;
          background-color: #f7f7f9;
          margin: 0;
          padding: 20px;
        }
      `}
        </style>
    );
}

const containerStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "24px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#fff",
    borderRadius: "15px",
    boxShadow: "0 5px 20px rgba(0, 0, 0, 0.1)",
};

const headerStyle = {
    marginBottom: "32px",
    textAlign: "center",
};

const titleStyle = {
    fontSize: "32px",
    fontWeight: "700",
    color: "#000",
    margin: 0,
};

const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
};

const formRowStyle = {
    display: "flex",
    gap: "16px",
    width: "100%",
};

const formRowSingleStyle = {
    display: "flex",
    flexDirection: "column",
};

const selectContainerStyle = {
    display: "flex",
    flexDirection: "column",
    marginBottom: "16px",
    width: "100%",
};

const labelStyle = {
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
};

const requiredSpanStyle = {
    color: "red",
    marginLeft: "4px",
};

const selectBaseStyle = {
    padding: "10px 12px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    outline: "none",
    backgroundColor: "#f9fafb",
};

const selectInvalidStyle = {
    borderColor: "#dc3545",
    backgroundColor: "#fff5f5",
};

const errorTextStyle = {
    color: "#dc3545",
    fontSize: "12px",
    marginTop: "4px",
};

const attachmentBoxStyle = {
    border: "1px dashed #ccc",
    borderRadius: "8px",
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#fafafa",
    marginTop: "8px",
};

const attachmentTextStyle = {
    margin: "8px 0",
    color: "#666",
};

const attachmentSubtextStyle = {
    fontSize: "12px",
    color: "#999",
    margin: "4px 0 16px 0",
};

const fileInputStyle = {
    display: "none",
};

const modalContentStyle = {
    textAlign: "center",
};

const modalTitleStyle = {
    fontSize: "20px",
    fontWeight: "600",
    margin: "0 0 16px 0",
    color: "#333",
};

const modalTextStyle = {
    color: "#666",
    marginBottom: "24px",
    lineHeight: 1.5,
};

const modalActionsStyle = {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
};

const submitRowStyle = {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "16px",
};

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
        value: "",
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
        value: "",
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
        value: "",
    },
    message: {
        validationRules: {
            required: true,
            min: 10,
            max: 500,
            email: false,
        },
        isValid: false,
        isTouched: false,
        value: "",
    },
    attachment: {
        value: null,
    },
};

function ContactFormV2() {
    const [state, setState] = useState(initialState);
    const [showConfirm, setShowConfirm] = useState(false);

    const formIsValid = useMemo(() => {
        return ["inquiry", "name", "email", "message"].every((key) => state[key].isValid);
    }, [state]);

    const handleFocus = (e) => {
        const name = e.target.name;
        setState((prevState) => ({
            ...prevState,
            [name]: {
                ...prevState[name],
                isTouched: true,
            },
        }));
    };

    const shouldShowError = (fieldName) => {
        const field = state[fieldName];
        if (!field.validationRules) return false;
        return field.isTouched && !field.isValid;
    };

    const getErrorMessage = (fieldName) => {
        const field = state[fieldName];
        const rules = field.validationRules;
        if (!rules) return "";

        const og = field.value ?? "";
        const value = typeof og === "string" ? og.trim() : og;

        if (rules.required && value === "") {
            if (fieldName === "inquiry") return "Please select a type of inquiry.";
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
                    isValid: isValid,
                },
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formIsValid) return;
        setShowConfirm(true);
    };

    const confirmSubmit = () => {
        const form = document.querySelector("form");
        const attachment = form?.attachment.files[0] || null;
        console.log("Form submitted values:");
        console.log(state, {attachment});

        setState(initialState);
        if (form) {
            form.attachment.value = null;
        }
        setShowConfirm(false);
    };

    return (
        <>
            <GlobalStyles/>
            <main style={containerStyle}>
                <header style={headerStyle}>
                    <h1 style={titleStyle}>Contact Us</h1>
                </header>

                <form
                    style={formStyle}
                    action="AboutMe.html"
                    method="get"
                    encType="multipart/form-data"
                    onSubmit={handleSubmit}
                >
                    <div style={formRowStyle}>
                        <div style={selectContainerStyle}>
                            <label htmlFor="inquiry" style={labelStyle}>
                                Inquiry Type
                                <span style={requiredSpanStyle}>*</span>
                            </label>
                            <select
                                id="inquiry"
                                name="inquiry"
                                required
                                value={state.inquiry.value}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                style={{
                                    ...selectBaseStyle,
                                    ...(shouldShowError("inquiry") ? selectInvalidStyle : {}),
                                }}
                            >
                                <option value="">Please select</option>
                                <option value="general">General Info</option>
                                <option value="support">Support</option>
                                <option value="feedback">Feedback</option>
                            </select>
                            {shouldShowError("inquiry") && (
                                <p style={errorTextStyle}>{getErrorMessage("inquiry")}</p>
                            )}
                        </div>

                        <Input
                            label="Name"
                            name="name"
                            placeholder="Name"
                            required
                            value={state.name.value}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            isInvalid={shouldShowError("name")}
                            errorMessage={shouldShowError("name") ? getErrorMessage("name") : ""}
                        />
                    </div>

                    <div style={formRowSingleStyle}>
                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            required
                            value={state.email.value}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            isInvalid={shouldShowError("email")}
                            errorMessage={shouldShowError("email") ? getErrorMessage("email") : ""}
                        />
                    </div>

                    <div style={formRowSingleStyle}>
                        <Input
                            label="Message"
                            name="message"
                            placeholder="Message"
                            required
                            isTextarea
                            value={state.message.value}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            isInvalid={shouldShowError("message")}
                            errorMessage={shouldShowError("message") ? getErrorMessage("message") : ""}
                        />
                    </div>

                    <div style={formRowSingleStyle}>
                        <label style={labelStyle}>Attachments</label>
                        <div style={attachmentBoxStyle}>
                            <p style={attachmentTextStyle}>Choose file or drag here</p>
                            <p style={attachmentSubtextStyle}>
                                Supported: JPG, JPEG, PNG, GIF, PDF
                            </p>

                            <label htmlFor="file-upload">
                                <Button
                                    type="button"
                                    onClick={() => document.getElementById("file-upload").click()}
                                >
                                    Browse file
                                </Button>
                            </label>

                            <input
                                type="file"
                                id="file-upload"
                                name="attachment"
                                accept=".jpg,.jpeg,.png,.gif,.pdf"
                                onChange={handleChange}
                                style={fileInputStyle}
                            />
                        </div>
                    </div>

                    <div style={submitRowStyle}>
                        <Button type="submit" disabled={!formIsValid}>
                            Submit
                        </Button>
                    </div>

                    <Modal isOpen={showConfirm} onClose={() => setShowConfirm(false)}>
                        <div style={modalContentStyle}>
                            <h2 style={modalTitleStyle}>Confirm Submission</h2>
                            <p style={modalTextStyle}>
                                Are you sure that you want to submit this form?
                            </p>

                            <div style={modalActionsStyle}>
                                <Button onClick={() => setShowConfirm(false)}>No</Button>
                                <Button onClick={confirmSubmit}>Yes</Button>
                            </div>
                        </div>
                    </Modal>
                </form>
            </main>
        </>
    );
}

export default ContactFormV2;