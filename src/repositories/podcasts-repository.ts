import { PodcastModel } from "../models/podcast-model";

const file = Bun.file("src/repositories/podcasts.json");

// 1. LISTAR / FILTRAR
export const repositoryPodcast = async (
  podcastName?: string
): Promise<PodcastModel[]> => {
  const jsonFile: PodcastModel[] = await file.json();

  if (podcastName) {
    return jsonFile.filter(
      (podcast: PodcastModel) => 
        podcast.podcastName.toLowerCase() === podcastName.toLowerCase()
    );
  }

  return jsonFile;
};

// 2. CRIAR
export const repositoryCreatePodcast = async (
  newPodcast: PodcastModel
): Promise<PodcastModel[]> => {
  let jsonFile: PodcastModel[] = [];

  try {
    jsonFile = await file.json();
  } catch (error) {
    jsonFile = [];
  }

  jsonFile.push(newPodcast);
  await Bun.write(file, JSON.stringify(jsonFile, null, 2));

  return jsonFile;
};

// 3. DELETAR
export const repositoryDeletePodcast = async (videoId: string): Promise<PodcastModel[]> => {
  const jsonFile: PodcastModel[] = await file.json();

  // Filtramos: "Mantenha todos que NÃO tenham esse videoId"
  const filteredData = jsonFile.filter((p) => p.videoId !== videoId);

  await Bun.write(file, JSON.stringify(filteredData, null, 2));
  return filteredData;
};