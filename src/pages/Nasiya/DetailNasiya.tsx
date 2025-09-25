import React from "react";
import { useCostumers } from "../../hooks/useNasiya";
import { useParams, Link } from "react-router-dom";
import {
  FaUser,
  FaPhone,
  FaPassport,
  FaCalendarAlt,
  FaMobileAlt,
  FaDollarSign,
  FaClock,
  FaArrowLeft,
  FaRegCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
} from "react-icons/fa";

const DetailNasiya = () => {
  const { id } = useParams();
  const { getOneCustomer } = useCostumers();
  const { data, isLoading, error } = getOneCustomer(id || "");

  const mijoz = data?.data ?? data ?? null;

  if (isLoading)
    return (
      <p className="text-gray-600 dark:text-gray-300">⏳ Yuklanmoqda...</p>
    );
  if (error) return <p className="text-red-500">❌ Xatolik yuz berdi!</p>;
  if (!mijoz) return <p>⚠️ Ma’lumot topilmadi</p>;

  return (
    <div className="max-w-4xl mx-auto rounded-2xl border border-gray-200 bg-white px-4 py-6 shadow-md dark:border-gray-700 dark:bg-gray-900 sm:px-8">
      {/* Sarlavha */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          📋 Nasiya tafsilotlari
        </h1>
        <Link
          to="/nasiya"
          className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
        >
          <FaArrowLeft /> Orqaga qaytish
        </Link>
      </div>

      {/* Mijoz ma’lumotlari */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-5 border-b pb-5 mb-6 dark:border-gray-700">
        <img
          src={mijoz.userImage}
          alt={mijoz.name}
          className="h-24 w-24 rounded-full object-cover border border-gray-200 dark:border-gray-600 mx-auto sm:mx-0"
        />
        <div className="text-center sm:text-left space-y-2">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
            <FaUser /> {mijoz.name} {mijoz.surname}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
            <FaPhone /> {mijoz.phoneNumber}
          </p>
          <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
            <FaPassport /> {mijoz.passportCode} ({mijoz.Passport?.series})
          </p>
          <p className="text-gray-500 text-sm dark:text-gray-400 flex items-center gap-2">
            <FaCalendarAlt /> Ro‘yxatga olingan sana:{" "}
            {new Date(mijoz.createdAt).toLocaleDateString("uz-UZ")}
          </p>
        </div>
      </div>

      {/* Mahsulot ma’lumotlari */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Rasm */}
        <div className="flex items-center justify-center">
          <img
            src={mijoz.productImage}
            alt={mijoz.productName}
            className="w-full max-h-72 rounded-lg object-contain border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-3"
          />
        </div>

        {/* Tafsilotlar */}
        <div className="space-y-3 text-gray-700 dark:text-gray-300">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
            <FaMobileAlt /> {mijoz.productName}
          </h3>
          <p className="flex items-center gap-2">
            <FaDollarSign /> Oldindan to‘lov:{" "}
            <span className="font-medium">{mijoz.downPayment} $</span>
          </p>
          <p className="flex items-center gap-2">
            <FaDollarSign /> Oylik to‘lov:{" "}
            <span className="font-medium">{mijoz.monthlyPayment} $</span>
          </p>
          <p className="flex items-center gap-2">
            <FaClock /> Muddat:{" "}
            <span className="font-medium">{mijoz.time} oy</span>
          </p>
          <p className="flex items-center gap-2">
            <FaMobileAlt /> IMEI:{" "}
            <span className="font-medium">{mijoz.phoneImei}</span>
          </p>
          <p className="flex items-center gap-2">
            {mijoz.status === "pending" && (
              <FaHourglassHalf className="text-orange-500" />
            )}
            {mijoz.status === "approved" && (
              <FaRegCheckCircle className="text-green-500" />
            )}
            {mijoz.status === "rejected" && (
              <FaTimesCircle className="text-red-500" />
            )}
            Holati:{" "}
            <span
              className={`font-semibold ${
                mijoz.status === "pending"
                  ? "text-orange-500"
                  : mijoz.status === "approved"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {mijoz.status === "pending"
                ? "Foydalanmoqda"
                : mijoz.status === "approved"
                ? "Tasdiqlangan"
                : "Rad etilgan"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DetailNasiya);
