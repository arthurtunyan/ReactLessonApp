import React, {useMemo, useState, useRef, useEffect, useTransition, useReducer} from "react";
import {
    Box,
    Paper,
    Typography,
    TextField,
    MenuItem,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";

import {fakeAPIRequest} from "./FakeAPIRequest";
import {initialState, reducer, actions} from "./FormState";

type FormKey = "inquiry" | "name" | "email" | "message" | "attachment";

function memoize<T extends (...args: any[]) => any>(fn: T) {
    const cache = new Map<string, ReturnType<T>>();

    return function (this: unknown, ...args: Parameters<T>): ReturnType<T> {
        const key = JSON.stringify(args);
        if (cache.has(key)) return cache.get(key)!;
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

function fibonacci(num: number): number {
    if (num <= 1) return num;
    return fibonacci(num - 1) + fibonacci(num - 2);
}

const memoized = memoize(fibonacci);
memoized(2);
memoized(3);
memoized(4);
memoized(4);

function ContactFormV2() {
    const [showConfirm, setShowConfirm] = useState(false);

    const inquiryInputRef = useRef<HTMLInputElement | null>(null);

    const [isPending, startTransition] = useTransition();
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        inquiryInputRef.current?.focus();
    }, []);

    const formIsValid = useMemo(() => {
        const keys: FormKey[] = ["inquiry", "name", "email", "message"];
        return keys.every((key) => state[key].isValid);
    }, [state]);

    const touchField = (key: FormKey) => {
        dispatch({
            type: actions.TOUCH_FIELD,
            payload: {key},
        });
    };

    const shouldShowError = (fieldName: FormKey) => {
        const field = state[fieldName];
        if (!field.validationRules)
            return false;
        return !!field.isTouched && !field.isValid;
    };

    const getErrorMessage = (fieldName: FormKey) => {
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name as FormKey;

        const value =
            name === "attachment" ? ((e.target as HTMLInputElement).files?.[0] ?? null) : e.target.value;

        dispatch({
            type: actions.UPDATE_FIELD,
            payload: {key: name, value},
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formIsValid) return;
        setShowConfirm(true);
    };

    const confirmSubmit = async () => {
        const form = document.querySelector("form") as HTMLFormElement | null;
        const attachmentInput = form?.elements.namedItem("attachment") as HTMLInputElement | null;

        await fakeAPIRequest(3000);

        startTransition(() => {
            dispatch({type: actions.RESET});
            if (attachmentInput) attachmentInput.value = "";
            setShowConfirm(false);
        });
    };

    return (
        <Box sx={{minHeight: "100vh", bgcolor: "#f7f7f9", p: 2.5, fontFamily: "Arial"}}>
            <Paper
                component="main"
                sx={{
                    maxWidth: 800,
                    mx: "auto",
                    p: 3,
                    bgcolor: "#fff",
                    borderRadius: 2,
                    boxShadow: "0 5px 20px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Box component="header" sx={{mb: 4, textAlign: "center"}}>
                    <Typography sx={{fontSize: 32, fontWeight: 700, color: "#000", m: 0}}>
                        Contact Us
                    </Typography>
                </Box>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{display: "flex", flexDirection: "column", gap: 3}}
                >
                    <Box sx={{display: "flex", gap: 2, width: "100%", flexWrap: "wrap"}}>
                        <TextField
                            select
                            slotProps={{
                                select: {
                                    inputRef: inquiryInputRef,
                                }
                            }}
                            label="Inquiry Type"
                            name="inquiry"
                            value={state.inquiry.value}
                            onChange={handleChange}
                            onFocus={() => touchField("inquiry")}
                            required
                            fullWidth
                            error={shouldShowError("inquiry")}
                            helperText={shouldShowError("inquiry") ? getErrorMessage("inquiry") : " "}
                        >
                            <MenuItem value="">Please select</MenuItem>
                            <MenuItem value="general">General Info</MenuItem>
                            <MenuItem value="support">Support</MenuItem>
                            <MenuItem value="feedback">Feedback</MenuItem>
                        </TextField>

                        <TextField
                            label="Name"
                            name="name"
                            placeholder="Name"
                            required
                            fullWidth
                            value={state.name.value}
                            onChange={handleChange}
                            onFocus={() => touchField("name")}
                            error={shouldShowError("name")}
                            helperText={shouldShowError("name") ? getErrorMessage("name") : " "}
                        />
                    </Box>

                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        required
                        fullWidth
                        value={state.email.value}
                        onChange={handleChange}
                        onFocus={() => touchField("email")}
                        error={shouldShowError("email")}
                        helperText={shouldShowError("email") ? getErrorMessage("email") : " "}
                    />

                    <TextField
                        label="Message"
                        name="message"
                        placeholder="Message"
                        required
                        multiline
                        minRows={4}
                        fullWidth
                        value={state.message.value}
                        onChange={handleChange}
                        onFocus={() => touchField("message")}
                        error={shouldShowError("message")}
                        helperText={shouldShowError("message") ? getErrorMessage("message") : " "}
                    />

                    <Box>
                        <Typography sx={{mb: 1, fontSize: 14, fontWeight: 500, color: "#333"}}>
                            Attachments
                        </Typography>

                        <Box
                            sx={{
                                border: "1px dashed #ccc",
                                borderRadius: 1,
                                p: 2.5,
                                textAlign: "center",
                                bgcolor: "#fafafa",
                                mt: 1,
                            }}
                        >
                            <Typography sx={{my: 1, color: "#666"}}>Choose file or drag here</Typography>
                            <Typography sx={{fontSize: 12, color: "#999", mb: 2}}>
                                Supported: JPG, JPEG, PNG, GIF, PDF
                            </Typography>

                            <Button type="button" onClick={() => document.getElementById("file-upload")?.click()}>
                                Browse file
                            </Button>

                            <input
                                type="file"
                                id="file-upload"
                                name="attachment"
                                accept=".jpg,.jpeg,.png,.gif,.pdf"
                                onChange={handleChange}
                                style={{display: "none"}}
                            />
                        </Box>
                    </Box>

                    <Box sx={{display: "flex", justifyContent: "flex-end", mt: 2}}>
                        <Button type="submit" variant="contained" disabled={!formIsValid}>
                            Submit
                        </Button>
                    </Box>

                    <Dialog open={showConfirm} onClose={() => setShowConfirm(false)}>
                        <DialogTitle sx={{textAlign: "center"}}>Confirm Submission</DialogTitle>
                        <DialogContent>
                            <Typography sx={{color: "#666", mb: 2, textAlign: "center"}}>
                                Are you sure that you want to submit this form?
                            </Typography>
                        </DialogContent>
                        <DialogActions sx={{justifyContent: "center", gap: 1.5, pb: 2}}>
                            <Button onClick={() => setShowConfirm(false)} disabled={isPending}>
                                No
                            </Button>
                            <Button onClick={confirmSubmit} disabled={isPending}>
                                {isPending ? "Submitting pls wait..." : "Yes"}
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </Paper>
        </Box>
    );
}

export default ContactFormV2;