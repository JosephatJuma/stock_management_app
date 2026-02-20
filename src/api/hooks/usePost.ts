import React, { useState } from "react";
import ApiClient from "../apiClient";

interface IPostRequest {
  endpoind: string;
  id?: string;
  data?: any;
  type: "application/json" | "multipart/form-data";
}
const usePost = () => {
  const [submitting, setSubmitting] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const apiClient = new ApiClient();

  const submitData = async (params: IPostRequest) => {
    setSubmitting(true);
    await apiClient
      ._makeRequest(
        "post",
        params?.id ? `${params.endpoind}/${params.id}` : params.endpoind,
        params?.data,
      )
      .then((response: any) => {
        if (response.status === 200) {
          setData(response.data);
          setSubmitting(false);
        }
      })
      .catch((error: any) => {
        setError(error);
        setSubmitting(false);
      });
  };
  return { submitData, data, submitting, error };
};

export default usePost;
