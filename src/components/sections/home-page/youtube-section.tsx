"use client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  height: 85vh;
  width: 100%;
`;
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 4rem;
  width: 100%;
  margin-top: 10px;
`;
// Replace with your YouTube embed links
const videos = [
  "https://www.youtube.com/embed/50s2YgjQgSw",
  "https://www.youtube.com/embed/50s2YgjQgSw",
  "https://www.youtube.com/embed/50s2YgjQgSw",
];

export default function YoutubeSection() {
  return (
    <Container>
      <TextWrapper>
        <Typography variant="h2">
          Real Travelers Spill the Hostel Tea
        </Typography>
      </TextWrapper>
      <CardWrapper>
        {videos &&
          videos.length > 0 &&
          videos.map((url, index) => {
            return (
              <Box
                key={index}
                sx={{
                  width: "30rem",
                  height: "30rem",
                }}
              >
                <iframe
                  src={url}
                  title={`YouTube video ${index}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  style={{ width: "100%", height: "100%", border: 0 }}
                />
              </Box>
            );
          })}
      </CardWrapper>
    </Container>
  );
}
