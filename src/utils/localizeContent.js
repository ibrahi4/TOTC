import i18n from "../i18n";

export function localizeCategory(category, t = i18n.t.bind(i18n)) {
  const key = category?.key;
  if (key) return t(`tokens.cat.${key}`);
  return category?.name || "—";
}

export function localizeCourse(course, t = i18n.t.bind(i18n)) {
  const m = course?.meta;
  if (!m) {
    return {
      title: course?.title || "",
      description: course?.description || "",
    };
  }
  const title = [
    t(`tokens.adj.${m.adj}`),
    t(`tokens.subj.${m.subj}`),
    t(`tokens.vari.${m.vari}`),
  ].join(" ");

  const blurb1 = t(`tokens.blurb.${m.blurb1}`);
  const blurb2 = t(`tokens.blurb.${m.blurb2}`);
  const description = `${title}. ${blurb1}. ${blurb2}.`;

  return { title, description };
}
