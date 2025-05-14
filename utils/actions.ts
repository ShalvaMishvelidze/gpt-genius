"use server";

import { ChatMessage, Destination, Tour } from "@/interfaces";
import { prisma } from "@/lib/prisma";
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
      model: process.env.OPENAI_MODEL || "gpt-4.1-nano",
      temperature: 0,
      max_completion_tokens: 150,
    });

    return response.choices[0].message;
  } catch (error) {
    console.error("Error generating chat response:", error);
    return null;
  }
};

export const generateTourResponse = async ({ city, country }: Destination) => {
  const query = `Find a ${city} in this ${country}.
  If ${city} in this ${country} exists, create a list of things families can do in this ${city},${country}. 
  Once you have a list, create a one-day tour. Response should be in the following JSON format: 
  {
    "tour": {
      "city": "${city}",
      "country": "${country}",
      "title": "title of the tour",
      "description": "description of the city and tour",
      "stops": ["short paragraph on the stop 1 ", "short paragraph on the stop 2","short paragraph on the stop 3"]
    }
  }
  If you can't find info on exact ${city}, or ${city} does not exist, or it's population is less than 1, or it is not located in the following ${country} return { "tour": null }, with no additional characters.`;

  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a tour guide.",
        },
        {
          role: "user",
          content: query,
        },
      ],
      model: process.env.OPENAI_MODEL || "gpt-4.1-nano",
      temperature: 0,
    });

    const tourData = JSON.parse(response.choices[0].message.content as string);
    if (!tourData.tour) {
      return null;
    }
    return tourData.tour;
  } catch (error) {
    console.error("Error generating chat response:", error);
    return null;
  }
};

export const getExistingTour = async ({ city, country }: Destination) => {
  return prisma.tour.findUnique({
    where: {
      city_country: {
        city,
        country,
      },
    },
  });
};

export const createNewTour = async (tour: Tour) => {
  return prisma.tour.create({
    data: tour,
  });
};
