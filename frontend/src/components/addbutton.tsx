import { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import TaskClassifier from "./TaskClassifier";

function Addbutton() {
  return (
    <div className="addtask-body">
      <Accordion
        className="addtask-button"
        sx={{ backgroundColor: "#d9d9d9", borderRadius: "12px" }}
      >
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Add Task</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TaskClassifier />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default Addbutton;
