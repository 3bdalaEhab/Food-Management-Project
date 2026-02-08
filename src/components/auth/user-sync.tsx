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
            if (
                user?.imagePath !== finalImagePath ||
                user?.userName !== currentUser.userName ||
                user?.email !== currentUser.email ||
                user?.country !== currentUser.country
            ) {
                setUser({
                    id: String(currentUser.id),
                    userName: currentUser.userName,
                    email: currentUser.email,
                    role: currentUser.group.name as "SuperAdmin" | "SystemUser",
                    country: currentUser.country,
                    phoneNumber: currentUser.phoneNumber,
                    imagePath: finalImagePath
                });
            }
        }
    }, [currentUser, setUser, user]);

    return null;
}
