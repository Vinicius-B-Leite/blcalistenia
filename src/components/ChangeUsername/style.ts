import styled from "styled-components/native";

export const Container = styled.View`
    height: ${({ theme }) => theme.sizes.vh * 0.40}px;
    width: 100%;
    position: absolute;
    bottom: 0;
    border-top-left-radius: ${({ theme }) => theme.sizes.borderRadius.md}px;
    border-top-right-radius: ${({ theme }) => theme.sizes.borderRadius.md}px;
    background-color: ${({ theme }) => theme.colors.darkBackground};
    padding: 5%;
`

export const CloseModal = styled.TouchableOpacity`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-color: ${({ theme }) => theme.colors.background};
    opacity: 0.7;
`

export const Title = styled.Text`
    text-align: center;
    font-size: ${({ theme }) => theme.sizes.fontSize.md}px;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
`

export const Input = styled.TextInput`
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: ${({ theme }) => theme.sizes.borderRadius.sm}px;
    padding: 2% 5%;
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.sizes.fontSize.sm}px;
    margin-top: 4%;
`

export const Submit = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 2%;
    margin-top: 20%;
    border-radius: ${({ theme }) => theme.sizes.borderRadius.sm}px;
    background-color: ${({ theme }) => theme.colors.contrast};
`

export const Label = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.sizes.fontSize.md}px;
    font-weight: 600;
`