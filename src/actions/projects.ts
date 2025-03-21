'use server'

import { client } from "@/lib/prisma"
import { onAuthentiatedUser } from "./user"
import { OutlineCard } from "@/lib/types"

export const getAllProjects = async() => {
    try {
        const checkUser = await onAuthentiatedUser()
        if(checkUser.status !== 200 || !checkUser) {
            return {status : 403, error: 'User not found'}
        }
        const projects = await client.projects.findMany({
            where: {
                userId: checkUser.user?.id,
                isDeleted: false
            },
            orderBy: {
                updatedAt: "desc"
            }
        })
        if (projects.length === 0) {
            return { status: 404, error: 'No Projects Found'}
        }
        return { status: 200, data: projects}
    } catch (error) {
        console.log('🔴Error', error)
        return {status : 500, error: "Internal server error"}
    }
}

export const getRecentProjects = async () => {
    try {
     const checkUser = await onAuthentiatedUser()
     if(checkUser.status !== 200 || !checkUser.user) {
        return { status: 403, error: "User not authenticated"}
     }
     const projects = await client.projects.findMany({
        where: {
            userId: checkUser.user.id,
            isDeleted: false
        },
        orderBy: {
            updatedAt: 'desc'
        },
        take: 5,
     })
     if(projects.length === 0) {
        return {
            status: 404,
            error: 'No recent projects available'
        }
     }
     return { status: 200, data: projects}
    } catch (error) {
        console.log('🔴Error', error)
        return {status : 500, error: "Internal server error"}
    }
}

export const recoverProject = async (projectId: string) => {
    try {
        const checkUser = await onAuthentiatedUser()
        if (checkUser.status !== 200 || !checkUser.user) {
            return { status: 403, error: 'User not authenticated'}
        }
        const updatedProject = await client.projects.update({
            where: {
                id: projectId,
            },
            data: {
                isDeleted: false
            }
        })
        if (!updatedProject) {
            return {status: 500, error: 'Failed to recover project'}
        }
        return { status: 200, data: updatedProject }
    } catch (error) {
        console.log('🔴Error', error)
        return {status : 500, error: "Internal server error"}
    }
}

export const deleteProject = async(projectId: string) => {
    try {
        const checkUser = await onAuthentiatedUser()
        if (checkUser.status !== 200 || !checkUser.user) {
            return { status: 403, error: 'User not authenticated'}
        }
        const updatedProject = await client.projects.update({
            where: {
                id: projectId,
            },
            data: {
                isDeleted: true
            }
        })
        if (!updatedProject) {
            return {status: 500, error: 'Failed to recover project'}
        }
        return { status: 200, data: updatedProject }
    } catch (error) {
        console.log('🔴Error', error)
        return {status : 500, error: "Internal server error"}
    }
}

export const createProject = async(title: string, outlines: OutlineCard[]) => {
  try {
    if (!title || !outlines || outlines.length === 0) {
        return { status: 400, error: 'Title and outlines are required.'}
    }
    const allOutlines = outlines.map((outline) => outline.title)
    const checkUser = await onAuthentiatedUser()
    if(checkUser.status !== 200 || !checkUser.user){
        return { status: 403, error: 'User not authenticated'}
    }
    const project = await client.projects.create({
        data: {
            title,
            outlines: allOutlines,
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: checkUser.user.id,
        },
    })
    if (!project) {
        return { status: 500, error: 'Failed to create project'}
    }
    return { status: 200, data: project }
  } catch (error) {
    console.log('🔴Error', error)
    return {status : 500, error: "Internal server error"}
  }
}