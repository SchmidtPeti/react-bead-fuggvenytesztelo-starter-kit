import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import TestTable from './TestTable';
import CustomTests from './CustomTests';

export const FunctionTester = ({ fn, input, output, tests, onFinish }) => {
  const [customTests, setCustomTests] = useState([]);
  const [testResults, setTestResults] = useState({});
  const [totalPoints, setTotalPoints] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);
  const [testName, setTestName] = useState('');
  const [testInputs, setTestInputs] = useState({});
  const [testExpectedOutput, setTestExpectedOutput] = useState('');
  const [open, setOpen] = useState(false);


  useEffect(() => {
    setTestResults(
      tests.reduce((acc, test) => {
        acc[test.name] = undefined;
        return acc;
      }, {})
    );
  }, [tests]);

  const handleTestExecution = (test) => {
    const result = test.testFn(fn);
    setTestResults((prevTestResults) => ({
      ...prevTestResults,
      [test.name]: result,
    }));

    if (result) {
      setTotalPoints((prevTotalPoints) => prevTotalPoints + test.points);
    }

    return result;
  };

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

    // Also delete the corresponding test result
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
  
  const handleRunAllTests = () => {
    let total = 0;
    tests.forEach((test) => {
      if (handleTestExecution(test)) {
        total += test.points;
      }
    });
    customTests.forEach((test) => handleTestExecution(test));
    setTotalPoints(total);
  };

  const handleFinish = () => {
    const givenTestsWithResults = tests.map(test => ({
      name: test.name,
      result: testResults[test.name],
    }));
    const customTestsWithResults = customTests.map(test => ({
      name: test.name,
      input: test.inputs,
      output: test.expectedOutput,
      result: testResults[test.name],
    }));
    const testResult = {
      achieved: totalPoints,
      all: totalPoints + Object.keys(testResults).length - tests.length,
    };
    onFinish({
      givenTests: givenTestsWithResults,
      testResult,
      customTests: customTestsWithResults,
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">FunctionTester</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Function: {fn.toString()}</Typography>
      </Grid>
      <Grid item xs={12}>
        <TestTable
          tests={tests}
          testResults={testResults}
          handleTestExecution={handleTestExecution}
        />
      </Grid>
      <Grid item xs={12}>
        <Button onClick={handleRunAllTests} variant="contained">
          Run All Tests
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Total Points: {totalPoints}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Custom Tests</Typography>
        <TestTable
          tests={customTests}
          testResults={testResults}
          handleTestExecution={handleTestExecution}
          handleDeleteCustomTest={handleDeleteCustomTest}
          handleEditCustomTest={handleEditCustomTest}
        />
      </Grid>
      <Grid item xs={12}>
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

      </Grid>
      <Grid item xs={12}>
        <Button onClick={handleFinish} variant="contained">
          OK
        </Button>
      </Grid>
    </Grid>
  );
};

