import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Button from "../Button";

describe("Button component", () => {
  test("renders button", () => {
    render(<Button />);

    expect(
      screen.getByRole("button", {
        name: /click me/i,
      })
    ).toBeInTheDocument();
  });
});