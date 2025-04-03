'use server'

import { client } from "@/lib/prisma";
import { ContentType, Slide } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";
import OpenAI from "openai";
import {v4 as uuidv4} from "uuid"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})
export const generateCreativePrompt = async (userPrompt: string) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })
                const finalPrompt = `
                                 Create a coherent and relevant outline for the following
                                 prompt: ${userPrompt}.

                                 The outline should consist of at least 6 points, with
                                 each point written as a single sentence.

                                 Ensure the outline is well-structured and directly
                                 related to the topic. |

                                 Return the output in the following JSON format:
                                 {
                                                                                           "outlines": [
                                                                                              "Point 1",
                                                                                              "Point 2",
                                                                                              "Point 3",
                                                                                              "Point 4",
                                                                                              "Point 5",
                                                                                                "Point 6"
                                                 ]
                                 }
    Ensure that the JSON is valid and properly formatted. Do not include any other text or explanations outside JSON             
                                 `
            try {
                const completion = await openai.chat.completions.create({
                    model: 'chatgpt-4o-latest',
                    messages: [
                        {
                            role: 'system',
                            content: 
                            'You are a helpful AI that generates outlines for presentations'
                        }, {
                            role:'user',
                            content: finalPrompt
                        },
                    ],
                    max_tokens: 1000,
                    temperature: 0.0
                })
                const responseContent = completion.choices[0].message?.content 
                if (responseContent) {
                    try {
                       const jsonResponse = JSON.parse(responseContent)
                       return { status: 200, data: jsonResponse } 
                    } catch (error) {
                        return { status: 500, error: 'Invalid JSON format received from AI'}
                    }
                }
                return {status: 400, error: 'No content generated'}
            } catch (error) {
                console.log('🔴Error', error)
                return {status : 500, error: "Internal server error"}
            }
};
const existingLayouts = [
    {
      id: uuidv4(),
      slideName: "Blank card",
      type: "blank-card",
      className: "p-8 mx-auto flex justify-center items-center min-h-[200px]",
      content: {
        id: uuidv4(),
        type: "column" as ContentType,
        name: "Column",
        content: [
          {
            id: uuidv4(),
            type: "title" as ContentType,
            name: "Title",
            content: "",
            placeholder: "Untitled Card",
          },
        ],
      },
    },
  
    {
      id: uuidv4(),
      slideName: "Accent left",
      type: "accentLeft",
      className: "min-h-[300px]",
      content: {
        id: uuidv4(),
        type: "column" as ContentType,
        name: "Column",
        restrictDropTo: true,
        content: [
          {
            id: uuidv4(),
            type: "resizable-column" as ContentType,
            name: "Resizable column",
            restrictToDrop: true,
            content: [
              {
                id: uuidv4(),
                type: "image" as ContentType,
                name: "Image",
                content:
                  "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                alt: "Title",
              },
              {
                id: uuidv4(),
                type: "column" as ContentType,
                name: "Column",
                content: [
                  {
                    id: uuidv4(),
                    type: "heading1" as ContentType,
                    name: "Heading1",
                    content: "",
                    placeholder: "Heading1",
                  },
                  {
                    id: uuidv4(),
                    type: "paragraph" as ContentType,
                    name: "Paragraph",
                    content: "",
                    placeholder: "start typing here",
                  },
                ],
                className: "w-full h-full p-8 flex justify-center items-center",
                placeholder: "Heading1",
              },
            ],
          },
        ],
      },
    },
  
    {
      id: uuidv4(),
      slideName: "Accent Right",
      type: "accentRight",
      className: "min-h-[300px]",
      content: {
        id: uuidv4(),
        type: "column" as ContentType,
        name: "Column",
        content: [
          {
            id: uuidv4(),
            type: "resizable-column" as ContentType,
            name: "Resizable column",
            restrictToDrop: true,
            content: [
              {
                id: uuidv4(),
                type: "column" as ContentType,
                name: "Column",
                content: [
                  {
                    id: uuidv4(),
                    type: "heading1" as ContentType,
                    name: "Heading1",
                    content: "",
                    placeholder: "Heading1",
                  },
                  {
                    id: uuidv4(),
                    type: "paragraph" as ContentType,
                    name: "Paragraph",
                    content: "",
                    placeholder: "start typing here",
                  },
                ],
                className: "w-full h-full p-8 flex justify-center items-center",
                placeholder: "Heading1",
              },
              {
                id: uuidv4(),
                type: "image" as ContentType,
                name: "Image",
                restrictToDrop: true,
                content:
                  "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                alt: "Title",
              },
            ],
          },
        ],
      },
    },
  
    {
      id: uuidv4(),
      slideName: "Image and text",
      type: "imageAndText",
      className: "min-h-[200px] p-8 mx-auto flex justify-center items-center",
      content: {
        id: uuidv4(),
        type: "column" as ContentType,
        name: "Column",
        content: [
          {
            id: uuidv4(),
            type: "resizable-column" as ContentType,
            name: "Image and text",
            className: "border",
            content: [
              {
                id: uuidv4(),
                type: "column" as ContentType,
                name: "Column",
                content: [
                  {
                    id: uuidv4(),
                    type: "image" as ContentType,
                    name: "Image",
                    className: "p-3",
                    content:
                      "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    alt: "Title",
                  },
                ],
              },
              {
                id: uuidv4(),
                type: "column" as ContentType,
                name: "Column",
                content: [
                  {
                    id: uuidv4(),
                    type: "heading1" as ContentType,
                    name: "Heading1",
                    content: "",
                    placeholder: "Heading1",
                  },
                  {
                    id: uuidv4(),
                    type: "paragraph" as ContentType,
                    name: "Paragraph",
                    content: "",
                    placeholder: "start typing here",
                  },
                ],
                className: "w-full h-full p-8 flex justify-center items-center",
                placeholder: "Heading1",
              },
            ],
          },
        ],
      },
    },
  
    {
      id: uuidv4(),
      slideName: "Text and image",
      type: "textAndImage",
      className: "min-h-[200px] p-8 mx-auto flex justify-center items-center",
      content: {
        id: uuidv4(),
        type: "column" as ContentType,
        name: "Column",
        content: [
          {
            id: uuidv4(),
            type: "resizable-column" as ContentType,
            name: "Text and image",
            className: "border",
            content: [
              {
                id: uuidv4(),
                type: "column" as ContentType,
                name: "",
                content: [
                  {
                    id: uuidv4(),
                    type: "heading1" as ContentType,
                    name: "Heading1",
                    content: "",
                    placeholder: "Heading1",
                  },
                  {
                    id: uuidv4(),
                    type: "paragraph" as ContentType,
                    name: "Paragraph",
                    content: "",
                    placeholder: "start typing here",
                  },
                ],
                className: "w-full h-full p-8 flex justify-center items-center",
                placeholder: "Heading1",
              },
              {
                id: uuidv4(),
                type: "column" as ContentType,
                name: "Column",
                content: [
                  {
                    id: uuidv4(),
                    type: "image" as ContentType,
                    name: "Image",
                    className: "p-3",
                    content:
                      "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    alt: "Title",
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  
    {
      id: uuidv4(),
      slideName: "Two columns",
      type: "twoColumns",
      className: "p-4 mx-auto flex justify-center items-center",
      content: {
        id: uuidv4(),
        type: "column" as ContentType,
        name: "Column",
        content: [
          {
            id: uuidv4(),
            type: "title" as ContentType,
            name: "Title",
            content: "",
            placeholder: "Untitled Card",
          },
          {
            id: uuidv4(),
            type: "resizable-column" as ContentType,
            name: "Text and image",
            className: "border",
            content: [
              {
                id: uuidv4(),
                type: "paragraph" as ContentType,
                name: "Paragraph",
                content: "",
                placeholder: "Start typing...",
              },
              {
                id: uuidv4(),
                type: "paragraph" as ContentType,
                name: "Paragraph",
                content: "",
                placeholder: "Start typing...",
              },
            ],
          },
        ],
      },
    },
  
    {
      id: uuidv4(),
      slideName: "Two columns with headings",
      type: "twoColumnsWithHeadings",
      className: "p-4 mx-auto flex justify-center items-center",
      content: {
        id: uuidv4(),
        type: "column" as ContentType,
        name: "Column",
        content: [
          {
            id: uuidv4(),
            type: "title" as ContentType,
            name: "Title",
            content: "",
            placeholder: "Untitled Card",
          },
          {
            id: uuidv4(),
            type: "resizable-column" as ContentType,
            name: "Text and image",
            className: "border",
            content: [
              {
                id: uuidv4(),
                type: "column" as ContentType,
                name: "Column",
                content: [
                  {
                    id: uuidv4(),
                    type: "heading3" as ContentType,
                    name: "Heading3",
                    content: "",
                    placeholder: "Heading 3",
                  },
                  {
                    id: uuidv4(),
                    type: "paragraph" as ContentType,
                    name: "Paragraph",
                    content: "",
                    placeholder: "Start typing...",
                  },
                ],
              },
              {
                id: uuidv4(),
                type: "column" as ContentType,
                name: "Column",
                content: [
                  {
                    id: uuidv4(),
                    type: "heading3" as ContentType,
                    name: "Heading3",
                    content: "",
                    placeholder: "Heading 3",
                  },
                  {
                    id: uuidv4(),
                    type: "paragraph" as ContentType,
                    name: "Paragraph",
                    content: "",
                    placeholder: "Start typing...",
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  
    {
      id: uuidv4(),
      slideName: "Three column",
      type: "threeColumns",
      className: "p-4 mx-auto flex justify-center items-center",
      content: {
        id: uuidv4(),
        type: "column" as ContentType,
        name: "Column",
        content: [
          {
            id: uuidv4(),
            type: "title" as ContentType,
            name: "Title",
            content: "",
            placeholder: "Untitled Card",
          },
          {
            id: uuidv4(),
            type: "resizable-column" as ContentType,
            name: "Text and image",
            className: "border",
            content: [
              {
                id: uuidv4(),
                type: "paragraph" as ContentType,
                name: "",
                content: "",
                placeholder: "Start typing...",
              },
              {
                id: uuidv4(),
                type: "paragraph" as ContentType,
                name: "",
                content: "",
                placeholder: "Start typing...",
              },
              {
                id: uuidv4(),
                type: "paragraph" as ContentType,
                name: "",
                content: "",
                placeholder: "Start typing...",
              },
            ],
          },
        ],
      },
    },
  ];
  
const replaceImagePlaceholders = async (layout: Slide) => {
    const imageComponents = findImageComponents(layout.content)
    console.log("🟢 Found image components", imageComponents)
    for(const component of imageComponents) {
        console.log("🟢Generating image for component:", component.alt)
        component.content = await generateImageUrl(
        component.alt || "Placeholder Image"
        )
    }
}
export const generateLayoutsJSON = async (outlineArray: string[]) => {
    const prompt = `You are a highly creative AI that generates JSON-based layouts for presentations. I will provide you with an array of outlines, and for each outline, you must generate a unique and creative layout. Use the existing layouts as examples for structure and design, and generate unique designs based on the provided outline.

### Guidelines:

1. Write layouts based on the specific outline provided.
2. Use diverse and engaging designs, ensuring each layout is unique.
3. Adhere to the structure of existing layouts but add new styles or components if needed.
4. Fill placeholder data into content fields where required.
5. Generate unique image placeholders for the 'content' property of image components and also alt text according to the outline.
6. Ensure proper formatting and schema alignment for the output JSON.

### Example Layouts: 
${JSON.stringify(existingLayouts, null, 2)}
### Outline Array:
${JSON.stringify(outlineArray)}

For each entry in the outline array, generate:
- A unique JSON layout with creative designs.
- Properly filled content, including placeholders for image components.
- Clear and well-structured JSON data.

For Images
- The alt text should describe the image clearly and concisely.
- Focus on the main subject(s) of the image and any relevant details such as colors, shapes, people, or objects.
- Ensure the alt text aligns with the context of the presentation slide it will be used on (e.g., professional, educational, business-related).
- Avoid using terms like "umage of" or "picture of, : and instead focus directly on the content and meaning

Output the layouts in JSON format. Ensure there are no duplicate layouts across the array.
`
try {
    console.log('🟢 Generating layouts...')
    const completion = await openai.chat.completions.create({
        model: 'gpt-4o-2024-11-20',
        messages: [
            {
                role: 'system',
                content: 'You generate JSON layouts for presentations.', 
            },
            {
                role : 'user', content: prompt
            }
        ],
        max_tokens: 5000,
        temperature: 0.7
    })
    const responseContent = completion?.choices?.[0].message?.content
    if (!responseContent) {
        return { status: 400, error: 'No content generated'}
    }
    let jsonResponse 
    try {
        jsonResponse = JSON.parse(responseContent.replace(/```json|```/g, ''))
        await Promise.all(jsonResponse.map(replaceImagePlaceholders))
    } catch(error) {
        console.log('🔴 ERROR:', error) 
        throw new Error('Invalid JSON formate recieved from AI')
      }
} catch (error) {} 
}


export const generateLayouts = async (projectId: string, theme: string) => {
  try {
    if (!projectId) {
        return { status: 400, error: 'Project ID is required'}
    }
    const user = await currentUser()
    if (!user) {
        return { status: 403, error: 'User not authneticated'}
    }
    const userExist = await client.user.findUnique({
        where: {
            clerkId: user.id
        }
    })
    if (!userExist || !userExist.subscription) {
        return {
            status: 403,
            error: !userExist?.subscription ? 'User does not have an active subscription' : 'User not found in database'
        }
    }
    const project = await client.projects.findUnique({
        where: { id: projectId, isDeleted: false }
    })
    if (!project) {
        return { status: 404, error: 'Project does not have any outlines'}
    }
    const layouts = await generateLayoutsJSON(project.outlines)
    if (layouts.status !== 200) {
        return layouts
    }
    await client.projects.update({
        where: { id: projectId },
        data: {slides: layouts.data, themeName: theme}
    })
    return {status: 200, data: layouts.data}
  } catch (error) {
    console.log('🔴Error', error)
    return {status : 500, error: "Internal server error", data: []}
  }
}