import { useEffect } from "react";

// Reveals any [data-reveal] element once as it enters the viewport.
// Elements are unobserved after revealing so nothing re-animates on scroll-back.
const useReveal = () => {
    useEffect(() => {
        const nodes = document.querySelectorAll("[data-reveal]:not(.is-revealed)");
        if (!nodes.length) return;

        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced || typeof IntersectionObserver === "undefined") {
            nodes.forEach((node) => node.classList.add("is-revealed"));
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add("is-revealed");
                    observer.unobserve(entry.target);
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
        );

        nodes.forEach((node) => observer.observe(node));
        return () => observer.disconnect();
    }, []);
};

export default useReveal;
