import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useForm, useController } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function Home() {
  // hookform =>
  const schema = yup.object().shape({
    firstName: yup.string().required("Please enter a first name"),
    secondName: yup.string().required("Please enter a middle name"),
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
    mode: "all",
    defaultValues: {},
  });

  const { field, fieldState, formState } = useController({
    name: "thirdName",
    control: control,
    required: "true",
    defaultValue: "",
  });

  console.log("watch()", watch("firstName"));
  // <=
  const handleSave = (data) => {
    console.log("data", data);
    reset();
  };
  console.log("error", errors);

  return (
    <>
      <div className="text-center">
        <h4 style={{ color: "red" }}>Hook Form 1</h4>
        <i className="fas fa-yin-yang" />
        <div className="d-flex align-items-center justify-content-between">
          <div>In This Page Hook-Form is Done inside the page</div>
          <div>
            <NavLink
              className="router-nav"
              to="/about"
              style={{ textDecoration: "none", color: "black" }}
            >
              <h2 style={{ padding: "10px 10px" }}>
                Go to About <i className="fas fa-arrow-right"></i>
              </h2>
            </NavLink>
          </div>
        </div>
        <form>
          <div className="d-flex m-2">
            <div className="mt-5 p-2">
              {/* 1 */}
              First Name :
              <input
                placeholder="First Name"
                {...register("firstName", { required: "Required" })}
                name="firstName"
              />
              <span style={{ color: "red", display: "block" }}>
                {errors.firstName?.message}
              </span>
            </div>
            <div className="mt-5 p-2">
              {/* 2 */}
              Second Name :
              <input
                placeholder="2nd name"
                {...register("secondName")}
                name="secondName"
              />
              <span style={{ color: "red", display: "block" }}>
                {errors.secondName?.message}
              </span>
            </div>
            <div className="mt-5 p-2">
              {/* 3 */}
              Third Name :
              <input
                placeholder="3rd name"
                {...field}
                type="text"
                name="thirdName"
              />
            </div>
          </div>
          <Button
            className="mt-3 m-2"
            type="submit"
            onClick={handleSubmit(handleSave)}
          >
            Save
          </Button>
        </form>
      </div>
    </>
  );
}
