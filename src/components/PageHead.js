import React from "react";

// Header for routed pages: path breadcrumb, title, and a short note.
const PageHead = ({ path, title, note }) => (
    <header className="page-head" data-reveal>
        <span className="page-path">{path}</span>
        <h1 className="page-title">{title}</h1>
        {note && <p className="page-note">{note}</p>}
    </header>
);

export default PageHead;
