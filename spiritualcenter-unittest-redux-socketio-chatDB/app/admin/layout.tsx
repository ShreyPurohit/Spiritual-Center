import dynamic from "next/dynamic";
const AdminNavigationComponent = dynamic(
  () => import("@/components/admin/NavBarComponent")
);

const AdminLayoutPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="md:w-3/4 m-auto h-screen border bg-slate-50">
      <AdminNavigationComponent />
      <section>{children}</section>
    </main>
  );
};

export default AdminLayoutPage;
