import type { FormEvent } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  Checkbox,
  Combobox,
  DatePicker,
  Fieldset,
  FileUpload,
  Form,
  FormErrorSummary,
  FormField,
  FormSection,
  Input,
  InputGroup,
  NumberInput,
  RadioGroup,
  Select,
  Slider,
  Switch,
  TimePicker,
} from "../index";

describe("form components", () => {
  it("connects field labels, help, and errors to their controls", () => {
    render(
      <Form aria-label="System settings">
        <FormSection title="Identity" description="How the system appears.">
          <FormField
            id="system-name"
            label="System name"
            description="Use a unique name."
            error="A name is required."
            required
          >
            <Input />
          </FormField>
        </FormSection>
      </Form>,
    );

    const input = screen.getByRole("textbox", { name: "System name" });
    expect(input).toHaveAttribute("id", "system-name");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription(
      "Use a unique name. A name is required.",
    );
    expect(screen.getByRole("group", { name: "Identity" })).toBeInTheDocument();
  });

  it("renders accessible choice and range controls", () => {
    render(
      <Fieldset legend="Deployment">
        <Checkbox aria-label="Enable autoscaling" />
        <RadioGroup
          name="region"
          label="Region"
          options={[
            { value: "eu", label: "Europe" },
            { value: "us", label: "United States" },
          ]}
        />
        <Select aria-label="Runtime" options={[{ value: "go", label: "Go" }]} />
        <Slider aria-label="Replicas" min={1} max={10} defaultValue={3} />
        <Switch aria-label="Public endpoint" />
      </Fieldset>,
    );

    expect(
      screen.getByRole("checkbox", { name: "Enable autoscaling" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("radiogroup", { name: "Region" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: "Runtime" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("slider", { name: "Replicas" })).toHaveValue("3");
    expect(
      screen.getByRole("switch", { name: "Public endpoint" }),
    ).not.toBeChecked();
  });

  it("provides purpose-specific native inputs and input composition", () => {
    render(
      <>
        <DatePicker aria-label="Deployment date" />
        <TimePicker aria-label="Deployment time" />
        <NumberInput aria-label="Replica count" />
        <FileUpload aria-label="Configuration file" accept=".yaml" />
        <InputGroup prefix="https://" suffix=".example.com">
          <Input aria-label="Hostname" />
        </InputGroup>
        <Combobox
          aria-label="Environment"
          options={[
            { value: "production", label: "Production" },
            { value: "staging", label: "Staging" },
          ]}
        />
      </>,
    );

    expect(screen.getByLabelText("Deployment date")).toHaveAttribute(
      "type",
      "date",
    );
    expect(screen.getByLabelText("Deployment time")).toHaveAttribute(
      "type",
      "time",
    );
    expect(
      screen.getByRole("spinbutton", { name: "Replica count" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Configuration file")).toHaveAttribute(
      "accept",
      ".yaml",
    );
    expect(
      screen.getByRole("textbox", { name: "Hostname" }),
    ).toBeInTheDocument();
    const combobox = screen.getByRole("combobox", { name: "Environment" });
    fireEvent.change(combobox, { target: { value: "production" } });
    expect(combobox).toHaveValue("production");
  });

  it("summarizes validation errors and preserves form submission", () => {
    const onSubmit = vi.fn((event: FormEvent) => event.preventDefault());
    render(
      <Form aria-label="Profile" onSubmit={onSubmit}>
        <FormErrorSummary
          errors={[{ href: "#email", message: "Enter an email address." }]}
        />
        <button type="submit">Save</button>
      </Form>,
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Enter an email address.",
    );
    expect(
      screen.getByRole("link", { name: "Enter an email address." }),
    ).toHaveAttribute("href", "#email");
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(onSubmit).toHaveBeenCalledOnce();
  });
});
