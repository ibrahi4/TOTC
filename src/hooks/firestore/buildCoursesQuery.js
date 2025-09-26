import { collection, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebase";

/**
 * Build a Firestore query for courses with server-side sort + optional status + prefix search.
 * @param {Object} opts
 * @param {"createdAt"|"price"|"title"} [opts.sortBy="createdAt"]
 * @param {"asc"|"desc"} [opts.dir="desc"]
 * @param {string} [opts.qText=""]   // title prefix search; expects title_lc in docs
 * @param {"all"|"published"|"drafts"} [opts.status="all"]
 */
export function buildCoursesQuery({
  sortBy = "createdAt",
  dir = "desc",
  qText = "",
  status = "all",
} = {}) {
  const col = collection(db, "courses");
  const cons = [];

  // status filter
  if (status === "published") cons.push(where("isPublished", "==", true));
  if (status === "drafts") cons.push(where("isPublished", "==", false));

  // prefix search on title_lc
  const needle = (qText || "").trim().toLowerCase();
  if (needle) {
    cons.push(where("title_lc", ">=", needle));
    cons.push(where("title_lc", "<=", `${needle}\uf8ff`));
  }

  // sort
  if (sortBy === "title") {
    cons.push(orderBy("title_lc", dir));
  } else if (sortBy === "price") {
    cons.push(orderBy("price", dir));
  } else {
    cons.push(orderBy("createdAt", dir));
  }

  return query(col, ...cons);
}
