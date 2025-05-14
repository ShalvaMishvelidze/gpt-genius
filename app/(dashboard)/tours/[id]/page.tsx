import { TourInfo } from "@/components/TourInfo";
import { getSingleTour } from "@/utils/actions";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
const url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=`;

const SingleTourPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const tour = await getSingleTour(id);

  if (!tour) {
    return redirect("/tours");
  }

  const { data } = await axios.get(`${url}${tour.city}`);
  const image = data?.results[0]?.urls?.raw;

  return (
    <div>
      <Link href={"/tours"} className="btn btn-secondary mb-12">
        back to tours
      </Link>
      {image ? (
        <div>
          <Image
            src={image}
            alt={tour.title}
            width={300}
            height={300}
            className="rounded-xl shadow-xl mb-16 h-96 w-96 object-cover"
            priority
          />
        </div>
      ) : null}
      <TourInfo tour={tour} />
    </div>
  );
};
export default SingleTourPage;
