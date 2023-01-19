import styled from "styled-components/native"

export const Container = styled.TouchableOpacity`
    border-radius: ${({ theme }) => theme.sizes.borderRadius.full}px;
    border-color: ${({ theme }) => theme.colors.contrast};
    border-width: 1px;
    width: ${({ theme }) => theme.sizes.vw * 0.09}px;
    height: ${({ theme }) => theme.sizes.vw * 0.09}px;
    justify-content: center;
    align-items: center;
    padding: 0px;
`
export const Icon = styled.Text`
    color: ${({ theme }) => theme.colors.contrast};
    font-size: ${({ theme }) => theme.sizes.icons.md}px;
    line-height: ${({ theme }) => theme.sizes.icons.md * 1.2}px;
`

