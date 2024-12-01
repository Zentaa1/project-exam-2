import React from "react";

interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
}

interface CustomerModalProps {
  isOpen: boolean;
  bookings: Booking[];
  onClose: () => void;
}

const CustomerModal: React.FC<CustomerModalProps> = ({ isOpen, bookings, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Customer Bookings</h2>
        <div className="space-y-4">
          {bookings.length === 0 ? (
            <p>No bookings available.</p>
          ) : (
            bookings.map((booking) => (
              <div key={booking.id} className="border-b border-gray-300 pb-4">
                <p>From: {new Date(booking.dateFrom).toLocaleDateString()}</p>
                <p>To: {new Date(booking.dateTo).toLocaleDateString()}</p>
                <p>Guests: {booking.guests}</p>
              </div>
            ))
          )}
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 p-2 rounded-lg font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerModal;
