import React, { useState } from "react";
import deleteBookings from "../../functions/api/deleteBookings";
import updateBooking from "../../functions/api/updateBooking";

type Booking = {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
};

interface BookingDataModalProps {
  isOpen: boolean;
  bookingData: Booking[];
  closeModal: () => void;
}

const BookingsModal: React.FC<BookingDataModalProps> = ({
  isOpen,
  bookingData,
  closeModal,
}) => {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedBooking(null);
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={closeModal}
      >
        <div
          className="bg-white p-6 rounded-lg max-w-sm mx-auto mt-20"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-semibold mb-4">Your Bookings</h2>
          {bookingData.length === 0 ? (
            <p>No bookings available</p>
          ) : (
            <ul className="space-y-4">
              {bookingData.map((booking) => (
                <li
                  key={booking.id}
                  className="border-b border-gray-300 pb-2 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-medium">{booking.id}</h3>
                    <p>From: {new Date(booking.dateFrom).toLocaleDateString()}</p>
                    <p>To: {new Date(booking.dateTo).toLocaleDateString()}</p>
                    <p>Guests: {booking.guests}</p>
                  </div>
                  <button
                    onClick={() => openEditModal(booking)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ⚙️
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      {selectedBooking && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-50 ${
            isEditModalOpen ? "block" : "hidden"
          }`}
          onClick={closeEditModal}
        >
          <div
            className="bg-white p-6 rounded-lg max-w-sm mx-auto mt-20"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">Edit Booking</h2>
            <p>ID: {selectedBooking.id}</p>
            <div className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  From
                </label>
                <input
                  type="date"
                  value={selectedBooking.dateFrom}
                  onChange={(e) =>
                    setSelectedBooking({
                      ...selectedBooking,
                      dateFrom: e.target.value,
                    })
                  }
                  className="w-full border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  To
                </label>
                <input
                  type="date"
                  value={selectedBooking.dateTo}
                  onChange={(e) =>
                    setSelectedBooking({
                      ...selectedBooking,
                      dateTo: e.target.value,
                    })
                  }
                  className="w-full border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Guests
                </label>
                <input
                  type="number"
                  value={selectedBooking.guests}
                  onChange={(e) =>
                    setSelectedBooking({
                      ...selectedBooking,
                      guests: parseInt(e.target.value, 10),
                    })
                  }
                  className="w-full border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => {
                  if (selectedBooking) {
                    deleteBookings(selectedBooking.id);
                    closeEditModal();
                  }
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  if (selectedBooking) {
                    updateBooking(selectedBooking.id, selectedBooking);
                    closeEditModal();
                  }
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingsModal;
