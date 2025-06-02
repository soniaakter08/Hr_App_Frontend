// src/hooks/useAxios.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3002";

const useAxios = () => {
  const get = async (endpoint) => {
    try {
      const response = await axios.get(`${BASE_URL}/${endpoint}`);
      return response.data;
    } catch (error) {
      console.error("GET error:", error);
      return null;
    }
  };

  const post = async (endpoint, data) => {
    try {
      const response = await axios.post(`${BASE_URL}/${endpoint}`, data);
      return response.data;
    } catch (error) {
      console.error("POST error:", error);
      return null;
    }
  };

  const patch = async (url, data) => {
    try {
      const response = await axios.patch(url, data);
      return response.data;
    } catch (err) {
      console.log("Failed to update data", err);
    }
  };

  const remove = async (endpoint) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${endpoint}`);
      return response.data;
    } catch (error) {
      console.error("DELETE error:", error);
      return null;
    }
  };

  return { get, post, patch, remove };
};

export default useAxios;
