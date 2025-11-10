import { useQuery } from "@tanstack/react-query";
import { getDocs } from "firebase/firestore";
import { buildCoursesQuery } from "./firestore/buildCoursesQuery";

/**
 * Server-sorted, client-paginated list of courses.
 * Accepts status filter: "all" | "published" | "drafts"
 */
export function useCoursesSorted({
  sortBy = "createdAt",
  dir = "desc",
  qText = "",
  status = "all",
} = {}) {
  return useQuery({
    queryKey: ["coursesSorted", { sortBy, dir, qText, status }],
    queryFn: async () => {
      const q = buildCoursesQuery({ sortBy, dir, qText, status });
      const snap = await getDocs(q);
      return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    },
    staleTime: 15_000,
    keepPreviousData: true,
  });
}
