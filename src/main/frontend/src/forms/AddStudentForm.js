import React from "react";
import { Formik } from "formik";
import { Input, Button, Tag } from 'antd';
import { addNewStudent } from "../client";

const inputBottomMargin = { marginBottom: '10px' };
const tagStyle = { backgroundColor: 'red', color: 'white', ...inputBottomMargin };

const AddStudentForm = (props) => (
    <Formik
        initialValues={{ firstName: '', age: '' }}
        validate={values => {
            const errors = {};

            if (!values.firstName) {
                errors.firstName = 'Please enter first name';
            }

            if (!values.age) {
                errors.age = 'Please enter age';
            } else if (isNaN(values.age)) {
                errors.age = 'Age should be a number';
            }

            return errors;
        }}
        onSubmit={(student, { setSubmitting }) => {
            addNewStudent(student).then(() => {
                props.onSuccess();
                setSubmitting(false);
            })
        }}
    >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            submitForm,
            isValid
        }) => (
            <form onSubmit={handleSubmit}>
                <Input
                    style={inputBottomMargin}
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    placeholder='First name'
                />
                {errors.firstName && touched.firstName && <Tag style={tagStyle}>{errors.firstName}</Tag>}
                <Input
                    style={inputBottomMargin}
                    name="age"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.age}
                    placeholder='Age'
                />
                {errors.age && touched.age && <Tag style={tagStyle}>{errors.age}</Tag>}
                <Button
                    type="submit"
                    disabled={isSubmitting | (touched && !isValid)}
                    onClick={() => submitForm()}
                >
                    Submit
                </Button>
            </form>
        )}
    </Formik>
);

export default AddStudentForm;
