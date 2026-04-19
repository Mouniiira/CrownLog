import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import LogoBar from "../components/LogoBar";
import "./HelpCenter.css";

function HelpArticle() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const toSlug = (text) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  const docs = [
  // ACCOUNT
  {
    title: "Create an account",
    sections: [
      {
        heading: "Overview",
        content: "Creating an account allows you to save your hairstyles, journal entries, preferences and calendar events for future use.",
      },
      {
        heading: "Steps",
        content: [
          "Go to the sign up page",
          "Enter your name, email, and password",
          "Click Sign Up",
        ],
      },
    ],
  },
  {
    title: "Log in to CrownLog",
    sections: [
      {
        heading: "Overview",
        content: "Log in to access your saved data and continue writing in your logs.",
      },
      {
        heading: "Steps",
        content: [
          "Go to the login page",
          "Enter your email and password",
          "Click Log In",
        ],
      },
    ],
  },
  {
    title: "Reset your password",
    sections: [
      {
        heading: "Overview",
        content: "Reset your password if you can’t access your account.",
      },
      {
        heading: "Steps",
        content: [
          "Click 'Forgot password'",
          "Enter your email",
          "Follow the reset instructions",
        ],
      },
    ],
  },
  {
    title: "Update your email",
    sections: [
      {
        heading: "Overview",
        content: "You can update your email from your account settings.",
      },
      {
        heading: "Steps",
        content: [
          "Go to Settings",
          "Edit your email",
          "Save changes",
          "Confirm changes in the email received",
        ],
      },
    ],
  },

  // JOURNAL
  {
    title: "Create a new journal entry",
    sections: [
      {
        heading: "Overview",
        content: "Journal entries help you log your thoughts.",
      },
      {
        heading: "Steps",
        content: [
          "Go to Journal",
          "Click the '+' ",
          "Write your entry",
          "Click Save",
        ],
      },
    ],
  },
  {
    title: "Use the rich text editor",
    sections: [
      {
        heading: "Overview",
        content: "Format your entries using bold, headings, and colors.",
      },
      {
        heading: "Features",
        content: [
          "Bold and italic text",
          "Headings",
          "Text color",
        ],
      },
    ],
  },
  {
    title: "Delete an entry",
    sections: [
      {
        heading: "Steps",
        content: [
          "Open the entry",
          "Click Delete",
          "Confirm deletion",
        ],
      },
    ],
  },
  {
    title: "Preview saved content",
    sections: [
      {
        heading: "Overview",
        content: "View your saved journal entries by clicking on any to select.",
      },
    ],
  },

  // PHOTO BOOTH
  {
    title: "Add a hairstyle",
    sections: [
        {
        heading: "Overview",
        content: "Save your worn hairstyle for future reference.",
      },
      {
        heading: "Steps",
        content: [
          "Go to Photo Booth",
          "Click the '+' ",
          "Fill in details",
          "Save",
        ],
      },
    ],
  },
  {
    title: "Upload hairstyle photos",
    sections: [
      {
        heading: "Steps",
        content: [
          "Open a style",
          "Upload the inspo image",
          "Upload your result image",
          "Save changes",
        ],
      },
    ],
  },
  {
    title: "Add materials needed",
    sections: [
      {
        heading: "Overview",
        content: "Track tools and products needed for your hairstyles.",
      },
      {
        heading: "Steps",
        content: [
            "Click on any hairstyle card",
            "Go down to 'Material needed' ",
            "Write down your materials",
            "Click 'Add' ",
        ],
      },
    ],
  },
  {
    title: "Save tutorial videos",
    sections: [
      {
        heading: "Overview",
        content: "Attach helpful tutorial links to each style.",
      },
      {
        heading: "Steps",
        content: [
            "Click on any hairstyle card",
            "Go down to 'Video tutorial' ",
            "Paste the link to the video",
        ],
      },
    ],
  },

  // CALENDAR
  {
    title: "Add an event",
    sections: [
      {
        heading: "Steps",
        content: [
          "Go to Calendar",
          "Select a date",
          "Add event details",
        ],
      },
    ],
  },
  {
    title: "Edit an event",
    sections: [
        {
        heading: "Overview",
        content: "Create events in the calendar to stay organized.",
      },
      {
        heading: "Steps",
        content: [
          "Click on an event",
          "Edit details",
          "Select importance level",
          "Save changes",
        ],
      },
    ],
  },
  {
    title: "Delete an event",
    sections: [
      {
        heading: "Steps",
        content: [
          "Open event",
          "Click 'Delete' ",
          "Confirm deletion",
        ],
      },
    ],
  },
  {
    title: "Set event importance",
    sections: [
      {
        heading: "Overview",
        content: "Mark events by importance level.",
      },
    ],
  },

  // PROFILE
  {
    title: "Change profile picture",
    sections: [
        {
        heading: "Overview",
        content: "Change your account's profile picture to match your vibe.",
      },
      {
        heading: "Steps",
        content: [
          "Go to Settings",
          "Upload a new image",
          "Save",
        ],
      },
    ],
  },
  {
    title: "Change display name",
    sections: [
      {
        heading: "Steps",
        content: [
            "Go to settings",
          "Edit your name",
          "Save changes",
        ],
      },
    ],
  },
  {
    title: "Change email",
    sections: [
      {
        heading: "Steps",
        content: [
            "Go to settings",
          "Update your email",
          "Confirm changes",
        ],
      },
    ],
  },
  {
    title: "Accessibility settings",
    sections: [
      {
        heading: "Overview",
        content: "Adjust settings to improve usability.",
      },
    ],
  },

  // PRIVACY
  {
    title: "How account data is stored",
    sections: [
      {
        heading: "Overview",
        content: "Your data is stored on Supabase, an open-source 'Backend-as-a-Service' platform built on PostgreSQL.",
      },
    ],
  },
  {
    title: "Per-user saved content",
    sections: [
      {
        heading: "Overview",
        content: "Each user has isolated data storage.",
      },
    ],
  },
  {
    title: "Profile data and account info",
    sections: [
      {
        heading: "Overview",
        content: "Includes name, email, and preferences.",
      },
    ],
  },
  {
    title: "Request help",
    sections: [
      {
        heading: "Overview",
        content: "Contact support for additional help.",
      },
    ],
  },
];

  // Find doc
  const doc = docs.find((d) => toSlug(d.title) === slug);

  if (!doc) {
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

  return (
    <>
      <Header />
      <LogoBar />

      <div className="help-doc-layout">
        {/* LEFT SIDEBAR (ANCHORS) */}
        <aside className="help-sidebar">
          <button onClick={() => navigate("/help")}>
            ← Back
          </button>

          <h4>On this page</h4>

          {doc.sections.map((section) => (
            <a
              key={section.heading}
              href={`#${toSlug(section.heading)}`}
            >
              {section.heading}
            </a>
          ))}
        </aside>

        {/* MAIN CONTENT */}
        <main className="help-article">
          <h1>{doc.title}</h1>

          {doc.sections.map((section) => (
            <section
              key={section.heading}
              id={toSlug(section.heading)}
              className="help-section"
            >
              <h2>{section.heading}</h2>

              {Array.isArray(section.content) ? (
                <ul>
                  {section.content.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>{section.content}</p>
              )}
            </section>
          ))}
        </main>
      </div>
    </>
  );
}

export default HelpArticle;
