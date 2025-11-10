import { useQuery } from "@tanstack/react-query";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export function useCourse(id) {
  return useQuery({
    queryKey: ["course", id],
    enabled: !!id,
    queryFn: async () => {
      const snap = await getDoc(doc(db, "courses", id));
      return snap.exists() ? { id: snap.id, ...snap.data() } : null;
    },
    staleTime: 15_000,
  });
}
