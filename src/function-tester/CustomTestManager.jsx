import React, { useState } from "react";
import { Typography } from "@mui/material";
import TestTable from "./TestTable";
import CustomTests from "./CustomTests";

const CustomTestManager = ({
  customTests,
  setCustomTests,
  testResults,
  setTestResults,
  handleTestExecution,
  input,
}) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [testName, setTestName] = useState("");
  const [testInputs, setTestInputs] = useState({});
  const [testExpectedOutput, setTestExpectedOutput] = useState("");
  const [open, setOpen] = useState(false);

  const addCustomTest = (test) => {
    setCustomTests((prevCustomTests) => [...prevCustomTests, test]);
    setTestResults((prevTestResults) => ({
      ...prevTestResults,
      [test.name]: undefined,
    }));
  };

  const handleDeleteCustomTest = (index) => {
    const deletedTest = customTests[index];
    setCustomTests((prevCustomTests) =>
      prevCustomTests.filter((_, i) => i !== index)
    );
    setTestResults((prevTestResults) => {
      const updatedTestResults = { ...prevTestResults };
      delete updatedTestResults[deletedTest.name];
      return updatedTestResults;
    });
  };
  const handleEditCustomTest = (index) => {
    setEditingIndex(index);
  };
  const handleSaveEditedTest = (index, updatedTest) => {
    const oldTest = customTests[index];
    setCustomTests((prevCustomTests) =>
      prevCustomTests.map((test, i) => (i === index ? updatedTest : test))
    );
    // Also update the corresponding test result
    setTestResults((prevTestResults) => {
      const updatedTestResults = { ...prevTestResults };
      delete updatedTestResults[oldTest.name];
      updatedTestResults[updatedTest.name] = undefined;
      return updatedTestResults;
    });
  };
  return (
    <>
      <Typography variant="h6">Custom Tests</Typography>
      <TestTable
        tests={customTests}
        testResults={testResults}
        handleTestExecution={handleTestExecution}
        handleDeleteCustomTest={handleDeleteCustomTest}
        handleEditCustomTest={handleEditCustomTest}
      />
      <CustomTests
        input={input}
        addCustomTest={addCustomTest}
        customTests={customTests}
        handleDeleteCustomTest={handleDeleteCustomTest}
        handleEditCustomTest={handleEditCustomTest}
        handleSaveEditedTest={handleSaveEditedTest}
        editingIndex={editingIndex}
        setEditingIndex={setEditingIndex}
        testName={testName}
        setTestName={setTestName}
        testInputs={testInputs}
        setTestInputs={setTestInputs}
        testExpectedOutput={testExpectedOutput}
        setTestExpectedOutput={setTestExpectedOutput}
        setOpen={setOpen}
        open={open}
      />
    </>
  );
};

export default CustomTestManager;