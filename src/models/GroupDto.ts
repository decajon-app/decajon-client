export interface GroupDto {
    id?: number;
    ownerId: number;
    name: string;
    password?: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface JoinGroupDto {
    userId: number;
    groupId: number;
    password: string;
}

export interface GroupMemberDto {
    userId: number;
    firstName: string;
    lastName: string;
}