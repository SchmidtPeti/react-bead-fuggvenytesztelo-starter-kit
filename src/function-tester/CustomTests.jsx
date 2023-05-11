import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

const CustomTests = ({
  input,
  addCustomTest,
  customTests,
  editingIndex,
  setEditingIndex,
  testName,
  setTestName,
  testInputs,
  setTestInputs,
  handleSaveEditedTest,
  testExpectedOutput,
  setTestExpectedOutput,
  setOpen, 
  open
}) => {

  useEffect(() => {
    if (editingIndex !== null && customTests[editingIndex]) {
      const test = customTests[editingIndex];
      setTestName(test.name);
      // Check if test.testFn.inputs is defined
      console.log("test",test)
      if (test.inputs) {
        // Assuming each test has inputs in the form { arg1: value1, arg2: value2, ... }
        setTestInputs(test.inputs);
      }
      setTestExpectedOutput(test.expectedOutput);
      handleClickOpen();
    } else {
      // If no test is being edited, clear the fields
      setTestName('');
      setTestInputs({});
      setTestExpectedOutput('');
    }
  }, [editingIndex, customTests]);
  
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingIndex(null);
  };

  const handleAddOrEditCustomTest = () => {
    const test = {
      name: testName,
      testFn: (fn) => {
        const parsedInputs = Object.keys(testInputs).reduce((acc, key) => {
          acc[key] = parseFloat(testInputs[key]);
          return acc;
        }, {});
  
        const result = fn(parsedInputs);
        return result === parseFloat(testExpectedOutput);
      },
      inputs: testInputs, 
      expectedOutput: testExpectedOutput, 
    };
  
    if (editingIndex === null) {
      addCustomTest(test);
    } else {
      handleSaveEditedTest(editingIndex, test);
    }
  
    setEditingIndex(null);
    setOpen(false);
  };
  
  
  

  return (
    <>
      <Button onClick={handleClickOpen} variant="contained">
        Add Custom Test
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingIndex === null ? 'Add' : 'Edit'} Custom Test</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the test name, input values, and expected output.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Test Name"
            type="text"
            fullWidth
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
          />
          {Object.keys(input).map((key) => (
            <TextField
              key={key}
              margin="dense"
              label={`Input ${key}`}
              type={input[key]}
              fullWidth
              value={testInputs[key] || ''}
              onChange={(e) =>
                setTestInputs((prevTestInputs) => ({
                  ...prevTestInputs,
                  [key]: e.target.value,
                }))
              }
            />
          ))}
          <TextField
            margin="dense"
            label="Expected Output"
            type="number"
            fullWidth
            value={testExpectedOutput}
            onChange={(e) => setTestExpectedOutput(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddOrEditCustomTest}>
            {editingIndex === null ? 'Add Test' : 'Save Test'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CustomTests;

