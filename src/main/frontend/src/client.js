import fetch from 'unfetch';

export const getStudents = () => fetch('/api/v1/students');

export const addNewStudent = student => fetch(
    '/api/v1/students',
    {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(student)
    }
);