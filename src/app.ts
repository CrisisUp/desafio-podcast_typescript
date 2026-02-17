import http from "http";
import { 
  getListEpisodes, 
  getFilterEpisodes, 
  postPodcast, 
  deletePodcast, 
  updatePodcast
} from "./controllers/podscasts-controller";
import { Routes } from "./routes/routes";
import { HttpMethod } from "./utils/http-methods";
import { StatusCode } from "./utils/status-code";

export const app = async (
  request: http.IncomingMessage,
  response: http.ServerResponse
) => {
  // --- MIDDLEWARE DE LOGS COLORIDOS ---
  const method = request.method || "GET";
  const url = request.url || "";
  const timestamp = new Date().toLocaleTimeString();
  
  const colors = {
    GET: "\x1b[32m",
    POST: "\x1b[33m",
    DELETE: "\x1b[31m",
    RESET: "\x1b[0m"
  };
  const color = colors[method as keyof typeof colors] || colors.RESET;
  console.log(`${color}[${timestamp}] ${method}${colors.RESET} - ${url}`);

  // --- ROTEAMENTO ---
  const baseUrl = url.split("?")[0];

  // 1. Listagem (GET)
  if (method === HttpMethod.GET && baseUrl === Routes.LIST) {
    await getListEpisodes(request, response);
    return;
  }

  // 2. Criação (POST)
  if (method === HttpMethod.POST && baseUrl === Routes.LIST) {
    await postPodcast(request, response);
    return;
  }

  // 3. Filtro (GET)
  if (method === HttpMethod.GET && baseUrl === Routes.ESPISODE) {
    await getFilterEpisodes(request, response);
    return;
  }

  // 4. Deleção (DELETE)
  if (method === HttpMethod.DELETE && baseUrl === Routes.LIST) {
    await deletePodcast(request, response);
    return;
  }

  if (method === "PUT" && baseUrl === Routes.LIST) {
  await updatePodcast(request, response);
  return;
}

  // --- 404 NOT FOUND ---
  response.writeHead(StatusCode.NOT_FOUND || 404, { "Content-Type": "application/json" });
  response.end(JSON.stringify({ message: "Rota não encontrada ou método inválido." }));
};