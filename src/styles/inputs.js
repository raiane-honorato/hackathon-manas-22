import styled from "styled-components";

export const Input = styled.input`
    background: ${ ( {theme} ) => theme.colors.secondPink};
    border-radius: 8px;
    color: white;
    padding: 16px;
    font-size: 16px;
    border: none;
    
    ::placeholder {
        color: white;
        font-size: 16px;
        opacity: 0.64;
    }
    
    :hover {
        filter: brightness(80%);
;
    }
    :focus {
        filter: brightness(80%);
            }
`
export const TextArea = styled.textarea`
    background: rgba(255, 255, 255, 0.16);
    border-radius: 8px;
    color: white;
    padding: 16px;
    font-size: 16px;
    border: none;
    resize: none;
    
    ::placeholder {
        color: white;
        font-size: 16px;
        opacity: 0.64;
    }
    :hover {
        background: rgba(255, 255, 255, 0.24);
    }
    :focus {
                outline: none !important;
            }
`

export const Select = styled.select`
    background-color: rgba(255, 255, 255, 0.16);
    border-radius: 8px;
    color: white;
    padding: 16px;
    font-size: 16px;
    border: none;
    ::placeholder {
        color: white;
        font-size: 16px;
        opacity: 0.64;
    }
    :focus {
                outline: none !important;
            }
    :hover {
        background: rgba(255, 255, 255, 0.24);
    }
    option {
        background-color: ${({ theme }) => theme.colors.primary};
    }
`