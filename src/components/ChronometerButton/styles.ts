import styled from "styled-components/native"


export const finishWorkout = styled.TouchableOpacity`
    width: 90%;
    background-color: ${({ theme }) => theme.colors.contrast};
    justify-content: center;
    align-items: center;
    padding: 5%;
    margin: 3%;
    align-self: center;
    margin-top: auto;
    border-radius: ${({ theme }) => theme.sizes.borderRadius.sm}px;
`
export const FineshText = styled.Text`
    font-size: ${({ theme }) => theme.sizes.fontSize.md}px;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 700;
`
