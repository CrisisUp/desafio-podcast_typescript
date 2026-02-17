import { PodcastModel } from "../models/podcast-model";
import { PodcastTransferModel } from "../models/podcast-transfer-model";
import { repositoryCreatePodcast } from "../repositories/podcasts-repository";
import { StatusCode } from "../utils/status-code";

export const serviceCreateEpisode = async (
  podcast: PodcastModel
): Promise<PodcastTransferModel> => {
  
  // Define o contrato de retorno padrão
  let responseFormat: PodcastTransferModel = {
    statusCode: 0,
    body: [],
  };

  // --- LÓGICA DE ID AUTOMÁTICO ---
  // Se o videoId vier vazio, nulo ou for "00000", geramos um ID único
  if (!podcast.videoId || podcast.videoId === "00000") {
    podcast.videoId = crypto.randomUUID(); 
  }
  // -------------------------------

  // Validação simples: se não tiver o nome do podcast, retorna erro 400 (Bad Request)
  if (!podcast.podcastName) {
    responseFormat.statusCode = StatusCode.BAD_REQUEST || 400;
    responseFormat.body = { message: "Dados inválidos: Nome do podcast é obrigatório" };
  } else {
    // Chama o repositório para gravar no JSON via Bun.write
    const data = await repositoryCreatePodcast(podcast);
    
    responseFormat.statusCode = StatusCode.CREATED || 201;
    responseFormat.body = data;
  }

  return responseFormat;
};