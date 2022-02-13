import multer from "multer";
import nextConnect from "next-connect";
import path from "path";

const development = process.env.NODE_ENV !== "production";

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public");
    },
    filename: (req, file, cb) => {
      cb(
        null,
        new Date().toLocaleString().replace(/ /g, "") +
          path.extname(file.originalname)
      );
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const apiRoute = nextConnect({
  onNoMatch(req, res) {
    res.end({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.post(upload.single("image"), (req, res) => {
  res.json({
    data: development
      ? "http://localhost:3000/" + req.file?.filename
      : "https://sowoon-1221.vercel.app" + req.file?.filename,
  });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
