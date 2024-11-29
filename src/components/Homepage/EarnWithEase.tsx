import riverside from "../../assets/riverside.jpg";

const EarnWithEase = () => {
  return (
    <div className="flex flex-wrap text-primary font-inter justify-center mt-10">
      {/* Image Section */}
      <div className="w-full sm:w-1/2 rounded-lg overflow-hidden">
        <img className="rounded-lg w-full h-full object-cover" src={riverside} alt="Riverside View" />
      </div>

      {/* Text Section */}
      <div className="w-full sm:w-1/2 p-4 flex flex-col justify-center">
        <h2 className="font-bold text-2xl">Earn with Ease: Rent Out Your Property</h2>
        <p className="mt-4">
          Turn your space into a source of income by hosting
          travelers from around the world. With StayNest,
          it’s easy to list, manage, and earn from your property.
          Whether it’s a cozy guest room or a luxury getaway,
          you’ll have complete control over your bookings and
          flexible options to suit your schedule. Join our community
          of hosts and unlock the potential of your property today!
        </p>
      </div>
    </div>
  );
};

export default EarnWithEase;
