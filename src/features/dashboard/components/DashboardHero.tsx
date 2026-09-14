interface Props {
  studentName: string;
  studentEmail: string;
}

export default function DashboardHero({
  studentName,
  studentEmail,
}: Props) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white px-6 py-7 shadow-sm sm:px-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        {/* Welcome */}
        <div>
          <p className="text-sm font-medium text-blue-600">
            👋 Welcome back
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {studentName}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {studentEmail}
          </p>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-600">
            Continue your learning journey, build your knowledge,
            and complete your courses one lesson at a time.
          </p>
        </div>

        {/* Right side */}
        <div className="hidden shrink-0 sm:block">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
            📚
          </div>
        </div>
      </div>
    </section>
  );
}