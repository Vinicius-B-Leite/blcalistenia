import styled from "styled-components/native";

export const Container = styled.View`
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    margin: ${({ theme }) => theme.sizes.vw * 0.01}px 0px;
    position: relative;
`


export const SerieInfo = styled.TextInput.attrs({
    keyboardType: 'numeric'

})`
    text-align: center;
    width: 12%;
    font-size: ${({ theme }) => theme.sizes.fontSize.sm}px;
    padding: 0 ;
    color: ${({ theme }) => theme.colors.text}; 
`

export const DeleteSerieButton = styled.TouchableOpacity`
    position: absolute;
    border-radius: ${({ theme }) => theme.sizes.borderRadius.full}px;
    left: ${({ theme }) => theme.sizes.vw * 0.03}px;
    width: 7%;
    height: 100%;
    align-items: center;
    justify-content: center;
`
export const DeleteSerieText = styled.View`
    width: 50%;
    height: 10%;
    border-radius: ${({ theme }) => theme.sizes.borderRadius.full}px;
    background-color: ${({ theme }) => theme.colors.contrast};
`


type CheckButtonProps = { selected: boolean }

export const CheckButton = styled.TouchableOpacity<CheckButtonProps>`
    background-color: ${({ selected, theme }) => selected ? theme.colors.contrast : theme.colors.darkContrast};
    width: 8%;
    border-radius: ${({ theme }) => theme.sizes.borderRadius.sm}px;
    height: 80%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`