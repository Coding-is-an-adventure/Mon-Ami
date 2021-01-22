import axios, { AxiosResponse } from "axios";
import { history } from "../..";
import { IActivity } from "../models/activity";
import { toast } from "react-toastify";
import { IUser, IUserFormValues } from "../models/user";
import { IPicture, IProfile } from "../models/profile";

axios.defaults.baseURL = "https://localhost:5001/api"
axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("jwt");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.response) {
    toast.error("Network error - make sure API is running!");
  }
  const { status, data, config, headers } = error.response;
  if (status === 404) {
    history.push("/notfound");
  }
  const header = headers["www-authenticate"];
  if (
    status === 401 &&
    header.includes('Bearer error="invalid_token"') === true
  ) {
    window.localStorage.removeItem("jwt");
    history.push("/");
    toast.info("You session has expired, please login again");
  }
  if (
    status === 400 &&
    config.method === "get" &&
    data.errors.hasOwnProperty("id")
  ) {
    history.push("/notfound");
  }
  if (status === 500) {
    toast.error(
      "Server error - the server is currently unavailable, please try again later."
    );
  }
  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

// const sleep = (ms: number) => (response: AxiosResponse) =>
//   new Promise<AxiosResponse>((resolve) =>
//     setTimeout(() => resolve(response), ms)
//   );

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
  postForm: (url: string, file: Blob) => {
    let formData = new FormData();
    formData.append("File", file);
    return axios
      .post(url, formData, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(responseBody);
  },
};

const User = {
  current: (): Promise<IUser> => requests.get("/user"),
  login: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/user/login`, user),
  register: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/user/register`, user),
};

const Activities = {
  list: (): Promise<IActivity[]> => requests.get("/activities"),
  details: (id: string) => requests.get(`/activities/${id}`),
  create: (activity: IActivity) => requests.post("./activities", activity),
  update: (activity: IActivity) =>
    requests.put(`./activities/${activity.id}`, activity),
  delete: (id: string) => requests.delete(`./activities/${id}`),
  attend: (id: string) => requests.post(`/activities/${id}/attend`, {}),
  leave: (id: string) => requests.delete(`/activities/${id}/attend`),
};

const Profiles = {
  get: (username: string): Promise<IProfile> =>
    requests.get(`/profiles/${username}`),
  uploadPicture: (picture: Blob): Promise<IPicture> =>
    requests.postForm(`/pictures`, picture),
  setMainPicture: (id: string) => requests.post(`/pictures/${id}/setMain`, {}),
  deletePicture: (id: string) => requests.delete(`/pictures/${id}`),
  updateProfile: (profile: Partial<IProfile>) =>
    requests.put(`/profiles`, profile),
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  Activities,
  User,
  Profiles,
};
