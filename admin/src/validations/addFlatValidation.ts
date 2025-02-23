import * as Yup from "yup";
export const addFlatValidation =  Yup.object({
    projectId: Yup.string().required("Project selection is required"),
    flatType: Yup.string().required("Flat Type is required"),
    flatPrice: Yup.number().required("Flat Price is required"),
    flatNumber: Yup.string().required("Flat Number is required"),
    floorNumber: Yup.number().required("Floor Number is required"),
    carpetArea: Yup.number().required("Carpet Area is required"),
    furnishingStatus: Yup.string().required("Furnishing Status is required"),
    image: Yup.string().optional(),
  })