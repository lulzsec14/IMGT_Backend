const whitelist = ["https://imgt-client.vercel.app"];

export const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  // if (whitelist.indexOf(req.header("Origin")) !== -1) {
  corsOptions = {
    origin: true,
    credentials: true,
    methods: ["POST", "PUT", "GET", "DELETE", "OPTIONS", "HEAD"],
  };
  // } else {
  //   corsOptions = { origin: false };
  // }
  callback(null, corsOptions);
};
