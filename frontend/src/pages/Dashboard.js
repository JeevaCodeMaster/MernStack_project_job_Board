import React from "react";
import Layout from "../components/Layout/Layout";
import LatestJobsPage from "./LatestJobPage";
import UpdateProfilePage from "./UpdateJobPage";

const Dashboard = () => {
  return (
    <Layout>
      <h1>Dashboard Page</h1>
      <hr></hr>
      <LatestJobsPage />
      <UpdateProfilePage />
    </Layout>
  );
};

export default Dashboard;
