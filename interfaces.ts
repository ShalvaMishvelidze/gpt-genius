export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface Destination {
  location: string;
  country: string;
}

export interface Tour {
  id: string;
  location: string;
  country: string;
  title: string;
  description: string;
  image: string | null;
  stops: any;
  map: string | null;
}
