import React from "react";
import { useCostumers } from "../../hooks/useNasiya";
import { Button } from "antd";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

const NasiyaUsers = () => {
  const { getCustomerMy } = useCostumers();
  const { data, isLoading, error } = getCustomerMy();

  if (isLoading)
    return <p className="text-gray-600 dark:text-gray-300">Yuklanmoqda...</p>;
  if (error) return <p className="text-red-500">Xatolik yuz berdi!</p>;

  return (
    <div
      className="rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm 
                    dark:border-gray-700 dark:bg-gray-900"
    >
      {/* Header */}
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          📋 Nasiya Mijozlar
        </h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50 dark:bg-gray-800">
            <TableRow>
              <TableCell
                isHeader
                className="w-[30%] py-3 font-semibold text-gray-700 dark:text-gray-200"
              >
                Foydalanuvchi
              </TableCell>
              <TableCell
                isHeader
                className="w-[15%] py-3 font-semibold text-gray-700 dark:text-gray-200"
              >
                Passport
              </TableCell>
              <TableCell
                isHeader
                className="w-[20%] py-3 font-semibold text-gray-700 dark:text-gray-200"
              >
                Telefon
              </TableCell>
              <TableCell
                isHeader
                className="w-[20%] py-3 font-semibold text-gray-700 dark:text-gray-200"
              >
                Sana
              </TableCell>
              <TableCell
                isHeader
                className="w-[15%] py-3 font-semibold text-gray-700 dark:text-gray-200"
              >
                Amal
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-700">
            {data?.data?.map((item: any) => (
              <TableRow
                key={item.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                {/* Foydalanuvchi */}
                <TableCell className="w-[30%] flex items-center gap-3 py-3">
                  <img
                    src={item.userImage}
                    alt={item.name}
                    className="h-10 w-10 rounded-full object-cover border border-gray-200 dark:border-gray-600"
                  />
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {item.name} {item.surname}
                  </span>
                </TableCell>

                {/* Passport */}
                <TableCell className="w-[15%] py-3 text-gray-700 dark:text-gray-300">
                  {item.passportCode}
                </TableCell>

                {/* Telefon */}
                <TableCell className="w-[20%] py-3 text-gray-700 dark:text-gray-300">
                  {item.phoneNumber}
                </TableCell>

                {/* Sana */}
                <TableCell className="w-[20%] py-3 text-gray-500 dark:text-gray-400 text-sm">
                  {new Date(item.createdAt).toLocaleDateString("uz-UZ")}
                </TableCell>

                {/* Amal */}
                <TableCell className="w-[15%] py-3">
                  <Link to={`/nasiya/${item.id}`}>
                    <Button type="primary" size="small">
                      Batafsil
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default React.memo(NasiyaUsers);
