import { repositoryDeletePodcast } from "../repositories/podcasts-repository";
import { StatusCode } from "../utils/status-code";
import { PodcastTransferModel } from "../models/podcast-transfer-model";

export const serviceDeleteEpisode = async (
  videoId: string | null
): Promise<PodcastTransferModel> => {
  
  let responseFormat: PodcastTransferModel = {
    statusCode: 0,
    body: [],
  };

  // Se o ID não for passado na URL (?id=...)
  if (!videoId) {
    responseFormat.statusCode = StatusCode.BAD_REQUEST || 400;
    responseFormat.body = { message: "ID do vídeo é obrigatório para deleção." };
  } else {
    // Chama o repositório que acabamos de consertar
    const data = await repositoryDeletePodcast(videoId);
    responseFormat.statusCode = StatusCode.OK;
    responseFormat.body = data;
  }

  return responseFormat;
};