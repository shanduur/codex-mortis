import { render, screen, within } from "@testing-library/react";
import { Cpu } from "lucide-react";
import { describe, expect, it } from "vitest";

import {
  Container,
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
  Divider,
  EmptyState,
  Grid,
  Header,
  Heading,
  Icon,
  Image,
  Link,
  List,
  ListItem,
  Main,
  Page,
  PageHeader,
  Prose,
  Sidebar,
  Stack,
  Stat,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableOfContents,
  TableRow,
  Text,
} from "../index";

describe("layout and content primitives", () => {
  it("composes a semantic application page", () => {
    render(
      <Page>
        <Header>Product header</Header>
        <Sidebar aria-label="Section navigation">Navigation</Sidebar>
        <Main>
          <Container size="sm">
            <PageHeader
              title="Systems"
              description="Inspect deployed systems."
            />
            <Stack gap="4">
              <Heading level={2}>Available systems</Heading>
              <Text>Choose a system to inspect.</Text>
              <Grid columns={2}>
                <span>Rack 01</span>
                <span>Rack 02</span>
              </Grid>
            </Stack>
          </Container>
        </Main>
      </Page>,
    );

    expect(screen.getByRole("banner")).toHaveTextContent("Product header");
    expect(
      screen.getByRole("complementary", { name: "Section navigation" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "Systems" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Available systems" }),
    ).toBeInTheDocument();
  });

  it("renders readable content and media semantics", () => {
    render(
      <Prose>
        <Icon label="Compute">
          <Cpu />
        </Icon>
        <Image src="/rack.png" alt="Compute rack" />
        <Link href="#details">Read details</Link>
        <List>
          <ListItem>Fast</ListItem>
          <ListItem>Inspectable</ListItem>
        </List>
        <DescriptionList>
          <DescriptionTerm>Status</DescriptionTerm>
          <DescriptionDetails>Operational</DescriptionDetails>
        </DescriptionList>
        <Divider />
      </Prose>,
    );

    expect(
      screen.getByRole("img", { name: "Compute rack" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Compute" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Read details" })).toHaveAttribute(
      "href",
      "#details",
    );
    expect(screen.getByRole("list")).toHaveTextContent("FastInspectable");
    expect(screen.getByText("Status").tagName).toBe("DT");
    expect(screen.getByText("Operational").tagName).toBe("DD");
  });

  it("presents empty, statistical, table, and contents data accessibly", () => {
    render(
      <>
        <EmptyState
          title="No systems"
          description="Create a system to get started."
        />
        <Stat label="Deployments" value="24" description="This month" />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>System</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Rack 01</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <TableOfContents
          items={[
            { href: "#overview", label: "Overview" },
            { href: "#usage", label: "Usage" },
          ]}
        />
      </>,
    );

    expect(
      screen.getByRole("heading", { name: "No systems" }),
    ).toBeInTheDocument();
    expect(screen.getByText("24")).toHaveAccessibleName("Deployments: 24");
    expect(
      within(screen.getByRole("table")).getByRole("columnheader", {
        name: "System",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "Table of contents" }),
    ).toHaveTextContent("OverviewUsage");
  });
});
