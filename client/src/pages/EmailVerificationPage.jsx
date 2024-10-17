import { useParams } from "react-router-dom";

// redux imports
import { useVerifyEmailQuery } from "@/features/apiSlice";

function EmailVerificationPage() {
  const { token } = useParams();

  const { data, isLoading, isError } = useVerifyEmailQuery(token);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error verifying email.</p>;
  return (
    <>
      <p>{data.serverMsg}</p>
    </>
  );
}

export default EmailVerificationPage;
