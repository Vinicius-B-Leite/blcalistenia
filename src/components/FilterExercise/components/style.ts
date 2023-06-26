import styled from "styled-components/native"



type Props = { selected: boolean }

export const ItemContainer = styled.TouchableOpacity<Props>`
    background-color: ${({ theme, selected }) => selected ? theme.colors.contrast : theme.colors.darkBackground};
    margin: 2%;
    padding: 1.5% 4%;
    border-radius: ${({ theme }) => theme.sizes.borderRadius.full}px;
`

export const ItemLabel = styled.Text`
    color: ${({ theme }) => theme.colors.text};
`
