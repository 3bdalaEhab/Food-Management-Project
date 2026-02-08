export interface User {
    id: number;
    userName: string;
    email: string;
    country: string;
    phoneNumber: string;
    imagePath: string | null;
    group: {
        id: number;
        name: string;
    };
    creationDate: string;
    modificationDate: string;
}

export interface UsersResponse {
    pageNumber: number;
    pageSize: number;
    totalNumberOfPages: number;
    totalNumberOfRecords: number;
    data: User[];
}

export interface UpdateUserData {
    id: number;
    userName?: string;
    email?: string;
    country?: string;
    phoneNumber?: string;
    imagePath?: string;
}

export interface ChangePasswordData {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

export interface UpdateProfileData {
    userName: string;
    email: string;
    country: string;
    phoneNumber: string;
    profileImage?: File | null;
}

export interface CreateUserData {
    userName: string;
    email: string;
    country: string;
    phoneNumber: string;
    password: string;
}
