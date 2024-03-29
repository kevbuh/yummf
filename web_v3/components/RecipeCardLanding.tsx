import React from "react";
import Image from "next/image";
import Link from "next/link";
// import mixpanel from "mixpanel-browser";

type RecipeProps = {
  name: string;
  cook_time: string;
  id: number;
  caption: string;
  color: string;
};

function RecipeCardLanding({
  name,
  cook_time,
  id,
  caption,
  color,
}: RecipeProps) {
  const getStars = (num_stars: Number | String) => {
    const steps = [];
    for (let i = 1; i <= num_stars; i++) {
      steps.push(
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return steps;
  };

  return (
    <div className={`rounded-lg p-1 shadow-sm cursor-pointer ${color} h-full`}>
      <Link href={"/recipes/" + id}>
        <div className="m-1">
          <p className="bg-white rounded-lg h-80">
            <Image
              // loader={data.img_url}
              className="rounded-xl "
              src="https://yummf.sfo3.digitaloceanspaces.com/greenris.jpeg_570bf40666888fd8510410b04"
              unoptimized={true}
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="contain"
              priority={true}
              quality={50}
              // width={500}
              // height={500}
            />
          </p>

          {/* )} */}
          <div className="my-2">
            <p className=" font-semibold text-md my-2 ">{name}</p>
            <p className=" text-sm  truncate">{caption}</p>
          </div>
          <div className="grid grid-cols-2 justify-evenly my-2 rounded-lg px-2 py-2 ">
            <div className=" text-sm font-semibold mb-2">Cook Time</div>
            <div className=" text-sm font-semibold ml-auto mb-2">Rating</div>

            <div className="flex flex-row  divide-x">
              <span className="my-auto divide-x">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
              {cook_time}{" "}
            </div>
            <p className="font-semibold  flex flex-row ml-auto ">
              {/* {false ? rating : "N/A"} */}
              <span className="my-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 "
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default RecipeCardLanding;
