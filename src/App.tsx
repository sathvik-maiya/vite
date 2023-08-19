import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import * as z from "zod";
import { useNavigate } from "react-router-dom";

const userSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  phoneNumber: z
    .string()
    .nonempty({ message: "Phone number is required" })
    .regex(/^\d{10}$/, "Please enter a valid 10-digit phone number"),
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email("Please enter a valid email"),
});

type UserFormValues = z.infer<typeof userSchema>;

const App = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
    },
  });
  const navigate = useNavigate();
  const onSubmit = (data: UserFormValues) => {
    console.log("Form data submitted:", data);
    localStorage.setItem("data", JSON.stringify(data));
    navigate("/second");
  };

  return (
    <Container  
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          User Information
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />

          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone Number"
                fullWidth
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />

          <Box
            mt={2}
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default App;
