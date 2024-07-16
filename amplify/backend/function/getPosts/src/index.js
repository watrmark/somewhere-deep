const fs = require('fs').promises;
const path = require('path');

exports.handler = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    try {
        const postsDirectory = path.join(__dirname, 'posts');
        console.log('Posts directory:', postsDirectory);

        const slug = event.queryStringParameters?.slug;
        console.log('Requested slug:', slug);

        if (slug) {
            // Handle single post request
            const filePath = path.join(postsDirectory, `${slug}.md`);
            console.log('Attempting to read file:', filePath);
            
            try {
                const content = await fs.readFile(filePath, 'utf8');
                console.log('File content (preview):', content.substring(0, 100) + '...');
                return {
                    statusCode: 200,
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "*"
                    },
                    body: JSON.stringify({ slug, content }),
                };
            } catch (readError) {
                console.error('Error reading file:', readError);
                return {
                    statusCode: 404,
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "*"
                    },
                    body: JSON.stringify({ message: 'Post not found' }),
                };
            }
        } else {
            // Handle all posts request
            const files = await fs.readdir(postsDirectory);
            console.log('Files in posts directory:', files);
            
            const posts = await Promise.all(files.map(async (filename) => {
                const filePath = path.join(postsDirectory, filename);
                const content = await fs.readFile(filePath, 'utf8');
                const frontmatter = content.split('---')[1]; // Get the frontmatter
                return {
                    slug: filename.replace('.md', ''),
                    content: frontmatter
                };
            }));
            
            console.log('Sending response with posts count:', posts.length);
            return {
                statusCode: 200,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*"
                },
                body: JSON.stringify(posts),
            };
        }
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify({ 
                message: 'Internal Server Error',
                error: error.toString()
            }),
        };
    }
};