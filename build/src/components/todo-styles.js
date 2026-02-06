import styled from "styled-components";
export const Page = styled.div `
  font-family:sans-serif;
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1rem;
  background: ${(p) => (p.$theme === "dark" ? "#0b1220" : "#f5f7fa")};
  color: ${(p) => (p.$theme === "dark" ? "#e5e7eb" : "#0f172a")};
`;
export const Title = styled.h1 `
    text-align: center;
    margin-bottom: 1.5rem;
    font-weight: 600;
`;
export const AddRow = styled.div `
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;
export const Input = styled.input `
  flex: 1;
  min-width: 220px;
  padding: 0.6rem 0.8rem;
  border-radius: 8px;
  border: 1px solid ${(p) => (p.$theme === "dark" ? "#1f2937" : "#cbd5e1")};
  background: ${(p) => (p.$theme === "dark" ? "#0f172a" : "white")};
  color: ${(p) => (p.$theme === "dark" ? "#e5e7eb" : "#0f172a")};

  &:focus {
    border-color: ${(p) => (p.$theme === "dark" ? "#60a5fa" : "#64748b")};
    background-color: ${(p) => (p.$theme === "dark" ? "#111827" : "#f0f2f5")};
    outline: none;
  }
`;
export const Button = styled.button `
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: none;
  background: ${(p) => (p.$variant === "danger" ? "#ef4444" : "#3b82f6")};
  color: white;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: ${(p) => (p.$variant === "danger" ? "#dc2626" : "#2563eb")};
  }
`;
export const Columns = styled.div `
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;
export const Column = styled.div `
  flex: 1;
  min-width: 280px;
  border-radius: 10px;
  min-height: 300px;
  padding: 0.75rem;
  background: ${(p) => (p.$theme === "dark" ? "#0f172a" : "white")};
  border: 1px solid ${(p) => (p.$theme === "dark" ? "#1f2937" : "#e2e8f0")};
`;
export const ColumnTitle = styled.h2 `
  text-align: center;
  margin-top: 0;
  margin-bottom: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
`;
export const TodoItem = styled.div `
  border-radius: 8px;
  padding: 0.55rem 0.6rem;
  margin-bottom: 0.5rem;
  background: ${(p) => (p.$theme === "dark" ? "#111827" : "#f8fafc")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${(p) => (p.$theme === "dark" ? "#1f2937" : "#dbe2ea")};
`;
export const TodoTitle = styled.span `
  flex: 1;
  margin-right: 0.5rem;
  font-size: 0.95rem;
`;
export const TodoActions = styled.div `
  display: flex;
  gap: 0.4rem;
`;
export const SmallBtn = styled.button `
  border: none;
  border-radius: 6px;
  padding: 0.25rem 0.6rem;
  font-size: 0.78rem;
  cursor: pointer;
`;
export const CompleteBtn = styled(SmallBtn) `
  background: #dcfce7;
  color: #166534;
`;
export const DeleteBtn = styled(SmallBtn) `
  background: #fee2e2;
  color: #b91c1c;
`;
export const SectionTitle = styled.h2 `
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
`;
export const UsersWrap = styled.div `
  background: ${(p) => (p.$theme === "dark" ? "#0f172a" : "white")};
  border: 1px solid ${(p) => (p.$theme === "dark" ? "#1f2937" : "#e2e8f0")};
  border-radius: 10px;
  padding: 0.75rem;
`;
export const UserRow = styled.div `
  padding: 0.5rem 0.25rem;
  border-bottom: 1px solid ${(p) => (p.$theme === "dark" ? "#1f2937" : "#eef2f7")}; 
    // todo why isnt it recognized
`;
export const Muted = styled.p `
  margin: 0.5rem 0 0;
  color: ${(p) => (p.$theme === "dark" ? "#94a3b8" : "#475569")}; 
    //todo why istn it working
  font-size: 0.9rem;
`;
//# sourceMappingURL=todo-styles.js.map
//# sourceMappingURL=todo-styles.js.map