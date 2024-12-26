// // src/pages/Backrooms.js
// import React, { useState, useEffect } from 'react';
// import CollapsibleSection from '../components/CollapsibleSection.js';

// const parseBackroomsContent = (content) => {
//   // Similar to parseFrontmatter but adapted for backrooms format
//   // We might not need frontmatter for backrooms conversations
//   return { content };
// };

// const Backrooms = () => {
//   const [conversations, setConversations] = useState({});  // organized by dyad

//   useEffect(() => {
//     const fetchConversations = async () => {
//       try {
//         // Fetch list of conversations, organized by dyad
//         const listRes = await fetch(`${process.env.PUBLIC_URL}/backroomsList.json`);
//         const data = await listRes.json();
        
//         // Structure should be like:
//         // {
//         //   "opus-sonnet": ["conv1.md", "conv2.md"],
//         //   "claude-sonnet": ["conv1.md", "conv2.md"],
//         // }
//         const { dyads } = data;

//         // Fetch content for each conversation
//         const dyadPromises = Object.entries(dyads).map(async ([dyad, files]) => {
//           const conversationPromises = files.map(async file => {
//             try {
//               const content = await fetch(
//                 `${process.env.PUBLIC_URL}/content/backrooms/${dyad}/${file}`
//               ).then(res => res.text());
              
//               return {
//                 slug: file.replace('.md', ''),
//                 content: parseBackroomsContent(content),
//                 dyad
//               };
//             } catch (error) {
//               console.error(`Error fetching ${file}:`, error);
//               return null;
//             }
//           });

//           const dyadConversations = await Promise.all(conversationPromises);
//           return [dyad, dyadConversations.filter(conv => conv !== null)];
//         });

//         const fetchedConversations = Object.fromEntries(
//           await Promise.all(dyadPromises)
//         );
//         setConversations(fetchedConversations);
//       } catch (error) {
//         console.error('Error fetching backrooms:', error);
//       }
//     };

//     fetchConversations();
//   }, []);

//   return (
//     <div className="backrooms">
//       <h1>Backrooms</h1>
//       {Object.entries(conversations).length === 0 ? (
//         <p>Loading conversations...</p>
//       ) : (
//         Object.entries(conversations).map(([dyad, convs]) => (
//           <CollapsibleSection key={dyad} title={dyad}>
//             <div className="conversation-list">
//               {convs.map(conv => (
//                 <div key={conv.slug} className="conversation-entry">
//                   <a href={`#/backrooms/${dyad}/${conv.slug}`}>
//                     {conv.slug}
//                   </a>
//                 </div>
//               ))}
//             </div>
//           </CollapsibleSection>
//         ))
//       )}
//     </div>
//   );
// };

// export default Backrooms;


// src/pages/Backrooms.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CollapsibleSection from '../components/CollapsibleSection.js';

const parseBackroomsContent = (content) => {
  return { content };
};

const Backrooms = () => {
  const [conversations, setConversations] = useState({});

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const listRes = await fetch(`${process.env.PUBLIC_URL}/backroomsList.json`);
        const data = await listRes.json();
        
        const { dyads } = data;

        const dyadPromises = Object.entries(dyads).map(async ([dyad, files]) => {
          const conversationPromises = files.map(async file => {
            try {
              const content = await fetch(
                `${process.env.PUBLIC_URL}/content/backrooms/${dyad}/${file}`
              ).then(res => res.text());
              
              return {
                slug: file.replace('.md', ''),
                content: parseBackroomsContent(content),
                dyad
              };
            } catch (error) {
              console.error(`Error fetching ${file}:`, error);
              return null;
            }
          });

          const dyadConversations = await Promise.all(conversationPromises);
          return [dyad, dyadConversations.filter(conv => conv !== null)];
        });

        const fetchedConversations = Object.fromEntries(
          await Promise.all(dyadPromises)
        );
        setConversations(fetchedConversations);
      } catch (error) {
        console.error('Error fetching backrooms:', error);
      }
    };

    fetchConversations();
  }, []);

return (
    <div className="backrooms-section">  {/* Add this class */}
      <h1>Backrooms</h1>
      {Object.entries(conversations).length === 0 ? (
        <p>Loading conversations...</p>
      ) : (
        Object.entries(conversations).map(([dyad, convs]) => (
          <CollapsibleSection key={dyad} title={dyad} className="backrooms-dyad"> 
            <div className="conversation-list">
              {convs.map(conv => (
                <div key={conv.slug} className="conversation-entry">
                  <Link to={`/lurkingIn/${dyad}/${conv.slug}`}>
                    {conv.slug}
                  </Link>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        ))
      )}
    </div>
  );
  
};

export default Backrooms;

