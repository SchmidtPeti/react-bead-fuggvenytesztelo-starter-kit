import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';

const TestTable = ({
  tests,
  testResults,
  handleTestExecution,
  handleDeleteCustomTest,
  handleEditCustomTest,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Result</TableCell>
            <TableCell>Action</TableCell>
            <TableCell>Points</TableCell>
            {handleDeleteCustomTest && handleEditCustomTest && (
              <>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </>
            )}
                      </TableRow>
        </TableHead>
        <TableBody>
          {tests.map((test, index) => (
            <TableRow key={index}>
            <TableCell>{test && test.name ? test.name : 'Test has no name'}</TableCell>
            <TableCell>
              {testResults[test.name] === undefined
                ? ''
                : testResults[test.name]
                ? 'Passed'
                : 'Failed'}
            </TableCell>
            <TableCell>
              <Button
                onClick={() => handleTestExecution(test)}
                variant="contained"
                color={
                  testResults[test.name] === undefined
                    ? 'primary'
                    : testResults[test.name]
                    ? 'success'
                    : 'error'
                }
              >
                {testResults[test.name] === undefined
                  ? 'Run Test'
                  : testResults[test.name]
                  ? 'Passed'
                  : 'Failed'}
              </Button>
            </TableCell>
            <TableCell>{test.points || 'Not defined'}</TableCell>
            {handleDeleteCustomTest && handleEditCustomTest && (
              <>
                <TableCell>
                <Button
                  onClick={() => handleEditCustomTest(index)}
                  variant="contained"
                  color="info"
                >
                  Edit
                </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleDeleteCustomTest(index)}
                    variant="contained"
                    color="error"
                  >
                    Delete
                  </Button>
                </TableCell>
              </>
            )}
          </TableRow>          
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TestTable;

