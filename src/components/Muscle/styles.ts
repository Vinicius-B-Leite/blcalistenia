import styled from "styled-components/native";


type Props = {
    selected: boolean
}
export const Container = styled.TouchableOpacity<Props>`
    background-color: ${({ theme, selected }) => selected ? theme.colors.contrast : theme.colors.lightBackground};
    padding: ${({ theme }) => theme.sizes.vw * 0.01}px ${({ theme }) => theme.sizes.vw / 20}px;
    margin: 0px ${({ theme }) => theme.sizes.vw / 50}px;
    border-radius: ${({ theme }) => theme.sizes.borderRadius.sm}px;
`
export const MuscleName = styled.Text<Props>`
    font-size: ${({ theme }) => theme.sizes.fontSize.vsm}px;
    color: ${({ theme, selected }) => selected ? theme.colors.text : theme.colors.darkText};
`