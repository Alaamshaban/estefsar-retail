export interface UserResponse {
    user: UserModel;
    sessionInfo: string;
}

export interface UserModel {
    user_id: string;
    picture: string;
    first_name: string;
    last_name: string;
    teams: Array<string>;
    role: string;
    is_superuser: true;
    is_staff: true;
    is_active: true;
    company: string;
    account_owner: true;
    username: string;
    email: string;
    phone_number: string;
}

export interface UserPayload {
    first_name?: string;
    last_name?: string;
    teams?: Array<string>;
    role?: string;
    username: string;
    email: string;
    phone_number: string;
}
