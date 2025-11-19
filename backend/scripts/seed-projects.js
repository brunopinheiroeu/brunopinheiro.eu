/**
 * Seed script to populate Strapi with sample projects
 * Run with: node scripts/seed-projects.js
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';

const sampleProjects = [
    {
        title: "Bua na Cainte - Educational Platform",
        slug: "bua-na-cainte-educational-platform",
        excerpt: "Led Flash-to-HTML5 migration for Ireland's leading educational platform, increasing monthly game delivery from 30 to 100 while reducing rework by 70%.",
        tags: "Product Design, HTML5, Process Optimization, Team Leadership",
        tools: "figma, photoshop, html5, css3",
        front_page: true,
        content: [
            {
                type: "paragraph",
                children: [
                    { type: "text", text: "Educational platform needed to migrate from Flash to HTML5 before Flash end-of-life, while maintaining quality and increasing output. Successfully migrated platform, increased delivery speed by 233%, and reduced rework by 70%." }
                ]
            },
            {
                type: "paragraph",
                children: [
                    { type: "text", text: "Led design system creation and component library development for consistent HTML5 games. Coordinated with development team and stakeholders to ensure smooth migration process." }
                ]
            }
        ],
    },
    {
        title: "Imvizar AR Platform",
        slug: "imvizar-ar-platform",
        excerpt: "Complete mobile and web app redesign with visual identity overhaul for an AR startup, directly contributing to securing new partnerships and investments.",
        tags: "Mobile Design, Brand Identity, Design System, Augmented Reality",
        tools: "figma, html5, css3",
        front_page: true,
        content: [
            {
                type: "paragraph",
                children: [
                    { type: "text", text: "AR startup needed modern, professional design to attract investors and enterprise clients. New design helped secure partnerships and investment funding, establishing market credibility." }
                ]
            },
            {
                type: "paragraph",
                children: [
                    { type: "text", text: "Created comprehensive design system spanning mobile app, web platform, and brand identity. Worked closely with founders and development team to align design with business goals." }
                ]
            }
        ],
    },
    {
        title: "Wave VR Studio",
        slug: "wave-vr-studio",
        excerpt: "Founded and led VR startup creating immersive real estate and tourism experiences, including 'VR Showroom' and 'Go There' applications.",
        tags: "VR/AR, Unity 3D, Product Strategy, Startup Leadership",
        tools: "figma, photoshop, unity",
        front_page: true,
        content: [
            {
                type: "paragraph",
                children: [
                    { type: "text", text: "Real estate and tourism industries needed innovative ways to showcase properties and destinations remotely. Built successful VR applications used by real estate agencies and tourism boards." }
                ]
            },
            {
                type: "paragraph",
                children: [
                    { type: "text", text: "Designed immersive VR experiences with intuitive navigation and realistic environments. Led team of designers and developers, managed client relationships and project delivery." }
                ]
            }
        ],
    },
    {
        title: "Automation & AI Workflows",
        slug: "automation-ai-workflows",
        excerpt: "Implemented AI-driven automation to reduce repetitive tasks, streamline design ops, and optimize production pipelines.",
        tags: "AI, Automation, Workflow Optimization, Innovation",
        tools: "figma, html5",
        front_page: true,
        content: [
            {
                type: "paragraph",
                children: [
                    { type: "text", text: "Design teams spending excessive time on repetitive tasks, reducing time for creative work. Automated workflows reduced manual work by 60%, freeing designers for higher-value activities." }
                ]
            },
            {
                type: "paragraph",
                children: [
                    { type: "text", text: "Designed intelligent automation systems that learn from user patterns and optimize processes. Trained teams on new tools and workflows, ensuring smooth adoption and continuous improvement." }
                ]
            }
        ],
    },
];

async function createProject(project) {
    try {
        const headers = {
            'Content-Type': 'application/json',
        };

        // Add authorization header if token is provided
        if (STRAPI_API_TOKEN) {
            headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
        }

        const response = await fetch(`${STRAPI_URL}/api/products`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ data: project }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to create project: ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        console.log(`✓ Created project: ${project.title}`);
        return data;
    } catch (error) {
        console.error(`✗ Error creating project "${project.title}":`, error.message);
        throw error;
    }
}

async function seedProjects() {
    console.log('Starting to seed projects...\n');
    console.log(`Strapi URL: ${STRAPI_URL}`);
    console.log(`Using API Token: ${STRAPI_API_TOKEN ? 'Yes' : 'No (public access)'}\n`);

    let successCount = 0;
    let errorCount = 0;

    for (const project of sampleProjects) {
        try {
            await createProject(project);
            successCount++;
        } catch (error) {
            errorCount++;
        }
    }

    console.log('\n--- Seeding Complete ---');
    console.log(`✓ Successfully created: ${successCount} projects`);
    if (errorCount > 0) {
        console.log(`✗ Failed to create: ${errorCount} projects`);
    }
    console.log('\nYou can now view your projects at:');
    console.log(`${STRAPI_URL}/admin/content-manager/collection-types/api::product.product`);
}

// Run the seed function
seedProjects().catch((error) => {
    console.error('Fatal error during seeding:', error);
    process.exit(1);
});