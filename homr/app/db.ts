import { supabase } from "@/lib/supabase"
import { genSaltSync, hashSync } from "bcrypt-ts";

export async function getUser(email: string) {
  console.log("getUser", email)
  const { data, error } = await supabase.from("user").select().eq("email", email)
  console.log("getUser", data, error)
  if (error) throw error
  return data
}

export async function createUser(email: string, password: string) {

  let salt = genSaltSync(10);
  let hash = hashSync(password, salt);

  return await supabase.from("user").insert([{ email, password: hash }]);
}


export async function createMessage({
  id,
  messages,
  author,
}: {
  id: string
  messages: any
  author: string
}) {
  const { data, error } = await supabase.from("chat").upsert(
    {
      id,
      messages: JSON.stringify(messages),
      author,
      createdAt: new Date().toISOString(),
    },
    { onConflict: "id" },
  )

  if (error) throw error
  return data
}

export async function getChatsByUser({ email }: { email: string }) {
  const { data, error } = await supabase
    .from("chat")
    .select()
    .eq("author", email)
    .order("createdAt", { ascending: false })

  if (error) throw error
  return data
}

export async function getChatById({ id }: { id: string }) {
  const { data, error } = await supabase.from("chat").select().eq("id", id).single()

  if (error) throw error
  return data
}

export async function insertChunks({ chunks }: { chunks: any[] }) {
  const { data, error } = await supabase.from("chunk").insert(chunks)

  if (error) throw error
  return data
}

export async function getChunksByFilePaths({
  filePaths,
}: {
  filePaths: Array<string>
}) {
  const { data, error } = await supabase.from("chunk").select().in("file_path", filePaths)

  if (error) throw error
  return data
}

export async function deleteChunksByFilePath({
  filePath,
}: {
  filePath: string
}) {
  const { data, error } = await supabase.from("chunk").delete().eq("file_path", filePath)

  if (error) throw error
  return data
}

