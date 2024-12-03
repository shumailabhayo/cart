import { Box, Button, InputAdornment, TextField, Typography, Card } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Validation schema
const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(7, "Password must be at least 7 characters").max(10, "Password must be at most 10 characters").required("Password is required"),
  });

const SignIn = () => {
  const [ShowPassword, setShowPassword] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  return (
    <>
      <div className='d-flex justify-content-center align-items-center vh-100'>
        <form onSubmit={handleSubmit((data) => {
          console.log(data);
        })}>
          {/* Card layout for the form */}
          <Card sx={{ width: 350, padding: 3, boxShadow: 3 }}>
            <Typography className='fw-bold' variant='h4' align='center'>Sign in to E-Store</Typography>
            <Typography variant='h6' align='center' sx={{ mb: 2 }}>Welcome to FreshCart! Enter your email to get started.</Typography>

            {/* Email input */}
            <Box className='my-3'>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <TextField
                    error={!!errors?.email}
                    placeholder='Email'
                    size='small'
                    fullWidth
                    {...field}
                  />
                )}
              />
              <Typography className='text-danger'>{errors?.email?.message}</Typography>
            </Box>

            {/* Password input */}
            <Box>
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <TextField
                    error={!!errors?.password}
                    placeholder='Password'
                    size='small'
                    type={ShowPassword ? 'text' : 'password'}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end" onClick={() => setShowPassword(!ShowPassword)} sx={{ cursor: 'pointer' }}>
                            {ShowPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </InputAdornment>
                        ),
                      },
                    }}
                    fullWidth
                    {...field}
                  />
                )}
              />
              <Typography className='text-danger'>{errors?.password?.message}</Typography>
            </Box>

            {/* Sign in button */}
            <Button className='my-3 bg-success ' type='submit' fullWidth variant="contained">Sign In</Button>

            {/* Sign up link */}
            <Typography className='mt-3 ' variant='body1' align='center'>
              Don’t have an account? <Link className='' to="/sign-up">Sign Up</Link>
            </Typography>
          </Card>
        </form>
      </div>
    </>
  );
};

export default SignIn;

