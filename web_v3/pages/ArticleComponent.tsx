import Link from "next/link";

type CardPropsNew = {
  name: string;
  id: number;
};

const NewCard = ({ name, id }: CardPropsNew) => {
  return (
    <Link href={`/learn/${id}`}>
      <div className="h-80 rounded-xl bg-stone-100 p-4 flex cursor-pointer">
        <a className="font-semibold text-xl mr-auto mt-auto">{name}</a>
      </div>
    </Link>
  );
};

export default NewCard;
