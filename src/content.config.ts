import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const experience = defineCollection({
  loader: file('src/content/experience.json'),
  schema: z.object({
    order: z.number(),
    company: z.string(),
    role: z.string(),
    detail: z.string().optional(),
    kind: z.enum(['Internship', 'Research']),
    location: z.string(),
    start: z.string(), // YYYY-MM
    end: z.string(), // YYYY-MM or 'present'
    dates: z.string(),
    logo: z.string(),
    verified: z.boolean().optional(),
    bullets: z.array(z.string()),
    tags: z.array(z.string()),
  }),
});

const projects = defineCollection({
  loader: file('src/content/projects.json'),
  schema: z.object({
    order: z.number(),
    category: z.string(),
    title: z.string(),
    subtitle: z.string().optional(),
    intro: z.string(),
    highlights: z.array(z.string()),
    tools: z.array(z.string()),
    image: z.string().optional(),
    github: z.url().optional(),
    demoLink: z.url().optional(),
    paperLink: z.string().optional(),
    videoLink: z.url().optional(),
    evaluationReportLink: z.url().optional(),
    // Present only on the four Selected Work entries.
    featured: z.number().optional(),
    tagline: z.string().optional(),
    figure: z.object({ value: z.string(), label: z.string() }).optional(),
    stack: z.array(z.string()).optional(),
    pypi: z.string().optional(),
    year: z.number().optional(),
    summary: z.string().optional(), // one-line text for the Projects index (falls back to intro)
    hidden: z.boolean().optional(), // hide from the Projects index
    placeholder: z.string().optional(), // label for the image placeholder frame
    linksTodo: z.boolean().optional(), // links not provided yet
  }),
});

const certificates = defineCollection({
  loader: file('src/content/certificates.json'),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    href: z.string(),
    kind: z.enum(['pdf', 'external']),
  }),
});

const gallery = defineCollection({
  loader: file('src/content/gallery.json'),
  schema: z.object({ order: z.number(), src: z.string(), caption: z.string() }),
});

const education = defineCollection({
  loader: file('src/content/education.json'),
  schema: z.object({
    order: z.number(),
    degree: z.string(),
    institution: z.string(),
    gpa: z.string(),
    date: z.string(),
    transcriptLink: z.string(),
  }),
});

const skills = defineCollection({
  loader: file('src/content/skills.json'),
  schema: z.object({ order: z.number(), category: z.string(), skills: z.array(z.string()) }),
});

const journey = defineCollection({
  loader: file('src/content/journey.json'),
  schema: z.object({
    order: z.number(),
    year: z.string(),
    education: z.object({ title: z.string(), institution: z.string(), logo: z.string(), dates: z.string() }).nullable(),
    experience: z.object({ title: z.string(), company: z.string(), logo: z.string(), dates: z.string() }).nullable(),
  }),
});

const caseStudies = defineCollection({
  loader: file('src/content/casestudies.json'),
  schema: z.object({
    label: z.string(),
    oneLine: z.string(),
    figures: z.array(z.object({ value: z.string(), label: z.string() })).length(3),
    problem: z.array(z.string()),
    built: z.array(z.string()),
    results: z.array(z.string()),
    stack: z.array(z.string()),
  }),
});

export const collections = { caseStudies, experience, projects, certificates, gallery, education, skills, journey };
