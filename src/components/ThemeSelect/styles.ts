import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.darkBackgroundOpacity};
    z-index: -1;
    justify-content: center;
    align-items: center;
`
export const Close = styled.TouchableOpacity`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`
export const Main = styled.View`
    width: 60%;
    height: 30%;
    padding: 5% 0;
    background-color: ${({ theme }) => theme.colors.background};
    opacity: 1;
    z-index: 2;
    border-radius: ${({ theme }) => theme.sizes.borderRadius.sm}px;
    justify-content: center;
`

export const OptionContainer = styled.TouchableOpacity`
    width: 80%;
    align-self: center;
    flex-direction: row;
    height: 20%;
    align-items: center;
    z-index: 10;
    margin: 5% 0;
`

type Props = { selected: boolean }
export const OptionCircleBorder = styled.View<Props>`
    width: 20%;
    height: 100%;
    border-radius: ${({ theme }) => theme.sizes.borderRadius.full}px;
    border-width: 2px;
    border-color: ${({ theme, selected }) => selected ? theme.colors.contrast : theme.colors.text};
    justify-content: center;
    align-items: center;
    padding: 2%;
`
export const OptionCircle = styled.View<Props>`
    width: 90%;
    height: 90%;
    background-color: red;
    border-radius: ${({ theme }) => theme.sizes.borderRadius.full}px;
    background-color: ${({ theme, selected }) => selected ? theme.colors.contrast : theme.colors.text};
`
export const OptionName = styled.Text<Props>`
    color: ${({ theme, selected }) => selected ? theme.colors.contrast : theme.colors.text};
    font-size: ${({ theme }) => theme.sizes.fontSize.md}px;
    font-weight: 600;
    margin-left: 5%;
`