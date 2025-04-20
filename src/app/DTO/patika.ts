interface GetPatikaResponse {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  language: {
    id: string;
    name: string;
  };
  deadline: string;
  imgUrl: string;
  link: string;
  isDead: boolean;
}

export {GetPatikaResponse};
