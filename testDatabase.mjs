import { db } from "./lib/db.js"; // Use .js extension for ES modules

async function testDatabase() {
    try {
        const recentStartups = await db.startup.findMany({
            take: 3,
            orderBy: { createdAt: 'desc' },
            include: {
                founders: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                    },
                },
                tags: true,
            },
        });
        console.log(recentStartups);
    } catch (error) {
        console.error("Error fetching recent startups:", error);
    } finally {
        await db.$disconnect();
    }
}

testDatabase();