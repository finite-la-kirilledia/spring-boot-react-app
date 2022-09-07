import React, { Component, isValidElement } from "react";
import { Formik } from "formik";
import { Input, Button, Tag } from 'antd';

const inputBottomMargin = { marginBottom: '10px' };
const tagStyle = { backgroundColor: 'red', color: 'white', ...inputBottomMargin };

class AddStudentForm extends Component {
    render() {
        return (
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
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
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
    }
}

export default AddStudentForm;
