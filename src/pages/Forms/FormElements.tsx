import React, { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import DefaultInputs from "../../components/form/form-elements/DefaultInputs";
import PageMeta from "../../components/common/PageMeta";
import SelectInputs from "../../components/form/form-elements/SelectInputs";
import { useCostumers } from "../../hooks/useNasiya";
import { notification } from "antd";

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

      // backendga yuborish
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
              marginTop: "40px",
            },
          });
        },
        onError: (error) => {
          console.error("Xatolik:", error);
          alert("Mijoz qo'shilmadi ❌");
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
          <button
            onClick={handleSubmit}
            className="bg-red-600 text-lg mt-4 text-white px-6 py-3 rounded-xl border border-black"
          >
            Nasiya mijozni qo'shish
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(FormElements);