import axios from "axios";

 const fetchDataFromApi = async (suburl, params,headers) => {
  try {
    const response = await axios.get("http://localhost:10000/api/v1" + suburl, {
      params,
      headers: headers,
    });
    return response.data;
  } catch (err) {
    // console.error(err);
    return err;
  }
};


 const postDataApi = async (suburl, params,headers,body) => {
  try {
    const response = await axios.post("http://localhost:10000/api/v1" + suburl, {
      params,
      headers: headers,
    },
body);
    return response.data;
  } catch (err) {
    // console.error(err);
    return err;
  }
};

export {fetchDataFromApi,postDataApi}