import React, { useState } from 'react';
import { Container, Typography, Box, TextField, FormControl, InputLabel, MenuItem, Select, Button, CircularProgress } from '@mui/material';
import './App.css'
import axios from 'axios';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post("http://localhost:8080/api/email/generate", {
        emailContent,
        tone
      });
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Container maxWidth="md" sx={{py:4}} className="app-container">
        <Typography variant="h4" component="h1" gutterBottom>
          Email Reply Generator
        </Typography>
        <Box sx={{ mx: 3}}>
          <TextField
          fullWidth
          multiline
          rows={6}
          variant='outlined'
          label="Original Email Content"
          value={emailContent || ''}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Tone (Optional)</InputLabel>
            <Select
              value={tone || ''}
              label="Tone (Optional)"
              onChange={(e) => setTone(e.target.value)}>
                <MenuItem value="">None</MenuItem>
                <MenuItem value="formal">Formal</MenuItem>
                <MenuItem value="friendly">Friendly</MenuItem>
                <MenuItem value="concise">Concise</MenuItem>
                <MenuItem value="professional">Professional</MenuItem>
                <MenuItem value="empathetic">Empathetic</MenuItem>
                <MenuItem value="concise">Concise</MenuItem>
                <MenuItem value="detailed">Detailed</MenuItem>
                <MenuItem value="persuasive">Persuasive</MenuItem>
                <MenuItem value="apologetic">Apologetic</MenuItem>
                <MenuItem value="assertive">Assertive</MenuItem>
                <MenuItem value="casual">Casual</MenuItem>
                <MenuItem value="humorous">Humorous</MenuItem>
                <MenuItem value="sympathetic">Sympathetic</MenuItem>
                <MenuItem value="optimistic">Optimistic</MenuItem>
                <MenuItem value="confident">Confident</MenuItem>
            </Select>
          </FormControl>
          <Button variant='contained' color='primary' fullWidth
          onClick={handleSubmit}
          disabled={!emailContent || loading}>
            {loading ? <CircularProgress size={24}/>: "Generate Reply"}
          </Button>
        </Box>
        {error && (
           <Typography color='error'  sx={{ mb: 2 }}>
          {error}
        </Typography>
        )}
        {generatedReply && (

          <Box sx={{mt:3}}>
            <Typography variant='h6' gutterBottom>
            Generated Reply:
            </Typography>
            <TextField 
            fullWidth
            multiline
            rows={6}
            variant='outlined'
            value={generatedReply || ''}
            inputProps={{readOnly: true}}/>
            <Button
            variant='outlined'
            sx={{mt:2}}
            onClick={() => navigator.clipboard.writeText(generatedReply)}>
              Copy to Clipboard
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
}

export default App
