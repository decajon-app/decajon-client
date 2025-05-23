import { CreateSongDto, RepertoireSongCardDto, RepertoireSongDto, RepertoireReviewSongDto, SuggestionCardDto } from "../models/RepertoireDto";
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

export const reviewSongCardById = async (reviewCard: RepertoireReviewSongDto): Promise<void> => {
    return ApiMethods.post<void>(ENDPOINTS.REPERTOIRES.REVIEW_CARD, reviewCard);
};

export const getSuggestionsByUserId = async (userId: number): Promise<SuggestionCardDto[]> => {
    return ApiMethods.get<SuggestionCardDto[]>(ENDPOINTS.REPERTOIRES.SUGGESTIONS_USER_PRACTICE(userId));
}

export const getSuggestionsByGroupId = async (groupId: number): Promise<SuggestionCardDto[]> => {
    return ApiMethods.get<SuggestionCardDto[]>(ENDPOINTS.REPERTOIRES.SUGGESTIONS_GROUP_PRACTICE(groupId));
}