import {
  Award,
  BookOpen,
  CheckCircle,
  ClipboardList,
} from "lucide-react";

interface Props {
  data: {
    total_courses: number;
    completed_courses: number;
    total_exams: number;
    passed_exams: number;
    total_certificates: number;
  };
}

export default function DashboardStats({
  data,
}: Props) {
  const stats = [
    {
      title: "Courses",
      value: data.total_courses,
      description: "Enrolled courses",
      icon: BookOpen,
      iconStyle: "bg-blue-50 text-blue-600",
    },
    {
      title: "Completed",
      value: data.completed_courses,
      description: "Courses completed",
      icon: CheckCircle,
      iconStyle: "bg-green-50 text-green-600",
    },
    {
      title: "Exams Passed",
      value: data.passed_exams,
      description: `${data.total_exams} total exams`,
      icon: ClipboardList,
      iconStyle: "bg-amber-50 text-amber-600",
    },
    {
      title: "Certificates",
      value: data.total_certificates,
      description: "Certificates earned",
      icon: Award,
      iconStyle: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              {/* Information */}
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-500">
                  {item.title}
                </p>

                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                  {item.value}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  {item.description}
                </p>
              </div>

              {/* Icon */}
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.iconStyle}`}
              >
                <Icon size={21} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}