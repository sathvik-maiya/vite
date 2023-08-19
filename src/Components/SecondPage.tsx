import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Typography, Container, CircularProgress } from "@mui/material";
import DepartmentList from "./DepartmentList";

interface Post {
  id: number;
  title: string;
  body: string;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "title", headerName: "Title", width: 300 },
  { field: "body", headerName: "Body", width: 500 },
];

const SecondPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom style={{ marginTop: "20px" }}>
        Posts List
      </Typography>
      <div style={{ height: "70vh", width: "100%", marginTop: "20px" }}>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <DataGrid rows={posts} columns={columns} />
        )}
      </div>
      <DepartmentList />
    </Container>
  );
};

export default SecondPage;
