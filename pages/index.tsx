import { Typography } from "@mui/material";
import type { NextPage } from "next";
import { Layout } from "../components/layouts";

const Home: NextPage = () => {
  return (
    <Layout title="Home - JiraOpen" >
      <Typography variant="h1" color="primary">
        Hola mundo
      </Typography>
    </Layout>
  );
};

export default Home;
