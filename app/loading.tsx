export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-teal-500 animate-pulse" />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-teal-500 animate-ping opacity-20" />
        </div>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm animate-pulse">
          Loading MediCare...
        </p>
      </div>
    </div>
  );
}
