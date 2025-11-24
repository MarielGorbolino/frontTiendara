import { useState, useEffect, useCallback } from "react";
import { useApi } from "./useApi";
import { useAuth } from "./useAuth";

  export default function useCategories() {
	const [categories, setCategories] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const apiBaseUrl = import.meta.env.VITE_URL_BACK || "http://localhost:3008";
	const { request } = useApi();
    const { accessToken } = useAuth();
  
	const fetchCategories = useCallback(async () => {
	  setIsLoading(true);
	  setError(null);
  
	  try {
	  const res = await request(apiBaseUrl + "/api/category")
		setCategories(res.data);
	  } catch (e) {
		setError(e.message);
	  } finally {
		setIsLoading(false);
	  }
	}, [accessToken, apiBaseUrl]);
  
	useEffect(() => {
	  fetchCategories();
	}, [fetchCategories]);

	return { categories, isLoading, error, fetchCategories };
  }
