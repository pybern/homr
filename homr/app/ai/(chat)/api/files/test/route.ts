
import { type NextRequest } from 'next/server'
 
export async function POST(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('filename')

    console.log(query)
    return new Response('Hello, world!')
}