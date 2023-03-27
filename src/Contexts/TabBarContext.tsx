import React, { createContext, useContext, useState } from 'react';



type TabBarContextType = {
    hideTabBar: () => void,
    showTabBar: () => void,
    isTabBarVisible: boolean
}
export const TabBarContext = createContext({} as TabBarContextType)



type Props = {
    children: React.ReactNode
}
const TabBarProvider: React.FC<Props> = ({ children }) => {

    const [isTabBarVisible, setTabBarVisible] = useState(true)

    const hideTabBar = () => {
        setTabBarVisible(false)
    }

    const showTabBar = () => {
        setTabBarVisible(true)
    }
    return (
        <TabBarContext.Provider value={{
            hideTabBar,
            isTabBarVisible,
            showTabBar
        }}>
            {children}
        </TabBarContext.Provider>
    )
}


export const useTabBar = () => useContext(TabBarContext)
export default TabBarProvider;