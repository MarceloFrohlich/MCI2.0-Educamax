'use client'

import React from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";

interface IGlobalDialogProps {
  title?: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
  contentClassName?: string;
  open?: boolean;
  onOpenChange?: (
    open: boolean
  ) => void;
}

const GlobalDialog: React.FC<IGlobalDialogProps> = ({
  title,
  trigger,
  children,
  contentClassName,
  open,
  onOpenChange
}) => {
  return (
    <Dialog
      onOpenChange={onOpenChange}
      open={open}
    >
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>

      <DialogContent className={contentClassName}>
        {title && (
          <DialogTitle>
            {title}
          </DialogTitle>
        )}

        {children}
      </DialogContent>
    </Dialog>
  );
};

export default GlobalDialog;