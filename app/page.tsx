import { redirect } from "next/navigation";

export default function Home() {
  redirect('/feed')

  return (
    <main className="flex flex-col items-center w-full">

    </main>
  );
}
