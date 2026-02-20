import React, { useEffect, useState } from "react";
import ApiClient from "../apiClient";

interface IGetRequest {
  endpoind: string;
  id?: string;
}
const useGet = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const apiClient = new ApiClient();

  const loadData = async (params: IGetRequest) => {
    setLoading(true);
    await apiClient
      ._makeRequest(
        "get",
        params?.id ? `${params.endpoind}/${params.id}` : params.endpoind,
      )
      .then((response: any) => {
        if (response.status === 200) {
          setData(response.data);
          setLoading(false);
        }
      })
      .catch((error: any) => {
        setError(error);
        setLoading(false);
      });
  };
  return { loadData, data, loading, error };
};

export default useGet;
