import styled from "styled-components/native";
import { FlatList } from 'react-native'



export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.darkBackground};
    border-radius: ${({ theme }) => theme.sizes.borderRadius.md}px;
    padding: 5%;
`
export const ControllArea = styled.View`
    width: 100%;
    padding: 5% 0%;
    justify-content: center;
    align-items: center;
`
export const ControllIcon = styled.View`
    width: ${({ theme }) => theme.sizes.vw * 0.20}px;
    background-color: ${({ theme }) => theme.colors.contrast};
    height: ${({ theme }) => theme.sizes.vw * 0.01}px;
    border-radius: ${({ theme }) => theme.sizes.borderRadius.full}px;
`

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.sizes.fontSize.md}px;
    text-align: center;
`
export const Input = styled.TextInput`
    background-color: ${({ theme }) => theme.colors.background};
    width: 100%;
    padding: 2% 5%;
    font-size: ${({ theme }) => theme.sizes.fontSize.sm}px;
    color: ${({ theme }) => theme.colors.text};
    margin: 5% 0%;
    border-radius: ${({ theme }) => theme.sizes.borderRadius.sm}px;
`

export const ListTitle = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.sizes.fontSize.sm}px;
`
export const List = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    margin: 3% 0% 5% 0%;
    row-gap: ${({theme}) => theme.sizes.vw * 0.03}px;
    column-gap: ${({theme}) => theme.sizes.vw * 0.05}px;
`

export const ItemContainer = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.colors.background};
    padding: 1% 5%;
    border-radius: ${({theme})=>theme.sizes.borderRadius.full}px;
`
export const ItemName = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.sizes.fontSize.sm}px;
`

export const Butotn = styled.TouchableOpacity`
    width: 100%;
    background-color: ${({theme}) => theme.colors.contrast};
    justify-content: center;
    align-items: center;
    padding: 3% 0%;
    border-radius: ${({theme}) => theme.sizes.borderRadius.sm}px;
    margin: 4% 0%;
`
export const ButotnText = styled.Text`
    font-size: ${({theme}) => theme.sizes.fontSize.sm}px;
    color: ${({theme}) => theme.colors.text};
    font-weight: 600;
`
