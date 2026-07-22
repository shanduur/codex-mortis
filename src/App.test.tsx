import { fireEvent, render, screen, within } from "@testing-library/react"
import { beforeEach, describe, expect, it } from "vitest"

import App from "./App"

describe("design language guide", () => {
  beforeEach(() => {
    window.location.hash = ""
    localStorage.clear()
    document.documentElement.classList.remove("dark")
  })

  it("opens with foundations and a browsable component catalogue", () => {
    render(<App />)

    expect(screen.getByRole("heading", { name: "Design language" })).toBeInTheDocument()
    expect(screen.getByRole("navigation", { name: "Guide navigation" })).toBeInTheDocument()
    const catalogue = screen.getByRole("list", { name: "Component catalogue" })
    expect(within(catalogue).getByRole("link", { name: /Button/ })).toBeInTheDocument()
    expect(screen.getByText("Editorial neo-industrialism")).toBeInTheDocument()
    expect(screen.getByText(/Neo-brutalist color is an accent, not the default surface/)).toBeInTheDocument()
  })

  it("navigates to a component guide with examples and usage code", () => {
    render(<App />)

    const catalogue = screen.getByRole("list", { name: "Component catalogue" })
    fireEvent.click(within(catalogue).getByRole("link", { name: /Button/ }))

    expect(screen.getByRole("heading", { name: "Button" })).toBeInTheDocument()
    expect(screen.getByText("Choose a variant by intent, not appearance.", { exact: false })).toBeInTheDocument()
    expect(screen.getByLabelText("Button component examples")).toBeInTheDocument()
    expect(screen.getByText(/import \{ Button \}/)).toBeInTheDocument()
  })

  it("documents the categorical accent palette", () => {
    render(<App />)

    fireEvent.click(screen.getAllByRole("link", { name: /Color/ })[0])

    expect(screen.getByText("Color is categorical, not ambient.")).toBeInTheDocument()
    expect(screen.getByText(/Most of the interface stays paper, ink, and muted neutral/)).toBeInTheDocument()
    expect(screen.getByText("Signal yellow")).toBeInTheDocument()
    expect(screen.getByText("Utility blue")).toBeInTheDocument()
    expect(screen.getByText("Alert coral")).toBeInTheDocument()
    expect(screen.getByText("Status green")).toBeInTheDocument()
  })

  it("filters the component catalogue by name", () => {
    render(<App />)

    fireEvent.change(screen.getByRole("searchbox", { name: "Filter components" }), {
      target: { value: "dialog" },
    })

    const catalogue = screen.getByRole("list", { name: "Component catalogue" })
    expect(within(catalogue).getByRole("link", { name: /Dialog/ })).toBeInTheDocument()
    expect(within(catalogue).queryByRole("link", { name: /Button/ })).not.toBeInTheDocument()
  })

  it("persists the selected color mode", () => {
    render(<App />)

    fireEvent.click(screen.getByRole("button", { name: "Use dark theme" }))

    expect(document.documentElement).toHaveClass("dark")
    expect(localStorage.getItem("theme")).toBe("dark")
  })
})
