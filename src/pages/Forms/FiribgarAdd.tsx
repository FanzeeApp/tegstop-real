import PageBreadcrumb from "../../components/common/PageBreadCrumb";
// import DefaultInputs from "../../components/form/form-elements/DefaultInputs";
// import InputGroup from "../../components/form/form-elements/InputGroup";
// import DropzoneComponent from "../../components/form/form-elements/DropZone";
// import CheckboxComponents from "../../components/form/form-elements/CheckboxComponents";
// import RadioButtons from "../../components/form/form-elements/RadioButtons";
// import ToggleSwitch from "../../components/form/form-elements/ToggleSwitch";
// import FileInputExample from "../../components/form/form-elements/FileInputExample";
// import SelectInputs from "../../components/form/form-elements/SelectInputs";
// import TextAreaInput from "../../components/form/form-elements/TextAreaInput";
// import InputStates from "../../components/form/form-elements/InputStates";
import PageMeta from "../../components/common/PageMeta";
// import SelectInputs from "../../components/form/form-elements/SelectInputs";
import TextAreaInput from "../../components/form/form-elements/TextAreaInput";

export default function FiribgarAdd() {
  return (
    <div>
      <PageMeta
        title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Nasiya mijoz qo'shish" />
      <div className="flex">
        <div className="space-y-6 flex flex-col items-center justify-between w-full xl:flex-row">
          <div className="flex flex-col items-center justify-center">

          <TextAreaInput />
          <button className="bg-red-600 text-3xl mt-3 text-white p-[14px] rounded-2xl border-black border-2 xl:mt-8">Nasiya mijozni qo'shish</button>
          </div>
          {/* <TextAreaInput />
          <InputStates /> */}
        </div>
      </div>
    </div>
  );
}
