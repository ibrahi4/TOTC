import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

const COURSES_QUERY_KEY = "courses";

export function useAddCourse() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (newCourse) => {
      // keep title_lc & createdAt in sync here
      const payload = {
        ...newCourse,
        title_lc: (newCourse.title || "").toLowerCase(),
        createdAt: serverTimestamp(),
      };
      return addDoc(collection(db, "courses"), payload);
    },
    onSuccess: (ref) => {
      // list + counts
      qc.invalidateQueries({ queryKey: [COURSES_QUERY_KEY] });
      qc.invalidateQueries({ queryKey: ["coursesSorted"] });
      qc.invalidateQueries({ queryKey: ["count", "courses", "total"] });
      qc.invalidateQueries({ queryKey: ["count", "courses", "published"] });
      // detail for new id (if you navigate to /edit/:id later)
      if (ref?.id) qc.invalidateQueries({ queryKey: ["course", ref.id] });
    },
  });
}

export function useUpdateCourse() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updatedFields }) => {
      const patch = {
        ...updatedFields,
        ...(updatedFields.title
          ? { title_lc: updatedFields.title.toLowerCase() }
          : {}),
      };
      return updateDoc(doc(db, "courses", id), patch);
    },
    onSuccess: (_res, { id }) => {
      qc.invalidateQueries({ queryKey: [COURSES_QUERY_KEY] });
      qc.invalidateQueries({ queryKey: ["coursesSorted"] });
      qc.invalidateQueries({ queryKey: ["course", id] });
      qc.invalidateQueries({ queryKey: ["count", "courses", "total"] });
      qc.invalidateQueries({ queryKey: ["count", "courses", "published"] });
    },
  });
}

export function useDeleteCourse() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (courseId) => deleteDoc(doc(db, "courses", courseId)),
    onSuccess: (_res, courseId) => {
      qc.invalidateQueries({ queryKey: [COURSES_QUERY_KEY] });
      qc.invalidateQueries({ queryKey: ["coursesSorted"] });
      qc.invalidateQueries({ queryKey: ["course", courseId] });
      qc.invalidateQueries({ queryKey: ["count", "courses", "total"] });
      qc.invalidateQueries({ queryKey: ["count", "courses", "published"] });
    },
  });
}
