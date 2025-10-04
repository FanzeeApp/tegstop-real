// components/NasiyaUserCard.tsx
import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

interface NasiyaUserCardProps {
  data: any; // kerak bo‘lsa type yozib beraman
}

const NasiyaUserCard: React.FC<NasiyaUserCardProps> = ({ data }) => {
  return (
    <div className="rounded-xl border p-4 shadow-md bg-white dark:bg-gray-900">
      <div className="flex items-center gap-3 mb-3">
        <img
          src={data.userImage}
          alt={data.name}
          className="h-12 w-12 rounded-full border object-cover"
        />
        <div>
          <h2 className="font-bold text-lg text-gray-800 dark:text-gray-200">
            {data.name} {data.surname}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            📱 {data.phoneNumber}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <p>
          📄 Passport: {data.Passport?.series} {data.passportCode}
        </p>
        <p>📦 Mahsulot: {data.productName}</p>
        <p>💰 To‘lov: {data.monthlyPayment} / oy</p>
        <p>🔻 Dastlabki to‘lov: {data.downPayment}</p>
        <p>📆 Sana: {new Date(data.createdAt).toLocaleDateString("uz-UZ")}</p>
        <p>🟢 Holat: {data.status}</p>
      </div>

      <div className="mt-4">
        <Link to={`/nasiya/${data.id}`}>
          <Button type="primary">Batafsil</Button>
        </Link>
      </div>
    </div>
  );
};

export default NasiyaUserCard;
