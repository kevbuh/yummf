import React from "react";

type CardProps = {
  name: string;
};

const Card = ({ name }: CardProps) => {
  return (
    <div className="h-80 rounded-xl bg-emerald-300 p-4 flex cursor-pointer w-full">
      <p className="font-semibold text-xl mr-auto mt-auto">{name}</p>
    </div>
  );
};

function LandingShow() {
  return (
    <div className="rounded-xl bg-emerald-100 mx-4 p-6 flex flex-row justify-around">
      <div className="grid grid-cols-1 my-auto mr-4 max-w-xs">
        <div className="flex flex-row">
          <p className="text-4xl font-semibold italic mb-2">Playlists</p>
          <p className="text-4xl font-medium mb-2 not-italic">
            &nbsp; For Food{" "}
          </p>
        </div>
        {/* <hr /> */}
        <p className=" font-light my-4">
          {" "}
          Upload your own favorite collections, or explore ones that suit your
          needs.{" "}
        </p>
        <button className="rounded-xl bg-black text-white font-semibold p-2 ">
          Explore all
        </button>
      </div>

      <div className="rounded-xl grid grid-cols-3 gap-4 w-full">
        <Card name="Adventurous" />
        <Card name="Super Healthy" />
        <Card name="Break meal" />
      </div>
    </div>
  );
}

export default LandingShow;
