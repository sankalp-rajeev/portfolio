import React from "react";
import SectionHead from "./SectionHead";
import useReveal from "../hooks/useReveal";
import skills from "../data/skills";
import "../styles/Skills.css";

const Skills = () => {
  useReveal();

  const total = skills.reduce((count, group) => count + group.skills.length, 0);

  return (
    <section id="skills" className="skills">
      <div className="shell">
        <SectionHead index="04" title="Skills" note={`${total} tools`} />

        <div className="skills-list">
          {skills.map((group, index) => (
            <div key={group.category} className="record skill-row" data-reveal>
              <div className="record-rail">
                <span className="skill-index">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="skill-category">{group.category}</h3>
              </div>

              <ul className="tags skill-tags">
                {group.skills.map((skill) => (
                  <li key={skill} className="tag">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
