import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const CustomTestEditor = ({ index, customTest, setCustomTest, staticTestFn }) => {
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);

  const handleInputChange = (event, key) => {
    setCustomTest({ ...customTest, [key]: event.target.value });
  };

  const handleExecuteTest = () => {
    try {
      const testFn = new Function('staticTestFn', 'args', 'return ' + customTest.testFn)();
      const result = testFn(staticTestFn, customTest.args ? JSON.parse(customTest.args) : []);
      setError(null);
      setCustomTest({ ...customTest, result });
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleEditing = () => {
    setEditing(!editing);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={1}>
        <strong>{index + 1}.</strong>
      </Grid>
      <Grid item xs={2}>
        {editing ? (
          <TextField
            label="Test Name"
            value={customTest.name}
            onChange={(e) => handleInputChange(e, 'name')}
          />
        ) : (
          <strong>{customTest.name}</strong>
        )}
      </Grid>
      <Grid item xs={2}>
        {editing ? (
          <TextField
            label="Test Function"
            value={customTest.testFn}
            onChange={(e) => handleInputChange(e, 'testFn')}
          />
        ) : (
          <code>{customTest.testFn}</code>
        )}
      </Grid>
      <Grid item xs={2}>
        {editing ? (
          <TextField
            label="Function Args"
            value={customTest.args}
            onChange={(e) => handleInputChange(e, 'args')}
          />
        ) : (
          <code>{customTest.args}</code>
        )}
      </Grid>
      <Grid item xs={1}>
        <Button
          onClick={handleExecuteTest}
          variant="contained"
          color={customTest.result === undefined ? 'primary' : customTest.result ? 'success' : 'error'}
        >
          {customTest.result === undefined ? 'Run Test' : customTest.result ? 'Passed' : 'Failed'}
        </Button>
      </Grid>
      <Grid item xs={1}>
        <IconButton onClick={toggleEditing}>
          <EditIcon />
        </IconButton>
      </Grid>
      <Grid item xs={1}>
        <IconButton
          onClick={() => {
            setCustomTest(null);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
      {error && (
        <Grid item xs={12}>
          <span>Error: {error}</span>
        </Grid>
      )}
    </Grid>
  );
};
