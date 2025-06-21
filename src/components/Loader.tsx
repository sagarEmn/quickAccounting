// import { LoaderCircle } from "lucide-react";
import CircularProgress from "@mui/material/CircularProgress";

interface LoaderProps {
  value?: number;
}

function Loader({ value }: LoaderProps) {
  return (
    <div className="flex flex-col items-center">
      <CircularProgress size={80} value={value} />
      <p className="text-center mt-2">Loading data...</p>
    </div>
  );
}

export { Loader };
