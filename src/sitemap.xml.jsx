import { useEffect, useState } from "react";
import { userHomePage } from "./Service/Services";

const Sitemap = () => {
  const [doctor, setDoctor] = useState([]);
  const fetchVideos = async () => {
    const response = await userHomePage();
    if (response?.data.status) {
      setDoctor(response.data?.data);
    }
  };
  useEffect(() => {
    fetchVideos();
  }, []);
  return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
      ${doctor
        .map((item) => {
          return `
            <url>
              <loc>${`https://healthmudraa.com/videos/${decodeURIComponent(
                item.title.split(" ").join("-").toString()
              )}`}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>hourly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join("")}
    </urlset>
  `;
};

export default Sitemap;
