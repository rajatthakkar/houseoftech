"use client";
import { Box, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import CardComponent from "@/components/card/card";
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
`;
const SectionSecond = () => {
  return (
    <Container>
      <TextWrapper>
        <Typography variant="h2">3 Reasons You will Love Atithi.com</Typography>
        <Typography variant="h5">Your #1 Hostel Search Engine</Typography>
      </TextWrapper>
      <CardWrapper>
        <CardComponent />
        <CardComponent />
        <CardComponent />
      </CardWrapper>
    </Container>
  );
};

export default SectionSecond;
