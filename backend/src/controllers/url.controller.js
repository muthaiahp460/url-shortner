import Url from "../models/Url.js";
import generateShortCode from "../utils/generateShortCode.js";

export const createShortUrl = async (req, res) => {
  try {
    const { longUrl } = req.body;

    const shortCode = generateShortCode();

    const url = await Url.create({
      longUrl,
      shortCode,
      owner: req.user.id,
    });

    res.status(201).json({
      shortUrl: `${process.env.BASE_URL}/${shortCode}`,
      longUrl,
    });
  } catch {
    res.status(500).json({ message: "URL creation failed" });
  }
};

export const getUserUrls = async (req, res) => {
  const urls = await Url.find({ owner: req.user.id }).sort({ createdAt: -1 });
  res.json(urls);
};

export const redirectToLongUrl = async (req, res) => {
  const { shortCode } = req.params;

  const url = await Url.findOne({ shortCode });
  if (!url) return res.status(404).send("URL not found");

  url.clicks++;
  await url.save();

  res.redirect(url.longUrl);
};
