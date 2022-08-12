import NavBar from "../components/NavBar";
import Link from "next/link";
import { useRouter } from "next/router";

function ConfirmRecipe() {
  const { query } = useRouter();

  const type_question = query.type?.slice(0, 4) == "qas_";

  return (
    <div>
      <NavBar />
      <div className="flex flex-col items-center my-16 max-w-md mx-auto min-h-screen">
        <p className="text-6xl font-semibold mb-8">Success!</p>
        <p className="font-light text-xl">
          Your recipe has been successfully uploaded.
        </p>
        <p className="font-light text-xl">
          You can view it{" "}
          <Link
            href={
              type_question
                ? `/community/discussion/${query.type}`
                : `/recipes/${query.type}`
            }
          >
            <span className="underline cursor-pointer">here.</span>
          </Link>
        </p>
        <hr />
      </div>
    </div>
  );
}

export default ConfirmRecipe;
