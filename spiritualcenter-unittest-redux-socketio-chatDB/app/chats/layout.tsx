'use server'

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="md:w-3/4 m-auto h-screen border bg-slate-50 overflow-hidden">
      <section>{children}</section>
    </main>
  );
};

export default ChatLayout;
