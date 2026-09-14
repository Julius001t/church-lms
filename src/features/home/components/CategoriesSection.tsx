import {
  BookOpen,
  Cross,
  Heart,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";

const categories = [
  {
    title: "Bible Study",
    description: "Understand God's Word",
    icon: BookOpen,
  },
  {
    title: "Faith & Spiritual Growth",
    description: "Strengthen your spiritual life",
    icon: Cross,
  },
  {
    title: "Prayer",
    description: "Grow your prayer life",
    icon: Heart,
  },
  {
    title: "Christian Leadership",
    description: "Develop leadership skills",
    icon: Users,
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Explore
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            What do you want to learn?
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Explore courses designed to help you deepen your
            understanding of God's Word and grow in your faith.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.title}
                to="/courses"
                className="group rounded-xl border bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                  <Icon size={24} />
                </div>

                <h3 className="mt-5 font-bold text-gray-900">
                  {category.title}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  {category.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}