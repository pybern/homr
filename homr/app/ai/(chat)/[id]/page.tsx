import { Message } from "ai";
// import { Chat } from "@/schema";
import { getChatById } from "@/app/db";
import { notFound } from "next/navigation";
import { Chat as PreviewChat } from "@/app/ai/chat";
import { auth } from "@/app/ai/(auth)/auth";

export default async function Page({ params }: { params: any }) {
  const { id } = await params;
  const chatFromDb = await getChatById({ id });

  const messages = JSON.parse(chatFromDb.messages)
  console.log(messages)

  if (!chatFromDb) {
    notFound();
  }

  // type casting
  const chat = {
    ...chatFromDb,
    messages: messages as Message[],
  };

  const session = await auth();

  if (chat.author !== session?.user?.email) {
    notFound();
  }

  return (
    <PreviewChat
      id={chat.id}
      initialMessages={chat.messages}
      session={session}
    />
  );
}