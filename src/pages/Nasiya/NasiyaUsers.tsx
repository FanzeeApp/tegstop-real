import React, { useState } from "react";
import { useCostumers } from "../../hooks/useNasiya";
import { Button, Input, Select, notification } from "antd";
import { getPassport } from "../../hooks/usePassport";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../hooks/api";
import CustomerTable from "../../components/CustomerTable";

const NasiyaUsers = () => {
  const { getCustomerMy } = useCostumers();
  const { data: passport } = getPassport();
  const { data: allCustomers, isLoading, error } = getCustomerMy();

  const [passportId, setPassportId] = useState<string>("");
  const [passportCode, setPassportCode] = useState<string>("");

  // ✅ notification hook
  const [notifApi, contextHolder] = notification.useNotification();

  // Qidiruv API
  const searchMutation = useMutation({
    mutationFn: async (body: { passportId: string; passportCode: string }) => {
      const res = await api.get("nasiya/nasiya/search", { params: body });
      return res.data;
    },
    onSuccess: (data) => {
      notifApi.success({
        message: "Muvaffaqiyatli!",
        description: `✅ Ushbu user: ${
          data?.checkNasiya?.fullname || "Noma'lum"
        } topildi va nasiya savdodan foydalanmoqda!`,
        placement: "topRight",
        style: {
          background: "#1f2937",
          color: "#fff",
          borderRadius: "8px",
          fontWeight: "bold",
          marginTop: "50px",
        },
      });
    },
    onError: (err: any) => {
      if (err.response?.status === 404) {
        notifApi.error({
          message: "Topilmadi!",
          description: "❌ Ushbu user nasiya savdodan foydalanmayapti!",
          placement: "topRight",
          style: {
            background: "#7f1d1d",
            color: "#fff",
            borderRadius: "8px",
            fontWeight: "bold",
            marginTop: "50px",
          },
        });
      } else {
        notifApi.error({
          message: "Xatolik!",
          description: "Noma'lum xatolik yuz berdi!",
          placement: "topRight",
        });
      }
    },
  });

  const handleSearch = () => {
    if (!passportId || !passportCode) {
      notifApi.warning({
        message: "Diqqat!",
        description: "Iltimos, passport seriya va kodni kiriting!",
        placement: "topRight",
      });
      return;
    }
    searchMutation.mutate({ passportId, passportCode });
  };

  if (isLoading) {
    return <p className="text-gray-600 dark:text-gray-300">Yuklanmoqda...</p>;
  }

  if (error) {
    return <p className="text-red-500">Xatolik yuz berdi!</p>;
  }

  // User topilsa faqat bitta object qaytadi
  const customers = searchMutation.data?.checkNasiya
    ? [searchMutation.data.checkNasiya]
    : allCustomers?.data || [];

  return (
    <div
      className="rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm 
                 dark:border-gray-700 dark:bg-gray-900"
    >
      {/* Notification holder */}
      {contextHolder}

      {/* Header */}
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          📋 Nasiya Mijozlar
        </h3>
      </div>

      {/* Qidiruv formasi */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <Select
          placeholder="Passport seriya tanlang"
          className="w-40 dark:bg-gray-800 dark:text-white dark:border-gray-700 
             bg-white text-gray-800 border-gray-300 rounded-md"
          onChange={(val) => setPassportId(val)}
          options={passport?.map((p: any) => ({
            label: p.series,
            value: p.id,
          }))}
        />

        <Input
          placeholder="Passport kodi (1234567)"
          value={passportCode}
          onChange={(e) => setPassportCode(e.target.value)}
          className="w-40 dark:bg-gray-800 dark:text-white dark:border-gray-700 
             bg-white text-gray-800 border-gray-300 rounded-md"
        />

        <Button
          type="primary"
          onClick={handleSearch}
          loading={searchMutation.isPending}
        >
          Qidirish
        </Button>
      </div>

      {/* Jadval */}
      <CustomerTable customers={customers} />
    </div>
  );
};

export default React.memo(NasiyaUsers);
