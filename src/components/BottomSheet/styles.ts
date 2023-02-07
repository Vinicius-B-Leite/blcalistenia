import styled from "styled-components/native";



export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.darkBackground};
    border-radius: ${({ theme }) => theme.sizes.borderRadius.md}px;
    padding: 5%;
`
export const ControllArea = styled.View`
    width: 100%;
    padding: 5% 0%;
    justify-content: center;
    align-items: center;
`
export const ControllIcon = styled.View`
    width: ${({ theme }) => theme.sizes.vw * 0.20}px;
    background-color: ${({ theme }) => theme.colors.contrast};
    height: ${({ theme }) => theme.sizes.vw * 0.01}px;
    border-radius: ${({ theme }) => theme.sizes.borderRadius.full}px;
`