import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFraudsters } from "../../hooks/useFraudster";
import {
  FaMapMarkerAlt,
  FaPassport,
  FaRegStickyNote,
  FaCalendarAlt,
  FaUserShield,
} from "react-icons/fa";

const DetailFraudster = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getOneFraudster } = useFraudsters();
  const { data, isLoading, error } = getOneFraudster(id || "");

  if (isLoading) return <p>Yuklanmoqda...</p>;
  if (error) return <p>Xatolik yuz berdi!</p>;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8">
      {/* Card */}
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900 p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-10">
        {/* Image chap tomonda */}
        <div className="flex-shrink-0 flex justify-center md:justify-start items-start">
          <img
            src={data?.image}
            alt={data?.name}
            className="w-48 h-48 sm:w-60 sm:h-60 md:w-80 md:h-80 rounded-2xl object-cover shadow-lg"
          />
        </div>

        {/* Info o‘ng tomonda */}
        <div className="flex-1 space-y-4 sm:space-y-6 text-gray-800 dark:text-gray-100 text-base sm:text-lg">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            {data?.name} {data?.surname}
          </h2>

          <div className="flex items-center gap-3 sm:gap-4">
            <FaMapMarkerAlt className="text-red-500 text-xl sm:text-2xl md:text-3xl" />
            <p>
              <span className="font-semibold">Manzil:</span> {data?.location}
            </p>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <FaPassport className="text-blue-500 text-xl sm:text-2xl md:text-3xl" />
            <p>
              <span className="font-semibold">Passport:</span>{" "}
              {data?.passport?.series} {data?.passportCode}
            </p>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <FaRegStickyNote className="text-yellow-500 text-xl sm:text-2xl md:text-3xl" />
            <p>
              <span className="font-semibold">Tavsif:</span>{" "}
              {data?.description || "Yo‘q"}
            </p>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <FaUserShield className="text-purple-500 text-xl sm:text-2xl md:text-3xl" />
            <p>
              <span className="font-semibold">Kim qo‘shdi:</span>{" "}
              {data?.user?.name}
            </p>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <FaCalendarAlt className="text-green-500 text-xl sm:text-2xl md:text-3xl" />
            <p>
              <span className="font-semibold">Qo‘shilgan vaqt:</span>{" "}
              {new Date(data?.createdAt).toLocaleString("uz-UZ")}
            </p>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="p-6 flex justify-center">
        <button
          onClick={() => navigate(-1)}
          className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl sm:rounded-2xl shadow-md hover:opacity-90 transition"
        >
          ⬅ Orqaga qaytish
        </button>
      </div>
    </div>
  );
};

export default React.memo(DetailFraudster);
