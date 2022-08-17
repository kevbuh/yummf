import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Link from "next/link";
import { CurlyArrow } from "../utils/arrows";

type CardProps = {
  name: string;
};

const Card = ({ name }: CardProps) => {
  return (
    <div className="my-4 w-full rounded-xl bg-stone-100 px-4 py-12 cursor-pointer hover:shadow-lg flex flex-col">
      <p className="mx-auto truncate font-semibold text-xl my-2">{name}</p>
    </div>
  );
};

function HelpPage() {
  return (
    <div>
      <NavBar />
      <div className="max-w-6xl px-4 mx-auto mb-4">
        <div className="mt-8">
          <div className="rounded-xl w-full my-16">
            <p className="font-semibold text-5xl mb-4">Help Center</p>
            <p className="font-medium text-xl mb-8">
              Search for help from support articles and the community.
            </p>

            <div className="flex flex-row mt-8">
              <button className=" flex  max-w-xs text-xl p-3 rounded-xl font-semibold mr-4">
                View all
              </button>
              <button className=" flex max-w-xs text-xl p-3 rounded-xl bg-black text-white font-semibold">
                Ask a Question
              </button>
            </div>
          </div>

          <hr />

          <div className="rounded-xl w-full my-16">
            <div className="flex flex-row">
              <p className="font-semibold text-5xl mb-4">Common FAQs</p>
              <button className="ml-auto font-semibold">View All</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4">
              <Card name="Unable to sign in" />
              <Card name="Report abuse/copyright" />
              <Card name="Can't upload recipe" />
              <Card name="How do I collect rewards?" />
              <Card name="Give Yummf Feedback" />
              <Card name="Contact" />
            </div>
          </div>

          <CurlyArrow />

          <div className=" border-stone-100 border-4 rounded-xl px-6 py-12 text-rosa font-semibold my-16">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <p className="mx-auto px-8 py-16 text-3xl bg-black rounded-full text-white hidden sm:block">
                yummf
              </p>
              <div className="m-auto">
                <p className="m-auto text-4xl text-black mb-4">
                  Thanks for being a part of our community.
                </p>
                <Link href="/explore">
                  <button className=" flex max-w-xs w-full text-xl p-3 rounded-xl bg-rosa text-white font-semibold text-center">
                    <p className="mx-auto">Start exploring recipes</p>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HelpPage;

// <div>
//   <NavBar />
//   <div className="mt-12 rounded-lg w-2/3 item-center mx-auto">
//     <div>
//       <p className="text-5xl mb-2 text-light">How can we help?</p>
//       <p className="font-light">
//         We&apos;re currently in beta, so let us know about anything.
//       </p>
//     </div>
//     <br />
//     <hr />
//     <br />
//     <div>
//       <Formik
//         initialValues={{ email: "", password: "" }}
//         validationSchema={Yup.object({
//           email: Yup.string().required("Let us know some feedback!"),
//         })}
//         onSubmit={async (values, { setSubmitting }) => {
//           // send feedback here

//           setSubmitting(false);
//         }}
//       >
//         <Form>
//           <div className="rounded-lg border-black my-4 flex flex-col ">
//             <label htmlFor="email" className="my-2">
//               <p className="text-2xl">Support Form</p>
//               <p className="font-light">
//                 Can you describe your issue in a few sentences?
//               </p>
//               <p className="font-light">
//                 This will help our team understand what’s going on.
//               </p>
//             </label>
//             <Field
//               name="email"
//               type="email"
//               placeholder="Enter feedback here..."
//               component="textarea"
//               className="p-2 my-1 rounded-lg bg-stone-100 h-40"
//             />
//             <ErrorMessage name="email">
//               {(msg) => <p className="text-red-600">{msg}</p>}
//             </ErrorMessage>

//             <button
//               type="submit"
//               className="w-full sm:w-40 mx-auto rounded-lg py-2 mt-2 bg-stone-100 hover:bg-pink-600 hover:text-white "
//             >
//               Submit
//             </button>
//           </div>
//         </Form>
//       </Formik>
//     </div>
//     <br />
//     <hr />
//     <br />
//     <p className="text-2xl pt-4">
//       Here are some links that might be helpful
//     </p>

//     <div className="grid grid-cols-2 gap-4 mt-4 mx-auto">
//       <Link href="/account/info">
//         <button className="py-6 rounded-lg shadow border">
//           Personal Info
//         </button>
//       </Link>
//       <Link href="/account/security">
//         <button className="py-6 rounded-lg shadow border">
//           Login & Security
//         </button>
//       </Link>
//       <Link href="/account/privacy">
//         <button className="py-6 rounded-lg shadow border">Privacy</button>
//       </Link>
//       <Link href="/account/preferences">
//         <button className="py-6 rounded-lg shadow border">
//           Preferences
//         </button>
//       </Link>
//     </div>
//     <div className="h-40"></div>
//   </div>
//   <Footer />
// </div>
