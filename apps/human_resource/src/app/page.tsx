import AuthButton from "@/components/auth/auth-button";

export default async function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <AuthButton />
      </div>
    </main>
  );
}
