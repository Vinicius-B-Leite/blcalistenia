import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1
    background-color: ${({ theme }) => theme.colors.darkBackgroundOpacity};
    justify-content: center;
`
export const CloseModal = styled.TouchableOpacity`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`
export const Main = styled.View`
    background-color: ${({ theme }) => theme.colors.background};
    margin: 0% 5%;
    padding: 5%;
    border-radius: ${({ theme }) => theme.sizes.borderRadius.sm}px;
`

type Props = { selected: boolean }

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.sizes.fontSize.md}px;
    font-weight: 600;
    margin: 3% 0%;
`

export const FilterTitle = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.sizes.fontSize.sm}px;
    margin-top: 5%;
`

export const ItemContainer = styled.TouchableOpacity<Props>`
    background-color: ${({ theme, selected }) => selected ? theme.colors.contrast : theme.colors.darkBackground};
    margin: 2%;
    padding: 1.5% 4%;
    border-radius: ${({ theme }) => theme.sizes.borderRadius.full}px;
`

export const ItemLabel = styled.Text`
    color: ${({ theme }) => theme.colors.text};
`

export const ApplyFilter = styled.TouchableOpacity`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.contrast};
    justify-content: center;
    align-items: center;
    border-radius: ${({ theme }) => theme.sizes.borderRadius.sm}px;
    padding: 2%;
    margin-top: 5%;
`

export const ApplyText = styled.Text`
    font-size: ${({ theme }) => theme.sizes.fontSize.md}px;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
`