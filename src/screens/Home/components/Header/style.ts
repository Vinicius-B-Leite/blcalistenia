import styled from "styled-components/native";

export const Header = styled.View`
    flex-direction: row;
    padding: 5%;
    justify-content: space-between;
`

export const Left = styled.TouchableOpacity`
    flex-direction: row;
    gap: ${({ theme }) => theme.sizes.vw * 0.05}px;
`
export const Avatar = styled.Image`
    width: ${({ theme }) => theme.sizes.image.sm}px;
    height: ${({ theme }) => theme.sizes.image.sm}px;
    border-radius: ${({ theme }) => theme.sizes.borderRadius.full}px;
`
export const TextContainer = styled.View``
export const Welcome = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.sizes.fontSize.vsm}px;

`
export const Username = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.sizes.fontSize.sm}px;
    font-weight: 700;

`
export const Right = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    width: 20%;
    border-radius: ${({ theme }) => theme.sizes.borderRadius.full}px;
`