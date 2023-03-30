import styled from "styled-components/native";

export const Counter = styled.Text`
    font-size: ${({theme}) => theme.sizes.fontSize.xlg}px;
    color: ${({theme}) => theme.colors.text};
    position: absolute;
    left: 40%;
    top: 45%;
`
export const TotalTimes = styled(Counter)`
    font-size: ${({theme}) => theme.sizes.fontSize.sm}px;
    left: 46%;
    top: 55%;
`