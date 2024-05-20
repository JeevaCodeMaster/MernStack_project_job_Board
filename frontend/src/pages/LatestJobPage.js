import React, { useEffect, useState } from "react";

const LatestJobsPage = () => {
    // State to hold the latest jobs
    const [latestJobs, setLatestJobs] = useState([]);

    // Effect to fetch latest jobs when component mounts
    useEffect(() => {
        // Fetch latest jobs from your API or database
        // Example:
        fetch("api/latest-jobs")
            .then(response => response.json())
            .then(data => setLatestJobs(data))
            .catch(error => console.error("Error fetching latest jobs:", error));

        // For demonstration, let's assume we have some sample data
        const sampleLatestJobs = [
            { id: 1, title: "Software Engineer", company: "Example Corp", location: "New York" },
            { id: 2, title: "Web Developer", company: "Demo Company", location: "San Francisco" },
            // Add more job objects as needed
        ];
        setLatestJobs(sampleLatestJobs);
    }, []);

    return (
        <div >
            <h2>Latest Jobs</h2>

            <ul>
                {latestJobs.map(job => (
                    <li key={job.id}>
                        <h3>{job.title}</h3>
                        <p>Company: {job.company}</p>
                        <p>Location: {job.location}</p>
                    </li>
                ))}
            </ul>
            <hr></hr>
        </div>
    );
};

export default LatestJobsPage;
