import TrainerSidebar from "@/components/shared/TrainerSidebar";

export default function TrainerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f4f6f8] text-slate-950">
      <TrainerSidebar />
      <main className="mx-auto max-w-[1440px]">
        {children}
      </main>
    </div>
  );
}
