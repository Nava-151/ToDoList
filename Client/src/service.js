import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// הוספת Interceptor לתפיסת שגיאות ורישום ללוג
axios.interceptors.response.use(
  response => response, // מחזיר את התגובה כרגיל אם אין שגיאה
  error => {
    console.error('API Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    return Promise.reject(error); 
  }
);

export default {
  getTasks: async () => {
    const result = await axios.get('/tasks');
    if (Array.isArray(result.data))
    return result.data
    else {
      alert("no tasks");
      return [];
    }
  },

  addTask: async (name) => {
    console.log('addTask', name);
    const result = await axios.post('/tasks', { Name:name , isComplete:false });
    return result.data;
  },

  setCompleted: async (id, isComplete) => {
    console.log('setCompleted', { id, isComplete });
    const result = await axios.put(`/tasks/${id}`, { isComplete: isComplete} );
    return result.data;
  },

  deleteTask: async (id) => {
    console.log('deleteTask');
    const result = await axios.delete(`/tasks/${id}`);
    return result.data;
  }
};