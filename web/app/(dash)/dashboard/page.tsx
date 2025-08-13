import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">仪表板</h1>
      <div className="rounded-lg border p-6">
        <h2 className="text-xl font-semibold">欢迎, {session.user?.name}!</h2>
        <p className="text-muted-foreground">您的邮箱: {session.user?.email}</p>
        <p className="mt-4">这是受保护的仪表板页面，只有登录用户才能访问。</p>
      </div>
    </div>
  );
}
