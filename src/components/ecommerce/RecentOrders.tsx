import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
// import Badge from "../ui/badge/Badge";
import { useFraudsters } from "../../hooks/useFraudster";
import { Button, notification, Popconfirm } from "antd";
import { useEffect, useState } from "react";

export default function RecentOrders() {
  const { getFraudster, deleteFraudster } = useFraudsters();
  const [name, setName] = useState("");
  const [passportCode, setPassportCode] = useState("");
  const [query, setQuery] = useState({ search: "", passportCode: "" });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setQuery({ search: name, passportCode });
    }, 2000);

    return () => clearTimeout(timeout);
  }, [name, passportCode]);

  const { data, isLoading, error } = getFraudster(query);

  const [api, contextHolder] = notification.useNotification(); // ✅ hook doim render boshida

  if (isLoading) return <p>Yuklanmoqda...</p>;
  if (error) return <p>Xatolik yuz berdi!</p>;

  const handleDelete = async (id: string, record: any) => {
    try {
      await deleteFraudster.mutateAsync(id);
      api.success({
        message: "Muvaffaqiyatli!",
        description: `✅ ${record.name} ${record.surname} o‘chirildi`,
        placement: "topRight",
        style: {
          background: "#1f2937",
          color: "#fff",
          borderRadius: 8,
          marginTop: "40px",
        },
      });
    } catch (err: any) {
      api.error({
        message: "Xatolik!",
        description: `❌ ${err?.response?.data?.message || "Server xatosi"}`,
        placement: "topRight",
        style: {
          background: "#1f2937",
          color: "#fff",
          borderRadius: 8,
          marginTop: "40px",
        },
      });
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      {contextHolder}
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Firibgarlar
          </h3>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ism qidirish..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg border px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
          />
          <input
            type="text"
            placeholder="Passport Code qidirish..."
            value={passportCode}
            onChange={(e) => setPassportCode(e.target.value)}
            className="rounded-lg border px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
          />
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
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Action
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
                <TableCell className="py-3 text-gray-500 text-sm">
                  <Popconfirm
                    title="O‘chirishni tasdiqlaysizmi?"
                    okText="Ha"
                    cancelText="Yo‘q"
                    onConfirm={() => handleDelete(item.id, item)}
                  >
                    <Button
                      style={{
                        background: "linear-gradient(90deg, #ef4444, #dc2626)",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        padding: "6px 18px",
                        fontWeight: 600,
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                          "linear-gradient(90deg, #dc2626, #b91c1c)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background =
                          "linear-gradient(90deg, #ef4444, #dc2626)")
                      }
                    >
                      O‘chirish
                    </Button>
                  </Popconfirm>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
