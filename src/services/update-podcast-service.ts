import { repositoryUpdatePodcast } from "../repositories/podcasts-repository";
import { StatusCode } from "../utils/status-code";
import { PodcastModel } from "../models/podcast-model";

export const serviceUpdatePodcast = async (id: string | null, data: Partial<PodcastModel>) => {
  if (!id) {
    return { statusCode: StatusCode.BAD_REQUEST, body: { message: "ID é obrigatório" } };
  }

  const updatedPodcast = await repositoryUpdatePodcast(id, data);

  if (!updatedPodcast) {
    return { statusCode: StatusCode.NOT_FOUND, body: { message: "Podcast não encontrado" } };
  }

  return { statusCode: StatusCode.OK, body: updatedPodcast };
};