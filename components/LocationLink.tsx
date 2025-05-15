"use client";
import { FaLocationDot } from "react-icons/fa6";

const LocationLink = ({ map }: { map: string | null }) => {
  return (
    <>
      {map && (
        <a
          target="_blank"
          className="text-xl font-bold capitalize mt-8 flex gap-3 items-center"
          href={map}
        >
          go to location <FaLocationDot className="text-red-500" />
        </a>
      )}
    </>
  );
};
export default LocationLink;
