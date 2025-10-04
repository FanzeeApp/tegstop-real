import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import { UserProfile } from "../hooks/useProfile";

export default function UserProfiles() {
  const { data, isLoading, isError } = UserProfile();
  const user = data?.data;

  if (isLoading) {
    return <p className="text-gray-500">⏳ Yuklanmoqda...</p>;
  }

  if (isError || !user) {
    return <p className="text-red-500">❌ User maʼlumotlari topilmadi!</p>;
  }

  return (
    <>
      <PageMeta title="Profile | TailAdmin" description="User Profile page" />
      <PageBreadcrumb pageTitle="Profile" />

      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 p-6 shadow-lg">
        <h3 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">
          👤 Foydalanuvchi Profili
        </h3>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Chap taraf avatar */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <div className="h-24 w-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white shadow-md">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <p className="mt-3 text-lg font-semibold text-gray-800 dark:text-white">
              {user.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              @{user.username}
            </p>
          </div>

          {/* O‘ng taraf maʼlumotlar */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4">
              <p className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400">
                Telefon
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {user.phone}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4">
              <p className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400">
                Role
              </p>
              <span className="inline-block mt-1 rounded-full bg-indigo-100 dark:bg-indigo-600/30 text-indigo-600 dark:text-indigo-300 text-xs px-3 py-1 font-medium">
                {user.role}
              </span>
            </div>

            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4">
              <p className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400">
                Username
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {user.username}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
