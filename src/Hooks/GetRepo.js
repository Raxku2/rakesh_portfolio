import { useState, useEffect } from "react";

const GetRepo = () => {
  const [repos2DArray, setRepos2DArray] = useState([]);
  const [error, setError] = useState(null);
  const username = "rax-2"; 

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const repos = await response.json();
        const formattedRepos = repos.map(repo => [
          repo.name,
          repo.description || "No description available",
          repo.html_url,
        ]);

        setRepos2DArray(formattedRepos);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRepos();
  }, [username]);

  return { repos2DArray, error };
};

export default GetRepo;
