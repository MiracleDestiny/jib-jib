export interface ErrorResponse {
  code: string;
  msg: string;
  status: number;
}

export const SUCCESS_OK: ErrorResponse = {
  code: "GOOD",
  msg: "Success",
  status: 200,
};

export const UNAUTHENTICATED_ERROR: ErrorResponse = {
  code: "100",
  msg: "User is unauthenticated",
  status: 401,
};

export const UNAUTHORIZED_ERROR: ErrorResponse = {
  code: "200",
  msg: "User is unauthorized",
  status: 403,
};

export const INTERNAL_SERVER_ERROR: ErrorResponse = {
  code: "300",
  msg: "Internal server error occured",
  status: 500,
};

export const FIND_UNIQUE_ERROR: ErrorResponse = {
  code: "400",
  msg: "Cannot find unique row from specified where clause",
  status: 404,
};

export const BAD_REQUEST: ErrorResponse = {
  code: "500",
  msg: "Bad request",
  status: 400,
};

//Add more error codes here
