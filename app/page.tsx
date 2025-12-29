import Link from "next/link";

const links = [
  {
    href: "/dashboard",
    label: "Dashboard",
    desc: "Salary, fixed, variable, remaining",
  },
  { href: "/expenses", label: "Expenses", desc: "Daily spends with filters" },
  { href: "/subscriptions", label: "Subscriptions", desc: "Recurring charges" },
  { href: "/emis", label: "EMIs", desc: "Loans and installments" },
  { href: "/savings", label: "Savings", desc: "Monthly targets" },
  { href: "/categories", label: "Categories", desc: "Manage custom labels" },
  { href: "/snapshots", label: "Snapshots", desc: "Stored monthly records" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-50">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-16">
        <header className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Finance Tracker
          </p>
          <h1 className="text-4xl font-semibold leading-tight">
            Track salary cycles, fixed costs, and daily spend in one place.
          </h1>
          <p className="max-w-2xl text-slate-300">
            Jump into a section to review or update your data. Each page uses
            the same dummy user profile so you can try flows quickly.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition hover:-translate-y-1 hover:border-slate-600 hover:bg-slate-900"
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">{item.label}</span>
                <span className="text-xs text-slate-400">Open</span>
              </div>
              <p className="mt-2 text-sm text-slate-300">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
