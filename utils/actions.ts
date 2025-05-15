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

export const generateTourResponse = async ({
  location,
  country,
}: Destination) => {
  const query = `Find a ${location} in this ${country}.
  If ${location} in this ${country} exists, create a list of things families can do in this ${location},${country}. 
  Once you have a list, create a one-day tour. Response should be in the following JSON format: 
  {
    "tour": {
      "location": "${location}",
      "country": "${country}",
      "title": "title of the tour",
      "description": "description of the location and tour",
      "stops": [{"location":"location name of the stop","description":"description of the stop","map":"google maps link of 'google.com/maps/search/${location} ${country}'"}, {"location":"location name of the stop","description":"description of the stop","map":"google maps link of 'google.com/maps/search/location name of the stop ${location} ${country}'"},{"location":"location name of the stop","description":"description of the stop","map":"google maps link of 'google.com/maps/search/location name of the stop ${location} ${country}'"}],
      "map": "Generate a Google Maps link for the location "${location} ${country}". Only return the link."
    }
  }
  If you can't find info on exact ${location}, or ${location} does not exist, or it's population is less than 1, or it is not located in the following ${country} return { "tour": null }, with no additional characters.`;

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

export const getExistingTour = async ({ location, country }: Destination) => {
  return prisma.tour.findUnique({
    where: {
      location_country: {
        location,
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

export const getAllTours = async (searchTerm?: string) => {
  if (!searchTerm) {
    return prisma.tour.findMany({
      orderBy: {
        location: "asc",
      },
    });
  }

  return prisma.tour.findMany({
    where: {
      OR: [
        {
          location: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          country: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      ],
    },
    orderBy: {
      location: "asc",
    },
  });
};

export const getSingleTour = async (id: string): Promise<Tour | null> => {
  return prisma.tour.findUnique({
    where: {
      id,
    },
  });
};
