import React, { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import DefaultInputs from "../../components/form/form-elements/DefaultInputs";
import PageMeta from "../../components/common/PageMeta";
import SelectInputs from "../../components/form/form-elements/SelectInputs";
import { useCostumers } from "../../hooks/useNasiya";
import { Button, notification } from "antd";

function FormElements() {
  const { createCustomer } = useCostumers();

  const [api, contextHolder] = notification.useNotification();

  const [formData, setFormData] = useState({
    productName: "",
    phoneImei: "",
    time: "",
    downPayment: "",
    monthlyPayment: "",
    productImage: null as File | null,

    name: "",
    surname: "",
    phoneNumber: "",
    passportId: "",
    passportCode: "",
    userImage: null as File | null,
  });

  const handleSubmit = async () => {
    try {
      console.log("Yig‘ilgan ma’lumot:", formData);

      createCustomer.mutate(formData, {
        onSuccess: () => {
          api.success({
            message: "Muvaffaqiyatli!",
            description: "✅ Mijoz muvaffaqiyatli saqlandi!",
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
        onError: (error: any) => {
          // Backenddan kelgan xato xabari
          const errorMsg =
            error?.response?.data?.message || // agar backend message qaytarsa
            error?.message || // yoki umumiy xato
            "Noma’lum xatolik yuz berdi ❌";

          api.error({
            message: "Xatolik!",
            description: errorMsg,
            placement: "topRight",
            style: {
              background: "#7f1d1d",
              color: "#fff",
              borderRadius: "8px",
              fontWeight: "bold",
              marginTop: "50px",
            },
          });

          console.error("Xatolik:", error);
        },
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {contextHolder}
      <PageMeta
        title="React.js Form Elements Dashboard"
        description="Form elements with two forms combined"
      />
      <PageBreadcrumb pageTitle="Nasiya mijoz qo'shish" />

      <div className="flex flex-col xl:flex-row gap-8 mt-6">
        {/* Chap tomondagi forma */}
        <div className="w-full xl:w-1/2">
          <DefaultInputs formData={formData} setFormData={setFormData} />
        </div>

        {/* O‘ng tomondagi forma */}
        <div className="w-full xl:w-1/2">
          <SelectInputs formData={formData} setFormData={setFormData} />
          <Button
            type="primary"
            size="large"
            loading={createCustomer.isPending} // tugma bosilganda loading bo‘ladi
            onClick={handleSubmit}
            className="mt-4"
          >
            Nasiya mijozni qo'shish
          </Button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(FormElements);
