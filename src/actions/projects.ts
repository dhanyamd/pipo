'use server'

import { client } from "@/lib/prisma"
import { onAuthentiatedUser } from "./user"

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