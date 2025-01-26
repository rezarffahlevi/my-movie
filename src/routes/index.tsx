import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MovieComponent } from "./movie";

export const Route = createFileRoute("/")({
  component: MovieComponent,
});