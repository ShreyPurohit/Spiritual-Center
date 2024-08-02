import dynamic from "next/dynamic";
const DevoteeNavigationComponent = dynamic(
  () => import("@/components/devotee/NavBarComponent")
);

const DevoteeLayoutPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full sm:w-3/4 m-auto h-screen border bg-slate-50">
      <DevoteeNavigationComponent />
      <section>{children}</section>
    </main>
  );
};

export default DevoteeLayoutPage;
