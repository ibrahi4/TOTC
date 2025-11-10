import { NavLink } from "react-router-dom";
import { FiBookOpen, FiTag, FiCheckCircle, FiClock } from "react-icons/fi";
import PageHeader from "../../components/adminSidebaer/PageHeader";
import React from "react";
import {
  useCoursesCount,
  useCoursesPublishedCount,
  useCategoriesCount,
} from "../../hooks/useCounts";
import { useCoursesSorted } from "../../hooks/useCoursesSorted";

export default function AdminDashboard() {
  const { data: totalCourses = 0 } = useCoursesCount();
  const { data: publishedCourses = 0 } = useCoursesPublishedCount();
  const { data: totalCategories = 0 } = useCategoriesCount();
  const drafts = Math.max(0, totalCourses - publishedCourses);

  const { data: recent = [], isLoading: loadingRecent } = useCoursesSorted({
    sortBy: "createdAt",
    dir: "desc",
    qText: "",
    status: "all",
  });
  const recent5 = (recent || []).slice(0, 5);

  return (
    <>
      <PageHeader title="Overview" />

      {/* ✅ Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ">
        <StatCard
          title="Total Courses"
          value={totalCourses}
          icon={<FiBookOpen className="text-[#1bc49a]" />}
          link={{ to: "/admin/courses", label: "Manage" }}
        />
        <StatCard
          title="Published"
          value={publishedCourses}
          icon={<FiCheckCircle className="text-emerald-400" />}
          link={{ to: "/admin/courses?filter=published", label: "View" }}
        />
        <StatCard
          title="Drafts"
          value={drafts}
          icon={<FiClock className="text-yellow-400" />}
          link={{ to: "/admin/courses?filter=drafts", label: "Review" }}
        />
        <StatCard
          title="Categories"
          value={totalCategories}
          icon={<FiTag className="text-[#49BBBD]" />}
          link={{ to: "/admin/categories", label: "Manage" }}
        />
      </div>

      {/* ✅ Recent Courses */}
      <section className="mt-8">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white/80">
            Recent Courses
          </h2>
          <NavLink
            to="/admin/courses"
            className="text-sm font-medium text-[#00a897] hover:underline"
          >
            See all →
          </NavLink>
        </div>

        <div className="overflow-hidden rounded-xl bg-white/5 backdrop-blur-md">
          {loadingRecent ? (
            <RecentSkeleton />
          ) : recent5.length === 0 ? (
            <div className="p-6 text-sm text-white/70">No courses yet.</div>
          ) : (
            <ul className="divide-y divide-white/10">
              {recent5.map((c) => (
                <li
                  key={c.id}
                  className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-white/5 transition"
                >
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-white">
                      {c.title}
                    </div>
                    <div className="text-xs text-white/50">
                      {formatDate(c.createdAt)}
                    </div>
                  </div>
                  <NavLink
                    to={`/admin/courses/${c.id}/edit`}
                    className="rounded-md border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/80 hover:bg-white/20 transition"
                  >
                    Edit
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}

function StatCard({ title, value, icon, link }) {
  return (
    <div className="rounded-xl bg-white/5 backdrop-blur-md p-5 text-white transition hover:bg-white/10">
      <div className="flex items-center justify-between">
        <div className="text-sm text-white/70">{title}</div>
        <div className="text-xl">{icon}</div>
      </div>
      <div className="mt-1 text-3xl font-bold">{value}</div>
      {link && (
        <NavLink
          to={link.to}
          className="mt-3 inline-block text-sm font-semibold text-[#223c58] hover:text-[#c6d70a]"
        >
          {link.label} →
        </NavLink>
      )}
    </div>
  );
}

function RecentSkeleton() {
  return (
    <ul>
      {Array.from({ length: 5 }).map((_, i) => (
        <li
          key={i}
          className="h-12 animate-pulse border-b border-white/10 bg-white/5"
        />
      ))}
    </ul>
  );
}

function formatDate(ts) {
  if (!ts) return "—";
  const ms = ts.toMillis
    ? ts.toMillis()
    : ts.seconds
    ? ts.seconds * 1000
    : +new Date(ts);
  return new Date(ms).toLocaleDateString();
}
