import * as Yup from "yup";

export const playerSchema = Yup.object({
    playerCode: Yup.string()
        .required("Mã cầu thủ bắt buộc")
        .max(10, "Tối đa 10 ký tự"),

    name: Yup.string()
        .required("Tên cầu thủ bắt buộc")
        .min(3, "Tối thiểu 3 ký tự"),

    birthDate: Yup.date()
        .required("Ngày sinh bắt buộc")
    ,

    transferValue: Yup.number()
        .typeError("Phải là số")
        .min(0, "Không được âm")
        .required("Giá trị chuyển nhượng bắt buộc"),

    position: Yup.string()
        .required("Vị trí bắt buộc")
});
