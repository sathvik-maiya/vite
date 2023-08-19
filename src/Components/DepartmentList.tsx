import React, { useState } from "react";
import { Box, Typography, Checkbox } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// Define the Department type
interface Department {
  id: number;
  name: string;
  level: number;
  subDepartments?: Department[];
}

// Sample departments data
const departmentsData: Department[] = [
  {
    id: 1,
    name: "customer_service",
    level: 0,
    subDepartments: [
      { id: 2, name: "support", level: 1 },
      { id: 3, name: "customer_access", level: 1 },
    ],
  },
  {
    id: 4,
    name: "design",
    level: 0,
    subDepartments: [
      { id: 5, name: "graphic_design", level: 1 },
      { id: 6, name: "product_design", level: 1 },
      { id: 7, name: "web_design", level: 1 },
    ],
  },
];

const DepartmentList: React.FC = () => {
  const [selected, setSelected] = useState<number[]>([]);
  const [expanded, setExpanded] = useState<number[]>([]);

  // Helper function to check if a department or sub-department is selected
  const isItemSelected = (id: number) => selected.includes(id);

  // Helper function to toggle expanded state for a department
  const toggleExpanded = (id: number) => {
    if (expanded.includes(id)) {
      setExpanded((prevExpanded) => prevExpanded.filter((item) => item !== id));
    } else {
      setExpanded((prevExpanded) => [...prevExpanded, id]);
    }
  };

  // Helper function to check if all sub-departments of a department are selected
  const areAllSubDepartmentsSelected = (department: Department) =>
    department.subDepartments?.every((subDepartment) =>
      selected.includes(subDepartment.id)
    );

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    department: Department
  ) => {
    // If the department checkbox is checked, select the department and its sub-departments
    if (event.target.checked) {
      setSelected((prevSelected) => {
        const newSelected = [...prevSelected, department.id];
        department.subDepartments?.forEach((subDepartment) => {
          if (!newSelected.includes(subDepartment.id)) {
            newSelected.push(subDepartment.id);
          }
        });

        // Check if all sub-departments are selected, then select the parent department as well
        const allSubDepartmentsSelected = department.subDepartments?.every(
          (subDepartment) => newSelected.includes(subDepartment.id)
        );

        // Check if the current department is not already in the selected array and all sub-departments are selected
        if (allSubDepartmentsSelected && !newSelected.includes(department.id)) {
          newSelected.push(department.id);
        }

        return newSelected;
      });
    } else {
      // If the department checkbox is unchecked, deselect the department and its sub-departments
      setSelected((prevSelected) =>
        prevSelected.filter(
          (id) =>
            id !== department.id &&
            !department.subDepartments?.some((subDep) => subDep.id === id)
        )
      );

      // Check if all sub-departments are deselected, then deselect the parent department as well
      const allSubDepartmentsDeselected =
        department.subDepartments?.every((subDepartment) =>
          selected.includes(subDepartment.id)
        ) ?? true;

      if (allSubDepartmentsDeselected && selected.includes(department.id)) {
        setSelected((prevSelected) =>
          prevSelected.filter((id) => id !== department.id)
        );
      }
    }
  };

  // Helper function to toggle expanded state for a department
  const handleToggle = (department: Department) => {
    // Toggle expanded state when clicking on the arrow
    toggleExpanded(department.id);

    // Check if all sub-departments are selected, then select the parent department as well
    if (areAllSubDepartmentsSelected(department)) {
      setSelected((prevSelected) => {
        if (!prevSelected.includes(department.id)) {
          return [...prevSelected, department.id];
        }
        return prevSelected;
      });
    } else {
      // If all sub-departments are not selected, deselect the parent department if it was selected
      setSelected((prevSelected) =>
        prevSelected.filter((id) => id !== department.id)
      );
    }
  };

  const renderDepartments = (departments: Department[]) => {
    return departments.map((department) => (
      <Box key={department.id} ml={department.level * 2}>
        <Box
          onClick={() => handleToggle(department)}
          style={{ cursor: "pointer" }}
        >
          {department.subDepartments && (
            <>
              {expanded.includes(department.id) ? (
                <ExpandMoreIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </>
          )}
        </Box>
        <Checkbox
          checked={isItemSelected(department.id)}
          onChange={(event) => handleCheckboxChange(event, department)}
        />
        <span>{department.name}</span>
        {expanded.includes(department.id) &&
          department.subDepartments &&
          renderDepartments(department.subDepartments)}
      </Box>
    ));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Department List
      </Typography>
      {renderDepartments(departmentsData)}
    </Box>
  );
};

export default DepartmentList;
