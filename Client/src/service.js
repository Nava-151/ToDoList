import axios from 'axios';
axios.defaults.baseURL =process.env.REACT_APP_API_URL


axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Response error:', error.response ? error.response.data : error.message);
    return Promise.reject(error);
  }
);

export default {
  getTasks: async () => {
    const result = await axios.get(`/items`);
    if(Array.isArray(result.data)){
    return result.data;
      
    }
    else
    {
      alert("no tasks")
      return []
    }
  },

  addTask: async (name) => {
    console.log('addTask', name);
    try {
      const result = await axios.post(`/items`, { Name: name , isComplete: false });
      return result.data;
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  },

  setCompleted: async (id, isComplete) => {
    console.log('setCompleted', { id, isComplete });
    try {
      const result = await axios.put(`/items/${id}`, { isComplete });
      return result.data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  deleteTask: async (id) => {
    console.log('deleteTask', id);
    try {
      await axios.delete(`/items/${id}`);
      return { success: true };
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
};


