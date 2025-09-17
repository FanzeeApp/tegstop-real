import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import DefaultInputs from "../../components/form/form-elements/DefaultInputs";
import PageMeta from "../../components/common/PageMeta";
import SelectInputs from "../../components/form/form-elements/SelectInputs";

export default function FormElements() {
  return (
    <div>
      <PageMeta
        title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Form Elements Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Nasiya mijoz qo'shish" />

      {/* Form container */}
      <div className="flex flex-col xl:flex-row gap-8 mt-6">
        {/* Chap tomondagi forma */}
        <div className="w-full xl:w-1/2">
          <DefaultInputs />
        </div>

        {/* O‘ng tomondagi forma */}
        <div className="w-full xl:w-1/2">
          <SelectInputs />
          {/* Tugma pastda joylashadi */}
          <button className="bg-red-600 text-lg mt-4 text-white px-6 py-3 rounded-xl border border-black">
            Nasiya mijozni qo'shish
          </button>
        </div>
      </div>
    </div>
  );
}
