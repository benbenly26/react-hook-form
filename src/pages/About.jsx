import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import CustomInput from "./components/CustomInput";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function About() {
  // hookform =>
  const schema = yup.object().shape({
    extra: yup.array().of(
      yup.object().shape({
        nameOne: yup.string().required("Please enter a first name"),
        nameTwo: yup.string().required("Please enter a second name"),
      })
    ),
  });

  const {
    control,
    register,
    watch,
    setValue,
    handleSubmit,
    reset,
    getValues,
    trigger,
    formState: { errors, isDirty, isValid, dirtyFields },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {},
  });

  const {
    append,
    remove,
    fields: extra,
  } = useFieldArray({
    control: control,
    name: "extra",
    keyName: "_id",
  });

  useEffect(() => {
    if (extra?.length == 0) {
      append({});
    }
  }, []);

  const handleSave = (data) => {
    console.log("data", data);
    reset({
      extra: [{ nameOne: "", nameTwo: "" }],
    });
  };

  console.log("watch()", watch());

  return (
    <>
      <div className="text-center">
        <div>
          <h4 style={{ color: "green" }}>Hook Form 2</h4>
          <i className="fas fa-hand-sparkles"></i>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <div>
            In This Page Hook-Form is Done by another component and added here
            using props{" "}
          </div>
          <NavLink
            className="router-nav"
            to="/"
            style={{ textDecoration: "none", color: "black" }}
          >
            <h2>
              <i className="fas fa-arrow-left" /> Back To Home
            </h2>
          </NavLink>
        </div>
        <div>
          <form onSubmit={handleSubmit(handleSave)}>
            {extra.map((item, index) => {
              return (
                <div key={item._id} className="d-flex">
                  <div className="mx-2 m-2">
                    <CustomInput
                      label={"First Name"}
                      required={true}
                      control={control}
                      name={`extra.${index}.nameOne`}
                      error={errors.extra?.[index]?.nameOne}
                    />
                  </div>
                  <div className="mx-2">
                    <CustomInput
                      label={"Second Name"}
                      required={true}
                      control={control}
                      name={`extra.${index}.nameTwo`}
                      error={errors.extra?.[index]?.nameTwo}
                    />
                  </div>
                  {extra.length < 4 && extra.length == index + 1 && (
                    <div className="mx-2">
                      <i
                        onClick={() => {
                          append({
                            nameOne: "",
                            nameTwo: "",
                          });
                        }}
                        className="fas fa-plus"
                      ></i>
                    </div>
                  )}
                  {extra.length > 1 && (
                    <div className="mx-2">
                      <i
                        onClick={() => remove(index)}
                        className="fas fa-minus"
                      ></i>
                    </div>
                  )}
                </div>
              );
            })}
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
