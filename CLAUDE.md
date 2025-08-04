# Landing Site for House of Carle

This is a minimalist landing page that serves as the entry point to my online presence. It's designed to be simple, fast, and focused way of connecting curious visitors to my content, social platforms, or just to send me a message.

## Design Principles

- **Minimalist**: Single page with essential information only
- **Performance First**: Static site with minimal dependencies
- **Mobile First**: Responsive design that works beautifully on all devices
- **Open Source**: Public repository to showcase clean, simple web development

## Core Features

- Language cycling between Spanish (default), English, and Chinese
- Animated particle background for visual fluff
- Icon-only social links (Twitter/X, GitHub, YouTube, LinkedIn)
- Pop-up contact form
- Direct link to blog (hosted separately)

## Technical Guidelines

- Keep dependencies minimal
- Prioritize loading speed
- Ensure smooth animations (60fps)
- Maintain accessibility standards
- Use semantic HTML
- Keep the codebase relatively simple and readable

## Content

The site displays a single rotating description in three languages:
- Spanish: "Wanabi programador y cripto-economista nocturno 🇵🇷"
- English: "I indulge in late-night coding and crypto mumbo jumbo 🇵🇷"
- Chinese: "白天写代码，晚上研究加密经济 🇵🇷"

Each description is paired with a contextual image.

## Important Notes

- This site intentionally has no authentication or database connections
- No theme toggle (keep it simple and light)
- No blog functionality (that's in the separate houseofcarle-blog repository)
- Contact form should use a simple service like Formspree or similar
- Keep Firebase/Supabase configs in the blog repo only

## Future Considerations

- Consider adding subtle animations on scroll
- Possibly add a brief "latest from blog" preview (static, updated manually)
- Keep monitoring performance metrics
- Ensure the site loads in under 1 second