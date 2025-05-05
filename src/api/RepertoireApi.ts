import { CreateSongDto, RepertoireSongCardDto } from "../models/RepertoireDto";
import { ApiMethods } from "./ApiMethods";
import { ENDPOINTS } from "./EndPoints";

export const createSong = async (newSongData: CreateSongDto): Promise<void> => {
    return ApiMethods.post<void>(ENDPOINTS.REPERTOIRES.CREATE_REPERTOIRE, newSongData);
}

export const getRepertoire = async (groupId: number): Promise<RepertoireSongCardDto[]> => {
    return ApiMethods.get<RepertoireSongCardDto[]>(ENDPOINTS.REPERTOIRES.GET_REPERTOIRE + `/${groupId}`);
}