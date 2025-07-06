import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import App from "./App";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("App component", () => {
  beforeEach(() => {
    mockedAxios.post.mockReset();
  });

  test("renders title and Find Slots button", () => {
    render(<App />);
    expect(screen.getByText(/Find Available Time Slots/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Find Slots/i }),
    ).toBeInTheDocument();
  });

  test("successful slot updates table", async () => {
    mockedAxios.post.mockResolvedValue({
      status: 201,
      data: [{ start: "2025-07-06T10:00:00Z", end: "2025-07-06T11:00:00Z" }],
    });

    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /Find Slots/i }));

    await waitFor(() => {
      expect(screen.getByText(/7\/6\/2025/i)).toBeInTheDocument();
    });
  });

  test("displays error message on failure", async () => {
    mockedAxios.post.mockRejectedValue({
      response: { data: { message: "Something went wrong" } },
    });

    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /Find Slots/i }));

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    });
  });
});
