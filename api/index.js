import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import messageRoutes from "./routes/messages.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import storyRoutes from "./routes/stories.js";
import relationshipRoutes from "./routes/relationships.js";
import cors from "cors";
import multer from "multer";
import path from "path";
import url from "url";
import AWS from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const app = express();
const PORT = process.env.PORT || 8080;
// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

console.log(process.env.NODE_ENV)
//middlewares
app.use((req, res, next) => {
  if (req.headers.authorization) {
    req.accessToken = req.headers.authorization.split(' ')[1]
  }
  next()
})

app.use(express.json())
app.use(cors({
  origin: "http://localhost:3000" || "https://inspireconnect.site",
  credentials: true,
  // exposedHeaders: ['Authorization'],
}))

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "../client/public/upload");
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + file.originalname);
//     },
// });

// const upload = multer({ storage: storage });

// app.post("/api/upload", upload.single("file"), (req,res)=>{
//     const file = req.file;
//     res.status(200).json(file.filename)
// })





// Old Azure blob storage
// import { BlobServiceClient } from '@azure/storage-blob';

// const connectionString = 'DefaultEndpointsProtocol=https;AccountName=socialwebappblobs;AccountKey=CbOGUp77HogOKpCD45whk9hTgKphwik3KxDFM9OhKGD17G/m8QVyIlku/+/x/g1SUthYjTivPjUf+AStb480Fw==;EndpointSuffix=core.windows.net';
// const containerName = 'blobs';

// const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
// const containerClient = blobServiceClient.getContainerClient(containerName);

// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// app.post("/api/upload", upload.single("file"), async (req, res) => {
//   try {
//     const blobName = `${Date.now()}-${req.file.originalname}`;
//     const blockBlobClient = containerClient.getBlockBlobClient(blobName);

//     await blockBlobClient.uploadData(req.file.buffer, {
//       blobHTTPHeaders: { blobContentType: req.file.mimetype },
//     });

//     const imageUrl = blockBlobClient.url;
//     // Store the imageUrl in your database or use it as needed

//     res.status(200).json({ imageUrl });
//   } catch (error) {
//     console.error('Error uploading image:', error);
//     res.status(500).json({ error: 'Failed to upload image' });
//   }
// });


const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), async (req, res) => {
  console.log("Uploading to Database")
  try {
    const blobName = `inspire-connect/${Date.now()}-${req.file.originalname}`;
    const params = {
      Bucket: 'aws1-bucket1-jg',
      Key: blobName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      ACL: 'public-read',
    };

    await s3.upload(params).promise();

    const imageUrl = `https://aws1-bucket1-jg.s3.amazonaws.com/${blobName}`;
    // Store the imageUrl in your database or use it as needed

    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});



app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/likes", likeRoutes)
app.use("/api/relationships", relationshipRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/stories", storyRoutes)

app.listen(PORT, ()=> {
    console.log("API working!")
})

app.get('/',(req,res)=> {
    res.json({message: "Hello"})
  }
)

// Serve the static files
// app.use(express.static(path.join(__dirname, "..", "build")));

// For any route that is not recognized by the API, serve the React front-end
app.get('/api/*', (req, res) => {
  res.status(404).json("Page does not exist!");
});

// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, "..", "build", "index.html"))
// })



