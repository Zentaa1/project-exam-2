import city from "../../assets/city.jpg";
import beach from "../../assets/beach.jpg";
import mountain from "../../assets/mountain.jpg";

const OurTravelingTips = () => {
  return (
    <div className="text-primary font-inter">
      <h2 className="text-left text-3xl font-bold mt-10">Our Traveling Tips</h2>
      <div className="flex flex-wrap lg:flex-nowrap justify-between gap-4 h-auto lg:h-96 mt-6">
        <div className="w-full lg:w-1/2 rounded-lg shadow-2xl text-left my-2">
          <div className="h-4/6 rounded-t-lg overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={mountain}
              alt="Mountain"
            />
          </div>
          <div className="p-4">
            <h2 className="font-bold text-2xl">Free canceling 7 days before going</h2>
            <p className="text-xl mt-4">Read more about our canceling policy</p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-between text-left">
          <div className="flex flex-col lg:flex-row h-full my-2 shadow-2xl rounded-lg">
            <div className="w-full lg:w-44 h-full rounded-t-lg lg:rounded-l-lg overflow-hidden">
              <img className="w-full h-full object-cover" src={beach} alt="Beach" />
            </div>
            <div className="flex-1 p-4">
              <h2 className="font-bold text-xl">Best rated venues</h2>
              <p className="text-lg">Discover our best rated venues, all over the world!</p>
              <p className="mt-4 text-lg">Book your dream vacation today!</p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row h-full my-2 shadow-2xl rounded-lg">
            <div className="w-full lg:w-44 h-full rounded-t-lg lg:rounded-l-lg overflow-hidden">
              <img className="w-full h-full object-cover" src={city} alt="City" />
            </div>
            <div className="flex-1 p-4">
              <h2 className="font-bold text-xl">City vacation?</h2>
              <p className="text-lg">Discover the best venues you can find in a big city!</p>
              <p className="mt-4 text-lg">Only at StayNest</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurTravelingTips;
