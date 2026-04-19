import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import LogoBar from "../components/LogoBar";
import "./HelpCenter.css";

function HelpCenter() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const featuredTopics = [
    {
      title: "Can’t log in to CrownLog",
      slug: "login-issues",
      description:
        "Get help with login issues, incorrect passwords, account access, and sign-in troubleshooting.",
      button: "Read troubleshooting tips",
    },
    {
      title: "Journal entries",
      slug: "journal",
      description:
        "Learn how to create, edit, save, and manage your hair journal entries.",
      button: "Explore journal help",
    },
    {
      title: "Photo booth",
      slug: "photo-booth",
      description:
        "Find help with hairstyle cards, favourites, tutorial links, image uploads, and wear tracking.",
      button: "Open photo booth help",
    },
    {
      title: "Privacy and data settings",
      slug: "privacy",
      description:
        "Manage what is saved to your account, understand how your data is stored, and review settings.",
      button: "Manage settings",
    },
    {
      title: "Calendar and planning",
      slug: "calendar",
      description:
        "Create, edit, and organize events for your hairstyle planning calendar.",
      button: "View calendar help",
    },
    {
      title: "Profile and account settings",
      slug: "account",
      description:
        "Update your name, email, password, profile photo, and account details.",
      button: "Go to account help",
    },
  ];

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
        "Add a hairstyle",
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

  const filteredFeatured = useMemo(() => {
    if (!searchTerm.trim()) return featuredTopics;

    const q = searchTerm.toLowerCase();
    return featuredTopics.filter(
      (topic) =>
        topic.title.toLowerCase().includes(q) ||
        topic.description.toLowerCase().includes(q)
    );
  }, [searchTerm]);

  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) return categories;

    const q = searchTerm.toLowerCase();
    return categories
      .map((category) => ({
        ...category,
        links: category.links.filter(
          (link) =>
            category.heading.toLowerCase().includes(q) ||
            link.toLowerCase().includes(q)
        ),
      }))
      .filter(
        (category) =>
          category.heading.toLowerCase().includes(q) ||
          category.links.length > 0
      );
  }, [searchTerm]);

  return (
    <>
      <Header />
      <LogoBar />

      <div className="help-page">
        <section className="help-hero">
          <p className="help-kicker">CrownLog Support</p>
          <h1 className="help-title">How can we help?</h1>
          <p className="help-subtitle">
            Search for help articles or browse featured topics.
          </p>

          <div className="help-search-wrap">
            <input
              type="text"
              placeholder="Search help topics"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="help-search"
            />
          </div>
        </section>

        <section className="help-featured">
          <h2 className="section-title">Featured help topics</h2>

          <div className="featured-grid">
            {filteredFeatured.map((topic, index) => (
              <article className="featured-card" key={`${topic.title}-${index}`}>
                <h3>{topic.title}</h3>
                <p>{topic.description}</p>
                <button
                  type="button"
                  onClick={() => navigate(`/help/${topic.slug}`)}
                >
                  {topic.button}
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="help-categories">
          <h2 className="section-title">Browse by category</h2>

          <div className="category-grid">
            {filteredCategories.map((category, index) => (
              <article className="category-card" key={`${category.heading}-${index}`}>
                <h3>{category.heading}</h3>
                <ul>
                  {category.links.map((link, linkIndex) => (
                    <li key={`${link}-${linkIndex}`}>
                      <button
                        type="button"
                        className="text-link"
                        onClick={() => navigate(`/help/${toSlug(link)}`)}
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="help-contact">
          <h2>Still need help?</h2>
          <p>Contact us for more support or request a feature for CrownLog.</p>
          <div className="help-contact-actions">
            <button type="button">Contact support</button>
            <button type="button" className="secondary-btn">
              Request a feature
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

export default HelpCenter;
