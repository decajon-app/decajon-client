export interface GroupDto {
    id?: number;
    ownerId: number;
    name: string;
    password?: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}