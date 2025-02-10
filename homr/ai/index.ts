import { createAzure } from "@ai-sdk/azure";
import { wrapLanguageModel } from "ai";
import { ragMiddleware } from "./rag-middleware";

const azure = createAzure({
    resourceName: process.env.AZURE_RESOURCE_NAME, // Azure resource name
    apiKey: process.env.AZURE_API_KEY,
  });

export const customModel = wrapLanguageModel({
  model: azure("gpt-4o"),
  middleware: ragMiddleware,
});