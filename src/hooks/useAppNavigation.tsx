import { TabParamList } from "@/routes/Models";
import { NavigationProp, useNavigation } from "@react-navigation/native";

type Nav = NavigationProp<TabParamList>

export function useAppNavigation() {
    const navigation = useNavigation<Nav>()
    return navigation
}