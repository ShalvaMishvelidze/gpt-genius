import { Tour } from "@/interfaces";
import LocationLink from "./LocationLink";

export const TourInfo = ({ tour }: { tour: Tour }) => {
  const { title, description, stops } = tour;
  return (
    <div className="w-full">
      <h1 className="text-4xl font-semibold mb-6">{title}</h1>
      <p className="leading-loose mb-6">{description}</p>
      <ul>
        {stops.map(
          (stop: { location: string; description: string; map: string }) => {
            return (
              <li
                key={stop.location}
                className="mb-4 bg-base-100 p-4 rounded-xl"
              >
                <h4 className="mb-4 text-2xl font-bold">{stop.location}</h4>
                <p>{stop.description}</p>
                <LocationLink map={stop.map} />
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
};
