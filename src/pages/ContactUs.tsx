import { Helmet } from "react-helmet";

const ContactUs = () => {
  return (
    <div className="container mx-auto flex justify-center items-center text-primary py-10">
      <Helmet>
        <title>Contact Us - StayNest</title>
        <meta name="description" content="Come in touch with us at staynest!"/>
      </Helmet>
      <div className="flex flex-col shadow-md w-full sm:w-3/4 md:w-3/4 lg:w-2/3 xl:w-1/2 p-6 space-y-4 rounded-md">
        <h1 className="text-2xl font-bold text-left">Contact Us</h1>
        <form>
          <div className="flex flex-col text-left">
            <label className="text-xl font-medium">E-Mail:</label>
            <input
              type="text"
              placeholder="mariusbje@stud.noroff.no"
              className="text-xl bg-inputBg p-2 rounded-md"
            />
          </div>

          <div className="flex flex-col text-left mt-3">
            <label className="text-xl font-medium">Phone Number:</label>
            <input
              type="text"
              placeholder="+12 123 45 678"
              className="text-xl bg-inputBg p-2 rounded-md"
            />
          </div>

          <div className="flex flex-col text-left mt-3 h-auto">
            <label className="text-xl font-medium mb-2">Message:</label>
            <textarea
              placeholder="Message"
              className="text-xl bg-inputBg p-2 rounded-md h-40"
            />
          </div>

          <button
            type="submit"
            className="bg-customOrange w-full mt-5 font-bold text-xl p-2 rounded-md"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
