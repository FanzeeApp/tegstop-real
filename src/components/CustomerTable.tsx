import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "./ui/table";

interface CustomerTableProps {
  customers: any[];
}

const CustomerTable: React.FC<CustomerTableProps> = ({ customers }) => {
  if (!customers || customers.length === 0) {
    return (
      <p className="text-gray-500 dark:text-gray-300 py-5 text-center">
        Hech qanday mijoz topilmadi
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-gray-50 dark:bg-gray-800">
          <TableRow>
            <TableCell isHeader className="w-[30%]">
              Foydalanuvchi
            </TableCell>
            <TableCell isHeader className="w-[15%]">
              Passport
            </TableCell>
            <TableCell isHeader className="w-[20%]">
              Telefon
            </TableCell>
            <TableCell isHeader className="w-[20%]">
              Sana
            </TableCell>
            <TableCell isHeader className="w-[15%]">
              Amal
            </TableCell>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-gray-100 dark:divide-gray-700">
          {customers.map((item: any) => (
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
                {item.passportSeries} {item.passportCode}
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
  );
};

export default React.memo(CustomerTable);
