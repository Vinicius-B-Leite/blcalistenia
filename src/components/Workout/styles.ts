import styled from "styled-components/native";


export const Container = styled.TouchableOpacity`
    height: ${({ theme }) => theme.sizes.vh * 0.25}px;
    width: ${({ theme }) => theme.sizes.vw * 0.50}px;
    border-radius: ${({ theme }) => theme.sizes.borderRadius.md}px;
    background: ${({ theme }) => theme.colors.darkBackground};
    z-index: -1;
    align-items: center;
    margin: 0px ${({ theme }) => theme.sizes.vw * 0.08}px;
`

export const Banner = styled.Image`
    width: 100%;
    height: 70%;
    border-top-left-radius: ${({ theme }) => theme.sizes.borderRadius.md}px;
    border-top-right-radius: ${({ theme }) => theme.sizes.borderRadius.md}px;
`

export const TextContainer = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`

export const Text = styled.Text`
    text-align: center;
    font-size: ${({theme}) => theme.sizes.fontSize.sm}px;
    color: ${({theme}) => theme.colors.text};
`