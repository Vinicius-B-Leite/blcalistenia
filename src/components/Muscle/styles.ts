import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
    background-color: ${({theme}) => theme.colors.lightBackground};
    padding: ${({theme}) => theme.sizes.vw * 0.01}px ${({theme}) => theme.sizes.vw / 20}px;
    margin: 0px ${({theme}) => theme.sizes.vw / 50}px;
    border-radius: ${({theme}) => theme.sizes.borderRadius.sm}px;
`
export const MuscleName = styled.Text`
    font-size: ${({theme}) => theme.sizes.fontSize.vsm}px;
    color: ${({theme}) => theme.colors.darkText};
`