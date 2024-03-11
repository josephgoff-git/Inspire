// export const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080/api' : 'https://socialwebappserver.azurewebsites.net/api'
const local_server = false;
// export const API_URL = local_server? 'http://localhost:8080/api' : 'https://socialwebappserver.azurewebsites.net/api';
export const API_URL = local_server? 'http://localhost:8080/api' : 'https://store.expertsoncall.online/api';

// export const UPLOAD_URL = "https://socialwebappblobs.blob.core.windows.net/blobs/"
export const UPLOAD_URL = "https://aws1-bucket1-jg.s3.amazonaws.com/inspire-connect/"

export const PAGE_URL = process.env.NODE_ENV === 'development' ? "http://localhost:3000" : "https://inspireconnect.online"