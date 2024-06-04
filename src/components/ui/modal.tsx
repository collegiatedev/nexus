"use client";

import { Dialog } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";

import * as React from "react";
import { useMyStore } from "~/lib/store/provider";

export const ModalContext = ({ children }: { children: React.ReactNode }) => {
  const isOpen = useMyStore((state) => state.isOpen);

  return <Dialog open={isOpen}>{children}</Dialog>;
};

export const OpenModal = ({
  children,
  url,
}: {
  children: React.ReactNode;
  url: string;
}) => {
  const setOpen = useMyStore((state) => state.setOpen);
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push(`${url}`);
        setOpen();
      }}
    >
      {children}
    </div>
  );
};

export const CloseModal = ({ children }: { children: React.ReactNode }) => {
  const setClose = useMyStore((state) => state.setClose);
  const router = useRouter();

  return (
    <div
      onClick={() => {
        // change later
        router.push("/calendar");
        setClose();
      }}
    >
      {children}
    </div>
  );
};
