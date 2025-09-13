import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "./LoginPage";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter } from "react-router-dom";

test("renders login form", () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    </BrowserRouter>
  );

  // Check if input fields exist
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  
  // Check if login button exists
  expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
});

test("allows user to type email and password", () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    </BrowserRouter>
  );

  const emailInput = screen.getByLabelText(/Email/i);
  const passwordInput = screen.getByLabelText(/Password/i);

  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "123456" } });

  expect(emailInput.value).toBe("test@example.com");
  expect(passwordInput.value).toBe("123456");
});
