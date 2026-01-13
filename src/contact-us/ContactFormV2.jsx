import React, {useMemo, useState, useRef, useEffect, useTransition} from "react";
import styled from "styled-components";
import {validateValue} from "./validationFunctions";
import Modal from "../components/ModalModule";
import Button from "../components/Button";
import Input from "../components/Input";
import {fakeAPIRequest} from "./FakeAPIRequest.js";

const PageWrapper = styled.div`
    min-height: 100vh;
    background-color: #f7f7f9;
    padding: 20px;
    font-family: Arial;
`;

const Container = styled.main`
    max-width: 800px;
    margin: 0 auto;
    padding: 24px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
`;

const HeaderBox = styled.header`
    margin-bottom: 32px;
    text-align: center;
`;

const Title = styled.h1`
    font-size: 32px;
    font-weight: 700;
    color: #000;
    margin: 0;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const FormRow = styled.div`
    display: flex;
    gap: 16px;
    width: 100%;
`;

const FormColumn = styled.div`
    display: flex;
    flex-direction: column;
`;

const SelectContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
    width: 100%;
`;

const Label = styled.label`
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
    color: #333;
`;

const SpanText = styled.span`
    color: red;
    margin-left: 4px;
`;

const StyledSelect = styled.select`
    padding: 10px 12px;
    font-size: 14px;
    border-radius: 8px;
    outline: none;
    background-color: ${(props) => (props.$invalid ? "#fff5f5" : "#f9fafb")};
    border: 1px solid ${(props) => (props.$invalid ? "#dc3545" : "#ccc")};
`;

const ErrorText = styled.p`
    color: #dc3545;
    font-size: 12px;
    margin-top: 4px;
`;

const AttachmentBox = styled.div`
    border: 1px dashed #ccc;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    background-color: #fafafa;
    margin-top: 8px;
`;

const AttachmentText = styled.p`
    margin: 8px 0;
    color: #666;
`;

const AttachmentSubtext = styled.p`
    font-size: 12px;
    color: #999;
    margin: 4px 0 16px 0;
`;

const FileInput = styled.input`
    display: none;
`;

const SubmitRow = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
`;

const ModalContent = styled.div`
    text-align: center;
`;

const ModalTitle = styled.h2`
    font-size: 20px;
    font-weight: 600;
    margin: 0 0 16px 0;
    color: #333;
`;

const ModalText = styled.p`
    color: #666;
    margin-bottom: 24px;
    line-height: 1.5;
`;

const ModalActions = styled.div`
    display: flex;
    gap: 12px;
    justify-content: center;
`;

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
    const selectRef = useRef(null);
    const [isPending, startTransition] = useTransition(); //todo wrap the confirm submit with this

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
        const value =
            name === "attachment" ? e.target.files?.[0] ?? null : e.target.value;

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
    const confirmSubmit = async () => {
        const form = document.querySelector("form");
        const attachment = form?.attachment.files[0] || null;
        await fakeAPIRequest(3000);
        console.log("Form submitted values:");
        console.log(state, {attachment});

        startTransition(() => {
            setState(initialState);
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