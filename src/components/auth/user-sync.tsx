import { useEffect } from "react";
import { useCurrentUser } from "@/features/users/hooks";
import { useAuthStore } from "@/stores";

export function UserSync() {
    const { data: currentUser } = useCurrentUser();
    const setUser = useAuthStore((state) => state.setUser);
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        if (currentUser) {
            // Keep existing image if new one is null
            const finalImagePath = currentUser.imagePath || user?.imagePath || null;

            // Only update if data changed to avoid infinite loops
            // We verify key fields
            // Create the new user object candidate
            const newUserState = {
                id: String(currentUser.id),
                userName: currentUser.userName,
                email: currentUser.email,
                role: currentUser.group.name as "SuperAdmin" | "SystemUser",
                country: currentUser.country,
                phoneNumber: currentUser.phoneNumber,
                imagePath: finalImagePath
            };

            // Deep comparison to prevent loop
            if (JSON.stringify(user) !== JSON.stringify(newUserState)) {
                setUser(newUserState);
            }
        }
    }, [currentUser, setUser, user]);

    return null;
}
