import { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import TaskClassifier from "./TaskClassifier";

interface AddbuttonProps {
  onTaskAdded: () => void;
}

function Addbutton({ onTaskAdded }: AddbuttonProps) {
  return (
    <Accordion className="addtask-button" sx={{ backgroundColor: "#d9d9d9" }}>
      <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
        <Typography component="span">Add Task</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TaskClassifier onTaskAdded={onTaskAdded} />
      </AccordionDetails>
    </Accordion>
  );
}

export default Addbutton;
