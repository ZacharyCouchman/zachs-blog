import Profile from "@/components/Profile";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <img alt="Grampians Landscape" src="/img/grampians.jpeg" width={"100%"} /> */}
      <div className="mx-auto px-4 max-w-7xl mt-4 relative flex flex-col lg:flex-row gap-4 lg:px-6">
        <Profile />
        {children}
      </div>
    </>
  );
}
