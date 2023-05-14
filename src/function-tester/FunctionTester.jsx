import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import TestTable from './TestTable';
import CustomTestManager from './CustomTestManager';

export const FunctionTester = ({ fn, input, output, tests, onFinish }) => {
  const [customTests, setCustomTests] = useState([]);
  const [testResults, setTestResults] = useState({});
  const [totalPoints, setTotalPoints] = useState(0);

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
        <CustomTestManager
          customTests={customTests}
          setCustomTests={setCustomTests}
          testResults={testResults}
          setTestResults={setTestResults}
          handleTestExecution={handleTestExecution}
          input={input}
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
