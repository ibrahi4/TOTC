// src/hooks/useCounts.js
import { useQuery } from "@tanstack/react-query";
import { collection, query, where, getCountFromServer } from "firebase/firestore";
import { db } from "../firebase"; // adjust path

export function useCoursesCount() {
  return useQuery({
    queryKey: ["count", "courses", "total"],
    queryFn: async () => {
      const q = query(collection(db, "courses"));
      const snapshot = await getCountFromServer(q);
      return snapshot.data().count || 0;
    },
    staleTime: 15_000,
  });
}

export function useCoursesPublishedCount() {
  return useQuery({
    queryKey: ["count", "courses", "published"],
    queryFn: async () => {
      const q = query(collection(db, "courses"), where("isPublished", "==", true));
      const snapshot = await getCountFromServer(q);
      return snapshot.data().count || 0;
    },
    staleTime: 15_000,
  });
}

export function useCategoriesCount() {
  return useQuery({
    queryKey: ["count", "categories", "total"],
    queryFn: async () => {
      const q = query(collection(db, "categories"));
      const snapshot = await getCountFromServer(q);
      return snapshot.data().count || 0;
    },
    staleTime: 15_000,
  });
}
