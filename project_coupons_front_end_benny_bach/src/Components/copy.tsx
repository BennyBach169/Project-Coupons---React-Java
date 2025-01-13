import { Box, Button, TextField, Typography } from "@mui/material";
import "./Login.css";
import { useState, FormEvent } from "react";

export function copy(): JSX.Element {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submission
        console.log('Submitted Email:', email);
        console.log('Submitted Password:', password);
        // Add your login logic here
    };

    
    return (
        <div className="Login">
	   <Box
            component="form"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "30vh",
                backgroundColor: "var(--primary-color)", // Light background color for contrast
                padding: "2rem",
                
            }}
            noValidate
            autoComplete="off"
        >
            <Typography variant="h4" gutterBottom>
                Log In
            </Typography>
            <TextField
                label="Email"
                variant="outlined"
                type="email"
                fullWidth
                margin="normal"
                sx={{
                    width: '25ch',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'var(--secondary-color)', // Custom border color
                        },
                        '&:hover fieldset': {
                            borderColor: 'rgba(245, 166, 35, 0.8)', // Border color on hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'var(--secondary-color)', // Border color when focused
                        },
                    },
                }}
            />
            <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                margin="normal"
                sx={{
                    width: '25ch',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'var(--secondary-color)', // Custom border color
                        },
                        '&:hover fieldset': {
                            borderColor: 'rgba(245, 166, 35, 0.8)', // Border color on hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'var(--secondary-color)', // Border color when focused
                        },
                    },
                }}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: "1rem", width: "25ch" ,backgroundColor: "var(--secondary-color)"}}
            >
                Log In
            </Button>
        </Box>
        </div>
    );
}
