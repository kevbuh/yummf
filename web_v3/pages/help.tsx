import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Link from "next/link";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function HelpPage() {
  return (
    <div>
      <NavBar />
      <div className="mt-12 rounded-lg w-2/3 item-center mx-auto">
        <div>
          <p className="text-5xl mb-2 text-light">How can we help?</p>
          <p className="font-light">
            We&apos;re currently in beta, so let us know about anything.
          </p>
        </div>
        <br />
        <hr />
        <br />
        <div>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={Yup.object({
              email: Yup.string().required("Let us know some feedback!"),
            })}
            onSubmit={async (values, { setSubmitting }) => {
              // send feedback here

              setSubmitting(false);
            }}
          >
            <Form>
              <div className="rounded-lg border-black my-4 flex flex-col ">
                <label htmlFor="email" className="my-2">
                  <p className="text-2xl">Support Form</p>
                  <p className="font-light">
                    Can you describe your issue in a few sentences?
                  </p>
                  <p className="font-light">
                    This will help our team understand what’s going on.
                  </p>
                </label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Enter feedback here..."
                  component="textarea"
                  className="p-2 my-1 rounded-lg bg-stone-100 h-40"
                />
                <ErrorMessage name="email">
                  {(msg) => <p className="text-red-600">{msg}</p>}
                </ErrorMessage>

                <button
                  type="submit"
                  className="w-full sm:w-40 mx-auto rounded-lg py-2 mt-2 bg-stone-100 hover:bg-pink-600 hover:text-white "
                >
                  Submit
                </button>
              </div>
            </Form>
          </Formik>
        </div>
        <br />
        <hr />
        <br />
        <p className="text-2xl pt-4">
          Here are some links that might be helpful
        </p>

        <div className="grid grid-cols-2 gap-4 mt-4 mx-auto">
          <Link href="/account/info">
            <button className="py-6 rounded-lg shadow border">
              Personal Info
            </button>
          </Link>
          <Link href="/account/security">
            <button className="py-6 rounded-lg shadow border">
              Login & Security
            </button>
          </Link>
          <Link href="/account/privacy">
            <button className="py-6 rounded-lg shadow border">Privacy</button>
          </Link>
          <Link href="/account/preferences">
            <button className="py-6 rounded-lg shadow border">
              Preferences
            </button>
          </Link>
        </div>
        <div className="h-40"></div>
      </div>
      <Footer />
    </div>
  );
}

export default HelpPage;
