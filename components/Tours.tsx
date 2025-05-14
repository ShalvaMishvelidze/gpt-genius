"use client";

import { getAllTours } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import ToursList from "./ToursList";
import { Tour } from "@/interfaces";
import { useState } from "react";

const Tours = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isPending } = useQuery({
    queryKey: ["tours", searchTerm],
    queryFn: () => getAllTours(searchTerm),
  });

  return (
    <>
      <form className="max-w-lg mb-12">
        <div className="join w-full">
          <input
            type="text"
            placeholder="enter city or country here..."
            className="input input-bordered join-item w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
          />
          <button
            type="button"
            className="btn btn-primary join-item"
            disabled={isPending}
            onClick={() => setSearchTerm("")}
          >
            {isPending ? "please wait..." : "reset"}
          </button>
        </div>
      </form>
      {isPending ? (
        <span className="loading"></span>
      ) : (
        <ToursList data={data as Tour[]} />
      )}
    </>
  );
};
export default Tours;
