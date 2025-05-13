export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface Destination {
  city: string;
  country: string;
}

export interface Tour {
  city: string;
  country: string;
  title: string;
  description: string;
  stops: string[];
}
