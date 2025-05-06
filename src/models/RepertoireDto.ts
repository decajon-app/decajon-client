export interface CreateSongDto {
    groupId: number;
    title: string;
    artist: string;
    genre?: string | undefined;
    duration?: number | null | undefined;
    performance?: number | undefined;
    popularity?: number | undefined;
    complexity?: number | undefined;
    comments?: string | undefined;
    tone?: string | undefined;
};

export interface RepertoireSongCardDto {
    id: number;
    song: string;
    artist: string;
};

export interface RepertoireSongDto {
    repertoireId: number;
    tone?: string;
    comment?: string;
    performance?: number;
    popularity?: number;
    complexity?: number;
    practicedAt?: string;
    title: string;
    duration?: number;
    genre?: string;
    artist?: string;
};