export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <p className="mt-20 mb-20 text-7xl mx-auto font-bold border-4 border-rosa text-rosa rounded-full py-24 px-12 hover:text-white hover:bg-rosa hover:cursor-pointer">
        kooki
      </p>

      <div className="flex flex-row space-x-4">
        <button className="text-xl rounded-2xl bg-rosa text-white p-3">
          Log in
        </button>
        <button className="text-xl rounded-2xl bg-stone-100 p-3">
          Sign Up!
        </button>
        <button className="text-xl rounded-2xl bg-stone-100 p-3">test</button>
      </div>
    </div>
  );
}
