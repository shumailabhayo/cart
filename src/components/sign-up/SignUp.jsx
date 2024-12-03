import { Box, Button, InputAdornment, TextField, Typography, Card } from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// Validation schema using Yup
const schema = yup
  .object({
    firstName: yup.string().required("First name is required"),
    secondName: yup.string().required("Second name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(7, "Password must be at least 7 characters").max(10, "Password must be at most 10 characters").required("Password is required"),
  });

const SignUp = () => {
  const [ShowPassword, setShowPassword] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: '',
      secondName: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <form onSubmit={handleSubmit((data) => {
        console.log(data);
      })}>
        {/* Card to wrap the form */}
        <Card sx={{ width: 350, padding: 3, boxShadow: 3 }}>
          <Typography className='fw-bold' variant='h4' align='center'>Get Started Shopping</Typography>
          <Typography variant='h6' align='center' sx={{ mb: 2 }}>Welcome to FreshCart! Enter your details to get started.</Typography>

          {/* First Name */}
          <Box className='my-3'>
            <Controller
              control={control}
              name="firstName"
              render={({ field }) => (
                <TextField
                  error={!!errors?.firstName}
                  placeholder='First Name'
                  size='small'
                  fullWidth
                  {...field}
                />
              )}
            />
            <Typography className='text-danger'>{errors?.firstName?.message}</Typography>
          </Box>

          {/* Second Name */}
          <Box className='my-3'>
            <Controller
              control={control}
              name="secondName"
              render={({ field }) => (
                <TextField
                  error={!!errors?.secondName}
                  placeholder='Second Name'
                  size='small'
                  fullWidth
                  {...field}
                />
              )}
            />
            <Typography className='text-danger'>{errors?.secondName?.message}</Typography>
          </Box>

          {/* Email */}
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

          {/* Password */}
          <Box className='my-3'>
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

          {/* Sign Up Button */}
          <Button className='my-3 bg-success' type='submit' fullWidth variant='contained'>
            Sign Up
          </Button>
       
        </Card>
      </form>
    </div>
  );
};

export default SignUp;
