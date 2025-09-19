import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
// import Badge from "../ui/badge/Badge";
import { useFraudsters } from "../../hooks/useFraudster";

export default function RecentOrders() {
  const { getFraudster } = useFraudsters();
  const { data, isLoading, error } = getFraudster();

  if (isLoading) return <p>Yuklanmoqda...</p>;
  if (error) return <p>Xatolik yuz berdi!</p>;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Recent Fraudsters
          </h3>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Image
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Name
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Surname
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Location
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Passport
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Created At
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {data?.data?.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell className="py-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-[50px] w-[50px] rounded-md object-cover"
                  />
                </TableCell>
                <TableCell className="py-3 text-gray-700 dark:text-gray-300">
                  {item.name}
                </TableCell>
                <TableCell className="py-3 text-gray-700 dark:text-gray-300">
                  {item.surname}
                </TableCell>
                <TableCell className="py-3 text-gray-700 dark:text-gray-300">
                  {item.location}
                </TableCell>
                <TableCell className="py-3 text-gray-700 dark:text-gray-300">
                  {item.passport?.series} {item.passportCode}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-sm">
                  {new Date(item.createdAt).toLocaleDateString("uz-UZ")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
