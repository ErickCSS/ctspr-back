"use client";

import { Button } from "@modules/ui/button";
import { signOut } from "@modules/Login/actions/signOut.actions";
import { createDelayedPromise } from "@modules/shared/utils";
import { useTransition } from "react";
import { IconLoader2 } from "@tabler/icons-react";

export const DashboardHeaderNav = () => {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      await signOut();
      await createDelayedPromise();
    });
  };

  return (
    <div className="flex items-center">
      <Button
        variant="outline"
        className="hover:bg-primaryColor hover:border-primaryColor bg-secondaryColor disabled:bg-secondaryColor/70 border-secondaryColor cursor-pointer border text-white transition-colors duration-300 hover:text-white disabled:cursor-not-allowed"
        disabled={isPending}
        onClick={handleSignOut}
      >
        {isPending ? (
          <div className="flex items-center gap-x-2">
            <IconLoader2 className="animate-spin" />
            Signing out...
          </div>
        ) : (
          "Sign Out"
        )}
      </Button>
    </div>
  );
};
