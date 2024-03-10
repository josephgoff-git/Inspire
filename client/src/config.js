// export const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080/api' : 'https://socialwebappserver.azurewebsites.net/api'
const local_server = true;
export const API_URL = local_server? 'http://localhost:8080/api' : 'https://socialwebappserver.azurewebsites.net/api';

export const UPLOAD_URL = "https://socialwebappblobs.blob.core.windows.net/blobs/"

export const PAGE_URL = process.env.NODE_ENV === 'development' ? "http://localhost:3000" : "https://inspireconnect.online"