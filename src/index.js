const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

var repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositoryUpdate = request.body;

  let repository = repositories.find(repository => repository.id === id);

  if (!repository) {
    return response.status(404).json({ error: "Repository not found" });
  }

  let likes = repository.likes;

  repositoryIndex = repositories.findIndex(repository => repository.id === id);

  repository = { ...repositories[repositoryIndex], ...repositoryUpdate };

  repository.likes = likes;

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find((repository) => repository.id === id);

  if (!repository) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositories = repositories.filter((repositorie) => repositorie.id != id);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  let repository = repositories.find(repository => repository.id === id);

  if (!repository) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositories.map((repository) => {
    if (repository.id === id) {
      repository.likes++
    }
  })

  repository = repositories.find(repository => repository.id === id);

  return response.json(repository);
});

module.exports = app;
