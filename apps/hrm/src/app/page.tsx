import StatusCards from "@/components/status-cards";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full pl-72 items-center justify-center dark:bg-gray-700">
        <StatusCards />
    </main>
  );
}

