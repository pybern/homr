import { auth } from "@/app/ai/(auth)/auth";
import { insertChunks } from "@/app/db";
import { getPdfContentFromUrl } from "@/utils/pdf";
import { createAzure } from "@ai-sdk/azure";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { put } from "@vercel/blob";
import { embedMany } from "ai";

const azure = createAzure({
  resourceName: process.env.AZURE_RESOURCE_NAME, // Azure resource name
  apiKey: process.env.AZURE_API_KEY,
});

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  let session = await auth();

  if (!session) {
    return Response.redirect("/ai/login");
  }

  const { user } = session;

  if (!user) {
    return Response.redirect("/ai/login");
  }

  if (request.body === null) {
    return new Response("Request body is empty", { status: 400 });
  }

  const blob = await put(`${user.email}/${filename}`, request.body, {
    access: "public",
  });

  const url = blob.url;

  const content = await getPdfContentFromUrl(url);

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
  });
  const chunkedContent = await textSplitter.createDocuments([content]);

  const { embeddings } = await embedMany({
    model: azure.textEmbeddingModel("text-embedding-3-small"),
    values: chunkedContent.map((chunk) => chunk.pageContent),
  });

  await insertChunks({
    chunks: chunkedContent.map((chunk, i) => ({
      id: `${user.email}/${filename}/${i}`,
      filePath: `${user.email}/${filename}`,
      content: chunk.pageContent,
      embedding: embeddings[i],
    })),
  });

  return Response.json({});
}