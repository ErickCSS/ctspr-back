import { Button } from "@modules/ui/button";

export const DashboardHeaderNav = () => {
  return (
    <div className="flex items-center">
      <Button
        variant="outline"
        className="hover:bg-primaryColor hover:border-primaryColor bg-secondaryColor border-secondaryColor cursor-pointer border text-white transition-colors duration-300 hover:text-white"
      >
        Sign Out
      </Button>
    </div>
  );
};
