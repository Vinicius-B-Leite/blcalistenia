import { Dimensions } from 'react-native'

export const sizes = {
    vw: Dimensions.get('screen').width,
    vh: Dimensions.get('screen').height,
    tabBar: Dimensions.get('screen').height / 13,
    icons: {
        sm: Dimensions.get('screen').width / 20,
        md: Dimensions.get('screen').width / 17,
        xlg: Dimensions.get('screen').width / 10
    },
    image: {
        sm: Dimensions.get('screen').width / 9
    },
    borderRadius: {
        full: Dimensions.get('screen').height,
        sm: Dimensions.get('screen').width / 50,
        md: Dimensions.get('screen').width / 30,
    },
    fontSize: {
        vsm: Dimensions.get('screen').width / 28,
        sm: Dimensions.get('screen').width / 25,
        md: Dimensions.get('screen').width / 20,
        lg: Dimensions.get('screen').width / 15,
        xlg: Dimensions.get('screen').width / 10,
    }
}