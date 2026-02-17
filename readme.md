# 🎙️ Podcast Manager - API Style Netflix

## 📝 Descrição

O **Podcast Manager** é uma aplicação inspirada na interface e organização da Netflix, projetada para centralizar e organizar episódios de podcasts em formato de vídeo. O objetivo principal é proporcionar uma experiência de navegação intuitiva, permitindo que os usuários explorem conteúdos categorizados e gerenciem sua própria biblioteca de mídia.

Este projeto foi aprimorado durante o curso de **Técnico de Redes no SENAI São Caetano**, focando em performance de rede, persistência de dados e arquitetura de microserviços.

---

## 🚀 Tecnologias e Infraestrutura

Para este projeto, migramos para um stack de alta performance:

* **Runtime:** [Bun](https://bun.sh/) - Utilizado para execução ultra-rápida e gerenciamento de pacotes, substituindo o Node.js/Tsup.
* **Linguagem:** TypeScript - Tipagem forte para garantir a integridade dos dados trafegados.
* **Hardware:** Executado em arquitetura ARM (**Apple M4 Chip**) no macOS Tahoe.
* **Persistência:** Banco de dados baseado em arquivos JSON com escrita atômica (`Bun.write`).

---

## ✨ Funcionalidades

* **Navegação Estilo Streaming:** Episódios organizados por categorias (saúde, esporte, tecnologia, etc).
* **Busca Dinâmica:** Filtre episódios por nome de podcast via Query Params.
* **Gerenciamento de Conteúdo (CRUD):** Adicione novos episódios ou remova conteúdos obsoletos em tempo real.
* **ID Único (UUID):** Geração automática de identificadores universais para cada novo registro.
* **Monitoramento de Rede:** Logs coloridos no terminal para acompanhar cada requisição HTTP (Método, URL e Timestamp).

---

## 📡 API Endpoints

### 1. Listar Podcasts

* **Endpoint:** `GET /api/list`
* **Descrição:** Retorna todos os episódios cadastrados no sistema.

### 2. Filtrar por Nome

* **Endpoint:** `GET /api/podcasts?p={nome}`
* **Exemplo:** `GET /api/podcasts?p=flow`

### 3. Adicionar Novo Episódio

* **Endpoint:** `POST /api/list`
* **Payload:**
  
```json
{
  "podcastName": "SENAI Redes",
  "episode": "Dominando Bun no Mac M4",
  "categories": ["tecnologia", "estudo"]
}
```

### 4. Remover Episódio

* **Endpoint:** DELETE /api/list?id={uuid}

Descrição: Remove permanentemente um episódio do banco de dados.

## 💻 Como Executar na sua Rede

Clone o repositório e acesse a pasta do projeto.

Instale as dependências (otimizado para Bun):

```bash
bun install
```

Inicie o servidor com hot-reload:

```Bash
bun --watch src/server.ts
```

* **Logs:** Acompanhe o tráfego no terminal. Linhas verdes indicam leitura, amarelas criação e vermelhas deleção.

## 🏗️ Arquitetura de Camadas

O sistema foi desenhado para ser escalável e fácil de manter:

* **Controllers:** Fazem o "handshake" com as requisições HTTP.
* **Services:** Onde reside a inteligência e as regras de negócio.
* **Repositories:** Camada de acesso ao disco (I/O) utilizando o sistema de arquivos do Bun.

Desenvolvido com ☕ e TypeScript por Cristiano - Aluno de Redes @ SENAI São Caetano 🚀
