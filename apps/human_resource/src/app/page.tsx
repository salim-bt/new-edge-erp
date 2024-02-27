import Greeting from "@/components/dashboard/greeting";
import Status from "@/components/dashboard/status";
import { Main } from "@/components/layout/main";

export default async function Home() {

  return (
    <Main>
        <Greeting />
        <Status />
    </Main>
  );
}
