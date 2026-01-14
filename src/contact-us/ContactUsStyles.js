import styled from "styled-components"

export const PageWrapper = styled.div`
    min-height: 100vh;
    background-color: #f7f7f9;
    padding: 20px;
    font-family: Arial;
`;

export const Container = styled.main`
    max-width: 800px;
    margin: 0 auto;
    padding: 24px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
`;

export const HeaderBox = styled.header`
    margin-bottom: 32px;
    text-align: center;
`;

export const Title = styled.h1`
    font-size: 32px;
    font-weight: 700;
    color: #000;
    margin: 0;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const FormRow = styled.div`
    display: flex;
    gap: 16px;
    width: 100%;
`;

export const FormColumn = styled.div`
    display: flex;
    flex-direction: column;
`;

export const SelectContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
    width: 100%;
`;

export const Label = styled.label`
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
    color: #333;
`;

export const SpanText = styled.span`
    color: red;
    margin-left: 4px;
`;

export const StyledSelect = styled.select`
    padding: 10px 12px;
    font-size: 14px;
    border-radius: 8px;
    outline: none;
    background-color: ${(props) => (props.$invalid ? "#fff5f5" : "#f9fafb")};
    border: 1px solid ${(props) => (props.$invalid ? "#dc3545" : "#ccc")};
`;

export const ErrorText = styled.p`
    color: #dc3545;
    font-size: 12px;
    margin-top: 4px;
`;

export const AttachmentBox = styled.div`
    border: 1px dashed #ccc;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    background-color: #fafafa;
    margin-top: 8px;
`;

export const AttachmentText = styled.p`
    margin: 8px 0;
    color: #666;
`;

export const AttachmentSubtext = styled.p`
    font-size: 12px;
    color: #999;
    margin: 4px 0 16px 0;
`;

export const FileInput = styled.input`
    display: none;
`;

export const SubmitRow = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
`;

export const ModalContent = styled.div`
    text-align: center;
`;

export const ModalTitle = styled.h2`
    font-size: 20px;
    font-weight: 600;
    margin: 0 0 16px 0;
    color: #333;
`;

export const ModalText = styled.p`
    color: #666;
    margin-bottom: 24px;
    line-height: 1.5;
`;

export const ModalActions = styled.div`
    display: flex;
    gap: 12px;
    justify-content: center;
`;