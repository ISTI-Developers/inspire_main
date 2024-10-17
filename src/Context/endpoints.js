const host =
  import.meta.env.MODE === "development"
    ? "http://localhost/inspiredb"
    : "https://inspireleaders.com.ph/api";
export default host;

export const endpoints = {
  newsletter: host + "/newsletter.php",
  client: host + "/clients.php",
  inquiry: host + "/inquiry.php",
  registration: host + "/registration.php",
  experts: host + "/experts.php",
  programs: host + "/programs.php",
  blogs: host + "/blogs.php",
  banners: host + "/banners.php",
  partners: host + "/partners.php",
  testimonials: host + "/testimonials.php",
};
