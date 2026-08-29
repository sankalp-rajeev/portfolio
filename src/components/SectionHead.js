import React from "react";

// Docs-style section marker: 01 — TITLE, sitting on a hairline rule.
const SectionHead = ({ index, title, note }) => (
    <header className="section-head" data-reveal>
        <span className="section-index">{index}</span>
        <h2 className="section-name">{title}</h2>
        {note && <span className="section-note">{note}</span>}
    </header>
);

export default SectionHead;
