import { useRouteError, useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const { status, statusText, data } = useRouteError();
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <h1>{status}</h1>
        <h2>{statusText}</h2>
        <p>{data}</p>
      </div>
    </div>
  );
};
