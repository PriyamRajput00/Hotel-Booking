import React, { useState } from "react"; // Removed 'useContext'
import Toast from "../Components/Toast";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";

type ToastMessage = {
  message: string;
  type: "Success" | "Error";
};

type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

  const { isError } = useQuery({
    queryKey: ['validateToken'],
    queryFn: apiClient.validateToken,
    retry: false,
    refetchOnWindowFocus: false, // 🔴 ADDED: Prevent refetch on window focus
    throwOnError: false, // 🔴 ADDED: Prevent error from being thrown to error boundary
  });

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
        isLoggedIn: !isError, // This line correctly handles the login state
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  const context = React.useContext(AppContext); // This already uses React.useContext
  if (!context) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }
  return context as AppContext;
};