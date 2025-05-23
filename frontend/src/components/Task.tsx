import React from "react";
import { ClassificationResult } from "../types/types";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface TaskProps {
  data: ClassificationResult;
}

function Task({ data }: TaskProps) {
  return (
    <Accordion className="addtask-button" sx={{ backgroundColor: "#d9d9d9" }}>
      <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
        <Typography component="span">{data.description}</Typography>
      </AccordionSummary>
      <AccordionDetails>{data.points}</AccordionDetails>
    </Accordion>
  );
}

export default Task;
