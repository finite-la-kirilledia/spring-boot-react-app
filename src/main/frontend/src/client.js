import fetch from 'unfetch';

export const getStudents = () => fetch('/api/v1/students');
