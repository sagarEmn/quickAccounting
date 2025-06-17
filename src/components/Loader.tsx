import { Loader2 } from "lucide-react";

interface LoaderProps {
  value?: number;
}

function Loader({}: LoaderProps) {
  return (
    <div className="flex flex-col items-center">
      <Loader2 className="h-24 w-24 animate-spin text-blue-600" />
      <p className="text-center mt-2"> Loading data...</p>
    </div>
  );
}

export { Loader };
