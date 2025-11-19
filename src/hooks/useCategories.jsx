import { useState, useEffect } from "react";
import { useApi } from "./useApi";

function useCategories() {
	const [categories, setcategories] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const urlapi = import.meta.env.VITE_URL_BACK || "http://localhost:3008";
	const { request } = useApi();

	useEffect(() => {
		async function fetchCategories() {
			try {
				const response = await request(urlapi + `/api/category`)
				setcategories(response.data);
			} catch (error) {
				setError(error.message);
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		}
		fetchCategories();
	}, []);

	return { categories, isLoading, error };
}
export default useCategories;