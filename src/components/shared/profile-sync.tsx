import { useEffect } from "react";
import { useCurrentUser } from "@/features/users/hooks";
import { useAuthStore } from "@/stores";

/**
 * ProfileSync component ensures that the global auth store 
 * is always updated with the latest user profile data (including imagePath)
 * from the server upon initial app load or refresh.
 */
export function ProfileSync() {
    const { data: currentUser } = useCurrentUser();
    const { setUser, user: storeUser } = useAuthStore();

    useEffect(() => {
        if (currentUser && storeUser) {
            // Only update if there's actually a change to prevent infinite loops or unnecessary renders
            const hasChanges =
                currentUser.imagePath !== storeUser?.imagePath ||
                currentUser.userName !== storeUser?.userName ||
                currentUser.email !== storeUser?.email ||
                currentUser.country !== storeUser?.country ||
                currentUser.phoneNumber !== storeUser?.phoneNumber;

            if (hasChanges) {
                // Ensure we cast appropriately to the User type expected by the store
                setUser({
                    id: String(currentUser.id),
                    userName: currentUser.userName,
                    email: currentUser.email,
                    role: currentUser.group?.name === "SuperAdmin" ? "SuperAdmin" : "SystemUser",
                    country: currentUser.country,
                    phoneNumber: currentUser.phoneNumber,
                    imagePath: currentUser.imagePath
                });
            }
        }
    }, [currentUser, setUser, storeUser]);

    return null;
}
