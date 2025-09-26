import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PageHeader from "../adminSidebaer/PageHeader";
import { useCourse } from "../../hooks/useCourse";
import { useAddCourse, useUpdateCourse } from "../../hooks/useCoursesMutations";
import { useCategoriesSorted } from "../../hooks/useCategoriesSorted";
import React from "react";

const Schema = Yup.object({
  title: Yup.string().min(3, "Too short").required("Required"),
  description: Yup.string().min(10, "Too short").required("Required"),
  thumbnailUrl: Yup.string().url("Must be URL"),
  price: Yup.number().min(0, "Min 0").required("Required"),
  currency: Yup.string().oneOf(["USD", "EGP"]).required("Required"),
  categoryId: Yup.string(),
  isPublished: Yup.boolean().required(),
});

export default function AdminCourseForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const { data: course, isLoading } = useCourse(id);
  const { data: categories = [] } = useCategoriesSorted({});
  const addCourse = useAddCourse();
  const updateCourse = useUpdateCourse();

  const initial =
    isEdit && course
      ? {
          title: course.title || "",
          description: course.description || "",
          thumbnailUrl: course.thumbnailUrl || "",
          price: course.price ?? 0,
          currency: course.currency || "USD",
          categoryId: course.categoryId || "",
          isPublished: !!course.isPublished,
        }
      : {
          title: "",
          description: "",
          thumbnailUrl: "",
          price: 0,
          currency: "USD",
          categoryId: "",
          isPublished: true,
        };

  const actions = (
    <div className="flex items-center gap-2">
      <button
        type="submit"
        form="courseForm"
        className="rounded-lg bg-[#F0CC17] px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-[#acaf09] transition"
      >
        {isEdit ? "Save Changes" : "Create"}
      </button>
      <button
        onClick={() => navigate(-1)}
        className="rounded-lg border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/80 hover:bg-white/20 transition"
      >
        Cancel
      </button>
    </div>
  );

  return (
    <>
      <PageHeader
        title={isEdit ? "Edit Course" : "New Course"}
        actions={actions}
      />

      {isEdit && isLoading ? (
        <div className="text-sm text-gray-400">Loading…</div>
      ) : (
        <div className="rounded-xl bg-white/5 backdrop-blur-md p-6 md:p-8 transition text-white">
          <Formik
            initialValues={initial}
            enableReinitialize
            validationSchema={Schema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                if (isEdit) {
                  await updateCourse.mutateAsync({ id, ...values });
                } else {
                  const ref = await addCourse.mutateAsync(values);
                  if (ref?.id)
                    navigate(`/admin/courses/${ref.id}/edit`, {
                      replace: true,
                    });
                }
                navigate("/admin/courses", { replace: true });
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, values }) => (
              <Form id="courseForm" className="grid gap-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium">Title</label>
                  <Field
                    name="title"
                    className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#d2b200]"
                    placeholder="Course title"
                  />
                  <ErrorMessage
                    name="title"
                    component="p"
                    className="text-xs text-red-400 mt-1"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium">
                    Description
                  </label>
                  <Field
                    as="textarea"
                    name="description"
                    rows={4}
                    placeholder="Course description"
                    className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#d2b200]"
                  />
                  <ErrorMessage
                    name="description"
                    component="p"
                    className="text-xs text-red-400 mt-1"
                  />
                </div>

                {/* Thumbnail + Category */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium">
                      Thumbnail URL
                    </label>
                    <Field
                      name="thumbnailUrl"
                      placeholder="https://example.com/image.jpg"
                      className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#d2b200]"
                    />
                    <ErrorMessage
                      name="thumbnailUrl"
                      component="p"
                      className="text-xs text-red-400 mt-1"
                    />
                    {values.thumbnailUrl && (
                      <img
                        src={values.thumbnailUrl}
                        alt="Thumbnail"
                        className="mt-2 h-24 w-full rounded-md object-cover"
                        onError={(e) =>
                          (e.currentTarget.style.display = "none")
                        }
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium">
                      Category
                    </label>
                    <Field
                      as="select"
                      name="categoryId"
                      className="w-full rounded-lg bg-white/10 border-b-gray-400 px-3 py-2 text-gray-900 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-[#d2b200]"
                    >
                      <option value="" disabled selected>
                        Select a category
                      </option>
                      <option value="Fron-End">Fron-End</option>
                      <option value="Back-End">Back-End </option>
                      <option value="UI/UX">UI/UX </option>
                      <option value="Mobile">Mobile</option>
                      <option value="DevOps">DevOps</option>
                      <option value="Data Science">Data Science</option>
                      <option value="Machine Learning">Machine Learning</option>
                      <option value="Cloud Computing">Cloud Computing</option>
                      <option value="Cybersecurity">Cybersecurity</option>
                      <option value="Programming Languages">
                        Programming Languages
                      </option>
                      <option value="Databases">Databases</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Game Development">Game Development</option>
                      <option value="Software Testing">Software Testing</option>
                      <option value="Project Management">
                        Project Management
                      </option>
                      <option value="Agile and Scrum">Agile and Scrum</option>
                      <option value="IT Certifications">
                        IT Certifications
                      </option>
                      <option value="Others">Others</option>
                    </Field>
                    <ErrorMessage
                      name="categoryId"
                      component="p"
                      className="text-xs text-red-400 mt-1"
                    />
                  </div>
                </div>

                {/* Price, Currency, Publish */}
                <div className="grid gap-6 sm:grid-cols-3">
                  <div>
                    <label className="block text-sm font-medium">Price</label>
                    <Field
                      name="price"
                      type="number"
                      className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#d2b200]"
                    />
                    <ErrorMessage
                      name="price"
                      component="p"
                      className="text-xs text-red-400 mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">
                      Currency
                    </label>
                    <Field
                      as="select"
                      name="currency"
                      className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#d2b200]"
                    >
                      <option value="USD">USD</option>
                      <option value="EGP">EGP</option>
                    </Field>
                    <ErrorMessage
                      name="currency"
                      component="p"
                      className="text-xs text-red-400 mt-1"
                    />
                  </div>

                  <label className="flex items-center gap-2 mt-6">
                    <Field
                      type="checkbox"
                      name="isPublished"
                      className="h-4 w-4"
                    />
                    <span className="text-sm">Published</span>
                  </label>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
}
