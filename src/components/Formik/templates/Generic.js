import React from "react";
import { Formik } from "formik";

import styles from "./Email.module.css";

const EmailForm = props => {
  return (
    <Formik {...props}>
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset
        } = props;

        const ShowErrors = ({ errors, touched }) => {
          const e = Object.keys(errors);
          const t = Object.keys(touched);
          if (e.length === 0) {
            return null;
          } else {
            return e.map(v => {
              return (
                errors[v] &&
                touched[v] && (
                  <div key={errors[v]} className="input-feedback">
                    {errors[v]}
                  </div>
                )
              );
            });
          }
        };

        console.log(values);

        return (
          <form className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor="email" style={{ display: "block" }}>
              Email
            </label>
            <input
              id="email"
              placeholder="Enter your email"
              type="text"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.email && touched.email
                  ? "text-input error"
                  : "text-input"
              }
            />
            <ShowErrors errors={errors} touched={touched} />
            {/* {errors.email && touched.email && (
              <div className="input-feedback">{errors.email}</div>
            )}
            <div>
              {Object.keys(errors).length > 0 &&
                JSON.stringify(errors, null, 2)}
            </div> */}

            <button
              type="button"
              className="outline"
              onClick={handleReset}
              disabled={!dirty || isSubmitting}
            >
              Reset
            </button>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        );
      }}
    </Formik>
  );
};

export default EmailForm;
