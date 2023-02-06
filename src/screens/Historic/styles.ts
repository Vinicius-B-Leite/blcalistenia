import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    background-color: ${({theme}) => theme.colors.background};
    flex: 1;
`
export const Header = styled.View`
    width: 100%;
    padding: 5%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
export const Title = styled.Text`
    font-size: ${({theme}) => theme.sizes.fontSize.lg}px;
    color: ${({theme}) => theme.colors.contrast};
    font-weight: 700;
`
export const FilterButton =  styled.TouchableOpacity`
    width: 15%;
    height: 100%;
    flex-direction: row;
    border-radius: ${({theme}) =>theme.sizes.borderRadius.full}px;
    justify-content: center;
    align-items: center;
`
export const FilterText =  styled.Text`
    font-size: ${({theme}) => theme.sizes.fontSize.sm}px;
    color: ${({theme}) => theme.colors.text};
`