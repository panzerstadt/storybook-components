import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import Email from "./templates/Email";

const Form = ({
  template = "email",
  initData = { name: "", email: "" },
  validationSchema = Yup.object().shape({
    //name: Yup.string().required(),
    email: Yup.string()
      .email()
      .required("email required!")
  }),
  onSubmit
}) => {
  const [initVals, setInitVals] = useState(initData);

  const handleSubmit = (values, props) => {
    console.log("additional props from formik!");
    console.log(props);

    setTimeout(() => {
      console.log(JSON.stringify(values, null, 2));
      props.setSubmitting(false);
    }, 500);
  };

  if (template === "email") {
    return (
      <Email
        initialValues={initVals}
        validationSchema={validationSchema}
        onSubmit={onSubmit || handleSubmit}
      />
    );
  } else {
    return <div>dunno how to handle this form yet!</div>;
  }
};

export default Form;
