import React from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import TextAreaInput from "../../components/form/form-elements/TextAreaInput";

function FiribgarAdd() {
  return (
    <div>
      <PageMeta
        title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Firibgar qo'shish" />
      <div className="flex">
        <div className="space-y-6 flex flex-col items-center justify-between w-full xl:flex-row">
          <div className="flex flex-col items-center justify-center">
            <TextAreaInput />
            {/* <button className="bg-red-600 text-3xl mt-3 text-white p-[14px] rounded-2xl border-black border-2 xl:mt-8">Nasiya mijozni qo'shish</button> */}
          </div>
          {/* <TextAreaInput />
          <InputStates /> */}
        </div>
      </div>
    </div>
  );
}

export default React.memo(FiribgarAdd);
