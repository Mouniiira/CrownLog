import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import LogoBar from "../components/LogoBar";
import "./HelpCenter.css";

function HelpArticle() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // 🔁 SAME DATA SOURCE (single source of truth)
  const categories = [
    {
      heading: "Account and login",
      links: [
        "Create an account",
        "Log in to CrownLog",
        "Reset your password",
        "Update your email",
      ],
    },
    {
      heading: "Journal",
      links: [
        "Create a new journal entry",
        "Use the rich text editor",
        "Delete an entry",
        "Preview saved content",
      ],
    },
    {
      heading: "Photo booth",
      links: [
        "Add a hairstyle card",
        "Upload hairstyle photos",
        "Add materials needed",
        "Save tutorial videos",
      ],
    },
    {
      heading: "Calendar",
      links: [
        "Add an event",
        "Edit an event",
        "Delete an event",
        "Set event importance",
      ],
    },
    {
      heading: "Profile and settings",
      links: [
        "Change profile picture",
        "Change display name",
        "Change email",
        "Accessibility settings",
      ],
    },
    {
      heading: "Privacy and data",
      links: [
        "How account data is stored",
        "Per-user saved content",
        "Profile data and account info",
        "Request help",
      ],
    },
  ];

  const toSlug = (text) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  // 🔎 Find matching category OR link
  let article = null;

  for (const category of categories) {
    if (toSlug(category.heading) === slug) {
      article = {
        title: category.heading,
        content: category.links,
      };
      break;
    }

    const match = category.links.find(
      (link) => toSlug(link) === slug
    );

    if (match) {
      article = {
        title: match,
        content: [`Step-by-step help for "${match}" coming soon.`],
      };
      break;
    }
  }

  // ❌ Not found
  if (!article) {
    return (
      <>
        <Header />
        <LogoBar />
        <div className="help-page">
          <div className="help-article">
            <h2>Article not found</h2>
            <button onClick={() => navigate("/help")}>
              ← Back to Help
            </button>
          </div>
        </div>
      </>
    );
  }

  // ✅ Render
  return (
    <>
      <Header />
      <LogoBar />

      <div className="help-page">
        <div className="help-article">
          <button
            className="secondary-btn"
            onClick={() => navigate("/help")}
          >
            ← Back to Help
          </button>

          <h1>{article.title}</h1>

          <div className="help-article-content">
            {article.content.map((item, i) => (
              <p key={i}>{item}</p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default HelpArticle;