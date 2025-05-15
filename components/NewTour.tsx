"use client";
import { FormEvent } from "react";
import { TourInfo } from "./TourInfo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createNewTour,
  generateTourResponse,
  getExistingTour,
} from "@/utils/actions";
import { Destination, Tour } from "@/interfaces";
import toast from "react-hot-toast";

const NewTour = () => {
  const queryClient = useQueryClient();

  const {
    mutate,
    isPending,
    data: tour,
  } = useMutation({
    mutationFn: async (destination: Destination) => {
      const existingTour = await getExistingTour(destination);
      if (existingTour) {
        return existingTour;
      }
      const newTour: Tour = await generateTourResponse(destination);
      if (newTour) {
        await createNewTour(newTour);
        queryClient.invalidateQueries({ queryKey: ["tours"] });
        return newTour;
      }
      toast.error("No matching location found...");
      return null;
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const destination = Object.fromEntries(formData.entries());
    mutate(destination as unknown as Destination);
  };

  if (isPending) {
    return <span className="loading loading-lg"></span>;
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <h2 className="mb-4">Select your dream destination</h2>
        <div className="join w-full">
          <input
            type="text"
            className="input input-bordered join-item w-full"
            placeholder="location"
            name="location"
            required
          />
          <input
            type="text"
            className="input input-bordered join-item w-full"
            placeholder="country"
            name="country"
            required
          />
          <button className="btn btn-primary join-item uppercase" type="submit">
            generate tour
          </button>
        </div>
      </form>
      <div className="mt-16">{tour ? <TourInfo tour={tour} /> : null}</div>
    </>
  );
};

export default NewTour;
