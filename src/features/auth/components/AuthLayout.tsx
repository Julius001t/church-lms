import type { ReactNode } from "react";
import { GraduationCap } from "lucide-react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6 py-12">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600 text-white">
            <GraduationCap size={30} />
          </div>

          <h1 className="mt-5 text-3xl font-bold text-gray-900">
            {title}
          </h1>

          <p className="mt-2 text-gray-500">
            {subtitle}
          </p>
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}