import styled from "styled-components/native";

export const Container = styled.View`
    flex-direction: row;
    width: 100%;
    justify-content: space-evenly;
    align-items: baseline;
    margin: ${({ theme }) => theme.sizes.vw * 0.01}px 0px;
    position: relative;
`


export const SerieInfo = styled.TextInput.attrs({
    keyboardType: 'numeric'

})`
    text-align: center;
    width: 20%;
    font-size: ${({ theme }) => theme.sizes.fontSize.sm}px;
    padding: 0 ;
`

export const DeleteSerieButton = styled.TouchableOpacity`
    position: absolute;
    border-radius: ${({ theme }) => theme.sizes.borderRadius.full}px;
    left: ${({ theme }) => theme.sizes.vw * -0.03}px;
    width: 10%;
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