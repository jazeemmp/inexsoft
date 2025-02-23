import * as Yup from "yup";

export const addProjectValidation = Yup.object({
  projectName: Yup.string().required("Project Name is required"),
  contact: Yup.string()
    .required("Contact is required")
    .matches(/^[0-9]{10}$/, "Contact must be a valid 10-digit number"),
  description: Yup.string().optional(),
  location: Yup.string().required("Location is required"),
  projectImage: Yup.mixed()
    .nullable()
    .test("fileSize", "Image must be less than 5MB", (value) => {
      return !value || (value && (value as File).size <= 5 * 1024 * 1024);
    })
    .test("fileType", "Only image files are allowed", (value) => {
      return (
        !value ||
        (value && ["image/jpeg", "image/png", "image/webp"].includes((value as File).type))
      );
    }),
});
