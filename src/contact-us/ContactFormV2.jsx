import React, {useMemo, useState, useRef, useEffect, useTransition, useReducer} from "react";
import Modal from "../components/ModalModule";
import Button from "../components/Button";
import Input from "../components/Input";
import {fakeAPIRequest} from "./FakeAPIRequest.js";
import {initialState, reducer, actions} from "./FormState.js";
import {
    PageWrapper,
    Container,
    ModalActions,
    Form,
    FormRow,
    FormColumn,
    Label,
    AttachmentBox,
    AttachmentSubtext,
    AttachmentText,
    ModalText,
    ErrorText,
    SpanText,
    HeaderBox,
    ModalContent,
    ModalTitle,
    SubmitRow,
    SelectContainer,
    StyledSelect,
    Title,
    FileInput
} from "./ContactUsStyles";

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
        return ["inquiry", "name", "email", "message"].every(
            (key) => state[key].isValid
        );
    }, [state]);

    const handleFocus = (e) => {
        const name = e.target.name;
        dispatch({
            type: actions.TOUCH_FIELD,
            payload: {
                key: name,
            }
        })
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
        const value =
            name === "attachment" ? e.target.files?.[0] ?? null : e.target.value;

        dispatch({
            type: actions.UPDATE_FIELD,
            payload: {
                key: name,
                value: value,
            }
        })
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
        if (!formIsValid) return;
        setShowConfirm(true);
    };
    const confirmSubmit = async () => {
        const form = document.querySelector("form");
        const attachment = form?.attachment.files[0] || null;
        await fakeAPIRequest(3000);
        console.log("Form submitted values:");
        console.log(state, {attachment});

        startTransition(() => {
            // setState(initialState);
            dispatch({
                type: actions.RESET,
            })
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
    return (
        <PageWrapper>
            <Container>
                <HeaderBox>
                    <Title>Contact Us</Title>
                </HeaderBox>

                <Form onSubmit={handleSubmit}>
                    <FormRow>
                        <SelectContainer>
                            <Label htmlFor="inquiry">
                                Inquiry Type
                                <SpanText>*</SpanText>
                            </Label>
                            <StyledSelect
                                id="inquiry"
                                name="inquiry"
                                required
                                value={state.inquiry.value}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                ref={selectRef}
                                $invalid={shouldShowError("inquiry")}
                            >
                                <option value="">Please select</option>
                                <option value="general">General Info</option>
                                <option value="support">Support</option>
                                <option value="feedback">Feedback</option>
                            </StyledSelect>
                            {shouldShowError("inquiry") && (
                                <ErrorText>{getErrorMessage("inquiry")}</ErrorText>
                            )}
                        </SelectContainer>

                        <Input
                            label="Name"
                            name="name"
                            placeholder="Name"
                            required
                            value={state.name.value}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            isInvalid={shouldShowError("name")}
                            errorMessage={
                                shouldShowError("name") ? getErrorMessage("name") : ""
                            }
                        />
                    </FormRow>

                    <FormColumn>
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
                            errorMessage={
                                shouldShowError("email") ? getErrorMessage("email") : ""
                            }
                        />
                    </FormColumn>
                    <FormColumn>
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
                            errorMessage={
                                shouldShowError("message") ? getErrorMessage("message") : ""
                            }
                        />
                    </FormColumn>

                    <FormColumn>
                        <Label>Attachments</Label>
                        <AttachmentBox>
                            <AttachmentText>Choose file or drag here</AttachmentText>
                            <AttachmentSubtext>
                                Supported: JPG, JPEG, PNG, GIF, PDF
                            </AttachmentSubtext>

                            <label htmlFor="file-upload">
                                <Button
                                    type="button"
                                    onClick={() =>
                                        document.getElementById("file-upload").click()
                                    }
                                >
                                    Browse file
                                </Button>
                            </label>

                            <FileInput
                                type="file"
                                id="file-upload"
                                name="attachment"
                                accept=".jpg,.jpeg,.png,.gif,.pdf"
                                onChange={handleChange}
                            />
                        </AttachmentBox>
                    </FormColumn>

                    <SubmitRow>
                        <Button type="submit" disabled={!formIsValid}>
                            Submit
                        </Button>
                    </SubmitRow>

                    <Modal isOpen={showConfirm} onClose={() => setShowConfirm(false)}>
                        <ModalContent>
                            <ModalTitle>Confirm Submission</ModalTitle>
                            <ModalText>
                                Are you sure that you want to submit this form?
                            </ModalText>

                            <ModalActions>
                                {/*<Button onClick={() => setShowConfirm(false)}>No</Button>*/}
                                {/*<Button onClick={confirmSubmit}>Yes</Button>*/}
                                <Button onClick={() => setShowConfirm(false)} disabled={isPending}>No</Button>
                                <Button onClick={confirmSubmit}
                                        disabled={isPending}>{isPending ? "Submitting pls wait..." : "Yes"}</Button>
                            </ModalActions>
                        </ModalContent>
                    </Modal>
                </Form>
            </Container>
        </PageWrapper>
    );
}

export default ContactFormV2;