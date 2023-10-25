import { pickeImage } from "@/utils/pickImage";
import { useApp, useUser } from "@realm/react";
import { useState } from "react";

export default function useProfile() {
    const app = useApp()
    const userRealm = useUser()
    const [user, setUser] = useState(app.currentUser?.customData)
    const [showChangeUsername, setShowChangeUsername] = useState(false)

    const customUserDataCollection = userRealm
        .mongoClient('mongodb-atlas')
        .db('blcalistenia')
        .collection('custom-user-data')

    const filter = {
        user_id: userRealm.id,
    };

    const handlePickImage = async () => {
        const image = await pickeImage()

        if (image.assets && image.assets[0].uri) {


            const updateDoc = {
                $set: {
                    user_id: userRealm.id,
                    avatar: image.assets[0].uri,
                },
            };
            const options = { upsert: true }

            customUserDataCollection.updateOne(filter, updateDoc, options)

            const customUserData = await userRealm.refreshCustomData();
            setUser(customUserData)
        }
    }

    const handleChangeName = async (newName: string) => {
        if (!newName) return
        const updateDoc = {
            $set: {
                user_id: userRealm.id,
                username: newName,
            },
        };
        const options = { upsert: true }

        customUserDataCollection.updateOne(filter, updateDoc, options)

        const customUserData = await app.currentUser?.refreshCustomData();
        setUser(customUserData)
        setShowChangeUsername(false)
    }
    const openChangeUsernameModal = () => setShowChangeUsername(true)
    const closeChangeUsernameModal = () => setShowChangeUsername(false)


    return {
        showChangeUsername,
        user,
        userRealm,
        handleChangeName,
        handlePickImage,
        openChangeUsernameModal,
        closeChangeUsernameModal
    }
}