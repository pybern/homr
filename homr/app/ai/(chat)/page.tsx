import { Chat } from "@/app/ai/chat";
import { generateId } from "ai";
import { auth } from "@/app/ai/(auth)/auth";

export default async function Page() {
  const session = await auth();
  const id = generateId();

  return (
    <>
      <Chat id={id} initialMessages={[]} session={session} />
    </>
  )
}