import styled from "styled-components/native";
import FastImage from 'react-native-fast-image'


export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`
export const Header = styled.TouchableOpacity`
    width: 100%;
    padding: 5%;
`
export const Title = styled.Text`
    font-size: ${({ theme }) => theme.sizes.fontSize.md}px;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 700;
`
export const ButtonChangeImage = styled.TouchableOpacity`
    width: 50%;
    height: 30%;
    align-self: center;
    `
export const Avatar = styled(FastImage)`
    flex: 1;
    border-radius: ${({ theme }) => theme.sizes.borderRadius.full}px;
`
export const Username = styled.Text`
    font-size: ${({ theme }) => theme.sizes.fontSize.sm}px;
    color: ${({ theme }) => theme.colors.text};
    margin: 3% 0%;
    align-self: center;
`
export const OptionContainer = styled.TouchableOpacity`
    margin: 1% 5%;
    flex-direction: row;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.darkBackground};
    border-radius: ${({ theme }) => theme.sizes.borderRadius.sm}px;
    height: ${({ theme }) => theme.sizes.vh / 15}px;
    padding: 0% 5%;
`
export const Left = styled.View`
    background-color: ${({ theme }) => theme.colors.darkContrast};
    border-radius: ${({ theme }) => theme.sizes.borderRadius.full}px;
    width: ${({ theme }) => theme.sizes.vw * 0.10}px;
    height: ${({ theme }) => theme.sizes.vw * 0.10}px;
    justify-content: center;
    align-items: center;
    margin-right: 3%;
`
export const OptionTitle = styled.Text`
    font-size: ${({ theme }) => theme.sizes.fontSize.sm}px;
    color: ${({ theme }) => theme.colors.text};

`
