import { Link, useLocation } from "react-router";
import { GridIcon, ListIcon, UserCircleIcon } from "../icons";
import { useSidebar } from "../context/SidebarContext";
import icon from "../icons/iconnn.png";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path: string;
};

const navItems: NavItem[] = [
  { name: "Bosh sahifa", icon: <GridIcon />, path: "/" },
  { name: "Firibgar qo'shish", icon: <ListIcon />, path: "/firibgar-add" },
  { name: "Nasiya mijoz qo'shish", icon: <ListIcon />, path: "/nasiya-add" },
  { name: "Nasiya mijozlarim", icon: <ListIcon />, path: "/nasiya" },
  // { name: "Foydalanuvchilar", icon: <TableIcon />, path: "/basic-tables" },
  { name: "User Profile", icon: <UserCircleIcon />, path: "/profile" },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo */}
      {/* Logo */}
      <div
        className={`py-8 flex items-center gap-3 ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/" className="flex items-center gap-3">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <img
                className="dark:hidden"
                src={icon}
                alt="Logo"
                width={50}
                height={50}
              />
              <img
                className="hidden dark:block"
                src={icon}
                alt="Logo"
                width={50}
                height={50}
              />
              <span className="text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
                Xavfsiz savdo
              </span>
            </>
          ) : (
            <img
              src="/images/logo/logo-icon.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>

      {/* Menu */}
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <ul className="flex flex-col gap-4">
            {navItems.map((nav) => (
              <li key={nav.name}>
                <Link
                  to={nav.path}
                  className={`menu-item group ${
                    isActive(nav.path)
                      ? "menu-item-active"
                      : "menu-item-inactive"
                  }`}
                >
                  <span
                    className={`menu-item-icon-size ${
                      isActive(nav.path)
                        ? "menu-item-icon-active"
                        : "menu-item-icon-inactive"
                    }`}
                  >
                    {nav.icon}
                  </span>
                  {(isExpanded || isHovered || isMobileOpen) && (
                    <span className="menu-item-text">{nav.name}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
