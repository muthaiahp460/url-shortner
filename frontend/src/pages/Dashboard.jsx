import { useEffect, useState } from "react";
import api from "../api/axios";
import "./dashboard.css";

const Dashboard = () => {
    const [urls, setUrls] = useState([]);
    const [longUrl, setLongUrl] = useState("");
    const [loading, setLoading] = useState(true);

    // Fetch URLs for logged-in user
    const fetchUrls = async () => {
        try {
            const res = await api.get("/urls");
            setUrls(res.data);
        } catch (err) {
            console.error("Failed to fetch URLs", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUrls();
    }, []);

    // Create short URL
    const shortenUrl = async () => {
        if (!longUrl) return;
        await api.post("/urls", { longUrl });
        setLongUrl("");
        fetchUrls();
    };

    // Copy short URL
    const copyLink = (code) => {
        navigator.clipboard.writeText(`http://localhost:4000/${code}`);
        alert("Short URL copied");
    };

    // Stats (derived from DB response)
    const totalLinks = urls.length;
    const totalClicks = urls.reduce((sum, u) => sum + u.clicks, 0);
    const activeLinks = urls.filter(u => u.clicks > 0).length;

    return (
        <div className="app-container">
            {/* SIDEBAR */}
            <aside className="sidebar">
                <h2 className="logo">🔗 Shorty</h2>
                <nav>
                    <a className="active">Dashboard</a>
                    <a>Links</a>
                    <a>Analytics</a>
                    <a>Settings</a>
                </nav>
            </aside>

            {/* MAIN */}
            <main className="main">
                {/* TOP BAR */}
                <header className="topbar">
                    <input placeholder="Search links..." />
                    <div className="profile">
                        <span>User</span>
                        <img src="https://i.pravatar.cc/40" />
                    </div>
                </header>

                {/* STATS */}
                <section className="stats">
                    <div className="stat-card purple">
                        <h3>{totalLinks}</h3>
                        <p>Total Links</p>
                    </div>
                    <div className="stat-card orange">
                        <h3>{totalClicks}</h3>
                        <p>Total Clicks</p>
                    </div>
                    <div className="stat-card blue">
                        <h3>{activeLinks}</h3>
                        <p>Active Links</p>
                    </div>
                    <div className="stat-card green">
                        <h3>{totalLinks - activeLinks}</h3>
                        <p>Unused</p>
                    </div>
                </section>

                {/* SHORTEN INPUT */}
                <div className="shorten-box">
                    <input
                        placeholder="Paste a long URL here"
                        value={longUrl}
                        onChange={(e) => setLongUrl(e.target.value)}
                    />
                    <button onClick={shortenUrl}>Shorten</button>
                </div>

                {/* URL LIST */}
                <section className="content-grid">
                    {urls.map((url) => (
                        <div key={url._id} className="url-card clean">

                            {/* Short URL */}
                            <div className="url-top">
                                <div>
                                    <span className="label">SHORT LINK</span>
                                    <a
                                        href={`http://localhost:4000/${url.shortCode}`}
                                        target="_blank"
                                        className="short-link"
                                    >
                                        localhost:4000/{url.shortCode}
                                    </a>
                                </div>

                                <button
                                    className="copy-btn"
                                    onClick={() =>
                                        navigator.clipboard.writeText(
                                            `http://localhost:4000/${url.shortCode}`
                                        )
                                    }
                                >
                                    Copy
                                </button>
                            </div>

                            {/* Divider */}
                            <hr />

                            {/* Long URL */}
                            <div className="long-url">
                                <span className="label">ORIGINAL URL</span>
                                <p>{url.longUrl}</p>
                            </div>

                            {/* Footer Meta */}
                            <div className="url-footer">
                                <span>Clicks: {url.clicks}</span>
                                <span>
                                    Created:{" "}
                                    {new Date(url.createdAt).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </span>
                            </div>

                        </div>
                    ))}
                </section>

            </main>
        </div>
    );
};

export default Dashboard;
