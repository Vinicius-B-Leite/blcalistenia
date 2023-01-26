import styled from "styled-components/native";

export const Counter = styled.Text`
    font-size: ${({theme}) => theme.sizes.fontSize.xlg}px;
    color: ${({theme}) => theme.colors.text};
    position: absolute;
    left: 40%;
    top: 45%;
`