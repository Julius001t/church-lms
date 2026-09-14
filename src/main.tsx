import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Toaster } from "react-hot-toast";

import "./index.css";

import { router } from "@/routes";
import { queryClient } from "@/lib/queryClient";

import AuthInitializer from "@/features/auth/components/AuthInitializer";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthInitializer />

      <RouterProvider router={router} />

      <Toaster
        position="top-right"
        reverseOrder={false}
      />

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);