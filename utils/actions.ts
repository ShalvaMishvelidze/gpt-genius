"use server";

import { ChatMessage } from "@/interfaces";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateChatResponse = async (chatMessages: ChatMessage[]) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        ...chatMessages,
      ],
      model: "gpt-4.1-nano",
      temperature: 0,
      max_completion_tokens: 150,
    });

    return response.choices[0].message;
  } catch (error) {
    return null;
  }
};
