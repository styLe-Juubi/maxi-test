enum USER_GENDER_TYPES {
    woman = 'woman',
    man = 'man',
    nonBinary = 'no-binary',
    noIdentification = 'no-identification',
}

enum MULTIFACTOR_AUTH_TYPES {
    email = 'email',
    phone = 'phone',
};

export interface UserModel {
    _id: string;
    uuid: string;
    username: string;
    email?: string;
    country_code?: number;
    phone?: number;
    name?: string;
    surname?: string;
    gender?: USER_GENDER_TYPES;
    bio?: string;
    avatar?: string[];
    background?: string[];
    roles: string[];
    banned: boolean;
    banned_until?: Date;
    online: boolean;
    multifactor_auth?: MULTIFACTOR_AUTH_TYPES;
    oauth: boolean;
    verified: boolean;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}