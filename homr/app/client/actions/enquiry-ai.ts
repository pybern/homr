'use server'

import { createAzure } from "@ai-sdk/azure";
import { generateObject } from 'ai';
import { z } from 'zod';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache'

if (!process.env.AZURE_RESOURCE_NAME || !process.env.AZURE_API_KEY) {
    throw new Error("Azure environment variables are not set")
}

const azure = createAzure({
    resourceName: process.env.AZURE_RESOURCE_NAME, // Azure resource name
    apiKey: process.env.AZURE_API_KEY,
});

async function generateEnquiry(subject: string, message: string) {
    const model = azure('gpt-4o');

    // First step: Generate marketing copy
    const { object: summaryMetrics } = await generateObject({
        model,
        schema: z.object({
            title: z.string(),
            priority: z.enum(['low', 'medium', 'high']),
            category: z.enum(['complaint', 'feedback', 'support']),
            action: z.string(),
        }),
        prompt: `Summarize this enquiry for:
    1. Concise high level description
    2. Priority or urgency (low, medium, high)
    3. Category or type of enquiry (complaint, feedback, support)
    4. Action or recommended next steps to take

    Copy to evaluate: ${subject} ${message}`,
    });

    return summaryMetrics;
}

export async function submitEnquiry(formData: FormData) {
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    if (!subject || !message) {
        return { error: "Subject and message are required" }
    }

    try {
        // Categorize the enquiry using AI
        const summary = await generateEnquiry(subject, message)

        console.log(summary)

        // Insert into Supabase with the AI-generated category
        const { data, error } = await supabase
            .from('tasks')
            .upsert({ id: 'TASK-DEMO', 'title': `[${summary.category.toUpperCase()}] ${summary.title}`, 'status': 'backlog', 'label': 'enquiry', 'priority': summary.priority, 'action': summary.action })
            .select()

        if (error) throw error

        revalidatePath('/client')
        return { success: true }
    } catch (error) {
        console.error("Error submitting enquiry:", error)
        return { error: "Failed to submit enquiry" }
    }
}
