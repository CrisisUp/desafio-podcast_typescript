import { IncomingMessage, ServerResponse } from "http";
import { serviceListEpisodes } from "../services/list-episodes-service";
import { serviceFilterEpisodes } from "../services/filter-episodes-service";
import { serviceCreateEpisode } from "../services/create-episode-service";
import { serviceDeleteEpisode } from "../services/delete-episode-service";
import { ContentType } from "../utils/content-type";
import { PodcastTransferModel } from "../models/podcast-transfer-model";
import { PodcastModel } from "../models/podcast-model";

const defaultContent = { "Content-Type": ContentType.JSON };

export const getListEpisodes = async (req: IncomingMessage, res: ServerResponse) => {
  const content: PodcastTransferModel = await serviceListEpisodes();
  res.writeHead(content.statusCode, defaultContent);
  res.write(JSON.stringify(content.body));
  res.end();
};

export const getFilterEpisodes = async (req: IncomingMessage, res: ServerResponse) => {
  const baseUrl = `http://${req.headers.host}`;
  const parsedUrl = new URL(req.url || "", baseUrl);
  const podcastName = parsedUrl.searchParams.get("p") || undefined;

  const content: PodcastTransferModel = await serviceFilterEpisodes(podcastName);
  res.writeHead(content.statusCode, defaultContent);
  res.write(JSON.stringify(content.body));
  res.end();
};

export const deletePodcast = async (req: IncomingMessage, res: ServerResponse) => {
  const baseUrl = `http://${req.headers.host}`;
  const parsedUrl = new URL(req.url || "", baseUrl);
  const videoId = parsedUrl.searchParams.get("id");

  const content = await serviceDeleteEpisode(videoId);

  res.writeHead(content.statusCode, defaultContent);
  res.end(JSON.stringify(content.body));
};

// AQUI ESTAVA O PROBLEMA: Garantindo o export correto para o POST
export const postPodcast = async (req: IncomingMessage, res: ServerResponse) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", async () => {
    try {
      const newPodcast: PodcastModel = JSON.parse(body);
      const content = await serviceCreateEpisode(newPodcast);

      res.writeHead(content.statusCode, defaultContent);
      res.end(JSON.stringify(content.body));
    } catch (error) {
      res.writeHead(400, defaultContent);
      res.end(JSON.stringify({ message: "Invalid JSON format" }));
    }
  });
};