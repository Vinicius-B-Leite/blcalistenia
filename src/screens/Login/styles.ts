import styled from "styled-components/native";



export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
    justify-content: center;
    align-items: center;
`

export const ImageBG = styled.Image`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`

export const Logo = styled.Image`
    width: 30%;
    height: 20%;
    margin-bottom: 10%;
`

type Props = {
    bgTransparent: boolean
}
export const Button = styled.TouchableOpacity<Props>`
    background-color: ${({ theme, bgTransparent }) => bgTransparent ? 'transparent' : theme.colors.contrast};
    justify-content: center;
    align-items: center;
    width: 60%;
    height: 7%;
    border-radius: ${({theme}) => theme.sizes.borderRadius.sm}px;
    border: 1px;
    border-color: ${({theme}) => theme.colors.contrast};
    margin-bottom: 5%;
`
export const ButtonText = styled.Text<Props>`
    color: ${({ theme, bgTransparent }) => bgTransparent ? theme.colors.contrast : theme.colors.text};
    font-size: ${({theme}) => theme.sizes.fontSize.sm}px;
    font-weight: bold;
`