import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function SearchResultPage() {
  return (
    <>
      <NavBar />
      <div className=" flex flex-col justify-self-center  mx-6 my-5 self-center items-center">
        <div className="w-2/3 flex flex-col">
          <div className="flex flex-col items-center my-10">
            {true ? (
              <p className="text-3xl mt-6 mb-96">No Search Results!</p>
            ) : (
              <p className="text-3xl mt-6">Search Results</p>
            )}
          </div>
          <div className="grid grid-cols-4 ">{/* put cards here */}</div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SearchResultPage;
