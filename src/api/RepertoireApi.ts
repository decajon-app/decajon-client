import { CreateSongDto, RepertoireSongCardDto, RepertoireSongDto, ReperotireReviewSongDto } from "../models/RepertoireDto";
import { ApiMethods } from "./ApiMethods";
import { ENDPOINTS } from "./EndPoints";

export const createSong = async (newSongData: CreateSongDto): Promise<void> => {
    return ApiMethods.post<void>(ENDPOINTS.REPERTOIRES.CREATE_REPERTOIRE, newSongData);
}

export const getRepertoire = async (groupId: number): Promise<RepertoireSongCardDto[]> => {
    return ApiMethods.get<RepertoireSongCardDto[]>(ENDPOINTS.REPERTOIRES.GET_REPERTOIRE + `/${groupId}`);
}

export const getSongByRepertoireId = async (repertoireId: number): Promise<RepertoireSongDto> => {
    return ApiMethods.get<RepertoireSongDto>(ENDPOINTS.REPERTOIRES.GET_SONG(repertoireId));
} 

export const reviewSongCardById = async (reviewCard: ReperotireReviewSongDto): Promise<void> => {
    return ApiMethods.post<void>(ENDPOINTS.REPERTOIRES.REVIEW_CARD(reviewCard.repertoireId),{rating: reviewCard.rating});
};