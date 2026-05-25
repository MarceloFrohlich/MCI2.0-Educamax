'use client'

import * as React from "react";

import { Button } from "../../../components/ui/button";

interface ITriggerButtonProps
  extends React.ComponentProps<typeof Button> {
  children: React.ReactNode;
}

const TriggerButton = React.forwardRef<
  HTMLButtonElement,
  ITriggerButtonProps
>(({ children, className, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={`
        size-10
        relative
        hover:cursor-pointer
        z-50
        flex
        items-center
        justify-center
        border
        ${className ?? ""}
      `}
      {...props}
    >
      {children}
    </Button>
  );
});

TriggerButton.displayName = "TriggerButton";

export default TriggerButton;